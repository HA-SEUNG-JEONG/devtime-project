import type { Task } from "@/components/Timer/TaskItem";

export type TimerStatus = "ready" | "in-progress" | "paused";

export interface TimerState {
  status: TimerStatus;
  timerId: string | null;
  studyLogId: string | null;
  startTime: string | null;
  todayGoal: string;
  tasks: Task[];
  elapsedSeconds: number;
}

export const INITIAL_TIMER_STATE: TimerState = {
  status: "ready",
  timerId: null,
  studyLogId: null,
  startTime: null,
  todayGoal: "",
  tasks: [],
  elapsedSeconds: 0,
};

export type TimerErrorType = "conflict" | "network" | "unknown";

export interface TimerError {
  type: TimerErrorType;
  message: string;
  existingTimerId?: string;
}
