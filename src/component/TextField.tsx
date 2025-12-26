
import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CustomButton } from "./CustomButton";
import { createContext, useContext, useMemo } from "react";

interface TextFieldContextValue {
  id: string;
  value?: string;
  defaultValue?: string;
}

const TextFieldContext = createContext<TextFieldContextValue | null>(
  null,
);

const useTextFieldContext = () => {
  const context = useContext(TextFieldContext);
  if (!context) {
    throw new Error("TextField subcomponents must be used within TextField");
  }
  return context;
};

interface TextFieldProps {
  id?: string;
  value?: string;
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
}

const TextField = ({
  id = "text-field",
  value,
  defaultValue,
  className,
  children,
}: TextFieldProps) => {
  const contextValue = useMemo(
    () => ({ id, value, defaultValue }),
    [id, value, defaultValue],
  );

  return (
    <TextFieldContext.Provider value={contextValue}>
      <div className={cn("flex flex-col gap-2", className)}>{children}</div>
    </TextFieldContext.Provider>
  );
};

interface TextFieldLabelProps {
  className?: string;
  children: React.ReactNode;
}

const TextFieldLabel = ({ className, children }: TextFieldLabelProps) => {
  const { id } = useTextFieldContext();

  return (
    <label
      htmlFor={id}
      className={`typography-body-m ${cn("text-gray-700", className)}`}
    >
      {children}
    </label>
  );
};

interface TextFieldInputProps extends Omit<
  React.ComponentProps<"input">,
  "id"
> {
  className?: string;
  hasButton?: boolean;
}

const TextFieldInput = ({
  className,
  hasButton = false,
  ...props
}: TextFieldInputProps) => {
  const { id } = useTextFieldContext();

  if (hasButton) {
    return (
      <InputGroup className="bg-gray-dark border-none">
        <InputGroupInput
          type="text"
          id={id}
          className={`text-border-300 typography-body-m ${cn(className)}`}
          {...props}
        />
      </InputGroup>
    );
  }

  return (
    <InputGroup className="bg-gray-dark mr-3 rounded-[5px]">
      <InputGroupInput
        type="text"
        id={id}
        className={cn(
          "placeholder:typography-body-m typography-body-m",
          className,
        )}
        {...props}
      />
    </InputGroup>
  );
};

interface TextFieldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  type?: "inline" | "external";
}

const TextFieldButton = ({
  children,
  onClick,
  disabled,
  className,
  variant = "secondary",
  type = "inline",
}: TextFieldButtonProps) => {
  const { value, defaultValue } = useTextFieldContext();
  const inputValue = value ?? defaultValue;

  if (type === "inline") {
    return (
      <InputGroupButton
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "typography-caption-m",
          !inputValue?.trim() ? "text-disabled" : "text-primary-0",
          className,
        )}
      >
        {children}
      </InputGroupButton>
    );
  }

  return (
    <CustomButton
      variant={variant}
      label={typeof children === "string" ? children : "Button"}
      onClick={onClick}
      disabled={disabled ?? !inputValue?.trim()}
      className={className}
    />
  );
};

interface TextBoxHelperTextProps {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "success" | "error" | "warning";
}

const TextFieldHelperText = ({
  className,
  children,
  variant = "default",
}: TextBoxHelperTextProps) => {
  const variantClasses = {
    default: "text-primary-0",
    success: "text-secondary-positive",
    error: "text-secondary-negative",
    warning: "text-secondary-notice",
  }[variant];

  return (
    <span className={cn("typography-body-s", variantClasses, className)}>
      {children}
    </span>
  );
};

TextField.Label = TextFieldLabel;
TextField.Input = TextFieldInput;
TextField.Button = TextFieldButton;
TextField.HelperText = TextFieldHelperText;

export default TextField;
