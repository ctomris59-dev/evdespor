const q = (s) => document.querySelector(s);
const qa = (s) => [...document.querySelectorAll(s)];

const cfg = {
  1: { sets: 2, note: "Adaptasyon · hareketleri rahat ve kontrollü yap; amaç tekniği öğrenmek" },
  2: { sets: 2, note: "Temel kuvvet · son tekrarlar hissedilsin ama form bozulmasın" },
  3: { sets: 3, note: "Hacim artışı · tüm tekrarları temiz formda tamamla" },
  4: { sets: 3, note: "Progresyon · üst tekrar sınırı rahat geliyorsa ağırlığı küçük miktarda artır" },
  5: { sets: 3, note: "Düzenli progresyon · formu koruyarak kademeli ağırlık veya tekrar artır" }
};

const dayInfo = {
  A: "Göğüs · sırt · bacak · core · biceps",
  B: "Üst göğüs · omuz · bacak · core · triceps",
  C: "Göğüs · sırt · bacak · core · omuz · biceps"
};

const warmup = [
  { id: "catcamel", name: "Cat–Cow", meta: "Omurga mobilitesi · 6 yavaş tekrar", sets: 1, reps: "6", lordosis: "Amaç beli zorla esnetmek değil; omurgayı ağrısız aralıkta nazikçe hareket ettirmek.", cues: ["Dört ayak pozisyonunda başla.", "Yuvarlanma ve açılmayı yavaş yap.", "Uç pozisyonlara zorla gitme."] },
  { id: "hiprotation", name: "Ayakta Kalça Rotasyonu", meta: "Kalça mobilitesi · 6/yan", sets: 1, reps: "6/yan", lordosis: "Kalça hareketini belden telafi etme; gövdeyi olabildiğince sabit tut.", cues: ["Küçük ve kontrollü dairelerle başla.", "Pelvisi gereksiz yere öne devirmeden hareket et.", "Ağrısız hareket açıklığını kullan."] },
  { id: "bwsquat", name: "Bodyweight Squat", meta: "Kalça–diz ısınması · 8 tekrar", sets: 1, reps: "8", lordosis: "Aşağı inerken göğsü aşırı kaldırıp bel kavsini büyütme.", cues: ["Ayakları omuz genişliğinde aç.", "Dizleri ayak yönünde takip ettir.", "Topuğu yerde tut."] },
  { id: "bridge", name: "Glute Bridge", meta: "Glute aktivasyonu · 10 tekrar", sets: 1, reps: "10", lordosis: "Üstte kalçayı sık; ekstra yükselmek için beli arkaya bükme.", cues: ["Topukları kalçaya yakın yerleştir.", "Nefes verip kaburgaları aşağıda tut.", "Kalçayı glute ile kaldır."] },
  { id: "deadbug", name: "Dead Bug", meta: "Core aktivasyonu · 6/yan", sets: 1, reps: "6/yan", lordosis: "Bel boşluğunun artmasına izin verme; kontrol kaybolursa hareket mesafesini kısalt.", cues: ["Kalça ve diz yaklaşık 90°.", "Karşı kol ve bacağı yavaş uzat.", "Nefes verirken karın duvarını aktif tut."] },
  { id: "shoulderroll", name: "Shoulder Rolls", meta: "Omuz mobilitesi · 10 tekrar", sets: 1, reps: "10", lordosis: "Omuzları çevirirken göğsü öne fırlatıp belini aşırı çukurlaştırma.", cues: ["Omuzları yavaşça geriye doğru daire çizdir.", "Boynu gevşek tut.", "Hareketi acele etmeden yap."] },
  { id: "scap", name: "Scapular Retraction", meta: "Kürek kemiği aktivasyonu · 10 tekrar", sets: 1, reps: "10", lordosis: "Kürek kemiklerini geriye alırken belden telafi etme.", cues: ["Kolları rahat tut.", "Kürek kemiklerini nazikçe birbirine yaklaştır.", "Omuzları kulaklara kaldırma."] }
];

