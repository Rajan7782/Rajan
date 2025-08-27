// Toggle Login/Signup
function toggleForm() {
  const login = document.getElementById('loginForm');
  const signup = document.getElementById('signupForm');
  const title = document.getElementById('formTitle');
  const toggle = document.querySelector('.toggle');

  if (login && signup) { // Only run on index.html
    if (login.style.display === "none") {
      login.style.display = "block";
      signup.style.display = "none";
      title.innerText = "Login";
      toggle.innerText = "Don’t have an account? Signup";
    } else {
      login.style.display = "none";
      signup.style.display = "block";
      title.innerText = "Signup";
      toggle.innerText = "Already have an account? Login";
    }
  }
}

// Store user in localStorage
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      localStorage.setItem("user", JSON.stringify({ name, email, password }));
      alert("Signup successful! Please login.");
      toggleForm();
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.email === email && user.password === password) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "todo.html";
      } else {
        alert("Invalid credentials!");
      }
    });
  }

  // If on todo.html, load user & tasks
  if (document.getElementById("welcomeText")) {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser) {
      window.location.href = "index.html"; // Not logged in
    } else {
      document.getElementById("welcomeText").innerText = `Hello, ${loggedUser.name}'s To-Do List`;
      loadTasks();
    }
  }
});

// Add task
function addTask() {
  let task = document.getElementById('taskInput').value;
  if (task.trim() === "") return;

  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  let tasks = JSON.parse(localStorage.getItem("tasks_" + user.email)) || [];

  tasks.push(task);
  localStorage.setItem("tasks_" + user.email, JSON.stringify(tasks));

  document.getElementById('taskInput').value = "";
  loadTasks();
}

// Load tasks
function loadTasks() {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  let tasks = JSON.parse(localStorage.getItem("tasks_" + user.email)) || [];
  let taskList = document.getElementById("taskList");

  if (taskList) {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      let li = document.createElement("li");
      li.innerHTML = `${task} <span onclick="removeTask(${index})">❌</span>`;
      taskList.appendChild(li);
    });
  }
}

// Remove task
function removeTask(index) {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  let tasks = JSON.parse(localStorage.getItem("tasks_" + user.email)) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks_" + user.email, JSON.stringify(tasks));
  loadTasks();
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
