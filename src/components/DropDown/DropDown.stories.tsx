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

const items = [
  {id: 1, label: "Option A"},
  {id: 2, label: "Option B"},
  {id: 3, label: "Option C"}
];

const koreanItems = [
  {id: 1, label: "첫 번째 항목"},
  {id: 2, label: "두 번째 항목"},
  {id: 3, label: "세 번째 항목"},
  {id: 4, label: "네 번째 항목"}
];

const longItems = [
  {id: 1, label: "This is a very long first item text"},
  {id: 2, label: "Another long item with lots of text"},
  {id: 3, label: "Short"},
  {id: 4, label: "Medium length item"}
];



const defaultItems = [
  {id: 1, label: "First Item"},
  {id: 2, label: "Second Item"},
  {id: 3, label: "Third Item"},
  {id: 4, label: "Fourth Item"},
  {id: 5, label: "Fifth Item"},
  {id: 6, label: "Last Item"}
];

const manyItems = [
  {id: 1, label: "First Item"},
  {id: 2, label: "Second Item"},
  {id: 3, label: "Third Item"},
  {id: 4, label: "Fourth Item"},
  {id: 5, label: "Fifth Item"},
  {id: 6, label: "Sixth Item"},
  {id: 7, label: "Seventh Item"},
  {id: 8, label: "Eighth Item"},
  {id: 9, label: "Ninth Item"},
  {id: 10, label: "Tenth Item"},
  {id: 11, label: "Eleventh Item"},
  {id: 12, label: "Twelfth Item"},
  {id: 13, label: "Thirteenth Item"},
  {id: 14, label: "Fourteenth Item"},
  {id: 15, label: "Fifteenth Item"},
  {id: 16, label: "Sixteenth Item"},
  {id: 17, label: "Seventeenth Item"},
  {id: 18, label: "Eighteenth Item"},
  {id: 19, label: "Nineteenth Item"},
  {id: 20, label: "Twentieth Item"}
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
    items: items
  }
};

export const LongLabels: Story = {
  args: {
    label: "Very Long Dropdown Label Example",
    placeholder: "This is a very long placeholder text",
    items: longItems
  }
};

export const KoreanText: Story = {
  args: {
    label: "드롭다운 레이블",
    placeholder: "선택하세요",
    items: koreanItems,
    defaultValue: "첫 번째 항목"
  }
};
