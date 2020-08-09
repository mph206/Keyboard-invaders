// import Words from './Words'

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
        this.ship = document.getElementById('player-ship');
        this.svgBox = document.querySelector('svg');
    }

    startGame() {
        // e.preventDefault(); // check that this stops space from hitting button
        this.newRound();
        this.physicalKeyboardListener();
        this.softKeyboardListener();
    }

    newRound() {
        this.gameContainer.classList.remove('end-game-container', 'move-words-down');
        this.gameContainer.innerHTML = '<img id="player-ship" src="./img/player-ship.png" alt="player"><svg></svg>'; 
        generateWordArray(string);
        wordsDown();
        this.lettersTyped = '';
        this.wordArray = [];
        this.startTime = new Date();
        this.deletedWords = 0;
    }

    physicalKeyboardListener() {
        document.addEventListener('keydown', (event) => {
            event.key === 'Backspace' ? this.lettersTyped = this.lettersTyped.slice(0, -1) : this.lettersTyped += event.key;
            this.checkArray(); // O: Check array for what? Otherwise this bit's v nice
        });
    }

    softKeyboardListener() {
    document.querySelector('input').addEventListener('input', () => { 
            lettersTyped += input.value;
            this.checkArray();
        });
    }

    // Delete words when player has typed
    // TODO: delete words from bottom first rather than top
    checkArray() {
        wordArray.forEach((word, index) => {
            if (lettersTyped.includes(word) && !this.gameContainer.children[index].classList.contains('delete')) {
                this.gameContainer.children[index].classList.add('delete');
                this.lettersTyped = '';
                // Get position of word and fire laser function
                const wordLeftOffset = this.gameContainer.children[index].offsetLeft + (window.getComputedStyle(this.gameContainer.children[index]).getPropertyValue('width').slice(0, -2) / 2);
                const wordTopOffset = gameContainer.children[index].offsetTop; 
                this.createLaser(wordLeftOffset, wordTopOffset);
                this.checkWordsDeleted();
            } 
        })
    }

    // Compares words with class of deleted against length of array; if equals triggers roundWin
    checkWordsDeleted() {
        for (let i = 0; i < this.gameContainer.children.length; i++) {
            if (this.gameContainer.children[i].classList.contains('delete')) {
                this.deletedWords += 1;
            }
        }
        if (this.wordArray.length === this.deletedWords) {
            this.roundWin();
        }
    }

    // Create svg line between word and laser
    createLaser(wordX, wordY) {
        shipLeftOffset = this.ship.offsetLeft + (window.getComputedStyle(this.ship).getPropertyValue('width').slice(0, -2) / 2)
        this.svgBox.innerHTML = `<line x1="${window.getComputedStyle(this.gameContainer).getPropertyValue('width').slice(0, -2) / 2}" y1="${this.ship.offsetTop}" x2="${wordX}" y2="${wordY}" style="stroke:rgb(255,0,0);stroke-width:2" />`
        const random = Math.floor(Math.random() * 2) + 1;
        if (random === 1) {
            sound.play();
        } else {
            sound2.play();
        }
    }

    // Trigger end game when word reaches bottom
    checkPosition() {
        for (let i = 0; i < gameContainer.children.length-2; i++) {
            if (!gameContainer.children[i].classList.contains('delete')
            // Check this is still bottom of div
            && (gameContainerHeight - gameContainer.children[i].offsetTop - 14) < 0) { // O: For long if expressions, refactor the logic into a small "checkDistanceFromTop()" function and run in the brackets
                gameOver();
            }
        }
        console.log('check position fired');
    }

    // // Only call after words would reach bottom and also only when words move down a line
    // checkPos(toggle=1) {
    //     toggle === 1 ? setInterval(checkPosition, 1000, 1) : null;
    // } 

    endRound() {
        gameContainer.classList.remove('move-words-down');
        gameContainer.classList.add('end-game-container');
        

    }

    // Show round win screen
    roundWin() {
        const endTime = new Date() - this.startTime;
        this.wordsPerMinute = parseInt(this.deletedWords / (endTime / 1000 / 60));
        this.winCount += 1;   
        this.gameContainer.innerHTML = `<h2 class="end-game">round won</h2><p class="round-score">Won ${this.winCount} - ${this.lossCount} Lost</p><p class="round-score">WPM: ${this.wordsPerMinute}</p>`;
        endRound();
    }


    gameOver() {
        this.lossCount += 1;
        const endTime = new Date() - startTime;
        // Need to add words to the below and move to endRound
        wordsPerMinute = parseInt(deletedWords / (endTime / 1000 / 60));
        gameContainer.innerHTML = `<h2 class="end-game">game over</h2><p class="round-score">Won ${winCount} - ${lossCount} Lost</p><p class="round-score">WPM: ${wordsPerMinute}</p>`;
        endRound();
    }

}