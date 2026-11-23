/* Shared UI: header, footer, floating contact, icons, helpers */
(function () {
  const S = window.SITE;
  const bn = (n) => String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
  const money = (n) => bn(Math.round(n).toLocaleString("en-IN"));
  window.bn = bn; window.money = money;

  const I = {
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    wa: '<path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.4L3 21z"/><path d="M9 10c0 3 2 5 5 5l1.2-1.2-2-1-1 .8c-1-.4-1.8-1.2-2.2-2.2l.8-1-1-2L9 10z" fill="currentColor" stroke="none"/>',
    fb: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    arrow: '<path d="M5 12h14M13 5l7 7-7 7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
    brick: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9.5h18M3 14.5h18M9 4v5.5M15 9.5v5M9 14.5V20"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    wallet: '<path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
    tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/>',
    cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
    ticket: '<path d="M2 9a3 3 0 0 0 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 0 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v2M13 17v2M13 11v2"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    bus: '<path d="M8 6v6M16 6v6M2 12h20M7 18v2M17 18v2"/><rect x="3" y="3" width="18" height="15" rx="3"/>',
    school: '<path d="m22 10-10-6-10 6 10 6 10-6z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    hospital: '<path d="M12 6v4M10 8h4M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M3 21h18M9 21v-4h6v4"/>',
    bank: '<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>',
    cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2 2h3l2.7 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>',
    expand: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" fill="currentColor"/>',
  };
  window.icon = (n, c = "h-5 w-5") => `<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n] || ""}</svg>`;

  window.waLink = (msg) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg || "আসসালামু আলাইকুম, সাইফ বিল্ডার্সের ফ্ল্যাট সম্পর্কে জানতে চাই।")}`;

  const page = document.body.dataset.page || "home";
  const homeHref = page === "home" ? "" : "index.html";
  const nav = [
    ["সুবিধা", homeHref + "#features"],
    ["প্রজেক্ট", "projects.html"],
    ["অফার", homeHref + "#offers"],
    ["কিস্তি হিসাব", homeHref + "#emi"],
    ["রিভিউ", homeHref + "#reviews"],
    ["প্রশ্নোত্তর", homeHref + "#faq"],
    ["যোগাযোগ", homeHref + "#contact"],
  ];
  const transparent = page === "home";

  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
    <div id="hdr" class="fixed inset-x-0 top-0 z-50 transition-all duration-300 ${transparent ? "text-white" : "bg-paper/90 backdrop-blur-xl shadow-[0_1px_0_rgb(14_26_43/.06)]"}">
      <div class="container-x flex h-[72px] items-center justify-between gap-4">
        <a href="index.html" class="flex items-center gap-3" aria-label="সাইফ বিল্ডার্স হোম">
          <img src="assets/img/logo-mark.svg" alt="" class="h-10 w-10 rounded-xl" width="40" height="40">
          <span class="leading-tight">
            <span class="block font-display text-xl font-bold">সাইফ বিল্ডার্স</span>
            <span class="hdr-sub block text-[11px] font-medium tracking-[.2em] ${transparent ? "text-white/70" : "text-ink/55"}">SAIF BUILDERS</span>
          </span>
        </a>
        <nav class="hidden items-center gap-1 lg:flex" aria-label="মূল মেনু">
          ${nav.map(([t, h]) => `<a class="nav-link hdr-link ${transparent ? "!text-white/85 hover:!bg-white/10 hover:!text-white" : ""}" href="${h}">${t}</a>`).join("")}
        </nav>
        <div class="flex items-center gap-2">
          <a href="tel:${S.phone}" class="btn-brass hidden !px-5 !py-2.5 sm:inline-flex">${icon("phone", "h-4 w-4")} ${bn(S.phone)}</a>
          <button id="menuBtn" class="grid h-11 w-11 place-items-center rounded-full lg:hidden ${transparent ? "bg-white/10" : "bg-ink/5"}" aria-label="মেনু খুলুন" aria-expanded="false">${icon("menu", "h-6 w-6")}</button>
        </div>
      </div>
    </div>
    <div id="mnav" class="fixed inset-0 z-[60] hidden">
      <div class="absolute inset-0 bg-ink/50 backdrop-blur-sm" data-close></div>
      <div class="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-paper p-6 shadow-lift">
        <div class="flex items-center justify-between">
          <span class="font-display text-xl font-bold">মেনু</span>
          <button class="grid h-11 w-11 place-items-center rounded-full bg-ink/5" data-close aria-label="বন্ধ করুন">${icon("x", "h-6 w-6")}</button>
        </div>
        <nav class="mt-6 flex flex-col gap-1">
          ${nav.map(([t, h]) => `<a data-close class="rounded-2xl px-4 py-3 text-lg font-medium hover:bg-ink/5" href="${h}">${t}</a>`).join("")}
        </nav>
        <div class="mt-auto grid gap-3">
          <a href="tel:${S.phone}" class="btn-ink">${icon("phone", "h-5 w-5")} কল করুন</a>
          <a href="${waLink()}" target="_blank" rel="noopener" class="btn bg-wa text-white">${icon("wa", "h-5 w-5")} হোয়াটসঅ্যাপ</a>
        </div>
      </div>
    </div>`;
    const hdr = document.getElementById("hdr");
    const onScroll = () => {
      if (!transparent) return;
      const solid = window.scrollY > 40;
      hdr.classList.toggle("bg-paper/90", solid);
      hdr.classList.toggle("backdrop-blur-xl", solid);
      hdr.classList.toggle("shadow-[0_1px_0_rgb(14_26_43/.06)]", solid);
      hdr.classList.toggle("text-white", !solid);
      hdr.querySelectorAll(".hdr-link").forEach((a) => {
        ["!text-white/85", "hover:!bg-white/10", "hover:!text-white"].forEach((c) => a.classList.toggle(c, !solid));
      });
      hdr.querySelector(".hdr-sub").classList.toggle("text-white/70", !solid);
      hdr.querySelector(".hdr-sub").classList.toggle("text-ink/55", solid);
      const mb = document.getElementById("menuBtn");
      mb.classList.toggle("bg-white/10", !solid); mb.classList.toggle("bg-ink/5", solid);
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    const m = document.getElementById("mnav"), mb = document.getElementById("menuBtn");
    mb.onclick = () => { m.classList.remove("hidden"); mb.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; };
    m.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", () => { m.classList.add("hidden"); mb.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }));
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
    <footer class="bg-ink text-cream/80">
      <div class="container-x grid gap-10 py-16 md:grid-cols-12">
        <div class="md:col-span-5">
          <img src="assets/img/logo-light.svg" alt="সাইফ বিল্ডার্স লোগো" class="h-12 w-auto" width="220" height="48">
          <p class="mt-5 max-w-sm text-[15px] leading-7">টঙ্গী ও আশপাশের মানুষের জন্য সহজ কিস্তিতে নিজের ফ্ল্যাট। সততা, ঝামেলামুক্ত জমি আর সময়মতো হস্তান্তর, এটাই আমাদের কাজের ধরন।</p>
          <div class="mt-6 flex gap-3">
            <a href="${S.facebook}" target="_blank" rel="noopener" aria-label="ফেসবুক" class="grid h-11 w-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10">${icon("fb")}</a>
            <a href="${waLink()}" target="_blank" rel="noopener" aria-label="হোয়াটসঅ্যাপ" class="grid h-11 w-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10">${icon("wa")}</a>
            <a href="tel:${S.phone}" aria-label="ফোন" class="grid h-11 w-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10">${icon("phone")}</a>
          </div>
        </div>
        <div class="md:col-span-3">
          <h4 class="text-lg font-semibold text-white">প্রজেক্টসমূহ</h4>
          <ul class="mt-4 space-y-2 text-[15px]">${window.PROJECTS.map((p) => `<li><a class="hover:text-brass" href="project.html?id=${p.id}">${p.name}</a></li>`).join("")}</ul>
        </div>
        <div class="md:col-span-4">
          <h4 class="text-lg font-semibold text-white">অফিস</h4>
          <ul class="mt-4 space-y-3 text-[15px]">
            <li class="flex gap-3">${icon("pin", "mt-1 h-5 w-5 shrink-0 text-brass")}<span>${S.address}</span></li>
            <li class="flex gap-3">${icon("phone", "mt-1 h-5 w-5 shrink-0 text-brass")}<a href="tel:${S.phone}" class="hover:text-brass">${bn(S.phone)}</a></li>
            <li class="flex gap-3">${icon("fb", "mt-1 h-5 w-5 shrink-0 text-brass")}<a href="${S.facebook}" target="_blank" rel="noopener" class="hover:text-brass">facebook.com/saifbuilders</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/10">
        <div class="container-x flex flex-col gap-2 py-6 pb-24 text-sm text-cream/50 sm:flex-row sm:justify-between lg:pb-6">
          <span>© ${bn(new Date().getFullYear())} সাইফ বিল্ডার্স। সর্বস্বত্ব সংরক্ষিত।</span>
          <span>ছবি ও নকশা উপস্থাপনার জন্য, চূড়ান্ত নকশা অনুমোদিত প্ল্যান অনুযায়ী।</span>
        </div>
      </div>
    </footer>
    <!-- floating -->
    <a href="${waLink()}" target="_blank" rel="noopener" aria-label="হোয়াটসঅ্যাপে মেসেজ দিন" class="fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-lift transition hover:scale-105 lg:grid">
      <span class="absolute inset-0 animate-ping rounded-full bg-wa/40"></span>${icon("wa", "relative h-7 w-7")}
    </a>
    <div class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-ink/10 bg-paper/95 p-3 backdrop-blur-xl lg:hidden">
      <a href="tel:${S.phone}" class="btn-ink !py-3">${icon("phone", "h-5 w-5")} কল করুন</a>
      <a href="${waLink()}" target="_blank" rel="noopener" class="btn bg-wa !py-3 text-white">${icon("wa", "h-5 w-5")} হোয়াটসঅ্যাপ</a>
    </div>`;
  }

  window.projectCard = (p) => {
    const st = window.STATUS[p.status];
    return `
    <a href="project.html?id=${p.id}" class="group card reveal block overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div class="relative aspect-[16/11] overflow-hidden bg-cream">
        <img src="assets/img/projects/${p.id}/view-1.svg" alt="${p.name} এর ৩ডি ভিউ" loading="lazy" class="h-full w-full object-cover transition duration-700 group-hover:scale-105">
        <span class="chip absolute left-4 top-4 bg-white/95 ${st.cls}">${st.label}</span>
        <span class="chip absolute right-4 top-4 bg-ink/80 text-white">${bn(p.floors)} তলা</span>
      </div>
      <div class="p-6">
        <h3 class="text-xl font-bold">${p.name}</h3>
        <p class="mt-1 flex items-center gap-1.5 text-sm text-ink/60">${icon("pin", "h-4 w-4")} ${p.location}</p>
        <p class="mt-3 line-clamp-2 text-[15px] text-ink/75">${p.tagline}</p>
        <div class="mt-5 flex items-center justify-between border-t border-ink/5 pt-4">
          <span class="text-sm font-semibold text-ink/70">${bn(p.sizes[0])} থেকে ${bn(p.sizes[p.sizes.length - 1])} বর্গফুট</span>
          <span class="grid h-10 w-10 place-items-center rounded-full bg-ink text-cream transition group-hover:bg-brass group-hover:text-ink">${icon("arrow", "h-5 w-5")}</span>
        </div>
      </div>
    </a>`;
  };

  window.initReveal = () => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
  };

  /* generic scroll-snap carousel controls */
  window.initCarousels = () => {
    document.querySelectorAll("[data-carousel]").forEach((wrap) => {
      const row = wrap.querySelector(".snap-row");
      const step = () => (row.firstElementChild?.getBoundingClientRect().width || 300) + 24;
      wrap.querySelector("[data-prev]")?.addEventListener("click", () => row.scrollBy({ left: -step(), behavior: "smooth" }));
      wrap.querySelector("[data-next]")?.addEventListener("click", () => row.scrollBy({ left: step(), behavior: "smooth" }));
    });
  };

  document.addEventListener("DOMContentLoaded", () => { initReveal(); initCarousels(); });
})();
