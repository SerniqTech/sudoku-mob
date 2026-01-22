import { isValid } from '../engine/validator';
import type { Cell } from '../store/gameStore';

export function isCellInvalid(
  board: Cell[][],
  row: number,
  col: number
): boolean {
  const cell = board[row][col];

  if (cell.value === null || cell.value === 0) {
    return false;
  }

  const currentBoard = board.map((r, rIdx) =>
    r.map((c, cIdx) => {
      if (rIdx === row && cIdx === col) {
        return 0;
      }
      return c.value || 0;
    })
  );

  return !isValid(currentBoard, row, col, cell.value);
}

export function getCellsWithSameValue(
  board: Cell[][],
  targetValue: number | null
): Set<string> {
  const cells = new Set<string>();

  if (targetValue === null || targetValue === 0) {
    return cells;
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === targetValue) {
        cells.add(`${row}-${col}`);
      }
    }
  }

  return cells;
}
