/* Studio MK • Aperçu interactif des couleurs (page Le studio).
   La couleur choisie ne s'applique qu'à l'aperçu : rien n'est enregistré par le site, le reste du site ne change pas.
   Si Keep Focus est installée, « Appliquer à mes outils » lui envoie la couleur (avec son autorisation) :
   c'est l'extension qui la garde, jamais le site (aucun traceur, voir cookies.html).
   Nuances dérivées avec l'algorithme de référence du design system (DESIGN §2.2, color-utils.js). */

(function () {
  "use strict";

  const stage = document.getElementById("family-visual");
  if (!stage) return;
  const swatches = Array.from(stage.querySelectorAll(".swatch"));
  const reset = stage.querySelector(".family-reset");
  const DEFAULT = "#0071e3";
  let current = DEFAULT;

  const toRgb = (h) => ({ r: parseInt(h.slice(1, 3), 16), g: parseInt(h.slice(3, 5), 16), b: parseInt(h.slice(5, 7), 16) });
  const toHex = ({ r, g, b }) => "#" + [r, g, b].map((n) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, "0")).join("");
  const mix = (a, b, t) => ({ r: a.r + (b.r - a.r) * t, g: a.g + (b.g - a.g) * t, b: a.b + (b.b - a.b) * t });
  const lum = ({ r, g, b }) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

  function apply(hex) {
    const rgb = toRgb(hex), white = { r: 255, g: 255, b: 255 }, black = { r: 0, g: 0, b: 0 };
    let text = rgb;
    for (let t = 0.05; contrast(text, white) < 4.5 && t <= 0.9; t += 0.05) text = mix(rgb, black, t);
    const s = stage.style;
    s.setProperty("--color-accent", hex);
    s.setProperty("--color-accent-hover", toHex(mix(rgb, black, 0.16)));
    s.setProperty("--color-accent-text", toHex(text));
    s.setProperty("--color-accent-contrast", contrast(rgb, white) >= 3 ? "#ffffff" : "#1d1d1f");
    s.setProperty("--accent-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    s.setProperty("--color-accent-soft", `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
    swatches.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.accent === hex)));
    current = hex;
  }

  /* ---------- Appliquer à mes outils (connexion avec Keep Focus) ---------- */

  const applyBox = document.getElementById("family-apply");
  const applyBtn = document.getElementById("family-apply-btn");
  const applyStatus = document.getElementById("family-apply-status");
  const MESSAGES = {
    applied: "Couleur appliquée à Keep Focus et aux outils du studio ✓",
    denied: "La connexion « Couleur de vos outils » est désactivée. Vous pouvez l'activer dans les Réglages de Keep Focus, panneau « Connexions ».",
    cancelled: "Rien n'a changé : la fenêtre de Keep Focus a été fermée sans choix.",
    invalid: "Cette couleur n'a pas pu être appliquée.",
    unavailable: "Keep Focus n'a pas pu recevoir la couleur."
  };

  if (window.KeepFocusLink && applyBox) {
    window.KeepFocusLink.onReady(() => { applyBox.hidden = false; });
    applyBtn.addEventListener("click", async () => {
      applyBtn.disabled = true;
      applyStatus.textContent = "Envoi...";
      const status = await window.KeepFocusLink.send("apply-accent", { accent: current }, () => {
        applyStatus.textContent = "Confirmez dans la fenêtre de Keep Focus qui vient de s'ouvrir.";
      });
      applyStatus.textContent = MESSAGES[status] || MESSAGES.unavailable;
      applyBtn.disabled = false;
    });
  }

  swatches.forEach((b) => b.addEventListener("click", () => apply(b.dataset.accent)));
  reset.addEventListener("click", () => apply(DEFAULT));
})();
