import type { Meta, StoryObj } from "@storybook/react";
import TextBox from "./TextBox";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "./Button";

const meta = {
  title: "Component/TextBox",
  component: TextBox,
} satisfies Meta<typeof TextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputWithButton: Story = {
  args: {
    button: "추가",
  },
  render: () => (
    <label htmlFor="text-box" className="flex items-center justify-between">
      <InputGroup className="border-none">
        <InputGroupInput type="text" id="text-box" placeholder="Placeholder" />

        <InputGroupButton>추가!</InputGroupButton>
      </InputGroup>
    </label>
  ),
};
export const InputWithoutIcon: Story = {
  render: () => (
    <label htmlFor="text-box" className="flex items-center justify-between">
      <InputGroup className="bg-gray-dark mr-3 rounded-[5px]">
        <InputGroupInput type="text" id="text-box" placeholder="Placeholder" />
      </InputGroup>
      <Button variant="primary" label="추가!" />
    </label>
  ),
};
