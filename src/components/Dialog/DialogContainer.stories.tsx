import type { Meta } from "@storybook/react-vite";
import type { StoryObj } from "@storybook/react-vite";
import DialogContainer from "./DialogContainer";

const meta = {
  title: "Components/Dialog",
  component: DialogContainer,
  tags: ["autodocs"],
} satisfies Meta<typeof DialogContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <DialogContainer />,
};
