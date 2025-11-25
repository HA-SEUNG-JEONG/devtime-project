import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import Input from '@/components/common/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['ready', 'typing', 'typed'],
      description: 'Input의 상태 (Ready, Typing, Typed)',
    },
    value: {
      control: 'text',
      description: '입력된 값',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// State=Ready - Placeholder 상태
export const Ready: Story = {
  args: {
    variant: 'ready',
    placeholder: 'Placeholder',
  },
};

// State=Typing - 입력 중 상태 (실제 입력 가능)
export const Typing: Story = {
  render: args => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        variant="typing"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Placeholder"
      />
    );
  },
  args: {
    variant: 'typing',
    placeholder: 'Placeholder',
  },
};

// State=Typed - 입력 완료 상태
export const Typed: Story = {
  args: {
    variant: 'typed',
    value: 'Typed',
  },
};

// 커스텀 플레이스홀더
export const CustomPlaceholder: Story = {
  args: {
    variant: 'ready',
    placeholder: '검색어를 입력하세요',
  },
};

// 커스텀 너비
export const CustomWidth: Story = {
  args: {
    variant: 'ready',
    placeholder: 'Placeholder',
    className: 'w-[300px]',
  },
};

// 모든 상태 비교
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm text-gray-600">Ready State</p>
        <Input variant="ready" placeholder="Placeholder" />
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-600">Typing State</p>
        <Input variant="typing" placeholder="Placeholder" value="Typing" />
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-600">Typed State</p>
        <Input variant="typed" value="Typed" />
      </div>
    </div>
  ),
};
