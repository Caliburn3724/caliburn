const board = ChessBoard('board', {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
});

// Initialize the chess game and chess engine
let game = new Chess();
let stockfish = new Worker('https://cdnjs.cloudflare.com/ajax/libs/stockfish/11.0.0/stockfish.js');

stockfish.onmessage = function(event) {
    const message = event.data;
    if (message.includes('bestmove')) {
        const bestMove = message.split(' ')[1];
        game.move(bestMove);
        render();
        board.position(game.fen());
        renderMoveHistory(game.history());
    }
};

function onDragStart(source, piece, position, orientation) {
    if (game.in_checkmate() || game.in_draw() || piece.search(/^b/) !== -1) {
        return false;
    }
}

function onDrop(source, target) {
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q' // Automatically promote to a queen
    });

    removeGreySquares();
    renderMoveHistory(game.history());
    if (move === null) return 'snapback'; // Invalid move

    render();
    if (game.game_over()) {
        alert('Game over!');
    } else {
        // If the move is valid, let the engine make a move
        stockfish.postMessage('position fen ' + game.fen());
        stockfish.postMessage('go movetime 1000');
    }
}

function onSnapEnd() {
    board.position(game.fen());
}

function removeGreySquares() {
    $('#board .square-55d63').css('background', '');
}

function renderMoveHistory(moves) {
    let historyElement = $('#move-history').empty();
    historyElement.empty();
    for (let i = 0; i < moves.length; i++) {
        historyElement.append('<span>' + (i + 1) + '. ' + moves[i] + '</span><br>')
    }
}

function render() {
    board.position(game.fen());
    $('#status').html(game.game_over() ? 'Game over' : '');
}

// Button handlers
$('#startBtn').on('click', board.start);
$('#clearBtn').on('click', board.clear);

// Initialize the board on load
$(document).ready(function() {
    board.position('start');
});
