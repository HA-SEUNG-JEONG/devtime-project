import type { Meta, StoryObj } from "@storybook/react-vite";
import TooltipComponent from "./TooltipComponent";

const meta = {
  title: "Components/Tooltip",
  component: TooltipComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TooltipComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSideBottom: Story = {
  args: {
    content: "Tooltip Content",
    children: "Hover",
    side: "bottom",
    delayDuration: 0,
    sideOffset: 8,
  },
};

export const DefaultSideTop: Story = {
  args: {
    content: "Tooltip Content",
    children: "Hover",
    side: "top",
    delayDuration: 0,
  },
};

export const DefaultSideLeft: Story = {
  args: {
    content: "Tooltip Content",
    children: "Hover",
    side: "left",
    delayDuration: 0,
  },
};

export const DefaultSideRight: Story = {
  args: {
    content: "Tooltip Content",
    children: "Hover",
    side: "right",
    delayDuration: 0,
  },
};

export const DefaultDelayDuration1000: Story = {
  args: {
    content: "Tooltip Content",
    children: "Hover",
    side: "bottom",
    delayDuration: 1000,
  },
};
