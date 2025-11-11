import type { Meta, StoryObj } from '@storybook/react-vite';
import Typography from '../../components/Typography';
// colors.css와 font.css는 index.css에서 import됨

const meta = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'text-24b',
        'text-24sb',
        'text-24m',
        'text-24r',
        'text-20b',
        'text-20sb',
        'text-20m',
        'text-20r',
        'text-18b',
        'text-18sb',
        'text-18m',
        'text-18r',
        'text-16b',
        'text-16sb',
        'text-16m',
        'text-16r',
        'text-14b',
        'text-14sb',
        'text-14m',
        'text-14r',
        'text-12b',
        'text-12sb',
        'text-12m',
        'text-12r',
      ],
      description: '텍스트 스타일 변형',
    },
    sampleText: {
      control: 'text',
      description: '샘플 텍스트',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// 24px Variants
export const Text24Bold: Story = {
  args: {
    variant: 'text-24b',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text24SemiBold: Story = {
  args: {
    variant: 'text-24sb',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text24Medium: Story = {
  args: {
    variant: 'text-24m',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text24Regular: Story = {
  args: {
    variant: 'text-24r',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

// 20px Variants
export const Text20Bold: Story = {
  args: {
    variant: 'text-20b',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text20SemiBold: Story = {
  args: {
    variant: 'text-20sb',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text20Medium: Story = {
  args: {
    variant: 'text-20m',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text20Regular: Story = {
  args: {
    variant: 'text-20r',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

// 18px Variants
export const Text18Bold: Story = {
  args: {
    variant: 'text-18b',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text18SemiBold: Story = {
  args: {
    variant: 'text-18sb',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text18Medium: Story = {
  args: {
    variant: 'text-18m',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text18Regular: Story = {
  args: {
    variant: 'text-18r',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

// 16px Variants
export const Text16Bold: Story = {
  args: {
    variant: 'text-16b',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text16SemiBold: Story = {
  args: {
    variant: 'text-16sb',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text16Medium: Story = {
  args: {
    variant: 'text-16m',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text16Regular: Story = {
  args: {
    variant: 'text-16r',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

// 14px Variants
export const Text14Bold: Story = {
  args: {
    variant: 'text-14b',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text14SemiBold: Story = {
  args: {
    variant: 'text-14sb',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text14Medium: Story = {
  args: {
    variant: 'text-14m',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text14Regular: Story = {
  args: {
    variant: 'text-14r',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

// 12px Variants
export const Text12Bold: Story = {
  args: {
    variant: 'text-12b',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text12SemiBold: Story = {
  args: {
    variant: 'text-12sb',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text12Medium: Story = {
  args: {
    variant: 'text-12m',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Text12Regular: Story = {
  args: {
    variant: 'text-12r',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
};

// All Typography Overview
export const AllTypography: Story = {
  args: {
    variant: 'text-16m',
  },
  render: () => (
    <div style={{ padding: '24px' }}>
      {/* 24px */}
      <section style={{ marginBottom: '48px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '24px',
            color: '#1F2937',
          }}
        >
          24px
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography variant="text-24b" />
          <Typography variant="text-24sb" />
          <Typography variant="text-24m" />
          <Typography variant="text-24r" />
        </div>
      </section>

      {/* 20px */}
      <section style={{ marginBottom: '48px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '24px',
            color: '#1F2937',
          }}
        >
          20px
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography variant="text-20b" />
          <Typography variant="text-20sb" />
          <Typography variant="text-20m" />
          <Typography variant="text-20r" />
        </div>
      </section>

      {/* 18px */}
      <section style={{ marginBottom: '48px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '24px',
            color: '#1F2937',
          }}
        >
          18px
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography variant="text-18b" />
          <Typography variant="text-18sb" />
          <Typography variant="text-18m" />
          <Typography variant="text-18r" />
        </div>
      </section>

      {/* 16px */}
      <section style={{ marginBottom: '48px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '24px',
            color: '#1F2937',
          }}
        >
          16px
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography variant="text-16b" />
          <Typography variant="text-16sb" />
          <Typography variant="text-16m" />
          <Typography variant="text-16r" />
        </div>
      </section>

      {/* 14px */}
      <section style={{ marginBottom: '48px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '24px',
            color: '#1F2937',
          }}
        >
          14px
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography variant="text-14b" />
          <Typography variant="text-14sb" />
          <Typography variant="text-14m" />
          <Typography variant="text-14r" />
        </div>
      </section>

      {/* 12px */}
      <section>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '24px',
            color: '#1F2937',
          }}
        >
          12px
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography variant="text-12b" />
          <Typography variant="text-12sb" />
          <Typography variant="text-12m" />
          <Typography variant="text-12r" />
        </div>
      </section>
    </div>
  ),
};
