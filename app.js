import Game from './Game.js';

const gameContainer = document.getElementById('game-container');
const gameContainerHeight = window.innerHeight * 0.7; 

const game = new Game();

document.querySelector('button').addEventListener('click', (e) => {
    game.startGame(); 
    // e.preventDefault();
}) //unselect after clicked?

// Non-MVP:
// Words firing letters at player
// Alter difficulty (speed/word length) 
// Check that WPM score is correct
// Animate ship and make non-static laser
// Fix timer - trigger with function- it gives times in ms