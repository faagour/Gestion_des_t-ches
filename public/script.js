// Définition de la fonction fetchTasks
function fetchTasks() {
  // Envoie une requête GET à l'URL '/tasks' pour obtenir les tâches
  fetch('/tasks')
    .then(response => response.json()) // Convertit la réponse en JSON
    .then(data => {
      const taskList = document.getElementById('taskList'); // Sélectionne la liste des tâches dans le DOM
      taskList.innerHTML = ''; // Vide la liste actuelle pour éviter les doublons
      // Itère sur chaque tâche reçue dans la réponse
      data.data.forEach(task => {
        const li = document.createElement('li'); // Crée un nouvel élément de liste pour chaque tâche
        li.textContent = task.task; // Définit le texte de l'élément de liste comme la tâche
        taskList.appendChild(li); // Ajoute l'élément de liste à la liste des tâches dans le DOM
      });
    });
}

// Définition de la fonction addTask
function addTask() {
  const taskInput = document.getElementById('taskInput'); // Sélectionne l'élément d'entrée pour les nouvelles tâches
  const task = taskInput.value; // Récupère la valeur saisie par l'utilisateur
  // Envoie une requête POST à l'URL '/task' pour créer une nouvelle tâche
  fetch('/task', {
    method: 'POST', // Définit la méthode de la requête sur POST
    headers: {
      'Content-Type': 'application/json', // Indique que le corps de la requête est au format JSON
    },
    body: JSON.stringify({ task }), // Convertit l'objet de la tâche en chaîne JSON pour l'envoi
  })
  .then(response => response.json()) // Convertit la réponse reçue en JSON
  .then(data => {
    console.log(data); // Affiche la réponse dans la console (utile pour le débogage)
    fetchTasks(); // Appelle fetchTasks pour mettre à jour la liste des tâches
    taskInput.value = ''; // Efface le champ de saisie après l'ajout de la tâche
  });
}

// Un gestionnaire d'événements qui se déclenche lorsque la fenêtre a terminé de charger
window.onload = () => {
  fetchTasks(); // Appelle fetchTasks pour charger les tâches au démarrage de l'application
};
