import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import TimerAction from '@/components/common/TimerAction';
// colors.css와 font.css는 index.css에서 import됨

const meta = {
  title: 'Components/TimerAction',
  component: TimerAction,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['ready', 'paused', 'in-progress'],
      description: '타이머의 현재 상태',
    },
    onStart: {
      action: 'start clicked',
      description: '시작 버튼 클릭 핸들러',
    },
    onPause: {
      action: 'pause clicked',
      description: '일시정지 버튼 클릭 핸들러',
    },
    onFinish: {
      action: 'finish clicked',
      description: '완료 버튼 클릭 핸들러',
    },
    onSeeTodo: {
      action: 'see todo clicked',
      description: '할 일 보기 버튼 클릭 핸들러',
    },
    onReset: {
      action: 'reset clicked',
      description: '초기화 버튼 클릭 핸들러',
    },
  },
  args: {
    onStart: fn(),
    onPause: fn(),
    onFinish: fn(),
    onSeeTodo: fn(),
    onReset: fn(),
  },
} satisfies Meta<typeof TimerAction>;

export default meta;
type Story = StoryObj<typeof meta>;

// Ready 상태 - Start만 활성화, 나머지 비활성화
export const Ready: Story = {
  args: {
    state: 'ready',
    onStart: fn(),
    onPause: fn(),
    onFinish: fn(),
    onSeeTodo: fn(),
    onReset: fn(),
  },
};

// Paused 상태 - Start, Finish, See TODO, Reset 활성화, Pause 비활성화
export const Paused: Story = {
  args: {
    state: 'paused',
    onStart: fn(),
    onPause: fn(),
    onFinish: fn(),
    onSeeTodo: fn(),
    onReset: fn(),
  },
};

// In Progress 상태 - Pause, Finish, See TODO, Reset 활성화, Start 비활성화
export const InProgress: Story = {
  args: {
    state: 'in-progress',
    onStart: fn(),
    onPause: fn(),
    onFinish: fn(),
    onSeeTodo: fn(),
    onReset: fn(),
  },
};

// All States Overview
export const AllStates: Story = {
  args: {
    state: 'ready',
  },
  render: () => (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        minHeight: '100vh',
      }}
    >
      <section>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#FFFFFF',
          }}
        >
          State: Ready
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: '#969DA8',
            marginBottom: '16px',
          }}
        >
          Start만 활성화, 나머지 버튼 비활성화
        </p>
        <TimerAction
          state="ready"
          onStart={fn()}
          onPause={fn()}
          onFinish={fn()}
          onSeeTodo={fn()}
          onReset={fn()}
        />
      </section>

      <section>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#FFFFFF',
          }}
        >
          State: In Progress
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: '#969DA8',
            marginBottom: '16px',
          }}
        >
          Pause, Finish, See TODO, Reset 활성화, Start 비활성화
        </p>
        <TimerAction
          state="in-progress"
          onStart={fn()}
          onPause={fn()}
          onFinish={fn()}
          onSeeTodo={fn()}
          onReset={fn()}
        />
      </section>

      <section>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#FFFFFF',
          }}
        >
          State: Paused
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: '#969DA8',
            marginBottom: '16px',
          }}
        >
          Start, Finish, See TODO, Reset 활성화, Pause 비활성화
        </p>
        <TimerAction
          state="paused"
          onStart={fn()}
          onPause={fn()}
          onFinish={fn()}
          onSeeTodo={fn()}
          onReset={fn()}
        />
      </section>
    </div>
  ),
};
