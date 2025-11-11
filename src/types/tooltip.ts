export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: TooltipPosition;
  className?: string;
}

