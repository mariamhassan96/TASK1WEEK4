
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();


addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if(taskText !== '') {
    tasks.push(taskText);
    updateLocalStorage();
    renderTasks();
    taskInput.value = '';
  }
});


function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
}


function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteTask(index);

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
  taskCount.textContent = tasks.length;
}
