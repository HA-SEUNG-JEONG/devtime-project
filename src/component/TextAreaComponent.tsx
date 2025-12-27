import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextAreaComponentProps {
  placeholder?: string;
  className?: string;
}

const TextAreaComponent = ({
  placeholder,
  className,
  ...props
}: TextAreaComponentProps & React.ComponentProps<typeof Textarea>) => {
  return (
    <Textarea
      placeholder={placeholder}
      className={cn("typography-body-m text-gray-600", className)}
      {...props}
    />
  );
};

export default TextAreaComponent;
