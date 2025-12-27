import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { CustomButton } from "./CustomButton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: CustomButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof CustomButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: "Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    label: "Button",
    variant: "tertiary",
  },
};
