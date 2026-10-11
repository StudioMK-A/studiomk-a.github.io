/* Studio MK • Bouton « Partager » des pages dédiées.
   - Sur téléphone et tablette : menu de partage natif de l'appareil.
   - Sur ordinateur : copie directe du lien (le menu de partage de Windows est lent et peut rester bloqué).
   - Le lien partagé est toujours l'adresse publique de la page (balise canonical), jamais une adresse
     locale (file:// ou localhost) qui ne fonctionnerait pas chez la personne qui la reçoit.
   Aucun bouton de réseau social : aucun traceur tiers (voir cookies.html). */

(function () {
  "use strict";

  const button = document.querySelector("[data-share]");
  const status = document.querySelector("[data-share-status]");
  if (!button) return;

  const initialStatus = status ? status.innerHTML : "";
  let resetTimer = null;

  function showStatus(text) {
    if (!status) return;
    // Le message remplace le texte existant au lieu d'ajouter une ligne (DESIGN §8.7).
    status.textContent = text;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => { status.innerHTML = initialStatus; }, 6000);
  }

  function shareUrl() {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonical.href) return canonical.href;
    return /^https?:$/.test(location.protocol) ? location.href.split("#")[0] : "https://studiomk-a.github.io/";
  }

  function isTouchDevice() {
    return window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  }

  // Copie de secours pour les contextes où l'API presse-papiers est refusée (page locale, fenêtre intégrée).
  function legacyCopy(text) {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (error) { ok = false; }
    area.remove();
    return ok;
  }

  async function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        // On tente la copie de secours ci-dessous.
      }
    }
    return legacyCopy(text);
  }

  button.addEventListener("click", async () => {
    if (button.disabled) return;
    button.disabled = true;

    const url = shareUrl();
    // Seul le lien est partagé : l'aperçu (titre, description) est construit par l'application qui le reçoit
    // à partir des balises og: de la page.
    const data = { title: button.dataset.shareTitle, url };

    try {
      if (isTouchDevice() && navigator.share) {
        try {
          await navigator.share(data);
          return;
        } catch (error) {
          if (error && error.name === "AbortError") return;
        }
      }

      if (await copy(url)) {
        showStatus("Lien copié ✓ Il ne reste qu'à le coller.");
      } else {
        showStatus(`Copie impossible. Voici le lien à partager : ${url}`);
      }
    } finally {
      button.disabled = false;
    }
  });
})();
