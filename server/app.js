import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

// Charger les variables d'environnement depuis un fichier .env
dotenv.config();
const url = process.env.MONGO_URI; // URL de connexion MongoDB depuis les variables d'environnement

// Créer une instance du client MongoDB
const client = new MongoClient(url);

// Créer une instance de l'application Express
const app = express();
const PORT = process.env.PORT || 8080; // Port pour le serveur, soit celui défini dans les variables d'environnement, soit 8080 par défaut
app.use(express.json()); // Middleware pour parser le corps des requêtes en JSON
app.use(express.static("dist")); // Servir les fichiers statiques du dossier "dist"

async function connectToMongo() {
  try {
    await client.connect(); // Connecter le client MongoDB
    console.log("Connecté à MongoDB");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB:", err); // Gérer les erreurs de connexion
  }
}

// Route pour obtenir toutes les tâches
app.get("/api/tasks", async (req, res) => {
  try {
    const collection = client.db("todo_DB").collection("tasks"); // Sélectionner la collection "tasks"
    const tasks = await collection.find({}).toArray(); // Récupérer toutes les tâches sous forme de tableau
    res.json(tasks); // Envoyer les tâches au client en JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // Gérer les erreurs en envoyant une réponse d'erreur
  }
});

// Route pour obtenir une tâche par ID
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const collection = client.db("todo_DB").collection("tasks"); // Sélectionner la collection "tasks"
    const { id } = req.params; // Récupérer l'ID de la tâche depuis les paramètres de la requête
    const task = await collection.findOne({ _id: new ObjectId(id) }); // Trouver la tâche par ID
    if (!task) {
      res.status(404).json({ error: 'Task not found' }); // Répondre avec une erreur 404 si la tâche n'est pas trouvée
    } else {
      res.json(task); // Envoyer la tâche au client en JSON
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); // Gérer les erreurs en envoyant une réponse d'erreur
  }
});

// Route pour créer une nouvelle tâche
app.post("/api/tasks", async (req, res) => {
  try {
    const collection = client.db("todo_DB").collection("tasks"); // Sélectionner la collection "tasks"
    const task = req.body; // Récupérer la tâche depuis le corps de la requête
    await collection.insertOne(task); // Insérer la nouvelle tâche dans la collection
    res.status(201).json(task); // Répondre avec la tâche créée et un statut 201 (Créé)
  } catch (err) {
    res.status(500).json({ error: err.message }); // Gérer les erreurs en envoyant une réponse d'erreur
  }
});

// Route pour mettre à jour une tâche existante
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const collection = client.db("todo_DB").collection("tasks"); // Sélectionner la collection "tasks"
    const { id } = req.params; // Récupérer l'ID de la tâche à mettre à jour depuis les paramètres de la requête
    const task = req.body; // Récupérer les nouvelles données de la tâche depuis le corps de la requête
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: task }); // Mettre à jour la tâche dans la collection
    res.json(task); // Envoyer la tâche mise à jour au client
  } catch (err) {
    res.status(500).json({ error: err.message }); // Gérer les erreurs en envoyant une réponse d'erreur
  }
});

// Route pour supprimer une tâche
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const collection = client.db("todo_DB").collection("tasks"); // Sélectionner la collection "tasks"
    const { id } = req.params; // Récupérer l'ID de la tâche à supprimer depuis les paramètres de la requête
    const result = await collection.deleteOne({ _id: new ObjectId(id) }); // Supprimer la tâche de la collection

    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Task not found" }); // Répondre avec une erreur 404 si aucune tâche n'a été supprimée
    } else {
      res.status(204).end(); // Répondre avec un statut 204 (Pas de contenu) pour indiquer la suppression réussie
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); // Gérer les erreurs en envoyant une réponse d'erreur
  }
});

// Démarrer le serveur et connecter à MongoDB
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}\nvia http://localhost:${PORT}`);
  connectToMongo();
});
