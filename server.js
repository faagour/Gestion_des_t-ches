// Importation des modules nécessaires
const express = require('express'); // Framework web pour Node.js
const bodyParser = require('body-parser'); // Middleware pour analyser le corps des requêtes entrantes
const db = require('./db'); // Module de la base de données personnalisé

// Initialisation de l'application Express
const app = express();
const PORT = 30000; // Port sur lequel le serveur écoutera

// Configuration des middlewares
app.use(express.static('public')); // Sert les fichiers statiques depuis le dossier 'public'
app.use(bodyParser.json()); // Analyse le corps des requêtes en tant que JSON

// Route GET pour lister toutes les tâches
app.get('/tasks', (req, res) => {
  // Interroge la base de données pour obtenir toutes les tâches
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      // En cas d'erreur, envoie un code de statut HTTP 400 avec le message d'erreur
      res.status(400).json({"error":err.message});
      return;
    }
    // Si aucune erreur, envoie les données récupérées avec un message de réussite
    res.json({
      "message":"success",
      "data":rows
    });
  });
});

// Route POST pour ajouter une nouvelle tâche
app.post('/task', (req, res) => {
  const task = req.body.task; // Extrait la tâche du corps de la requête
  // Insère la nouvelle tâche dans la base de données
  db.run(`INSERT INTO tasks (task) VALUES (?)`, [task], function(err) {
    if (err) {
      // En cas d'erreur, envoie un code de statut HTTP 400 avec le message d'erreur
      res.status(400).json({"error": err.message});
      return;
    }
    // Si l'insertion réussit, envoie l'ID de la tâche nouvellement ajoutée avec un message de réussite
    res.json({
      "message": "success",
      "id": this.lastID
    });
  });
});

// Démarre le serveur sur le port spécifié et affiche un message dans la console
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
// Route DELETE pour supprimer une tâche par son ID
app.delete('/task/:id', (req, res) => {
    const id = req.params.id; // Extrait l'ID de la tâche des paramètres de l'URL
    // Exécute la requête SQL pour supprimer la tâche correspondant à l'ID fourni
    db.run (`DELETE FROM tasks WHERE id = ?`, id, function(err) {
      if (err) {
        // En cas d'erreur, envoie un code de statut HTTP 400 avec le message d'erreur
        res.status(400).json({"error": err.message});
        return;
      }
      // Si la suppression réuss
*/