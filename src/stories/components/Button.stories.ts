import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import Button from '@/components/common/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    priority: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '버튼의 우선순위 (Primary, Secondary, Tertiary)',
    },
    children: {
      control: 'text',
      description: '버튼 내부 텍스트',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Enabled
export const PrimaryEnabled: Story = {
  args: {
    priority: 'primary',
    children: 'Button',
  },
};

// Secondary Enabled
export const SecondaryEnabled: Story = {
  args: {
    priority: 'secondary',
    children: 'Button',
  },
};

// Tertiary Enabled
export const TertiaryEnabled: Story = {
  args: {
    priority: 'tertiary',
    children: 'Button',
  },
};

// Primary Disabled
export const PrimaryDisabled: Story = {
  args: {
    priority: 'primary',
    children: 'Button',
    disabled: true,
  },
};

// Secondary Disabled
export const SecondaryDisabled: Story = {
  args: {
    priority: 'secondary',
    children: 'Button',
    disabled: true,
  },
};

// Tertiary Disabled
export const TertiaryDisabled: Story = {
  args: {
    priority: 'tertiary',
    children: 'Button',
    disabled: true,
  },
};
