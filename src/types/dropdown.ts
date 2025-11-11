export type DropdownVariant =
  | 'unselected'
  | 'selected'
  | 'selecting'
  | 'scrollSelecting'
  | 'reselecting';

export interface DropdownProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'onSelect' | 'onToggle'
  > {
  variant?: DropdownVariant;
  label?: string;
  value?: string;
  placeholder?: string;
  options?: string[];
  selectedIndex?: number;
  className?: string;
  onSelect?: (option: string, index: number) => void;
  onToggle?: (isOpen: boolean) => void;
}
