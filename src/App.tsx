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
    startTimer,
    pauseTimer,
    resumeTimer,
  } = useTimer();

  const handleStartClick = () => {
    setShowStartDialog(true);
  };

  const handleStartTimer = async (todayGoal: string, tasks: string[]) => {
    try {
      await startTimer(todayGoal, tasks);
      setShowStartDialog(false);
    } catch {
      showError({
        title: "타이머 시작에 실패했습니다.",
        description: "다시 시도해주세요.",
      });
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
