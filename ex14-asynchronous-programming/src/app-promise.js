// Mock task data
let tasks = [
  { name: "Complete assignment", completed: false },
  { name: "Prepare presentation", completed: true },
  { name: "Write report", completed: false },
  { name: "Review project proposal", completed: true },
  { name: "Attend team meeting", completed: false },
];

// This is used to display a loading message while the tasks are being fetched
const loadingElement = document.getElementById("loading-display");

// Promise version
// TASK #2: Display "Loading tasks..."
// TASK #3: Display "Add task..."
// TASK #4: Display "Marking task as completed..."
// TASK #5: Display "Deleting task..."
function getTasks() {
  // You will need to add something here...
  loadingElement.textContent = "Loading tasks...";
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        // You will need to add something here...
        loadingElement.textContent = "";
        resolve(tasks);
      },
      Math.random() * 2000 + 1000,
    );
  });
}

function displayTasks(taskList) {
  const taskListElement = document.getElementById("task-list");
  taskListElement.innerHTML = ""; // Clear existing tasks
  taskList.forEach((task) => {
    const listItem = document.createElement("li");

    const deleteButton = document.createElement("span");
    deleteButton.textContent = "🗑️";
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      deleteButton.textContent = "🤯";
      deleteTask(taskList.indexOf(task)).then(displayTasks);
    });
    listItem.appendChild(deleteButton);

    const taskName = document.createElement("span");
    taskName.textContent = task.name;
    taskName.setAttribute("class", "task-name");

    if (task.completed) {
      taskName.classList.add("completed");
    }

    taskName.addEventListener("click", () => {
      markAsCompleted(taskList.indexOf(task)).then(displayTasks);
    });
    listItem.appendChild(taskName);

    taskListElement.appendChild(listItem);
  });
}

function addTask(task) {
  // You will need to add something here...
  loadingElement.textContent = "Adding task...";
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        // You will need to add something here...
        loadingElement.textContent = "";
        tasks.push(task);
        resolve(tasks);
      },
      Math.random() * 2000 + 1000,
    );
  });
}

function deleteTask(taskIndex) {
  // You will need to add something here...
  loadingElement.textContent = "Deleting task...";
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        // You will need to add something here...
        loadingElement.textContent = "";
        tasks.splice(taskIndex, 1);
        resolve(tasks);
      },
      Math.random() * 2000 + 1000,
    );
  });
}

function markAsCompleted(taskIndex) {
  // You will need to add something here...
  loadingElement.textContent = "Marking task as completed...";
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        // You will need to add something here...
        loadingElement.textContent = "";
        tasks[taskIndex].completed = true;
        resolve(tasks);
      },
      Math.random() * 2000 + 1000,
    );
  });
}

document.getElementById("add-task").addEventListener("click", (event) => {
  event.preventDefault();
  const input = document.getElementById("task-input");
  addTask({ name: input.value, completed: false }).then(displayTasks);
  input.value = "";
});

getTasks().then(displayTasks);
