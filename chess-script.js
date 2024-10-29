// main.js
const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  pieceTheme: function(piece) {
    // Piece codes in chessboard.js:
    // wP, wR, wN, wB, wQ, wK (white pawn, rook, knight, bishop, queen, king)
    // bP, bR, bN, bB, bQ, bK (black pawn, rook, knight, bishop, queen, king)
    return `images/${piece.toLowerCase()}.png`;
  },
  onDrop: handleMove
});

let game = new Chess();

// Function to handle player moves and update board position
function handleMove(source, target) {
  const move = game.move({ from: source, to: target, promotion: 'q' });
  if (move === null) return 'snapback';
  
  board.position(game.fen());
  // Optionally, you could add AI or other functionality here
}
