import type { Meta, StoryObj } from "@storybook/react-vite";
import TooltipComponent from "./TooltipComponent";

const meta = {
  title: "TooltipComponent",
  component: TooltipComponent,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof TooltipComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
