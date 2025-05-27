# 🎮 PokéShop

Une application e-commerce moderne pour acheter des Pokémon, construite avec React, TypeScript et Mantine UI.

## 🚀 Fonctionnalités

- 📱 Interface utilisateur moderne et responsive
- 🔍 Filtrage des Pokémon par type
- 🛒 Système de panier complet
- 💳 Gestion des prix et des quantités
- 🎨 Design moderne avec Mantine UI
- 📦 Gestion d'état avec Redux Toolkit

## 🛠️ Technologies

- React 18
- TypeScript
- Redux Toolkit
- Mantine UI
- Vite
- React Router

## 📁 Structure du Projet

```
src/
├── api/          # Services et appels API
├── assets/       # Images et ressources statiques
├── components/   # Composants React réutilisables
├── constants/    # Constantes de l'application
├── hooks/        # Hooks personnalisés
├── store/        # Configuration Redux
├── styles/       # Fichiers CSS et styles
├── types/        # Types TypeScript
├── utils/        # Fonctions utilitaires
└── views/        # Pages de l'application
```

## 🚀 Installation

```bash
# Cloner le projet
git clone [URL_DU_REPO]

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## 🔑 Variables d'Environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# API Configuration
VITE_API_BASE_URL=https://pokeapi.co/api/v2
VITE_API_TIMEOUT=5000

```

> ⚠️ **Important** : Ne jamais commiter le fichier `.env` dans le repository. Assurez-vous qu'il est bien dans votre `.gitignore`.

## 🎯 Fonctionnalités Principales

- **Catalogue de Pokémon** : Affichage de tous les Pokémon disponibles
- **Filtrage** : Filtrage par type de Pokémon
- **Panier** : 
  - Ajout/Suppression de Pokémon
  - Modification des quantités
  - Calcul automatique du total
- **Interface Responsive** : Adaptation à tous les écrans

## 💻 Développement

Le projet utilise TypeScript pour un typage strict et une meilleure maintenabilité. La structure est organisée de manière modulaire pour faciliter l'évolution et la maintenance.

### Points Forts

- Typage strict avec TypeScript
- Architecture modulaire
- Composants réutilisables
- Gestion d'état centralisée
- Interface utilisateur moderne

## 📝 Licence

MIT

## 👥 Auteur

Maélys Chassin
