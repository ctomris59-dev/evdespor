const q = (s) => document.querySelector(s);
const qa = (s) => [...document.querySelectorAll(s)];

const phases = {
  1: { label: "1. Hafta · Adaptasyon", note: "Tekniği öğren, hareketleri rahat ve kontrollü yap. Amaç ilk hafta yorulmak değil, vücudu yeniden kuvvet çalışmasına hazırlamak." },
  2: { label: "2. Hafta · Temel", note: "Ana hareket kalıplarını koru. Son tekrarlar hissedilsin ama form bozulmasın." },
  3: { label: "3. Hafta · Hacim", note: "Ana hareketlerde hacmi artırıyoruz. Aynı hareketleri korumak performansı ve tekniği takip etmeyi kolaylaştırır." },
  4: { label: "4. Hafta · Progresyon", note: "Üst tekrar sınırı temiz ve kontrollü geliyorsa ağırlığı küçük miktarda artır." },
  5: { label: "5+ Hafta · Kas Gelişimi", note: "Ana hareketleri 6–8 hafta sabit tutup kademeli ağırlık veya tekrar artır. Göğüs, sırt ve kollarda yeterli haftalık hacmi koru." }
};

const dayInfo = {
  A: "Göğüs · sırt · squat · hinge · core · biceps",
  B: "Üst göğüs · sırt · tek bacak · omuz · core · triceps",
  C: "Göğüs · sırt · bacak · hinge · core · biceps"
};

const warmup = [
  { id:"catcamel", name:"Cat–Cow", meta:"Omurga mobilitesi · 6 yavaş tekrar", sets:1, reps:"6", weighted:false, lordosis:"Omurgayı ağrısız aralıkta nazikçe hareket ettir; uç pozisyonlara zorla gitme.", cues:["Dört ayak pozisyonunda başla.","Yuvarlanma ve açılmayı yavaş yap.","Nefesi tutma."] },
  { id:"hiprotation", name:"Ayakta Kalça Rotasyonu", meta:"Kalça mobilitesi · 6/yan", sets:1, reps:"6/yan", weighted:false, lordosis:"Kalça hareketini belden telafi etme; gövdeyi mümkün olduğunca sabit tut.", cues:["Küçük dairelerle başla.","Pelvisi gereksiz yere öne devirmeden hareket et.","Ağrısız aralığı kullan."] },
  { id:"bwsquat", name:"Bodyweight Squat", meta:"Kalça–diz ısınması · 8 tekrar", sets:1, reps:"8", weighted:false, lordosis:"Aşağı inerken göğsü aşırı kaldırıp bel kavsini büyütme.", cues:["Ayakları rahat omuz genişliğine getir.","Dizleri ayak yönünde takip ettir.","Topukları yerde tut."] },
  { id:"bridge", name:"Glute Bridge", meta:"Glute aktivasyonu · 10 tekrar", sets:1, reps:"10", weighted:false, lordosis:"Üstte kalçayı sık; ekstra yükselmek için beli arkaya bükme.", cues:["Topukları kalçaya yakın yerleştir.","Nefes verip kaburgaları aşağıda tut.","Kalçayı glute ile kaldır."] },
  { id:"deadbug", name:"Dead Bug", meta:"Core aktivasyonu · 6/yan", sets:1, reps:"6/yan", weighted:false, lordosis:"Bel boşluğunun artmasına izin verme; kontrol kaybolursa hareket mesafesini kısalt.", cues:["Kalça ve diz yaklaşık 90°.","Karşı kol ve bacağı yavaş uzat.","Nefes verirken karın duvarını aktif tut."] },
  { id:"scap", name:"Scapular Retraction", meta:"Kürek kemiği aktivasyonu · 10 tekrar", sets:1, reps:"10", weighted:false, lordosis:"Kürek kemiklerini geriye alırken göğsü fırlatıp belden telafi etme.", cues:["Omuzları kulaklardan uzak tut.","Kürek kemiklerini nazikçe birbirine yaklaştır.","Boynu gevşek tut."] }
];

