let burguerElements = document.getElementById("burguer-elements");

let displayed = false;

function showElements() {
  burguerElements.className = "show";
  displayed = true;
}

function hideElements() {
  burguerElements.className = "hide";
  displayed = false;
}

function pushBurguer() {
  if (displayed === false) {
    showElements();
  } else {
    hideElements();
  }
}
