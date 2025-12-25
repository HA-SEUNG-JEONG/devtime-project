import type { Meta } from "@storybook/react-vite";
import DialogComponents from "./DialogComponents";
import type { StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Component/Dialog",
  component: DialogComponents,
  tags: ["autodocs"],
} satisfies Meta<typeof DialogComponents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <DialogComponents />,
};
