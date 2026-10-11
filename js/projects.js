/* Studio MK • Liste des créations
   C'est le SEUL fichier à modifier pour ajouter, retirer ou mettre à jour une création.
   Après modification, régénérer les pages : node tools/build-pages.js

   Champs d'une création :
   - id          identifiant unique, sans espace (ex. "keep-focus") : donne aussi le nom de sa page
   - name        nom affiché
   - type        "extension" (Extension Chrome) ou "ia" (Solution IA)
   - tagline     une phrase courte
   - description deux ou trois phrases maximum
   - status      "disponible", "bientot" (prête, bientôt publiée), "dev" (en développement) ou "avenir" (idée annoncée)
   - icon        chemin d'une image 48 px ou plus (laisser "" pour afficher l'initiale)
   - accent      couleur de la page dédiée (toutes les nuances en sont dérivées), "" = bleu par défaut
   - related     ids des créations liées, montrées en priorité dans « Les autres créations du studio » (3 max)
   - example     true = modèle vierge : gardé ici comme trame, JAMAIS publié sur le site
   - links       primary : lien d'installation ou d'essai. url "" = « sera bientôt disponible ». {} = aucun lien
   - tags        mots-clés utilisés par la recherche
   - landing     contenu de la page dédiée (facultatif : sans lui, pas de page dédiée)
                 privacy.policy : page de confidentialité propre à la création
                 visuels : templates/visuals/<id>.html */

