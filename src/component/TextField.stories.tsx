import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TextBox from "./TextField";

const meta = {
  title: "Component/TextBox",
  component: TextBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: { children: null },
  render: () => {
    const [value, setValue] = useState("");
    return (
      <TextBox value={value}>
        <TextBox.Input
          placeholder="Placeholder"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </TextBox>
    );
  },
} as Story;

export const WithLabel = {
  args: { children: null },
  render: () => {
    const [value, setValue] = useState("");
    return (
      <TextBox value={value}>
        <TextBox.Label>Field Label</TextBox.Label>
        <TextBox.Input
          placeholder="Placeholder"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </TextBox>
    );
  },
} as Story;

export const WithHelperText = {
  args: { children: null },
  render: () => {
    const [value, setValue] = useState("");
    return (
      <TextBox value={value}>
        <TextBox.Input
          placeholder="Placeholder"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <TextBox.HelperText>Helper Text</TextBox.HelperText>
      </TextBox>
    );
  },
} as Story;

export const WithHelperTextVariants = {
  args: { children: null },
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="flex flex-col gap-4">
        <TextBox value={value}>
          <TextBox.Input
            placeholder="Placeholder"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <TextBox.HelperText variant="default">
            Default helper text
          </TextBox.HelperText>
        </TextBox>
        <TextBox value={value}>
          <TextBox.Input
            placeholder="Placeholder"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <TextBox.HelperText variant="success">
            Success message
          </TextBox.HelperText>
        </TextBox>
        <TextBox value={value}>
          <TextBox.Input
            placeholder="Placeholder"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <TextBox.HelperText variant="error">Error message</TextBox.HelperText>
        </TextBox>
        <TextBox value={value}>
          <TextBox.Input
            placeholder="Placeholder"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <TextBox.HelperText variant="warning">
            Warning message
          </TextBox.HelperText>
        </TextBox>
      </div>
    );
  },
} as Story;

export const WithLabelAndHelper = {
  args: { children: null },
  render: () => {
    const [value, setValue] = useState("");
    return (
      <TextBox value={value}>
        <TextBox.Label>Field Label</TextBox.Label>
        <div className="flex">
          <TextBox.Input
            placeholder="Placeholder"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <TextBox.Button
            type="external"
            onClick={() => console.log("추가 버튼 클릭")}
          >
            Button
          </TextBox.Button>
        </div>
        <TextBox.HelperText>Helper Text</TextBox.HelperText>
      </TextBox>
    );
  },
} as Story;

export const WithInlineButton = {
  args: { children: null },
  render: () => {
    const [value, setValue] = useState("");
    return (
      <TextBox value={value}>
        <TextBox.Label>Field Label</TextBox.Label>
        <TextBox.Input
          hasButton
          placeholder="Placeholder"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <TextBox.Button
          type="inline"
          onClick={() => console.log("추가 버튼 클릭")}
        >
          추가
        </TextBox.Button>
        <TextBox.HelperText>Helper Text</TextBox.HelperText>
      </TextBox>
    );
  },
} satisfies Story;

export const WithoutLabelAndHelper = {
  args: { children: null },
  render: () => {
    const [value, setValue] = useState("");
    return (
      <TextBox value={value}>
        <div className="flex">
          <TextBox.Input
            placeholder="Placeholder"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <TextBox.Button
            type="external"
            onClick={() => console.log("추가 버튼 클릭")}
          >
            Button
          </TextBox.Button>
        </div>
      </TextBox>
    );
  },
} satisfies Story;
