import ColonIcon from "../../components/Icon/ColonIcon";
import "./styles.css";

interface TimerProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const Timer = ({ hours, minutes, seconds }: TimerProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="border-primary-0 bg-linear text-primary-0 flex h-full w-full flex-col items-center justify-center rounded-xl border-2 px-2 pt-2 pb-9 text-[154px]">
        {hours}
        <span className="typography-body-b">HOURS</span>
      </div>
      <ColonIcon className="text-primary-0 mx-12" />
      <div className="border-primary-0 bg-linear text-primary-0 flex h-full w-full flex-col items-center justify-center rounded-xl border-2 px-2 pt-2 pb-9 text-[154px]">
        {minutes}
        <span className="typography-body-b">MINUTES</span>
      </div>
      <ColonIcon className="text-primary-0 mx-12" />
      <div className="border-primary-0 bg-linear text-primary-0 flex h-full w-full flex-col items-center justify-center rounded-xl border-2 px-2 pt-2 pb-9 text-[154px]">
        {seconds}
        <span className="typography-body-b">SECONDS</span>
      </div>
    </div>
  );
};

export default Timer;
