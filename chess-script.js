// main.js
const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDrop: handleMove
});

let game = new Chess();
let stockfish = new Worker('scripts/stockfish.js'); // Load Stockfish

// Function to handle player move
function handleMove(source, target) {
  const move = game.move({ from: source, to: target, promotion: 'q' });
  if (move === null) return 'snapback';

  board.position(game.fen());
  getStockfishMove(); // Trigger Stockfish move
}

// Function to get a move from Stockfish
function getStockfishMove() {
  stockfish.postMessage('position fen ' + game.fen());
  stockfish.postMessage('go depth 15'); // Adjust depth as needed

  stockfish.onmessage = function(event) {
    const match = event.data.match(/^bestmove\s([a-h][1-8][a-h][1-8])/);
    if (match) {
      game.move({ from: match[1].slice(0, 2), to: match[1].slice(2, 4), promotion: 'q' });
      board.position(game.fen());
    }
  };
}
