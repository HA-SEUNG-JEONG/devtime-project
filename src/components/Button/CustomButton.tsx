import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  type?: "button" | "submit";
}

export const CustomButton = ({
  label,
  type = "button",
  variant = "primary",
  disabled = false,
  className,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const baseClasses = "px-4 py-3 rounded-[5px]";

  return (
    <Button
      type={type}
      variant={variant}
      disabled={disabled}
      className={`typography-subtitle-s ${cn(
        baseClasses,
        fullWidth && "w-full",
        className,
      )}`}
      {...props}
    >
      {label}
    </Button>
  );
};
