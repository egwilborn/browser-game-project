  /*----- constants -----*/
//wordBank; // currenlty consists of: const wordBank = ["advise", "allege", "beyond"]

  /*----- state variables -----*/
let guessWord; //will decide which word will be guessed by player (Form: string)
let letterGuess; // will show whether the guessed letter is in the word or not
//   True or false (true - the letter is in the word; false - the letter is not in the word; null when there is no guess yet)
let GameOutcome; //will decide whether the game is in play, player won, or player lost
//   Currently playing: null
//   Player won: 1
//   Player lost: -1
  let petals; //shows how many petals are on the flower and how many incorrect guesses the player has left

  let gameStatus = "start";  //shows where in the game you are values are "start" "playing" or "finished"

  /*----- cached elements  -----*/
const gameStartBtn = document.getElementById("start-game");
const startOverBtn = document.getElementById("start-over");
const messageEl = document.getElementById("message");
const letterBtns = document.querySelectorAll("#letter-buttons > button");
const flowerPetalEls =[...document.querySelectorAll("#flower > div")]
const guessWordEls = [...document.querySelectorAll("#guess-word > div")]
  /*----- event listeners -----*/
gameStartBtn.addEventListener("click", init)
document.getElementById("letter-buttons").addEventListener("click", handleGuess);// ??? maybe need to just use variable

  /*----- functions -----*/
  //when the play game button is clicked, the game will be initialized
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
    renderGuessOutcome();
}
function renderMessage() {
    messageEl.innerText = "";
}

function renderButtons() {
    startOverBtn.style.visibility = "visible";
    gameStartBtn.style.visibility = "hidden";
}

function renderGuessOutcome() {
if (letterGuess === true) {
  //need to check where in the word the letter lies
  const splitWord = guessWord.split("")
  splitWord.forEach(function(letter) {
    if (letter === guess) {
      
    }
  })
  } else if (letterGuess === false) {
    //flower div needs to lose a petal in the state variable and in the html
   flowerPetalEls[petals].remove();
  } else {
    return;
  }
}


function handleGuess(evt) {
  //when a letter button is clicked, the text is pulled from the target
  let guessedLetter = evt.target.innerText.toLowerCase();
  //set up guards against clicking something other than a button
  if(guessedLetter.length > 1) {
    return;
  //check to see if guessed letter is in guessed word
  } else {
    if (guessWord === undefined) {
      return;
    } else if (guessWord.includes(guessedLetter)) {
    letterGuess = true;
    } else {
      letterGuess = false;
      petals = petals-1;
    }

  }
  checkGameOutcome();
  render();
}
function checkGameOutcome() {

}


//questions to answer
//showed letterGuess be a boolean or should it instead be the letter that was guessed and all conditionals are just compared to guessword?
//current plan for rendering true guess - split guess word and operate over it to check if each letter is the same as the guess letter. if it is, print the index, if not, don't do anything
//with the index, update the corresponding place in the guess word divs with the guess letter text
//do we need a game status state variable for the message and the button rendering???