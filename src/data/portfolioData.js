// src/data/portfolioData.js
// Les lignes marquées "À VÉRIFIER" sont des suppositions de ma part : corrige-les.

export const portfolioData = {
  profil: {
    prenom: "Marsouk",
    nom: "BIAOU",
    titre: "Étudiant en L3 MIAGE · Réseaux & développement",
    statut: "L3 MIAGE — ISTIC, Université de Rennes",
    accroche: "Je relie l'infrastructure réseau et les applications qui tournent dessus.",
    description:
      "Titulaire d'une Licence en Informatique de Gestion (ENEAM), j'approfondis aujourd'hui les systèmes d'information en L3 MIAGE à l'ISTIC. Je viens de l'administration réseau et je développe des applications web et mobiles.",
    cvLink: "/cv-marsouk.pdf", // fichier à placer dans public/
  },

  aPropos: {
    nomComplet: "BIAOU Malomon Abdou Marsouk",
    naissance: "19 février 2005",
    lieu: "Ekpè, Bénin",
    reside: "Rennes, France", // À VÉRIFIER
    nationalite: "Béninoise",
    passion:
      "Concevoir des systèmes d'information fiables, de l'infrastructure réseau jusqu'à l'application, en gardant le besoin métier au centre.",
    bioLongue:
      "J'ai commencé par l'administration des réseaux à l'ENEAM (Cotonou), avec un projet de sauvegarde automatisée des configurations Cisco noté Très Bien. J'ai aussi développé en React, React Native et Laravel pendant mes stages. Je poursuis en L3 MIAGE à l'ISTIC pour ajouter la conception de systèmes d'information et la gestion de projet à ce socle technique.",
    photos: ["/ma-photo.jpg"],
  },

  competences: [
    {
      titre: "Administration réseau",
      icon: "Server",
      items: ["Configuration de switches et routeurs", "Pare-feu", "Infrastructures sécurisées", "Téléphonie IP"],
    },
    {
      titre: "Développement",
      icon: "Code2",
      items: ["React.js / React Native", "Laravel (PHP)", "Python, Java, C++", "Figma (design, prototypage)"],
    },
    {
      titre: "Sécurité et systèmes",
      icon: "ShieldCheck",
      items: ["Cryptographie", "Administration Linux et Windows", "Sauvegarde automatisée", "Maintenance informatique"],
    },
    {
      // À VÉRIFIER : adapte à ce que tu vois réellement en MIAGE
      titre: "Systèmes d'information",
      icon: "Workflow",
      items: ["Analyse et conception de SI", "Bases de données", "Gestion de projet", "Méthodes agiles"],
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