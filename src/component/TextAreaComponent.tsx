import { Textarea } from "@/components/ui/textarea";

interface TextAreaComponentProps {
  placeholder?: string;
}

const TextAreaComponent = ({ placeholder }: TextAreaComponentProps) => {
  return <Textarea placeholder={placeholder} />;
};

export default TextAreaComponent;
