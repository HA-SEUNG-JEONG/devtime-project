import type React from 'react';

export type InputLabelVariant = 'placeholder' | 'typing' | 'typed';

export interface InputLabelProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'variant'> {
  variant?: 'placeholder' | 'typing' | 'typed';
  value?: string;
  placeholder?: string;
  showAddButton?: boolean;
  buttonText?: string;
  helperText?: string;
  maxLength?: number;
  onButtonClick?: () => void;
  onHelperTextClick?: () => void;
}
