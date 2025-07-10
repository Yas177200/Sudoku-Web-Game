import sudoku from 'sudoku';

export function generateBoard(difficulty = 'medium') {
  const solution = sudoku.solvepuzzle(sudoku.makepuzzle()); // Full solved board
  const puzzle = Array(81).fill(null);

  // Difficulty clue settings
  let cluesCount;
  switch (difficulty) {
    case 'easy':
      cluesCount = 36;
      break;
    case 'medium':
      cluesCount = 30;
      break;
    case 'hard':
      cluesCount = 24;
      break;
    case 'evil':
      cluesCount = 24;
      break;
    default:
      cluesCount = 30;
  }

  // Generate clue positions randomly
  const positions = Array.from({ length: 81 }, (_, i) => i);
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  const excludedNumber = difficulty === 'evil' ? Math.floor(Math.random() * 9) + 1 : null;
  if (excludedNumber) console.log(`EVIL MODE: Excluding number ${excludedNumber}`);

  let count = 0;
  for (let i = 0; i < positions.length && count < cluesCount; i++) {
    const idx = positions[i];
    const val = solution[idx];
    const number = val + 1;

    if (difficulty === 'evil' && number === excludedNumber) continue;

    puzzle[idx] = val;
    count++;
  }

  // Build 2D board
  const board = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      const val = puzzle[i * 9 + j];
      row.push(val !== null ? val + 1 : null);
    }
    board.push(row);
  }

  return board;
}


// export function generateBoard() {
//   return [
//     [5, 3, 4, 6, 7, 8, 9, 1, 2],
//     [6, 7, 2, 1, 9, 5, 3, 4, null],
//     [1, 9, 8, 3, 4, 2, 5, 6, 7],
//     [8, 5, 9, 7, 6, 1, 4, 2, 3],
//     [4, 2, 6, 8, 5, 3, 7, 9, 1],
//     [7, 1, 3, 9, 2, 4, 8, 5, 6],
//     [9, 6, 1, 5, 3, 7, 2, 8, 4],
//     [2, 8, 7, 4, 1, 9, 6, 3, 5],
//     [3, 4, 5, 2, 8, 6, 1, 7, 9],
//   ];
// }
