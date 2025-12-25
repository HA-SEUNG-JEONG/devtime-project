import type { Meta, StoryObj } from "@storybook/react";
import DropDown from "./DropDown";

const meta = {
  title: "Components/DropDown",
  component: DropDown,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  "First Item",
  "Second Item",
  "Third Item",
  "Fourth Item",
  "Fifth Item",
  "Last Item"
];

const manyItems = [
  "First Item",
  "Second Item",
  "Third Item",
  "Fourth Item",
  "Fifth Item",
  "Sixth Item",
  "Seventh Item",
  "Eighth Item",
  "Ninth Item",
  "Tenth Item",
  "First Item",
  "Second Item",
  "Third Item",
  "Fourth Item",
  "Fifth Item",
  "Sixth Item",
  "Seventh Item",
  "Eighth Item",
  "Ninth Item",
  "Tenth Item",
  "Eleventh Item",
  "Second Item",
  "Third Item",
  "Fourth Item",
  "Fifth Item",
  "Sixth Item",
  "Seventh Item",
  "Eighth Item",
  "Ninth Item",
  "Tenth Item",
  "Eleventh Item",
  "Second Item",
  "Third Item",
  "Fourth Item",
  "Fifth Item",
  "Sixth Item",
  "Seventh Item",
  "Eighth Item",
  "Ninth Item",
  "Tenth Item",
  "Eleventh Item",
  "Twelfth Item",
  "Thirteenth Item",
  "Fourteenth Item",
  "Fifteenth Item",
  "Sixteenth Item",
  "Seventeenth Item",
  "Eighteenth Item",
  "Nineteenth Item",
  "Twentieth Item"
];

export const Default: Story = {
  args: {
    label: "Dropdown Label",
    placeholder: "Placeholder",
    items: defaultItems
  }
};

export const WithSelectedItem: Story = {
  args: {
    label: "Dropdown Label",
    placeholder: "Placeholder",
    items: defaultItems,
    defaultValue: "First Item"
  }
};

export const ManyItems: Story = {
  args: {
    label: "Dropdown Label",
    placeholder: "Select an option",
    items: manyItems
  }
};

export const ShortList: Story = {
  args: {
    label: "Dropdown Label",
    placeholder: "Choose",
    items: ["Option A", "Option B", "Option C"]
  }
};

export const LongLabels: Story = {
  args: {
    label: "Very Long Dropdown Label Example",
    placeholder: "This is a very long placeholder text",
    items: [
      "This is a very long first item text",
      "Another long item with lots of text",
      "Short",
      "Medium length item"
    ]
  }
};

export const KoreanText: Story = {
  args: {
    label: "드롭다운 레이블",
    placeholder: "선택하세요",
    items: ["첫 번째 항목", "두 번째 항목", "세 번째 항목", "네 번째 항목"],
    defaultValue: "첫 번째 항목"
  }
};
