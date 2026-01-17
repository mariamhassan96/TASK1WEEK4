// جلب العناصر
const taskInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const mobileAddBtn = document.getElementById('mobile-add-btn');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');

// جلب البيانات من LocalStorage أو مصفوفة فارغة
let tasks = JSON.parse(localStorage.getItem('todo_tasks')) || [];

// وظيفة رسم القائمة
function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const item = document.createElement('div');
        item.className = 'todo-item';
        item.innerHTML = `
            <span>${task}</span>
            <div class="delete-icon" onclick="removeTask(${index})">✕</div>
        `;
        todoList.appendChild(item);
    });
    taskCount.innerText = tasks.length;
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
}

// وظيفة الإضافة
function addNewTask() {
    const value = taskInput.value.trim();
    if (value) {
        tasks.push(value);
        taskInput.value = '';
        renderTasks();
    }
}

// وظيفة الحذف (Splice)
function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// التنقل بين الصفحات
const homeLink = document.getElementById('home-link');
const aboutLink = document.getElementById('about-link');
const homePage = document.getElementById('home-page');
const aboutPage = document.getElementById('about-page');

homeLink.onclick = () => {
    homePage.classList.remove('hidden');
    aboutPage.classList.add('hidden');
    homeLink.classList.add('active');
    aboutLink.classList.remove('active');
};

aboutLink.onclick = () => {
    aboutPage.classList.remove('hidden');
    homePage.classList.add('hidden');
    aboutLink.classList.add('active');
    homeLink.classList.remove('active');
};

// تشغيل الأزرار
addBtn.onclick = addNewTask;
mobileAddBtn.onclick = addNewTask;
taskInput.onkeypress = (e) => { if(e.key === 'Enter') addNewTask(); };

// العرض الأولي
renderTasks();