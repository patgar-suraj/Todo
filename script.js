function openPages() {
  let elems = document.querySelectorAll(".elem");
  let fullElem = document.querySelectorAll(".fullElem");
  let fullElemBackBtn = document.querySelectorAll(".fullElem .backBtn");

  elems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElem[elem.id].style.display = "block";
    });
  });

  fullElemBackBtn.forEach(function (backBtn, id) {
    backBtn.addEventListener("click", function () {
      fullElem[id].style.display = "none";
    });
  });
}
openPages();

// ////////////////////////////////////////////////////////////
// create & show & save todo list
function createTodo() {
  let form = document.querySelector(".todo-create-show form");
  let title = document.querySelector(".todo-create-show #createTitle");
  let description = document.querySelector(
    ".todo-create-show #todoDescription"
  );
  let checkBox = document.querySelector(".todo-create-show #checkbox");
  let showTodo = document.querySelector(".showTodo");

  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("currentTask is empty");
  }

  function renderTodo() {
    // create todo function...................................................
    let sum = "";
    currentTask.forEach(function (elem, id) {
      let readMarkStyle = elem.isCompleted ? "block" : "none";
      let contentTextStyle = elem.isCompleted ? "line-through" : "none";
      // Add textDecorationColor inline if completed, else not
      let contentTextColorStyle = elem.isCompleted
        ? "text-decoration-color: red;"
        : "";
      sum += `<div class="todoContent">
                        <div class="content">
                            <div class="todoContentTools">
                                <div class="impTask ${elem.impTask}">
                                    Imp
                                </div>
                                <div class="outerMark" data-id="${id}">
                                    <div class="innerMark">
                                        <div data-id="${id}" class="readMark" style="display: ${readMarkStyle}; pointer-events: auto;"></div>
                                    </div>
                                </div>
                                <div class="deleteTodo">
                                    <div id="${id}" class="deleteBtn">🗑️</div>
                                </div>
                            </div>

                            <div class="contentText" data-id="${id}" style="text-decoration: ${contentTextStyle}; ${contentTextColorStyle}">
                                <h2>${elem.title}
                                </h2>
                                <hr>
                                <h3>${elem.description}
                                </h3>
                            </div>
                        </div>
                    </div>`;
    });
    showTodo.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    // delete todo function...........................................................
    document.querySelectorAll(".deleteBtn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTodo();
      });
    });

    // Make outerMark toggle readMark (show/hide) and update isCompleted
    let outerMarks = document.querySelectorAll(".outerMark");

    outerMarks.forEach(function (outerMark) {
      outerMark.addEventListener("click", function (e) {
        // If clicking the readMark, let its own handler handle it
        if (e.target.classList.contains("readMark")) return;
        if (e.target.classList.contains("contentText")) return;
        let idx = parseInt(outerMark.getAttribute("data-id"), 10);
        if (isNaN(idx) || idx < 0 || idx >= currentTask.length) return;
        // Toggle isCompleted
        currentTask[idx].isCompleted = !currentTask[idx].isCompleted;

        // Update display
        let readMark = outerMark.querySelector(".readMark");
        // Find the corresponding contentText in the DOM
        let contentText = outerMark
          .closest(".content")
          .querySelector(".contentText");
        if (readMark) {
          readMark.style.display = currentTask[idx].isCompleted
            ? "block"
            : "none";
        }
        if (contentText) {
          contentText.style.textDecoration = currentTask[idx].isCompleted
            ? "line-through"
            : "none";
          contentText.style.textDecorationColor = currentTask[idx].isCompleted
            ? "red"
            : "none";
        }
        // Save to localStorage
        localStorage.setItem("currentTask", JSON.stringify(currentTask));
      });
    });

    // Make clicking readMark also hide it and update isCompleted
    let readMarks = document.querySelectorAll(".readMark");
    readMarks.forEach(function (read) {
      read.addEventListener("click", function (e) {
        let idx = parseInt(read.getAttribute("data-id"), 10);
        if (isNaN(idx) || idx < 0 || idx >= currentTask.length) return;
        // If already hidden, do nothing
        if (!currentTask[idx].isCompleted) return;
        // Hide the readMark and update isCompleted
        currentTask[idx].isCompleted = false;
        read.style.display = "none";
        // Also update contentText line-through
        // Find the corresponding contentText in the DOM
        let contentText = read
          .closest(".content")
          .querySelector(".contentText");
        if (contentText) {
          contentText.style.textDecoration = "none";
          contentText.style.textDecorationColor = "none";
        }
        localStorage.setItem("currentTask", JSON.stringify(currentTask));
        // Prevent bubbling to outerMark
        e.stopPropagation();
      });
    });
  }
  renderTodo();

  // add todo to current task ...........................................................
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (title.value.length > 0 || description.value.length > 0) {
      currentTask.push({
        title: title.value,
        description: description.value,
        impTask: checkBox.checked,
        isCompleted: false, // Ensure new todos are not completed by default
      });
    } else {
      alert("Title or Description is required to create a Todo");
    }

    title.value = "";
    description.value = "";
    checkBox.checked = false;
    renderTodo();
  });
}
createTodo();
// localStorage.clear()
// ............................................................................
// open or close createTodo page
let openTodoPage = document.querySelector(".todo-create-show .addTodoBtn");
let createTodoPage = document.querySelector(
  ".todo-create-show .createTodoPage"
);
let togglePage = false;

openTodoPage.addEventListener("click", function () {
  if (!togglePage) {
    createTodoPage.style.display = "flex";
    togglePage = true;
  } else {
    createTodoPage.style.display = "none";
    togglePage = false;
  }
});
