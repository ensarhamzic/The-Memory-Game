const gameScore = document.querySelector("#gameScore"); // Game score element
let score = 0;
let isPlaying = false;

const squares = document.querySelectorAll('div[id*="square"]'); // All 9 squares

// Function that returns promise to change colors of squares one after another
function changeColor(sq) {
  sq.classList.add("right");
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      sq.classList.remove("right");
      resolve();
    }, 300);
  });
}

// Generates random number (1-9)
const randomNumber = () => Math.floor(Math.random() * 9) + 1;

// Random combination
const combination = [];

// Start game button element
const startGameButton = document.querySelector("#startGame");

// This is used to add some delay between coloring squares
function delay(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

// Keep track of guesses to know if user is doing great or he is wrong
let guess = 0;

// Player is able to click on squares in order and play
async function playerTurn() {
  // extracting number of square player clicked on
  let id = this.id;
  // If clicked on wrong square
  if (combination[guess] !== parseInt(id[id.length - 1])) {
    this.classList.add("wrong");
    setTimeout(() => {
      this.classList.remove("wrong");
    }, 200);
    isPlaying = false;
    gameScore.parentElement.classList.add("wrongColor");
    for (sq of squares) {
      sq.removeEventListener("click", playerTurn);
      sq.classList.add("wrongBorder");
    }
    document.querySelector("#wrongSound").play();
    return;
  }

  // If clicked on right square
  this.classList.add("right");
  setTimeout(() => {
    this.classList.remove("right");
  }, 200);

  // If guessed all squares in round
  if (++guess === combination.length) {
    for (sq of squares) {
      sq.removeEventListener("click", playerTurn);
    }
    gameScore.innerText = ++score;
    await delay(600);
    game(); // start next round
  }
}

// Function to reset game
function resetGame() {
  isPlaying = false;
  score = 0;
  gameScore.innerText = 0;
  gameScore.parentElement.classList.remove("wrongColor");
  combination.length = 0;
  startGameButton.classList.remove("btn-danger");
  startGameButton.classList.add("btn-success");
  startGameButton.innerText = "Start Game";
  startGameButton.removeEventListener("click", resetGame);
  startGameButton.addEventListener("click", game);
  for (sq of squares) {
    sq.removeEventListener("click", playerTurn);
    sq.classList.remove("wrongBorder");
  }
}

// Coloring all the squares in their order
async function game() {
  // Change boolean value to true
  if (!isPlaying) isPlaying = true;
  // If button is clicked first time, change its click event to reset
  if (startGameButton.classList.contains("btn-success")) {
    document.querySelector("#rightSound").play();
    startGameButton.classList.remove("btn-success");
    startGameButton.classList.add("btn-danger");
    startGameButton.innerText = "Reset Game";
    startGameButton.removeEventListener("click", game);
    startGameButton.addEventListener("click", resetGame);
    score = 0;
    gameScore.innerText = score;
    combination.length = 0;
  }
  // New number in sequence
  combination.push(randomNumber());
  // For every square in combination, color it one after another
  for (num of combination) {
    const square = document.querySelector(`#square${num}`);
    await delay(300);
    await changeColor(square);
  }
  // Reset guess counter
  guess = 0;
  // Add event listeners on all squares for player to be able to make turn
  if (isPlaying) {
    for (sq of squares) {
      sq.addEventListener("click", playerTurn);
    }
  }
}

// Button to start game
startGameButton.addEventListener("click", game);
