const SIZE = 9;
const MINES = 10;

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
createBoard();
placeMines();
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
function revealCell(event) {

    const row = Number(event.target.dataset.row);
    const col = Number(event.target.dataset.col);

    const cellData = boardData[row][col];

    if(cellData.revealed){
        return;
    }

    cellData.revealed = true;

    event.target.classList.add("revealed");

    if(cellData.mine){

        event.target.textContent = "💣";

        alert("Game Over!");

        return;
    }

    if(cellData.count > 0){

        event.target.textContent = cellData.count;

    }

}
createBoard();
placeMines();
calculateCounts();
console.log(boardData[0][0]);
