import { useState, useCallback, useRef, useEffect } from "react";
import { timerService } from "@/services/timer";
import type { Task } from "@/components/Timer/TaskItem";
import type {
  GetActiveTimerResponse,
  TimerConflictResponse,
} from "@/types/api";
import axios from "axios";

export type TimerStatus = "ready" | "in-progress" | "paused";
export type TimerErrorType = "conflict" | "network" | "unknown";

export interface TimerError {
  type: TimerErrorType;
  message: string;
  existingTimerId?: string;
}

interface TimerState {
  status: TimerStatus;
  timerId: string | null;
  studyLogId: string | null;
  startTime: string | null;
  todayGoal: string;
  tasks: Task[];
  elapsedSeconds: number;
}

interface UseTimerReturn {
  status: TimerStatus;
  timerId: string | null;
  studyLogId: string | null;
  todayGoal: string;
  tasks: Task[];
  hours: number;
  minutes: number;
  seconds: number;
  isLoading: boolean;
  isRestoring: boolean;
  error: TimerError | null;
  startTimer: (goal: string, taskContents: string[]) => Promise<void>;
  pauseTimer: () => void;
  resumeTimer: () => void;
  clearError: () => void;
}

const initialState: TimerState = {
  status: "ready",
  timerId: null,
  studyLogId: null,
  startTime: null,
  todayGoal: "",
  tasks: [],
  elapsedSeconds: 0,
};

export const useTimer = (): UseTimerReturn => {
  const [state, setState] = useState<TimerState>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [error, setError] = useState<TimerError | null>(null);
  const intervalRef = useRef<number | null>(null);
  const hasRestoredRef = useRef(false);
  const timerContextRef = useRef<{
    referenceTime: string;
    baseSeconds: number;
  } | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    timerContextRef.current = null;
  }, []);

  const startTimerInterval = useCallback(
    (referenceTime: string, baseSeconds: number) => {
      clearTimerInterval();
      timerContextRef.current = { referenceTime, baseSeconds };

      const updateElapsed = () => {
        const ctx = timerContextRef.current;

        if (!ctx) return;

        const now = Date.now();
        const reference = new Date(ctx.referenceTime).getTime();
        const currentSessionSeconds = Math.max(
          0,
          Math.floor((now - reference) / 1000),
        );

        setState((prev) => ({
          ...prev,
          elapsedSeconds: ctx.baseSeconds + currentSessionSeconds,
        }));
      };

      updateElapsed();
      intervalRef.current = window.setInterval(updateElapsed, 1000);
    },
    [clearTimerInterval],
  );

  const calculateInitialElapsed = useCallback(
    (
      activeTimer: GetActiveTimerResponse,
    ): {
      baseSeconds: number;
      referenceTime: string;
    } => {
      const baseSeconds = activeTimer.splitTimes.reduce(
        (sum, split) => sum + split.timeSpent,
        0,
      );
      const referenceTime = activeTimer.lastUpdateTime || activeTimer.startTime;
      return { baseSeconds, referenceTime };
    },
    [],
  );

  const restoreActiveTimer = useCallback(async () => {
    if (hasRestoredRef.current) return;
    hasRestoredRef.current = true;

    setIsRestoring(true);
    try {
      const activeTimer = await timerService.getActiveTimer();
      if (!activeTimer) {
        return;
      }

      const studyLog = await timerService.getStudyLogDetail(
        activeTimer.studyLogId,
      );

      const { baseSeconds, referenceTime } =
        calculateInitialElapsed(activeTimer);
      const tasks: Task[] =
        studyLog?.data?.tasks?.map((task) => ({
          id: task.id,
          content: task.content,
          isCompleted: task.isCompleted,
        })) ?? [];

      setState({
        status: "in-progress",
        timerId: activeTimer.timerId,
        studyLogId: activeTimer.studyLogId,
        startTime: activeTimer.startTime,
        todayGoal: studyLog?.data?.todayGoal ?? "",
        tasks,
        elapsedSeconds: 0,
      });

      startTimerInterval(referenceTime, baseSeconds);
    } catch {
      // 복원 실패 시 초기 상태 유지
    } finally {
      setIsRestoring(false);
    }
  }, [calculateInitialElapsed, startTimerInterval]);

  useEffect(() => {
    restoreActiveTimer();
  }, [restoreActiveTimer]);

  useEffect(() => {
    return () => {
      clearTimerInterval();
    };
  }, [clearTimerInterval]);

  const extractErrorMessage = useCallback((err: unknown): TimerError => {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const responseData = err.response?.data as
        | TimerConflictResponse
        | { error?: { message?: string } }
        | undefined;

      if (status === 409) {
        const conflictData = responseData as TimerConflictResponse | undefined;
        return {
          type: "conflict",
          message:
            conflictData?.error?.message ?? "이미 실행 중인 타이머가 있습니다.",
          existingTimerId: conflictData?.data?.timerId,
        };
      }

      const serverMessage = responseData?.error?.message;
      if (serverMessage) {
        return {
          type: "unknown",
          message: serverMessage,
        };
      }

      if (err.code === "ERR_NETWORK" || !err.response) {
        return {
          type: "network",
          message: "네트워크 연결을 확인해주세요.",
        };
      }
    }

    return {
      type: "unknown",
      message: "타이머 시작에 실패했습니다.",
    };
  }, []);

  const startTimer = useCallback(
    async (goal: string, taskContents: string[]) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await timerService.start({
          todayGoal: goal,
          tasks: taskContents.length > 0 ? taskContents : undefined,
        });

        const tasks: Task[] = taskContents.map((content, index) => ({
          id: `task-${index}-${Date.now()}`,
          content,
          isCompleted: false,
        }));

        setState({
          status: "in-progress",
          timerId: response.timerId,
          studyLogId: response.studyLogId,
          startTime: response.startTime,
          todayGoal: goal,
          tasks,
          elapsedSeconds: 0,
        });

        startTimerInterval(response.startTime, 0);
      } catch (err) {
        const timerError = extractErrorMessage(err);
        setError(timerError);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [startTimerInterval, extractErrorMessage],
  );

  const pauseTimer = useCallback(() => {
    clearTimerInterval();
    setState((prev) => ({
      ...prev,
      status: "paused",
    }));
  }, [clearTimerInterval]);

  const resumeTimer = useCallback(() => {
    const now = new Date().toISOString();

    setState((prev) => ({
      ...prev,
      status: "in-progress",
    }));
    startTimerInterval(now, state.elapsedSeconds);
  }, [startTimerInterval, state.elapsedSeconds]);

  const hours = Math.floor(state.elapsedSeconds / 3600);
  const minutes = Math.floor((state.elapsedSeconds % 3600) / 60);
  const seconds = state.elapsedSeconds % 60;

  return {
    status: state.status,
    timerId: state.timerId,
    studyLogId: state.studyLogId,
    todayGoal: state.todayGoal,
    tasks: state.tasks,
    hours,
    minutes,
    seconds,
    isLoading,
    isRestoring,
    error,
    startTimer,
    pauseTimer,
    resumeTimer,
    clearError,
  };
};
