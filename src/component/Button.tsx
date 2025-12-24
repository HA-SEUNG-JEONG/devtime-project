import { cn } from "@/lib/utils";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  className?: string;
}

/** Primary UI component for user interaction */
export const Button = ({
  label,
  variant = "primary",
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const baseClasses = "px-4 py-3 rounded-[5px]";
  const variantClasses = {
    primary:
      "bg-primary-0 text-white disabled:bg-disabled disabled:text-border-300 disabled:cursor-not-allowed hover:bg-primary-10 hover:cursor-pointer active:bg-primary-10 focus:border-secondary-fuchsia focus:bg-primary-0 focus:border-[1.5px] focus:border-solid",
    secondary:
      "bg-primary-10 text-primary-0 disabled:bg-gray-200 disabled:text-disabled disabled:cursor-not-allowed hover:bg-[#4C79FF1A] hover:cursor-pointer active:bg-[#4C79FF1A] focus:border-secondary-fuchsia focus:bg-active focus:border-[1.5px] focus:border-solid",
    tertiary:
      "bg-gray-50 text-primary-0 disabled:bg-gray-200 disabled:text-disabled disabled:cursor-not-allowed hover:bg-[#0000001A] hover:cursor-pointer active:bg-[#0000001A] focus:border-secondary-fuchsia focus:bg-gray-50  focus:border-[1.5px] focus:border-solid"
  }[variant];

  return (
    <button
      className={`text-body-b ${cn(baseClasses, "w-full", variantClasses, className)}`}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};
