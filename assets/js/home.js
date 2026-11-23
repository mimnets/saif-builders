(function () {
  const $ = (s) => document.querySelector(s);
  const S = window.SITE;

  /* shared fills */
  document.querySelectorAll(".arr").forEach((el) => (el.outerHTML = icon("arrow", "h-5 w-5")));
  document.querySelectorAll("[data-i]").forEach((el) => (el.innerHTML = icon(el.dataset.i, "h-6 w-6")));
  document.querySelectorAll("[data-stars]").forEach((el) => (el.innerHTML = icon("star", "h-5 w-5").repeat(5)));
  document.querySelectorAll("[data-wa]").forEach((el) => (el.href = waLink()));
  $("#heroWa").href = waLink("আসসালামু আলাইকুম, আমি সাইট ভিজিট করতে চাই। কবে আসতে পারি?");
  document.querySelector("[data-prev]").innerHTML = icon("left", "h-6 w-6");
  document.querySelector("[data-next]").innerHTML = icon("right", "h-6 w-6");

  /* hero slideshow */
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = $("#heroDots");
  let cur = 0, timer;
  dots.innerHTML = slides.map((_, i) => `<button aria-label="স্লাইড ${bn(i + 1)}" class="h-2 rounded-full transition-all ${i ? "w-2 bg-white/40" : "w-8 bg-brass"}"></button>`).join("");
  const go = (n) => {
    slides[cur].classList.remove("is-active"); dots.children[cur].className = "h-2 w-2 rounded-full bg-white/40 transition-all";
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add("is-active"); dots.children[cur].className = "h-2 w-8 rounded-full bg-brass transition-all";
  };
  [...dots.children].forEach((d, i) => d.addEventListener("click", () => { go(i); clearInterval(timer); timer = setInterval(() => go(cur + 1), 5500); }));
  timer = setInterval(() => go(cur + 1), 5500);

  /* features */
  const F = [
    ["shield", "ঝামেলামুক্ত জমি", "পারিবারিক বিরোধ বা মামলা আছে এমন জমিতে আমরা প্রজেক্ট নিই না। কাগজ পরিষ্কার না হলে কাজ শুরু হয় না।"],
    ["brick", "মানসম্মত নির্মাণসামগ্রী", "রড, সিমেন্ট, ইট থেকে শুরু করে ফিটিংস, সব কিছু ভালো ব্র্যান্ড দেখে কেনা হয়। খরচ বাঁচাতে মান কমানো হয় না।"],
    ["clock", "কথামতো সময়ে হস্তান্তর", "দলিলে যে তারিখ লেখা থাকে, সেই সময়ের মধ্যেই ফ্ল্যাট বুঝিয়ে দেওয়া হয়। আগের ক্রেতারাই এর সাক্ষী।"],
    ["chat", "সব আপডেট হোয়াটসঅ্যাপে", "কাজ কতদূর এগোল, কোথায় সমস্যা হলো, ক্রেতাদের গ্রুপে আর মিটিংয়ে নিয়মিত জানানো হয়।"],
    ["doc", "স্বচ্ছ লেনদেন", "প্রতিটি কিস্তির রসিদ আর হিসাব আপনার হাতে থাকে। কোনো লুকানো চার্জ নেই।"],
    ["wallet", "সাধ্যের মধ্যে কিস্তি", "অল্প ডাউন পেমেন্ট আর ২ থেকে ৭ বছরের দীর্ঘ কিস্তি, তাই বেতনের টাকাতেই চালানো যায়।"],
  ];
  $("#featureGrid").innerHTML = F.map(([i, t, d], k) => `
    <div class="reveal card group p-7 transition hover:-translate-y-1 hover:shadow-lift ${k % 2 ? "sm:translate-y-8" : ""}">
      <span class="grid h-14 w-14 place-items-center rounded-2xl bg-cream text-brass-d transition group-hover:bg-brass group-hover:text-ink">${icon(i, "h-7 w-7")}</span>
      <h3 class="mt-5 text-xl font-bold">${t}</h3>
      <p class="mt-2 text-[15px] leading-7 text-ink/70">${d}</p>
    </div>`).join("");

  /* steps */
  const ST = [
    ["সাইট ভিজিট", "অফিসে আসুন বা ফোন দিন। প্রজেক্ট ঘুরিয়ে দেখানো হবে, কাগজপত্রও দেখতে পারবেন।"],
    ["বুকিং ও চুক্তি", "ডাউন পেমেন্ট দিয়ে চুক্তি সই। হস্তান্তরের তারিখ দলিলেই লেখা থাকবে।"],
    ["মাসিক কিস্তি", "প্রতি মাসে কিস্তি দিন, রসিদ নিন। কাজের আপডেট পাবেন হোয়াটসঅ্যাপ গ্রুপে।"],
    ["চাবি হস্তান্তর", "নির্ধারিত সময়ে ফ্ল্যাট বুঝে নিন। রেজিস্ট্রেশনেও আমরা পাশে থাকি।"],
  ];
  $("#steps").innerHTML = ST.map(([t, d], i) => `
    <li class="relative rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink/5">
      <span class="font-display text-5xl font-bold text-brass/35">${bn("0" + (i + 1))}</span>
      <h4 class="mt-2 text-lg font-bold">${t}</h4>
      <p class="mt-1 text-[15px] text-ink/70">${d}</p>
    </li>`).join("");

  /* projects */
  $("#projectRow").innerHTML = PROJECTS.map((p) => `<div class="w-[85%] shrink-0 sm:w-[46%] lg:w-[31.5%]">${projectCard(p)}</div>`).join("");

  /* offers */
  $("#offerGrid").innerHTML = OFFERS.map((o, i) => `
    <div class="reveal group relative overflow-hidden rounded-3xl bg-white/[.04] p-6 ring-1 ring-white/10 transition hover:bg-white/[.07] ${i === 0 ? "sm:col-span-2 bg-gradient-to-br from-brass/25 to-transparent" : ""}">
      <div class="flex items-start justify-between gap-4">
        <span class="grid h-12 w-12 place-items-center rounded-2xl bg-brass text-ink">${icon(o.icon, "h-6 w-6")}</span>
        <span class="chip bg-white/10 text-cream/80">${o.badge}</span>
      </div>
      <h3 class="mt-5 text-xl font-bold text-white">${o.title}</h3>
      <p class="mt-2 text-cream/70">${o.text}</p>
      <p class="mt-4 text-xs text-cream/40">শর্ত প্রযোজ্য</p>
    </div>`).join("");

  /* countdown to month end */
  const cd = $("#countdown");
  const tick = () => {
    const now = new Date(), end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    let s = Math.max(0, (end - now) / 1000);
    const parts = [[Math.floor(s / 86400), "দিন"], [Math.floor((s % 86400) / 3600), "ঘণ্টা"], [Math.floor((s % 3600) / 60), "মিনিট"], [Math.floor(s % 60), "সেকেন্ড"]];
    cd.innerHTML = parts.map(([v, l]) => `<div class="rounded-2xl bg-ink-2 py-3"><b class="block font-display text-2xl text-white">${bn(String(v).padStart(2, "0"))}</b><span class="text-xs text-cream/50">${l}</span></div>`).join("");
  };
  tick(); setInterval(tick, 1000);

  /* EMI */
  const years = [2, 3, 5, 7]; let yr = 5;
  const yb = $("#yearBtns");
  const renderYears = () => (yb.innerHTML = years.map((y) => `<button type="button" data-y="${y}" class="rounded-2xl py-3 font-semibold transition ${y === yr ? "bg-ink text-cream" : "bg-paper text-ink ring-1 ring-ink/10 hover:ring-ink/30"}">${bn(y)} বছর</button>`).join(""));
  yb.addEventListener("click", (e) => { const b = e.target.closest("[data-y]"); if (b) { yr = +b.dataset.y; renderYears(); calc(); } });
  const calc = () => {
    const price = +$("#iPrice").value, down = Math.min(+$("#iDown").value, price);
    const rest = price - down, months = yr * 12, emi = rest / months;
    $("#oPrice").textContent = "৳ " + money(price);
    $("#oDown").textContent = "৳ " + money(down);
    $("#oEmi").textContent = money(emi);
    $("#oRest").textContent = money(rest);
    $("#oMonths").textContent = bn(months);
    $("#emiWa").href = waLink(`আসসালামু আলাইকুম। আমি ${money(price)} টাকার ফ্ল্যাটে ${money(down)} টাকা ডাউন পেমেন্ট দিয়ে ${bn(yr)} বছরের কিস্তিতে নিতে চাই। বিস্তারিত জানাবেন?`);
  };
  $("#iPrice").addEventListener("input", calc); $("#iDown").addEventListener("input", calc);
  renderYears(); calc();

  /* area */
  const A = [
    ["bus", "উত্তরা ও ঢাকা কাছেই", "উত্তরা কয়েক মিনিটের পথ, ঢাকার যেকোনো দিকে যাতায়াত সহজ।"],
    ["school", "ভালো স্কুল-কলেজ", "বাচ্চাদের পড়াশোনার জন্য ভালো মানের স্কুল-কলেজ আশপাশেই।"],
    ["hospital", "হাসপাতাল কাছে", "জরুরি চিকিৎসার জন্য ভালো হাসপাতাল ও ক্লিনিক কাছাকাছি।"],
    ["bank", "ব্যাংক ও এটিএম", "প্রায় সব বড় ব্যাংকের শাখা আর এটিএম হাঁটা দূরত্বে।"],
    ["cart", "বাজার ও দোকানপাট", "কাঁচাবাজার থেকে সুপারশপ, দৈনন্দিন কেনাকাটা ঘরের পাশেই।"],
    ["building", "কর্মস্থলের কাছে", "টঙ্গী-গাজীপুরের গার্মেন্টস, বায়িং হাউজ আর ফার্মা কোম্পানির অফিস কাছেই।"],
  ];
  $("#areaGrid").innerHTML = A.map(([i, t, d]) => `
    <div class="reveal flex gap-4 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink/5">
      <span class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sage/10 text-sage">${icon(i, "h-6 w-6")}</span>
      <div><h3 class="text-lg font-bold">${t}</h3><p class="mt-1 text-[15px] text-ink/70">${d}</p></div>
    </div>`).join("");
  const who = ["গার্মেন্টস কর্মকর্তা", "অফিসার ইনচার্জ", "কিউসি ম্যানেজার", "ফ্যাক্টরি জিএম", "কোয়ালিটি হেড", "স্কুল শিক্ষক", "ডাক্তার", "ইঞ্জিনিয়ার", "বায়িং হাউজের অফিসার", "ফার্মাসিউটিক্যালস কর্মকর্তা", "ফ্রিল্যান্সার", "ভাড়াটিয়া পরিবার"];
  $("#whoChips").innerHTML = who.map((w) => `<span class="chip !px-4 !py-2 !text-sm bg-cream text-ink/80">${icon("check", "h-4 w-4 text-sage")} ${w}</span>`).join("");

  /* FAQ */
  const Q = [
    ["কত টাকা হাতে থাকলে বুকিং দেওয়া যায়?", "জায়গা ও প্রজেক্ট ভেদে শুরুতে ১০ থেকে ১৫ লাখ টাকা এককালীন ডাউন পেমেন্ট দিতে হয়। বাকিটা মাসিক কিস্তিতে।"],
    ["মাসিক কিস্তি কত হয়?", "সাধারণত মাসে ৫০ হাজার থেকে ১ লাখ টাকা। কত বছরে পরিশোধ করবেন তার উপর নির্ভর করে। উপরের ক্যালকুলেটরে আনুমানিক হিসাব দেখে নিতে পারেন।"],
    ["কত দিনে ফ্ল্যাট হাতে পাব?", "প্ল্যান অনুযায়ী ২, ৩, ৫ বা ৭ বছরের মধ্যে। হস্তান্তরের তারিখ চুক্তিপত্রে লেখা থাকে, আর সেই সময়ের মধ্যেই ফ্ল্যাট বুঝিয়ে দেওয়া হয়।"],
    ["জমির শেয়ার মানে কী?", "আপনি যে ফ্ল্যাট কিনছেন, তার সাথে ভবনের জমির একটা আনুপাতিক অংশও আপনার নামে থাকে। ফলে মালিকানা শুধু ফ্ল্যাটে নয়, জমিতেও।"],
    ["রেডি ফ্ল্যাটের দাম কেমন?", "১০০০ থেকে ১৫০০ বর্গফুটের রেডি ফ্ল্যাট ৩৮ থেকে ৫০ লাখ টাকার মধ্যে। এককালীন বা কিস্তি, দুইভাবেই কেনা যায়।"],
    ["জমির কাগজপত্র দেখতে পারব?", "অবশ্যই। বুকিংয়ের আগে দলিল, খতিয়ান, নামজারিসহ সব কাগজ দেখানো হয়। চাইলে নিজের আইনজীবী দিয়েও যাচাই করাতে পারেন।"],
    ["নির্মাণের আপডেট কীভাবে পাব?", "প্রতিটি প্রজেক্টের ক্রেতাদের নিয়ে হোয়াটসঅ্যাপ গ্রুপ থাকে। সেখানে কাজের ছবি আর খবর দেওয়া হয়, প্রয়োজনে সবাইকে নিয়ে মিটিংও হয়।"],
    ["কিস্তি দিতে দেরি হলে কী হবে?", "এমন হলে অফিসে কথা বলুন। কারণ বুঝে সমাধানের চেষ্টা করা হয়। বিস্তারিত নিয়ম চুক্তিপত্রে উল্লেখ থাকে।"],
  ];
  $("#faqList").innerHTML = Q.map(([q, a], i) => `
    <details class="reveal group rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink/5 open:ring-brass/40" ${i === 0 ? "open" : ""}>
      <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">${q}
        <span class="faq-plus grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-2xl leading-none transition">+</span></summary>
      <p class="mt-3 leading-8 text-ink/70">${a}</p>
    </details>`).join("");
  document.querySelector("[data-tel]").textContent = bn(S.phone);

  /* contact */
  $("#leadProject").innerHTML += PROJECTS.map((p) => `<option>${p.name}</option>`).join("");
  $("#leadForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const msg = `আসসালামু আলাইকুম। আমি ${f.get("name")}।\nমোবাইল: ${f.get("phone")}\nপ্রজেক্ট: ${f.get("project") || "যেকোনো"}\nসাইজ: ${f.get("size") || "ঠিক করিনি"}\n${f.get("msg") || "সাইট ভিজিট করতে চাই।"}`;
    window.open(waLink(msg), "_blank");
  });
  $("#contactCards").innerHTML = [
    ["pin", "অফিস", S.address, `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(S.mapQuery)}`],
    ["phone", "ফোন", bn(S.phone), `tel:${S.phone}`],
    ["fb", "ফেসবুক", "সাইফবিল্ডার্স", S.facebook],
  ].map(([i, t, d, h]) => `
    <a href="${h}" ${h.startsWith("http") ? 'target="_blank" rel="noopener"' : ""} class="card group flex flex-col p-5 transition hover:shadow-lift">
      <span class="grid h-11 w-11 place-items-center rounded-xl bg-cream text-brass-d group-hover:bg-brass group-hover:text-ink">${icon(i)}</span>
      <span class="mt-3 text-sm text-ink/55">${t}</span><span class="font-semibold leading-6">${d}</span>
    </a>`).join("");
})();
