const q = s => document.querySelector(s);
const qa = s => [...document.querySelectorAll(s)];

const cfg = {
  1:{sets:2,rir:4,note:"Adaptasyon · teknik öğrenme · ertesi gün aşırı ağrı hedef değil"},
  2:{sets:2,rir:3,note:"Temel kuvvet · kontrollü yük artışı"},
  3:{sets:3,rir:3,note:"Hacim artışı · form bozulmadan daha fazla kaliteli set"},
  4:{sets:3,rir:2,note:"Progresyon · üst tekrar sınırına ulaşınca ağırlık artır"},
  5:{sets:3,rir:2,note:"Düzenli progresyon · çoğu sette 1–3 RIR"}
};

const warmup = [
  {id:"catcamel",name:"Cat–Camel",meta:"Omurga mobilitesi · 6 yavaş tekrar",sets:1,reps:"6",lordosis:"Amaç beli zorla esnetmek değil; omurgayı ağrısız aralıkta nazikçe hareket ettirmek.",cues:["Dört ayak pozisyonunda başla.","Yuvarlanma ve açılmayı yavaş yap.","Uç pozisyonlara zorla gitme."]},
  {id:"9090",name:"90/90 Kalça Geçişi",meta:"Kalça rotasyonu · 6/yan",sets:1,reps:"6/yan",lordosis:"Kalça hareketini belden telafi etme; gövdeyi olabildiğince uzun tut.",cues:["Dizleri yaklaşık 90° bük.","Bir yandan diğer yana kontrollü dön.","Ağrısız hareket açıklığını kullan."]},
  {id:"bwsquat",name:"Bodyweight Squat",meta:"Kalça–diz ısınması · 8 tekrar",sets:1,reps:"8",lordosis:"Aşağı inerken göğsü aşırı kaldırıp bel kavsini büyütme.",cues:["Ayakları omuz genişliğinde aç.","Dizleri ayak yönünde takip ettir.","Topuğu yerde tut."]},
  {id:"bridge",name:"Glute Bridge",meta:"Glute aktivasyonu · 10 tekrar",sets:1,reps:"10",lordosis:"Üstte kalçayı sık; ekstra yükselmek için beli arkaya bükme.",cues:["Topukları kalçaya yakın yerleştir.","Nefes verip kaburgaları aşağıda tut.","Kalçayı glute ile kaldır."]},
  {id:"deadbug",name:"Dead Bug",meta:"Core aktivasyonu · 6/yan",sets:1,reps:"6/yan",lordosis:"Bel boşluğunun artmasına izin verme; kontrol kaybolursa hareket mesafesini kısalt.",cues:["Kalça ve diz yaklaşık 90°.","Karşı kol ve bacağı yavaş uzat.","Nefes verirken karın duvarını aktif tut."]},
  {id:"scap",name:"Omuz Dairesi + Scapular Retraction",meta:"Omuz kuşağı · 10 tekrar",sets:1,reps:"10",lordosis:"Omuzları geriye alırken göğsü öne fırlatıp belini aşırı çukurlaştırma.",cues:["Omuzları yavaşça daire çizdir.","Sonra kürek kemiklerini nazikçe birbirine yaklaştır.","Boynu gevşek tut."]}
];

