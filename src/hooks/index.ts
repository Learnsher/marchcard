import { useState, useEffect } from 'react';
import { formatTime } from '../utils';

interface UseCountdownProps {
  expiresAt: number | null;
  onExpire?: () => void;
}

export const useCountdown = ({ expiresAt, onExpire }: UseCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!expiresAt) {
      setTimeLeft(0);
      return;
    }

    const updateTime = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((expiresAt - now) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0 && !isExpired) {
        setIsExpired(true);
        onExpire?.();
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, isExpired, onExpire]);

  return {
    timeLeft,
    isExpired,
    formattedTime: formatTime(timeLeft),
  };
};

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [value, setStoredValue] as const;
};

export const useSoundToggle = () => {
  const [soundEnabled, setSoundEnabled] = useLocalStorage('soundEnabled', true);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return { soundEnabled, toggleSound };
};
