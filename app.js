// Variables and selectors
const gameContainer = document.querySelector('#game-container');
let gameContainerHeight = window.innerHeight*0.7;
let gameOver = 0;
let wordsTyped = 0;
let wordArray = [];
let score = 0;


// Start/reset game
document.querySelector('button').addEventListener('click', () => {
    gameContainer.innerHTML = '';
    gameContainer.classList.remove('game-over-container');
    gameOver = 0;
    wordsTyped = 0;
    wordArray = [];
    generateWordArray(string);
    wordsDown();
})

// Generate random 'words'
// const letterArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// let generatedWord = (array) => {
//     return array(ParseInt(Math.random() * 26));
// }
// console.log(generatedWord(letterArray));

// Generate word array from string
// http://www.gutenberg.org/files/36/36-h/36-h.htm
// Check for words with funny apostrophe (check when sourcing text)
let string = "No one would have believed in the last years of the nineteenth century that this world was being watched keenly and closely by intelligences greater than man's and yet as mortal as his own.";

const generateWordArray = (string) => {
    if (wordArray.length < 1) {
        wordArray = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ');
        console.log(wordArray)
        wordArray.forEach(word => {
            gameContainer.innerHTML += `<span>${word}</span>`;
        })
        console.log(gameContainer);
    }
}

// Start words moving down
const wordsDown = () => {
    setTimeout(() => {
        for (let i = 0; i < gameContainer.children.length; i++) {
            gameContainer.children[i].classList.remove('left-to-right');
            gameContainer.children[i].classList.add('left-to-right');
        }
        gameContainer.classList.add('padding-grow');
        checkPos();
    }, 1500)
}

// Capture player physical keyboard input
let lettersTyped = '';
document.addEventListener('keydown', (event) => {
    lettersTyped += event.key;
    checkArray();
  });

// Handle keyboard input for mobile
// lettersTyped.push(document.querySelector('input').value);
// console.log(lettersTyped);

// Delete words when player has typed
// TO FIX: Doesn't take repeated words
const checkArray = () => {
    wordArray.forEach((word) => {
        if (lettersTyped.includes(word, lettersTyped.length-20)) {
            gameContainer.children[wordArray.indexOf(word)].classList.add('delete');
        }
    })
}

// Trigger end game when word reaches bottom - checks if any words 
const checkPosition = () => {
if (gameOver == 0 && score == 0) {
    for (let i = 0; i < gameContainer.children.length; i++) {
        if (gameContainer.children[i].classList.contains('delete') === false
        && (gameContainerHeight - gameContainer.children[i].offsetTop - 48) < 1) {
            endGame();
        }
    console.log('fired');
}}}

// call checkPosition each 100ms
const checkPos = () => setInterval(checkPosition, 100);

// Show end game screen 
const endGame = () => {
    clearInterval(checkPos);
    gameOver = 1;
    gameContainer.classList.remove('padding-grow');
    gameContainer.classList.add('game-over-container');
    gameContainer.innerHTML = '<h2 class="game-over">game over</h2>';
}
    
// Non-MVP:
// Show player progress in word
// Words firing letters at player
// Alter difficulty (speed/word length) 
// Alter text source
// Keep tally of words typed & wpm 

// - MUST be hosted on your Github with at least 15 git commits.