const days = {
 A:[
  ["bench","Dumbbell Bench Press","Göğüs · triceps","8–12","Bench press sırasında ayaklar sabit; dumbbell'ları kontrollü indir.","Kaburgaları yukarı fırlatıp beli aşırı çukurlaştırma."],
  ["row1","One-arm Dumbbell Row","Sırt · biceps","8–12/kol","Dirseği kalçaya doğru çek; omzu kulağa yükseltme.","Gövdeyi çevirmeden nötr bel pozisyonunu koru."],
  ["goblet","Goblet Squat","Quadriceps · glute","8–12","Dumbbell göğüs önünde; diz ve ayak aynı yönde.","Alt pozisyonda bel kavsini büyütmek yerine gövdeyi kontrollü tut."],
  ["rdl","Dumbbell Romanian Deadlift","Hamstring · glute","8–12","Kalçayı geriye gönder; dumbbell'lar bacaklara yakın.","Belden değil kalçadan menteşe yap."],
  ["deadbug","Dead Bug","Karın · core","6–10/yan","Hareket mesafesini bel kontrolüne göre ayarla.","Bel boşluğu artarsa kol/bacağı daha az uzat."],
  ["curl","Dumbbell Curl","Biceps","10–15","Dirsek gövde yanında; inişi yavaş kontrol et.","Belden sallanarak tekrar üretme."]
 ],
 B:[
  ["incline","Incline Dumbbell Press","Üst göğüs · triceps","8–12","Sehpayı yaklaşık 20–35° yap.","Press sırasında kaburga–pelvis kontrolünü koru; aşırı bel kavsi yok."],
  ["split","Bulgarian Split Squat","Quadriceps · glute","8–10/bacak","Yeni başlarken desteksiz zor gelirse normal split squat kullan.","Denge için beli geriye atma; ön ayağı tam bas."],
  ["shoulder","Dumbbell Shoulder Press","Omuz · triceps","8–12","Ayakta veya oturarak kontrollü press.","Dumbbell yukarı giderken belden geriye kaçma; gerekirse oturarak yap."],
  ["bridge","Glute Bridge","Glute · pelvis kontrolü","10–15","Topuklardan it, üstte glute sık.","Ekstra yükselmek için lumbar hiper-ekstansiyon yapma."],
  ["sideplank","Side Plank","Oblique · core","20–40 sn/yan","Baş–omuz–kalça aynı çizgide.","Kalçayı düşürme; nefesi tutma."],
  ["triceps","Overhead Triceps Extension","Triceps","10–15","Dirsekleri çok açmadan kontrollü indir.","Kaburgaları öne çıkarmadan karını aktif tut."]
 ],
 C:[
  ["floorpress","Dumbbell Floor Press","Göğüs · triceps","8–12","Dirsekleri zemine kontrollü indir.","Bel kavsini büyütmeden press yap."],
  ["chestrow","Chest-supported Dumbbell Row","Sırt · biceps","8–12","Göğsü sehpaya destekle; dirsekleri geriye çek.","Göğüs desteği belden telafiyi azaltır."],
  ["lunge","Reverse Lunge","Bacak · glute","8–10/bacak","Geri adımı kontrollü al; ön ayağı tam bas.","Gövdeyi dik tutmak için beli aşırı çukurlaştırma."],
  ["rdl","Dumbbell Romanian Deadlift","Hamstring · glute","8–12","Kalça menteşesi; hamstring gerilimini hisset.","Nötr bel pozisyonunu koru."],
  ["reversecrunch","Reverse Crunch","Karın · pelvis kontrolü","8–15","Kuyruk sokumunu kontrollü yerden kaldır.","Momentum yerine posterior pelvic tilt üret."],
  ["lateral","Dumbbell Lateral Raise","Yan omuz","12–15","Hafif ağırlık; dirsek hafif kırık.","Belden savurma yapma."],
  ["hammer","Hammer Curl","Biceps · brachialis","10–15","Avuç içleri birbirine bakar; dirsek sabit.","Gövde sallanmasın."]
 ]
};

function personFrame(parts, caption){
  const circles = (parts.circles||[]).map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]||7}" fill="#13233b"/>`).join("");
  const lines = (parts.lines||[]).map(l=>`<line x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}" stroke="#13233b" stroke-width="${l[4]||7}" stroke-linecap="round"/>`).join("");
  const rects = (parts.rects||[]).map(r=>`<rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" rx="${r[4]||4}" fill="${r[5]||'#385a7c'}"/>`).join("");
  return `${rects}${lines}${circles}<text x="150" y="205" text-anchor="middle" font-size="12" fill="#38516c">${caption}</text>`;
}
function twoFrame(a,b,labelA="Başlangıç",labelB="Bitiş"){
  return `<svg viewBox="0 0 300 220" role="img" aria-label="Hareketli egzersiz demosu">
  <style>
    .f1{animation:f1 2.4s ease-in-out infinite}.f2{animation:f2 2.4s ease-in-out infinite}
    @keyframes f1{0%,42%{opacity:1}50%,92%{opacity:.08}100%{opacity:1}}
    @keyframes f2{0%,42%{opacity:.08}50%,92%{opacity:1}100%{opacity:.08}}
  </style>
  <g class="f1">${personFrame(a,labelA)}</g>
  <g class="f2">${personFrame(b,labelB)}</g>
  <path d="M245 70c25 20 25 55 0 75" fill="none" stroke="#59a8d8" stroke-width="4" stroke-linecap="round"/>
  <path d="M247 144l-5-14 14 3" fill="#59a8d8"/>
  </svg>`;
}

