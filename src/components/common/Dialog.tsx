import React from 'react';
import {
  Dialog as DialogRoot,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Button from './Button';

export interface DialogProps {
  open?: boolean;
  title: string;
  body?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  title,
  body,
  cancelLabel = '취소',
  confirmLabel = '확인',
  onCancel,
  onConfirm,
  onOpenChange,
  className = '',
}) => {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange?.(false);
  };

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`flex flex-col p-4 sm:p-6 gap-4 sm:gap-6 w-full sm:w-[328px] lg:w-[400px] ${className}`}
      >
        <DialogHeader className="items-start gap-2">
          <DialogTitle
            className={`w-full flex items-center ${
              body ? 'text-18sb sm:text-20sb' : 'text-16m sm:text-18m'
            }`}
          >
            {title}
          </DialogTitle>
          {body && (
            <DialogDescription className="w-full text-14m sm:text-16m text-gray-600">
              {body}
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="flex-row items-start gap-4 sm:gap-4 sm:justify-end">
          <Button priority="tertiary" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button priority="primary" onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default Dialog;
