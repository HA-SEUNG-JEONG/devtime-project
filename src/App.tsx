import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Timer from "./component/Timer/Timer";
import TimerAction from "./components/Timer/TimerAction";
import TimerStartDialog from "./components/Timer/TimerStartDialog";
import { useTimer } from "./hooks/useTimer";
import { useErrorModal } from "./contexts/ErrorModalContext";

function App() {
  const { showError } = useErrorModal();
  const [showStartDialog, setShowStartDialog] = useState(false);
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
    clearError,
  } = useTimer();

  const handleStartClick = () => {
    setShowStartDialog(true);
  };

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
        />
      </main>

      <TimerStartDialog
        open={showStartDialog}
        onOpenChange={setShowStartDialog}
        onStart={handleStartTimer}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
