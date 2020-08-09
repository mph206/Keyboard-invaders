export default class Words {
    constructor() {
        this.defaultString = "No one would have believed in the last years of the nineteenth century that this world was being watched keenly and closely by intelligences greater than man's and yet as mortal as his own."
    }
        // Generate random 'words'
    // const letterArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    // let generatedWord = (array) => {
    //     return array(ParseInt(Math.random() * 26));
    // }
    // console.log(generatedWord(letterArray));

    // Generate word array from string
    // http://www.gutenberg.org/files/36/36-h/36-h.htm
    // Check for words with funny apostrophe (check when sourcing text)


    generateWordArray(string) {
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
    } // O: This function does two jobs - generates the array and puts the content on the page. You could have it as two functions - the first generates the array (as the function describes) and the second renders it to the page. You could also use a map rather than forEach to produce the html into a variable, and add it onto the page in one go.


    // Start words moving down
    wordsDown() {
        gameContainer.classList.add('move-words-down');
        checkPos(); // O: checkPosition -> Always use full descriptive words for function/variable names
    }
}