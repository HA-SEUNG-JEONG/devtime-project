import { useEffect, useState } from "react";
import FinishIcon from "../../components/Icon/FinishIcon";
import PauseIcon from "../../components/Icon/PauseIcon";
import ResetIcon from "../Icon/ResetIcon";
import StartIcon from "../../components/Icon/StartIcon";
import TodoIcon from "../Icon/TodoIcon";

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

  const checkCurrentVariant = (variant: "ready" | "in-progress" | "paused") => {
    return variant === "ready" ? "text-disabled" : "text-primary-0";
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-[80px]">
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
      <div className="flex gap-6">
        <TodoIcon
          disabled={currentVariant === "ready"}
          className={checkCurrentVariant(currentVariant)}
        />
        <ResetIcon
          disabled={currentVariant === "ready"}
          className={checkCurrentVariant(currentVariant)}
        />
      </div>
    </div>
  );
};

export default TimerAction;
