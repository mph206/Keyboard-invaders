import Words from './Words'

export default class Game {
    constructor() {
        this.gameContainer = document.getElementById('game-container');
        this.gameContainerHeight = window.innerHeight * 0.7; 
        this.lossCount = 0;
        this.winCount = 0;
        this.wordArray = [];
        this.wordsPerMinute = 0;
        this.lettersTyped = '';
        const sound = new Audio('./laser.wav'); 
        const sound2 = new Audio('./laser2.wav'); 
        this.endTime = 0;
        this.ship = document.getElementById('player-ship');
        this.svgBox = document.querySelector('svg');
    }

    startGame() {
        e.preventDefault(); // check that this stops space from hitting button
        gameContainer.classList.remove('end-game-container', 'move-words-down');
        lettersTyped = '';
        gameContainer.innerHTML = '<img id="player-ship" src="./img/player-ship.png" alt="player"><svg></svg>'; 
        wordArray = [];
        startTime = new Date();
        console.log(startTime);
        generateWordArray(string);
        wordsDown();
    }


    // Capture player physical keyboard input
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace') {
            lettersTyped = lettersTyped.slice(0, -1);
        } else {
            lettersTyped += event.key;
        }   
        checkArray(); // O: Check array for what? Otherwise this bit's v nice
    });

    // Handles keyboard input in text box (required for mobile)
    const input = document.querySelector('input'); 
    const inputHandler = () => { 
        lettersTyped += input.value;
        checkArray();
    }  
    input.addEventListener('input', inputHandler);
    // O: Try to follow one pattern, either the named callback or anonymous (in the above event listeners). Could also refactor these events to both use the same function

    // Delete words when player has typed
    // TODO: delete words from bottom first rather than top
    const checkArray = () => {
        wordArray.forEach((word, index) => {
            if (lettersTyped.includes(word) && !gameContainer.children[index].classList.contains('delete')) {
                gameContainer.children[index].classList.add('delete');
                lettersTyped = '';
                // Get position of word and fire laser function
                const wordLeftOffset = gameContainer.children[index].offsetLeft + (window.getComputedStyle(gameContainer.children[index]).getPropertyValue('width').slice(0, -2) / 2);
                const wordTopOffset = gameContainer.children[index].offsetTop; 
                createLaser(wordLeftOffset, wordTopOffset);
                checkWordsDeleted();
            } 
        })
    }

    // Compares words with class of deleted against length of array; if equals triggers roundWin
    let deletedWords = 0; // O: is this being used anywhere other than in the function? If not remove. 
    const checkWordsDeleted = () => {
        deletedWords = 0;
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
    const createLaser = (wordX, wordY) => {
        let ship = document.getElementById('player-ship');
        shipLeftOffset = ship.offsetLeft + (window.getComputedStyle(ship).getPropertyValue('width').slice(0, -2) / 2)
        let svgBox = document.querySelector('svg');
        svgBox.innerHTML = `<line x1="${window.getComputedStyle(gameContainer).getPropertyValue('width').slice(0, -2) / 2}" y1="${ship.offsetTop}" x2="${wordX}" y2="${wordY}" style="stroke:rgb(255,0,0);stroke-width:2" />`
        let random = Math.floor(Math.random() * 2) + 1;
        if (random === 1) {
            sound.play();
        } else {
            sound2.play();
        }
    }

    // Trigger end game when word reaches bottom
    const checkPosition = (toggle) => {
        if (toggle === 1) {
        for (let i = 0; i < gameContainer.children.length-2; i++) {
            if (!gameContainer.children[i].classList.contains('delete')
            // Check this is still bottom of div
            && (gameContainerHeight - gameContainer.children[i].offsetTop - 14) < 0) { // O: For long if expressions, refactor the logic into a small "checkDistanceFromTop()" function and run in the brackets
                gameOver();
            }
        }}
        console.log('check position fired');
    }

    // call checkPosition each 100ms
    // Only call after words would reach bottom and also only when words move down a line
    const checkPos = (toggle=1) => toggle === 1 ? setInterval(checkPosition, 1000, 1) : null;

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
        endTime = new Date() - startTime;
        wordsPerMinute = parseInt(deletedWords / (endTime / 1000 / 60));
        winCount += 1;   
        gameContainer.innerHTML = `<h2 class="end-game">round won</h2><p class="round-score">Won ${winCount} - ${lossCount} Lost</p><p class="round-score">WPM: ${wordsPerMinute}</p>`;
        endRound();
    }


    gameOver() {
        this.lossCount += 1;
        const endTime = new Date() - startTime;
        console.log(endTime);
        // Need to add words to the below and move to endRound
        wordsPerMinute = parseInt(deletedWords / (endTime / 1000 / 60));
        gameContainer.innerHTML = `<h2 class="end-game">game over</h2><p class="round-score">Won ${winCount} - ${lossCount} Lost</p><p class="round-score">WPM: ${wordsPerMinute}</p>`;
        endRound();
    }

}