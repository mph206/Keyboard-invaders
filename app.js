// Variables and selectors
// Move out of global scope
const gameContainer = document.querySelector('#game-container');
let gameContainerHeight = window.innerHeight * 0.7;
let lossCount = 0;
let winCount = 0;
let wordArray = [];
let wordsPerMinute = 0;
let lettersTyped = '';

// Start/reset game
document.querySelector('button').addEventListener('click', () => {
    lettersTyped = '';
    gameContainer.innerHTML = '';
    gameContainer.classList.remove('move-words-down', 'end-game-container');
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
let string = "No one would have believed in the last years of the nineteenth century that"
//  this world was being watched keenly and closely by intelligences greater than man's and yet as mortal as his own.";

const generateWordArray = (string) => {
    if (wordArray.length < 1) {
        wordArray = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ');
        wordArray.forEach(word => {
            gameContainer.innerHTML += `<span>${word}</span>`;
        })
    }
}

// Start words moving down
let wordsDown = () => {
    setTimeout(() => {
        gameContainer.classList.add('move-words-down');
        checkPos();
    }, 100)
}

// Start timer - need to move into function and still be able to return value
const startTime = new Date();

// Capture player physical keyboard input
document.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        lettersTyped = lettersTyped.slice(0, -1);
    } else {
        lettersTyped += event.key;
    }   
    checkArray();
  });

// Handle keyboard input for mobile
// lettersTyped.push(document.querySelector('input').value);
// console.log(lettersTyped);

// Delete words when player has typed
// TO FIX: does all words at once, need to change to just the one nearest end of array
const checkArray = () => {
    wordArray.forEach((word, index) => {
        if (lettersTyped.includes(word)) {
            // gameContainer.children[wordArray.indexOf(word)].classList.add('delete');
            gameContainer.children[index].classList.add('delete');
            checkWordsDeleted();
        }
    })
}

// Compares words with class of deleted against length of array; if equals triggers roundWin
const checkWordsDeleted = () => {
    let deletedWords = 0;
    for (let i = 0; i < gameContainer.children.length; i++) {
        if (gameContainer.children[i].classList.contains('delete')) {
            deletedWords += 1;
        }
    }
    if (wordArray.length === deletedWords) {
        roundWin();
    }
}

// Trigger end game when word reaches bottom
const checkPosition = (toggle) => {
    if (toggle === 1) {
    for (let i = 0; i < gameContainer.children.length; i++) {
        console.log(gameContainerHeight)
        console.log(gameContainer.children[i].offsetTop);
        console.log(gameContainerHeight - gameContainer.children[i].offsetTop);

        if (!gameContainer.children[i].classList.contains('delete')
        && (gameContainerHeight - gameContainer.children[i].offsetTop + 18) < 1) {
            gameOver();
        }
    }} else return;
    console.log('fired');
}

// call checkPosition each 100ms
// Only call after words would reach bottom and also only when words move down a line
const checkPos = (toggle=1) => {if (toggle === 1) {setInterval(checkPosition, 300, 1)} else return};

// End round actions 
const endRound = () => {
    // clearInterval(checkPos);
    wordArray = [];
    gameContainer.classList.remove('move-words-down');
    gameContainer.classList.add('end-game-container');
    // Why doesn't this stop the function? 
    checkPosition(0);
}

// Show round win screen
const roundWin = () => {
    let endTime = new Date() - startTime;
    wordsPerMinute = parseInt(endTime / 1000 / wordArray.length * 60);
    winCount += 1;   
    gameContainer.innerHTML = `<h2 class="end-game">round won</h2><p class="round-score">Won ${winCount} - ${lossCount} Lost</p><p class="round-score">WPM: ${wordsPerMinute}</p>`;
    endRound();
}

// Show game over screen 
const gameOver = () => {
    lossCount += 1;
    let endTime = new Date() - startTime;
    // Need to add words to the below and move to endRound
    wordsPerMinute = parseInt(endTime / 1000 / wordArray.length * 60);
    gameContainer.innerHTML = `<h2 class="end-game">game over</h2><p class="round-score">Won ${winCount} - ${lossCount} Lost</p><p class="round-score">WPM: ${wordsPerMinute}</p>`;
    endRound();
}
    
// Non-MVP:
// Fix span detection at bottom of parent container
// Show player progress in word
// Words firing letters at player
// Alter difficulty (speed/word length) 
// Alter text source
// Check that WPM score is correct
// Animate aliens behind words


