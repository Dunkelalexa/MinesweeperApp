import GameBoard from './gameBoard.js';


class GameLogic {
    constructor(difficulty) {
        this.difficulty = difficulty;
        this.board = new GameBoard(difficulty.rows, difficulty.cols, difficulty.bombCount);
        this.gameOver = false;
        this.flagCount = 0;
        this.isFirstClick = true;
    }

    // Left click
    revealCell(row, col) {
        const cell = this.board.getCell(row, col);
        if (this.gameOver || cell.isRevealed || cell.hasFlag) {
            return;
        }

        if (this.isFirstClick) {                                                    // Bombs are placed after the first click, so the first click is never a bomb
            this.board.placeBombs(row, col);
            this.board.countAdjacentBombs();
            this.isFirstClick = false;
        }

        if (cell.hasBomb) {
            cell.isRevealed = true;
            this.loseGame();
            return;
        }

        this.revealEmptyArea(row, col);

        if (this.checkForWin()) {
            this.gameOver = true;
            
        }
    }

    
    revealEmptyArea(row, col) {                                                     // Reveals a cell and, if it is a 0, keeps opening its neighbors (same idea as the Bucket in the Paint)
        const stack = [this.board.getCell(row, col)];

        while (stack.length > 0) {
            const current = stack.pop();
            if (current.isRevealed || current.hasFlag) {
                continue;
            }

            current.isRevealed = true;

            if (current.neighborBombs === 0) {
                for (const neighbor of this.board.getNeighbors(current.row, current.col)) {
                    if (!neighbor.isRevealed) {
                        stack.push(neighbor);
                    }
                }
            }
        }
    }

    
    toggleFlag(row, col) {                                                          // Right click to add flags
        const cell = this.board.getCell(row, col);
        if (this.gameOver || cell.isRevealed) {
            return;
        }

        cell.hasFlag = !cell.hasFlag;
        if (cell.hasFlag) {
            this.flagCount++;
        } else {
            this.flagCount--;
        }
    }

    checkForWin() {
        for (const cell of this.board.getAllCells()) {
            if (!cell.hasBomb && !cell.isRevealed) {
                return false;
            }
        }
        return true;
    }

    loseGame() {
        this.gameOver = true;
        for (const cell of this.board.getAllCells()) {
            if (cell.hasBomb) {
                cell.isRevealed = true;
            }
        }
    }

    getRemainingBombs() {
        return this.board.bombCount - this.flagCount;
    }
}

export default GameLogic;
