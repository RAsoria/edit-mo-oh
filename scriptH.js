let currentPlayer = 'X';
let gameBoard = Array(30).fill(''); 
let gameActive = true;
let playerXWins = 0;
let playerOWins = 0;
let playerXConsecutiveWins = 0;
let playerOConsecutiveWins = 0;
let gameHistory = [];
const roundsToWin = 5;

function startHumanVsComputer() {
    window.location.href = 'TIKTACTOE.html';
}

function makeMove(cell) {
    const cellIndex = Array.from(cell.parentNode.children).indexOf(cell);

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWinner();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


function checkWinner() {
    const winPatterns = [
        // Rows
        [0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16, 17],
        [18, 19, 20, 21, 22, 23], [24, 25, 26, 27, 28, 29,],
        // Columns
        [0, 6, 12, 18, 24,], [1, 7, 13, 19, 25], [2, 8, 14, 20, 26],
        [3, 9, 15, 21, 27], [4, 10, 16, 22, 28], [5, 11, 17, 23, 29],
        // Diagonals top-left - bot-right
        [1, 6], [2, 7, 12], [3, 8, 13, 18], [4, 9, 14, 19, 24], [5, 10, 15, 20, 25], 
		[11, 16, 21, 26], [17, 22, 27], [23, 28], 
        // Diagonals bot-left - top-right
		[18, 25], [12, 19, 26], [6, 13, 20, 27], [0, 7, 14, 21, 28], [1, 8 ,15 ,22, 29],
		[2, 9, 16, 23], [3, 10 ,17], [4, 11],  
    ];

    for (const pattern of winPatterns) {
        const cellsInPattern = pattern.map(index => gameBoard[index]);
        if (cellsInPattern[0] && cellsInPattern.every(cell => cell === cellsInPattern[0])) {
            document.getElementById('status').textContent = `${currentPlayer} wins!`;
            gameActive = false;
			
			updateScore();
        }
    }

function updateScore() {
    if (document.getElementById('status').textContent.includes('wins')) {
        if (currentPlayer === 'X') {
            playerXWins++;
        } else {
            playerOWins++;
        }
    }

    document.getElementById('score').textContent = `Player X: ${playerXWins} - Player 0: ${playerOWins}`;

    if (playerXWins === roundsToWin || playerOWins === roundsToWin) {
        document.getElementById('status').textContent = `${currentPlayer} wins the game!`;
        resetGame();
    }
}

    if (!gameBoard.includes('') && gameActive) {
        document.getElementById('status').textContent = 'It\'s a tie!';
        gameActive = false;
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = Array(30).fill('');
    gameActive = true;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });

    document.getElementById('status').textContent = '';
}

// Function to go back to the previous page
function goBack() {
    window.history.back();
}

// Function to update the game history
function updateGameHistory(result) {
    const historyContent = document.getElementById('game-history-content');
    const resultText = result === 'X' ? 'PlayerX wins' : result === 'O' ? 'PlayerO wins' : 'Tie';
    const historyItem = document.createElement('div');
    historyItem.textContent = resultText;
    historyContent.appendChild(historyItem);
}

// Function to reset the game history
function resetGameHistory() {
    document.getElementById('game-history-content').innerHTML = '';
}

// Function to update the scoreboard text content
function updateScoreboard() {
    document.getElementById('score').textContent = `PlayerX: ${playerXWins} - PlayerO: ${playerOWins}`;
}

// Function to update the score and check for race completion
function updateScore() {
    if (currentPlayer === 'X') {
        playerXWins++;
        playerXConsecutiveWins++;
        playerOConsecutiveWins = 0; // Reset computer consecutive wins
    } else {
        playerOWins++;
        playerOConsecutiveWins++;
        playerXConsecutiveWins = 0; // Reset player consecutive wins
    }

    updateScoreboard(); // Update the scoreboard

    if (playerXWins === roundsToWin || playerOWins === roundsToWin) {
        if (playerXWins === roundsToWin) {
            document.getElementById('status').textContent = 'Player wins the game!';
        } else {
            document.getElementById('status').textContent = 'Computer wins the game!';
        }

        // Display congratulatory popup
        if (confirm(`${currentPlayer} wins the race to 5 wins! Do you want to play another game?`)) {
            resetGame();
            playerXWins = 0; // Reset player wins
            playerOWins = 0; // Reset computer wins
            updateScoreboard(); // Update the scoreboard with reset scores
            return; // Restart the game
        } else {
            gameActive = false; // End the game
            return; // Stop execution
        }
    }

    if (playerXConsecutiveWins === roundsToWin) {
        document.getElementById('status').textContent = 'PlayerX wins the match!';
        resetGame();
    }

    if (playerOConsecutiveWins === roundsToWin) {
        document.getElementById('status').textContent = 'PlayerO wins the match!';
        resetGame();
    }

    // Update game history
    updateGameHistory(currentPlayer);
}