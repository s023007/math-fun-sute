/* DRAWER ------------------------------------------------------------ */
const burger   = document.getElementById('burger');
const drawer   = document.getElementById('drawer');
const closeBtn = document.getElementById('closeDrawer');
const overlay  = document.getElementById('overlay');

burger.onclick   = () => {drawer.classList.add('open');overlay.classList.add('show');};
closeBtn.onclick = overlay.onclick = () => {drawer.classList.remove('open');overlay.classList.remove('show');};

/* التنقّل داخل الـ Drawer */
document.querySelectorAll('.nav-link').forEach(link=>{
  link.onclick=()=>{
    document.getElementById('mainList').style.display='none';
    document.querySelectorAll('.drawer-page').forEach(p=>p.style.display='none');
    document.getElementById(link.dataset.target).style.display='block';
  };
});
document.querySelectorAll('.backBtn').forEach(btn=>{
  btn.onclick=()=>{
    btn.closest('.drawer-page').style.display='none';
    document.getElementById('mainList').style.display='block';
  };
});

/* LANGUAGE PICKER --------------------------------------------------- */
const picker  = document.getElementById('langPicker');
const flagImg = document.getElementById('currentFlag');
const langTxt = document.getElementById('currentLang');

picker.onclick = e=>{
  if(e.target.tagName==='LI'){
    const {lang,flag}=e.target.dataset;
    flagImg.src=`https://flagcdn.com/24x18/${flag}.png`;
    langTxt.textContent=lang.toUpperCase();
    picker.classList.remove('open');
    applyLang(lang);
  }else{
    picker.classList.toggle('open');
  }
};

/* TRANSLATIONS ------------------------------------------------------ */
const translations={
  ar:{logo:'متعة الرياضيات',heroTitle:'التطبيق الذي يحبه الطلاب ويحسّن النتائج',
      heroText:'يساعد المتعلمين من عمر 4-15 على التفوق في الرياضيات.',
      ctaTeach:'جرّبه مجانًا للمعلمين',ctaPar:'جرّبه مجانًا للأهالي',
      navTeachers:'للمعلمين',navParents:'للأهالي',mathAct:'أنشطة الرياضيات',
      tryBtn:'جرّب MathFun',explore:'استكشف الأنشطة'},
  fr:{logo:'MathFun',heroTitle:'L’appli de maths que les élèves adorent',
      heroText:'Pour les apprenants de 4-15 ans.',ctaTeach:'Essai gratuit – Enseignants',
      ctaPar:'Essai gratuit – Parents',navTeachers:'Enseignants',navParents:'Parents',
      mathAct:'Activités de maths',tryBtn:'Essayer MathFun',explore:'Explorer les activités'},
  es:{logo:'MathFun',heroTitle:'La app de matemáticas que encanta a los estudiantes',
      heroText:'Para alumnos de 4-15 años.',ctaTeach:'Prueba gratis – Docentes',
      ctaPar:'Prueba gratis – Padres',navTeachers:'Profesores',navParents:'Padres',
      mathAct:'Actividades de matemáticas',tryBtn:'Probar MathFun',explore:'Explorar actividades'}
};
/* تخزين نصوص الإنجليزية الأصلية */
translations.en={};
document.querySelectorAll('[data-key]').forEach(el=>translations.en[el.dataset.key]=el.textContent);

function applyLang(l){
  document.documentElement.dir = (l==='ar') ? 'rtl' : 'ltr';
  document.body.style.fontFamily = (l==='ar') ? '"Cairo",sans-serif' : '"Poppins",sans-serif';
  document.querySelectorAll('[data-key]').forEach(el=>{
    const k=el.dataset.key;
    el.textContent = (l==='en') ? translations.en[k] : translations[l]?.[k]||translations.en[k];
  });
  /* تحديث عناوين اللوغو */
  document.querySelectorAll('.logo').forEach(el=>el.textContent=document.querySelector('[data-key="logo"]').textContent);
}
