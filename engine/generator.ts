import { Board, Difficulty, PuzzleResult } from './types';
import { solve } from './solver';

function createEmptyBoard(): Board {
  return Array(9).fill(null).map(() => Array(9).fill(0));
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateCompleteBoard(): Board {
  const board = createEmptyBoard();
  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (let i = 0; i < 9; i++) {
    board[0][i] = numbers[i];
  }

  solve(board);
  return board;
}

function getDifficultySettings(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy': return 35;
    case 'medium': return 45;
    case 'hard': return 55;
  }
}

export function generatePuzzle(difficulty: Difficulty): PuzzleResult {
  const solution = generateCompleteBoard();
  const puzzle = solution.map(row => [...row]);

  const cellsToRemove = getDifficultySettings(difficulty);
  const positions = shuffle(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9])
  );

  for (let i = 0; i < cellsToRemove && i < positions.length; i++) {
    const [row, col] = positions[i];
    puzzle[row][col] = 0;
  }

  return { puzzle, solution };
}