const week1 = {
  A: [
    {id:"bench",name:"Dumbbell Bench Press",muscles:"Göğüs · triceps",reps:"8–10",sets:2,weighted:true,cue:"Ayaklar sabit; dumbbell'ları kontrollü indir.",lordosis:"Kaburgaları yukarı fırlatıp beli aşırı çukurlaştırma."},
    {id:"chestrow",name:"Chest-supported Dumbbell Row",muscles:"Sırt · biceps",reps:"8–10",sets:2,weighted:true,cue:"Göğsü sehpaya destekle; dirsekleri geriye çek.",lordosis:"Göğüs desteği belden telafiyi azaltır; boynu nötr tut."},
    {id:"goblet",name:"Goblet Squat",muscles:"Quadriceps · glute",reps:"8",sets:2,weighted:true,cue:"Dumbbell göğüs önünde; diz ve ayak aynı yönde.",lordosis:"Alt pozisyonda bel kavsini büyütmeden kontrollü in."},
    {id:"bridge",name:"Glute Bridge",muscles:"Glute · pelvis kontrolü",reps:"10–12",sets:2,weighted:false,cue:"Topuklardan it; üstte glute sık.",lordosis:"Ekstra yükselmek için lumbar hiper-ekstansiyon yapma."},
    {id:"deadbug",name:"Dead Bug",muscles:"Karın · core",reps:"6/yan",sets:2,weighted:false,cue:"Karşı kol ve bacağı yavaş uzat.",lordosis:"Bel boşluğu artarsa hareket mesafesini kısalt."}
  ],
  B: [
    {id:"incline",name:"Incline Dumbbell Press",muscles:"Üst göğüs · triceps",reps:"8–10",sets:2,weighted:true,cue:"Sehpayı yaklaşık 20–35° yap.",lordosis:"Kaburga–pelvis kontrolünü koru; aşırı bel kavsi yok."},
    {id:"row1",name:"One-arm Dumbbell Row",muscles:"Sırt · biceps",reps:"8–10/kol",sets:2,weighted:true,cue:"Dirseği kalçaya doğru çek; omzu kulağa yükseltme.",lordosis:"Gövdeyi çevirmeden nötr bel pozisyonunu koru."},
    {id:"lunge",name:"Reverse Lunge",muscles:"Bacak · glute",reps:"6/bacak",sets:2,weighted:false,cue:"Geri adımı kontrollü al; ön ayağı tam bas.",lordosis:"Gövdeyi dik tutmak için beli aşırı çukurlaştırma."},
    {id:"rdl",name:"Dumbbell Romanian Deadlift",muscles:"Hamstring · glute",reps:"8",sets:2,weighted:true,cue:"Kalçayı geriye gönder; dumbbell'ları bacaklara yakın tut.",lordosis:"Belden değil kalçadan menteşe yap; nötr bel pozisyonunu koru."},
    {id:"sideplank",name:"Side Plank",muscles:"Oblique · core",reps:"20–30 sn/yan",sets:2,weighted:false,cue:"Baş–omuz–kalça aynı çizgide.",lordosis:"Kalçayı düşürme ve gövdeyi çevirmeden nefes almaya devam et."}
  ],
  C: [
    {id:"floorpress",name:"Dumbbell Floor Press",muscles:"Göğüs · triceps",reps:"8–10",sets:2,weighted:true,cue:"Dirsekleri zemine kontrollü indir.",lordosis:"Bel kavsini büyütmeden press yap."},
    {id:"chestrow",name:"Chest-supported Dumbbell Row",muscles:"Sırt · biceps",reps:"8–10",sets:2,weighted:true,cue:"Göğsü sehpaya destekle; dirsekleri geriye çek.",lordosis:"Belden salınım yapmadan kürek kemiklerini kontrol et."},
    {id:"goblet",name:"Goblet Squat",muscles:"Quadriceps · glute",reps:"8–10",sets:2,weighted:true,cue:"Kontrollü in, topukları yerde tut.",lordosis:"Kaburgaları pelvis üzerinde tut; bel kavsini artırma."},
    {id:"bridge",name:"Glute Bridge",muscles:"Glute · pelvis kontrolü",reps:"10–12",sets:2,weighted:false,cue:"Topuklardan it, üstte glute sık.",lordosis:"Hareketi belden değil kalçadan tamamla."},
    {id:"reversecrunch",name:"Reverse Crunch",muscles:"Karın · pelvis kontrolü",reps:"8–10",sets:2,weighted:false,cue:"Kuyruk sokumunu kontrollü yerden kaldır.",lordosis:"Momentum yerine posterior pelvic tilt üret."},
    {id:"curl",name:"Dumbbell Curl",muscles:"Biceps",reps:"10–12",sets:2,weighted:true,cue:"Dirsek gövde yanında; inişi yavaş kontrol et.",lordosis:"Belden sallanarak tekrar üretme."}
  ]
};

