class UserInput {
    constructor(engine, containerId) {
        this.engine = engine;
        this.container = document.querySelector('#' + containerId);
        this.container.addEventListener('click', (event) => this.handleClick(event, false));
        this.container.addEventListener('contextmenu', (event) => {
            event.preventDefault();             // stops the browser menu from opening
            this.handleClick(event, true);
        });
        this.addDifficultyListeners();
        this.addDialogListener();

    }

    handleClick(event, isRightClick) {
        const target = event.target;
        if (target.dataset.row === undefined) {
            return;
        }
        const row = Number(target.dataset.row);
        const col = Number(target.dataset.col);

        if (isRightClick) {
            this.engine.handleCellFlag(row, col);
        } else {
            this.engine.handleCellClick(row, col);
        }
    }

    addDifficultyListeners() {
        for (const button of document.querySelectorAll('[data-difficulty]')) {
            button.addEventListener('click', () => {
                const level = button.dataset.difficulty;              // "beginner", "intermediate" or "expert"
                this.engine.startGame(this.engine.difficulties[level]);
            });
        }
    }

    addDialogListener() {
        const gameDialog = document.querySelector('#gameDialog');
        document.querySelector('#closeDialog').addEventListener('click', () => {
            gameDialog.close();
        });
    }
}

export default UserInput;