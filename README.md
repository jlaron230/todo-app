# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
Todo List App
Description
Ce projet est une application de liste de tâches simple qui utilise Node.js, Express, et MongoDB pour gérer les tâches. L'application permet de créer, lire, mettre à jour et supprimer des tâches à l'aide d'une API REST.

Fonctionnalités
Créer : Ajouter de nouvelles tâches à la liste.
Lire : Afficher toutes les tâches et les détails d'une tâche spécifique.
Mettre à jour : Modifier les détails d'une tâche existante.
Supprimer : Supprimer des tâches de la liste.
Prérequis
Node.js (version 14 ou supérieure)
MongoDB (local ou cloud)
npm (installé avec Node.js)
Installation
Cloner le dépôt :

```bash
git clone <URL_DU_DEPOT>
cd <NOM_DU_REPERTOIRE>
```
Installer les dépendances :

```bash
npm install
```
Configurer les variables d'environnement :

Créez un fichier .env à la racine du projet et ajoutez les variables suivantes :

```env
MONGO_URI=<VOTRE_URI_MONGODB>
PORT=8080
Remplacez <VOTRE_URI_MONGODB> par l'URI de votre base de données MongoDB.
```
Démarrer l'application :

```bash
npm start
L'application sera disponible à l'adresse http://localhost:8080.
```
API Endpoints
GET /api/tasks : Récupère toutes les tâches.
GET /api/tasks/:id : Récupère une tâche spécifique par ID.
POST /api/tasks : Crée une nouvelle tâche.
Corps de la requête :

```json
{
  "text": "Texte de la tâche",
  "status": "pending"
}
```

PUT /api/tasks/:id : Met à jour une tâche existante par ID.
Corps de la requête :
```json
{
  "text": "Texte mis à jour"
}
```
DELETE /api/tasks/:id : Supprime une tâche par ID.
Structure du Projet
index.js : Point d'entrée de l'application, configuration du serveur Express et des routes.
package.json : Gestion des dépendances et scripts de l'application.
dist/ : Dossier pour les fichiers statiques (comme le build frontend).
Contributions
Les contributions sont les bienvenues ! Pour proposer des améliorations ou corriger des bugs, veuillez créer une pull request.

Licence
Ce projet est sous la licence MIT.

Contact
Pour toute question, veuillez contacter votre-email@example.com.

Adaptez ce README en fonction des spécificités et des besoins de votre projet. Assurez-vous d'inclure des instructions claires pour la configuration et l'exécution de l'application.