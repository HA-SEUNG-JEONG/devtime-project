import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TextField from "./TextField";

const meta = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: { children: null },
  render: () => {
    function Basic() {
      const [value, setValue] = useState("");
      return (
        <TextField value={value}>
          <TextField.Input
            placeholder="Placeholder"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </TextField>
      );
    }
    return <Basic />;
  },
} satisfies Story;

export const WithLabel = {
  args: { children: null },
  render: () => {
    function WithLabel() {
      const [value, setValue] = useState("");
      return (
        <TextField value={value}>
          <TextField.Label>Field Label</TextField.Label>
          <TextField.Input
            placeholder="Placeholder"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </TextField>
      );
    }
    return <WithLabel />;
  },
} satisfies Story;

export const WithHelperText = {
  args: { children: null },
  render: () => {
    function HelperText() {
      const [value, setValue] = useState("");
      return (
        <TextField value={value}>
          <TextField.Input
            placeholder="Placeholder"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <TextField.HelperText>Helper Text</TextField.HelperText>
        </TextField>
      );
    }
    return <HelperText />;
  },
} satisfies Story;

export const WithHelperTextVariants = {
  args: { children: null },
  render: () => {
    function WithHelperTextVariants() {
      const [value, setValue] = useState("");
      return (
        <div className="flex flex-col gap-4">
          <TextField value={value}>
            <TextField.Input
              placeholder="Placeholder"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <TextField.HelperText variant="default">
              Default helper text
            </TextField.HelperText>
          </TextField>
          <TextField value={value}>
            <TextField.Input
              placeholder="Placeholder"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <TextField.HelperText variant="success">
              Success message
            </TextField.HelperText>
          </TextField>
          <TextField value={value}>
            <TextField.Input
              placeholder="Placeholder"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <TextField.HelperText variant="error">
              Error message
            </TextField.HelperText>
          </TextField>
          <TextField value={value}>
            <TextField.Input
              placeholder="Placeholder"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <TextField.HelperText variant="warning">
              Warning message
            </TextField.HelperText>
          </TextField>
        </div>
      );
    }
    return <WithHelperTextVariants />;
  },
} satisfies Story;

export const WithLabelAndHelper = {
  args: { children: null },
  render: () => {
    function WithLabelAndHelper() {
      const [value, setValue] = useState("");
      return (
        <TextField value={value}>
          <TextField.Label>Field Label</TextField.Label>
          <div className="flex">
            <TextField.Input
              placeholder="Placeholder"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="h-11"
            />
            <TextField.Button
              type="external"
              onClick={() => console.log("추가 버튼 클릭")}
              className="h-11"
            >
              Button
            </TextField.Button>
          </div>
          <TextField.HelperText>Helper Text</TextField.HelperText>
        </TextField>
      );
    }
    return <WithLabelAndHelper />;
  },
} satisfies Story;

export const WithInlineButton = {
  args: { children: null },
  render: () => {
    function WithInlineButton() {
      const [value, setValue] = useState("");
      return (
        <TextField value={value} className="relative">
          <TextField.Label>Field Label</TextField.Label>
          <div className="flex items-center">
            <TextField.Input
              hasButton
              placeholder="Placeholder"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="h-14"
            />
            <TextField.Button
              type="inline"
              onClick={() => console.log("추가 버튼 클릭")}
              className="absolute right-6"
            >
              추가
            </TextField.Button>
          </div>
          <TextField.HelperText>Helper Text</TextField.HelperText>
        </TextField>
      );
    }
    return <WithInlineButton />;
  },
} satisfies Story;

export const WithoutLabelAndHelper = {
  args: { children: null },
  render: () => {
    function WithoutLabelAndHelper() {
      const [value, setValue] = useState("");
      return (
        <TextField value={value}>
          <div className="flex items-center">
            <TextField.Input
              placeholder="Placeholder"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="h-11"
            />
            <TextField.Button
              type="external"
              onClick={() => console.log("추가 버튼 클릭")}
              className="h-11"
            >
              Button
            </TextField.Button>
          </div>
        </TextField>
      );
    }
    return <WithoutLabelAndHelper />;
  },
} satisfies Story;
