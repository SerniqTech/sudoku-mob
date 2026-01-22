import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useGameStore } from '../store/gameStore';

export default function RootLayout() {
  const loadSavedGame = useGameStore(state => state.loadSavedGame);

  useEffect(() => {
    loadSavedGame();
  }, [loadSavedGame]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="game" />
    </Stack>
  );
}
