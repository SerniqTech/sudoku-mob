import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useGameStore } from '../store/gameStore';
import { useTimer } from '../hooks/useTimer';
import { SudokuBoard } from '../components/SudokuBoard';
import { NumberPad } from '../components/NumberPad';

export default function Game() {
  const mistakes = useGameStore(state => state.mistakes);
  const difficulty = useGameStore(state => state.difficulty);
  const resetGame = useGameStore(state => state.resetGame);
  const { formatted } = useTimer();

  const handleBack = () => {
    router.back();
  };

  const handleReset = () => {
    resetGame();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Time</Text>
            <Text style={styles.statValue}>{formatted}</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statLabel}>Mistakes</Text>
            <Text style={[styles.statValue, mistakes > 0 && styles.mistakesText]}>
              {mistakes}
            </Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statLabel}>Difficulty</Text>
            <Text style={styles.statValue}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleReset} style={styles.resetButton} activeOpacity={0.7}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <SudokuBoard />
        <NumberPad />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#0288d1',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#78909c',
    marginBottom: 4,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263238',
  },
  mistakesText: {
    color: '#d32f2f',
  },
  resetButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  resetButtonText: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 32,
  },
});
