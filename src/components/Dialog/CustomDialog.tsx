import * as React from "react";
import { createContext, useContext } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomButton } from "@/components/Button/CustomButton";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

// Context
interface CustomDialogContextValue {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CustomDialogContext = createContext<CustomDialogContextValue | null>(
  null,
);

const useCustomDialogContext = () => {
  const context = useContext(CustomDialogContext);
  if (!context) {
    throw new Error(
      "CustomDialog 컴포넌트는 CustomDialog 내부에서 사용해야 합니다.",
    );
  }
  return context;
};

// Root Component
interface CustomDialogRootProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const CustomDialogRoot = ({
  open,
  onOpenChange,
  children,
}: CustomDialogRootProps) => {
  return (
    <CustomDialogContext.Provider value={{ open, onOpenChange }}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {children}
      </Dialog>
    </CustomDialogContext.Provider>
  );
};

// Trigger
interface CustomDialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const CustomDialogTrigger = ({
  children,
  asChild = true,
  className,
}: CustomDialogTriggerProps) => {
  return (
    <DialogTrigger asChild={asChild} className={className}>
      {asChild ? (
        children
      ) : (
        <button
          type="button"
          className={cn(
            "typography-body-b bg-primary-0 cursor-pointer rounded-[5px] px-4 py-3 text-white",
            className,
          )}
        >
          {children}
        </button>
      )}
    </DialogTrigger>
  );
};

// Content
interface CustomDialogContentProps {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

const CustomDialogContent = ({
  children,
  className,
  showCloseButton = false,
}: CustomDialogContentProps) => {
  return (
    <DialogContent
      showCloseButton={showCloseButton}
      className={cn("sm:max-w-md", className)}
    >
      <VisuallyHidden>
        <DialogTitle>Dialog</DialogTitle>
      </VisuallyHidden>
      {children}
    </DialogContent>
  );
};

// Header
interface CustomDialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CustomDialogHeader = ({
  children,
  className,
}: CustomDialogHeaderProps) => {
  return <DialogHeader className={className}>{children}</DialogHeader>;
};

// Title
interface CustomDialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CustomDialogTitle = ({ children, className }: CustomDialogTitleProps) => {
  return (
    <DialogTitle className={cn("typography-title-s text-gray-800", className)}>
      {children}
    </DialogTitle>
  );
};

// Description
interface CustomDialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const CustomDialogDescription = ({
  children,
  className,
}: CustomDialogDescriptionProps) => {
  return (
    <DialogDescription
      className={cn("typography-body-m text-gray-600", className)}
    >
      {children}
    </DialogDescription>
  );
};

// Body (for custom content like forms)
interface CustomDialogBodyProps {
  children: React.ReactNode;
  className?: string;
}

const CustomDialogBody = ({ children, className }: CustomDialogBodyProps) => {
  return <div className={cn("py-4", className)}>{children}</div>;
};

// Footer
interface CustomDialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CustomDialogFooter = ({
  children,
  className,
}: CustomDialogFooterProps) => {
  return (
    <DialogFooter className={cn("gap-2", className)}>{children}</DialogFooter>
  );
};

// Cancel Button
interface CancelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const CancelButton = ({
  children,
  onClick,
  disabled,
  className,
}: CancelButtonProps) => {
  return (
    <DialogClose asChild>
      <CustomButton
        variant="secondary"
        label={typeof children === "string" ? children : "취소"}
        onClick={onClick}
        disabled={disabled}
        className={className}
      />
    </DialogClose>
  );
};

// Confirm Button
interface ConfirmButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "danger";
  disabled?: boolean;
  className?: string;
}

const ConfirmButton = ({
  children,
  onClick,
  variant = "default",
  disabled,
  className,
}: ConfirmButtonProps) => {
  const dangerClassName =
    variant === "danger"
      ? "bg-secondary-negative hover:bg-secondary-negative/90"
      : "";

  return (
    <DialogClose asChild>
      <CustomButton
        variant="primary"
        label={typeof children === "string" ? children : "확인"}
        onClick={onClick}
        disabled={disabled}
        className={cn(dangerClassName, className)}
      />
    </DialogClose>
  );
};

// Close wrapper
interface CustomDialogCloseProps {
  children: React.ReactNode;
  asChild?: boolean;
}

const CustomDialogClose = ({
  children,
  asChild = true,
}: CustomDialogCloseProps) => {
  return <DialogClose asChild={asChild}>{children}</DialogClose>;
};

// Compound Component
const CustomDialog = Object.assign(CustomDialogRoot, {
  Trigger: CustomDialogTrigger,
  Content: CustomDialogContent,
  Header: CustomDialogHeader,
  Title: CustomDialogTitle,
  Description: CustomDialogDescription,
  Body: CustomDialogBody,
  Footer: CustomDialogFooter,
  CancelButton: CancelButton,
  ConfirmButton: ConfirmButton,
  Close: CustomDialogClose,
});

export { CustomDialog, useCustomDialogContext };
