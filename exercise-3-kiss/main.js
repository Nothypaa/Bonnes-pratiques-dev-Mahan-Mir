const tasks = [
    { id: 1, title: 'Mettre à jour le README', completed: false },
    { id: 2, title: 'Corriger le bug du formulaire', completed: true },
    { id: 3, title: 'Revoir les PRs en attente', completed: false },
    { id: 4, title: 'Nettoyer le CSS', completed: true }
  ];
  
  const tasksListEl = document.querySelector('#tasks-list');
  const emptyStateEl = document.querySelector('#empty-state');
  
  const filterAllBtn = document.querySelector('#filter-all-btn');
  const filterActiveBtn = document.querySelector('#filter-active-btn');
  const filterCompletedBtn = document.querySelector('#filter-completed-btn');
  
  const filters = {
    all: () => tasks,
    active: () => tasks.filter(task => !task.completed),
    completed: () => tasks.filter(task => task.completed)
  };
  
  const emptyMessages = {
    all: 'Aucune tâche à afficher.',
    active: 'Aucune tâche en cours.',
    completed: 'Aucune tâche terminée.'
  };
  
  function updateTasksList(filterName) {
    const filteredTasks = filters[filterName]();
  
    tasksListEl.innerHTML = '';
  
    if (filteredTasks.length === 0) {
      emptyStateEl.textContent = emptyMessages[filterName];
      emptyStateEl.style.display = 'block';
      return;
    }
  
    emptyStateEl.style.display = 'none';
  
    filteredTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item';
      if (task.completed) li.classList.add('task-completed');
  
      const titleSpan = document.createElement('span');
      titleSpan.textContent = task.title;
  
      li.appendChild(titleSpan);
      tasksListEl.appendChild(li);
    });
  }
  
  filterAllBtn.addEventListener('click', () => updateTasksList('all'));
  filterActiveBtn.addEventListener('click', () => updateTasksList('active'));
  filterCompletedBtn.addEventListener('click', () => updateTasksList('completed'));
  
  updateTasksList('all');
  