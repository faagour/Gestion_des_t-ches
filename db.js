// Importation du module sqlite3 et activation du mode verbeux pour obtenir des messages détaillés dans la console.
const sqlite3 = require('sqlite3');

// Création d'une nouvelle base de données SQLite qui sera stockée en mémoire.
// Cela signifie que la base de données n'est pas sauvegardée sur le disque et sera perdue une fois le serveur arrêté.
let db = new sqlite3.Database(':memory:', (err) => {
  // Ce callback est appelé lors de la tentative de connexion à la base de données.
  if (err) {
    // Si une erreur se produit lors de la connexion, elle est affichée dans la console et l'exécution est arrêtée.
    return console.error(err.message);
  }
  // Si la connexion à la base de données est réussie, un message de confirmation est affiché.
  console.log('Connected to the in-memory SQlite database.');
});

// La méthode serialize s'assure que les requêtes SQL sont exécutées séquentiellement.
db.serialize(() => {
  // Création d'une nouvelle table 'tasks' avec deux colonnes : 'id' et 'task'.
  // 'id' est une clé primaire qui s'incrémente automatiquement à chaque nouvelle entrée (AUTOINCREMENT).
  // 'task' est une colonne de texte qui contiendra la description de la tâche.
  db.run("CREATE TABLE tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)");
});

// Exportation de l'objet 'db' pour qu'il puisse être utilisé dans d'autres fichiers du projet.
module.exports = db;

