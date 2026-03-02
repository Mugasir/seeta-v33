(function () {
  const list = document.getElementById("programList");
  if (!list) return;

  const school = document.getElementById("filterSchool");
  const level = document.getElementById("filterLevel");
  const search = document.getElementById("filterSearch");
  const count = document.getElementById("resultCount");

  function norm(s) {
    return (s || "").toLowerCase().trim();
  }

  function applyFilters() {
    const sSchool = norm(school.value);
    const sLevel = norm(level.value);
    const sQuery = norm(search.value);

    let shown = 0;

    list.querySelectorAll("[data-program]").forEach((card) => {
      const pSchool = norm(card.getAttribute("data-school"));
      const pLevel = norm(card.getAttribute("data-level"));
      const pName = norm(card.getAttribute("data-name"));
      const pText = norm(card.getAttribute("data-text"));

      const okSchool = !sSchool || pSchool === sSchool;
      const okLevel = !sLevel || pLevel === sLevel;
      const okQuery = !sQuery || pName.includes(sQuery) || pText.includes(sQuery);

      const show = okSchool && okLevel && okQuery;
      card.style.display = show ? "" : "none";
      if (show) shown += 1;
    });

    if (count) count.textContent = String(shown);
  }

  [school, level, search].forEach((el) => el && el.addEventListener("input", applyFilters));
  applyFilters();
})();