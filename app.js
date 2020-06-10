// Variables and selectors
const gameContainer = document.querySelector('#game-container');
let gameContainerHeight = window.innerHeight*0.7;
let lossCount = 0;
let winCount = 0;
let wordsTyped = 0;
let wordArray = [];
let wordsPerMinute = 0;


// Start/reset game
document.querySelector('button').addEventListener('click', () => {
    clearInterval(checkPos);
    gameContainer.classList.remove('move-words-down', 'game-over-container');
    gameContainer.innerHTML = '';
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
        gameContainer.classList.add('move-words-down');
        checkPos();
    }, 100)
}

// Capture player physical keyboard input
let lettersTyped = '';
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
deletedWords = 0;
const checkArray = () => {
    wordArray.forEach((word, index) => {
        if (lettersTyped.includes(word, lettersTyped.length-20)) {
            // gameContainer.children[wordArray.indexOf(word)].classList.add('delete');
            gameContainer.children[index].classList.add('delete');
            deletedWords += 1;
            checkWordsDeleted();
        }
    })
}

// Trigger win screen if win condition is met 
const checkWordsDeleted = () => {
    if (wordArray.length === deletedWords) {
        console.log('win');
        roundWin();
    }
    console.log(`${deletedWords} of ${wordArray.length}`);
}

// Trigger end game when word reaches bottom
// Check if if statment is needed 
// Could create new array with the destroyed words - make sure it checks from end to start
const checkPosition = () => {
    for (let i = 0; i < gameContainer.children.length; i++) {
        if (!gameContainer.children[i].classList.contains('delete')
        && (gameContainerHeight - gameContainer.children[i].offsetTop - 48) < 0) {
            gameOver();
        }
    console.log('fired');
}}

// call checkPosition each 100ms
// Only call after words would reach bottom and also only when words move down a line
const checkPos = () => setInterval(checkPosition, 300);

// End round actions 
const endRound = () => {
    clearInterval(checkPos);
    gameContainer.classList.remove('move-words-down');
    gameContainer.classList.add('end-game-container');
}

// Show round win screen
const roundWin = (deletedWords) => {
    endRound();
    winCount += 1;   
    gameContainer.innerHTML = '<h2 class="end-game">round won</h2>';
}

// Show game over screen 
const gameOver = () => {
    endRound();
    lossCount += 1;
    gameContainer.innerHTML = 
        `<h2 class="end-game">game over</h2><p class="round-score">Won ${winCount} - ${lossCount} Lost</p><p class="round-score">WPM: ${wordsPerMinute}</p>`;
}
    
// Non-MVP:
// Show player progress in word
// Words firing letters at player
// Alter difficulty (speed/word length) 
// Alter text source
// Keep tally of words typed & wpm 
// Animate aliens behind words

// - MUST be hosted on your Github with at least 15 git commits.