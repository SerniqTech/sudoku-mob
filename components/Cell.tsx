import { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useGameStore } from '../store/gameStore';
import { isCellInvalid } from '../utils/cellHelpers';

interface CellProps {
  row: number;
  col: number;
}

function CellComponent({ row, col }: CellProps) {
  const board = useGameStore(state => state.board);
  const selectedCell = useGameStore(state => state.selectedCell);
  const selectCell = useGameStore(state => state.selectCell);

  const cell = board[row]?.[col];
  if (!cell) return null;

  const isSelected = selectedCell?.row === row && selectedCell?.col === col;
  const isInvalid = isCellInvalid(board, row, col);

  const selectedValue = selectedCell
    ? board[selectedCell.row]?.[selectedCell.col]?.value
    : null;

  const isSameNumber =
    !isSelected &&
    cell.value !== null &&
    cell.value !== 0 &&
    selectedValue !== null &&
    selectedValue !== 0 &&
    cell.value === selectedValue;

  const handlePress = () => {
    selectCell(row, col);
  };

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isSelected && styles.cellSelected,
        isSameNumber && styles.cellSameNumber,
        isInvalid && styles.cellInvalid,
        row % 3 === 0 && row !== 0 && styles.borderTop,
        col % 3 === 0 && col !== 0 && styles.borderLeft,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {cell.value !== null && cell.value !== 0 && (
        <Text style={[
          styles.text,
          cell.fixed && styles.textFixed,
          isInvalid && styles.textInvalid,
        ]}>
          {cell.value}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export const Cell = memo(CellComponent);

const styles = StyleSheet.create({
  cell: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  cellSelected: {
    backgroundColor: '#4fc3f7',
    elevation: 2,
    shadowColor: '#2196f3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cellSameNumber: {
    backgroundColor: '#b3e5fc',
  },
  cellInvalid: {
    backgroundColor: '#ffcdd2',
    elevation: 1,
    shadowColor: '#f44336',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  borderTop: {
    borderTopWidth: 3,
    borderTopColor: '#1a1a1a',
  },
  borderLeft: {
    borderLeftWidth: 3,
    borderLeftColor: '#1a1a1a',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0288d1',
  },
  textFixed: {
    color: '#212121',
    fontWeight: 'bold',
    fontSize: 26,
  },
  textInvalid: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
});
