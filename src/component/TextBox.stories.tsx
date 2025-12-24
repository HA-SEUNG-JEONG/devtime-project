import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TextBox from "./TextBox";

const meta = {
  title: "Component/TextBox",
  component: TextBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    button: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    onChange: {
      action: "changed",
    },
    onButtonClick: {
      action: "button clicked",
    },
  },
  args: {
    placeholder: "Placeholder",
  },
} satisfies Meta<typeof TextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputWithButton: Story = {
  args: {
    button: "추가",
    placeholder: "Placeholder",
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <TextBox
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const InputWithoutIcon: Story = {
  args: {
    placeholder: "Placeholder",
    onButtonClick: () => console.log("추가 버튼 클릭"),
  },
  render: (args) => {
    const [value, setValue] = useState("");
    const { button, ...restArgs } = args;
    return (
      <TextBox
        {...restArgs}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};
