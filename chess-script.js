let board;
let game = new Chess(); // Create a new chess game

// Initialize the chessboard
function initBoard() {
    board = $('#board');
    for (let i = 0; i < 64; i++) {
        let square = $('<div class="square"></div>');
        square.attr('data-square', i);
        board.append(square);
    }

    // Add event listener for square clicks
    $('.square').click(function() {
        const squareIndex = $(this).data('square');
        const move = prompt("Enter your move (e.g., e2e4):"); // Simple move input
        if (move) {
            makeMove(move);
        }
    });
}

// Function to make a move
function makeMove(move) {
    const moveResult = game.move(move);

    if (moveResult) {
        $('#moveOutput').text(`You moved: ${move}`);
        renderBoard();
        getBestMove(); // Get the best move from Lichess after player move
    } else {
        alert("Invalid move!");
    }
}

// Render the board
function renderBoard() {
    $('.square').each(function(index) {
        const piece = game.board()[Math.floor(index / 8)][index % 8];
        $(this).text(piece ? piece.color + piece.type : '');
    });
}

// Get best move from Lichess API
function getBestMove() {
    const fen = game.fen(); // Get current position in FEN format
    $.ajax({
        url: `https://lichess.org/api/cloud-eval`,
        method: 'GET',
        data: { fen: fen },
        success: function(data) {
            const bestMove = data.bestMove; // Get the best move from the response
            if (bestMove) {
                game.move(bestMove); // Make the move in the game
                $('#moveOutput').append(` <br> Lichess moved: ${bestMove}`);
                renderBoard();
            }
        },
        error: function(err) {
            console.error('Error fetching from Lichess API', err);
        }
    });
}

// Initialize the board on page load
$(document).ready(() => {
    initBoard();
});
