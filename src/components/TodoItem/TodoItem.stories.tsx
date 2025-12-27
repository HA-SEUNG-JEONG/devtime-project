import type { Meta, StoryObj } from "@storybook/react-vite";
import TodoItem from "./TodoItem";

const meta = {
  title: "Components/TodoItem",
  component: TodoItem,
} satisfies Meta<typeof TodoItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CompleteEdit: Story = {
  args: {
    backgroundColor: "bg-primary-0",
    textColor: "text-white",
    isEditing: false, // 편집 모드 아님
    checked: true, // 체크됨 → Edit/Trash 아이콘
  },
};

export const Editing: Story = {
  args: {
    backgroundColor: "bg-primary-0",
    textColor: "text-white",
    isEditing: true, // 편집 모드
    checked: false, // 체크 안됨 → CheckIcon 표시
  },
};

export const UnChecked: Story = {
  args: {
    backgroundColor: "bg-primary-0",
    textColor: "text-white",
    isEditing: false, // 편집 모드 아님
    checked: false, // 체크 안됨 → Checkbox만 표시
  },
};

export const Completed: Story = {
  args: {
    backgroundColor: "bg-primary-0",
    textColor: "text-white",
  },
};

export const Failed: Story = {
  args: {
    backgroundColor: "bg-gray-200",
    textColor: "text-gray-400",
  },
};
