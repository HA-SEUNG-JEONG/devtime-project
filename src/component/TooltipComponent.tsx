import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const TooltipComponent = () => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger>
        <button className="typography-body-b bg-primary-0 cursor-pointer rounded-[5px] px-4 py-3 text-white">
          Hover
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Hover</TooltipContent>
    </Tooltip>
  );
};

export default TooltipComponent;
