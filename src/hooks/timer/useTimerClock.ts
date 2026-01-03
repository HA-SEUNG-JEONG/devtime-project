import { useCallback, useMemo, useRef } from "react";

interface TimerClockContext {
  referenceTime: string;
  baseSeconds: number;
}

interface UseTimerClockReturn {
  start: (referenceTime: string, baseSeconds: number) => void;
  stop: () => void;
  getElapsedSeconds: () => number;
}

export const useTimerClock = (
  onTick: (elapsedSeconds: number) => void,
): UseTimerClockReturn => {
  const intervalRef = useRef<number | null>(null);
  const contextRef = useRef<TimerClockContext | null>(null);

  const calculateElapsedSeconds = useCallback((): number => {
    if (!contextRef.current) return 0;

    const now = Date.now();
    const reference = new Date(contextRef.current.referenceTime).getTime();
    const currentSessionSeconds = Math.max(
      0,
      Math.floor((now - reference) / 1000),
    );

    return contextRef.current.baseSeconds + currentSessionSeconds;
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    contextRef.current = null;
  }, []);

  const start = useCallback(
    (referenceTime: string, baseSeconds: number) => {
      stop();
      contextRef.current = { referenceTime, baseSeconds };

      const tick = () => {
        const elapsed = calculateElapsedSeconds();
        onTick(elapsed);
      };

      tick();
      intervalRef.current = window.setInterval(tick, 1000);
    },
    [stop, calculateElapsedSeconds, onTick],
  );

  const getElapsedSeconds = useCallback((): number => {
    return calculateElapsedSeconds();
  }, [calculateElapsedSeconds]);

  return useMemo(
    () => ({ start, stop, getElapsedSeconds }),
    [start, stop, getElapsedSeconds],
  );
};
