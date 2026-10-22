import Cell from "./cell.js";

class GameBoard {

    constructor(rows, cols, bombCount) {
        this.rows = rows;
        this.cols = cols;
        this.bombCount = bombCount;
        this.board = this.createBoard();
    }

    createElement(tag, className, parent) {
        const element = document.createElement(tag);
        element.classList.add(className);
        parent.appendChild(element);
        return element;
    }

    drawTopLine() {
        const topLine = this.createElement('div', 'game-top-line', this.container);

        this.bombCounter = this.createElement('div', 'counter-display', topLine);
        this.bombCounter.textContent = '010';

        const smileyButton = this.createElement('button', 'smiley-btn', topLine);
        smileyButton.textContent = ':)';

        const timeCounter = this.createElement('div', 'counter-display', topLine);
        timeCounter.textContent = '000';
    }

    createBoard() {
        const board = [];
        for (let r = 0; r < this.rows; r++) {
            const row = [];
            for (let c = 0; c < this.cols; c++) {
                row.push(new Cell(r,c));
            }
            board.push(row);
        }
        return board;
    }

    isInside(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    getCell(row,col) {                          //cell at a position
        return this.board[row][col];
    }

    getAllCells() {
        const allCells = [];
        for (const rowOfCells of this.board) {
            for (const cell of rowOfCells) {
                allCells.push(cell);
            }
        }
        return allCells;
    }

    renderBoard(containerId, remainingBombs) {
        const container = document.querySelector('#' + containerId);
        container.innerHTML = '';

        const topLine = document.createElement("div");              //div to contain the time, the mines and the smiley face
        topLine.classList.add("game-top-line");
        container.appendChild(topLine);

        const mineCounter = document.createElement("div");          //div for the mines
        mineCounter.classList.add("counter-display");
        mineCounter.textContent = String(remainingBombs).padStart(3, '0');
        topLine.appendChild(mineCounter);

        const smileyBtn = document.createElement("a");               // the smiley face is <a>
        smileyBtn.classList.add("smiley-btn");
        smileyBtn.textContent = ":)";
        smileyBtn.href = "index.html";                         
        topLine.appendChild(smileyBtn);

        const timeCounter = document.createElement("div");          //div for the timer
        timeCounter.classList.add("counter-display");
        timeCounter.textContent = "000";
        topLine.appendChild(timeCounter);

        const table = document.createElement("table");
        table.classList.add("game-board");
        for (let r = 0; r < this.rows; r++) {
            const row = document.createElement("tr");
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement("td");
                this.showCell(this.board[r][c], cell);
                cell.dataset.row = r;                            //dataset is an object that all elements have in js and i it is empty is going to create the row in it
                cell.dataset.col = c;

                row.appendChild(cell);                          // is nesting the elements
            }

            table.appendChild(row);                             // is nesting the elements

        }

        container.appendChild(table);                           // is nesting the elements

        this.message = document.createElement("p");             // place for "You win!" or "Game over"
        this.message.classList.add("game-message");
        container.appendChild(this.message);

    }

    showCell(cellData, cellElement) {
        if (cellData.isRevealed) {
            cellElement.classList.add('revealed');
            if (cellData.hasBomb) {
                cellElement.textContent = '💣';
                cellElement.classList.add('bomb');
            } else if (cellData.neighborBombs > 0) {
                cellElement.textContent = cellData.neighborBombs;
            }
        } else if (cellData.hasFlag) {
            cellElement.textContent = '🚩';
        }
    }

    showMessage(text) {
        const gameDialog = document.querySelector('#gameDialog');
        document.querySelector('#endMessage').textContent = text;
        if (!gameDialog.open) {
            gameDialog.showModal();
        }
    }

    placeBombs(safeRow, safeCol) {
        let bombsPlaced = 0;

        while (bombsPlaced < this.bombCount) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);
            const cell = this.getCell(row, col);
            const isSafeCell = row === safeRow && col === safeCol;

            if (!cell.hasBomb && !isSafeCell) {
                cell.hasBomb = true;
                bombsPlaced++;
            }
        }
    }

    countAdjacentBombs() {
        for (const cell of this.getAllCells()) {
            let count = 0;
            for (const neighbor of this.getNeighbors(cell.row, cell.col)) {
                if (neighbor.hasBomb) {
                    count++;
                }
            }
            cell.neighborBombs = count;
        }
    }

    getNeighbors(row, col){
        const neighbors = [];                                  //empty list to save the neighbors

        for (let rNeighbor = -1; rNeighbor <= 1; rNeighbor++) {
            for (let cNeighbor = -1; cNeighbor <= 1; cNeighbor++) {
                if (rNeighbor === 0 && cNeighbor === 0) {
                    continue;
                }
                const neighborRow = row + rNeighbor;
                const neighborCol = col + cNeighbor;

                if (this.isInside(neighborRow, neighborCol)) {
                    neighbors.push(this.board[neighborRow][neighborCol]); 
                }                
            }
        }
        return neighbors;
    }

}

export default GameBoard; 