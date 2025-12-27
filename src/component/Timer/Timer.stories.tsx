import type { Meta, StoryObj } from "@storybook/react-vite";
import Timer from "./Timer";

const meta = {
  title: "Timer",
  component: Timer,
} satisfies Meta<typeof Timer>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
};
