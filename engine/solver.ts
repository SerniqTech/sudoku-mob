import { Board } from './types';
import { isValid } from './validator';

function findEmpty(board: Board): [number, number] | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

export function solve(board: Board): boolean {
  const empty = findEmpty(board);

  if (!empty) return true;

  const [row, col] = empty;

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;

      if (solve(board)) return true;

      board[row][col] = 0;
    }
  }

  return false;
}

export function getSolution(board: Board): Board {
  const copy = board.map(row => [...row]);
  solve(copy);
  return copy;
}
