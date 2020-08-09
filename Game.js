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
        this.defaultString = "No one would have believed in the last years of the nineteenth century that this world was being watched keenly and closely by intelligences greater than man's and yet as mortal as his own."
    }

    startGame() {
        this.newRound();
        this.physicalKeyboardListener();
        this.softKeyboardListener();
    }

    newRound() {
        this.gameContainer.classList.remove('end-game-container', 'move-words-down');
        this.gameContainer.innerHTML = '<img id="player-ship" src="./img/player-ship.png" alt="player"><svg></svg>'; 
        this.generateWordArray(this.defaultString);
        this.wordsDown();
        this.lettersTyped = '';
        this.wordArray = [];
        this.startTime = new Date();
        this.deletedWords = 0;
    }

    generateWordArray(string) {
        const wordArray = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ');
        const wordsHTML = wordArray.map(word => {
            return `<div><div class='space-invader-down'></div><span>${word}</span></div>`;
        }).join('')
        let node = document.createElement('section');
        node.innerHTML = wordsHTML
        this.printWordsToPage(node);
    } 

    printWordsToPage(node) {
        this.gameContainer.insertBefore(node, this.ship);
    }

    wordsDown() {
        this.gameContainer.classList.add('move-words-down');
        setInterval(this.checkPosition, 1000);
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
            if (this.lettersTyped.includes(word) && !this.gameContainer.children[index].classList.contains('delete')) {
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
            this.endRound('lost');
        }
    }

    createLaser(wordX, wordY) {
        const shipLeftOffset = this.ship.offsetLeft + (window.getComputedStyle(this.ship).getPropertyValue('width').slice(0, -2) / 2);
        this.svgBox.innerHTML = `<line x1="${window.getComputedStyle(this.gameContainer).getPropertyValue('width').slice(0, -2) / 2}" y1="${ship.offsetTop}" x2="${wordX}" y2="${wordY}" style="stroke:rgb(255,0,0);stroke-width:2" />`;
        const random = Math.floor(Math.random() * 2) + 1;
        if (random === 1) {
            sound.play();
        } else {
            sound2.play();
        }
    }

    // Trigger end game when word reaches bottom
    // // Only call after words would reach bottom and also only when words move down a line
    checkPosition() {
        const checkPositionFromTop = () => (this.gameContainerHeight - this.gameContainer.children[i].offsetTop - 14) < 0;
        for (let i = 0; i < this.gameContainer.children.length-2; i++) {
            if (!this.gameContainer.children[i].classList.contains('delete') && checkPositionFromTop) {
                endRound('won');
            }
        }
        console.log('check position fired');
    }

    endRound(outcome) {
        gameContainer.classList.remove('move-words-down');
        gameContainer.classList.add('end-game-container');
        const endTime = new Date() - this.startTime;
        this.wordsPerMinute = parseInt(this.deletedWords / (endTime / 1000 / 60));
        outcome === 'won' ? this.winCount += 1 : this.lossCount += 1;
        this.gameContainer.innerHTML = `<h2 class="end-game">round ${outcome}</h2><p class="round-score">Won ${this.winCount} - ${this.lossCount} Lost</p><p class="round-score">WPM: ${this.wordsPerMinute}</p>`;
    }
}