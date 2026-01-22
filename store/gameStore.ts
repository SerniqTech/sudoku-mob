import { create } from 'zustand';
import { generatePuzzle } from '../engine/generator';
import { isValid } from '../engine/validator';
import type { Board, Difficulty } from '../engine/types';
import { saveGameState, loadGameState, clearGameState } from '../utils/storage';

export interface Cell {
  value: number | null;
  fixed: boolean;
  notes: number[];
}

interface SelectedCell {
  row: number;
  col: number;
}

interface GameState {
  board: Cell[][];
  solution: Board;
  selectedCell: SelectedCell | null;
  mistakes: number;
  time: number;
  difficulty: Difficulty;
  isPaused: boolean;
  hydrated: boolean;
  startNewGame: (difficulty: Difficulty) => void;
  selectCell: (row: number, col: number) => void;
  setCellValue: (value: number | null) => void;
  resetGame: () => void;
  incrementTime: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  loadSavedGame: () => Promise<void>;
}

function createEmptyCellBoard(): Cell[][] {
  return Array(9).fill(null).map(() =>
    Array(9).fill(null).map(() => ({
      value: null,
      fixed: false,
      notes: [],
    }))
  );
}

function boardToCells(puzzle: Board, solution: Board): Cell[][] {
  const cells: Cell[][] = Array(9).fill(null).map(() =>
    Array(9).fill(null).map(() => ({
      value: null,
      fixed: false,
      notes: [],
    }))
  );

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (puzzle[row][col] !== 0) {
        cells[row][col] = {
          value: puzzle[row][col],
          fixed: true,
          notes: [],
        };
      }
    }
  }

  return cells;
}

export const useGameStore = create<GameState>((set, get) => ({
  board: createEmptyCellBoard(),
  solution: Array(9).fill(null).map(() => Array(9).fill(0)),
  selectedCell: null,
  mistakes: 0,
  time: 0,
  difficulty: 'easy',
  isPaused: true,
  hydrated: false,

  startNewGame: (difficulty: Difficulty) => {
    const { puzzle, solution } = generatePuzzle(difficulty);
    const board = boardToCells(puzzle, solution);

    set({
      board,
      solution,
      selectedCell: null,
      mistakes: 0,
      time: 0,
      difficulty,
      isPaused: false,
    });

    clearGameState();
  },

  selectCell: (row: number, col: number) => {
    if (row < 0 || row > 8 || col < 0 || col > 8) return;

    set({ selectedCell: { row, col } });
  },

  setCellValue: (value: number | null) => {
    const { board, solution, selectedCell } = get();

    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const cell = board[row][col];

    if (cell.fixed) return;

    const newBoard = board.map(r => r.map(c => ({ ...c })));

    if (value === null) {
      newBoard[row][col].value = null;
      set({ board: newBoard });
      return;
    }

    if (value < 1 || value > 9) return;

    const currentBoard = board.map(r => r.map(c => c.value || 0));

    if (isValid(currentBoard, row, col, value)) {
      newBoard[row][col].value = value;
      newBoard[row][col].notes = [];

      if (solution[row][col] !== value) {
        set({ board: newBoard, mistakes: get().mistakes + 1 });
      } else {
        set({ board: newBoard });
      }
    } else {
      set({ mistakes: get().mistakes + 1 });
    }
  },

  resetGame: () => {
    const { difficulty } = get();
    get().startNewGame(difficulty);
  },

  incrementTime: () => {
    set({ time: get().time + 1 });
  },

  pauseGame: () => {
    set({ isPaused: true });
  },

  resumeGame: () => {
    set({ isPaused: false });
  },

  loadSavedGame: async () => {
    const savedState = await loadGameState();

    if (savedState) {
      set({
        board: savedState.board,
        solution: savedState.solution,
        mistakes: savedState.mistakes,
        time: savedState.time,
        difficulty: savedState.difficulty,
        isPaused: true,
        selectedCell: null,
        hydrated: true,
      });
    } else {
      set({ hydrated: true });
    }
  },
}));

let saveTimeout: NodeJS.Timeout | null = null;

useGameStore.subscribe((state) => {
  if (!state.hydrated) {
    return;
  }

  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  saveTimeout = setTimeout(() => {
    saveGameState({
      board: state.board,
      solution: state.solution,
      mistakes: state.mistakes,
      time: state.time,
      difficulty: state.difficulty,
      isPaused: state.isPaused,
      timestamp: Date.now(),
    });
  }, 1000);
});
