import type { Meta, StoryObj } from '@storybook/react-vite';
import Dropdown from '../../components/Dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['unselected', 'selected', 'selecting', 'scrollSelecting', 'reselecting'],
      description: 'Dropdown의 상태',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    value: {
      control: 'text',
      description: '선택된 값',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    options: {
      control: 'object',
      description: '드롭다운 옵션 목록',
    },
    selectedIndex: {
      control: 'number',
      description: '선택된 옵션의 인덱스',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// State=Unselected - 기본 상태 (플레이스홀더 표시)
export const Unselected: Story = {
  args: {
    variant: 'unselected',
    label: 'Dropdown Label',
    placeholder: 'Placeholder',
    options: ['First Item', 'Second Item', 'Third Item', 'Fourth Item', 'Fifth Item', 'Last Item'],
  },
};

// State=Selected - 선택된 상태 (선택된 값 표시)
export const Selected: Story = {
  args: {
    variant: 'selected',
    label: 'Dropdown Label',
    value: 'First Item',
    placeholder: 'Placeholder',
    options: ['First Item', 'Second Item', 'Third Item', 'Fourth Item', 'Fifth Item', 'Last Item'],
    selectedIndex: 0,
  },
};

// State=Selecting - 선택 중 상태 (드롭다운 열림, 메뉴 표시)
export const Selecting: Story = {
  args: {
    variant: 'selecting',
    label: 'Dropdown Label',
    placeholder: 'Placeholder',
    options: ['First Item', 'Second Item', 'Third Item', 'Fourth Item', 'Fifth Item', 'Last Item'],
  },
};

// State=(Scroll)Selecting - 스크롤 가능한 선택 중 상태 (긴 목록)
export const ScrollSelecting: Story = {
  args: {
    variant: 'scrollSelecting',
    label: 'Dropdown Label',
    placeholder: 'Placeholder',
    options: [
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
    ],
  },
};

// State=Re-selecting - 다시 선택 중 상태 (이미 선택된 값이 있는 상태에서 재선택)
export const Reselecting: Story = {
  args: {
    variant: 'reselecting',
    label: 'Dropdown Label',
    value: 'First Item',
    placeholder: 'Placeholder',
    options: ['First Item', 'Second Item', 'Third Item', 'Fourth Item', 'Fifth Item', 'Last Item'],
    selectedIndex: 0,
  },
};

