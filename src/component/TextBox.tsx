import { Button } from "./Button";
import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export interface TextBoxProps {
  id?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  button?: string;
  onButtonClick?: () => void;
  buttonVariant?: "primary" | "secondary" | "tertiary";
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  disabled?: boolean;
}

const TextBox = ({
  id = "text-box",
  placeholder = "Placeholder",
  value,
  defaultValue,
  onChange,
  button,
  onButtonClick,
  buttonVariant = "secondary",
  className,
  inputClassName,
  buttonClassName,
  disabled = false,
}: TextBoxProps) => {
  const inputValue = value ?? defaultValue;
  if (button) {
    return (
      <label
        htmlFor={id}
        className={cn("flex items-center justify-between", className)}
      >
        <InputGroup className="bg-gray-dark border-none">
          <InputGroupInput
            type="text"
            id={id}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            className={cn("text-border-300 text-body-m", inputClassName)}
          />
          <InputGroupButton
            onClick={onButtonClick}
            disabled={disabled}
            className={cn(
              "text-base font-bold text-body-b",
              inputValue && inputValue.trim()
                ? "text-primary-0"
                : "text-disabled",
              buttonClassName,
            )}
          >
            {button}
          </InputGroupButton>
        </InputGroup>
      </label>
    );
  }

  return (
    <label htmlFor={id} className={cn("flex", className)}>
      <InputGroup className="bg-gray-dark mr-3 rounded-[5px]">
        <InputGroupInput
          type="text"
          id={id}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          className={cn("text-border-300 text-body-m", inputClassName)}
        />
      </InputGroup>
      {onButtonClick && (
        <Button
          variant={buttonVariant}
          label="Button"
          onClick={onButtonClick}
          disabled={disabled}
        />
      )}
    </label>
  );
};

export default TextBox;