const baseProgram = {
  A: [
    {id:"bench",name:"Dumbbell Bench Press",muscles:"Göğüs · triceps",reps:"8–12",weighted:true,cue:"Ayaklar sabit; dumbbell'ları kontrollü indir.",lordosis:"Kaburgaları yukarı fırlatıp beli aşırı çukurlaştırma."},
    {id:"chestrow",name:"Chest-supported Dumbbell Row",muscles:"Sırt · biceps",reps:"8–12",weighted:true,cue:"Göğsü sehpaya destekle; dirsekleri geriye çek.",lordosis:"Göğüs desteği belden telafiyi azaltır."},
    {id:"goblet",name:"Goblet Squat",muscles:"Quadriceps · glute",reps:"8–12",weighted:true,cue:"Dumbbell göğüs önünde; diz ve ayak aynı yönde.",lordosis:"Alt pozisyonda bel kavsini büyütmeden kontrollü in."},
    {id:"rdl",name:"Dumbbell Romanian Deadlift",muscles:"Hamstring · glute",reps:"8–12",weighted:true,cue:"Kalçayı geriye gönder; dumbbell'lar bacaklara yakın.",lordosis:"Belden değil kalçadan menteşe yap."},
    {id:"deadbug",name:"Dead Bug",muscles:"Karın · core",reps:"6–10/yan",weighted:false,cue:"Karşı kol ve bacağı yavaş uzat.",lordosis:"Bel boşluğu artarsa hareket mesafesini kısalt."},
    {id:"curl",name:"Dumbbell Curl",muscles:"Biceps",reps:"10–15",weighted:true,cue:"Dirsek gövde yanında; inişi yavaş kontrol et.",lordosis:"Belden sallanarak tekrar üretme."}
  ],
  B: [
    {id:"incline",name:"Incline Dumbbell Press",muscles:"Üst göğüs · triceps",reps:"8–12",weighted:true,cue:"Sehpayı yaklaşık 20–35° yap.",lordosis:"Kaburga–pelvis kontrolünü koru; aşırı bel kavsi yok."},
    {id:"row1",name:"One-arm Dumbbell Row",muscles:"Sırt · biceps",reps:"8–12/kol",weighted:true,cue:"Dirseği kalçaya doğru çek; omzu kulağa yükseltme.",lordosis:"Gövdeyi çevirmeden nötr bel pozisyonunu koru."},
    {id:"split",name:"Bulgarian Split Squat",muscles:"Quadriceps · glute",reps:"8–10/bacak",weighted:true,cue:"Ön ayağı tam bas; arka bacak sadece destek olsun.",lordosis:"Denge için beli geriye atma; pelvis kontrolünü koru."},
    {id:"shoulder",name:"Seated Dumbbell Shoulder Press",muscles:"Omuz · triceps",reps:"8–12",weighted:true,cue:"Sehpaya otur; dumbbell'ları kontrollü press et.",lordosis:"Oturmak belden geriye kaçmayı azaltır; kaburgaları aşağıda tut."},
    {id:"sideplank",name:"Side Plank",muscles:"Oblique · core",reps:"20–40 sn/yan",weighted:false,cue:"Baş–omuz–kalça aynı çizgide.",lordosis:"Kalçayı düşürme; nefesi tutma."},
    {id:"triceps",name:"Overhead Triceps Extension",muscles:"Triceps",reps:"10–15",weighted:true,cue:"Dirsekleri çok açmadan kontrollü indir.",lordosis:"Kaburgaları öne çıkarmadan karını aktif tut."}
  ],
  C: [
    {id:"floorpress",name:"Dumbbell Floor Press",muscles:"Göğüs · triceps",reps:"8–12",weighted:true,cue:"Dirsekleri zemine kontrollü indir.",lordosis:"Bel kavsini büyütmeden press yap."},
    {id:"chestrow",name:"Chest-supported Dumbbell Row",muscles:"Sırt · biceps",reps:"8–12",weighted:true,cue:"Göğsü sehpaya destekle; dirsekleri geriye çek.",lordosis:"Göğüs desteği belden telafiyi azaltır."},
    {id:"lunge",name:"Reverse Lunge",muscles:"Bacak · glute",reps:"8–10/bacak",weighted:true,cue:"Geri adımı kontrollü al; ön ayağı tam bas.",lordosis:"Gövdeyi dik tutmak için beli aşırı çukurlaştırma."},
    {id:"rdl",name:"Dumbbell Romanian Deadlift",muscles:"Hamstring · glute",reps:"8–12",weighted:true,cue:"Kalça menteşesi; hamstring gerilimini hisset.",lordosis:"Nötr bel pozisyonunu koru."},
    {id:"reversecrunch",name:"Reverse Crunch",muscles:"Karın · pelvis kontrolü",reps:"8–15",weighted:false,cue:"Kuyruk sokumunu kontrollü yerden kaldır.",lordosis:"Momentum yerine posterior pelvic tilt üret."},
    {id:"hammer",name:"Hammer Curl",muscles:"Biceps · brachialis",reps:"10–15",weighted:true,cue:"Avuç içleri birbirine bakar; dirsek sabit.",lordosis:"Gövde sallanmasın."}
  ]
};

