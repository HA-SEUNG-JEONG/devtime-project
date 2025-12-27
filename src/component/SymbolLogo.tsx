import type { IconProps } from "./Icon/types";

const SymbolLogo = ({ size = 42, className }: IconProps) => {
  return (
    <svg
      width={size}
      height="20"
      viewBox="0 0 42 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="심볼 로고"
      role="img"
    >
      <g clipPath="url(#clip0_40000429_8915)">
        <path
          d="M26.3271 1.44922L20.4736 20L15.6797 18.5508L21.5332 0L26.3271 1.44922ZM12.5859 4.93262L7.16504 10.1367L12.5859 15.3398L9.07324 18.8457L0 10.1367L9.07324 1.42676L12.5859 4.93262ZM42 10.1367L32.9268 18.8457L29.4141 15.3398L34.835 10.1367L29.4141 4.93262L32.9268 1.42676L42 10.1367Z"
          fill="white"
          fillOpacity="0.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_40000429_8915">
          <rect width={size} height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SymbolLogo;
