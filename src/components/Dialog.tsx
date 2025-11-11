import React from 'react';
import Button from './Button';

export interface DialogProps {
  title: string;
  body?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  className?: string;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  body,
  cancelLabel = '취소',
  confirmLabel = '확인',
  onCancel,
  onConfirm,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-end p-4 sm:p-6 gap-4 sm:gap-6 w-full sm:w-[328px] lg:w-[400px] bg-white rounded-xl shadow-[0px_8px_8px_rgba(0,0,0,0.05)] ${className}`}
    >
      {/* Title and Body Container */}
      <div className="flex flex-col items-start gap-2 w-full">
        {/* Title */}
        <h2
          className={`w-full flex items-center ${
            body ? 'text-18sb sm:text-20sb' : 'text-16m sm:text-18m'
          }`}
        >
          {title}
        </h2>
        {/* Body */}
        {body && (
          <p className="w-full text-14m sm:text-16m text-gray-600">{body}</p>
        )}
      </div>

      {/* Buttons Container */}
      <div className="flex flex-row items-start gap-4 sm:gap-4">
        <Button priority="tertiary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button priority="primary" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
};

export default Dialog;
