const taskInput = document.getElementById('input');
const addTaskBtn = document.getElementById('add-btn');
const taskList = document.getElementById('tasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [
];

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Read Tasks //
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const taskItem = document.createElement('div');
    taskItem.className = 'd-flex task';

    const taskContent = document.createElement('div');
    taskContent.className = 'd-flex justify-content-center align-items-center gap-2';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input ';
    checkbox.id = 'flexCheckChecked';

    const taskText = document.createElement('h3');
    taskText.textContent = `${task.title}`;

    taskContent.appendChild(checkbox);
    taskContent.appendChild(taskText);

    const buttons = document.createElement('div');
    buttons.className = 'buttons';

    const editButton = document.createElement('button');
    editButton.className = 'bg-black delet';
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editButton.addEventListener('click', () => editTask(task));
    const deleteButton = document.createElement('button');
    deleteButton.className = 'bg-black delet';
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.addEventListener('click', () => deleteTask(task));
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);

    taskItem.appendChild(taskContent);
    taskItem.appendChild(buttons);

    taskList.appendChild(taskItem);
  });
}

// Add New Task //
function addNewTask() {
  const newTaskTitle = taskInput.value.trim();
  
  if (newTaskTitle) {
    const newTask = {
      "title": newTaskTitle,
      "done": false
    };
    if (confirm("Are you sure you want to Add New task?")) {
    tasks.push(newTask);
    taskInput.value = '';
    saveTasksToLocalStorage();
    renderTasks();
  }}
}
addTaskBtn.addEventListener('click', addNewTask);

// DELET ONE TASK //
function deleteTask(task) {
  const index = tasks.indexOf(task);
  if (confirm("Are you sure you want to delete this task?")) {
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
  }
}
}



//DELET ALL TASKS //
const deletAll = document.getElementById('delet-all')
deletAll.addEventListener('click', deletAllTasks);
function deletAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    saveTasksToLocalStorage();
    renderTasks()
  }
}


// EDITE


function editTask(task) {
    const newTaskTitle = prompt("Enter the new task title:");
    if (newTaskTitle) {
      const index = tasks.findIndex((t) => t === task);
      if (index !== -1) {
        tasks[index].title = newTaskTitle;
        saveTasksToLocalStorage();
        renderTasks();
      }
    }
  }

saveTasksToLocalStorage();

renderTasks();