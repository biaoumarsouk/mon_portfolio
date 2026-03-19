import { Server, Code2, ShieldCheck, GraduationCap, Briefcase, Zap, Globe, Award } from 'lucide-react';

export const portfolioData = {
  profil: {
    prenom: "Marsouk",
    nom: "BIAOU",
    titre: "Administrateur Réseaux & Développeur Fullstack",
    description: "Titulaire d’une Licence en Informatique de Gestion. Passionné par la conception, l’administration et la sécurisation des systèmes d’information.",
    cvLink: "cv-marsouk.pdf", // Remplace par le nom de ton fichier PDF dans le dossier public/
  },

  aPropos: {
    nomComplet: "BIAOU Malomon Abdou Marsouk", 
    naissance: "19 Février 2005", // À modifier
    lieu: "Ekpè, Bénin",
    nationalite: "Béninoise",
    passion: "Conception, administration et sécurisation des systèmes d’information.",
    bioLongue: "Titulaire d’une Licence en Informatique de Gestion à l'ENEAM, je me spécialise dans l'administration des réseaux. Mon parcours hybride me permet de comprendre aussi bien les infrastructures physiques que le développement d'applications modernes avec React et Laravel.",
    photos: ["/ma-photo.jpg"] // Place ta photo dans le dossier public/ sous ce nom
  },

  competences: [
    { 
      titre: "Administration Réseau", 
      icon: "Server", 
      items: ["Configuration switches & routeurs", "Pare-feu (Firewalls)", "Infrastructures sécurisées", "Téléphonie IP"] 
    },
    { 
      titre: "Développement", 
      icon: "Code2", 
      items: ["React.js / React Native", "Laravel (PHP)", "Python, Java, C++", "Figma (Design/Prototypage)"] 
    },
    { 
      titre: "Sécurité & Systèmes", 
      icon: "ShieldCheck", 
      items: ["Cryptographie", "Admin Linux & Windows", "Sauvegarde automatisée", "Maintenance informatique"] 
    }
  ],

  experiences: [
    {
      id: 1,
      entreprise: "UST Bénin",
      poste: "Stage Académique - Soutenance",
      periode: "Avril 2025 – Août 2025",
      details: "Réalisation du projet : 'Conception et déploiement d’un système automatisé de sauvegarde et de restauration des configurations réseau'. Mention Très Bien. Redimensionnement et configuration d'équipements Cisco et pare-feu.",
      tags: ["Cisco", "Sécurité", "Réseau"]
    },
    {
      id: 2,
      entreprise: "Inawo Technologies",
      poste: "Stage Académique - Développeur",
      periode: "Juin 2024 – Septembre 2024",
      details: "Contribution au développement du site web (React.js) et de l'application mobile (React Native). Utilisation de Figma pour le prototypage et le design d’applications.",
      tags: ["React", "React Native", "Figma"]
    },
    {
      id: 3,
      entreprise: "Maelan Technology",
      poste: "Stage Académique - Développeur Web",
      periode: "Avril 2024 – Juin 2024",
      details: "Réalisation en équipe de la refonte du site de l’ONG ADNA. Utilisation du framework Laravel, travail collaboratif et mutualisation des efforts.",
      tags: ["Laravel", "PHP", "Agile"]
    }
  ],

  formations: [
    {
      diplome: "Licence Professionnelle en Informatique de Gestion",
      option: "Administration des Réseaux Informatiques",
      etablissement: "ENEAM, Cotonou, Bénin",
      periode: "2022 - 2025"
    },
    {
      diplome: "Baccalauréat, série D",
      option: "Enseignement Général",
      etablissement: "Les Petites Âmes, Cotonou, Bénin",
      periode: "2021 - 2022"
    }
  ],

  atouts: ["Créatif et innovant", "Solutionneur de problèmes", "Apprentissage rapide", "Esprit d'équipe"],
  
  langues: [
    { nom: "Français", niveau: "Courant" },
    { nom: "Anglais", niveau: "Intermédiaire" }
  ]
};