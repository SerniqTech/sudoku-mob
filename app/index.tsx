import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import type { Difficulty } from '../engine/types';

export default function Index() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const startNewGame = useGameStore(state => state.startNewGame);

  const handleStartGame = () => {
    startNewGame(selectedDifficulty);
    router.push('/game');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sudoku</Text>

      <View style={styles.difficultyContainer}>
        <Text style={styles.label}>Select Difficulty</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.difficultyButton,
              selectedDifficulty === 'easy' && styles.difficultyButtonActive
            ]}
            onPress={() => setSelectedDifficulty('easy')}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.difficultyButtonText,
              selectedDifficulty === 'easy' && styles.difficultyButtonTextActive
            ]}>
              Easy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.difficultyButton,
              selectedDifficulty === 'medium' && styles.difficultyButtonActive
            ]}
            onPress={() => setSelectedDifficulty('medium')}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.difficultyButtonText,
              selectedDifficulty === 'medium' && styles.difficultyButtonTextActive
            ]}>
              Medium
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.difficultyButton,
              selectedDifficulty === 'hard' && styles.difficultyButtonActive
            ]}
            onPress={() => setSelectedDifficulty('hard')}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.difficultyButtonText,
              selectedDifficulty === 'hard' && styles.difficultyButtonTextActive
            ]}>
              Hard
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={handleStartGame}
        activeOpacity={0.8}
      >
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eceff1',
    padding: 20,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 60,
    color: '#263238',
    letterSpacing: 2,
  },
  difficultyContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 48,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    color: '#546e7a',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  difficultyButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#cfd8dc',
    minWidth: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  difficultyButtonActive: {
    backgroundColor: '#0288d1',
    borderColor: '#0288d1',
    elevation: 4,
    shadowOpacity: 0.3,
  },
  difficultyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#78909c',
    textAlign: 'center',
  },
  difficultyButtonTextActive: {
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#00897b',
    paddingVertical: 18,
    paddingHorizontal: 56,
    borderRadius: 12,
    minWidth: 240,
    elevation: 6,
    shadowColor: '#00897b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  startButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
