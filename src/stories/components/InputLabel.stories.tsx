import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import InputLabel from '@/components/common/InputLabel';

const meta = {
  title: 'Components/InputLabel',
  component: InputLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['placeholder', 'typing', 'typed'],
      description: 'Input label의 상태 (Placeholder, Typing, Typed)',
    },
    value: {
      control: 'text',
      description: '입력된 값',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    showAddButton: {
      control: 'boolean',
      description: '버튼 표시 여부',
    },
    buttonText: {
      control: 'text',
      description: '버튼 텍스트',
    },
    helperText: {
      control: 'text',
      description: '입력 필드 내부 오른쪽에 표시될 추가 텍스트',
    },
  },
} satisfies Meta<typeof InputLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Frame 240129 - Placeholder 상태
export const Placeholder: Story = {
  args: {
    variant: 'placeholder',
    placeholder: 'Placeholder',
    showAddButton: true,
    buttonText: 'Button',
  },
};

// Frame 240129 - Typing 상태 (입력 중) - 실제 입력 가능
export const Typing: Story = {
  render: args => {
    const TypingComponent = () => {
      const [value, setValue] = useState('');
      return (
        <InputLabel
          {...args}
          variant="typing"
          value={value}
          onChange={e => setValue(e.target.value)}
          showAddButton={true}
          placeholder="Placeholder"
          buttonText="Button"
          helperText={args.helperText}
          onButtonClick={() => {
            console.log('Button clicked!', value);
          }}
        />
      );
    };
    return <TypingComponent />;
  },
  args: {
    variant: 'typing',
    showAddButton: true,
    buttonText: 'Button',
    helperText: undefined,
  },
};

// Frame 240129 - Typed 상태 (입력 완료)
export const Typed: Story = {
  args: {
    variant: 'typed',
    value: 'Typed',
    showAddButton: true,
    buttonText: 'Button',
    onButtonClick: () => {
      console.log('Button clicked!');
    },
  },
};

// 버튼 없는 버전
export const WithoutButton: Story = {
  args: {
    variant: 'placeholder',
    placeholder: 'Placeholder',
    showAddButton: false,
  },
};

// 커스텀 버튼 텍스트
export const CustomButtonText: Story = {
  args: {
    variant: 'placeholder',
    placeholder: 'Placeholder',
    showAddButton: true,
    buttonText: '추가',
    onButtonClick: () => {
      console.log('추가 버튼 클릭!');
    },
  },
};

// HelperText가 있는 Typing 상태
export const TypingWithHelperText: Story = {
  render: args => {
    const TypingComponent = () => {
      const [value, setValue] = useState('');
      return (
        <InputLabel
          {...args}
          variant="typing"
          value={value}
          onChange={e => setValue(e.target.value)}
          showAddButton={true}
          placeholder="할 일 목록을 입력하세요"
          buttonText="추가"
          helperText="추가"
          onButtonClick={() => {
            console.log('추가 버튼 클릭!', value);
          }}
        />
      );
    };
    return <TypingComponent />;
  },
  args: {
    variant: 'typing',
    showAddButton: true,
    buttonText: '추가',
    helperText: '추가',
    placeholder: '할 일 목록을 입력하세요',
  },
};
