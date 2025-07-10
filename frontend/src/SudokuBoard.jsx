import React, { useState } from 'react';
import './game.css';
import { isSafe, sudokuSolver } from './sudokuSolver';
import { generateBoard } from './generateBoard';
import confetti from 'canvas-confetti';


function SudokuBoard() {
  const [board, setBoard] = useState(generateBoard());
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [message, setMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCellClick = (row, col) => {
    if (selectedNumber === null) {
      setMessage('Please select a number first!');
      return;
    }
    if (board[row][col] !== null) {
      setMessage('Cell already filled!');
      return;
    }

    if (!isSafe(board, row, col, selectedNumber)) {
      setMistakes(prev => prev + 1);
      setMessage('Wrong move! Violates Sudoku rules.');
      return;
    }

    const newBoard = board.map(r => r.slice());
    newBoard[row][col] = selectedNumber;

    if (!sudokuSolver(newBoard.map(r => r.slice()))) {
      setMistakes(prev => prev + 1);
      setMessage('Wrong move! Puzzle becomes unsolvable.');
      return;
    }

    setBoard(newBoard);
    setMessage('');
    checkWin(newBoard);
  };

  const handleNumberSelect = (num) => {
    setSelectedNumber(num);
    setMessage('');
  };

  const clearBoard = () => {
    setBoard(generateBoard());
    setMistakes(0);
    setMessage('');
    setSelectedNumber(null);
    setShowConfetti(false);
  };

  const checkWin = (board) => {
    const allFilled = board.every(row => row.every(cell => cell !== null));
    if (!allFilled) return;

    const copy = board.map(row => [...row]);
    if (sudokuSolver(copy)) {
        setMessage('🎉 Congratulations! You solved the Sudoku! 🎉');
        const defaults = {
            spread: 360,
            ticks: 300,
            gravity: 0.5,
            decay: 0.945,
            startVelocity: 20,
            shapes: ["star"],
            colors: ["75edf3", "20a2e7", "c5e9fd", "4ad6e7", "4fb5ec"],
        };

        function shoot() {
        confetti({
            ...defaults,
            particleCount: 60,
            scalar: 1.2,
            shapes: ["star"],
        });

        confetti({
            ...defaults,
            particleCount: 20,
            scalar: 0.2,
            shapes: ["circle"],
        });
        }

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);
        setTimeout(shoot, 300);
        setTimeout(shoot, 400);
    }
  };

    const getNumberCount = (num) => {
        return board.flat().filter(cell => cell === num).length;
    };


  return (
    <div className="app-container" style={{minHeight:'100vh' }}>
        <div className="head-container">
        <header>AquaGrid</header>
        <div>
            <button className="clear-btn" onClick={clearBoard}>New Game</button>
            <div className="mistakes">Mistakes: {mistakes}</div>
        </div>
        </div>

      <main>
        <div className="board-container">
          {board.flatMap((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className={`cell ${selectedNumber !== null && cell === selectedNumber ? 'highlighted' : ''}`}
                onClick={() => handleCellClick(r, c)}
                title={`Row ${r + 1}, Col ${c + 1}`}
                >
                {cell}
              </div>
            ))
          )}
        </div>

        <div className="number-pad">
            <h4>Select Number</h4>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                const isUsedUp = getNumberCount(num) === 9;
                return (
                <div
                    key={num}
                    className={`number${selectedNumber === num ? ' selected' : ''} ${isUsedUp ? 'disabled' : ''}`}
                    onClick={() => {
                    if (!isUsedUp) handleNumberSelect(num);
                    }}
                    title={isUsedUp ? 'All instances placed' : ''}
                >
                    {num}
                </div>
                );
            })}
        </div>

      </main>
      {message && (
          <div className={`board-message ${message.includes('Wrong') ? 'error-message' : 'validation-message'}`}>
            {message}
          </div>
        )}

      <footer>
        &copy; <span id="year">{new Date().getFullYear()}</span> SudoVerse by Yasser Abdulmala Student at Irad Academy. All rights reserved.
      </footer>
    </div>
  );
}

export default SudokuBoard;
