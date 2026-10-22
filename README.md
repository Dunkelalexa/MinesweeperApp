# Minesweeper

## Repository
https://github.com/Dunkelalexa/MinesweeperApp.git

## How to use
1. Open a terminal in the project folder and start the server:
   `npx http-server -c-1`
2.  Open `http://127.0.0.1:8080` in the browser.
	

## How to play Minesweeper
1. **Left click** on a cell to open it.
   - The first click is never a bomb.
   - If the cell has no bombs around it, the empty area around it opens automatically.
     
2.**Right click** on a cell to place or remove a flag. The counter on the top left shows how many flags you have left.

3. if you open a bomb, you lose and all bombs are shown and a popup says Game over.
4. when every cell without a bomb is open you win.
5. Click on the **smiley face** to start a new game.


## Caveats
The smiley face starts a new game by reloading the page, so everytime goes back to Beginner because the index.
The flag counter does not show negative numbers correctly.

## Things that not work
**Timer:** not implemented. The time display always shows 000
