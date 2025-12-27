import type { Meta, StoryObj } from "@storybook/react-vite";
import NavBar from "./NavBar";

const meta = {
  title: "Component/NavBar",
  component: NavBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavBar>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
