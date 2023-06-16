  /*----- constants -----*/
//wordBank; // currenlty consists of: const wordBank = ["advise", "allege", "beyond"]

  /*----- state variables -----*/
let guessWord; //will decide which word will be guessed by player (Form: string)
let letterGuess; // will decide whether the guessed letter is in the word or not
//   True or false (true - the letter is in the word; false - the letter is not in the word; null when there is no guess yet)
let GameOutcome; //will decide whether the game is in play, player won, or player lost
//   Currently playing: null
//   Player won: 1
//   Player lost: -1
  let petals; //shows how many petals are on the flower and how many incorrect guesses the player has left

  /*----- cached elements  -----*/
const gameStartBtn = document.getElementById("start-game");
const startOverBtn = document.getElementById("start-over")
const message = document.getElementById("message");
  /*----- event listeners -----*/
gameStartBtn.addEventListener("click", init)

  /*----- functions -----*/
function init() {
    guessWord = wordBank[Math.floor(Math.random()*wordBank.length)];
    letterGuess = null;
    gameOutcome = null;
    petals = 8;
    render();
}

function render() {
    renderMessage();
    renderButtons();
    renderLetters();
    renderGuessOutcome();
}
function renderMessage() {
    message.innerText = "";
}

function renderButtons() {
    startOverBtn.style.visibility = "visible";
    gameStartBtn.style.visibility = "hidden";
}

function renderLetters() {

}
function renderGuessOutcome() {

}
