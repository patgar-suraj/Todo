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

// create todo list
let form = document.querySelector(".todo-create-show form");
let title = document.querySelector(".todo-create-show #createTitle");
let descrption = document.querySelector(".todo-create-show #todoDescription");
let checkBox = document.querySelector(".todo-create-show #checkbox");

let currentTask = [];

function renderTodo() {
  let showTodo = document.querySelector(".showTodo");
  let sum = "";
  currentTask.forEach(function (elem) {
    sum += `<div class="todoContent">
                        <div class="content">
                            <div class="todoContentTools">
                                <div class="impTask ${elem.impTask}">
                                    Imp
                                </div>
                                <div class="outerMark">
                                    <div class="innerMark">
                                        <div class="readMark"></div>
                                    </div>
                                </div>
                                <div class="deleteTodo">
                                    <div class="deleteBtn">🗑️</div>
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
}
renderTodo();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  currentTask.push({
    title: title.value,
    descrption: descrption.value,
    impTask: checkBox.checked,
  });

  title.value = "";
  descrption.value = "";
  checkBox.checked = false;
  renderTodo();
});
