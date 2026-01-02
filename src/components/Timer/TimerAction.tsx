import { useEffect, useState } from "react";
import FinishIcon from "../../components/Icon/FinishIcon";
import PauseIcon from "../../components/Icon/PauseIcon";
import ResetIcon from "../Icon/ResetIcon";
import StartIcon from "../../components/Icon/StartIcon";
import TodoIcon from "../Icon/TodoIcon";
import { useAuth } from "@/contexts/AuthContext";
import { LoginRequiredModal } from "../LoginRequiredModal";

interface TimerActionProps {
  variant: "ready" | "in-progress" | "paused";
  onClick?: () => void;
  disabled?: boolean;
}

const TimerAction = ({
  variant,
  onClick,
  disabled = false,
}: TimerActionProps) => {
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<
    "ready" | "in-progress" | "paused"
  >(variant);

  useEffect(() => {
    setCurrentVariant(variant);
  }, [variant]);

  const isStartIconDisabled = currentVariant === "in-progress";
  const isPauseIconDisabled =
    currentVariant === "paused" || currentVariant === "ready";
  const isOtherIconsDisabled = currentVariant === "ready";

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
      setCurrentVariant("in-progress");
      onClick?.();
    } else if (icon === "pause" && !isPauseIconDisabled) {
      setCurrentVariant("paused");
      onClick?.();
    } else if (icon === "finish" && !isOtherIconsDisabled) {
      setCurrentVariant("ready");
      onClick?.();
    }
  };

  const handleTodoClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
  };

  const handleResetClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
  };

  return (
    <div className="flex items-center justify-between">
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
          className={getIconClassName(isOtherIconsDisabled)}
        />
      </div>
      {currentVariant !== "ready" && (
        <div className="flex gap-4 sm:gap-6">
          <TodoIcon
            className="text-primary-0"
            onClick={handleTodoClick}
            size={36}
          />
          <ResetIcon
            className="text-primary-0"
            onClick={handleResetClick}
            size={36}
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
