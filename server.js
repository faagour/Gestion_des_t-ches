const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// API pour lister toutes les tâches
app.get('/tasks', (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
      "message":"success",
      "data":rows
    })
  });
});

// API pour ajouter une nouvelle tâche
app.post('/task', (req, res) => {
  const task = req.body.task;
  db.run(`INSERT INTO tasks (task) VALUES (?)`, [task], function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "id": this.lastID
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Supprimer une tâche par ID
app.delete('/task/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM tasks WHERE id = ?`, id, function(err) {
      if (err) {
        res.status(400).json({"error": err.message});
        return;
      }
      res.json({"message": "deleted", rows: this.changes});
    });
  });