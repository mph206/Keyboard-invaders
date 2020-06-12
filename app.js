// Variables and selectors
// TODO: Move out of global scope
const gameContainer = document.getElementById('game-container');
let gameContainerHeight = window.innerHeight * 0.7;
let lossCount = 0;
let winCount = 0;
let wordArray = [];
let wordsPerMinute = 0;
let lettersTyped = '';
let sound = new Audio('./laser.wav');
let sound2 = new Audio('./laser2.wav');

// Start/reset game
document.querySelector('button').addEventListener('click', () => {
    lettersTyped = '';
    gameContainer.innerHTML = '<img id="player-ship" src="./img/player-ship.png" alt="player"><svg></svg>'; 
    gameContainer.classList.remove('move-words-down', 'end-game-container');
    wordArray = [];
    generateWordArray(string);
    wordsDown();
})

let ship = document.getElementById('player-ship');
let svgBox = document.querySelector('svg');

 
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
        wordArray.forEach(word => {
            let element = `<div><div class='space-invader-down'></div><span>${word}</span></div>`;
            let ship = document.getElementById('player-ship');
            let node = document.createElement('span');
            node.innerHTML = element;
            let parent = ship.parentNode;
            parent.insertBefore(node, ship);
        })
    }
}

// Start words moving down
let wordsDown = () => {
    gameContainer.classList.add('move-words-down');
    checkPos();
}

// Start timer for WPM calculation- need to move into function and still be able to return value
const startTime = new Date();
console.log(startTime);

// Capture player physical keyboard input
document.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        lettersTyped = lettersTyped.slice(0, -1);
    } else {
        lettersTyped += event.key;
    }   
    checkArray();
});

// Handles keyboard input in text box (required for mobile)
let input = document.querySelector('input');
inputHandler = () => {
    lettersTyped += input.value;
    checkArray();
}  
input.addEventListener('input', inputHandler);

// Delete words when player has typed
// TODO: delete words from bottom first rather than top
const checkArray = () => {
    wordArray.forEach((word, index) => {
        if (lettersTyped.includes(word) && !gameContainer.children[index].classList.contains('delete')) {
            gameContainer.children[index].classList.add('delete');
            lettersTyped = '';
            // Get position of word and fire laser function
            let wordLeftOffset = gameContainer.children[index].offsetLeft + (window.getComputedStyle(gameContainer.children[index]).getPropertyValue('width').slice(0, -2) / 2);
            let wordTopOffset = gameContainer.children[index].offsetTop;
            console.log(wordLeftOffset, wordTopOffset)
            createLaser(wordLeftOffset, wordTopOffset);
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

// Create svg line between word and laser
let createLaser = (wordX, wordY) => {
    let ship = document.getElementById('player-ship');
    shipLeftOffset = ship.offsetLeft + (window.getComputedStyle(ship).getPropertyValue('width').slice(0, -2) / 2)
    let svgBox = document.querySelector('svg');
    svgBox.innerHTML = `<line x1="${window.getComputedStyle(gameContainer).getPropertyValue('width').slice(0, -2) / 2}" y1="${ship.offsetTop}" x2="${wordX}" y2="${wordY}" style="stroke:rgb(255,0,0);stroke-width:2" />`
    let random = Math.floor(Math.random() * 2) + 1;
    if (random === 1) sound.play()
    else sound2.play();
}

// Trigger end game when word reaches bottom
const checkPosition = (toggle) => {
    if (toggle === 1) {
    for (let i = 0; i < gameContainer.children.length-2; i++) {
        if (!gameContainer.children[i].classList.contains('delete')
        // Check this is still bottom of div
        && (gameContainerHeight - gameContainer.children[i].offsetTop - 14) < 0) {
            gameOver();
        }
    }}
    console.log('check position fired');
}

// call checkPosition each 100ms
// Only call after words would reach bottom and also only when words move down a line
const checkPos = (toggle=1) => {if (toggle === 1) {setInterval(checkPosition, 1000, 1)} else return};

// End round actions 
const endRound = () => {
    // clearInterval(checkPos);
    wordArray = [];
    gameContainer.classList.remove('move-words-down');
    gameContainer.classList.add('end-game-container');
    // Why doesn't this stop the function? 
    // checkPosition(0);
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
    console.log(endTime);
    // Need to add words to the below and move to endRound
    wordsPerMinute = parseInt(endTime / 1000 / wordArray.length * 60);
    gameContainer.innerHTML = `<h2 class="end-game">game over</h2><p class="round-score">Won ${winCount} - ${lossCount} Lost</p><p class="round-score">WPM: ${wordsPerMinute}</p>`;
    endRound();
}
    
// Non-MVP:
// Words firing letters at player
// Alter difficulty (speed/word length) 
// Alter text source
// Check that WPM score is correct
// Animate aliens behind words
// Animate ship and make non-static laser
// Fix timer - trigger with function- it gives times in ms