
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const reply = (res, status, body) =>
  res.status(status)
    .setHeader('Cache-Control', 'no-store')
    .json(body);

const allowedStatuses = ['pending', 'approved', 'rejected'];

module.exports = async (req, res) => {
  const expected = process.env.ADMIN_API_TOKEN || '';
  const provided = (req.headers.authorization || '')
    .replace(/^Bearer\s+/i, '');

  const a = Buffer.from(expected);
  const b = Buffer.from(provided);

  if (
    !expected ||
    !provided ||
    a.length !== b.length ||
    !crypto.timingSafeEqual(a, b)
  ) {
    return reply(res, 401, { error: '無權限' });
  }

  if (
    !process.env.SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return reply(res, 503, { error: '資料庫未設定' });
  }

  const db = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );

  try {
    if (req.method === 'GET') {
      const { data, error } = await db
        .from('posts')
        .select('*')
        .in('status', allowedStatuses)
        .order('created_at', { ascending: false })
        .limit(500);

      if (error) throw error;

      const posts = await Promise.all(
        (data || []).map(async p => {
          let imageUrl = '';

          if (p.image_path) {
            const { data: signed, error: imageError } =
              await db.storage
                .from('flower-photos')
                .createSignedUrl(p.image_path, 1800);

            if (imageError) {
              console.error('圖片讀取失敗', imageError);
            }

            imageUrl = signed?.signedUrl || '';
          }

          return {
            ...p,
            image_url: imageUrl
          };
        })
      );

      return reply(res, 200, { posts });
    }

    if (req.method !== 'POST') {
      return reply(res, 405, { error: '方法不支援' });
    }

    const { id, action } = req.body || {};

    const actionToStatus = {
      approve: 'approved',
      reject: 'rejected',
      pending: 'pending'
    };

    const newStatus = actionToStatus[action];

    if (
      typeof id !== 'string' ||
      !/^[0-9a-f-]{36}$/i.test(id) ||
      !newStatus
    ) {
      return reply(res, 400, { error: '參數不正確' });
    }

    const { data: post, error: findError } = await db
      .from('posts')
      .select('id,status')
      .eq('id', id)
      .single();

    if (findError || !post) {
      return reply(res, 404, { error: '找不到這篇投稿' });
    }

    if (post.status === newStatus) {
      return reply(res, 200, {
        ok: true,
        message: '投稿狀態沒有變更'
      });
    }

    const { error } = await db
      .from('posts')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) throw error;

    return reply(res, 200, {
      ok: true,
      status: newStatus,
      message: '審核狀態已更新'
    });

  } catch (e) {
    console.error(e);
    return reply(res, 500, { error: '操作失敗' });
  }
};
