const board =  document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = "X";
let gameState = ["","","","","","","","",""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  //  row
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  //  column
    [0, 4, 8], [2, 4, 6]              // Diagonal 
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if(gameState[clickedCellIndex] !== "" || !gameActive) return;

    updateCell(clickedCell, clickedCellIndex);
    checkResult();

}

function updateCell(cell, index){
    gameState[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function checkResult(){
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++){
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] ==="") continue;
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]){
            roundWon = true;
            [a,b,c].forEach(index => {
                cells[index].classList.add('winner');
            });
            break;
        }
    }
    
    if (roundWon){
        statusText.innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;

       
        return;
    }

    if (!gameState.includes("")){
        statusText.innerText = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer ==="X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

function restartGame(){
    currentPlayer = "X";
    gameState = ["","","","","","","","",""];
    gameActive = true;
    statusText.innerText = "Player X's Turn";
    cells.forEach(cell => {
    cell.innerText = "";
    cell.classList.remove('x','o',);
});
}

cells.forEach(cell=> cell.addEventListener('click',handleCellClick));
restartBtn.addEventListener('click',restartGame);

