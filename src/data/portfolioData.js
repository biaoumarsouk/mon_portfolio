// src/data/portfolioData.js
// Les lignes marquées "À VÉRIFIER" sont des suppositions de ma part : corrige-les.

export const portfolioData = {
  profil: {
    prenom: "Marsouk",
    nom: "BIAOU",
    titre: "Étudiant en L3 MIAGE · Systèmes d'information & data",
    statut: "L3 MIAGE — ISTIC, Université de Rennes",
    accroche: "Je conçois des systèmes d'information qui aident les organisations à décider avec leurs données.",
    description:
      "Étudiant en L3 MIAGE à l'ISTIC, je me forme à la conception de systèmes d'information, aux bases de données et à la gestion de projet. Mon objectif : poursuivre en Master MIAGE, parcours DABI. Mon passé en réseaux et en développement web me donne une vraie compréhension technique de ce que je modélise.",
    cvLink: "/cv-marsouk.pdf", // fichier à placer dans public/
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
      items: ["React.js / React Native", "Laravel (PHP)", "Python, Java, C++", "Tailwind CSS"],
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

  projets: [
    {
      id: 1,
      titre: "Système d'automatisation réseau",
      description:
        "Script Python qui sauvegarde automatiquement les configurations de switches Cisco et envoie un rapport par email.",
      tech: ["Python", "Paramiko", "Netmiko"],
      liens: [
        { nom: "GitHub", url: "https://github.com/...", type: "github" }, // liens contenant "..." sont masqués
        { nom: "Documentation", url: "https://drive.google.com/...", type: "drive" },
      ],
    },
    {
      id: 2,
      titre: "Application e-commerce Inawo",
      description:
        "Interface de vente en ligne avec gestion du panier et paiements sécurisés.",
      tech: ["React.js", "Tailwind CSS", "Node.js"],
      liens: [
        { nom: "Site web", url: "https://inawo.com", type: "web" },
        { nom: "Code source", url: "https://github.com/...", type: "github" },
      ],
    },
  ],

  atouts: ["Créatif et innovant", "Résolution de problèmes", "Apprentissage rapide", "Esprit d'équipe"],

  contact: {
    email: "biaoumarsouk@gmail.com",
    telephone: "+229 01 57 77 53 08",
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