import type { Meta, StoryObj } from '@storybook/react-vite';
import Tooltip from '../../components/Tooltip';
import Button from '../../components/Button';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Tooltip에 표시될 텍스트',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip의 위치',
    },
    children: {
      control: false,
      description: 'Tooltip이 표시될 대상 요소',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Tooltip (Top)
export const Default: Story = {
  args: {
    text: 'Tooltip',
    position: 'top',
    children: <Button priority="primary">Hover me</Button>,
  },
};

// Top 위치
export const Top: Story = {
  args: {
    text: 'Top Tooltip',
    position: 'top',
    children: <Button priority="primary">Top</Button>,
  },
};

// Bottom 위치
export const Bottom: Story = {
  args: {
    text: 'Bottom Tooltip',
    position: 'bottom',
    children: <Button priority="primary">Bottom</Button>,
  },
};

// Left 위치
export const Left: Story = {
  args: {
    text: 'Left Tooltip',
    position: 'left',
    children: <Button priority="primary">Left</Button>,
  },
};

// Right 위치
export const Right: Story = {
  args: {
    text: 'Right Tooltip',
    position: 'right',
    children: <Button priority="primary">Right</Button>,
  },
};

// 긴 텍스트
export const LongText: Story = {
  args: {
    text: 'This is a longer tooltip text that demonstrates how the tooltip handles longer content',
    position: 'top',
    children: <Button priority="secondary">Long Text</Button>,
  },
};

// 짧은 텍스트
export const ShortText: Story = {
  args: {
    text: 'Hi',
    position: 'top',
    children: <Button priority="tertiary">Short</Button>,
  },
};

// 다양한 버튼과 함께
export const WithDifferentButtons: Story = {
  args: {
    text: 'Primary Button Tooltip',
    position: 'top',
    children: <Button priority="primary">Primary</Button>,
  },
  render: () => (
    <div className="flex flex-col gap-8 items-center p-8">
      <Tooltip text="Primary Button Tooltip" position="top">
        <Button priority="primary">Primary</Button>
      </Tooltip>
      <Tooltip text="Secondary Button Tooltip" position="bottom">
        <Button priority="secondary">Secondary</Button>
      </Tooltip>
      <Tooltip text="Tertiary Button Tooltip" position="left">
        <Button priority="tertiary">Tertiary</Button>
      </Tooltip>
      <Tooltip text="Disabled Button Tooltip" position="right">
        <Button priority="primary" disabled>
          Disabled
        </Button>
      </Tooltip>
    </div>
  ),
};

// 텍스트 요소와 함께
export const WithText: Story = {
  args: {
    text: 'This is a tooltip',
    position: 'top',
    children: (
      <span className="text-16m text-gray-800 underline cursor-help">
        Hover over this text
      </span>
    ),
  },
  render: () => (
    <div className="flex flex-col gap-4 items-center p-8">
      <Tooltip text="This is a tooltip" position="top">
        <span className="text-16m text-gray-800 underline cursor-help">
          Hover over this text
        </span>
      </Tooltip>
      <Tooltip text="Another tooltip" position="bottom">
        <span className="text-18sb text-primary cursor-help">
          Hover over this text too
        </span>
      </Tooltip>
    </div>
  ),
};
