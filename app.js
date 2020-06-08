// Get HTML elements
const gameContainer = document.querySelector('#game-container');
const startButton = document.querySelector('button');

// Create variables 
let gameOver = 0;
let wordsTyped = 0;
let wordArray = [];

// Start/reset game
startButton.addEventListener('click', () => {
    gameOver = 0;
    wordsTyped = 0;
    wordArray = 0;
})

// Import dictionary and create random words

// Fetch 100 words from API
// const callAPI = () => {
//     const Http = new XMLHttpRequest();
//     const url='https://random-word-api.herokuapp.com/word?number=100';
//     Http.open("GET", url);
//     Http.send();

//     Http.onreadystatechange = () => {
//     console.log(Http.responseText)
//     }
// }
// callAPI();

// let generatedWord = () => {
//     ParseInt(Math.random() * 100);
// }

// Generate random 'words'

// const letterArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// let generatedWord = (array) => {
//     return array(ParseInt(Math.random() * 26));
// }
// console.log(generatedWord(letterArray));

// Generate word array from string
let string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error saepe libero quaerat harum quas dignissimos corrupti, hic esse mollitia ipsam explicabo vitae obcaecati quisquam eum, et repellendus! Odio, facilis atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima facere quidem cupiditate expedita, neque maiores blanditiis ex porro assumenda vitae amet rerum sequi, quos ab dignissimos illum, aspernatur ducimus. Earum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa voluptates iusto quas eius, nesciunt eos labore. Placeat consequatur nihil tempore magnam, id repellat asperiores, eveniet rem architecto itaque suscipit veniam";

wordArray = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ');
console.log(wordArray);

// Animate words coming across and down - push words onto new array

// Capture player types

// // Keyboard event info: https://javascript.info/keyboard-events
// document.addEventListener('keydown', (event) => {
//     // if (event.key == 'z') {
//       console.log(event.key);
//     // }
//   });

// Handle keyboard input for mobile

// Delete words when player has typed

// Game over when word reaches bottom

// Non-MVP:
// Show player progress in word
// Words firing letters at player
// Alter difficulty (speed/word length) 
// Keep tally of words typed & wpm 

// - MUST make use of functions to neatly organise code.
// - MUST be hosted on your Github with at least 15 git commits.