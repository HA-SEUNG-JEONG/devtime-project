import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../../components/NavBar';
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

// PC 버전 - 로그인 전
export const PCNotLoggedIn: Story = {
  args: {
    initialLoggedIn: false,
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    Story => (
      <div
        style={{
          width: '1200px',
          height: '40px',
          position: 'relative',
          margin: '20px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

// PC 버전 - 로그인 후
export const PCLoggedIn: Story = {
  args: {
    initialLoggedIn: true,
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    Story => (
      <div
        style={{
          width: '1200px',
          height: '40px',
          position: 'relative',
          margin: '20px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

// Tablet 버전 - 로그인 전
export const TabletNotLoggedIn: Story = {
  args: {
    initialLoggedIn: false,
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    Story => (
      <div
        style={{
          width: '1247px',
          height: '40px',
          position: 'relative',
          margin: '20px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

// Tablet 버전 - 로그인 후
export const TabletLoggedIn: Story = {
  args: {
    initialLoggedIn: true,
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    Story => (
      <div
        style={{
          width: '1247px',
          height: '40px',
          position: 'relative',
          margin: '20px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

// Mobile 버전 - 로그인 전
export const MobileNotLoggedIn: Story = {
  args: {
    initialLoggedIn: false,
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    Story => (
      <div
        style={{
          width: '737px',
          height: '40px',
          position: 'relative',
          margin: '20px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

// Mobile 버전 - 로그인 후
export const MobileLoggedIn: Story = {
  args: {
    initialLoggedIn: true,
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    Story => (
      <div
        style={{
          width: '737px',
          height: '40px',
          position: 'relative',
          margin: '20px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
