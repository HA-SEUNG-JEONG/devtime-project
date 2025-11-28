export type TextAreaVariant = 'ready' | 'typing' | 'typed';

export interface TextAreaProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'onFocus' | 'onBlur'
  > {
  variant?: TextAreaVariant;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
}
