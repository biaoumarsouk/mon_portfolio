// src/data/portfolioData.js
// Les lignes marquées "À VÉRIFIER" sont des suppositions de ma part : corrige-les.

export const TOPO = [
  {
    id: 'miage',
    t: 'MIAGE',
    s: 'Systèmes d’information',
    x: 50,
    y: 50,
    main: true,
    info: "Au centre de tout : concevoir des systèmes d'information qui répondent à de vrais besoins métier.",
    tags: ['UML · Merise', 'Gestion de projet', 'Méthodes agiles'],
  },
  {
    id: 'dev',
    t: 'Développement',
    s: 'React · Laravel',
    x: 18,
    y: 20,
    info: 'Je conçois des applications web et mobiles, de la conception jusqu’à la mise en ligne.',
    tags: ['React', 'React Native', 'Laravel', 'Tailwind CSS'],
  },
  {
    id: 'data',
    t: 'Data · DABI',
    s: 'SQL · Python',
    x: 82,
    y: 20,
    info: "Mon objectif : exploiter les données pour produire des indicateurs, identifier des tendances et aider à la prise de décision.",
    tags: ['SQL', 'Python', 'Power BI', 'Excel'],
  },
  {
    id: 'reseaux',
    t: 'Réseaux',
    s: 'Cisco · Linux',
    x: 18,
    y: 80,
    info: "Mon socle technique : administration réseau, systèmes Linux et Windows, sécurité et automatisation.",
    tags: ['Cisco', 'Linux', 'Windows', 'Automatisation'],
  },
  {
    id: 'design',
    t: 'UI/UX',
    s: 'Figma',
    x: 82,
    y: 80,
    info: "Je m’intéresse également à la conception d’interfaces claires et à l’expérience utilisateur avant le développement.",
    tags: ['Figma', 'Maquettes', 'UI/UX', 'Design system'],
  },
];

