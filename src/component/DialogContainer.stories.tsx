import type { Meta } from "@storybook/react-vite";
import DialogContainer from "./DialogContainer";
import type { StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Component/Dialog",
  component: DialogContainer,
  tags: ["autodocs"],
} satisfies Meta<typeof DialogContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <DialogContainer />,
};
