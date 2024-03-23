//intalizing variables
var playerText = document.getElementById('playerText');
var restartBtn = document.getElementById('restartBtn');
var boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
const O_TEXT = "O";
const X_TEXT = "X";
var curPlayer = X_TEXT;
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
var spaces = Array(9).fill(null);
//array with 9 null elements

const startGame = () =>{
    //for ecah box, we need to listen for a click
    //foreach means in each element of the array
    boxes.forEach(box => box.addEventListener("click", boxClicked));
    restartBtn.addEventListener('click', restart);

}
//the paramenter is e, or in this case, event
function boxClicked(e){
    //this is the id of the div box that is clicked by event
    const identity  = e.target.id;
    //checking if spaces ID is null, if not continue
    if(!spaces[identity]){
        //makes that array at target index the current player
        spaces[identity] = curPlayer;
        //changes the text in the game.
        e.target.innerText = curPlayer;

        if(playerHasWon() !==false){
            playerText.innerHTML = `${curPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        //flips to next player
        if(curPlayer == X_TEXT){
            curPlayer = O_TEXT;
        } else {
            curPlayer = X_TEXT;
        }
    }

    
    
}
function restart(e){
    //for the event e, there is gonna be
    //a for loop that goes through each cell and
    //sets it back to null
    spaces.fill(null);
    //console.log("working");

    //loop for array, for each box, 
    //set
    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })
    curPlayer = X_TEXT;
    playerText.innerHTML = "Tic Tac Toe";


}

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}
startGame();