import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Dialog from '@/components/common/Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '다이얼로그 제목',
    },
    body: {
      control: 'text',
      description: '다이얼로그 본문 텍스트 (선택사항)',
    },
    cancelLabel: {
      control: 'text',
      description: '취소 버튼 텍스트',
    },
    confirmLabel: {
      control: 'text',
      description: '확인 버튼 텍스트',
    },
    onCancel: {
      action: 'cancel clicked',
      description: '취소 버튼 클릭 핸들러',
    },
    onConfirm: {
      action: 'confirm clicked',
      description: '확인 버튼 클릭 핸들러',
    },
  },
  args: {
    onCancel: fn(),
    onConfirm: fn(),
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Title Only (제목만 있는 다이얼로그)
export const TitleOnly: Story = {
  args: {
    title: 'Title Text',
    cancelLabel: 'Button',
    confirmLabel: 'Button',
  },
};

// Title with Body (제목과 본문이 있는 다이얼로그)
export const TitleWithBody: Story = {
  args: {
    title: 'Title Text',
    body: 'Body text',
    cancelLabel: 'Button',
    confirmLabel: 'Button',
  },
};

// Custom Labels (커스텀 버튼 레이블)
export const CustomLabels: Story = {
  args: {
    title: '삭제하시겠습니까?',
    body: '이 작업은 되돌릴 수 없습니다.',
    cancelLabel: '취소',
    confirmLabel: '삭제',
  },
};
