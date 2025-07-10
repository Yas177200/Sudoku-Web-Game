// src/utils/sudokuSolver.js

// Check if placing num at board[row][col] is valid by Sudoku rules
export function isSafe(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
  }
  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;
  for (let r = boxRowStart; r < boxRowStart + 3; r++) {
    for (let c = boxColStart; c < boxColStart + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}

// Backtracking solver: returns true if board solvable
export function sudokuSolver(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;

            if (sudokuSolver(board)) {
              return true;
            }

            board[row][col] = null; // backtrack
          }
        }
        return false; // no valid number found -> backtrack
      }
    }
  }
  return true; // solved if no empty cells
}
