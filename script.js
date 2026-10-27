
'use strict';

const flowers = [
  ['梅花','南投信義','冬季','堅韌與新生','寒冬裡開花，迎接新一年的開始。'],
  ['櫻花','台中武陵','冬末至春季','相遇與珍惜','沿著山路走進粉色花景。'],
  ['海芋','台北竹子湖','春季','純粹與期待','雲霧與山谷之間的白色花季。'],
  ['油桐花','桃園、苗栗客庄','春末','相伴與回望','桐花小徑連結客庄地方記憶。'],
  ['繡球花','新北瑞芳、宜蘭太平山','初夏','聚合與變化','一簇簇花色，記錄初夏變化。'],
  ['蓮花','台南白河','夏季','清澈與安定','蓮田與蓮子產業的在地故事。'],
  ['向日葵','花東縱谷','夏季','熱情與專注','陽光與田野之間的夏日色彩。'],
  ['金針花','花蓮赤柯山、六十石山','夏末','等待與重生','金黃色花海與金針農業相遇。'],
  ['韭菜花','桃園觀音','秋季','日常與潔白','日常農作物開出白色花海。'],
  ['杭菊','苗栗銅鑼','秋末','收成與節氣','從花田到茶杯的農村故事。'],
  ['茶花','新竹、苗栗','冬初','靜謐與持續','冬季山城的溫柔花色。'],
  ['聖誕紅','各地園藝產區','冬季','祝福與團聚','年末節慶與花卉園藝的記憶。']
].map((a,i) => ({
  m:i+1,
  name:a[0],
  place:a[1],
  season:a[2],
  meaning:a[3],
  story:a[4]
}));

const places = [
  [1,'南投信義梅花','南投縣信義鄉','南投',49,53,'信義鄉梅花與山城景觀','信義鄉梅花'],
  [2,'武陵農場櫻花','台中市和平區','台中',55,32,'山區櫻花與季節景觀','武陵農場櫻花'],
  [2,'九族文化村櫻花','南投縣魚池鄉','南投',44,48,'櫻花與園區體驗','九族文化村櫻花'],
  [3,'竹子湖海芋','台北市北投區','台北',60,17,'山區花田與農園體驗','竹子湖海芋'],
  [4,'龍潭桐花步道','桃園市龍潭區','桃園',49,25,'客庄步道與桐花景觀','龍潭桐花步道'],
  [4,'苗栗桐花步道','苗栗縣三義鄉','苗栗',44,34,'客家聚落與山林步道','苗栗桐花'],
  [5,'瑞芳繡球花景點','新北市瑞芳區','新北',65,20,'初夏繡球花與山城旅遊','瑞芳繡球花'],
  [5,'太平山繡球花','宜蘭縣大同鄉','宜蘭',65,30,'山林與初夏花景','太平山繡球花'],
  [6,'白河蓮花','台南市白河區','台南',40,70,'蓮子產業與農村飲食','台南白河蓮花'],
  [7,'花東縱谷向日葵','花蓮縣壽豐鄉','花蓮',67,53,'縱谷田園與季節花景','花東縱谷向日葵'],
  [8,'六十石山金針花','花蓮縣富里鄉','花蓮',63,73,'金針產業與縱谷風景','六十石山金針花'],
  [8,'赤柯山金針花','花蓮縣玉里鎮','花蓮',67,66,'金針花田與山城旅行','赤柯山金針花'],
  [9,'觀音韭菜花','桃園市觀音區','桃園',47,22,'農田與白色韭菜花景','桃園觀音韭菜花'],
  [10,'銅鑼杭菊','苗栗縣銅鑼鄉','苗栗',44,38,'杭菊栽培與農產加工','苗栗銅鑼杭菊'],
  [11,'新竹茶花景點','新竹縣','新竹',49,29,'冬季花卉園藝','新竹茶花'],
  [11,'苗栗茶花景點','苗栗縣','苗栗',44,36,'茶花栽培與園藝文化','苗栗茶花'],
  [12,'台灣聖誕紅園藝','彰化縣田尾鄉','彰化',41,46,'冬季花卉產業與園藝','彰化田尾聖誕紅'],
  [1,'角板山梅花','桃園市復興區','桃園',52,23,'山區梅花與角板山公園','角板山公園梅花'],
  [2,'陽明山花鐘櫻花','台北市北投區','台北',60,17,'陽明山春季花景','陽明山花鐘櫻花'],
  [2,'阿里山櫻花','嘉義縣阿里山鄉','嘉義',51,63,'高山櫻花與森林鐵道','阿里山櫻花'],
  [3,'竹子湖海芋田','台北市北投區','台北',61,18,'竹子湖農園海芋','竹子湖海芋田'],
  [4,'三義桐花步道','苗栗縣三義鄉','苗栗',46,35,'客庄桐花與山林步道','三義桐花步道'],
  [5,'陽明山繡球花','台北市北投區','台北',62,19,'竹子湖周邊繡球花田','竹子湖繡球花'],
  [6,'觀音蓮花季','桃園市觀音區','桃園',47,23,'蓮花農園與地方花季','桃園觀音蓮花季'],
  [7,'新社向日葵花田','台中市新社區','台中',46,42,'新社季節性向日葵花田','台中新社向日葵'],
  [8,'太麻里金針花','台東縣太麻里鄉','台東',61,82,'太麻里山區金針花','太麻里金針花'],
  [9,'大溪韭菜花田','桃園市大溪區','桃園',52,26,'農田白色韭菜花景','大溪韭菜花'],
  [10,'銅鑼杭菊花田','苗栗縣銅鑼鄉','苗栗',46,38,'客庄杭菊農業景觀','銅鑼杭菊花田'],
  [11,'陽明山茶花','台北市北投區','台北',59,18,'山區冬季茶花','陽明山茶花'],
  [12,'田尾公路花園','彰化縣田尾鄉','彰化',43,49,'冬季園藝與聖誕紅','田尾公路花園聖誕紅']
].map((a,i) => ({
  id:'p'+i,
  m:a[0],
  title:a[1],
  address:a[2],
  region:a[3],
  x:a[4],
  y:a[5],
  story:a[6],
  query:a[7]
}));

