import { Textarea } from "@/components/ui/textarea";

interface TextAreaComponentProps {
  placeholder?: string;
}

const TextAreaComponent = ({ placeholder }: TextAreaComponentProps) => {
  return (
    <Textarea
      placeholder={placeholder}
      className="typography-body-m w-full text-gray-600"
    />
  );
};

export default TextAreaComponent;
