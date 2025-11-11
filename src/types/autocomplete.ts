import type React from 'react';

export type AutocompleteVariant = 'ready' | 'typing' | 'noResult';

export interface AutocompleteProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  variant?: AutocompleteVariant;
  value?: string;
  options?: string[];
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectOption?: (option: string) => void;
  onAddNewItem?: () => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
