/* Studio MK • Nouveautés
   Journal des changements de toutes les créations, affiché par la page nouveautes.html.
   Ajouter une entrée EN HAUT de la liste, puis régénérer : node tools/build-pages.js
   Règle (DESIGN §5.10) : chaque version mineure ou majeure d'une création a son entrée ici,
   en plus de la page « Quoi de neuf » intégrée à la création.

   Champs d'une entrée :
   - date      "AAAA-MM-JJ"
   - type      "ajout" (nouvelle création), "amelioration", "retrait", "fusion" ou "annonce"
   - creation  id de la création concernée (voir js/projects.js), ou "" pour le studio
   - title     titre court
   - text      une ou deux phrases, le bénéfice avant la technique */

window.STUDIO_MK_NEWS = [
  {
    date: "2026-09-28",
    type: "annonce",
    creation: "",
    title: "Valeurs, Vision, Mission : voir plus loin",
    text: "Trois créations rejoindront le studio, en amont d'Objectifs clairs : savoir ce qui compte, où l'on veut aller et pourquoi, avant de choisir les objectifs de la semaine."
  },
  {
    date: "2026-09-28",
    type: "amelioration",
    creation: "objectifs-clairs",
    title: "Objectifs clairs a sa page",
    text: "Une page présente désormais Objectifs clairs en détail : comment il fonctionne, ce qu'il fait de vos textes (rien, ils restent sur votre appareil) et son lien avec Keep Focus."
  },
  {
    date: "2026-09-27",
    type: "amelioration",
    creation: "keep-focus",
    title: "Keep Focus 1.3 : les premières connexions",
    text: "Objectifs clairs peut envoyer vos trois objectifs directement dans Keep Focus, et la couleur choisie sur la page Le studio peut devenir celle de vos outils. Rien ne se fait sans votre accord, tout reste dans votre navigateur, et un panneau « Connexions » dans les Réglages montre et règle chaque échange."
  },
  {
    date: "2026-09-27",
    type: "ajout",
    creation: "objectifs-clairs",
    title: "Objectifs clairs est disponible",
    text: "Écrivez vos intentions en vrac, repartez avec trois objectifs concrets pour la semaine. L'assistant intégré à Chrome travaille sur votre appareil : vos textes ne sont envoyés nulle part. Sans lui, un mode guidé prend le relais."
  },
  {
    date: "2026-09-27",
    type: "annonce",
    creation: "",
    title: "Notre Constitution",
    text: "Neuf engagements pour que les créations restent gratuites, sans données ni publicité, et que le studio vive de contributions libres qui ne donnent aucun avantage. Les contributions ouvriront bientôt."
  },
  {
    date: "2026-09-27",
    type: "amelioration",
    creation: "keep-focus",
    title: "Keep Focus 1.2 : une page « Quoi de neuf »",
    text: "Après chaque mise à jour importante, Keep Focus présente ses nouveautés dans une page simple, jamais pendant une session de concentration. Les Réglages présentent aussi, discrètement, les autres créations du studio, et la signature mène au site."
  },
  {
    date: "2026-09-27",
    type: "annonce",
    creation: "",
    title: "Trois créations en préparation",
    text: "L'Essentiel pour résumer une page en un clic, Plus tard pour mettre une pensée de côté pendant une session, et Objectifs clairs pour transformer une intention floue en trois objectifs concrets."
  },
  {
    date: "2026-09-27",
    type: "annonce",
    creation: "",
    title: "Ouverture du site Studio MK",
    text: "Toutes les créations du studio sont désormais réunies au même endroit, avec une page dédiée pour chacune et l'histoire du studio."
  }
];
