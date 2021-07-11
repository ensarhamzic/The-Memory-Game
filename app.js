function changeColor() {
  this.style.backgroundColor = "blue";
  setTimeout(() => {
    this.style.backgroundColor = "white";
  }, 200);
}

const randomNumber = () => Math.floor(Math.random() * 9) + 1;

function startGame() {}

const gameScore = document.querySelector("#gameScore"); // Game score element
const squares = document.querySelectorAll('div[id*="square"]'); // All 9 squares
const startGameButton = document.querySelector("#startGame"); // Button to start game
startGameButton.addEventListener("click", startGame);
