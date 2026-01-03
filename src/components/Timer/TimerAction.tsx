import { useState } from "react";
import FinishIcon from "../../components/Icon/FinishIcon";
import PauseIcon from "../../components/Icon/PauseIcon";
import ResetIcon from "../Icon/ResetIcon";
import StartIcon from "../../components/Icon/StartIcon";
import TodoIcon from "../Icon/TodoIcon";
import { useAuth } from "@/contexts/AuthContext";
import { LoginRequiredModal } from "../LoginRequiredModal";
import { cn } from "@/lib/utils";

interface TimerActionProps {
  variant: "ready" | "in-progress" | "paused";
  onStart?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onFinish?: () => void;
  onTodoClick?: () => void;
  onResetClick?: () => void;
  disabled?: boolean;
}

const TimerAction = ({
  variant,
  onStart,
  onPause,
  onResume,
  onFinish,
  onTodoClick,
  onResetClick,
  disabled = false,
}: TimerActionProps) => {
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isStartIconDisabled = variant === "in-progress";
  const isPauseIconDisabled = variant === "paused" || variant === "ready";
  const isOtherIconsDisabled = variant === "ready";

  const getIconClassName = (iconDisabled: boolean) => {
    return iconDisabled || disabled ? "text-primary-10" : "text-primary-0";
  };

  const getIconDisabled = (iconDisabled: boolean) => {
    return iconDisabled || disabled;
  };

  const handleIconClick = (icon: "start" | "pause" | "finish") => {
    if (disabled) return;

    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (icon === "start" && !isStartIconDisabled) {
      if (variant === "paused") {
        onResume?.();
      } else {
        onStart?.();
      }
    } else if (icon === "pause" && !isPauseIconDisabled) {
      onPause?.();
    } else if (icon === "finish" && !isOtherIconsDisabled) {
      onFinish?.();
    }
  };

  const handleTodoClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    onTodoClick?.();
  };

  const handleResetClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    onResetClick?.();
  };

  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex gap-8 sm:gap-12 md:gap-16 lg:gap-[80px]">
        <StartIcon
          onClick={() => handleIconClick("start")}
          disabled={getIconDisabled(isStartIconDisabled)}
          className={getIconClassName(isStartIconDisabled)}
        />
        <PauseIcon
          onClick={() => handleIconClick("pause")}
          disabled={getIconDisabled(isPauseIconDisabled)}
          className={getIconClassName(isPauseIconDisabled)}
        />
        <FinishIcon
          onClick={() => handleIconClick("finish")}
          disabled={getIconDisabled(isOtherIconsDisabled)}
          className={cn(getIconClassName(isOtherIconsDisabled), "mr-[134px]")}
        />
      </div>
      {variant !== "ready" && (
        <div className="flex gap-4 sm:gap-6">
          <TodoIcon
            className="text-primary-0 size-16 rounded-full bg-white p-2"
            onClick={handleTodoClick}
          />
          <ResetIcon
            className="text-primary-0 size-16 rounded-full bg-white p-2"
            onClick={handleResetClick}
          />
        </div>
      )}

      <LoginRequiredModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
      />
    </div>
  );
};

export default TimerAction;
