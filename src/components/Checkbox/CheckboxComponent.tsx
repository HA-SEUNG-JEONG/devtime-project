import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxComponentProps {
  id?: string;
  className?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const CheckboxComponent = ({
  id,
  className,
  label,
  checked,
  disabled,
  onCheckedChange,
}: CheckboxComponentProps) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        className={className}
      />
      {label && (
        <Label htmlFor={id} className="typography-body-m">
          {label}
        </Label>
      )}
    </div>
  );
};

export default CheckboxComponent;
