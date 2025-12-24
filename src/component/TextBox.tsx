import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

const TextBox = () => {
  return (
    <>
      <label htmlFor="text-box" className="flex items-center justify-between">
        <InputGroup className="border-none">
          <InputGroupInput
            type="text"
            id="text-box"
            placeholder="Placeholder"
          />

          <InputGroupButton>추가!</InputGroupButton>
        </InputGroup>
      </label>
    </>
  );
};

export default TextBox;
