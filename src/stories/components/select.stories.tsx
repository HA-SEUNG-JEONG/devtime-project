import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: '선택된 값',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// State=Unselected - 기본 상태 (플레이스홀더 표시)
const UnselectedComponent = () => {
  const [value, setValue] = useState('');
  return (
    <div className="flex flex-col gap-2 w-full max-w-[300px]">
      <label className="w-full h-[18px] text-14m text-gray-600 flex items-center">
        Select Label
      </label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-full h-11 bg-gray-50 rounded-[5px] border-none text-16m text-gray-600 data-placeholder:text-gray-300">
          <SelectValue placeholder="Placeholder" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="first">First Item</SelectItem>
          <SelectItem value="second">Second Item</SelectItem>
          <SelectItem value="third">Third Item</SelectItem>
          <SelectItem value="fourth">Fourth Item</SelectItem>
          <SelectItem value="fifth">Fifth Item</SelectItem>
          <SelectItem value="last">Last Item</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export const Unselected: Story = {
  render: () => <UnselectedComponent />,
};

// State=Selected - 선택된 상태 (선택된 값 표시)
const SelectedComponent = () => {
  const [value, setValue] = useState('first');
  return (
    <div className="flex flex-col gap-2 w-full max-w-[300px]">
      <label className="w-full h-[18px] text-14m text-gray-600 flex items-center">
        Select Label
      </label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-full h-11 bg-gray-50 rounded-[5px] border-none text-16m text-gray-600 data-placeholder:text-gray-300">
          <SelectValue placeholder="Placeholder" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="first">First Item</SelectItem>
          <SelectItem value="second">Second Item</SelectItem>
          <SelectItem value="third">Third Item</SelectItem>
          <SelectItem value="fourth">Fourth Item</SelectItem>
          <SelectItem value="fifth">Fifth Item</SelectItem>
          <SelectItem value="last">Last Item</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export const Selected: Story = {
  render: () => <SelectedComponent />,
};

// State=Selecting - 선택 중 상태 (드롭다운 열림, 메뉴 표시)
const SelectingComponent = () => {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col gap-2 w-full max-w-[300px]">
      <label className="w-full h-[18px] text-14m text-gray-600 flex items-center">
        Select Label
      </label>
      <Select
        value={value}
        onValueChange={setValue}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger className="w-full h-11 bg-gray-50 rounded-[5px] border-none text-16m text-gray-600 data-placeholder:text-gray-300">
          <SelectValue placeholder="Placeholder" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="first">First Item</SelectItem>
          <SelectItem value="second">Second Item</SelectItem>
          <SelectItem value="third">Third Item</SelectItem>
          <SelectItem value="fourth">Fourth Item</SelectItem>
          <SelectItem value="fifth">Fifth Item</SelectItem>
          <SelectItem value="last">Last Item</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export const Selecting: Story = {
  render: () => <SelectingComponent />,
};

// State=(Scroll)Selecting - 스크롤 가능한 선택 중 상태 (긴 목록)
const ScrollSelectingComponent = () => {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(true);
  const options = [
    'First Item',
    'Second Item',
    'Third Item',
    'Fourth Item',
    'Fifth Item',
    'Sixth Item',
    'Seventh Item',
    'Eighth Item',
    'Ninth Item',
    'Tenth Item',
    'Eleventh Item',
    'Twelfth Item',
    'Thirteenth Item',
    'Fourteenth Item',
    'Fifteenth Item',
    'Sixteenth Item',
    'Seventeenth Item',
    'Eighteenth Item',
    'Nineteenth Item',
    'Twentieth Item',
  ];
  return (
    <div className="flex flex-col gap-2 w-full max-w-[300px]">
      <label className="w-full h-[18px] text-14m text-gray-600 flex items-center">
        Select Label
      </label>
      <Select
        value={value}
        onValueChange={setValue}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger className="w-full h-11 bg-gray-50 rounded-[5px] border-none text-16m text-gray-600 data-placeholder:text-gray-300">
          <SelectValue placeholder="Placeholder" />
        </SelectTrigger>
        <SelectContent className="max-h-[340px]">
          {options.map((option, index) => (
            <SelectItem
              key={index}
              value={option.toLowerCase().replace(/\s+/g, '-')}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const ScrollSelecting: Story = {
  render: () => <ScrollSelectingComponent />,
};

// State=Re-selecting - 다시 선택 중 상태 (이미 선택된 값이 있는 상태에서 재선택)
const ReselectingComponent = () => {
  const [value, setValue] = useState('first');
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col gap-2 w-full max-w-[300px]">
      <label className="w-full h-[18px] text-14m text-gray-600 flex items-center">
        Select Label
      </label>
      <Select
        value={value}
        onValueChange={setValue}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger className="w-full h-11 bg-gray-50 rounded-[5px] border-none text-16m text-gray-600 data-placeholder:text-gray-300">
          <SelectValue placeholder="Placeholder" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="first">First Item</SelectItem>
          <SelectItem value="second">Second Item</SelectItem>
          <SelectItem value="third">Third Item</SelectItem>
          <SelectItem value="fourth">Fourth Item</SelectItem>
          <SelectItem value="fifth">Fifth Item</SelectItem>
          <SelectItem value="last">Last Item</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export const Reselecting: Story = {
  render: () => <ReselectingComponent />,
};
