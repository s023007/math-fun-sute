/* =========== بيانات الألعاب للسنة الأولى =========== */
const year1Games = [
  {
    id: "addition-20",
    title: "Add up to 20",
    thumb: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&w=640",
    subtitle: "up to 20",
    build(root){          // تُنشئ اللعبة داخل عنصر root
      root.innerHTML = "";                // مسح أي محتوى سابق
      const a = rand(0,20), b = rand(0,20-a);
      root.insertAdjacentHTML("beforeend",`
         <div>${a} + ${b} = <input id="ans"> 
              <button id="chk">Check</button></div>
         <p class="feedback" id="fb"></p>
      `);
      root.querySelector("#chk").onclick = ()=>{
        const ok = +root.querySelector("#ans").value === a+b;
        const fb = root.querySelector("#fb");
        fb.textContent = ok ? "✔ Correct" : "✖ Try again";
        fb.className = "feedback " + (ok?"correct":"wrong");
        if(ok) setTimeout(()=>year1Games[0].build(root), 1200);
      }
    }
  },
  {
    id:"counting-stars",
    title:"Count up by 10 from 0",
    thumb:"https://images.unsplash.com/photo-1565613475332-f4e21611cd7e?auto=format&w=640",
    subtitle:"up to 100",
    build(root){
      root.innerHTML="";
      let n = rand(0,9)*10;  // 0,10,20…
      root.insertAdjacentHTML("afterbegin",`
        <p>Next number after <strong>${n}</strong>?</p>
        <input id="ans"> <button id="chk">Check</button>
        <p class="feedback" id="fb"></p>
      `);
      root.querySelector("#chk").onclick=()=>{
        const ok = +root.querySelector("#ans").value === n+10;
        const fb = root.querySelector("#fb");
        fb.textContent = ok? "✔ Great!":"✖ No, it's "+(n+10);
        fb.className = "feedback "+(ok?"correct":"wrong");
        if(ok) setTimeout(()=>year1Games[1].build(root),1200);
      };
    }
  },
  {
    id:"number-line",
    title:"Use number-line to subtract",
    thumb:"https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&w=640",
    subtitle:"up to 20",
    build(root){
      root.innerHTML="";
      const a = rand(6,20), b = rand(1,5);
      root.insertAdjacentHTML("afterbegin",`
        <p>${a} − ${b} = <input id="ans"></p>
        <button id="chk">Check</button>
        <p style="font-size:.9rem;margin-top:.8rem">Hint: imagine a number-line jumping left ${b}!</p>
        <p class="feedback" id="fb"></p>
      `);
      root.querySelector("#chk").onclick=()=>{
        const ok = +root.querySelector("#ans").value === a-b;
        const fb = root.querySelector("#fb");
        fb.textContent = ok? "✔ Well done":"✖ Try again";
        fb.className = "feedback "+(ok?"correct":"wrong");
        if(ok) setTimeout(()=>year1Games[2].build(root),1200);
      };
    }
  },
  {
    id:"balance-equation",
    title:"Balance addition and subtraction",
    thumb:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&w=640",
    subtitle:"up to 20",
    build(root){
      root.innerHTML="";
      const x = rand(1,10), y = rand(1,10), z = x + y;
      root.insertAdjacentHTML("afterbegin",`
        <p>${x} + <input id="ans" style="width:50px"> = ${z}</p>
        <button id="chk">Check</button>
        <p class="feedback" id="fb"></p>
      `);
      root.querySelector("#chk").onclick=()=>{
        const ok = +root.querySelector("#ans").value === y;
        const fb = root.querySelector("#fb");
        fb.textContent = ok? "✔ Balanced!":"✖ Nope";
        fb.className = "feedback "+(ok?"correct":"wrong");
        if(ok) setTimeout(()=>year1Games[3].build(root),1200);
      };
    }
  }
];

/* =========== توليد البطاقات =========== */
const grid   = document.getElementById("gamesGrid");
const modal  = document.getElementById("gameModal");
const gRoot  = document.getElementById("gRoot");
const gTitle = document.getElementById("gTitle");

year1Games.forEach(g=>{
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
     <img src="${g.thumb}" alt="">
     <div class="card-body">
        <h3>${g.title}</h3>
        <small>${g.subtitle}</small>
        <button class="play-btn"><i class="fa fa-play"></i></button>
     </div>`;
  card.querySelector(".play-btn").onclick = ()=>openGame(g);
  grid.appendChild(card);
});

/* =========== Modal logic =========== */
function openGame(g){
  gTitle.textContent = g.title;
  g.build(gRoot);
  modal.hidden = false;
}
modal.addEventListener("click",(e)=>{
  if(e.target === modal || e.target.classList.contains("close")){
    modal.hidden = true;
  }
});

/* =========== Helpers =========== */
function rand(min, max){ return Math.floor(Math.random()*(max-min+1))+min; }
