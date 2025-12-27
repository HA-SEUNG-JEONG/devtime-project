import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import TimerAction from "./TimerAction";

const meta = {
  title: "TimerAction",
  component: TimerAction,
} satisfies Meta<typeof TimerAction>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ready: Story = {
  args: {
    onClick: fn(),
    variant: "ready",
  },
};

export const InProgress: Story = {
  args: {
    variant: "in-progress",
    onClick: fn(),
  },
};

export const Paused: Story = {
  args: {
    onClick: fn(),
    variant: "paused",
  },
};