const P = {
 stand:(armY=92)=>({circles:[[150,38,10]],lines:[[150,48,150,105,9],[150,65,115,armY,7],[150,65,185,armY,7],[150,105,128,165,8],[150,105,172,165,8]]}),
 squat1:{circles:[[150,38,10]],lines:[[150,48,150,105,9],[150,65,120,83,7],[150,65,180,83,7],[150,105,132,165,8],[150,105,168,165,8]]},
 squat2:{circles:[[150,62,10]],lines:[[150,72,145,118,9],[145,88,116,105,7],[145,88,174,105,7],[145,118,110,146,8],[110,146,91,177,8],[145,118,182,145,8],[182,145,205,177,8]]},
 hinge1:{circles:[[145,38,10]],lines:[[145,48,145,104,9],[145,67,122,103,7],[145,67,170,103,7],[145,104,130,166,8],[145,104,167,166,8]]},
 hinge2:{circles:[[112,62,10]],lines:[[121,68,166,90,9],[145,80,116,116,7],[156,86,178,121,7],[166,90,148,160,8],[166,90,186,160,8]]},
 plank1:{circles:[[205,82,9]],lines:[[197,87,145,104,9],[145,104,88,124,8],[145,104,118,148,7],[118,148,95,150,7],[145,104,166,146,7],[166,146,186,149,7]]},
 dead1:{rects:[[35,160,230,8,4,"#9fb6ca"]],circles:[[150,86,9]],lines:[[150,95,150,130,8],[150,108,120,82,7],[150,108,180,82,7],[150,130,127,110,8],[127,110,105,132,8],[150,130,173,110,8],[173,110,195,132,8]]},
 dead2:{rects:[[35,160,230,8,4,"#9fb6ca"]],circles:[[150,86,9]],lines:[[150,95,150,130,8],[150,108,105,118,7],[150,108,192,74,7],[150,130,125,110,8],[125,110,90,150,8],[150,130,172,112,8],[172,112,192,130,8]]},
 bridge1:{rects:[[35,160,230,8,4,"#9fb6ca"]],circles:[[85,130,9]],lines:[[94,132,145,147,8],[145,147,190,146,8],[190,146,212,158,8],[145,147,169,158,8],[94,132,120,157,7]]},
 bridge2:{rects:[[35,160,230,8,4,"#9fb6ca"]],circles:[[85,130,9]],lines:[[94,132,145,117,9],[145,117,190,135,9],[190,135,212,158,8],[145,117,170,156,8],[94,132,120,157,7]]},
 press1:{rects:[[50,150,200,10,4,"#9fb6ca"]],circles:[[85,125,9]],lines:[[94,128,150,142,9],[150,142,205,143,9],[120,136,120,93,7],[180,141,180,93,7],[150,142,135,165,8],[165,143,185,165,8]],circles2:[]},
 press2:{rects:[[50,150,200,10,4,"#9fb6ca"]],circles:[[85,125,9]],lines:[[94,128,150,142,9],[150,142,205,143,9],[120,136,120,73,7],[180,141,180,73,7],[150,142,135,165,8],[165,143,185,165,8]]},
 side1:{rects:[[35,160,230,8,4,"#9fb6ca"]],circles:[[198,105,9]],lines:[[190,110,145,128,9],[145,128,96,145,9],[145,128,155,155,7],[155,155,175,157,7],[96,145,78,159,8]]},
 side2:{rects:[[35,160,230,8,4,"#9fb6ca"]],circles:[[198,80,9]],lines:[[190,86,145,106,9],[145,106,96,128,9],[145,106,155,155,7],[155,155,175,157,7],[96,128,78,159,8]]}
};

