import type { Meta } from "@storybook/react-vite";
import CheckboxComponent from "./CheckboxComponent";
import type { StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Component/Checkbox",
  component: CheckboxComponent,
  tags: ["autodocs"]
} satisfies Meta<typeof CheckboxComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { id: "checkbox" },
  render: () => <CheckboxComponent />
};
