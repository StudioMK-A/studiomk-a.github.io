/* Studio MK • Filtres et recherche de l'accueil.
   Les cartes sont déjà écrites dans index.html par tools/build-pages.js (lisibles sans JavaScript) :
   ce script se contente de les afficher ou de les masquer. */

(function () {
  "use strict";

  const EMPTY_MESSAGES = {
    all: "Aucune création pour le moment.",
    extension: "Aucune extension Chrome dans cette catégorie.",
    ia: "Aucune solution IA dans cette catégorie."
  };

  const cards = Array.from(document.querySelectorAll("#project-grid .project"));
  const empty = document.getElementById("empty-state");
  const visibleCount = document.getElementById("visible-count");
  const search = document.getElementById("search");
  const filterButtons = Array.from(document.querySelectorAll(".filter"));

  const state = { filter: "all", query: "" };

  function matches(card) {
    if (state.filter !== "all" && card.dataset.type !== state.filter) return false;
    return !state.query || (card.dataset.search || "").includes(state.query);
  }

  function render() {
    let visible = 0;
    cards.forEach((card) => {
      const show = matches(card);
      card.hidden = !show;
      if (show) visible += 1;
    });

    empty.hidden = visible > 0;
    if (!visible) {
      empty.textContent = state.query ? "Aucune création ne correspond à cette recherche." : EMPTY_MESSAGES[state.filter];
    }
    visibleCount.textContent = visible + (visible > 1 ? " créations affichées" : " création affichée");
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      render();
    });
  });

  search.addEventListener("input", () => {
    state.query = search.value.trim().toLowerCase();
    render();
  });

  render();
})();
