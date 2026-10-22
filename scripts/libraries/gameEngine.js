import GameLogic from '../modules/gameLogic.js';
import UserInput from '../modules/userInput.js';
import Difficulty from '../modules/difficulty.js';


class GameEngine {
    constructor(containerId) {
        this.difficulties = {
            beginner: new Difficulty(9, 9, 10),
            intermediate: new Difficulty(16, 16, 40),
            expert: new Difficulty(16, 30, 99),
        };

        this.input = new UserInput(this, containerId);
        this.containerId = containerId;
        this.startGame(this.difficulties.beginner);
    }

    startGame(difficulty) {
        this.logic = new GameLogic(difficulty);
        this.updateScreen();
    }

    handleCellClick(row, col) {
        this.logic.revealCell(row, col);
        this.updateScreen();
    }

    handleCellFlag(row, col) {
        this.logic.toggleFlag(row, col);
        this.updateScreen();
    }

    updateScreen() {
        this.logic.board.renderBoard(this.containerId, this.logic.getRemainingBombs());
        if (this.logic.gameOver) {
            if (this.logic.checkForWin()) {
                this.logic.board.showMessage('You win!');
            } else {
                this.logic.board.showMessage('Game over');
            }
        }
    }

}

export default GameEngine;
