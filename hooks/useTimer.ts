import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useGameStore } from '../store/gameStore';

export function useTimer() {
  const time = useGameStore(state => state.time);
  const isPaused = useGameStore(state => state.isPaused);
  const incrementTime = useGameStore(state => state.incrementTime);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (!isPaused) {
          startInterval();
        }
      } else if (nextAppState.match(/inactive|background/)) {
        stopInterval();
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
      stopInterval();
    };
  }, [isPaused]);

  useEffect(() => {
    if (!isPaused && AppState.currentState === 'active') {
      startInterval();
    } else {
      stopInterval();
    }

    return () => stopInterval();
  }, [isPaused, incrementTime]);

  const startInterval = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      incrementTime();
    }, 1000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return {
    time,
    minutes,
    seconds,
    formatted: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
  };
}
