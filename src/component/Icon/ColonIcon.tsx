import type { IconProps } from "./types";

const ColonIcon = ({ size = 24, className }: IconProps) => {
  return (
    <svg
      width={size}
      height="112"
      viewBox="0 0 24 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="콜론"
    >
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <circle cx="12" cy="100" r="12" fill="currentColor" />
    </svg>
  );
};

export default ColonIcon;
