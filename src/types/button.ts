export type ButtonPriority = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  priority?: ButtonPriority;
  children: React.ReactNode;
}
