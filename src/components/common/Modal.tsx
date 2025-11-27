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
      className={`flex flex-col w-[600px] bg-white rounded-[20px] p-10 shadow-lg ${className}`}
    >
      {/* Header */}
      {(title || description) && (
        <div className="flex flex-col gap-2 mb-8">
          {title && <h1 className="text-36b text-gray-900">{title}</h1>}
          {description && (
            <p className="text-16m text-gray-600 whitespace-pre-wrap">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Body */}
      <div className="flex-1 flex flex-col gap-6">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="flex flex-row justify-end gap-3 mt-10">{footer}</div>
      )}
    </div>
  );
};

export default Modal;
