
class Cell {
	constructor(row, col) {
		this.row = row;
		this.col = col;
		this.isRevealed = false;	
		this.hasFlag = false;
		this.hasBomb = false;
		this.neighborBombs = 0;

	}
}

export default Cell;