const days = {
  A: [
    ["bench", "Dumbbell Bench Press", "Göğüs · triceps", "8–12", "Ayaklar sabit; dumbbell'ları kontrollü indir.", "Kaburgaları yukarı fırlatıp beli aşırı çukurlaştırma."],
    ["row1", "One-arm Dumbbell Row", "Sırt · biceps", "8–12/kol", "Dirseği kalçaya doğru çek; omzu kulağa yükseltme.", "Gövdeyi çevirmeden nötr bel pozisyonunu koru."],
    ["goblet", "Goblet Squat", "Quadriceps · glute", "8–12", "Dumbbell göğüs önünde; diz ve ayak aynı yönde.", "Alt pozisyonda bel kavsini büyütmek yerine gövdeyi kontrollü tut."],
    ["rdl", "Dumbbell Romanian Deadlift", "Hamstring · glute", "8–12", "Kalçayı geriye gönder; dumbbell'lar bacaklara yakın.", "Belden değil kalçadan menteşe yap."],
    ["deadbug", "Dead Bug", "Karın · core", "6–10/yan", "Hareket mesafesini bel kontrolüne göre ayarla.", "Bel boşluğu artarsa kol/bacağı daha az uzat."],
    ["curl", "Dumbbell Curl", "Biceps", "10–15", "Dirsek gövde yanında; inişi yavaş kontrol et.", "Belden sallanarak tekrar üretme."]
  ],
  B: [
    ["incline", "Incline Dumbbell Press", "Üst göğüs · triceps", "8–12", "Sehpayı yaklaşık 20–35° yap.", "Press sırasında kaburga–pelvis kontrolünü koru; aşırı bel kavsi yok."],
    ["split", "Bulgarian Split Squat", "Quadriceps · glute", "8–10/bacak", "Yeni başlarken desteksiz zor gelirse normal split squat kullan.", "Denge için beli geriye atma; ön ayağı tam bas."],
    ["shoulder", "Dumbbell Shoulder Press", "Omuz · triceps", "8–12", "Ayakta veya oturarak kontrollü press.", "Dumbbell yukarı giderken belden geriye kaçma; gerekirse oturarak yap."],
    ["bridge", "Glute Bridge", "Glute · pelvis kontrolü", "10–15", "Topuklardan it, üstte glute sık.", "Ekstra yükselmek için lumbar hiper-ekstansiyon yapma."],
    ["sideplank", "Side Plank", "Oblique · core", "20–40 sn/yan", "Baş–omuz–kalça aynı çizgide.", "Kalçayı düşürme; nefesi tutma."],
    ["triceps", "Overhead Triceps Extension", "Triceps", "10–15", "Dirsekleri çok açmadan kontrollü indir.", "Kaburgaları öne çıkarmadan karını aktif tut."]
  ],
  C: [
    ["floorpress", "Dumbbell Floor Press", "Göğüs · triceps", "8–12", "Dirsekleri zemine kontrollü indir.", "Bel kavsini büyütmeden press yap."],
    ["chestrow", "Chest-supported Dumbbell Row", "Sırt · biceps", "8–12", "Göğsü sehpaya destekle; dirsekleri geriye çek.", "Göğüs desteği belden telafiyi azaltır."],
    ["lunge", "Reverse Lunge", "Bacak · glute", "8–10/bacak", "Geri adımı kontrollü al; ön ayağı tam bas.", "Gövdeyi dik tutmak için beli aşırı çukurlaştırma."],
    ["rdl", "Dumbbell Romanian Deadlift", "Hamstring · glute", "8–12", "Kalça menteşesi; hamstring gerilimini hisset.", "Nötr bel pozisyonunu koru."],
    ["reversecrunch", "Reverse Crunch", "Karın · pelvis kontrolü", "8–15", "Kuyruk sokumunu kontrollü yerden kaldır.", "Momentum yerine posterior pelvic tilt üret."],
    ["lateral", "Dumbbell Lateral Raise", "Yan omuz", "12–15", "Hafif ağırlık; dirsek hafif kırık.", "Belden savurma yapma."],
    ["hammer", "Hammer Curl", "Biceps · brachialis", "10–15", "Avuç içleri birbirine bakar; dirsek sabit.", "Gövde sallanmasın."]
  ]
};

