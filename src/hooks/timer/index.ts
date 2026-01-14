import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { timerService } from "@/services/timer";
import { useErrorModal } from "@/contexts/ErrorModalContext";
import type { Task } from "@/components/Timer/TaskItem";
import type { TimerConflictResponse, TaskInput } from "@/types/types";
import { useTimerClock } from "./useTimerClock";
import { useTimerPolling } from "./useTimerPolling";
import { useTimerRestore } from "./useTimerRestore";
import type { TimerState, TimerError } from "./types";
import { INITIAL_TIMER_STATE } from "./types";

export type {
  TimerStatus,
  TimerState,
  TimerError,
  TimerErrorType,
} from "./types";

interface UseTimerReturn {
  status: TimerState["status"];
  timerId: string | null;
  studyLogId: string | null;
  todayGoal: string;
  tasks: Task[];
  hours: number;
  minutes: number;
  seconds: number;
  elapsedSeconds: number;
  isLoading: boolean;
  isRestoring: boolean;
  error: TimerError | null;
  startTimer: (goal: string, taskContents: string[]) => Promise<void>;
  pauseTimer: () => Promise<void>;
  resumeTimer: () => void;
  resetTimer: () => Promise<void>;
  updateTasks: (tasks: Task[]) => Promise<void>;
  stopTimer: (review: string, tasks: Task[]) => Promise<void>;
  clearError: () => void;
}

const extractErrorFromAxios = (err: unknown): TimerError => {
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
      return { type: "unknown", message: serverMessage };
    }

    if (err.code === "ERR_NETWORK" || !err.response) {
      return { type: "network", message: "네트워크 연결을 확인해주세요." };
    }
  }

  return { type: "unknown", message: "타이머 시작에 실패했습니다." };
};

const normalizeSeconds = (value: number): number => {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }
  return Math.floor(value);
};

