import type { Meta, StoryObj } from "@storybook/react-vite";
import TextAreaComponent from "./TextAreaComponent";

const meta = {
  title: "Components/TextArea",
  component: TextAreaComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextAreaComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type your message here....",
  },
};