const tenorPosts = {
  catcamel: { id: "3241472213518054401", url: "https://tenor.com/view/cat-cow-stretch-gif-3241472213518054401", ratio: "1" },
  hiprotation: { id: "13808788", url: "https://tenor.com/view/shaking-hip-rotation-hip-rotating-relaxing-fitness-gif-13808788", ratio: "1.77" },
  bwsquat: { id: "20516887", url: "https://tenor.com/view/squat-james-smith-james-smith-pt-perfect-form-working-out-gif-20516887", ratio: "0.56" },
  bridge: { id: "16591507", url: "https://tenor.com/view/glute-bridge-exercise-workout-gif-16591507", ratio: "1" },
  deadbug: { id: "19407840", url: "https://tenor.com/view/deadbug-core-gif-19407840", ratio: "1.78" },
  shoulderroll: { id: "13087517817471476069", url: "https://tenor.com/view/shoulder-rolls-gif-13087517817471476069", ratio: "0.56" },
  scap: { id: "25307034", url: "https://tenor.com/view/rhomboid-major-shoulder-retraction-scapula-adduction-adduction-retraction-gif-25307034", ratio: "1.34" },
  bench: { id: "12102433772138781391", url: "https://tenor.com/view/dumbbellbenchpress-gif-12102433772138781391", ratio: "1" },
  row1: { id: "25623538", url: "https://tenor.com/view/db-tripod-row-gif-25623538", ratio: "1.79" },
  goblet: { id: "25623494", url: "https://tenor.com/view/db-goblet-squats-gif-25623494", ratio: "1.79" },
  rdl: { id: "16373163138971048501", url: "https://tenor.com/view/dumbbell-rdl-gif-16373163138971048501", ratio: "1" },
  curl: { id: "8434444834006563548", url: "https://tenor.com/view/dumbbellbicepcurls-gif-8434444834006563548", ratio: "1" },
  incline: { id: "7606640835620086247", url: "https://tenor.com/view/gymexercisesmen-inclinedumbbellpress-gif-7606640835620086247", ratio: "1" },
  split: { id: "25623757", url: "https://tenor.com/view/db-bulgarian-split-squat-gif-25623757", ratio: "1.79" },
  shoulder: { id: "17350548", url: "https://tenor.com/view/shoulder-press-seated-shoulder-press-lift-work-out-exercise-gif-17350548", ratio: "1" },
  sideplank: { id: "12670642771450085987", url: "https://tenor.com/view/noequipmentexercisesmen-sideplanks-gif-12670642771450085987", ratio: "1.77" },
  triceps: { id: "26615160", url: "https://tenor.com/view/seated-dumbbell-overhead-triceps-extension-gif-26615160", ratio: "2.22" },
  floorpress: { id: "14058573", url: "https://tenor.com/view/lifting-weights-dumbbell-press-gains-training-exercise-gif-14058573", ratio: "1.78" },
  chestrow: { id: "25615009", url: "https://tenor.com/view/chest-supported-row-gif-25615009", ratio: "1.79" },
  lunge: { id: "25623789", url: "https://tenor.com/view/db-reverse-lunge-gif-25623789", ratio: "1.79" },
  reversecrunch: { id: "16737113", url: "https://tenor.com/view/reverse-crunches-exercise-home-workouts-travel-workouts-fitness-gif-16737113", ratio: "1.78" },
  lateral: { id: "27377357", url: "https://tenor.com/view/lateral-raise-gif-27377357", ratio: "1.78" },
  hammer: { id: "9866968935600309559", url: "https://tenor.com/view/dumbell-hammer-curls-gif-9866968935600309559", ratio: "0.56" }
};

function loadTenorDemo(container, id) {
  if (container.dataset.loaded === "1") return;
  const t = tenorPosts[id];
  if (!t) {
    container.innerHTML = '<div class="gif-error">Bu hareket için GIF henüz eklenmedi.</div>';
    return;
  }
  container.innerHTML = `<div class="tenor-box"><div class="tenor-gif-embed" data-postid="${t.id}" data-share-method="host" data-aspect-ratio="${t.ratio}" data-width="100%"><a href="${t.url}">Egzersiz GIF</a></div><a class="tenor-credit" href="${t.url}" target="_blank" rel="noopener">Via Tenor</a></div>`;
  container.dataset.loaded = "1";
  const script = document.createElement("script");
  script.src = "https://tenor.com/embed.js?ts=" + Date.now();
  script.async = true;
  document.body.appendChild(script);
}

function todayKey() {
  const d = new Date().getDay();
  if (d === 1) return "A";
  if (d === 3) return "B";
  if (d === 5) return "C";
  return "A";
}

function baseState() {
  return { week: 1, selectedDay: todayKey(), logs: [], done: {} };
}

