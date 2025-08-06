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

      readMarkStyle = elem.isCompleted ? "block" : "none"
      sum += `<div class="todoContent">
                        <div class="content">
                            <div class="todoContentTools">
                                <div class="impTask ${elem.impTask}">
                                    Imp
                                </div>
                                <div class="outerMark">
                                    <div class="innerMark">
                                        <div id="${id}" class="readMark" style="display: ${readMarkStyle};"></div>
                                    </div>
                                </div>
                                <div class="deleteTodo">
                                    <div id="${id}" class="deleteBtn">🗑️</div>
                                </div>
                            </div>

                            <div class="contentText">
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

    // delete todo functio...........................................................
    document.querySelectorAll(".deleteBtn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTodo();
      });
    });

    // read mark........................................................................
    let readMark = document.querySelectorAll(".readMark");

    readMark.forEach(function (read) {
      read.addEventListener("click", function () {
        currentTask[read.id].isCompleted = !currentTask[read.id].isCompleted

        if(currentTask[read.id].isCompleted) {
          read.style.display = "block"
        }else {
          read.style.display = "none"
        }

        localStorage.setItem("currentTask", JSON.stringify(currentTask));
      });
    });
  }
  renderTodo();

  // add todo to current task ...........................................................
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    currentTask.push({
      title: title.value,
      description: description.value,
      impTask: checkBox.checked,
    });

    title.value = "";
    description.value = "";
    checkBox.checked = false;
    renderTodo();
  });
}
createTodo();
// localStorage.clear()

// ............................................................................
