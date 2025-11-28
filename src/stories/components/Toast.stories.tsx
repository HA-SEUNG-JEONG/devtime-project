import type { Meta, StoryObj } from '@storybook/react-vite';
import Toast from '@/components/common/Toast';
import { ToastProvider, useToast } from '@/contexts/ToastContext';
import Button from '@/components/common/Button';
import { toast as sonnerToast } from 'sonner';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full h-screen p-8">
        <ToastProvider>
          <Story />
          <Toast />
        </ToastProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// Toast 컴포넌트만 렌더링 (기본)
export const Default: Story = {
  render: () => <Toast />,
};

// ToastProvider를 사용한 예제
const ToastExample = () => {
  const { showToast } = useToast();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-4">Toast 예제</h2>
      <div className="flex flex-col gap-3">
        <Button
          priority="primary"
          onClick={() => showToast('정보 메시지입니다.', 'info')}
        >
          Info Toast
        </Button>
        <Button
          priority="primary"
          onClick={() => showToast('성공 메시지입니다.', 'success')}
        >
          Success Toast
        </Button>
        <Button
          priority="primary"
          onClick={() => showToast('경고 메시지입니다.', 'warning')}
        >
          Warning Toast
        </Button>
        <Button
          priority="primary"
          onClick={() => showToast('에러 메시지입니다.', 'error')}
        >
          Error Toast
        </Button>
      </div>
    </div>
  );
};

export const WithToastProvider: Story = {
  render: () => (
    <ToastProvider>
      <ToastExample />
      <Toast />
    </ToastProvider>
  ),
};

// Sonner를 직접 사용한 예제
const SonnerExample = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-4">Sonner 직접 사용 예제</h2>
      <div className="flex flex-col gap-3">
        <Button
          priority="primary"
          onClick={() => sonnerToast.info('정보 메시지입니다.')}
        >
          Info Toast
        </Button>
        <Button
          priority="primary"
          onClick={() => sonnerToast.success('성공 메시지입니다.')}
        >
          Success Toast
        </Button>
        <Button
          priority="primary"
          onClick={() => sonnerToast.warning('경고 메시지입니다.')}
        >
          Warning Toast
        </Button>
        <Button
          priority="primary"
          onClick={() => sonnerToast.error('에러 메시지입니다.')}
        >
          Error Toast
        </Button>
        <Button
          priority="secondary"
          onClick={() =>
            sonnerToast('기본 토스트 메시지입니다.', {
              description: '추가 설명 텍스트를 입력할 수 있습니다.',
            })
          }
        >
          기본 Toast (설명 포함)
        </Button>
      </div>
    </div>
  );
};

export const WithSonner: Story = {
  render: () => (
    <>
      <SonnerExample />
      <Toast />
    </>
  ),
};

// 긴 메시지 예제
const LongMessageExample = () => {
  const { showToast } = useToast();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-4">긴 메시지 예제</h2>
      <div className="flex flex-col gap-3">
        <Button
          priority="primary"
          onClick={() =>
            showToast(
              '이것은 매우 긴 메시지입니다. 토스트 컴포넌트가 긴 텍스트를 어떻게 처리하는지 확인할 수 있습니다. 여러 줄로 표시될 수 있습니다.',
              'info'
            )
          }
        >
          긴 Info 메시지
        </Button>
        <Button
          priority="primary"
          onClick={() =>
            showToast(
              '성공적으로 작업이 완료되었습니다!\n여러 줄로 표시되는 메시지입니다.',
              'success'
            )
          }
        >
          여러 줄 Success 메시지
        </Button>
      </div>
    </div>
  );
};

export const LongMessages: Story = {
  render: () => (
    <ToastProvider>
      <LongMessageExample />
      <Toast />
    </ToastProvider>
  ),
};

// 연속 토스트 예제
const MultipleToastExample = () => {
  const { showToast } = useToast();

  const handleMultipleToasts = () => {
    showToast('첫 번째 메시지', 'info');
    setTimeout(() => showToast('두 번째 메시지', 'success'), 500);
    setTimeout(() => showToast('세 번째 메시지', 'warning'), 1000);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-4">연속 토스트 예제</h2>
      <div className="flex flex-col gap-3">
        <Button priority="primary" onClick={handleMultipleToasts}>
          여러 토스트 동시 표시
        </Button>
      </div>
    </div>
  );
};

export const MultipleToasts: Story = {
  render: () => (
    <ToastProvider>
      <MultipleToastExample />
      <Toast />
    </ToastProvider>
  ),
};