function demoSVG(id){
  switch(id){
    case "catcamel": return twoFrame(
      {circles:[[205,85,8]],lines:[[197,90,150,103,8],[150,103,105,101,8],[105,101,90,140,7],[150,103,145,142,7],[175,96,181,140,7]]},
      {circles:[[205,75,8]],lines:[[197,80,150,73,8],[150,73,105,98,8],[105,98,90,140,7],[150,73,145,142,7],[175,78,181,140,7]]}
    );
    case "9090": return twoFrame(
      {circles:[[150,45,9]],lines:[[150,54,150,105,8],[150,72,120,93,7],[150,72,180,93,7],[150,105,115,130,8],[115,130,83,130,8],[150,105,180,132,8],[180,132,198,160,8]]},
      {circles:[[150,45,9]],lines:[[150,54,150,105,8],[150,72,120,93,7],[150,72,180,93,7],[150,105,185,130,8],[185,130,217,130,8],[150,105,120,132,8],[120,132,102,160,8]]}
    );
    case "bwsquat": return twoFrame(P.squat1,P.squat2);
    case "bridge": return twoFrame(P.bridge1,P.bridge2);
    case "deadbug": return twoFrame(P.dead1,P.dead2);
    case "scap": return twoFrame(
      {circles:[[150,38,10]],lines:[[150,48,150,105,9],[150,65,105,90,7],[150,65,195,90,7],[150,105,128,165,8],[150,105,172,165,8]]},
      {circles:[[150,38,10]],lines:[[150,48,150,105,9],[150,65,120,82,7],[150,65,180,82,7],[150,105,128,165,8],[150,105,172,165,8]]}
    );
    case "bench":
    case "floorpress":
    case "incline": return twoFrame(P.press1,P.press2,"Alt pozisyon","Press");
    case "row1":
    case "chestrow": return twoFrame(
      {circles:[[115,55,9]],lines:[[124,60,165,88,9],[165,88,190,150,8],[165,88,145,150,8],[145,77,118,115,7],[160,84,205,105,7]]},
      {circles:[[115,55,9]],lines:[[124,60,165,88,9],[165,88,190,150,8],[165,88,145,150,8],[145,77,158,98,7],[160,84,188,78,7]]}
    );
    case "goblet": return twoFrame(P.squat1,P.squat2);
    case "rdl": return twoFrame(P.hinge1,P.hinge2);
    case "curl":
    case "hammer": return twoFrame(
      P.stand(105),
      {circles:[[150,38,10]],lines:[[150,48,150,105,9],[150,65,120,86,7],[120,86,105,65,7],[150,65,180,86,7],[180,86,195,65,7],[150,105,128,165,8],[150,105,172,165,8]]},
      "Kollar aşağı","Curl"
    );
    case "split":
    case "lunge": return twoFrame(
      {circles:[[150,38,10]],lines:[[150,48,150,105,9],[150,65,120,93,7],[150,65,180,93,7],[150,105,120,165,8],[150,105,190,150,8]]},
      {circles:[[150,55,10]],lines:[[150,65,150,115,9],[150,80,120,105,7],[150,80,180,105,7],[150,115,115,145,8],[115,145,100,175,8],[150,115,188,145,8],[188,145,210,172,8]]}
    );
    case "shoulder": return twoFrame(
      {circles:[[150,38,10]],lines:[[150,48,150,105,9],[150,65,120,85,7],[120,85,113,60,7],[150,65,180,85,7],[180,85,187,60,7],[150,105,128,165,8],[150,105,172,165,8]]},
      {circles:[[150,38,10]],lines:[[150,48,150,105,9],[150,65,125,35,7],[125,35,120,12,7],[150,65,175,35,7],[175,35,180,12,7],[150,105,128,165,8],[150,105,172,165,8]]}
    );
    case "sideplank": return twoFrame(P.side1,P.side2);
    case "triceps": return twoFrame(
      {circles:[[150,38,10]],lines:[[150,48,150,105,9],[150,65,132,35,7],[132,35,150,18,7],[150,65,168,35,7],[168,35,150,18,7],[150,105,128,165,8],[150,105,172,165,8]]},
      {circles:[[150,38,10]],lines:[[150,48,150,105,9],[150,65,132,35,7],[132,35,118,12,7],[150,65,168,35,7],[168,35,182,12,7],[150,105,128,165,8],[150,105,172,165,8]]}
    );
    case "reversecrunch": return twoFrame(
      {rects:[[35,160,230,8,4,"#9fb6ca"]],circles:[[85,130,9]],lines:[[94,132,145,145,8],[145,145,175,120,8],[175,120,205,130,8],[120,138,110,158,7]]},
      {rects:[[35,160,230,8,4,"#9fb6ca"]],circles:[[85,130,9]],lines:[[94,132,140,138,8],[140,138,165,100,8],[165,100,188,80,8],[118,137,110,158,7]]}
    );
    case "lateral": return twoFrame(
      P.stand(105),
      {circles:[[150,38,10]],lines:[[150,48,150,105,9],[150,65,105,65,7],[150,65,195,65,7],[150,105,128,165,8],[150,105,172,165,8]]},
      "Kollar aşağı","Yana kaldır"
    );
    default: return twoFrame(P.stand(),P.stand(75));
  }
}

