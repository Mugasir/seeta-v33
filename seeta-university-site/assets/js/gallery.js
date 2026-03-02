(function () {
  const grid = document.getElementById("galleryGrid");
  const filter = document.getElementById("galleryFilter");
  const lb = document.getElementById("lightbox");
  if (!grid || !filter || !lb) return;

  const lbImg = lb.querySelector("img");
  const lbCap = lb.querySelector("[data-cap]");
  const lbClose = document.getElementById("lightboxClose");

  function norm(s) {
    return (s || "").toLowerCase().trim();
  }

  function applyFilter() {
    const f = norm(filter.value);
    grid.querySelectorAll("[data-item]").forEach((item) => {
      const cat = norm(item.getAttribute("data-cat"));
      item.style.display = !f || cat === f ? "" : "none";
    });
  }

  function open(src, cap) {
    lbImg.src = src;
    lbCap.textContent = cap || "";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
  }

  function close() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
  }

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (!btn) return;
    const src = btn.getAttribute("data-src");
    const cap = btn.getAttribute("data-cap");
    if (src) open(src, cap);
  });

  lbClose.addEventListener("click", close);
  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  filter.addEventListener("input", applyFilter);
  applyFilter();
})();