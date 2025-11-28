import React from 'react';

interface ModalProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const Modal = ({
  title,
  description,
  children,
  footer,
  className = '',
}: ModalProps) => {
  return (
    <div
      className={`flex flex-col w-full bg-white rounded-lg sm:rounded-xl lg:rounded-[20px] p-4 sm:p-6 lg:p-10 shadow-lg overflow-hidden ${className}`}
    >
      {/* Header */}
      {(title || description) && (
        <div className="flex flex-col gap-2 mb-4 sm:mb-6 lg:mb-8 shrink-0">
          {title && (
            <h1 className="text-24b lg:text-36b text-gray-900">{title}</h1>
          )}
          {description && (
            <p className="text-14m lg:text-16m text-gray-600 whitespace-pre-wrap">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Body */}
      <div className="flex-1 flex flex-col gap-4 sm:gap-5 lg:gap-6 min-h-0 overflow-hidden">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="flex flex-row justify-end gap-2 sm:gap-3 mt-6 sm:mt-8 lg:mt-10 shrink-0 overflow-x-hidden">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Modal;
