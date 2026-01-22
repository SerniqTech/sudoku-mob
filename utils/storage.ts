import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Cell } from '../store/gameStore';
import type { Board, Difficulty } from '../engine/types';

const GAME_STATE_KEY = '@sudoku_game_state';

export interface PersistedGameState {
  board: Cell[][];
  solution: Board;
  mistakes: number;
  time: number;
  difficulty: Difficulty;
  isPaused: boolean;
  timestamp: number;
}

export async function saveGameState(state: PersistedGameState): Promise<void> {
  try {
    const stateWithTimestamp = {
      ...state,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(GAME_STATE_KEY, JSON.stringify(stateWithTimestamp));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

export async function loadGameState(): Promise<PersistedGameState | null> {
  try {
    const stored = await AsyncStorage.getItem(GAME_STATE_KEY);
    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as PersistedGameState;

    if (!isValidGameState(parsed)) {
      console.warn('Invalid game state format, clearing storage');
      await clearGameState();
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load game state:', error);
    await clearGameState();
    return null;
  }
}

export async function clearGameState(): Promise<void> {
  try {
    await AsyncStorage.removeItem(GAME_STATE_KEY);
  } catch (error) {
    console.error('Failed to clear game state:', error);
  }
}

function isValidGameState(state: any): state is PersistedGameState {
  if (!state || typeof state !== 'object') {
    return false;
  }

  if (!Array.isArray(state.board) || state.board.length !== 9) {
    return false;
  }

  if (!state.board.every((row: any) => Array.isArray(row) && row.length === 9)) {
    return false;
  }

  if (!Array.isArray(state.solution) || state.solution.length !== 9) {
    return false;
  }

  if (typeof state.mistakes !== 'number' || typeof state.time !== 'number') {
    return false;
  }

  if (!['easy', 'medium', 'hard'].includes(state.difficulty)) {
    return false;
  }

  if (typeof state.isPaused !== 'boolean') {
    return false;
  }

  return true;
}
