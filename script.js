const board = document.getElementById("board");

function createBoard(){

    board.innerHTML="";

    for(let i=0;i<81;i++){

        const cell=document.createElement("button");

        cell.classList.add("cell");

        board.appendChild(cell);
    }
}
createBoard()