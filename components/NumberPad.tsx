import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGameStore } from "../store/gameStore";

export function NumberPad() {
  const board = useGameStore((state) => state.board);
  const selectedCell = useGameStore((state) => state.selectedCell);
  const setCellValue = useGameStore((state) => state.setCellValue);

  const isFixed = selectedCell
    ? (board[selectedCell.row]?.[selectedCell.col]?.fixed ?? false)
    : false;

  const isDisabled = !selectedCell || isFixed;

  const handleNumberPress = (num: number) => {
    if (isDisabled) return;
    setCellValue(num);
  };

  const handleErase = () => {
    if (isDisabled) return;
    setCellValue(null);
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {numbers.map((num) => (
          <TouchableOpacity
            key={num}
            style={[styles.button, isDisabled && styles.buttonDisabled]}
            onPress={() => handleNumberPress(num)}
            disabled={isDisabled}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.buttonText,
                isDisabled && styles.buttonTextDisabled,
              ]}
            >
              {num}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[
            styles.button,
            styles.eraseButton,
            isDisabled && styles.buttonDisabled,
          ]}
          onPress={handleErase}
          disabled={isDisabled}
          activeOpacity={0.7}
        >
          <FontAwesome
            name="close"
            size={28}
            color={isDisabled ? "#bdbdbd" : "#f44336"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    width: 62,
    height: 62,
    borderRadius: 14,
    backgroundColor: "#0288d1",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#0288d1",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: "#e0e0e0",
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonTextDisabled: {
    color: "#9e9e9e",
  },
  eraseButton: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#d32f2f",
    elevation: 3,
    shadowColor: "#d32f2f",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
