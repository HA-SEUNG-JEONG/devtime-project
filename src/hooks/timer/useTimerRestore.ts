import { useCallback, useRef, useState } from "react";
import { timerService } from "@/services/timer";
import type { Task } from "@/components/Timer/TaskItem";
import type { TimerState } from "./types";

interface RestoreResult {
  state: TimerState;
  referenceTime: string;
  baseSeconds: number;
}

interface UseTimerRestoreReturn {
  isRestoring: boolean;
  restore: () => Promise<RestoreResult | null>;
}

export const useTimerRestore = (): UseTimerRestoreReturn => {
  const [isRestoring, setIsRestoring] = useState(false);
  const hasRestoredRef = useRef(false);

  const restore = useCallback(async (): Promise<RestoreResult | null> => {
    if (hasRestoredRef.current) return null;
    hasRestoredRef.current = true;

    setIsRestoring(true);
    try {
      const activeTimer = await timerService.getActiveTimer();
      if (!activeTimer) {
        return null;
      }

      const studyLog = await timerService.getStudyLogDetail(
        activeTimer.studyLogId,
      );

      const baseSeconds = activeTimer.splitTimes.reduce(
        (sum, split) => sum + split.timeSpent,
        0,
      );
      const referenceTime = activeTimer.lastUpdateTime || activeTimer.startTime;

      const tasks: Task[] =
        studyLog?.data?.tasks?.map((task) => ({
          id: task.id,
          content: task.content,
          isCompleted: task.isCompleted,
        })) ?? [];

      const state: TimerState = {
        status: "in-progress",
        timerId: activeTimer.timerId,
        studyLogId: activeTimer.studyLogId,
        startTime: activeTimer.startTime,
        todayGoal: studyLog?.data?.todayGoal ?? "",
        tasks,
        elapsedSeconds: 0,
      };

      return { state, referenceTime, baseSeconds };
    } catch {
      return null;
    } finally {
      setIsRestoring(false);
    }
  }, []);

  return { isRestoring, restore };
};
