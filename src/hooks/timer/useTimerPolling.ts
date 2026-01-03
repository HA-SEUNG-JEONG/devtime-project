import { useCallback, useMemo, useRef } from "react";
import { timerService } from "@/services/timer";
import { POLLING_INTERVAL_MS } from "@/page/Timer/constant";

interface UseTimerPollingReturn {
  start: (timerId: string) => void;
  stop: () => void;
  syncNow: (timerId: string, elapsedSeconds: number) => Promise<void>;
}

export const useTimerPolling = (
  getElapsedSeconds: () => number,
  onError?: (error: unknown) => void,
): UseTimerPollingReturn => {
  const intervalRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const syncNow = useCallback(
    async (timerId: string, elapsedSeconds: number): Promise<void> => {
      try {
        await timerService.updateTimer(timerId, elapsedSeconds);
      } catch (error) {
        onError?.(error);
        throw error;
      }
    },
    [onError],
  );

  const start = useCallback(
    (timerId: string) => {
      stop();

      intervalRef.current = window.setInterval(async () => {
        try {
          const elapsedSeconds = getElapsedSeconds();
          await timerService.updateTimer(timerId, elapsedSeconds);
        } catch (error) {
          onError?.(error);
        }
      }, POLLING_INTERVAL_MS);
    },
    [stop, getElapsedSeconds, onError],
  );

  return useMemo(() => ({ start, stop, syncNow }), [start, stop, syncNow]);
};
