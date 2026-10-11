/* Studio MK • Objectifs clairs
   L'assistant est l'IA intégrée à Chrome (Prompt API, modèle Gemini Nano) : tout se passe sur l'appareil,
   aucun texte n'est envoyé au studio ni à un tiers. Si elle n'est pas disponible (autre navigateur,
   téléphone, ordinateur trop modeste), la page passe en mode guidé sans assistant. Aucune impasse. */

(function () {
  "use strict";

  // Mêmes options pour availability() et create(), comme le demande la documentation de Chrome.
  const LANGUAGE_OPTIONS = {
    expectedInputs: [{ type: "text", languages: ["fr"] }],
    expectedOutputs: [{ type: "text", languages: ["fr"] }]
  };

  const SYSTEM_PROMPT =
    "Tu aides une personne à préparer sa semaine. À partir de ses intentions, écrites en vrac, tu proposes " +
    "exactement trois objectifs pour la semaine, en français. Chaque objectif commence par un verbe d'action " +
    "à l'infinitif, décrit un résultat concret et vérifiable d'ici la fin de la semaine, reste réaliste, et " +
    "tient en 80 caractères au maximum. Choisis les trois intentions les plus importantes, ou découpe une " +
    "grande intention en une étape réalisable cette semaine. Pas de numérotation, pas de commentaire.";

  const RESPONSE_SCHEMA = {
    type: "object",
    properties: {
      objectifs: { type: "array", minItems: 3, maxItems: 3, items: { type: "string", maxLength: 80 } }
    },
    required: ["objectifs"],
    additionalProperties: false
  };

  const $ = (id) => document.getElementById(id);
  const card = document.querySelector(".oc-card");
  const intent = $("oc-intent");
  const proposeBtn = $("oc-propose");
  const status = $("oc-status");
  const stepIntent = $("oc-step-intent");
  const tips = $("oc-manual-tips");
  const stepGoals = $("oc-step-goals");
  const goalsTitle = $("oc-goals-title");
  const goalInputs = Array.from(document.querySelectorAll(".oc-goal"));
  const copyBtn = $("oc-copy");
  const againBtn = $("oc-again");
  const copyStatus = $("oc-copy-status");
  const noteText = $("oc-note-text");
  const altBtn = $("oc-alt-btn");
  const altPanel = $("oc-alt-panel");
  const promptCopyBtn = $("oc-prompt-copy");
  const promptStatus = $("oc-prompt-status");

  const initialCopyStatus = copyStatus.innerHTML;
  let baseSession = null;
  let busy = false;

  /* ---------- Copie (API presse-papiers, sinon copie de secours) ---------- */

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
        // Copie de secours ci-dessous.
      }
    }
    return legacyCopy(text);
  }

  /* ---------- Modes ---------- */

  function showGoals() {
    stepGoals.hidden = false;
    // Une seule action principale par zone (DESIGN §1) : une fois les objectifs affichés, c'est « Copier ».
    proposeBtn.classList.replace("btn-primary", "btn-secondary");
  }

  function enterManualMode() {
    card.classList.add("oc-manual");
    stepIntent.hidden = true;
    tips.hidden = false;
    stepGoals.classList.add("oc-goals-first");
    goalsTitle.textContent = "Vos trois objectifs";
    goalsTitle.previousElementSibling.textContent = "1";
    againBtn.hidden = true;
    noteText.textContent =
      "L'assistant intégré à Chrome n'est pas disponible sur cet appareil (il demande Chrome sur un ordinateur " +
      "récent). Écrivez vos objectifs ci-dessous, ou utilisez votre IA.";
    showGoals();
  }

  async function detectAssistant() {
    if (!("LanguageModel" in self)) return "unavailable";
    try {
      return await self.LanguageModel.availability(LANGUAGE_OPTIONS);
    } catch (error) {
      return "unavailable";
    }
  }

  /* ---------- Proposition d'objectifs ---------- */

  function setStatus(text) {
    status.textContent = text;
  }

  function cleanGoal(text) {
    return String(text || "")
      .replace(/^\s*(?:[-•*]|\d+[.)])\s*/, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 80);
  }

  async function getSession() {
    if (baseSession) return baseSession;
    baseSession = await self.LanguageModel.create({
      ...LANGUAGE_OPTIONS,
      initialPrompts: [{ role: "system", content: SYSTEM_PROMPT }],
      monitor(monitor) {
        monitor.addEventListener("downloadprogress", (event) => {
          const percent = Math.round((event.loaded || 0) * 100);
          setStatus(`Préparation de l'assistant, une seule fois : ${percent} %`);
        });
      }
    });
    return baseSession;
  }

  async function propose(avoid) {
    const text = intent.value.trim();
    if (!text || busy) return;
    busy = true;
    proposeBtn.disabled = true;
    againBtn.disabled = true;
    setStatus("Un instant...");

    let run = null;
    try {
      // create() est appelé tout de suite après le clic : Chrome l'exige pour télécharger l'assistant.
      const session = await getSession();
      setStatus("Un instant...");
      // Une copie de la session par demande : chaque proposition repart des seules instructions de départ.
      run = typeof session.clone === "function" ? await session.clone() : session;

      let request = `Mes intentions, en vrac :\n${text}`;
      if (avoid && avoid.length) {
        request += `\n\nPropose trois objectifs différents de ceux-ci : ${avoid.join(" ; ")}.`;
      }
      const raw = await run.prompt(request, { responseConstraint: RESPONSE_SCHEMA });
      const goals = (JSON.parse(raw).objectifs || []).map(cleanGoal).filter(Boolean);
      if (goals.length === 0) throw new Error("Réponse vide");

      goalInputs.forEach((input, i) => { input.value = goals[i] || ""; });
      resetCopyStatus();
      showGoals();
      setStatus("");
      goalsTitle.focus({ preventScroll: true });
      stepGoals.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (error) {
      setStatus("L'assistant n'a pas pu répondre. Réessayez, ou écrivez vos objectifs vous-même ci-dessous.");
      showGoals();
    } finally {
      if (run && run !== baseSession && typeof run.destroy === "function") run.destroy();
      busy = false;
      proposeBtn.disabled = intent.value.trim().length < 3;
      againBtn.disabled = false;
    }
  }

  /* ---------- Copier pour Keep Focus ---------- */

  function resetCopyStatus() {
    if (window.KeepFocusLink && window.KeepFocusLink.isReady()) {
      copyStatus.textContent = "Keep Focus est installée : vos objectifs peuvent y être envoyés directement.";
    } else {
      copyStatus.innerHTML = initialCopyStatus;
    }
  }

  async function copyGoals() {
    const goals = goalInputs.map((input) => cleanGoal(input.value)).filter(Boolean);
    if (!goals.length) {
      copyStatus.textContent = "Écrivez au moins un objectif avant de le copier.";
      return;
    }
    const ok = await copy(goals.join("\n"));
    copyStatus.textContent = ok
      ? "Objectifs copiés ✓ Collez chaque ligne dans un champ de Keep Focus."
      : `Copie impossible. Vos objectifs : ${goals.join(" • ")}`;
  }

  /* ---------- Envoyer dans Keep Focus (connexion de l'écosystème, DESIGN §5.12) ---------- */

  const sendBtn = $("oc-send");
  const SEND_MESSAGES = {
    applied: "Objectifs envoyés dans Keep Focus ✓",
    denied: "La connexion avec Objectifs clairs est désactivée. Vous pouvez l'activer dans les Réglages de Keep Focus, panneau « Connexions ».",
    cancelled: "Envoi annulé : la fenêtre de Keep Focus a été fermée sans choix.",
    invalid: "Écrivez au moins un objectif avant de l'envoyer.",
    unavailable: "Keep Focus n'a pas pu recevoir vos objectifs. Vous pouvez les copier."
  };

  async function sendGoals() {
    const goals = goalInputs.map((input) => cleanGoal(input.value)).filter(Boolean);
    if (!goals.length) {
      copyStatus.textContent = SEND_MESSAGES.invalid;
      return;
    }
    sendBtn.disabled = true;
    copyStatus.textContent = "Envoi...";
    const status = await window.KeepFocusLink.send("send-goals", { goals }, () => {
      copyStatus.textContent = "Confirmez dans la fenêtre de Keep Focus qui vient de s'ouvrir.";
    });
    copyStatus.textContent = SEND_MESSAGES[status] || SEND_MESSAGES.unavailable;
    sendBtn.disabled = false;
  }

  if (window.KeepFocusLink) {
    window.KeepFocusLink.onReady(() => {
      // Keep Focus est installée : l'envoi direct devient l'action principale, la copie reste possible.
      sendBtn.hidden = false;
      copyBtn.classList.replace("btn-primary", "btn-secondary");
      copyBtn.textContent = "Copier";
      copyStatus.textContent = "Keep Focus est installée : vos objectifs peuvent y être envoyés directement.";
    });
    sendBtn.addEventListener("click", sendGoals);
  }

  /* ---------- « Utiliser votre IA » : modèle de prompt ---------- */

  function promptTemplate() {
    const text = intent.value.trim();
    return [
      "Aide-moi à définir exactement trois objectifs clairs pour ma semaine.",
      "",
      "Mes intentions, en vrac :",
      text || "[écrivez-les ici]",
      "",
      "Règles pour chaque objectif :",
      "- il commence par un verbe d'action à l'infinitif ;",
      "- son résultat est concret et vérifiable d'ici la fin de la semaine ;",
      "- il est réaliste en une semaine (un grand projet se découpe en une étape) ;",
      "- il tient en 80 caractères au maximum.",
      "",
      "Réponds uniquement avec les trois objectifs, un par ligne, sans numéro, sans puce et sans commentaire."
    ].join("\n");
  }

  function setPanel(open) {
    altPanel.hidden = !open;
    altBtn.setAttribute("aria-expanded", String(open));
    if (open) {
      promptStatus.textContent = "";
      promptCopyBtn.focus();
    }
  }

  altBtn.addEventListener("click", () => setPanel(altPanel.hidden));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !altPanel.hidden) {
      setPanel(false);
      altBtn.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!altPanel.hidden && !altPanel.contains(event.target) && !altBtn.contains(event.target)) setPanel(false);
  });

  promptCopyBtn.addEventListener("click", async () => {
    const ok = await copy(promptTemplate());
    promptStatus.textContent = ok ? "Modèle copié ✓ Collez-le dans l'IA de votre choix." : "Copie impossible sur ce navigateur.";
  });

  /* ---------- Démarrage ---------- */

  intent.addEventListener("input", () => {
    if (!busy) proposeBtn.disabled = intent.value.trim().length < 3;
  });
  intent.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey) && !proposeBtn.disabled) propose();
  });
  proposeBtn.addEventListener("click", () => propose());
  againBtn.addEventListener("click", () => propose(goalInputs.map((input) => input.value.trim()).filter(Boolean)));
  copyBtn.addEventListener("click", copyGoals);

  detectAssistant().then((availability) => {
    if (availability === "unavailable") enterManualMode();
  });
})();
