(function () {
  const APPLY_URL = "https://forms.gle/your-form-link"; // Replace with your real Google Form link

  function setApplyLinks() {
    document.querySelectorAll("[data-apply-link]").forEach((a) => {
      a.setAttribute("href", APPLY_URL);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
  }

  function setActiveNav() {
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll("[data-nav]").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (href === path) a.classList.add("active");
    });
  }

  function drawer() {
    const drawer = document.getElementById("drawer");
    const openBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("drawerClose");

    if (!drawer || !openBtn || !closeBtn) return;

    function open() {
      drawer.classList.add("open");
      drawer.setAttribute("aria-hidden", "false");
    }
    function close() {
      drawer.classList.remove("open");
      drawer.setAttribute("aria-hidden", "true");
    }

    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    drawer.addEventListener("click", (e) => {
      if (e.target === drawer) close();
    });
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  setApplyLinks();
  setActiveNav();
  drawer();
  smoothScroll();
})();