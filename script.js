const SIZE = 9;
const MINES = 10;
const newGameBtn =
document.getElementById("new-game");
let revealedCount = 0;
let flagsPlaced = 0;
let timer = 0;
let timerInterval;
let gameOver = false;

let boardData = [];
const board = document.getElementById("board");

function createBoard() {

    board.innerHTML = "";

    boardData = [];

    for(let row = 0; row < SIZE; row++) {

        let currentRow = [];

        for(let col = 0; col < SIZE; col++) {

            currentRow.push({
                mine: false,
                revealed: false,
                flagged: false,
                count: 0
            });

            const cell = document.createElement("button");

            cell.classList.add("cell");

            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", revealCell);
            cell.addEventListener("contextmenu", toggleFlag);
            

            board.appendChild(cell);
        }

        boardData.push(currentRow);
    }

    console.log(boardData);
}


function placeMines(){

    let minesPlaced = 0;

    while(minesPlaced < MINES){

        const row = Math.floor(Math.random() * SIZE);

        const col = Math.floor(Math.random() * SIZE);

        if(!boardData[row][col].mine){

            boardData[row][col].mine = true;

            minesPlaced++;
        }
    }
}

console.log(boardData);
function calculateCounts() {

    for(let row = 0; row < SIZE; row++) {

        for(let col = 0; col < SIZE; col++) {

            if(boardData[row][col].mine) {
                continue;
            }

            let count = 0;

            for(let dr = -1; dr <= 1; dr++) {

                for(let dc = -1; dc <= 1; dc++) {

                    let newRow = row + dr;
                    let newCol = col + dc;

                    if(
                        newRow >= 0 &&
                        newRow < SIZE &&
                        newCol >= 0 &&
                        newCol < SIZE
                    ) {

                        if(boardData[newRow][newCol].mine) {
                            count++;
                        }

                    }

                }

            }

            boardData[row][col].count = count;

        }

    }

}
function revealNeighbours(row, col) {

    for(let dr = -1; dr <= 1; dr++) {

        for(let dc = -1; dc <= 1; dc++) {

            let newRow = row + dr;
            let newCol = col + dc;

            if(
                newRow < 0 ||
                newRow >= SIZE ||
                newCol < 0 ||
                newCol >= SIZE
            ){
                continue;
            }

            const neighbour = boardData[newRow][newCol];

            if(neighbour.revealed){
                continue;
            }

            revealPosition(newRow, newCol);

        }

    }

}
function revealPosition(row, col){

    const cellData = boardData[row][col];

    if(cellData.revealed){
        return;
    }

    cellData.revealed = true;
    revealedCount++;
    if(
    revealedCount === (SIZE * SIZE) - MINES
    && !gameOver
){
    gameOver = true;

    clearInterval(timerInterval);

    alert("🎉 You Win!");
}
    const button = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
    );

    button.classList.add("revealed");

    if(cellData.mine){

        button.textContent = "💣";
        return;
    }

    if(cellData.count > 0){

        button.textContent = cellData.count;

        return;
    }

    revealNeighbours(row, col);

}
function revealCell(event){
    if(gameOver){
    return;
}

    const row = Number(event.target.dataset.row);

    const col = Number(event.target.dataset.col);

    const cellData = boardData[row][col];

    if(cellData.mine){
        gameOver = true;
       revealAllMines();
       clearInterval(timerInterval);

alert("Game Over!");

return;
    }

    revealPosition(row, col);
    

}



function checkWin(){

    let revealedCells = 0;

    for(let row = 0; row < SIZE; row++){

        for(let col = 0; col < SIZE; col++){

            if(boardData[row][col].revealed){
                revealedCells++;
            }

        }

    }

    const totalSafeCells = (SIZE * SIZE) - MINES;

    if(revealedCells === totalSafeCells){

        clearInterval(timerInterval);
        gameOver = true;
        alert("You Win!");

    }

}

function toggleFlag(event){
if(gameOver){
    return;
}
    event.preventDefault();

    const row = Number(event.target.dataset.row);
    const col = Number(event.target.dataset.col);

    const cellData = boardData[row][col];

    if(cellData.revealed){
        return;
    }

    cellData.flagged = !cellData.flagged;

    if(cellData.flagged){
        event.target.textContent = "🚩";
        flagsPlaced++;
    }
    else{
        event.target.textContent = "";
    }

}
function revealAllMines(){

    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {

        const row = Number(cell.dataset.row);
        const col = Number(cell.dataset.col);

        if(boardData[row][col].mine){
            cell.textContent = "💣";
        }

    });

}
function startTimer(){

    clearInterval(timerInterval);

    timer = 0;

    timerInterval = setInterval(() => {

        timer++;

        document.getElementById("timer").textContent = timer;

    },1000);

}
function newGame(){
    console.log("newGame running");

    board.innerHTML = "";

    boardData = [];
    revealedCount = 0;
    flagsPlaced = 0;
    gameOver = false;


    createBoard();
    console.log(boardData);
    placeMines();
    calculateCounts();

    startTimer();
}
newGame();
newGameBtn.addEventListener(
    "click",
    newGame
);
