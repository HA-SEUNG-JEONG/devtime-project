import type { Meta } from "@storybook/react-vite";
import ImageUploader from "./ImageUploader";
import type { StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/ImageUploader",
  component: ImageUploader,
  tags: ["autodocs"],
} satisfies Meta<typeof ImageUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <ImageUploader />,
};