const tenorPosts = {
  catcamel:{id:"3241472213518054401",url:"https://tenor.com/view/cat-cow-stretch-gif-3241472213518054401",ratio:"1"},
  hiprotation:{id:"13808788",url:"https://tenor.com/view/shaking-hip-rotation-hip-rotating-relaxing-fitness-gif-13808788",ratio:"1.77"},
  bwsquat:{id:"20516887",url:"https://tenor.com/view/squat-james-smith-james-smith-pt-perfect-form-working-out-gif-20516887",ratio:"0.56"},
  bridge:{id:"16591507",url:"https://tenor.com/view/glute-bridge-exercise-workout-gif-16591507",ratio:"1"},
  deadbug:{id:"19407840",url:"https://tenor.com/view/deadbug-core-gif-19407840",ratio:"1.78"},
  scap:{id:"25307034",url:"https://tenor.com/view/rhomboid-major-shoulder-retraction-scapula-adduction-adduction-retraction-gif-25307034",ratio:"1.34"},
  bench:{id:"12102433772138781391",url:"https://tenor.com/view/dumbbellbenchpress-gif-12102433772138781391",ratio:"1"},
  row1:{id:"25623538",url:"https://tenor.com/view/db-tripod-row-gif-25623538",ratio:"1.79"},
  goblet:{id:"25623494",url:"https://tenor.com/view/db-goblet-squats-gif-25623494",ratio:"1.79"},
  rdl:{id:"16373163138971048501",url:"https://tenor.com/view/dumbbell-rdl-gif-16373163138971048501",ratio:"1"},
  curl:{id:"8434444834006563548",url:"https://tenor.com/view/dumbbellbicepcurls-gif-8434444834006563548",ratio:"1"},
  incline:{id:"7606640835620086247",url:"https://tenor.com/view/gymexercisesmen-inclinedumbbellpress-gif-7606640835620086247",ratio:"1"},
  split:{id:"25623757",url:"https://tenor.com/view/db-bulgarian-split-squat-gif-25623757",ratio:"1.79"},
  shoulder:{id:"17350548",url:"https://tenor.com/view/shoulder-press-seated-shoulder-press-lift-work-out-exercise-gif-17350548",ratio:"1"},
  sideplank:{id:"12670642771450085987",url:"https://tenor.com/view/noequipmentexercisesmen-sideplanks-gif-12670642771450085987",ratio:"1.77"},
  triceps:{id:"26615160",url:"https://tenor.com/view/seated-dumbbell-overhead-triceps-extension-gif-26615160",ratio:"2.22"},
  floorpress:{id:"14058573",url:"https://tenor.com/view/lifting-weights-dumbbell-press-gains-training-exercise-gif-14058573",ratio:"1.78"},
  chestrow:{id:"25615009",url:"https://tenor.com/view/chest-supported-row-gif-25615009",ratio:"1.79"},
  lunge:{id:"25623789",url:"https://tenor.com/view/db-reverse-lunge-gif-25623789",ratio:"1.79"},
  reversecrunch:{id:"16737113",url:"https://tenor.com/view/reverse-crunches-exercise-home-workouts-travel-workouts-fitness-gif-16737113",ratio:"1.78"},
  hammer:{id:"9866968935600309559",url:"https://tenor.com/view/dumbell-hammer-curls-gif-9866968935600309559",ratio:"0.56"}
};

