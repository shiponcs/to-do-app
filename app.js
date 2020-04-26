// Define UI variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event lisntener
loadEventListener();
function loadEventListener() {
  // DOM event to load li from local storage
  document.addEventListener("DOMContentLoaded", getTasks);
  // add task event
  form.addEventListener("submit", addTask);
  // remove-task event
  taskList.addEventListener("click", removeTask);
  // cleartask even
  clearBtn.addEventListener("click", clearTask);
  // filter-fasks event
  filter.addEventListener("keyup", filterTasks);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    console.log("here");
    console.log(localStorage.getItem("tasks"));
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(task => {
    // now create the li with those data just like what we did whene a task was added
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    // creaet a link (actually the remove mark)
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

// add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("add a task");
  }

  // create li element
  const li = document.createElement("li");
  // add class
  li.className = "collection-item";
  // create text and append it to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create a link element
  const link = document.createElement("a");
  //add a class
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append to li
  li.appendChild(link);

  //append the li to ul
  taskList.appendChild(li);

  //   store in LS
  storeTaskInLocalStorage(taskInput.value);
  // clear input
  taskInput.value = "";

  e.preventDefault();
}

// remove task define function
function removeTask(e) {
  if (e.target.className === "fa fa-remove") {
    if (confirm("are your sure?")) {
      taskList.removeChild(e.target.parentNode.parentNode);

      // also remove from LS
      removeTaskFromLocalStorage(e.target.parentNode.parentNode);
    }
  }
}

// remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  let check = 1;
  tasks.forEach((task, index) => {
    if (task === taskItem.textContent && check === 1) {
      console.log(task);
      tasks.splice(index, 1);
      console.log(tasks);
      check = 0;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// define clearTask
function clearTask() {
  //   taskList.innerHTML = "";
  //faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// define filterTasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  // iterate over all children (i.e. li) and search check if matches
  taskList.childNodes.forEach(task => {
    if (task.textContent.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
