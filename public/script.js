function fetchTasks() {
    fetch('/tasks')
      .then(response => response.json())
      .then(data => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        data.data.forEach(task => {
          const li = document.createElement('li');
          li.textContent = task.task;
          taskList.appendChild(li);
        });
      });
  }
  
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value;
    fetch('/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      fetchTasks(); // Recharger la liste après ajout
      taskInput.value = ''; // Effacer le champ de saisie
    });
  }
  
  window.onload = () => {
    fetchTasks(); // Charger les tâches au chargement de la page
  };