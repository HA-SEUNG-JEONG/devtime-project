import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Checkbox from '../../components/Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    usage: {
      control: 'select',
      options: ['regular', 'todo'],
      description: '체크박스 사용 용도 (Regular: 18px, TODO: 36px)',
    },
    checked: {
      control: 'boolean',
      description: '체크박스 선택 상태',
    },
    onChange: {
      action: 'changed',
      description: '체크박스 상태 변경 핸들러',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Regular, Selected
export const RegularSelected: Story = {
  args: {
    usage: 'regular',
    checked: true,
    onChange: fn(),
  },
};

// Regular, Unselected
export const RegularUnselected: Story = {
  args: {
    usage: 'regular',
    checked: false,
    onChange: fn(),
  },
};

// TODO, Selected
export const TodoSelected: Story = {
  args: {
    usage: 'todo',
    checked: true,
    onChange: fn(),
  },
};

// TODO, Unselected
export const TodoUnselected: Story = {
  args: {
    usage: 'todo',
    checked: false,
    onChange: fn(),
  },
};

// All States Overview
export const AllStates: Story = {
  args: {
    usage: 'regular',
    checked: false,
    onChange: fn(),
  },
  render: () => (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <section>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1F2937',
          }}
        >
          Regular (18px)
        </h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Checkbox usage="regular" checked={false} onChange={fn()} />
            <span style={{ fontSize: '12px', color: '#6B7280' }}>Unselected</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Checkbox usage="regular" checked={true} onChange={fn()} />
            <span style={{ fontSize: '12px', color: '#6B7280' }}>Selected</span>
          </div>
        </div>
      </section>

      <section>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1F2937',
          }}
        >
          TODO (36px)
        </h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Checkbox usage="todo" checked={false} onChange={fn()} />
            <span style={{ fontSize: '12px', color: '#6B7280' }}>Unselected</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Checkbox usage="todo" checked={true} onChange={fn()} />
            <span style={{ fontSize: '12px', color: '#6B7280' }}>Selected</span>
          </div>
        </div>
      </section>

      <section>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1F2937',
          }}
        >
          With Background (시각적 확인용)
        </h2>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div
            style={{
              padding: '16px',
              backgroundColor: '#4C79FF',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <Checkbox usage="todo" checked={false} onChange={fn()} />
            <span style={{ fontSize: '12px', color: '#FFFFFF' }}>TODO Unselected</span>
          </div>
          <div
            style={{
              padding: '16px',
              backgroundColor: '#4C79FF',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <Checkbox usage="todo" checked={true} onChange={fn()} />
            <span style={{ fontSize: '12px', color: '#FFFFFF' }}>TODO Selected</span>
          </div>
        </div>
      </section>
    </div>
  ),
};