function todayKey(){ const d=new Date().getDay(); if(d===1)return"A"; if(d===3)return"B"; if(d===5)return"C"; return"A"; }
function baseState(){ return {week:1,selectedDay:todayKey(),logs:[],done:{}}; }
function state(){ try{ const saved=JSON.parse(localStorage.getItem("evdeGuclenV2"))||{}; return {...baseState(),...saved,selectedDay:saved.selectedDay||todayKey(),logs:saved.logs||[],done:saved.done||{}};}catch{return baseState();} }
function saveState(s){ localStorage.setItem("evdeGuclenV2",JSON.stringify(s)); }
function weekScope(week,scope){ return `w${week}::${scope}`; }

function programForWeek(week){
  if(+week===1) return week1;
  const sets=+week===2?2:3;
  const program={};
  Object.entries(baseProgram).forEach(([day,rows])=>{
    program[day]=rows.map((r,i)=>({...r,sets:(+week===5 && day==="A" && i<2)?4:sets}));
  });
  if(+week===2){
    program.B=program.B.map(r=>r.id==="split"?{...r,id:"lunge",name:"Reverse Lunge",reps:"8/bacak",weighted:true,cue:"Geri adımı kontrollü al; ön ayağı tam bas.",lordosis:"Gövdeyi dik tutmak için beli aşırı çukurlaştırma."}:r);
  }
  return program;
}

function loadTenorDemo(container,id){
  if(container.dataset.loaded==="1")return;
  const t=tenorPosts[id];
  if(!t){container.innerHTML='<div class="gif-error">Bu hareket için GIF henüz eklenmedi.</div>';return;}
  container.innerHTML=`<div class="tenor-box"><div class="tenor-gif-embed" data-postid="${t.id}" data-share-method="host" data-aspect-ratio="${t.ratio}" data-width="100%"><a href="${t.url}">Egzersiz GIF</a></div><a class="tenor-credit" href="${t.url}" target="_blank" rel="noopener">Via Tenor</a></div>`;
  container.dataset.loaded="1";
  const script=document.createElement("script"); script.src="https://tenor.com/embed.js?ts="+Date.now(); script.async=true; document.body.appendChild(script);
}

function latestLogForExercise(id){
  return (state().logs||[]).find(x=>x.id===id && x.weight!==undefined && x.weight!==null && String(x.weight).trim()!=="");
}