const siteCoordinates = {
  '南投信義梅花':[120.87,23.6],
  '武陵農場櫻花':[121.31,24.35],
  '九族文化村櫻花':[120.95,23.87],
  '竹子湖海芋':[121.54,25.17],
  '龍潭桐花步道':[121.22,24.86],
  '苗栗桐花步道':[120.76,24.41],
  '瑞芳繡球花景點':[121.82,25.1],
  '太平山繡球花':[121.53,24.49],
  '白河蓮花':[120.42,23.35],
  '花東縱谷向日葵':[121.53,23.87],
  '六十石山金針花':[121.3,23.23],
  '赤柯山金針花':[121.36,23.39],
  '觀音韭菜花':[121.08,25.03],
  '銅鑼杭菊':[120.78,24.49],
  '新竹茶花景點':[121.0,24.7],
  '苗栗茶花景點':[120.8,24.5],
  '台灣聖誕紅園藝':[120.52,23.9],
  '角板山梅花':[121.35,24.82],
  '陽明山花鐘櫻花':[121.54,25.16],
  '阿里山櫻花':[120.81,23.51],
  '竹子湖海芋田':[121.54,25.17],
  '三義桐花步道':[120.77,24.4],
  '陽明山繡球花':[121.54,25.17],
  '觀音蓮花季':[121.08,25.03],
  '新社向日葵花田':[120.82,24.19],
  '太麻里金針花':[121.01,22.61],
  '大溪韭菜花田':[121.29,24.88],
  '銅鑼杭菊花田':[120.78,24.49],
  '陽明山茶花':[121.54,25.17],
  '田尾公路花園':[120.53,23.89]
};

// 地形圖座標近似轉換
function terrainPoint(lon,lat) {
  const y=(25.35-lat)/(25.35-21.85);
  const center=53+5*Math.sin((y-.28)*Math.PI);
  const x=center+(lon-121.05)*28;
  return {
    x:Math.max(13,Math.min(87,x)),
    y:Math.max(5,Math.min(96,7+y*87))
  };
}

places.forEach(p=>{
  const loc=siteCoordinates[p.title];
  if(loc) {
    const pt=terrainPoint(...loc);
    p.x=pt.x;
    p.y=pt.y;
  }
});

const $=id=>document.getElementById(id);

