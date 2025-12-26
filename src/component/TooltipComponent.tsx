import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface TooltipComponentProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delayDuration?: number;
}

const TooltipComponent = ({
  content,
  children,
  side,
  delayDuration,
}: TooltipComponentProps) => {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger>
        <button className="typography-body-b bg-primary-0 cursor-pointer rounded-[5px] px-4 py-3 text-white">
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent sideOffset={8} side={side}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipComponent;
