import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "storybook/test";
import AutoComplete from "./AutoComplete";

const meta = {
  title: "Components/CustomAutocomplete",
  component: AutoComplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { id: 1, name: "AAABC" },
  { id: 2, name: "AABBYF" },
  { id: 3, name: "AACDDGF" },
  { id: 4, name: "AAGHR" },
  { id: 5, name: "AAATHCHYYU" },
  { id: 6, name: "BBCDEF" },
  { id: 7, name: "ZZTEST" },
];

export const Default: Story = {
  args: {
    label: "Autocomplete Label",
    placeholder: "Placeholder",
    items: defaultItems,
  },
};

export const WithInitialValue: Story = {
  args: {
    label: "Autocomplete Label",
    placeholder: "Placeholder",
    items: defaultItems,
    handleAddNewItem: fn((value: string) => {
      console.log("Add new item:", value);
    }),
  },
};

export const EmptyState: Story = {
  args: {
    label: "Autocomplete Label",
    placeholder: "Start typing...",
    items: [],
  },
};

export const LongList: Story = {
  args: {
    label: "Autocomplete Label",
    placeholder: "Search...",
    items: [
      { id: 1, name: "Apple" },
      { id: 2, name: "Apricot" },
      { id: 3, name: "Avocado" },
      { id: 4, name: "Banana" },
      { id: 5, name: "Blueberry" },
      { id: 6, name: "Cherry" },
      { id: 7, name: "Coconut" },
      { id: 8, name: "Dragon Fruit" },
      { id: 9, name: "Elderberry" },
      { id: 10, name: "Fig" },
      { id: 11, name: "Grape" },
      { id: 12, name: "Grapefruit" },
      { id: 13, name: "Guava" },
      { id: 14, name: "Avocado" },
    ],
  },
};

export const NoAddButton: Story = {
  args: {
    label: "Autocomplete Label",
    placeholder: "Type to filter",
    items: defaultItems,
  },
};

export const KoreanItems: Story = {
  args: {
    label: "자동완성 레이블",
    placeholder: "검색어를 입력하세요",
    items: [
      { id: 1, name: "사과" },
      { id: 2, name: "사탕" },
      { id: 3, name: "사자" },
      { id: 4, name: "바나나" },
      { id: 5, name: "바다" },
      { id: 6, name: "포도" },
      { id: 7, name: "포장" },
    ],
  },
};

export const CaseSensitiveFiltering: Story = {
  args: {
    label: "Autocomplete Label",
    placeholder: "Type uppercase letters",
    items: [
      { id: 1, name: "AAA" },
      { id: 2, name: "aaa" },
      { id: 3, name: "AaA" },
      { id: 4, name: "BBB" },
      { id: 5, name: "bbb" },
      { id: 6, name: "BbB" },
    ],
  },
};
