import type { IconProps } from "./types";

const PlusIcon = ({ size = 24, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="추가"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0001 4.05005C12.4143 4.05005 12.75 4.38584 12.75 4.80005V11.25H19.2C19.6143 11.25 19.95 11.5858 19.95 12C19.95 12.4143 19.6143 12.75 19.2 12.75H12.75V19.2C12.75 19.6143 12.4143 19.95 12 19.95C11.5858 19.95 11.25 19.6143 11.25 19.2L11.25 12.75H4.80005C4.38584 12.75 4.05005 12.4143 4.05005 12C4.05005 11.5858 4.38584 11.25 4.80005 11.25H11.25L11.2501 4.80005C11.2501 4.38584 11.5858 4.05005 12.0001 4.05005Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default PlusIcon;
