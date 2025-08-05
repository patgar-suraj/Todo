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
openPages()
// ////////////////////////////////////////////////////////////

