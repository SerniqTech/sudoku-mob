import { View, StyleSheet, useWindowDimensions, Text } from 'react-native';
import { useGameStore } from '../store/gameStore';
import { Cell } from './Cell';

export function SudokuBoard() {
  const board = useGameStore(state => state.board);
  const { width, height } = useWindowDimensions();

  if (!board || board.length !== 9) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load board</Text>
      </View>
    );
  }

  const maxSize = Math.min(width, height) - 48;
  const boardSize = Math.min(maxSize, 450);
  const cellSize = boardSize / 9;

  return (
    <View style={[styles.container, { width: boardSize, height: boardSize }]}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={[styles.row, { height: cellSize }]}>
          {row.map((_, colIndex) => (
            <View
              key={`${rowIndex}-${colIndex}`}
              style={{ width: cellSize, height: cellSize }}
            >
              <Cell row={rowIndex} col={colIndex} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: '#1a1a1a',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  row: {
    flexDirection: 'row',
  },
  errorContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
  },
});
