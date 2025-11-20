import type { Meta, StoryObj } from '@storybook/react';
import Chip from '../../components/Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Chip에 표시될 텍스트',
    },
    deletable: {
      control: 'boolean',
      description: '삭제 버튼 표시 여부',
    },
    onDelete: {
      action: 'deleted',
      description: '삭제 버튼 클릭 시 호출되는 함수',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'React',
    deletable: false,
  },
};

export const Deletable: Story = {
  args: {
    label: 'TypeScript',
    deletable: true,
  },
};

export const MultipleChips: Story = {
  args: {
    label: 'React',
    deletable: false,
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip label="React" deletable={false} />
      <Chip label="TypeScript" deletable={true} />
      <Chip label="JavaScript" deletable={true} />
      <Chip label="CSS" deletable={true} />
      <Chip label="HTML" deletable={false} />
    </div>
  ),
};

export const LongLabel: Story = {
  args: {
    label: 'Very Long Technology Name',
    deletable: true,
  },
};
