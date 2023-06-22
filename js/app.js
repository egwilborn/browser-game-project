/*----- constants -----*/
//wordBank is in word-array.js

/*----- state variables -----*/
let guessWord; //will decide which word will be picked by the computer (form: string)
let isLetterInWord; // will show whether the guessed letter is in the word or not
//Can be True or false (true - the letter is in the word; false - the letter is not in the word; null when there is no guess yet)
let petals; //shows how many petals are on the flower and how many incorrect guesses the player has left
let guessedLetter; // pulls the letter from the button that was clicked to compare to the guess word
let guessArray; //this is an array containing all the letters that have been guessed in the correct order
let gameStatus; //shows where in the game you are values are "start" "playing" "won" or "lost"

/*----- cached elements  -----*/
const gameStartBtn = document.getElementById("start-game");
const startOverBtn = document.getElementById("start-over");
const messageEl = document.getElementById("message");
const letterBtns = [...document.querySelectorAll("#letter-buttons > button")];
const flowerPetalEls = [...document.querySelectorAll("#flower > div")];
const guessWordEls = [...document.querySelectorAll("#guess-word > div")];
/*----- event listeners -----*/
gameStartBtn.addEventListener("click", init);
document
  .getElementById("letter-buttons")
  .addEventListener("click", handleGuess);
startOverBtn.addEventListener("click", handleRestart);
/*----- functions -----*/
//when the play game button is clicked, the game will be initialized
function init() {
  guessWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  isLetterInWord = null;
  gameStatus = "playing";
  petals = 8;
  guessArray = new Array(guessWord.length);
  render();
}
function render() {
  renderGuessOutcome();
  renderMessage();
  renderButtons();
}
//changes message based on game status and updates flower on restart
function renderMessage() {
  if (gameStatus === "playing") {
    messageEl.innerText = "";
  } else if (gameStatus === "won") {
    messageEl.innerHTML = "<h4>Congrats!</h4><h4>You guessed the word!</h4>";
  } else if (gameStatus === "lost") {
    messageEl.innerHTML = `<h4>Oh no! The word was ${guessWord}.</h4>`;
  } else if (gameStatus === "start") {
    messageEl.innerHTML =
      "<h4>Guess each letter of the word.</h4> <h4>Can you keep the flower from losing its petals?</h4>";
    flowerPetalEls.forEach(function (petalEl, idx) {
      petalEl.classList.remove("animate-forward"); //removes animation
      petalEl.classList.remove("opacity-transition"); //removes smooth opacity change
      petalEl.style.opacity = "1";
    });
  }
}

function renderButtons() {
  //only allows start over button to be visible while playing
  if (gameStatus === "playing") {
    startOverBtn.style.visibility = "visible";
    gameStartBtn.style.visibility = "hidden";
    //changes start over to play again? and disables letter buttons when the game is finished
  } else if (gameStatus === "won" || gameStatus === "lost") {
    startOverBtn.innerText = "Play Again?";
    letterBtns.forEach(function (Btn) {
      Btn.disabled = true;
    });
    //changes buttons back to "start screen" along with guess boxes
  } else if (gameStatus === "start") {
    startOverBtn.innerText = "Start Over";
    startOverBtn.style.visibility = "hidden";
    gameStartBtn.style.visibility = "visible";
    guessWordEls.forEach(function (el) {
      el.innerText = "  ";
    });
    //letter buttons are rendered to original styling and functionality
    letterBtns.forEach(function (Btn) {
      Btn.style.backgroundColor = "rgb(52, 200, 173)";
      Btn.style.textDecoration = "none";
      Btn.disabled = false;
    });
  }
}

function renderGuessOutcome() {
  if (isLetterInWord === true) {
    //need to render the guessArray visually
    guessArray.forEach(function (letter, idx) {
      if (letter === guessedLetter.toUpperCase()) {
        guessWordEls[idx].innerText = guessedLetter.toUpperCase();
      }
    });
    //now I need to show that the correct button has been used by making any correct guess buttons pink
    const guessBtn = letterBtns.find(function (Btn) {
      return Btn.innerText === guessedLetter.toUpperCase();
    });
    guessBtn.style.backgroundColor = "rgb(255 188 193)";
  } else if (isLetterInWord === false) {
    //flower div needs to lose a petal in the state variable and in the html
    flowerPetalEls[petals].classList.add("opacity-transition"); //added class makes petal disappear smoothly
    flowerPetalEls[petals].classList.add("animate-forward"); //added class makes petal fall in time with disappearing
    flowerPetalEls[petals].style.opacity = "0";
    //incorrect guess buttons should be grey and the letter should be struck through.
    const guessBtn = letterBtns.find(function (Btn) {
      return Btn.innerText === guessedLetter.toUpperCase();
    });
    guessBtn.style.backgroundColor = "grey";
    guessBtn.style.textDecorationLine = "line-through";
    guessBtn.disabled = true; //without this, you lose a petal any time an incorrect letter is clicked, even if you'd already clicked it
  }
}

function handleGuess(evt) {
  //when a letter button is clicked, the text is pulled from the target
  guessedLetter = evt.target.innerText.toLowerCase();
  //set up guards against clicking something other than a button
  if (guessedLetter.length > 1 || guessWord === null) {
    return;
    //check to see if guessed letter is in guessed word
  } else {
    if (guessWord === undefined) {
      return;
    } else if (guessWord.includes(guessedLetter)) {
      isLetterInWord = true;
      const splitWord = guessWord.split("");
      splitWord.forEach(function (letter, idx) {
        if (letter === guessedLetter) {
          guessArray[idx] = `${letter.toUpperCase()}`;
        }
      });
    } else {
      isLetterInWord = false;
      petals = petals - 1;
    }
  }
  checkGameStatus();
  render();
}

function checkGameStatus() {
  //checks if the game is over
  if (guessArray.join("").toLowerCase() === guessWord) {
    return (gameStatus = "won");
  } else if (petals === 0) {
    return (gameStatus = "lost");
  }
}
//sets necessary state variables back to original status
function handleRestart() {
  gameStatus = "start";
  petals = 8;
  guessWord = null;
  isLetterInWord = null;
  render();
}
