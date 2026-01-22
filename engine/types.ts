export type Board = number[][];

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface PuzzleResult {
  puzzle: Board;
  solution: Board;
}
