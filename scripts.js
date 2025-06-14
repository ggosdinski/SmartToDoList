// Arreglo de tareas
let tasks = [];

// Elementos del DOM
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Agregar tarea
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = "";
  renderTasks();
}

// Eliminar tarea con filter
/* function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
} */


/* function deleteTask(id) {
  countdownAndDelete(3, id); // Esto se ve en la consola
}
 */

function deleteTask(id) {
  Swal.fire({
    title: 'Are you sure you want to delete this task?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      tasks = tasks.filter(task => task.id !== id);
      renderTasks();

      Swal.fire({
        title: 'Deleted!',
        text: 'Your task has been deleted.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}


// Renderizar tareas con forEach

/* function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");

    // Texto de la tarea
    const taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.textContent = task.text;

    // Contenedor de botones
    const actions = document.createElement("div");
    actions.className = "task-actions";

    // Botón de completar
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.completed ? "✅" : "⏳";
    toggleBtn.onclick = () => toggleTask(task.id);

    // Botón de eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => deleteTask(task.id);

    // Ensamblar
    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskSpan);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
} */


function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.completed ? "✅" : "⏳";
    toggleBtn.className = "toggle-btn";
    toggleBtn.onclick = () => toggleTask(task.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(span);
    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Marcar tarea como completada usando map (opcional)
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// Evento al botón
addTaskBtn.addEventListener("click", addTask);

// Permitir agregar tarea con Enter
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function countdownAndDelete(seconds, taskId) {
  if (seconds === 0) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
  } else {
    console.log(`Deleting in ${seconds}...`);
    setTimeout(() => {
      countdownAndDelete(seconds - 1, taskId);
    }, 1000);
  }
}
