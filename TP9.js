// Charger les tâches au démarrage
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task === "") return;

    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    displayTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let tasks = getTasks();
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task;
        list.appendChild(li);
    });
}

function resetTasks() {
    localStorage.removeItem("tasks");
    displayTasks();
}