function state() {
  try {
    const saved = JSON.parse(localStorage.getItem("evdeGuclenV2")) || {};
    return { ...baseState(), ...saved, selectedDay: saved.selectedDay || todayKey(), logs: saved.logs || [], done: saved.done || {} };
  } catch {
    return baseState();
  }
}

function saveState(s) {
  localStorage.setItem("evdeGuclenV2", JSON.stringify(s));
}

function weekScope(week, scope) {
  return `w${week}::${scope}`;
}

function exerciseObj(row, week) {
  const c = cfg[week];
  return { id: row[0], name: row[1], meta: row[2], reps: row[3], sets: c.sets, cues: [row[4]], lordosis: row[5] };
}

function renderExercise(ex, parent, scope, week) {
  const tpl = q("#exerciseTemplate").content.cloneNode(true);
  const card = tpl.querySelector(".exercise");
  const demo = tpl.querySelector(".demo");
  const fullScope = weekScope(week, scope);
  card.dataset.scope = fullScope;
  card.dataset.id = ex.id;
  tpl.querySelector(".exercise-name").textContent = ex.name;
  tpl.querySelector(".exercise-meta").textContent = ex.meta;
  tpl.querySelector(".sets").value = ex.sets;
  tpl.querySelector(".reps").value = ex.reps;

  const cues = tpl.querySelector(".cues");
  (ex.cues || []).forEach((c) => {
    const li = document.createElement("li");
    li.textContent = c;
    cues.appendChild(li);
  });
  tpl.querySelector(".lordosis-note").textContent = ex.lordosis || "";

  const s = state();
  tpl.querySelector(".done").checked = !!s.done[fullScope + "::" + ex.id];

  tpl.querySelector(".demo-toggle").onclick = (e) => {
    const wrap = e.currentTarget.nextElementSibling;
    const willOpen = wrap.hidden;
    wrap.hidden = !wrap.hidden;
    if (willOpen) loadTenorDemo(demo, ex.id);
    e.currentTarget.textContent = wrap.hidden ? "Hareketi göster" : "Gösterimi kapat";
  };

  tpl.querySelector(".done").onchange = (e) => {
    const st = state();
    st.done[fullScope + "::" + ex.id] = e.target.checked;
    saveState(st);
    updateStats();
  };

  tpl.querySelector(".save-log").onclick = (e) => {
    const c = e.currentTarget.closest(".exercise");
    const st = state();
    st.logs.unshift({
      time: new Date().toISOString(),
      week,
      scope,
      id: ex.id,
      name: ex.name,
      sets: c.querySelector(".sets").value,
      reps: c.querySelector(".reps").value,
      weight: c.querySelector(".weight").value
    });
    st.done[fullScope + "::" + ex.id] = true;
    saveState(st);
    c.querySelector(".done").checked = true;
    e.currentTarget.textContent = "Kaydedildi ✓";
    setTimeout(() => (e.currentTarget.textContent = "Seti kaydet"), 900);
    updateStats();
    renderHistory();
  };

  parent.appendChild(tpl);
}

function daySwitcher(selected) {
  return `<div class="day-switch" aria-label="Antrenman günü seçimi">${["A","B","C"].map((d) => `<button class="day-choice ${d === selected ? "active" : ""}" data-day="${d}"><strong>Gün ${d}</strong><small>${dayInfo[d]}</small></button>`).join("")}</div>`;
}

function bindDaySwitcher(container) {
  container.querySelectorAll(".day-choice").forEach((b) => {
    b.onclick = () => {
      const st = state();
      st.selectedDay = b.dataset.day;
      saveState(st);
      renderToday();
      updateStats();
    };
  });
}

function renderToday() {
  const el = q("#today");
  const st = state();
  const day = st.selectedDay;
  const w = +st.week;
  el.innerHTML = `${daySwitcher(day)}<h2 class="section-title">${w === 5 ? "5+" : w}. Hafta · Gün ${day}</h2><p class="section-note">${cfg[w].note}. Önce 6–8 dakikalık ısınmayı tamamla.</p>`;
  bindDaySwitcher(el);
  days[day].forEach((row) => renderExercise(exerciseObj(row, w), el, "day" + day, w));
}