const esc=s=>String(s??'').replace(
  /[&<>"']/g,
  c=>({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#39;'
  }[c])
);

// 初始狀態：一月梅花、全部景點
let month=1;
let selectedPlace=places[0];
let posts=[];
let chosenSticker=null;
let stickers=[];
let draftMonth=month;

function loadCollection() {
  try {
    const a=JSON.parse(
      localStorage.getItem('bloom-v2-library')||'[]'
    );
    return Array.isArray(a)
      ?a.filter(v=>
        v&&
        ['flower','place','post'].includes(v.type)&&
        typeof v.id==='string'
      ).slice(0,500)
      :[];
  } catch {
    return [];
  }
}

let collection=loadCollection();

function toast(s) {
  $('toast').textContent=s;
  $('toast').style.display='block';
  setTimeout(()=>{
    $('toast').style.display='none';
  },2500);
}

function saveItem(type,id) {
  if(collection.some(v=>v.type===type&&v.id===id)) {
    toast('已經收藏過了');
    return;
  }
  collection.push({type,id});
  persist();
  toast('已加入收藏庫');
}

function removeItem(type,id) {
  collection=collection.filter(
    v=>!(v.type===type&&v.id===id)
  );
  persist();
}

function persist() {
  localStorage.setItem(
    'bloom-v2-library',
    JSON.stringify(collection)
  );
}

function optionsMonths(all=false) {
  return (
    all
      ?'<option value="all">全部月份</option>'
      :'<option value="">請選擇月份</option>'
  )+flowers.map(f=>`
    <option value="${f.m}">
      ${String(f.m).padStart(2,'0')} 月
    </option>
  `).join('');
}

// 生日花月份切換：不影響地圖
function renderMonths() {
  $('months').innerHTML=flowers.map(f=>`
    <button
      class="month ${f.m===month?'active':''}"
      data-month="${f.m}">
      <b>${String(f.m).padStart(2,'0')}</b>
      <span>${f.name}</span>
    </button>
  `).join('');

  $('months').querySelectorAll('button').forEach(b=>{
    b.onclick=()=>{
      month=Number(b.dataset.month);
      renderMonths();
      renderResult();
    };
  });
}

function renderResult() {
  let f=flowers[month-1];

  $('result').innerHTML=`
    <div class="illustration" aria-hidden="true">❀</div>
    <div>
      <div class="eyebrow">
        ${String(f.m).padStart(2,'0')} / YOUR FLOWER
      </div>
      <h3>${f.name}</h3>
      <div class="chips">
        <span class="chip">花語｜${f.meaning}</span>
        <span class="chip">代表地｜${f.place}</span>
        <span class="chip">觀賞｜${f.season}</span>
      </div>
      <p class="sub">${f.story}</p>
      <div class="actions">
        <button class="btn" id="openCard">
          製作我的生日花卡
        </button>
        <a class="btn light" href="#map" id="exploreFlower">
          探索賞花景點 ↗
        </a>
      </div>
    </div>
  `;

  $('openCard').onclick=openCard;

  $('exploreFlower').onclick=()=>{
    $('mapMonth').value=String(month);
    $('mapRegion').value='all';
    selectedPlace=null;
    renderMap();
  };
}

function resetMapFilters() {
  $('mapMonth').value='all';
  $('mapRegion').value='all';
  selectedPlace=places[0];
  renderMap();
}

function filteredPlaces() {
  let m=$('mapMonth').value;
  let r=$('mapRegion').value;

  return places.filter(p=>
    (m==='all'||p.m===Number(m))&&
    (r==='all'||p.region===r)
  );
}

function renderMap() {
  let arr=filteredPlaces();

  if(!arr.some(p=>p.id===selectedPlace?.id)) {
    selectedPlace=arr[0]||null;
  }

  $('pins').innerHTML=arr.map(p=>`
    <button
      class="pin ${selectedPlace?.id===p.id?'active':''}"
      style="left:${p.x}%;top:${p.y}%"
      data-id="${p.id}"
      title="${esc(p.title)}"
      aria-label="${esc(p.title)}">✿</button>
  `).join('');

  $('places').innerHTML=arr.map(p=>`
    <button
      class="place ${selectedPlace?.id===p.id?'active':''}"
      data-id="${p.id}">
      ${esc(p.title)}
    </button>
  `).join('');

  document.querySelectorAll('[data-id]').forEach(b=>{
    b.onclick=()=>{
      selectedPlace=places.find(
        p=>p.id===b.dataset.id
      );
      renderMap();
    };
  });

  if(!selectedPlace) {
    $('placeTitle').textContent='沒有符合條件的景點';
    $('placeChips').innerHTML='';

    $('placeStory').innerHTML=`
      請調整月份或地區，或
      <button
        type="button"
        class="btn light small"
        id="emptyResetMap">
        顯示全部景點
      </button>
    `;

    $('emptyResetMap').onclick=resetMapFilters;

    $('placeCulture').textContent='';
    $('placeNearby').textContent='';
    $('mapLink').removeAttribute('href');
    $('mapLink').setAttribute('aria-disabled','true');
    $('mapLink').style.pointerEvents='none';
    return;
  }

  let p=selectedPlace;
  let f=flowers[p.m-1];

  $('placeTitle').textContent=p.title;

  $('placeChips').innerHTML=`
    <span class="chip">${f.name}</span>
    <span class="chip">${f.season}</span>
    <span class="chip">${p.region}</span>
  `;

  $('placeStory').textContent=p.story;
  $('placeCulture').textContent='地點｜'+p.address;

  $('placeNearby').textContent=
    '建議順遊：可由 Google Maps 查看附近步道、農園及地方景點。';

  $('mapLink').href=
    'https://www.google.com/maps/search/?api=1&query='+
    encodeURIComponent(p.query);

  $('mapLink').removeAttribute('aria-disabled');
  $('mapLink').style.pointerEvents='auto';
}

function openCard() {
  draftMonth=month;
  let f=flowers[month-1];

  $('cardMonth').textContent=
    `${String(month).padStart(2,'0')} / YOUR BIRTH FLOWER`;

  $('cardName').textContent=f.name;
  $('cardFlower').textContent='❀';

  $('cardPreview').style.background=$('cardBg').value;
  $('cardMessagePreview').textContent=$('cardMessage').value;

  stickers=[];
  chosenSticker=null;
  renderStickers();

  $('cardDialog').showModal();
}

function renderStickers() {
  $('stickers').innerHTML='';

  stickers.forEach((s,i)=>{
    let el=document.createElement('span');

    el.className=
      'sticker'+(chosenSticker===i?' active':'');

    el.textContent=s.text;
    el.style.left=s.x+'%';
    el.style.top=s.y+'%';
    el.style.fontSize=s.size+'px';

    el.onpointerdown=e=>{
      chosenSticker=i;
      el.setPointerCapture(e.pointerId);
      renderSelected();

      let rect=$('cardPreview').getBoundingClientRect();

      el.onpointermove=ev=>{
        if(!el.hasPointerCapture(ev.pointerId))return;

        s.x=Math.max(
          0,
          Math.min(
            90,
            (ev.clientX-rect.left)/rect.width*100
          )
        );

        s.y=Math.max(
          0,
          Math.min(
            90,
            (ev.clientY-rect.top)/rect.height*100
          )
        );

        el.style.left=s.x+'%';
        el.style.top=s.y+'%';
      };

      el.onpointerup=()=>{
        el.onpointermove=null;
      };
    };

    $('stickers').append(el);
  });
}

function renderSelected() {
  [...$('stickers').children].forEach((el,i)=>{
    el.classList.toggle('active',i===chosenSticker);
  });
}

function downloadCard() {
  let f=flowers[draftMonth-1];
  let c=document.createElement('canvas');

  c.width=1200;
  c.height=1600;

  let x=c.getContext('2d');

  x.fillStyle=$('cardBg').value;
  x.fillRect(0,0,1200,1600);

  x.fillStyle='#345C4A';
  x.textAlign='center';
  x.font='32px serif';

  x.fillText(
    `${String(f.m).padStart(2,'0')} / YOUR BIRTH FLOWER`,
    600,200
  );

  x.font='300px serif';
  x.fillText('❀',600,750);

  x.font='bold 90px serif';
  x.fillText(f.name,600,950);

  x.font='36px sans-serif';

  wrapText(
    x,
    $('cardMessage').value,
    600,1070,950,52
  );

  stickers.forEach(s=>{
    x.fillStyle='#DCA9A8';
    x.font=`${s.size*3}px serif`;
    x.fillText(
      s.text,
      s.x/100*1200+30,
      s.y/100*1600+60
    );
  });

  let a=document.createElement('a');
  a.href=c.toDataURL('image/png');
  a.download=`本月生花_${f.m}月_${f.name}.png`;
  a.click();

  toast('花卡已下載');
}

function wrapText(ctx,text,x,y,maxWidth,lineHeight) {
  let line='';

  for(let ch of text) {
    if(ctx.measureText(line+ch).width>maxWidth) {
      ctx.fillText(line,x,y);
      y+=lineHeight;
      line='';
    }
    line+=ch;
  }

  if(line)ctx.fillText(line,x,y);
}

function postCard(p) {
  return `
    <article class="postcard">
      <img
        src="${esc(p.image_url)}"
        alt="${esc(p.flower)}賞花照片"
        loading="lazy">

      <div class="postbody">
        <div class="postmeta">
          ${esc(p.month)}月 ·
          ${esc(p.place)} ·
          ${esc(p.nickname)}
        </div>

        <h3>${esc(p.flower)}</h3>
        <p>${esc(p.story||'分享一段花旅記憶。')}</p>

        <button
          class="btn light small"
          data-save-post="${esc(p.id)}">
          收藏這篇花旅
        </button>
      </div>
    </article>
  `;
}

async function fetchPosts() {
  try {
    let r=await fetch('/api/posts');

    if(!r.ok)throw Error('無法連線');

    let data=await r.json();

    posts=Array.isArray(data.posts)?data.posts:[];

    $('communityStatus').textContent=
      '照片投稿經審核後才會公開。';

  } catch {
    posts=[];

    $('communityStatus').textContent=
      '公開社群尚未連接雲端服務。部署並設定資料庫後，即可顯示經審核的照片。';
  }

  renderPosts();
}

function renderPosts() {
  let m=$('postMonth').value;
  let f=$('postFlower').value;

  let arr=posts.filter(p=>
    (m==='all'||p.month===Number(m))&&
    (f==='all'||p.flower===f)
  );

  $('postGrid').innerHTML=arr.length
    ?arr.map(postCard).join('')
    :'<div class="empty">目前沒有符合條件的公開花旅紀錄。</div>';

  $('postGrid')
    .querySelectorAll('[data-save-post]')
    .forEach(b=>{
      b.onclick=()=>{
        saveItem('post',b.dataset.savePost);
      };
    });
}

function libraryRecords() {
  return collection.map(v=>{
    if(v.type==='flower') {
      let f=flowers[Number(v.id)-1];

      return f?{
        ...v,
        m:f.m,
        flower:f.name,
        title:f.name,
        subtitle:'生日花 · '+f.meaning
      }:null;
    }

    if(v.type==='place') {
      let p=places.find(p=>p.id===v.id);

      return p?{
        ...v,
        m:p.m,
        flower:flowers[p.m-1].name,
        title:p.title,
        subtitle:'賞花景點 · '+p.region
      }:null;
    }

    let p=posts.find(p=>p.id===v.id);

    return p?{
      ...v,
      m:p.month,
      flower:p.flower,
      title:p.flower,
      subtitle:'花友分享 · '+p.place
    }:null;
  }).filter(Boolean);
}

function renderLibrary() {
  if(!$('libraryFilter')||!$('libraryGrid'))return;

  let filter=$('libraryFilter').value;

  let rec=libraryRecords().filter(r=>
    filter==='all'||r.type===filter
  );

  $('libraryGrid').innerHTML=rec.length
    ?rec.map(r=>`
      <article class="libraryitem">
        <small>
          ${String(r.m).padStart(2,'0')} 月 ·
          ${esc(r.flower)}
        </small>

        <h3>${esc(r.title)}</h3>
        <p>${esc(r.subtitle)}</p>

        <div class="actions">
          <button
            class="btn light small"
            data-remove-type="${r.type}"
            data-remove-id="${esc(r.id)}">
            移除收藏
          </button>
        </div>
      </article>
    `).join('')
    :'<div class="empty">還沒有這個分類的收藏。可以從地圖或花友日記加入。</div>';

  $('libraryGrid')
    .querySelectorAll('[data-remove-type]')
    .forEach(b=>{
      b.onclick=()=>{
        removeItem(
          b.dataset.removeType,
          b.dataset.removeId
        );
      };
    });
}

function downloadJson(data,name) {
  let blob=new Blob(
    [JSON.stringify(data,null,2)],
    {type:'application/json'}
  );

  let url=URL.createObjectURL(blob);
  let a=document.createElement('a');

  a.href=url;
  a.download=name;
  a.click();

  setTimeout(()=>{
    URL.revokeObjectURL(url);
  },1000);
}

function setupTurnstile() {
  let key=window.BLOOM_CONFIG?.turnstileSiteKey;

  if(!key)return;

  let s=document.createElement('script');

  s.src='https://challenges.cloudflare.com/turnstile/v0/api.js';
  s.async=true;
  s.defer=true;

  document.head.append(s);

  $('turnstileSlot').innerHTML=`
    <div
      class="cf-turnstile"
      data-sitekey="${esc(key)}">
    </div>
  `;
}

async function submitPost(e) {
  e.preventDefault();

  let form=$('postForm');
  let data=new FormData(form);
  let file=data.get('photo');

  if(!(file instanceof File)||!file.size)return;

  if(file.size>5*1024*1024) {
    $('postFormStatus').textContent='照片不可超過 5MB';
    return;
  }

  if(!['image/jpeg','image/png','image/webp'].includes(file.type)) {
    $('postFormStatus').textContent=
      '僅接受 JPG、PNG、WebP';
    return;
  }

  if(!window.BLOOM_CONFIG?.turnstileSiteKey) {
    $('postFormStatus').textContent=
      '目前尚未設定公開投稿驗證。請先部署後端與 Turnstile，無法直接公開上傳。';
    return;
  }

  let btn=$('submitPost');

  btn.disabled=true;
  $('postFormStatus').textContent='正在提交……';

  try {
    let r=await fetch('/api/posts',{
      method:'POST',
      body:data
    });

    let json=await r.json();

    if(!r.ok)throw Error(json.error||'提交失敗');

    $('postFormStatus').textContent=
      '已收到投稿，待管理者審核後公開。';

    form.reset();
    toast('已提交審核');

  } catch(err) {
    $('postFormStatus').textContent=err.message;

  } finally {
    btn.disabled=false;

    if(window.turnstile) {
      window.turnstile.reset();
    }
  }
}

// 網站初始化
function init() {

  // 地圖預設：全部月份
  $('mapMonth').innerHTML=optionsMonths(true);
  $('mapMonth').value='all';

  // 地圖預設：全部地區
  $('mapRegion').innerHTML=
    '<option value="all">全部地區</option>'+
    [...new Set(places.map(p=>p.region))]
      .sort()
      .map(r=>`
        <option value="${r}">${r}</option>
      `).join('');

  $('mapRegion').value='all';

  // 地圖預設第一筆景點
  selectedPlace=places[0];

  $('postMonth').innerHTML=optionsMonths(true);

  $('postFlower').innerHTML=
    '<option value="all">全部花種</option>'+
    flowers.map(f=>`
      <option value="${f.name}">
        ${f.name}
      </option>
    `).join('');

  $('formMonth').innerHTML=optionsMonths();

  renderMonths();
  renderResult();
  renderMap();

  fetchPosts();
  setupTurnstile();

  $('mapMonth').onchange=renderMap;
  $('mapRegion').onchange=renderMap;

  $('searchMap').onclick=renderMap;
  $('resetMap').onclick=resetMapFilters;

  $('postMonth').onchange=renderPosts;
  $('postFlower').onchange=renderPosts;

  $('openPost').onclick=()=>{
    $('postDialog').showModal();
    $('formMonth').value=String(month);
  };

  $('postForm').onsubmit=submitPost;

  document.querySelectorAll('[data-close]').forEach(b=>{
    b.onclick=()=>{
      $(b.dataset.close).close();
    };
  });

  $('cardBg').oninput=e=>{
    $('cardPreview').style.background=e.target.value;
  };

  $('cardMessage').oninput=e=>{
    $('cardMessagePreview').textContent=e.target.value;
  };

  document.querySelectorAll('[data-sticker]').forEach(b=>{
    b.onclick=()=>{
      stickers.push({
        text:b.dataset.sticker,
        x:45,
        y:48,
        size:40
      });

      chosenSticker=stickers.length-1;
      renderStickers();
    };
  });

  $('removeSticker').onclick=()=>{
    if(chosenSticker!==null) {
      stickers.splice(chosenSticker,1);
      chosenSticker=null;
      renderStickers();
    }
  };

  $('downloadCard').onclick=downloadCard;
}

init();
