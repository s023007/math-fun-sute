/* ===== Drawer controls ===== */
const burger  = document.getElementById('burger');
const drawer  = document.getElementById('drawer');
const closeDr = document.getElementById('closeDrawer');
const overlay = document.getElementById('overlay');

burger.addEventListener('click', ()=>{ drawer.classList.add('open'); overlay.classList.add('show'); });
closeDr.addEventListener('click', ()=>{ drawer.classList.remove('open'); overlay.classList.remove('show'); });
overlay.addEventListener('click', ()=>{ drawer.classList.remove('open'); overlay.classList.remove('show'); });

/* ===== Drawer navigation (Maths Activities & Country pages) ===== */
document.querySelectorAll('.nav-link').forEach(link=>{
  link.addEventListener('click', ()=>{
    document.getElementById(link.dataset.target).style.display='block';
    document.getElementById('mainList').style.display='none';
  });
});
document.querySelectorAll('.backBtn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    btn.closest('.drawer-page').style.display='none';
    document.getElementById('mainList').style.display='block';
  });
});

/* ===== Language picker ===== */
const picker   = document.getElementById('langPicker');
const flagImg  = document.getElementById('currentFlag');
const langCode = document.getElementById('currentLang');

picker.addEventListener('click', e=>{
  if(e.target.tagName==='LI'){
    const lang = e.target.dataset.lang;
    const flag = e.target.dataset.flag;
    flagImg.src = `https://flagcdn.com/24x18/${flag}.png`;
    langCode.textContent = lang.toUpperCase();
    picker.classList.remove('open');
    applyLang(lang); // من ملف اللغات السابق إذا أردت
  }else{
    picker.classList.toggle('open');
  }
});
