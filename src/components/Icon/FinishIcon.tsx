import type { IconProps } from "./types";

interface FinishIconProps extends IconProps {
  onClick?: () => void;
}

const FinishIcon = ({
  size = 100,
  className,
  disabled = false,
  onClick,
}: FinishIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className || ""}`}
      aria-label="완료"
      onClick={disabled ? undefined : onClick}
    >
      <path
        d="M0 8C0 3.58172 3.58172 0 8 0H92C96.4183 0 100 3.58172 100 8V92C100 96.4183 96.4183 100 92 100H8C3.58172 100 0 96.4183 0 92V8Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default FinishIcon;
