import { useState, useEffect, useCallback } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Timer from "./component/Timer/Timer";
import TimerAction from "./components/Timer/TimerAction";
import TimerStartDialog from "./components/Timer/TimerStartDialog";
import TimerResetDialog from "./components/Timer/TimerResetDialog";
import { useTimer } from "./hooks/useTimer";
import { useErrorModal } from "./contexts/ErrorModalContext";

function App() {
  const { showError } = useErrorModal();
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const {
    status,
    todayGoal,
    hours,
    minutes,
    seconds,
    isLoading,
    error,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    clearError,
  } = useTimer();

  const handleStartClick = () => {
    setShowStartDialog(true);
  };

  const handleResetClick = () => {
    setShowResetDialog(true);
  };

  const handleResetConfirm = async () => {
    setIsResetting(true);
    try {
      await resetTimer();
    } catch {
      // 에러는 useTimer 훅 내부에서 처리됨
    } finally {
      setIsResetting(false);
      setShowResetDialog(false);
    }
  };

  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (status === "in-progress" || status === "paused") {
        e.preventDefault();
      }
    },
    [status],
  );

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  const handleStartTimer = async (todayGoal: string, tasks: string[]) => {
    try {
      await startTimer(todayGoal, tasks);
      setShowStartDialog(false);
    } catch {
      const errorTitle =
        error?.type === "conflict"
          ? "이미 실행 중인 타이머가 있습니다"
          : "타이머 시작에 실패했습니다";
      const errorDescription =
        error?.type === "conflict"
          ? "기존 타이머를 종료한 후 다시 시도해주세요."
          : (error?.message ?? "다시 시도해주세요.");

      showError({
        title: errorTitle,
        description: errorDescription,
      });
      clearError();
    }
  };

  return (
    <div className="bg-background-timer flex min-h-screen flex-col px-4 py-4 sm:px-6 md:px-8 lg:px-12">
      <NavBar />
      <main className="flex flex-1 flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12">
        {todayGoal && (
          <h2 className="text-primary-0 text-7xl font-bold">{todayGoal}</h2>
        )}
        <Timer hours={hours} minutes={minutes} seconds={seconds} />
        <TimerAction
          variant={status}
          onStart={handleStartClick}
          onPause={pauseTimer}
          onResume={resumeTimer}
          onResetClick={handleResetClick}
        />
      </main>

      <TimerStartDialog
        open={showStartDialog}
        onOpenChange={setShowStartDialog}
        onStart={handleStartTimer}
        isLoading={isLoading}
      />

      <TimerResetDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        onConfirm={handleResetConfirm}
        isLoading={isResetting}
      />
    </div>
  );
}

export default App;
