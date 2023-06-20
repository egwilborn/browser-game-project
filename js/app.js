  /*----- constants -----*/
//wordBank; // currenlty consists of: const wordBank = ["advise", "allege", "beyond"]

  /*----- state variables -----*/
let guessWord; //will decide which word will be guessed by player (Form: string)
let guessStatus; // will show whether the guessed letter is in the word or not
//   True or false (true - the letter is in the word; false - the letter is not in the word; null when there is no guess yet)
let GameOutcome; //will decide whether the game is in play, player won, or player lost
//   Currently playing: null
//   Player won: 1
//   Player lost: -1
  let petals; //shows how many petals are on the flower and how many incorrect guesses the player has left
  let guessedLetter; // pulls the letter from the button that was clicked to compare to the guess word
  let playerString; //this is an array containing all the letters that have been guessed in the correct order
  let gameStatus = "start";  //shows where in the game you are values are "start" "playing" "won" or "lost"

  /*----- cached elements  -----*/
const gameStartBtn = document.getElementById("start-game");
const startOverBtn = document.getElementById("start-over");
const messageEl = document.getElementById("message");
const letterBtns = [...document.querySelectorAll("#letter-buttons > button")];
const flowerPetalEls =[...document.querySelectorAll("#flower > div")]
const guessWordEls = [...document.querySelectorAll("#guess-word > div")]
  /*----- event listeners -----*/
gameStartBtn.addEventListener("click", init)
document.getElementById("letter-buttons").addEventListener("click", handleGuess);
startOverBtn.addEventListener("click", handleRestart);
  /*----- functions -----*/
  //when the play game button is clicked, the game will be initialized
function init() {
    guessWord = wordBank[Math.floor(Math.random()*wordBank.length)];
    guessStatus = null;
    gameOutcome = null;
    gameStatus = "playing";
    petals = 8;
    guessString = new Array(guessWord.length);
    render();
}

function render() {
  renderGuessOutcome();
  renderMessage();
  renderButtons();
}

function renderMessage() {
  if (gameStatus === "playing") {
    messageEl.innerText = "";
}else if (gameStatus === "won") {
  messageEl.innerText = "Congratulats! You guessed the word!"
  messageEl.style.backgroundColor = "rgb(213, 172, 129)";
} else if (gameStatus === "lost") {
  messageEl.innerText = `Oh no! The word was ${guessWord}.`
  messageEl.style.backgroundColor = "rgb(170, 128, 209)";
} else if (gameStatus === "start") {
  messageEl.innerHTML = "<h4>Guess each letter of the word</h4> <h4>Can you keep the flower from losing its petals?</h4>"
  messageEl.style.backgroundColor = "rgb(182 230 238)"
  
}
}

function renderButtons() {
  if (gameStatus === "playing") {
    startOverBtn.style.visibility = "visible";
    gameStartBtn.style.visibility = "hidden";
  } else if (gameStatus === "won" || gameStatus === "lost") {
    startOverBtn.innerText = "Play Again?"
  } else if (gameStatus === "start") {
    startOverBtn.innerText = "Start Over"
    startOverBtn.style.visibility = "hidden";
    gameStartBtn.style.visibility = "visible";
    guessWordEls.forEach(function(el){
      el.innerText = "__";
    })
    letterBtns.forEach(function(Btn) {
      Btn.style.backgroundColor = "rgb(107, 210, 172)";
      Btn.style.textDecoration = "none";
      Btn.disabled = false;
    })
  
  }
}

function renderGuessOutcome() {
if (guessStatus === true) {
  //need to render the guessString visually
  guessString.forEach(function(letter, idx) {
    if (letter === guessedLetter.toUpperCase()) {
      guessWordEls[idx].innerText = guessedLetter.toUpperCase();
    }
  })
  //now I need to show that the correct button has been used by making any correct guess buttons pink
  const guessBtn = letterBtns.find(function(Btn) {
  return Btn.innerText === guessedLetter.toUpperCase();
})
  guessBtn.style.backgroundColor = "rgb(255 188 193)";
 
  } else if (guessStatus === false) {

    //flower div needs to lose a petal in the state variable and in the html
   flowerPetalEls[petals].remove();
   //incorrect guess buttons should be grey and the letter should be struck through
   const guessBtn = letterBtns.find(function(Btn) {
    return Btn.innerText === guessedLetter.toUpperCase();
  })
    guessBtn.style.backgroundColor = "grey";
    guessBtn.style.textDecorationLine = "line-through";
    guessBtn.disabled = true;

  } 
}




function handleGuess(evt) {
  //when a letter button is clicked, the text is pulled from the target
  guessedLetter = evt.target.innerText.toLowerCase();
  //set up guards against clicking something other than a button
  if(guessedLetter.length > 1 || guessWord === null) {
    return;
  //check to see if guessed letter is in guessed word
  } else {
    if (guessWord === undefined) {
      return;
    } else if (guessWord.includes(guessedLetter)) {
    guessStatus = true;
    const splitWord = guessWord.split("")
    splitWord.forEach(function(letter, idx) {
      if (letter === guessedLetter) {
      guessString[idx] = `${letter.toUpperCase()}`;
      }
    })
    } else {
      guessStatus = false;
      petals = petals-1;
    }
  }
  checkGameOutcome();
  render(); 
  console.log(gameStatus);
}

function checkGameOutcome() {
//checks if the game is over
if (guessString.join("").toLowerCase() === guessWord) {
 return gameStatus = "won";
} else if (petals === 0) {
 return gameStatus = "lost";
}
}

function handleRestart() {
  gameStatus = "start";
  petals = 8;
  guessWord = null;
  render();
}
//bugs
//flower does not restart
