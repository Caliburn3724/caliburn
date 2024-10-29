const canvas = document.getElementById('ludoBoard');
const ctx = canvas.getContext('2d');

const boardSize = 15;
const squareSize = 40;
const players = [
    { color: 'red', position: 0, pieces: [] },
    { color: 'green', position: 0, pieces: [] },
    { color: 'blue', position: 0, pieces: [] },
    { color: 'yellow', position: 0, pieces: [] }
];

let currentPlayerIndex = 0;

function drawBoard() {
    ctx.fillStyle = '#d4e6f1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the Ludo board squares
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (i === 7 || j === 7) {
                ctx.fillStyle = (i < 7 ? players[0].color : players[1].color);
                ctx.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
            } else {
                ctx.fillStyle = '#fff';
                ctx.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
            }
            ctx.strokeStyle = '#000';
            ctx.strokeRect(i * squareSize, j * squareSize, squareSize, squareSize);
        }
    }

    players.forEach(player => {
        player.pieces.forEach(piece => {
            ctx.fillStyle = player.color;
            ctx.beginPath();
            ctx.arc(piece.x, piece.y, 15, 0, Math.PI * 2);
            ctx.fill();
        });
    });
}

function rollDice() {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').innerText = `Dice rolled: ${diceValue}`;
    movePlayer(diceValue);
}

function movePlayer(diceValue) {
    const currentPlayer = players[currentPlayerIndex];

    if (currentPlayer.position + diceValue <= 56) {
        currentPlayer.position += diceValue;
        const pieceX = (currentPlayer.position % boardSize) * squareSize + squareSize / 2;
        const pieceY = Math.floor(currentPlayer.position / boardSize) * squareSize + squareSize / 2;
        
        currentPlayer.pieces.push({ x: pieceX, y: pieceY });

        // Check for win
        if (currentPlayer.position === 56) {
            alert(`${currentPlayer.color.charAt(0).toUpperCase() + currentPlayer.color.slice(1)} wins!`);
            resetGame();
        } else {
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Switch turn
        }
    } else {
        alert("Cannot move. Roll again.");
    }

    drawBoard();
}

// Reset game
function resetGame() {
    players.forEach(player => {
        player.position = 0;
        player.pieces = [];
    });
    currentPlayerIndex = 0;
    drawBoard();
}

// Initial drawing of the board
drawBoard();

// Roll dice button event
document.getElementById('rollDice').addEventListener('click', rollDice);