function todayKey(){
  const d=new Date().getDay();
  if(d===1) return "A";
  if(d===3) return "B";
  if(d===5) return "C";
  return "A";
}
function state(){
  return JSON.parse(localStorage.getItem("evdeGuclenV2")||'{"week":1,"logs":[],"done":{}}');
}
function saveState(s){ localStorage.setItem("evdeGuclenV2",JSON.stringify(s)); }

function exerciseObj(row, week){
  const c=cfg[week];
  return {id:row[0],name:row[1],meta:row[2],reps:row[3],sets:c.sets,rir:c.rir,cues:[row[4]],lordosis:row[5]};
}
function renderExercise(ex,parent,scope){
  const tpl=q("#exerciseTemplate").content.cloneNode(true);
  const card=tpl.querySelector(".exercise");
  card.dataset.scope=scope;card.dataset.id=ex.id;
  tpl.querySelector(".exercise-name").textContent=ex.name;
  tpl.querySelector(".exercise-meta").textContent=ex.meta;
  tpl.querySelector(".sets").value=ex.sets;
  tpl.querySelector(".reps").value=ex.reps;
  tpl.querySelector(".rir").value=ex.rir ?? "";
  tpl.querySelector(".demo").innerHTML=demoSVG(ex.id);
  const cues=tpl.querySelector(".cues");
  (ex.cues||[]).forEach(c=>{const li=document.createElement("li");li.textContent=c;cues.appendChild(li)});
  tpl.querySelector(".lordosis-note").textContent=ex.lordosis||"";
  const s=state();
  tpl.querySelector(".done").checked=!!s.done[scope+"::"+ex.id];
  tpl.querySelector(".demo-toggle").onclick=e=>{
    const wrap=e.currentTarget.nextElementSibling;
    wrap.hidden=!wrap.hidden;
    e.currentTarget.textContent=wrap.hidden?"Hareketi göster":"Gösterimi kapat";
  };
  tpl.querySelector(".done").onchange=e=>{
    const st=state();st.done[scope+"::"+ex.id]=e.target.checked;saveState(st);updateStats();
  };
  tpl.querySelector(".save-log").onclick=e=>{
    const c=e.currentTarget.closest(".exercise");
    const st=state();
    st.logs.unshift({
      time:new Date().toISOString(),scope,id:ex.id,name:ex.name,
      sets:c.querySelector(".sets").value,reps:c.querySelector(".reps").value,
      weight:c.querySelector(".weight").value,rir:c.querySelector(".rir").value
    });
    st.done[scope+"::"+ex.id]=true; saveState(st);
    c.querySelector(".done").checked=true;
    e.currentTarget.textContent="Kaydedildi ✓";
    setTimeout(()=>e.currentTarget.textContent="Seti kaydet",900);
    updateStats();renderHistory();
  };
  parent.appendChild(tpl);
}
function renderToday(){
  const el=q("#today");el.innerHTML="";
  const day=todayKey(), w=+state().week;
  el.insertAdjacentHTML("beforeend",`<h2 class="section-title">Bugünkü antrenman · Gün ${day}</h2><p class="section-note">${cfg[w].note}. Önce 6–8 dakikalık ısınmayı tamamla.</p>`);
  days[day].forEach(row=>renderExercise(exerciseObj(row,w),el,"day"+day));
}
function renderWarmup(){
  const el=q("#warmup");el.innerHTML=`<h2 class="section-title">6–8 dakikalık ısınma</h2><p class="section-note">Tüm hareketlerin hareketli, çevrimdışı çalışan gösterimi aşağıda. Uzun statik esneme yerine kısa mobilite + aktivasyon.</p>`;
  warmup.forEach(ex=>renderExercise(ex,el,"warmup"));
}
function renderProgram(){
  const el=q("#program");el.innerHTML=`<h2 class="section-title">3 günlük program</h2><p class="section-note">Önerilen düzen: Pazartesi · Çarşamba · Cuma. Günleri değiştirebilirsin; arada en az bir dinlenme günü bırakmak başlangıçta iyi olur.</p>`;
  const w=+state().week;
  Object.entries(days).forEach(([k,rows])=>{
    const card=document.createElement("div");card.className="day-card card";
    card.innerHTML=`<h3>Gün ${k}</h3><p>${cfg[w].sets} set · çoğu harekette RIR ${cfg[w].rir}</p><div class="day-list">${rows.map(r=>`<span>${r[1]}</span>`).join("")}</div>`;
    el.appendChild(card);
  });
}
function renderHistory(){
  const el=q("#history"); const logs=state().logs||[];
  el.innerHTML=`<h2 class="section-title">Antrenman geçmişi</h2><p class="section-note">Kaydettiğin setler bu cihazda tutulur.</p>`;
  if(!logs.length){el.insertAdjacentHTML("beforeend",`<div class="card empty">Henüz kayıt yok.</div>`);return}
  const box=document.createElement("div");box.className="card";box.style.padding="16px";
  logs.slice(0,100).forEach(x=>{
    const d=new Date(x.time);
    box.insertAdjacentHTML("beforeend",`<div class="log-item"><b>${x.name}</b><small>${d.toLocaleString("tr-TR")} · ${x.sets} set · ${x.reps}${x.weight?` · ${x.weight} kg`:""}${x.rir!==""?` · RIR ${x.rir}`:""}</small></div>`);
  });
  el.appendChild(box);
}
function updateStats(){
  const s=state(); const day=todayKey(); const total=days[day].length;
  const done=days[day].filter(r=>s.done["day"+day+"::"+r[0]]).length;
  q("#todayDone").textContent=Math.round(done*100/total)+"%";
  let wd=0;["A","B","C"].forEach(k=>{if(days[k].every(r=>s.done["day"+k+"::"+r[0]])) wd++});
  q("#weekDone").textContent=wd+"/3";q("#logCount").textContent=(s.logs||[]).length;
}
function renderAll(){renderToday();renderWarmup();renderProgram();renderHistory();updateStats()}

qa(".tab").forEach(b=>b.onclick=()=>{
  qa(".tab").forEach(x=>x.classList.remove("active"));qa(".panel").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");q("#"+b.dataset.tab).classList.add("active");
});

const st=state();q("#weekSelect").value=st.week;
q("#weekSelect").onchange=e=>{const s=state();s.week=+e.target.value;saveState(s);renderAll()};

let deferredPrompt;
window.addEventListener("beforeinstallprompt",e=>{
  e.preventDefault();deferredPrompt=e;q("#installBtn").hidden=false;
});
q("#installBtn").onclick=async()=>{
  if(!deferredPrompt) return;
  deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; q("#installBtn").hidden=true;
};

if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"))}
renderAll();
