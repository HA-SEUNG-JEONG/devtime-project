import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TooltipComponentProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delayDuration?: number;
  sideOffset?: number;
  className?: string;
}

const TooltipComponent = ({
  content,
  children,
  side,
  delayDuration,
  sideOffset,
  className,
}: TooltipComponentProps) => {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>
        <button type="button" className={cn(className)}>
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent sideOffset={sideOffset} side={side}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipComponent;