function renderExercise(ex,parent,scope,week){
  const tpl=q("#exerciseTemplate").content.cloneNode(true);
  const card=tpl.querySelector(".exercise");
  const demo=tpl.querySelector(".demo");
  const fullScope=weekScope(week,scope);
  card.dataset.scope=fullScope; card.dataset.id=ex.id;
  tpl.querySelector(".exercise-name").textContent=ex.name;
  tpl.querySelector(".exercise-meta").textContent=`${ex.muscles||ex.meta} · ${ex.sets} × ${ex.reps}`;
  tpl.querySelector(".sets").value=ex.sets;
  tpl.querySelector(".reps").value=ex.reps;
  tpl.querySelector(".save-log").textContent="Hareketi kaydet";

  const weightInput=tpl.querySelector(".weight");
  const weightLabel=weightInput.closest("label");
  const prev=latestLogForExercise(ex.id);
  if(ex.weighted===false){
    weightLabel.style.display="none";
  }else if(prev){
    weightInput.value=prev.weight;
    const note=document.createElement("div");
    note.className="last-performance";
    const d=new Date(prev.time);
    note.innerHTML=`<span>Son kayıt</span><b>${prev.weight} kg</b><small>${prev.sets} set · ${prev.reps} · ${d.toLocaleDateString("tr-TR")}</small><em>Ağırlık otomatik dolduruldu</em>`;
    tpl.querySelector(".logging").insertAdjacentElement("beforebegin",note);
  }

  const cues=tpl.querySelector(".cues");
  [ex.cue,...(ex.cues||[])].filter(Boolean).forEach(c=>{const li=document.createElement("li");li.textContent=c;cues.appendChild(li);});
  tpl.querySelector(".lordosis-note").textContent=ex.lordosis||"";
  const s=state(); tpl.querySelector(".done").checked=!!s.done[fullScope+"::"+ex.id];

  tpl.querySelector(".demo-toggle").onclick=(e)=>{const wrap=e.currentTarget.nextElementSibling; const willOpen=wrap.hidden; wrap.hidden=!wrap.hidden; if(willOpen)loadTenorDemo(demo,ex.id); e.currentTarget.textContent=wrap.hidden?"Hareketi göster":"Gösterimi kapat";};
  tpl.querySelector(".done").onchange=(e)=>{const st=state();st.done[fullScope+"::"+ex.id]=e.target.checked;saveState(st);updateStats();};
  tpl.querySelector(".save-log").onclick=(e)=>{
    const c=e.currentTarget.closest(".exercise"); const st=state();
    st.logs.unshift({time:new Date().toISOString(),week,scope,id:ex.id,name:ex.name,sets:c.querySelector(".sets").value,reps:c.querySelector(".reps").value,weight:ex.weighted===false?"":c.querySelector(".weight").value});
    st.done[fullScope+"::"+ex.id]=true; saveState(st); c.querySelector(".done").checked=true;
    e.currentTarget.textContent="Kaydedildi ✓"; setTimeout(()=>e.currentTarget.textContent="Hareketi kaydet",900); updateStats(); renderHistory();
  };
  parent.appendChild(tpl);
}

function daySwitcher(selected){ return `<div class="day-switch" aria-label="Antrenman günü seçimi">${["A","B","C"].map(d=>`<button class="day-choice ${d===selected?"active":""}" data-day="${d}"><strong>Gün ${d}</strong><small>${dayInfo[d]}</small></button>`).join("")}</div>`; }
function bindDaySwitcher(container){container.querySelectorAll(".day-choice").forEach(b=>b.onclick=()=>{const st=state();st.selectedDay=b.dataset.day;saveState(st);renderToday();updateStats();});}

function renderToday(){
  const el=q("#today"), st=state(), day=st.selectedDay, w=+st.week, program=programForWeek(w);
  el.innerHTML=`${daySwitcher(day)}<div class="science-strip"><b>${phases[w].label}</b><span>${phases[w].note}</span></div><h2 class="section-title">Gün ${day}</h2><p class="section-note">Önce 6–8 dakikalık ısınmayı tamamla. Set sonunda formun bozulmadan birkaç tekrar daha çıkarabilecek pay bırak; tükenişe gitmek gerekmiyor.</p>`;
  bindDaySwitcher(el); program[day].forEach(ex=>renderExercise(ex,el,"day"+day,w));
}

function renderWarmup(){
  const el=q("#warmup"),w=+state().week;
  el.innerHTML='<h2 class="section-title">6–8 dakikalık ısınma</h2><p class="section-note">Kısa mobilite + aktivasyon. Uzun statik esneme yerine kontrollü hareket ve kas aktivasyonu kullanıyoruz.</p>';
  warmup.forEach(ex=>renderExercise(ex,el,"warmup",w));
}

function openWorkoutDay(day){const st=state();st.selectedDay=day;saveState(st);qa(".tab").forEach(x=>x.classList.remove("active"));qa(".panel").forEach(x=>x.classList.remove("active"));q('.tab[data-tab="today"]').classList.add("active");q("#today").classList.add("active");renderToday();updateStats();window.scrollTo({top:0,behavior:"smooth"});}

