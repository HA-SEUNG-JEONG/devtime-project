import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip";
import { Button } from "./Button";

const TooltipComponent = () => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button label="Hover" variant="primary" />
      </TooltipTrigger>
      <TooltipContent>Hover</TooltipContent>
    </Tooltip>
  );
};

export default TooltipComponent;