function renderWarmup() {
  const el = q("#warmup");
  const w = +state().week;
  el.innerHTML = '<h2 class="section-title">6–8 dakikalık ısınma</h2><p class="section-note">Hareketi göster düğmesine basınca gerçek GIF açılır. Isınmayı antrenman öncesinde bir tur tamamla.</p>';
  warmup.forEach((ex) => renderExercise(ex, el, "warmup", w));
}

function openWorkoutDay(day) {
  const st = state();
  st.selectedDay = day;
  saveState(st);
  qa(".tab").forEach((x) => x.classList.remove("active"));
  qa(".panel").forEach((x) => x.classList.remove("active"));
  const tab = q('.tab[data-tab="today"]');
  tab.classList.add("active");
  q("#today").classList.add("active");
  renderToday();
  updateStats();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderProgram() {
  const el = q("#program");
  const w = +state().week;
  el.innerHTML = `<h2 class="section-title">${w === 5 ? "5+" : w}. Hafta · 3 günlük program</h2><p class="section-note">Hareket düzeni haftalar boyunca aynı kalır; set sayısı ve kullandığın ağırlık kademeli ilerler. İstediğin günü aşağıdan açabilirsin.</p>`;

  Object.entries(days).forEach(([k, rows]) => {
    const card = document.createElement("div");
    card.className = "day-card card detailed-day";
    card.innerHTML = `<div class="day-card-head"><div><h3>Gün ${k}</h3><p>${dayInfo[k]}</p></div><span class="set-badge">${cfg[w].sets} set</span></div><div class="program-list">${rows.map((r) => `<div class="program-exercise"><div><b>${r[1]}</b><small>${r[2]}</small></div><strong>${cfg[w].sets} × ${r[3]}</strong></div>`).join("")}</div><button class="primary open-day" data-day="${k}">Gün ${k}'yı aç</button>`;
    el.appendChild(card);
  });

  el.querySelectorAll(".open-day").forEach((b) => b.onclick = () => openWorkoutDay(b.dataset.day));
}

function renderHistory() {
  const el = q("#history");
  const logs = state().logs || [];
  el.innerHTML = '<h2 class="section-title">Antrenman geçmişi</h2><p class="section-note">Kaydettiğin setler bu cihazda tutulur.</p>';
  if (!logs.length) {
    el.insertAdjacentHTML("beforeend", '<div class="card empty">Henüz kayıt yok.</div>');
    return;
  }
  const box = document.createElement("div");
  box.className = "card";
  box.style.padding = "16px";
  logs.slice(0, 100).forEach((x) => {
    const d = new Date(x.time);
    const wk = x.week ? `Hafta ${x.week} · ` : "";
    const day = x.scope && x.scope.startsWith("day") ? `Gün ${x.scope.replace("day", "")} · ` : "";
    box.insertAdjacentHTML("beforeend", `<div class="log-item"><b>${x.name}</b><small>${d.toLocaleString("tr-TR")} · ${wk}${day}${x.sets} set · ${x.reps}${x.weight ? ` · ${x.weight} kg` : ""}</small></div>`);
  });
  el.appendChild(box);
}

function updateStats() {
  const st = state();
  const w = +st.week;
  const day = st.selectedDay;
  const scope = weekScope(w, "day" + day);
  const total = days[day].length;
  const done = days[day].filter((r) => st.done[scope + "::" + r[0]]).length;
  q("#todayDone").textContent = Math.round((done * 100) / total) + "%";

  let wd = 0;
  ["A", "B", "C"].forEach((k) => {
    const dayScope = weekScope(w, "day" + k);
    if (days[k].every((r) => st.done[dayScope + "::" + r[0]])) wd++;
  });
  q("#weekDone").textContent = wd + "/3";
  q("#logCount").textContent = (st.logs || []).length;
}

function renderAll() {
  renderToday();
  renderWarmup();
  renderProgram();
  renderHistory();
  updateStats();
}

qa(".tab").forEach((b) => {
  b.onclick = () => {
    qa(".tab").forEach((x) => x.classList.remove("active"));
    qa(".panel").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    q("#" + b.dataset.tab).classList.add("active");
  };
});

const st = state();
q("#weekSelect").value = st.week;
q("#weekSelect").onchange = (e) => {
  const s = state();
  s.week = +e.target.value;
  saveState(s);
  renderAll();
};

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  q("#installBtn").hidden = false;
});
q("#installBtn").onclick = async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  q("#installBtn").hidden = true;
};

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
}

renderAll();