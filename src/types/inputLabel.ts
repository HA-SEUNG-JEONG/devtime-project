import type React from 'react';

export type InputLabelVariant = 'placeholder' | 'typing' | 'typed';

export interface InputLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: InputLabelVariant;
  value?: string;
  placeholder?: string;
  showAddButton?: boolean;
  buttonText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
