(function () {
  const id = new URLSearchParams(location.search).get("id") || location.hash.slice(1) || PROJECTS[0].id;
  const p = PROJECTS.find((x) => x.id === id) || PROJECTS[0];
  const st = STATUS[p.status];
  const base = `assets/img/projects/${p.id}/`;
  const views = [
    ["view-1.svg", "দিনের আলোয় সামনের ভিউ"],
    ["view-2.svg", "গোধূলিতে পাশ থেকে"],
    ["view-3.svg", "রাতের ভিউ"],
    ["view-4.svg", "উপর থেকে (এরিয়াল)"],
  ];
  document.title = `${p.name} | সাইফ বিল্ডার্স`;
  const waMsg = (extra = "") => waLink(`আসসালামু আলাইকুম। "${p.name}" প্রজেক্ট সম্পর্কে জানতে চাই।${extra}`);

  document.getElementById("app").innerHTML = `
  <section class="bg-cream pb-10 pt-8 sm:pb-14">
    <div class="container-x">
      <nav class="text-sm text-ink/55" aria-label="breadcrumb"><a href="index.html" class="hover:text-ink">হোম</a> / <a href="projects.html" class="hover:text-ink">প্রজেক্ট</a> / <span class="text-ink">${p.name}</span></nav>
      <div class="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="flex flex-wrap gap-2"><span class="chip ${st.cls}">${st.label}</span><span class="chip bg-white text-ink/70 ring-1 ring-ink/10">${p.en}</span></div>
          <h1 class="mt-3 text-4xl font-bold sm:text-5xl">${p.name}</h1>
          <p class="mt-2 flex items-center gap-1.5 text-ink/65">${icon("pin", "h-5 w-5")} ${p.location}</p>
        </div>
        <div class="flex gap-3">
          <a href="tel:${SITE.phone}" class="btn-outline">${icon("phone", "h-5 w-5")} কল করুন</a>
          <a href="${waMsg()}" target="_blank" rel="noopener" class="btn-brass">বুকিং দিন ${icon("arrow", "h-5 w-5")}</a>
        </div>
      </div>

      <!-- gallery -->
      <div class="mt-8 grid gap-3 lg:grid-cols-[1fr_180px]">
        <div class="relative overflow-hidden rounded-[1.75rem] bg-ink shadow-lift">
          <div class="snap-row flex overflow-x-auto" id="gal">
            ${views.map(([f, c], i) => `<button class="relative aspect-[16/10] w-full shrink-0" data-open="${i}" aria-label="${c} বড় করে দেখুন"><img src="${base + f}" alt="${p.name}: ${c}" class="h-full w-full object-cover" ${i ? 'loading="lazy"' : ""}></button>`).join("")}
          </div>
          <span id="galCap" class="chip pointer-events-none absolute bottom-4 left-4 bg-ink/70 text-white backdrop-blur">${views[0][1]}</span>
          <span class="chip pointer-events-none absolute right-4 top-4 bg-white/90 text-ink">${icon("expand", "h-4 w-4")} ৩ডি ভিউ</span>
          <button id="gPrev" class="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-soft hover:bg-white" aria-label="আগের ছবি">${icon("left", "h-6 w-6")}</button>
          <button id="gNext" class="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-soft hover:bg-white" aria-label="পরের ছবি">${icon("right", "h-6 w-6")}</button>
        </div>
        <div class="snap-row flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible" id="thumbs">
          ${views.map(([f, c], i) => `<button data-t="${i}" class="relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-2xl ring-2 transition sm:w-36 lg:w-full ${i ? "ring-transparent opacity-70 hover:opacity-100" : "ring-brass"}" aria-label="${c}"><img src="${base + f}" alt="" class="h-full w-full object-cover" loading="lazy"></button>`).join("")}
        </div>
      </div>
    </div>
  </section>

  <section class="py-14 sm:py-20">
    <div class="container-x grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-8">
        <dl class="grid grid-cols-2 gap-3 sm:grid-cols-4">
          ${[["building", "তলা", bn(p.floors) + " তলা"], ["layers", "ফ্ল্যাট সাইজ", `${bn(p.sizes[0])}–${bn(p.sizes.at(-1))} বর্গফুট`], ["home", "বেডরুম", "২ ও ৩ বেড"], ["clock", "কিস্তির মেয়াদ", p.handover.replace(" কিস্তি প্ল্যান", "")]]
            .map(([i, t, v]) => `<div class="card p-5"><span class="text-brass-d">${icon(i, "h-6 w-6")}</span><dt class="mt-3 text-sm text-ink/55">${t}</dt><dd class="font-display text-lg font-bold leading-snug">${v}</dd></div>`).join("")}
        </dl>

        <h2 class="mt-12 text-2xl font-bold sm:text-3xl">প্রজেক্ট সম্পর্কে</h2>
        <p class="mt-3 text-lg leading-8 text-ink/75">${p.desc}</p>
        <ul class="mt-6 grid gap-3 sm:grid-cols-2">
          ${p.features.map((f) => `<li class="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3"><span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage text-white">${icon("check", "h-4 w-4")}</span>${f}</li>`).join("")}
        </ul>

        <!-- floor plans -->
        <h2 class="mt-14 text-2xl font-bold sm:text-3xl" id="plans">ফ্লোর প্ল্যান</h2>
        <p class="mt-2 text-ink/65">সাইজ বেছে নিন। ছবিতে ট্যাপ করলে বড় করে দেখা যাবে।</p>
        <div class="mt-6 flex flex-wrap gap-2" id="sizeTabs" role="tablist"></div>
        <div class="mt-5 overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-ink/5">
          <button class="block w-full" id="planBtn"><img id="planImg" alt="" class="w-full"></button>
          <div class="flex flex-col gap-4 border-t border-ink/5 p-5 sm:flex-row sm:items-center sm:justify-between" id="planInfo"></div>
        </div>

        <!-- payment -->
        <h2 class="mt-14 text-2xl font-bold sm:text-3xl">পেমেন্ট প্ল্যান</h2>
        <div class="mt-6 overflow-hidden rounded-[1.75rem] ring-1 ring-ink/10">
          <table class="w-full text-left text-[15px]">
            <thead class="bg-ink text-cream"><tr><th class="p-4 font-semibold">বিষয়</th><th class="p-4 font-semibold">বিবরণ</th></tr></thead>
            <tbody class="divide-y divide-ink/5 bg-white">
              <tr><td class="p-4 text-ink/60">এককালীন ডাউন পেমেন্ট</td><td class="p-4 font-semibold">১০ থেকে ১৫ লাখ টাকা (জায়গা ভেদে)</td></tr>
              <tr><td class="p-4 text-ink/60">মাসিক কিস্তি</td><td class="p-4 font-semibold">৫০,০০০ থেকে ১,০০,০০০ টাকা</td></tr>
              <tr><td class="p-4 text-ink/60">মেয়াদ</td><td class="p-4 font-semibold">${p.handover}</td></tr>
              <tr><td class="p-4 text-ink/60">রেডি ফ্ল্যাট</td><td class="p-4 font-semibold">৩৮ থেকে ৫০ লাখ টাকা, এককালীন বা কিস্তিতে</td></tr>
            </tbody>
          </table>
        </div>
        <p class="mt-3 text-sm text-ink/50">ফ্লোর, দিক ও সাইজ অনুযায়ী দাম আলাদা হয়। সঠিক দামের জন্য অফিসে যোগাযোগ করুন।</p>
      </div>

      <aside class="lg:col-span-4">
        <div class="card sticky top-24 p-6 sm:p-7">
          <p class="text-sm text-ink/55">শুরু হচ্ছে মাত্র</p>
          <p class="font-display text-4xl font-bold">১০ লাখ <span class="text-lg font-medium text-ink/60">ডাউন পেমেন্টে</span></p>
          <div class="mt-5 rounded-2xl bg-brass/10 p-4 text-[15px]">
            <p class="flex items-center gap-2 font-semibold text-brass-d">${icon("gift", "h-5 w-5")} এ মাসের অফার</p>
            <p class="mt-1 text-ink/75">${OFFERS[0].text}</p>
          </div>
          <div class="mt-6 grid gap-3">
            <a href="${waMsg(" সাইট ভিজিটের সময় জানাবেন?")}" target="_blank" rel="noopener" class="btn bg-wa text-white">${icon("wa", "h-5 w-5")} সাইট ভিজিট বুক করুন</a>
            <a href="tel:${SITE.phone}" class="btn-ink">${icon("phone", "h-5 w-5")} ${bn(SITE.phone)}</a>
          </div>
          <ul class="mt-6 space-y-2 text-sm text-ink/65">
            <li class="flex gap-2">${icon("shield", "h-5 w-5 text-sage")} ঝামেলামুক্ত, যাচাই করা জমি</li>
            <li class="flex gap-2">${icon("clock", "h-5 w-5 text-sage")} চুক্তির তারিখে হস্তান্তর</li>
            <li class="flex gap-2">${icon("chat", "h-5 w-5 text-sage")} হোয়াটসঅ্যাপে নিয়মিত আপডেট</li>
          </ul>
        </div>
      </aside>
    </div>
  </section>

  <section class="bg-cream py-14 sm:py-20">
    <div class="container-x">
      <h2 class="text-2xl font-bold sm:text-3xl">অন্যান্য প্রজেক্ট</h2>
      <div class="snap-row -mx-5 mt-8 flex gap-6 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
        ${PROJECTS.filter((x) => x.id !== p.id).map((x) => `<div class="w-[80%] shrink-0 sm:w-[45%] lg:w-[23%]">${projectCard(x)}</div>`).join("")}
      </div>
    </div>
  </section>`;

  /* gallery */
  const gal = document.getElementById("gal"), thumbs = [...document.querySelectorAll("[data-t]")];
  let gi = 0;
  const setActive = (i) => {
    gi = i;
    thumbs.forEach((t, k) => { t.classList.toggle("ring-brass", k === i); t.classList.toggle("ring-transparent", k !== i); t.classList.toggle("opacity-70", k !== i); });
    document.getElementById("galCap").textContent = views[i][1];
  };
  const goG = (i) => { i = (i + views.length) % views.length; gal.scrollTo({ left: gal.clientWidth * i, behavior: "smooth" }); setActive(i); };
  gal.addEventListener("scroll", () => { const i = Math.round(gal.scrollLeft / gal.clientWidth); if (i !== gi) setActive(i); }, { passive: true });
  thumbs.forEach((t) => t.addEventListener("click", () => goG(+t.dataset.t)));
  document.getElementById("gPrev").onclick = () => goG(gi - 1);
  document.getElementById("gNext").onclick = () => goG(gi + 1);

  /* lightbox */
  const lb = document.getElementById("lb"), lbImg = document.getElementById("lbImg"), lbCap = document.getElementById("lbCap");
  let lbList = [], li = 0;
  const show = () => { lbImg.src = lbList[li][0]; lbImg.alt = lbList[li][1]; lbCap.textContent = lbList[li][1]; };
  const open = (list, i) => { lbList = list; li = i; show(); lb.classList.remove("hidden"); document.body.style.overflow = "hidden"; };
  const close = () => { lb.classList.add("hidden"); document.body.style.overflow = ""; };
  document.getElementById("lbClose").innerHTML = icon("x", "h-6 w-6");
  document.getElementById("lbPrev").innerHTML = icon("left", "h-6 w-6");
  document.getElementById("lbNext").innerHTML = icon("right", "h-6 w-6");
  document.getElementById("lbClose").onclick = close;
  document.getElementById("lbPrev").onclick = () => { li = (li - 1 + lbList.length) % lbList.length; show(); };
  document.getElementById("lbNext").onclick = () => { li = (li + 1) % lbList.length; show(); };
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.parentElement === lb) close(); });
  document.addEventListener("keydown", (e) => { if (lb.classList.contains("hidden")) return; if (e.key === "Escape") close(); if (e.key === "ArrowRight") document.getElementById("lbNext").click(); if (e.key === "ArrowLeft") document.getElementById("lbPrev").click(); });
  const viewList = views.map(([f, c]) => [base + f, `${p.name}: ${c}`]);
  document.querySelectorAll("[data-open]").forEach((b) => b.addEventListener("click", () => open(viewList, +b.dataset.open)));

  /* floor plans */
  let size = p.sizes[0];
  const planList = p.sizes.map((s) => [`${base}plan-${s}.svg`, `${p.name}: ${PLAN_INFO[s].type}, ${bn(s)} বর্গফুট`]);
  const drawPlan = () => {
    const info = PLAN_INFO[size];
    document.getElementById("sizeTabs").innerHTML = p.sizes.map((s) => `<button role="tab" aria-selected="${s === size}" data-s="${s}" class="rounded-full px-5 py-2.5 font-semibold transition ${s === size ? "bg-ink text-cream" : "bg-white ring-1 ring-ink/10 hover:ring-ink/30"}">${bn(s)} বর্গফুট</button>`).join("");
    const img = document.getElementById("planImg");
    img.src = `${base}plan-${size}.svg`; img.alt = `${p.name} ${bn(size)} বর্গফুট ফ্লোর প্ল্যান`;
    document.getElementById("planInfo").innerHTML = `
      <div><p class="font-display text-xl font-bold">${info.type} · ${bn(size)} বর্গফুট</p><p class="text-ink/65">${info.beds}, ${info.baths}, ${info.extra}</p></div>
      <div class="flex gap-2"><a href="${base}plan-${size}.svg" download class="btn-outline !py-2.5">ডাউনলোড</a><a href="${waMsg(` ${bn(size)} বর্গফুটের ফ্ল্যাটের দাম জানাবেন?`)}" target="_blank" rel="noopener" class="btn-brass !py-2.5">দাম জানুন</a></div>`;
  };
  document.getElementById("sizeTabs").addEventListener("click", (e) => { const b = e.target.closest("[data-s]"); if (b) { size = +b.dataset.s; drawPlan(); } });
  document.getElementById("planBtn").addEventListener("click", () => open(planList, p.sizes.indexOf(size)));
  drawPlan();
})();
