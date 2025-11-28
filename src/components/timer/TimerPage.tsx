import { useEffect } from 'react';
import { useTimer } from '@/hooks/useTimer';
import Timer from '@/components/common/Timer';
import TimerAction from '@/components/common/TimerAction';
import NavBar from '../common/NavBar';

const TimerPage = () => {
  const {
    timerState,
    elapsedSeconds,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    loadExistingTimer,
  } = useTimer();

  // 페이지 마운트 시 기존 타이머 확인
  useEffect(() => {
    loadExistingTimer();
  }, [loadExistingTimer]);

  // 초를 시간, 분, 초로 변환
  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  const handleStart = async (goal: string, taskContents: string[]) => {
    await startTimer(goal, taskContents);
  };

  const handlePause = () => {
    if (timerState === 'in-progress') {
      pauseTimer();
    } else if (timerState === 'paused') {
      resumeTimer();
    }
  };

  const handleReset = async () => {
    await resetTimer();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar />
      <h1 className="mt-24 mb-[10px] text-7xl font-bold text-indigo">
        WELCOME
      </h1>
      <span className="text-14r mb-[50px] text-indigo">
        DevTime을 사용하려면 로그인이 필요합니다.
      </span>
      <div className="mb-20">
        <Timer hours={hours} minutes={minutes} seconds={seconds} />
      </div>
      <TimerAction
        state={timerState}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
      />
    </div>
  );
};

export default TimerPage;
