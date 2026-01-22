import { Board } from './types';

export function isValid(board: Board, row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
  }

  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }

  return true;
}

export function isValidBoard(board: Board): boolean {
  if (board.length !== 9) return false;

  for (let row = 0; row < 9; row++) {
    if (board[row].length !== 9) return false;

    for (let col = 0; col < 9; col++) {
      const num = board[row][col];
      if (num !== 0) {
        board[row][col] = 0;
        const valid = isValid(board, row, col, num);
        board[row][col] = num;
        if (!valid) return false;
      }
    }
  }

  return true;
}