function renderProgram(){
  const el=q("#program"),w=+state().week,program=programForWeek(w);
  const phaseNote=w===1?"Bu hafta özellikle daha basit ve kontrollü varyasyonlar var.":"Ana hareketlerin çoğunu bilinçli olarak sabit tutuyoruz; kas gelişiminde ilerlemeyi ağırlık, tekrar ve set performansından takip etmek hareketleri her hafta değiştirmekten daha kullanışlıdır.";
  el.innerHTML=`<div class="science-card card"><h2>Bilimsel program mantığı</h2><p>${phaseNote}</p><div class="science-points"><span>3 gün full-body</span><span>Çok eklemli hareket önceliği</span><span>Core + glute/hamstring kontrolü</span><span>Göğüs ve kollara ekstra hacim</span></div></div><h2 class="section-title">${phases[w].label}</h2><p class="section-note">${phases[w].note}</p>`;
  Object.entries(program).forEach(([k,rows])=>{
    const card=document.createElement("div"); card.className="day-card card detailed-day";
    card.innerHTML=`<div class="day-card-head"><div><h3>Gün ${k}</h3><p>${dayInfo[k]}</p></div></div><div class="program-list">${rows.map(r=>`<div class="program-exercise"><div><b>${r.name}</b><small>${r.muscles}</small></div><strong>${r.sets} × ${r.reps}</strong></div>`).join("")}</div><button class="primary open-day" data-day="${k}">Gün ${k}'yı aç</button>`;
    el.appendChild(card);
  });
  el.querySelectorAll(".open-day").forEach(b=>b.onclick=()=>openWorkoutDay(b.dataset.day));
}

function renderHistory(){
  const el=q("#history"),logs=state().logs||[];
  el.innerHTML='<h2 class="section-title">Antrenman geçmişi</h2><p class="section-note">Aynı hareketi tekrar açtığında en son kullandığın ağırlık otomatik olarak doldurulur.</p>';
  if(!logs.length){el.insertAdjacentHTML("beforeend",'<div class="card empty">Henüz kayıt yok.</div>');return;}
  const box=document.createElement("div");box.className="card";box.style.padding="16px";
  logs.slice(0,100).forEach(x=>{const d=new Date(x.time),wk=x.week?`Hafta ${x.week} · `:"",day=x.scope&&x.scope.startsWith("day")?`Gün ${x.scope.replace("day","")} · `:"";box.insertAdjacentHTML("beforeend",`<div class="log-item"><b>${x.name}</b><small>${d.toLocaleString("tr-TR")} · ${wk}${day}${x.sets} set · ${x.reps}${x.weight?` · ${x.weight} kg`:""}</small></div>`);});
  el.appendChild(box);
}

function updateStats(){
  const st=state(),w=+st.week,day=st.selectedDay,program=programForWeek(w),scope=weekScope(w,"day"+day);
  const total=program[day].length,done=program[day].filter(r=>st.done[scope+"::"+r.id]).length;
  q("#todayDone").textContent=Math.round(done*100/total)+"%";
  let wd=0;["A","B","C"].forEach(k=>{const ds=weekScope(w,"day"+k);if(program[k].every(r=>st.done[ds+"::"+r.id]))wd++;});
  q("#weekDone").textContent=wd+"/3"; q("#logCount").textContent=(st.logs||[]).length;
}

function renderAll(){renderToday();renderWarmup();renderProgram();renderHistory();updateStats();}
qa(".tab").forEach(b=>b.onclick=()=>{qa(".tab").forEach(x=>x.classList.remove("active"));qa(".panel").forEach(x=>x.classList.remove("active"));b.classList.add("active");q("#"+b.dataset.tab).classList.add("active");});
const st=state();q("#weekSelect").value=st.week;q("#weekSelect").onchange=(e)=>{const s=state();s.week=+e.target.value;saveState(s);renderAll();};
let deferredPrompt;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;q("#installBtn").hidden=false;});q("#installBtn").onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;q("#installBtn").hidden=true;};
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));}
renderAll();