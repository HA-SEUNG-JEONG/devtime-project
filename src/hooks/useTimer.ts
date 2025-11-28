import { useState, useEffect, useRef, useCallback } from 'react';
import { api } from '@/utils/api';

export type TimerState = 'ready' | 'in-progress' | 'paused';

export interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

interface UseTimerReturn {
  timerState: TimerState;
  timerId: string | null;
  elapsedSeconds: number;
  todayGoal: string;
  tasks: Task[];
  startTimer: (goal: string, taskContents: string[]) => Promise<void>;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => Promise<void>;
  updateTasks: (newTasks: Task[]) => void;
  loadExistingTimer: () => Promise<void>;
}

export const useTimer = (): UseTimerReturn => {
  const [timerState, setTimerState] = useState<TimerState>('ready');
  const [timerId, setTimerId] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [todayGoal, setTodayGoal] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedSecondsRef = useRef<number>(0);

  // 타이머 시작 함수
  const startTimer = useCallback(
    async (goal: string, taskContents: string[]) => {
      try {
        // POST /api/timers API 호출
        const response = await api.post('/api/timers', {
          todayGoal: goal,
          tasks: taskContents,
        });

        if (!response.ok) {
          throw new Error('타이머 시작 API 호출 실패');
        }

        const data = await response.json();
        const newTimerId = data.timerId;

        // 상태 업데이트
        setTimerId(newTimerId);
        setTodayGoal(goal);
        setTasks(
          taskContents.map((content, index) => ({
            id: `${Date.now()}-${index}`,
            content,
            isCompleted: false,
          }))
        );
        setTimerState('in-progress');

        // 타이머 시작
        startTimeRef.current = Date.now();
        pausedSecondsRef.current = 0;
        setElapsedSeconds(0);
      } catch (error) {
        console.error('타이머 시작 실패:', error);
      }
    },
    []
  );

  // 기존 타이머 복구 함수
  const loadExistingTimer = useCallback(async () => {
    try {
      const response = await api.get('/api/timers');

      if (!response.ok) {
        // 타이머가 없으면 초기 상태 유지
        return;
      }

      const data = await response.json();

      if (!data || !data.timerId) {
        // 타이머 정보가 없으면 초기 상태 유지
        return;
      }

      // splitTimes 배열의 시간을 합산하여 총 경과 시간 계산 (ms)
      const totalElapsedMs =
        data.splitTimes?.reduce(
          (sum: number, splitTime: { timeSpent: number }) =>
            sum + splitTime.timeSpent,
          0
        ) || 0;
      const totalElapsedSeconds = Math.floor(totalElapsedMs / 1000);

      // 상태 복구
      setTimerId(data.timerId);
      setTodayGoal(data.todayGoal || '');
      setTasks(
        data.tasks?.map(
          (task: { content: string; isCompleted: boolean }, index: number) => ({
            id: `${Date.now()}-${index}`,
            content: task.content,
            isCompleted: task.isCompleted,
          })
        ) || []
      );
      setTimerState('in-progress');

      // 타이머 시간 복구 (현재 시간에서 경과 시간만큼 이전으로 설정)
      startTimeRef.current = Date.now() - totalElapsedSeconds * 1000;
      pausedSecondsRef.current = totalElapsedSeconds;
      setElapsedSeconds(totalElapsedSeconds);

      console.log('기존 타이머 복구 완료:', {
        timerId: data.timerId,
        elapsedSeconds: totalElapsedSeconds,
      });
    } catch (error) {
      console.error('기존 타이머 조회 실패:', error);
    }
  }, []);

  // 타이머 일시정지 함수
  const pauseTimer = useCallback(() => {
    if (timerState !== 'in-progress') return;

    setTimerState('paused');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // 현재까지 경과된 시간 저장
    if (startTimeRef.current) {
      const currentElapsed = Math.floor(
        (Date.now() - startTimeRef.current) / 1000
      );
      pausedSecondsRef.current = currentElapsed;
      setElapsedSeconds(currentElapsed);
    }
  }, [timerState]);

  // 타이머 재개 함수
  const resumeTimer = useCallback(() => {
    if (timerState !== 'paused') return;

    setTimerState('in-progress');
    // 일시정지 시점의 시간을 기준으로 다시 시작
    startTimeRef.current = Date.now() - pausedSecondsRef.current * 1000;
  }, [timerState]);

  // 타이머 초기화 함수
  const resetTimer = useCallback(async () => {
    try {
      // DELETE /api/timers/{timerId} API 호출
      if (timerId) {
        await api.delete(`/api/timers/${timerId}`);
      }

      // 상태 초기화
      setTimerState('ready');
      setTimerId(null);
      setElapsedSeconds(0);
      setTodayGoal('');
      setTasks([]);
      pausedSecondsRef.current = 0;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } catch (error) {
      console.error('타이머 초기화 실패:', error);
    }
  }, [timerId]);

  // 할 일 목록 업데이트 함수
  const updateTasks = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
  }, []);

  // 타이머 동작 (백그라운드에서도 계속 동작)
  useEffect(() => {
    if (timerState === 'in-progress') {
      // 타이머 시작
      intervalRef.current = window.setInterval(() => {
        if (startTimeRef.current) {
          const currentElapsed = Math.floor(
            (Date.now() - startTimeRef.current) / 1000
          );
          setElapsedSeconds(currentElapsed);
        }
      }, 1000);
    } else {
      // 타이머 중지
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState]);

  // Page Visibility API - 탭 활성화/비활성화 감지
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (timerState !== 'in-progress') return;

      if (document.hidden) {
        // 탭이 비활성화되면 setInterval 중지 (리소스 절약)
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        // 탭이 다시 활성화되면 경과 시간 재계산 후 setInterval 재시작
        if (startTimeRef.current && !intervalRef.current) {
          // 현재 경과 시간 즉시 업데이트
          const currentElapsed = Math.floor(
            (Date.now() - startTimeRef.current) / 1000
          );
          setElapsedSeconds(currentElapsed);

          // setInterval 재시작
          intervalRef.current = window.setInterval(() => {
            if (startTimeRef.current) {
              const elapsed = Math.floor(
                (Date.now() - startTimeRef.current) / 1000
              );
              setElapsedSeconds(elapsed);
            }
          }, 1000);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [timerState]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timerState,
    timerId,
    elapsedSeconds,
    todayGoal,
    tasks,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    updateTasks,
    loadExistingTimer,
  };
};
