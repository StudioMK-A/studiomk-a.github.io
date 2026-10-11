/* Studio MK • Lien avec Keep Focus (connexions de l'écosystème, DESIGN §5.12).
   La page et l'extension s'envoient des messages à l'intérieur du navigateur : aucun serveur, aucun stockage
   côté site. C'est toujours Keep Focus qui demande l'autorisation, dans sa propre fenêtre.
   Utilisation : KeepFocusLink.onReady(fn) ; KeepFocusLink.send("send-goals" | "apply-accent", données, onPending) */

window.KeepFocusLink = (function () {
  "use strict";

  const CHANNEL = "studio-mk";
  const FINAL = new Set(["applied", "denied", "cancelled", "invalid", "unavailable"]);
  const readyCallbacks = [];
  const waiting = new Map();
  let info = null;

  window.addEventListener("message", (event) => {
    if (event.source !== window || event.origin !== location.origin) return;
    const data = event.data;
    if (!data || data.channel !== CHANNEL || data.from !== "keep-focus") return;

    if (data.type === "ready" && !info) {
      info = { version: data.version };
      readyCallbacks.splice(0).forEach((fn) => fn(info));
    }
    if (data.type === "result" && waiting.has(data.requestId)) {
      const { resolve, onPending } = waiting.get(data.requestId);
      if (data.status === "pending") {
        if (onPending) onPending();
      } else if (FINAL.has(data.status)) {
        waiting.delete(data.requestId);
        resolve(data.status);
      }
    }
  });

  function onReady(fn) {
    if (info) fn(info);
    else readyCallbacks.push(fn);
  }

  function send(type, payload, onPending) {
    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return new Promise((resolve) => {
      waiting.set(requestId, { resolve, onPending });
      window.postMessage({ channel: CHANNEL, to: "keep-focus", type, requestId, ...payload }, location.origin);
    });
  }

  // Keep Focus s'annonce d'elle-même au chargement ; ce message couvre le cas où la page est prête après elle.
  window.postMessage({ channel: CHANNEL, to: "keep-focus", type: "hello" }, location.origin);

  return { onReady, send, isReady: () => Boolean(info) };
})();
