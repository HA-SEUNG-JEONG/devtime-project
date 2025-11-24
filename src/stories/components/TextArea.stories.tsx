import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import TextArea from '../../components/common/TextArea';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['ready', 'typing', 'typed'],
      description: 'TextArea의 상태 (Ready, Typing, Typed)',
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
} satisfies Meta<typeof TextArea>;

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
    const [value, setValue] = useState('Typing');
    return (
      <TextArea
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
    value:
      'Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed',
  },
};

// 모든 상태를 한 번에 보기
export const AllStates: Story = {
  render: () => {
    const [typingValue, setTypingValue] = useState('Typing');
    return (
      <div className="flex flex-col gap-6 p-8">
        <div>
          <h3 className="text-16sb text-[#1F2937] mb-2">State=Ready</h3>
          <TextArea variant="ready" placeholder="Placeholder" />
        </div>
        <div>
          <h3 className="text-16sb text-[#1F2937] mb-2">State=Typing</h3>
          <TextArea
            variant="typing"
            value={typingValue}
            onChange={e => setTypingValue(e.target.value)}
            placeholder="Placeholder"
          />
        </div>
        <div>
          <h3 className="text-16sb text-[#1F2937] mb-2">State=Typed</h3>
          <TextArea
            variant="typed"
            value="Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed"
          />
        </div>
      </div>
    );
  },
};
