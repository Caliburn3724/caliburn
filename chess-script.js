const board = ChessBoard('board', {
    draggable: true,
    position: 'start',
    onDrop: handleDrop,
    onSnapEnd: () => board.position(board.fen()),
});

// Handle piece drop
function handleDrop(source, target) {
    // Check if the move is legal (basic check)
    const move = board.move({
        from: source,
        to: target,
        promotion: 'q' // promote to queen
    });

    // Illegal move
    if (move === null) return 'snapback';
}

// Start position button
document.getElementById('startBtn').addEventListener('click', board.start);

// Clear board button
document.getElementById('clearBtn').addEventListener('click', board.clear);
