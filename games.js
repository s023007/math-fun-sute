/* بيانات جميع الألعاب (يمكنك إضافة المزيد) */
const gameList=[
  {id:'addition', img:'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800', keys:{en:'Addition Game',ar:'لعبة الجمع',fr:'Addition',es:'Suma'}},
  {id:'compare' , img:'https://images.unsplash.com/photo-1589837843856-bd6ba01cf9e5?w=800', keys:{en:'Compare Numbers',ar:'مقارنة الأعداد',fr:'Comparer',es:'Comparar'}},
  {id:'drag'    , img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800', keys:{en:'Drag the Right Number',ar:'اسحب الرقم الصحيح',fr:'Glisser le bon nombre',es:'Arrastra el número'}}
];

/* ترجمات واجهات الألعاب */
const i18n={
  en:{check:'Check',correct:'Great!',wrong:'Try again',addTitle:'Addition Game',
      cmpTitle:'Compare Numbers',dragTitle:'Drag the Right Number',dragInstr:'Drag the correct digit into the box.'},
  ar:{check:'تحقّق',correct:'رائع!',wrong:'حاول مرّة أخرى',addTitle:'لعبة الجمع',
      cmpTitle:'مقارنة الأعداد',dragTitle:'اسحب الرقم الصحيح',dragInstr:'اسحب الرقم الصحيح إلى المربع.'},
  fr:{check:'Vérifier',correct:'Bravo !',wrong:'Réessaye',addTitle:'Addition',
      cmpTitle:'Comparer les nombres',dragTitle:'Faites glisser le bon nombre',dragInstr:'Faites glisser le chiffre correct.'},
  es:{check:'Comprobar',correct:'¡Bien hecho!',wrong:'Inténtalo otra vez',addTitle:'Juego de suma',
      cmpTitle:'Comparar números',dragTitle:'Arrastra el número',dragInstr:'Arrastra el dígito correcto a la casilla.'}
};

/* ===== إنشاء بطاقات الألعاب ================================================= */
const cardArea=document.getElementById('cardArea');
function buildCards(lang='en'){
  cardArea.innerHTML='';
  gameList.forEach(g=>{
    const card=document.createElement('div');card.className='card';
    card.innerHTML=`
      <img src="${g.img}" alt="">
      <h3>${g.keys[lang]||g.keys.en}</h3>
      <button data-id="${g.id}" data-key="play">${(lang==='ar')?'العب':'Play'}</button>`;
    cardArea.appendChild(card);
  });
}
buildCards();

/* ===== التعامل مع النافذة المنبثقة ========================================== */
const modal=document.getElementById('gameModal');
const gameArea=document.getElementById('gameArea');
document.addEventListener('click',e=>{
  if(e.target.matches('.card button')){
    loadGame(e.target.dataset.id);
  }
});
document.getElementById('closeM').onclick=()=>modal.classList.remove('show');
function loadGame(id){
  const tpl=document.getElementById('tpl_'+id);
  gameArea.replaceChildren(tpl.content.cloneNode(true));
  modal.classList.add('show');
  if(id==='addition') initAdd();
  if(id==='compare')  initCmp();
  if(id==='drag')     initDrag();
}

/* === لعبة الجمع === */
function initAdd(){
  const a=rand(1,20),b=rand(1,20);
  document.getElementById('addA').textContent=a;
  document.getElementById('addB').textContent=b;
  const msg=document.getElementById('addMsg');
  document.getElementById('addChk').onclick=()=>{
    const ans=+document.getElementById('addInput').value;
    msg.textContent=(ans==a+b)?i18n[curLang].correct:i18n[curLang].wrong;
  };
}
/* === لعبة المقارنة === */
function initCmp(){
  const x=rand(1,100),y=rand(1,100);
  document.getElementById('cmpEquation').textContent=`${x} ? ${y}`;
  const msg=document.getElementById('cmpMsg');
  document.querySelectorAll('.cmpBtn').forEach(btn=>{
    btn.onclick=()=>{
      const ok=(btn.dataset.val===(x>y?'>':x<y?'<':'='));
      msg.textContent= ok?i18n[curLang].correct:i18n[curLang].wrong;
    };
  });
}
/* === لعبة السحب === */
function initDrag(){
  const target=rand(0,9);
  document.getElementById('dropBox').textContent='?';
  const bank=document.getElementById('digitBank');bank.innerHTML='';
  for(let i=0;i<5;i++){
    const d=document.createElement('span');
    d.textContent=rand(0,9);d.draggable=true;
    d.ondragstart=e=>e.dataTransfer.setData('text',d.textContent);
    bank.appendChild(d);
  }
  const drop=document.getElementById('dropBox'),msg=document.getElementById('dragMsg');
  drop.ondragover=e=>e.preventDefault();
  drop.ondrop=e=>{
    const v=e.dataTransfer.getData('text');
    drop.textContent=v;
    msg.textContent=(v==target)?i18n[curLang].correct:i18n[curLang].wrong;
  };
}

/* ===== الترجمة الفوريّة ===================================================== */
let curLang='en';
function setLang(l){
  curLang=l;           /* حفظ اللغة الحالية */
  buildCards(l);       /* إعادة بناء البطاقات */
  document.documentElement.dir=(l==='ar')?'rtl':'ltr';
  document.body.style.fontFamily=(l==='ar')?'"Cairo",sans-serif':'"Poppins",sans-serif';

  /* ترجمات ثابتة داخل القوالب */
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.dataset.i18n;
    el.textContent=i18n[l][k]||i18n.en[k];
  });
}
/* مُبدّل اللغة الخاص بهذه الصفحة */
const picker=document.getElementById('langPickerGames');
picker.onclick=e=>{
  if(e.target.tagName==='LI'){
    const {lang,flag}=e.target.dataset;
    document.getElementById('flagG').src=`https://flagcdn.com/24x18/${flag}.png`;
    document.getElementById('langG').textContent=lang.toUpperCase();
    picker.classList.remove('open');
    setLang(lang);
  }else picker.classList.toggle('open');
};

/* ===== مساعد random ===== */
function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
