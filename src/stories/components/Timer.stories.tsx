import type { Meta, StoryObj } from '@storybook/react-vite';
import Timer from '../../components/Timer';
// colors.css와 font.css는 index.css에서 import됨

const meta = {
  title: 'Components/Timer',
  component: Timer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hours: {
      control: { type: 'number', min: 0, max: 99 },
      description: '시간 (0-99)',
    },
    minutes: {
      control: { type: 'number', min: 0, max: 59 },
      description: '분 (0-59)',
    },
    seconds: {
      control: { type: 'number', min: 0, max: 59 },
      description: '초 (0-59)',
    },
  },
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 타이머 (00:00:00)
export const Default: Story = {
  args: {
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
};

// 예시: 06:29:51
export const Example: Story = {
  args: {
    hours: 6,
    minutes: 29,
    seconds: 51,
  },
};

// 1시간 30분 15초
export const OneHourThirtyMinutes: Story = {
  args: {
    hours: 1,
    minutes: 30,
    seconds: 15,
  },
};

// 23시간 59분 59초 (최대값)
export const Maximum: Story = {
  args: {
    hours: 23,
    minutes: 59,
    seconds: 59,
  },
};

// 다양한 시간 조합
export const VariousTimes: Story = {
  args: {
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  render: () => (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        minHeight: '100vh',
        backgroundColor: '#1f2937',
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
          00:00:00
        </h2>
        <Timer hours={0} minutes={0} seconds={0} />
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
          06:29:51
        </h2>
        <Timer hours={6} minutes={29} seconds={51} />
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
          12:30:45
        </h2>
        <Timer hours={12} minutes={30} seconds={45} />
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
          23:59:59
        </h2>
        <Timer hours={23} minutes={59} seconds={59} />
      </section>
    </div>
  ),
};
