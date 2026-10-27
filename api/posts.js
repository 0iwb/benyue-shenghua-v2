
const { createClient } = require('@supabase/supabase-js');
const { formidable } = require('formidable');
const fs = require('fs/promises');
const crypto = require('crypto');

const MAX = 5 * 1024 * 1024;

function client() {
  if (
    !process.env.SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    throw new Error('後端尚未設定');
  }

  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false
      }
    }
  );
}

function send(res, status, body) {
  return res
    .status(status)
    .setHeader('Cache-Control', 'no-store')
    .json(body);
}

function clean(value, max) {
  return String(value || '').trim().slice(0, max);
}

async function verify(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret || !token) {
    return false;
  }

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: ip || ''
      })
    }
  );

  const data = await response.json();
  return data.success === true;
}

module.exports = async (req, res) => {
  try {
    const db = client();

    // 讀取已審核通過的花友投稿
    if (req.method === 'GET') {
      const { data, error } = await db
        .from('posts')
        .select(
          'id,month,flower,place,nickname,story,image_path,created_at'
        )
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(60);

      if (error) {
        throw error;
      }

      const posts = await Promise.all(
        (data || []).map(async (post) => {
          const { data: signed, error: signError } = await db.storage
            .from('flower-photos')
            .createSignedUrl(post.image_path, 3600);

          if (signError) {
            console.error('照片簽署網址失敗:', signError);
          }

          return {
            id: post.id,
            month: post.month,
            flower: post.flower,
            place: post.place,
            nickname: post.nickname,
            story: post.story,
            image_url: signed?.signedUrl || ''
          };
        })
      );

      return send(res, 200, { posts });
    }

    if (req.method !== 'POST') {
      return send(res, 405, {
        error: '不支援此操作'
      });
    }

    // 解析 multipart/form-data 投稿資料
    const form = formidable({
      maxFileSize: MAX,
      maxFiles: 1,
      allowEmptyFiles: false,
      filter: ({ mimetype }) =>
        ['image/jpeg', 'image/png', 'image/webp'].includes(mimetype)
    });

    const [fields, files] = await form.parse(req);

    const val = (key) =>
      Array.isArray(fields[key])
        ? fields[key][0]
        : fields[key];

    const file = Array.isArray(files.photo)
      ? files.photo[0]
      : files.photo;

    const month = Number(val('month'));
    const flower = clean(val('flower'), 60);
    const place = clean(val('place'), 100);
    const nickname = clean(val('nickname'), 40);
    const story = clean(val('story'), 500);

    // 檢查必填欄位及照片授權
    if (
      !file ||
      !Number.isInteger(month) ||
      month < 1 ||
      month > 12 ||
      !flower ||
      !place ||
      !nickname ||
      val('consent') !== 'on'
    ) {
      return send(res, 400, {
        error: '請填妥所有必填欄位與照片授權'
      });
    }

    // Cloudflare Turnstile 驗證
    const ip = req.headers['x-forwarded-for']
      ?.split(',')[0]
      ?.trim();

    const verified = await verify(
      val('cf-turnstile-response'),
      ip
    );

    if (!verified) {
      return send(res, 403, {
        error: '安全驗證失敗，請重試'
      });
    }

    // 檢查照片格式
    const extensions = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp'
    };

    const ext = extensions[file.mimetype];

    if (!ext) {
      return send(res, 400, {
        error: '圖片格式不支援'
      });
    }

    const bytes = await fs.readFile(file.filepath);

    if (bytes.length > MAX) {
      return send(res, 413, {
        error: '圖片過大'
      });
    }

    // 檢查檔案內容是否符合宣告的圖片格式
    const valid =
      ext === 'jpg'
        ? bytes[0] === 255 && bytes[1] === 216
        : ext === 'png'
          ? bytes.subarray(0, 8).equals(
              Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
            )
          : bytes.toString('ascii', 0, 4) === 'RIFF' &&
            bytes.toString('ascii', 8, 12) === 'WEBP';

    if (!valid) {
      return send(res, 400, {
        error: '圖片內容不符合格式'
      });
    }

    // 將照片上傳至 Supabase Storage
    const path = `pending/${crypto.randomUUID()}.${ext}`;

    const upload = await db.storage
      .from('flower-photos')
      .upload(path, bytes, {
        contentType: file.mimetype,
        upsert: false
      });

    if (upload.error) {
      console.error('Supabase Storage 上傳失敗:', upload.error);
      throw upload.error;
    }

    // 將投稿資料寫入資料庫，預設等待審核
    const insert = await db
      .from('posts')
      .insert({
        month,
        flower,
        place,
        nickname,
        story,
        image_path: path,
        status: 'pending'
      });

    if (insert.error) {
      console.error('Supabase 投稿資料寫入失敗:', insert.error);

      // 寫入失敗時，刪除剛上傳的照片
      await db.storage
        .from('flower-photos')
        .remove([path]);

      throw insert.error;
    }

    return send(res, 201, {
      ok: true,
      message: '投稿已送交審核'
    });

  } catch (error) {
    console.error('投稿 API 發生錯誤:', error);

    return send(res, 500, {
      error: '伺服器暫時無法處理，請稍後再試'
    });
  }
};
