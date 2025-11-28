import React from 'react';
import {
  Button as ShadcnButton,
  type ButtonProps as ShadcnButtonProps,
} from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ButtonPriority = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps extends Omit<ShadcnButtonProps, 'variant'> {
  priority?: ButtonPriority;
}

const Button: React.FC<ButtonProps> = ({
  priority = 'primary',
  className,
  onClick,
  ...props
}) => {
  // priority를 shadcn variant로 매핑
  const variantMap: Record<ButtonPriority, ShadcnButtonProps['variant']> = {
    primary: 'default',
    secondary: 'secondary',
    tertiary: 'outline',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 더블 클릭 시 자동 blur 처리 유지
    if (e.detail === 2) {
      e.currentTarget.blur();
    }
    onClick?.(e);
  };

  return (
    <ShadcnButton
      variant={variantMap[priority]}
      className={cn(className)}
      onClick={handleClick}
      {...props}
    />
  );
};

export default Button;
