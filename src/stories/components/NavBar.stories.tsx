import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '@/components/common/NavBar';
// colors.css와 font.css는 index.css에서 import됨

const meta = {
  title: 'Components/NavBar',
  component: NavBar,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    initialLoggedIn: {
      control: 'boolean',
      description: '초기 로그인 상태 여부',
    },
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 - 로그인 상태
export const Default: Story = {
  args: {
    initialLoggedIn: true,
  },
};

// 로그인 전 상태
export const NotLoggedIn: Story = {
  args: {
    initialLoggedIn: false,
  },
};

// 모든 반응형 뷰 통합
export const Responsive: Story = {
  args: {
    initialLoggedIn: true,
  },
  render: args => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        padding: '24px',
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
      }}
    >
      {/* Mobile (375px) */}
      <section>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1f2937',
          }}
        >
          Mobile (375px)
        </h2>
        <div
          style={{
            width: '375px',
            backgroundColor: 'white',
            padding: '16px 0',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        >
          <NavBar {...args} />
        </div>
      </section>

      {/* Tablet (768px) */}
      <section>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1f2937',
          }}
        >
          Tablet (768px)
        </h2>
        <div
          style={{
            width: '768px',
            backgroundColor: 'white',
            padding: '16px 0',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        >
          <NavBar {...args} />
        </div>
      </section>

      {/* Desktop (1280px) */}
      <section>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1f2937',
          }}
        >
          Desktop (1280px)
        </h2>
        <div
          style={{
            width: '1280px',
            backgroundColor: 'white',
            padding: '16px 0',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        >
          <NavBar {...args} />
        </div>
      </section>
    </div>
  ),
};

// 로그인 전/후 상태 비교
export const LoginStates: Story = {
  args: {
    initialLoggedIn: true,
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        padding: '24px',
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
      }}
    >
      {/* 로그인 전 */}
      <section>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1f2937',
          }}
        >
          로그인 전
        </h2>
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            backgroundColor: 'white',
            padding: '16px 0',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        >
          <NavBar />
        </div>
      </section>

      {/* 로그인 후 */}
      <section>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1f2937',
          }}
        >
          로그인 후
        </h2>
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            backgroundColor: 'white',
            padding: '16px 0',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        >
          <NavBar />
        </div>
      </section>
    </div>
  ),
};
