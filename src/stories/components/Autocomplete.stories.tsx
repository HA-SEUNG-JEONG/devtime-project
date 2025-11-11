import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import Autocomplete from '../../components/Autocomplete';

const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['ready', 'typing', 'noResult'],
      description: 'Autocomplete의 상태 (Ready, Typing, NoResult)',
    },
    value: {
      control: 'text',
      description: '입력된 값',
    },
    options: {
      control: 'object',
      description: '드롭다운 옵션 목록',
    },
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

// State=Ready - 기본 상태
export const Ready: Story = {
  args: {
    variant: 'ready',
  },
};

// State=Typing - 입력 중 상태 (드롭다운 목록 표시)
export const Typing: Story = {
  render: args => {
    const [value, setValue] = useState('A');
    const options = ['AAABC', 'AABBYF', 'AACDDFG', 'AAGHR', 'AAATHCHYYU'];

    return (
      <Autocomplete
        {...args}
        variant="typing"
        value={value}
        options={options}
        onChange={e => setValue(e.target.value)}
        onSelectOption={option => {
          setValue(option);
          console.log('Selected option:', option);
        }}
      />
    );
  },
  args: {
    variant: 'typing',
    options: ['AAABC', 'AABBYF', 'AACDDFG', 'AAGHR', 'AAATHCHYYU'],
  },
};

// State=NoResult - 결과 없음 상태 (Add New Item 옵션 표시)
export const NoResult: Story = {
  render: args => {
    const [value, setValue] = useState('XYZ');

    return (
      <Autocomplete
        {...args}
        variant="noResult"
        value={value}
        options={[]}
        onChange={e => setValue(e.target.value)}
        onAddNewItem={() => {
          console.log('Add new item clicked');
          alert(`새 항목 추가: ${value}`);
        }}
      />
    );
  },
  args: {
    variant: 'noResult',
  },
};

// Interactive Example - 실제 사용 예시
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const allOptions = [
      'AAABC',
      'AABBYF',
      'AACDDFG',
      'AAGHR',
      'AAATHCHYYU',
      'Apple',
      'Banana',
      'Cherry',
      'Date',
      'Elderberry',
    ];

    // 입력값에 따라 필터링된 옵션 표시
    const filteredOptions = value
      ? allOptions.filter(option =>
          option.toLowerCase().includes(value.toLowerCase())
        )
      : [];

    // variant 결정
    let variant: 'ready' | 'typing' | 'noResult' = 'ready';
    if (isFocused || value) {
      if (filteredOptions.length > 0) {
        variant = 'typing';
      } else if (value) {
        variant = 'noResult';
      } else {
        variant = 'typing';
      }
    }

    return (
      <div className="flex flex-col gap-4">
        <Autocomplete
          variant={variant}
          value={value}
          options={filteredOptions}
          onChange={e => setValue(e.target.value)}
          onSelectOption={option => {
            setValue(option);
            setIsFocused(false);
            console.log('Selected:', option);
          }}
          onAddNewItem={() => {
            alert(`새 항목 추가: ${value}`);
            setValue('');
            setIsFocused(false);
          }}
        />
        <div className="text-sm text-gray-600 mt-4">
          <p>입력값: {value || '(없음)'}</p>
          <p>필터링된 옵션: {filteredOptions.length}개</p>
          <p>상태: {variant}</p>
        </div>
      </div>
    );
  },
};

// All States - 모든 상태를 한 번에 보기
export const AllStates: Story = {
  render: () => {
    return (
      <div className="flex flex-row gap-8 p-8">
        <Autocomplete variant="ready" />
        <Autocomplete
          variant="typing"
          value="A"
          options={['AAABC', 'AABBYF', 'AACDDFG', 'AAGHR', 'AAATHCHYYU']}
        />
        <Autocomplete variant="noResult" value="XYZ" options={[]} />
      </div>
    );
  },
};
