import ColonIcon from "@/components/Icon/ColonIcon";
import "./styles.css";

interface TimerProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const Timer = ({ hours, minutes, seconds }: TimerProps) => {
  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      <div className="border-primary-0 bg-linear text-primary-0 flex h-full w-full flex-col items-center justify-center rounded-lg border-2 px-1 pt-1 pb-4 text-[48px] sm:rounded-xl sm:px-2 sm:pt-2 sm:pb-6 sm:text-[80px] md:pb-9 md:text-[120px] lg:text-[154px]">
        {formatTime(hours)}
        <span className="typography-caption-r sm:typography-body-b">HOURS</span>
      </div>
      <ColonIcon className="text-primary-0 mx-2 sm:mx-4 md:mx-8 lg:mx-12" />
      <div className="border-primary-0 bg-linear text-primary-0 flex h-full w-full flex-col items-center justify-center rounded-lg border-2 px-1 pt-1 pb-4 text-[48px] sm:rounded-xl sm:px-2 sm:pt-2 sm:pb-6 sm:text-[80px] md:pb-9 md:text-[120px] lg:text-[154px]">
        {formatTime(minutes)}
        <span className="typography-caption-r sm:typography-body-b">MINUTES</span>
      </div>
      <ColonIcon className="text-primary-0 mx-2 sm:mx-4 md:mx-8 lg:mx-12" />
      <div className="border-primary-0 bg-linear text-primary-0 flex h-full w-full flex-col items-center justify-center rounded-lg border-2 px-1 pt-1 pb-4 text-[48px] sm:rounded-xl sm:px-2 sm:pt-2 sm:pb-6 sm:text-[80px] md:pb-9 md:text-[120px] lg:text-[154px]">
        {formatTime(seconds)}
        <span className="typography-caption-r sm:typography-body-b">SECONDS</span>
      </div>
    </div>
  );
};

export default Timer;
