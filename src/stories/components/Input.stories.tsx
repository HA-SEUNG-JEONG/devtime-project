import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Input } from '@/components/ui/input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input 타입',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Input
export const Default: Story = {
  args: {
    placeholder: '입력하세요...',
  },
};

// 다양한 타입
export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-[300px]">
      <div>
        <label className="block text-sm text-gray-600 mb-2">Text</label>
        <Input type="text" placeholder="텍스트를 입력하세요" />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-2">Email</label>
        <Input type="email" placeholder="이메일을 입력하세요" />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-2">Password</label>
        <Input type="password" placeholder="비밀번호를 입력하세요" />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-2">Number</label>
        <Input type="number" placeholder="숫자를 입력하세요" />
      </div>
    </div>
  ),
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    placeholder: '비활성화된 입력 필드',
    disabled: true,
    defaultValue: '비활성화된 값',
  },
};

// 인터랙티브 예제
export const Interactive: Story = {
  render: () => {
    const InteractiveComponent = () => {
      const [value, setValue] = useState('');
      return (
        <div className="flex flex-col gap-4 w-full max-w-[300px]">
          <Input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="입력해보세요..."
          />
          <div className="text-sm text-gray-600">
            입력된 값: <strong>{value || '(없음)'}</strong>
          </div>
        </div>
      );
    };
    return <InteractiveComponent />;
  },
};

// 다양한 크기
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-[300px]">
      <div>
        <label className="block text-sm text-gray-600 mb-2">기본 크기</label>
        <Input placeholder="기본 크기" />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-2">작은 크기</label>
        <Input placeholder="작은 크기" className="h-8 text-sm" />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-2">큰 크기</label>
        <Input placeholder="큰 크기" className="h-12 text-lg" />
      </div>
    </div>
  ),
};

// 에러 상태
export const Error: Story = {
  args: {
    placeholder: '에러 상태',
    'aria-invalid': true,
    defaultValue: '잘못된 입력',
  },
};