export const useTimer = (): UseTimerReturn => {
  const [state, setState] = useState<TimerState>(INITIAL_TIMER_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TimerError | null>(null);

  const { showError } = useErrorModal();

  const handleTick = useCallback((elapsedSeconds: number) => {
    setState((prev) => ({ ...prev, elapsedSeconds }));
  }, []);

  const clock = useTimerClock(handleTick);

  const handlePollingError = useCallback(() => {
    showError({
      title: "서버 동기화 실패",
      description: "타이머 상태를 서버에 저장하지 못했습니다.",
    });
  }, [showError]);

  const polling = useTimerPolling(clock.getElapsedSeconds, handlePollingError);

  const { isRestoring, restore } = useTimerRestore();

  // 타이머 복원
  useEffect(() => {
    const init = async () => {
      const result = await restore();
      if (result) {
        setState(result.state);
        clock.start(result.referenceTime, result.baseSeconds);
        if (result.state.timerId) {
          polling.start(result.state.timerId);
        }
      }
    };
    init();
  }, [restore, clock, polling]);

  // 언마운트 시 정리
  useEffect(() => {
    return () => {
      clock.stop();
      polling.stop();
    };
  }, [clock, polling]);

  const clearError = useCallback(() => {
    setError(null);
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

        clock.start(response.startTime, 0);
        polling.start(response.timerId);
      } catch (err) {
        const timerError = extractErrorFromAxios(err);
        setError(timerError);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [clock, polling],
  );

  const pauseTimer = useCallback(async () => {
    const elapsedSeconds = clock.getElapsedSeconds();
    const currentTimerId = state.timerId;

    clock.stop();
    polling.stop();

    setState((prev) => ({ ...prev, status: "paused" }));

    if (currentTimerId) {
      try {
        await polling.syncNow(currentTimerId, elapsedSeconds);
      } catch {
        showError({
          title: "일시정지 상태 저장 실패",
          description: "서버에 현재 상태를 저장하지 못했습니다.",
        });
      }
    }
  }, [clock, polling, state.timerId, showError]);

  const resumeTimer = useCallback(() => {
    const now = new Date().toISOString();
    const currentTimerId = state.timerId;
    const currentElapsed = state.elapsedSeconds;

    setState((prev) => ({ ...prev, status: "in-progress" }));

    clock.start(now, currentElapsed);

    if (currentTimerId) {
      polling.start(currentTimerId);
    }
  }, [clock, polling, state.timerId, state.elapsedSeconds]);

  const resetTimer = useCallback(async () => {
    const currentTimerId = state.timerId;
    const previousState = state;

    clock.stop();
    polling.stop();

    if (currentTimerId) {
      try {
        await timerService.deleteTimer(currentTimerId);
      } catch {
        showError({
          title: "타이머 초기화 실패",
          description: "서버에서 타이머를 삭제하지 못했습니다.",
        });
        if (previousState.status === "in-progress") {
          clock.start(
            previousState.startTime as string,
            previousState.elapsedSeconds,
          );
          polling.start(currentTimerId);
        }
        throw new Error("Failed to delete timer");
      }
    }

    setState(INITIAL_TIMER_STATE);
  }, [clock, polling, state, showError]);

  const updateTasks = useCallback(
    async (tasks: Task[]) => {
      const currentStudyLogId = state.studyLogId;
      if (!currentStudyLogId) {
        throw new Error("No active study log");
      }

      setIsLoading(true);
      try {
        const taskInputs: TaskInput[] = tasks.map((task) => ({
          content: task.content,
          isCompleted: task.isCompleted,
        }));

        await timerService.updateTasks(currentStudyLogId, { tasks: taskInputs });
        setState((prev) => ({ ...prev, tasks }));
      } catch {
        showError({
          title: "할 일 목록 저장 실패",
          description: "서버에 할 일 목록을 저장하지 못했습니다.",
        });
        throw new Error("Failed to update tasks");
      } finally {
        setIsLoading(false);
      }
    },
    [state.studyLogId, showError],
  );

  const stopTimer = useCallback(
    async (review: string, tasks: Task[]) => {
      const currentTimerId = state.timerId;
      if (!currentTimerId) {
        throw new Error("No active timer");
      }

      const elapsedSeconds = clock.getElapsedSeconds();
      const previousStatus = state.status;

      setIsLoading(true);
      clock.stop();
      polling.stop();

      try {
        const taskInputs: TaskInput[] = tasks.map((task) => ({
          content: task.content,
          isCompleted: task.isCompleted,
        }));

        await timerService.stopTimer(currentTimerId, {
          splitTimes: [
            {
              date: new Date().toISOString(),
              timeSpent: elapsedSeconds,
            },
          ],
          review,
          tasks: taskInputs,
        });

        setState(INITIAL_TIMER_STATE);
      } catch {
        showError({
          title: "타이머 종료 실패",
          description: "서버에서 타이머를 종료하지 못했습니다.",
        });
        if (previousStatus === "in-progress") {
          clock.start(new Date().toISOString(), elapsedSeconds);
          polling.start(currentTimerId);
        }
        setState((prev) => ({ ...prev, status: previousStatus }));
        throw new Error("Failed to stop timer");
      } finally {
        setIsLoading(false);
      }
    },
    [state.timerId, state.status, clock, polling, showError],
  );

  const normalizedElapsed = normalizeSeconds(state.elapsedSeconds);
  const hours = Math.floor(normalizedElapsed / 3600);
  const minutes = Math.floor((normalizedElapsed % 3600) / 60);
  const seconds = normalizedElapsed % 60;

  return {
    status: state.status,
    timerId: state.timerId,
    studyLogId: state.studyLogId,
    todayGoal: state.todayGoal,
    tasks: state.tasks,
    hours,
    minutes,
    seconds,
    elapsedSeconds: normalizedElapsed,
    isLoading,
    isRestoring,
    error,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    updateTasks,
    stopTimer,
    clearError,
  };
};