export const portfolioData = {
  profil: {
    prenom: "Marsouk",
    nom: "BIAOU",
    titre: "Étudiant en L3 MIAGE · Méthodes informatiques appliquées à la gestion des entreprises",
    statut: "L3 MIAGE — ISTIC, Université de Rennes",
    accroche: "Je conçois des systèmes d'information qui aident les organisations à décider avec leurs données.",
    description:
      "Étudiant en L3 MIAGE à l'ISTIC, je me forme à la conception de systèmes d'information, aux bases de données et à la gestion de projet. Mon objectif : poursuivre en Master MIAGE, parcours DABI. Mon passé en réseaux et en développement web me donne une vraie compréhension technique de ce que je modélise.",
    cvLink: "/cv-marsouk.pdf", // fichier à placer dans public/
  },

  // ============================================================
  // OBJECTIF ACTUEL : c'est ici que tu changes ton objectif à tout moment.
  // - actif: false  → la rubrique et le badge disparaissent du site
  // - types: un ou plusieurs parmi "Stage", "Alternance", "CDD", "CDI"
  // Tout le reste est du texte libre. Les valeurs ci-dessous sont des exemples.
  // ============================================================
  objectif: {
    actif: true,
    statut: "Recherche active",
    types: ["Stage"],
    intitule: "À la recherche d'un stage de 3 mois à partir d'avril",
    details:
      "Étudiant en L3 MIAGE à l'ISTIC, je cherche un stage de trois mois, à compter d'avril, pour mettre en pratique la conception de systèmes d'information, les bases de données et le développement.",
    disponibilite: "À partir d'avril 2027",
    rythme: "Stage de 3 mois",
    lieu: "Rennes et alentours, ou à distance",
    domaines: ["Systèmes d'information", "Data et BI", "Développement web et mobile"],
    misAJour: "Octobre 2026", // affiché dans la fenêtre d'accueil (laisse vide "" pour le masquer)
  },

  aPropos: {
    nomComplet: "BIAOU Malomon Abdou Marsouk",
    naissance: "19 février 2005",
    lieu: "Ekpè, Bénin",
    reside: "Rennes, France", // À VÉRIFIER
    nationalite: "Béninoise",
    passion:
      "Les systèmes d'information et la donnée : comprendre un besoin métier, modéliser, puis construire des outils qui aident à décider.",
    bioLongue:
      "J'ai d'abord étudié l'administration des réseaux à l'ENEAM (Cotonou) et développé en React, React Native et Laravel lors de mes stages. Aujourd'hui en L3 MIAGE à l'ISTIC, je me concentre sur la conception de systèmes d'information, les bases de données et la gestion de projet, avec l'ambition d'intégrer le Master MIAGE parcours DABI.",
    photos: ["/ma-photo.jpg"],
  },

  competences: [
    {
      // À VÉRIFIER : adapte à ce que tu vois réellement en MIAGE
      titre: "Systèmes d'information",
      icon: "Workflow",
      items: ["Analyse des besoins et conception de SI", "Modélisation (UML, Merise)", "Gestion de projet", "Méthodes agiles"],
    },
    {
      titre: "Données et bases de données",
      icon: "Database",
      items: ["Bases de données relationnelles et SQL", "Python", "Analyse et visualisation de données", "Initiation à la BI"],
    },
    {
      titre: "Développement",
      icon: "Code2",
      items: ["React.js / React Native (JS)", "Laravel/Symfony (PHP)", "Python, Java", "Tailwind/Bootstrap (CSS)", "Docker"],
    },
    {
      // À VÉRIFIER : seul Figma vient de tes stages, adapte le reste
      titre: "UI/UX Design",
      icon: "PenTool",
      items: ["Figma (design, prototypage)", "Maquettes d'interfaces web et mobile", "Parcours et expérience utilisateur", "Design system et cohérence visuelle"],
    },
    {
      titre: "Bases réseaux et systèmes",
      icon: "Server",
      items: ["Configuration Cisco et pare-feu", "Administration Linux et Windows", "Sauvegarde automatisée", "Cryptographie"],
    },
  ],

  experiences: [
    {
      id: 4,
      entreprise: "Ford High Tech",
      poste: "Stage professionnel · Développement web et mobile",
      periode: "Janvier – juin 2026", // À VÉRIFIER : remplace par tes dates exactes (ex. « Février – juillet 2026 »)
      details:
        "Stage professionnel de six mois axé sur la conception et le développement d'applications web et mobiles. Analyse des besoins des utilisateurs et mise en œuvre de solutions techniques adaptées.",
      tags: ["Applications web", "Applications mobiles", "Analyse des besoins"],
      document: "https://drive.google.com/file/d/1xZRxO2_HWGKeGngtJGCLsotLHdKmm5G-/view?usp=drive_link", // fichier à placer dans public/
    },
    {
      id: 1,
      entreprise: "UST Bénin",
      poste: "Stage académique et soutenance",
      periode: "Avril – août 2025",
      details:
        "Projet : « Conception et déploiement d'un système automatisé de sauvegarde et de restauration des configurations réseau ». Mention Très Bien. Dimensionnement et configuration d'équipements Cisco et de pare-feu.",
      tags: ["Cisco", "Sécurité", "Réseau"],
      photo: "/photo-ust.jpg",
      document: "https://drive.google.com/file/d/1zyi5fRDXnI8OceAKFrAJCJZ9uMNQaUy6/view?usp=drive_link",
    },
    {
      id: 2,
      entreprise: "Inawo Technologies",
      poste: "Stage académique · Développeur",
      periode: "Juin – septembre 2024",
      details:
        "Contribution au site web (React.js) et à l'application mobile (React Native). Prototypage et design des écrans avec Figma.",
      tags: ["React", "React Native", "Figma"],
      photo: "/photo-inawo.jpg",
      document: "https://drive.google.com/file/d/1EzBTnPtYKT2xpWvZH5o3zfGAdMeEKjFq/view?usp=drive_link",
    },
    {
      id: 3,
      entreprise: "Maelan Technology",
      poste: "Stage académique · Développeur web",
      periode: "Avril – juin 2024",
      details:
        "Refonte en équipe du site de l'ONG ADNA avec le framework Laravel, en travail collaboratif.",
      tags: ["Laravel", "PHP", "Agile"],
      photo: "/photo-maelan.jpg",
      document: "https://drive.google.com/file/d/1PAU6nnVCPsCUn-w0UvrzQxh9SYSyfp2Y/view?usp=drive_link",
    },
  ],

  formations: [
    {
      id: "miage",
      diplome: "Licence 3 MIAGE",
      option: "Méthodes informatiques appliquées à la gestion des entreprises",
      etablissement: "ISTIC, Université de Rennes, France",
      periode: "2026 – en cours", // À VÉRIFIER
      enCours: true,
      details:
        "Formation à la conception de systèmes d'information, aux bases de données et à la gestion de projet. Objectif : poursuivre en Master MIAGE, parcours DABI.",
    },
    {
      id: "licence",
      diplome: "Licence professionnelle en Informatique de Gestion",
      option: "Administration des réseaux informatiques",
      etablissement: "ENEAM, Cotonou, Bénin",
      periode: "2022 – 2025",
      photo: "/photo-diplome-Licence.jpg",
      document: "https://drive.google.com/file/d/1z9HKwu7k_YO2rvJmT9VImBLQHsNEstpp/view?usp=drive_link",
      details:
        "Formation solide en administration système et réseau. Soutenance sur l'automatisation des sauvegardes et restaurations des configurations réseau (Mention Très Bien). Gestion d'infrastructures réseau, sécurité informatique et déploiement de serveurs Linux et Windows.",
    },
    {
      id: "bac",
      diplome: "Baccalauréat, série D",
      option: "Enseignement général",
      etablissement: "Les Petites Âmes, Cotonou, Bénin",
      periode: "2021 – 2022",
      document: "https://drive.google.com/file/d/1JxaEjIVSXbQFx1hE0IjI-pZ-PLto-DeM/view?usp=drive_link",
    },
  ],

  // ====== CERTIFICATIONS ======
  certifications: [
    // ⚠️ ENTRÉE D'EXEMPLE pour voir la mise en page : remplace-la par une vraie certification
    // ou supprime-la avant de publier. Ne publie jamais une certification que tu n'as pas obtenue.
    {
      intitule: "Google Data Analytics Professional Certificate — En cours",
      organisme: "Google / Coursera",
      date: "Début octobre 2026",
      document: "https://drive.google.com/file/d/1JxaEjIVSXbQFx1hE0IjI-pZ-PLto-DeM/view?usp=drive_link",
    },
  ],

  projets: [
    {
      id: 1,
      titre: "Système d'automatisation réseau",
      description:"Développement d’un logiciel Python avec interface graphique pour automatiser la sauvegarde, la synchronisation et la restauration des configurations d’équipements réseau.",
      tech: ["Python", "Paramiko", "Netmiko"],
      liens: [
        { nom: "GitHub", url: "https://github.com/biaoumarsouk/save-config-pro", type: "github" }, // liens contenant "..." sont masqués
        { nom: "Documentation", url: "https://drive.google.com/file/d/1fDNN_gcyuI-66nu7hIuQd-Q1POy7tSsK/view?usp=drive_link", type: "drive" },
      ],
    },
    {
      id: 2,
      titre: "Application e-commerce Inawo",
      description:
        "Interface de vente en ligne avec gestion du panier et paiements sécurisés.",
      tech: ["React.js", "Tailwind CSS", "Node.js"],
      liens: [
        { nom: "Site web", url: "https://www.inawo.pro/fr/", type: "web" },
        { nom: "Application Android", url: "https://play.google.com/store/apps/details?id=com.inawo.inawombl", type: "mobile" },
        { nom: "Application iOS", url: "https://apps.apple.com/bj/app/inawo/id6798759176?l=fr-FR", type: "mobile" },
        { nom: "Maquettes Figma", url: "https://www.figma.com/design/akywKVegG7QzwuAEgKkVTt/Smartdev-ecommerce?node-id=0-1&t=ZYWkfXhtPR96K3vo-1", type: "figma" },
      ],
    },
  ],

  atouts: ["Créatif et innovant", "Résolution de problèmes", "Apprentissage rapide", "Esprit d'équipe"],

  contact: {
    email: "biaoumarsouk@gmail.com",
    telephone: "+33 7 59 85 78 47",
    localisation: "Rennes, France", // À VÉRIFIER
    linkedin: "https://bj.linkedin.com/in/marsouk-biaou-698198324",
    whatsapp: "https://wa.me/2290157775308",
    facebook: "https://www.facebook.com/share/18Dwckaxwb/?mibextid=wwXIfr",
  },

  langues: [
    { nom: "Français", niveau: "Courant" },
    { nom: "Anglais", niveau: "Intermédiaire" },
  ],
};