window.STUDIO_MK_PROJECTS = [
  {
    id: "keep-focus",
    name: "Keep Focus",
    type: "extension",
    tagline: "Restez concentré sur vos objectifs de la semaine.",
    description: "Bloque les sites qui distraient pendant une session, rappelle vos objectifs dans une pastille discrète et freine honnêtement l'arrêt d'une session.",
    status: "bientot",
    icon: "assets/icons/keep-focus/icon128.png",
    accent: "#de375f",
    related: ["objectifs-clairs", "plus-tard", "l-essentiel"],
    example: false,
    links: {
      primary: { label: "Ajouter à Chrome", url: "" }
    },
    tags: ["concentration", "blocage", "productivité", "objectifs", "focus"],
    landing: {
      eyebrow: "Extension Chrome • Gratuite",
      lead: "Vos objectifs au premier plan, les distractions en pause. Keep Focus bloque les sites qui vous dispersent le temps d'une session et garde vos objectifs de la semaine sous vos yeux, sur chaque page.",
      problem: {
        title: "Un onglet de trop, et l'heure est passée.",
        text: "Une notification LinkedIn, un e-mail à vérifier, une vidéo « rapide »... Chaque interruption coûte bien plus que les secondes qu'elle prend. Keep Focus ne vous demande pas plus de volonté : il met la tentation de côté et vous rappelle pourquoi vous êtes là."
      },
      features: [
        {
          visual: "widget",
          label: "Objectifs",
          title: "Vos objectifs toujours à portée de vue",
          text: "Une pastille discrète s'affiche sur les sites que vous visitez. Un clic, et vos trois objectifs de la semaine apparaissent, avec le temps restant de la session. Glissez-la où vous voulez sur l'écran : elle s'en souvient."
        },
        {
          visual: "popup",
          label: "Session",
          title: "Une session en un clic",
          text: "Choisissez 25 min, 1 h, 2 h, jusqu'à ce soir ou une durée sur mesure, puis démarrez. LinkedIn, Gmail, YouTube et les réseaux sociaux sont bloqués par défaut, et la liste se modifie librement en dehors des sessions."
        },
        {
          visual: "blocked",
          label: "Blocage",
          title: "Un rappel au moment exact où il compte",
          text: "Vous ouvrez un site bloqué par réflexe ? À sa place, Keep Focus affiche le compte à rebours, vos objectifs et votre message personnel. Le rappel le plus utile, au moment où vous en avez le plus besoin."
        },
        {
          visual: "stop",
          label: "Arrêt",
          title: "Un frein honnête pour arrêter",
          text: "Arrêter avant la fin reste possible, mais pas sur un coup de tête : deux questions de recul, puis une phrase à retaper de mémoire, sans copier-coller. De quoi distinguer une envie d'un vrai besoin."
        }
      ],
      extras: [
        { title: "À votre couleur", text: "Choisissez la couleur de l'interface : toutes les nuances s'ajustent automatiquement pour rester lisibles." },
        { title: "Un chrono calme", text: "Le temps restant ne défile pas à la seconde : il se met à jour à des moments choisis pour ne pas capter votre attention." },
        { title: "Une phrase personnelle", text: "Ajoutez votre propre phrase à retaper pour arrêter une session. Le frein ne peut que se renforcer, jamais s'affaiblir." }
      ],
      steps: [
        { title: "Notez vos objectifs", text: "Trois objectifs pour la semaine, directement dans l'extension." },
        { title: "Lancez une session", text: "Choisissez une durée et cliquez sur Démarrer." },
        { title: "Avancez", text: "Les sites distrayants attendront la fin du chrono. Le blocage se lève tout seul." }
      ],
      privacy: {
        title: "Vos données restent chez vous",
        policy: "confidentialite-keep-focus.html",
        points: [
          "Objectifs, sites bloqués et réglages sont enregistrés uniquement dans votre navigateur.",
          "Aucun compte à créer, aucune donnée envoyée à un serveur, aucun traceur.",
          "Désinstaller l'extension supprime toutes ses données.",
          "Les connexions avec les outils du studio (Objectifs clairs, couleur de vos outils) se font dans votre navigateur, seulement avec votre accord, et se désactivent d'un geste dans les Réglages."
        ]
      },
      faq: [
        { q: "Keep Focus est-elle gratuite ?", a: "Oui, entièrement et pour toujours : sans publicité, sans abonnement, sans compte. Le studio vit de contributions libres, qui ne donnent aucun avantage : tout est expliqué dans « Notre Constitution », en bas de page." },
        { q: "Quels sites sont bloqués ?", a: "Par défaut : LinkedIn, Gmail, Facebook, Instagram, X (Twitter) et YouTube. Vous pouvez modifier la liste dans les Réglages, en dehors d'une session. Les sous-domaines sont inclus automatiquement." },
        { q: "Puis-je arrêter une session avant la fin ?", a: "Oui, par le parcours d'arrêt : deux questions de recul, puis une phrase à retaper de mémoire. C'est volontairement exigeant, jamais impossible." },
        { q: "Pourquoi l'extension demande-t-elle l'accès à tous les sites ?", a: "Pour afficher la pastille de vos objectifs sur les pages que vous visitez et remplacer les sites de votre liste pendant une session. Keep Focus n'enregistre ni ne transmet le contenu des pages." },
        { q: "Fonctionne-t-elle sur d'autres navigateurs ?", a: "Keep Focus est conçue pour Google Chrome et fonctionne aussi sur Opera." },
        { q: "Keep Focus m'empêche-t-elle de la désinstaller ?", a: "Non. Aucune extension ne peut empêcher sa propre désactivation. Keep Focus rend la distraction impulsive plus coûteuse : c'est un outil de discipline, pas un verrou." }
      ],
      cta: {
        title: "Prêt à reprendre la main sur votre attention ?",
        text: "Installez Keep Focus, notez vos objectifs et lancez votre première session."
      }
    }
  },
  /* ---------- Créations à venir (idées annoncées, pas encore développées) ---------- */
  {
    id: "l-essentiel",
    name: "L'Essentiel",
    type: "extension",
    tagline: "Le résumé d'une page en un clic, à emporter où vous voulez.",
    description: "Résume l'article ou la page ouverte en quelques points clés, avec l'IA intégrée à Chrome quand elle est disponible. Puis continuez la réflexion dans Claude ou ChatGPT, ou envoyez le résumé par e-mail.",
    status: "avenir",
    icon: "assets/icons/l-essentiel/icon128.png",
    accent: "#00a3a3",
    example: false,
    links: {},
    tags: ["résumé", "lecture", "ia", "claude", "chatgpt", "e-mail", "article"]
  },
  {
    id: "plus-tard",
    name: "Plus tard",
    type: "extension",
    tagline: "Mettez une pensée de côté sans quitter votre travail.",
    description: "Une idée, un lien ou une tâche surgit en pleine concentration ? Un raccourci suffit pour la noter. Tout est classé et vous attend à la fin de la session, dans votre navigateur. Le compagnon naturel de Keep Focus.",
    status: "avenir",
    icon: "assets/icons/plus-tard/icon128.png",
    accent: "#ff9500",
    example: false,
    links: {},
    tags: ["idées", "notes", "liens", "concentration", "keep focus", "plus tard"]
  },
  {
    id: "objectifs-clairs",
    name: "Objectifs clairs",
    type: "ia",
    tagline: "Transformez une intention floue en trois objectifs concrets.",
    description: "Décrivez ce que vous voulez accomplir, même en vrac. L'IA intégrée à Chrome en tire trois objectifs précis et réalistes pour la semaine, prêts à noter dans Keep Focus. Vos textes restent sur votre appareil.",
    status: "disponible",
    icon: "assets/icons/objectifs-clairs/icon128.png",
    accent: "#5e5ce6",
    example: false,
    links: {
      primary: { label: "Essayer", url: "objectifs-clairs.html" }
    },
    tags: ["objectifs", "semaine", "planification", "ia", "keep focus"],
    related: ["keep-focus", "plus-tard", "l-essentiel"],
    landing: {
      eyebrow: "Solution IA • Gratuite",
      lead: "Écrivez ce que vous voulez accomplir, même en vrac. Objectifs clairs en tire trois objectifs concrets et réalistes pour votre semaine, avec l'IA intégrée à Chrome : vos textes restent sur votre appareil.",
      problem: {
        title: "Trop d'idées, pas de cap.",
        text: "Finir ce dossier, chercher un stage, se remettre au sport... Quand tout semble important, rien n'avance vraiment. Un objectif flou ne se réalise pas : il se repousse. Objectifs clairs vous aide à choisir, puis à formuler trois objectifs que vous saurez atteindre cette semaine."
      },
      features: [
        { visual: "intent", label: "Intentions", title: "Écrivez comme ça vient", text: "Pas de formulaire, pas de méthode à apprendre : une zone de texte et vos mots, en vrac. L'assistant fait le tri et garde ce qui compte." },
        { visual: "goals", label: "Objectifs", title: "Trois objectifs concrets et réalistes", text: "Chaque objectif commence par un verbe d'action, décrit un résultat visible et tient dans la semaine. Vous pouvez les modifier, ou en demander trois autres." },
        { visual: "connect", label: "Keep Focus", title: "Envoyés dans Keep Focus en un clic", text: "Si Keep Focus est installée, vos trois objectifs y sont envoyés directement, après un accord donné une seule fois dans sa propre fenêtre. Sinon, un clic suffit pour les copier." },
        { visual: "private", label: "Confidentialité", title: "Vos textes restent sur votre appareil", text: "L'assistant est l'IA intégrée à Chrome : il travaille sur votre ordinateur, sans rien envoyer au studio ni à personne. Vous préférez votre propre IA ? Un modèle de prompt prêt à copier vous attend, sans rancune." }
      ],
      extras: [
        { title: "Un mode guidé sans IA", text: "Sur un appareil sans l'IA de Chrome, la page vous guide pour écrire vous-même trois bons objectifs." },
        { title: "Gratuit, sans compte", text: "Aucune inscription, aucune publicité, aucun traceur : vous arrivez, vous écrivez, vous repartez." },
        { title: "À la couleur de vos outils", text: "Avec Keep Focus, la page prend la couleur que vous avez choisie pour vos outils du studio." }
      ],
      steps: [
        { title: "Écrivez vos intentions", text: "Tout ce que vous voulez faire cette semaine, dans le désordre." },
        { title: "Recevez trois objectifs", text: "Concrets, réalistes, à ajuster si besoin." },
        { title: "Passez à l'action", text: "Envoyez-les dans Keep Focus et lancez une session de concentration." }
      ],
      privacy: {
        title: "Vos textes restent chez vous",
        points: [
          "L'assistant est l'IA intégrée à Chrome : vos textes sont traités sur votre appareil, sans être envoyés à Google, au studio ni à personne.",
          "Le site ne dépose aucun cookie et n'écrit rien dans votre navigateur.",
          "L'envoi vers Keep Focus se fait dans votre navigateur, seulement avec votre accord."
        ]
      },
      faq: [
        { q: "Faut-il un compte ou payer ?", a: "Non. Objectifs clairs est gratuit, sans compte, sans publicité." },
        { q: "Sur quels appareils l'assistant fonctionne-t-il ?", a: "Il demande Google Chrome à jour sur un ordinateur (Windows, macOS, Linux ou Chromebook Plus) assez récent : une carte graphique de plus de 4 Go de mémoire, ou 16 Go de mémoire vive, et 22 Go d'espace libre. Ailleurs, la page propose un mode guidé sans IA." },
        { q: "Pourquoi la première utilisation est-elle plus longue ?", a: "Chrome prépare l'assistant une seule fois (un téléchargement de plusieurs Go). Les fois suivantes, il est prêt tout de suite." },
        { q: "Mes textes sont-ils envoyés quelque part ?", a: "Non. Tout se passe sur votre appareil. Si vous choisissez « Utiliser votre IA », c'est vous qui collez le modèle de prompt dans l'IA de votre choix, avec ses propres règles de confidentialité." },
        { q: "Faut-il installer Keep Focus ?", a: "Non, Objectifs clairs fonctionne seul. Keep Focus permet d'aller plus loin : vos objectifs restent sous vos yeux pendant vos sessions de concentration." }
      ],
      cta: {
        title: "Prêt à y voir clair ?",
        text: "Trois objectifs clairs pour votre semaine, en quelques instants."
      }
    }
  },

  /* ---------- Le nouveau cycle, en amont d'Objectifs clairs : Valeurs, Vision, Mission (à venir) ---------- */
  {
    id: "valeurs",
    name: "Valeurs",
    type: "ia",
    tagline: "Savoir ce qui compte vraiment pour vous.",
    description: "Choisissez les quelques valeurs qui guident vos choix. Elles deviennent la boussole de vos objectifs et de vos journées.",
    status: "avenir",
    icon: "assets/icons/valeurs/icon128.png",
    accent: "#c9a227",
    example: false,
    links: {},
    tags: ["valeurs", "sens", "boussole", "priorités"]
  },
  {
    id: "vision",
    name: "Vision",
    type: "ia",
    tagline: "Voir où vous voulez aller.",
    description: "Décrivez en quelques phrases où vous voulez être dans un an, ou dans trois. Vos objectifs de la semaine vous en rapprochent, pas à pas.",
    status: "avenir",
    icon: "assets/icons/vision/icon128.png",
    accent: "#28a745",
    example: false,
    links: {},
    tags: ["vision", "avenir", "direction", "long terme"]
  },
  {
    id: "mission",
    name: "Mission",
    type: "ia",
    tagline: "Donner un sens à ce que vous faites.",
    description: "Une phrase qui dit ce que vous faites, et pour qui. Elle vous accompagne discrètement, à côté de vos objectifs.",
    status: "avenir",
    icon: "assets/icons/mission/icon128.png",
    accent: "#af52de",
    example: false,
    links: {},
    tags: ["mission", "sens", "raison d'être"]
  },

  /* ---------- Modèles vierges (example: true) : jamais publiés, servent de trame ---------- */
  {
    id: "exemple-extension",
    name: "Extension exemple",
    type: "extension",
    tagline: "Une phrase qui résume ce que fait l'extension.",
    description: "Description courte à remplacer : le problème résolu et pour qui.",
    status: "dev",
    icon: "",
    example: true,
    links: {
      primary: { label: "Ajouter à Chrome", url: "" }
    },
    tags: []
  },
  {
    id: "exemple-ia",
    name: "Solution IA exemple",
    type: "ia",
    tagline: "Une phrase qui résume ce que fait la solution IA.",
    description: "Description courte à remplacer : la tâche automatisée et le gain de temps.",
    status: "dev",
    icon: "",
    example: true,
    links: {
      primary: { label: "Essayer", url: "" }
    },
    tags: ["ia"]
  }
];
