export type AutocompleteVariant = 'ready' | 'typing' | 'noResult';

export interface AutocompleteProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  variant?: AutocompleteVariant;
  value?: string;
  options?: string[];
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectOption?: (option: string) => void;
  onAddNewItem?: () => void;
}
