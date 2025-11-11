import type { Meta, StoryObj } from '@storybook/react-vite';
// colors.css와 font.css는 index.css에서 import됨

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 색상 카드 컴포넌트
const ColorCard = ({
  name,
  value,
  description,
}: {
  name: string;
  value: string;
  description?: string;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      backgroundColor: '#ffffff',
    }}
  >
    <div
      style={{
        width: '100%',
        height: '80px',
        backgroundColor: value,
        borderRadius: '4px',
        border: '1px solid #e5e7eb',
        marginBottom: '8px',
      }}
    />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#1f2937',
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: '14px',
          color: '#717887',
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        {value}
      </div>
      {description && (
        <div
          style={{
            fontSize: '12px',
            color: '#969da8',
            fontFamily: 'Pretendard, sans-serif',
            marginTop: '4px',
          }}
        >
          {description}
        </div>
      )}
    </div>
  </div>
);

// Primary Colors
export const PrimaryColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#1f2937',
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        Primary Colors
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        <ColorCard
          name="Primary"
          value="#4c79ff"
          description="메인 브랜드 컬러"
        />
        <ColorCard
          name="Primary 10%"
          value="rgba(76, 121, 255, 0.1)"
          description="10% 투명도"
        />
        <ColorCard
          name="Primary 30%"
          value="rgba(76, 121, 255, 0.3)"
          description="30% 투명도"
        />
        <ColorCard name="Primary 2" value="#78b0ff" description="밝은 톤" />
      </div>
    </div>
  ),
};

// Secondary Colors
export const SecondaryColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#1f2937',
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        Secondary Colors
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        <ColorCard name="Indigo" value="#023e99" description="진한 인디고" />
        <ColorCard
          name="Indigo Light"
          value="#a3c3ff"
          description="밝은 인디고"
        />
        <ColorCard
          name="Informative"
          value="#2563eb"
          description="정보성 컬러"
        />
        <ColorCard name="Negative" value="#dc2626" description="에러/경고" />
        <ColorCard name="Notice" value="#fbbf24" description="알림 컬러" />
        <ColorCard
          name="Notice Light"
          value="#ffdb7f"
          description="밝은 알림"
        />
        <ColorCard name="Positive" value="#22c55e" description="성공/긍정" />
        <ColorCard
          name="Positive Light"
          value="#62ec95"
          description="밝은 긍정"
        />
        <ColorCard name="Fuchsia" value="#fd28ec" description="포커스 링" />
        <ColorCard
          name="Fuchsia Light"
          value="#ff87f5"
          description="밝은 푸크시아"
        />
      </div>
    </div>
  ),
};

// Gray Scale
export const GrayScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#1f2937',
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        Gray Scale
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        <ColorCard name="Gray (White)" value="#ffffff" description="흰색" />
        <ColorCard
          name="Gray 50"
          value="#f9fafb"
          description="가장 밝은 회색"
        />
        <ColorCard name="Gray 100" value="#f0f2f5" description="밝은 회색" />
        <ColorCard name="Gray 200" value="#e5e7eb" description="연한 회색" />
        <ColorCard name="Gray 300" value="#ccd0d6" description="중간 회색" />
        <ColorCard name="Gray 400" value="#969da8" description="회색" />
        <ColorCard
          name="Gray 500"
          value="#717887"
          description="중간 어두운 회색"
        />
        <ColorCard name="Gray 600" value="#4b5563" description="어두운 회색" />
        <ColorCard
          name="Gray 700"
          value="#394252"
          description="더 어두운 회색"
        />
        <ColorCard
          name="Gray 800"
          value="#1f2937"
          description="가장 어두운 회색"
        />
      </div>
    </div>
  ),
};

// State Colors
export const StateColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#1f2937',
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        State Colors
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        <ColorCard
          name="Disabled"
          value="#969da8"
          description="비활성화 상태"
        />
        <ColorCard
          name="Focus Ring"
          value="#fd28ec"
          description="포커스 링 컬러"
        />
        <ColorCard
          name="Dim 50%"
          value="rgba(0, 0, 0, 0.5)"
          description="50% 어둡게"
        />
        <ColorCard
          name="Dim 70%"
          value="rgba(0, 0, 0, 0.7)"
          description="70% 어둡게"
        />
        <ColorCard
          name="Border 300"
          value="#ccd0d6"
          description="테두리 컬러"
        />
        <ColorCard name="Shadow" value="#000000" description="그림자 컬러" />
      </div>
    </div>
  ),
};

// All Colors Overview
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#1f2937',
            fontFamily: 'Pretendard, sans-serif',
          }}
        >
          Primary Colors
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          <ColorCard
            name="Primary"
            value="#4c79ff"
            description="메인 브랜드 컬러"
          />
          <ColorCard
            name="Primary 10%"
            value="rgba(76, 121, 255, 0.1)"
            description="10% 투명도"
          />
          <ColorCard
            name="Primary 30%"
            value="rgba(76, 121, 255, 0.3)"
            description="30% 투명도"
          />
          <ColorCard name="Primary 2" value="#78b0ff" description="밝은 톤" />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#1f2937',
            fontFamily: 'Pretendard, sans-serif',
          }}
        >
          Secondary Colors
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          <ColorCard name="Indigo" value="#023e99" description="진한 인디고" />
          <ColorCard
            name="Indigo Light"
            value="#a3c3ff"
            description="밝은 인디고"
          />
          <ColorCard
            name="Informative"
            value="#2563eb"
            description="정보성 컬러"
          />
          <ColorCard name="Negative" value="#dc2626" description="에러/경고" />
          <ColorCard name="Notice" value="#fbbf24" description="알림 컬러" />
          <ColorCard
            name="Notice Light"
            value="#ffdb7f"
            description="밝은 알림"
          />
          <ColorCard name="Positive" value="#22c55e" description="성공/긍정" />
          <ColorCard
            name="Positive Light"
            value="#62ec95"
            description="밝은 긍정"
          />
          <ColorCard name="Fuchsia" value="#fd28ec" description="포커스 링" />
          <ColorCard
            name="Fuchsia Light"
            value="#ff87f5"
            description="밝은 푸크시아"
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#1f2937',
            fontFamily: 'Pretendard, sans-serif',
          }}
        >
          Gray Scale
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          <ColorCard name="Gray (White)" value="#ffffff" description="흰색" />
          <ColorCard
            name="Gray 50"
            value="#f9fafb"
            description="가장 밝은 회색"
          />
          <ColorCard name="Gray 100" value="#f0f2f5" description="밝은 회색" />
          <ColorCard name="Gray 200" value="#e5e7eb" description="연한 회색" />
          <ColorCard name="Gray 300" value="#ccd0d6" description="중간 회색" />
          <ColorCard name="Gray 400" value="#969da8" description="회색" />
          <ColorCard
            name="Gray 500"
            value="#717887"
            description="중간 어두운 회색"
          />
          <ColorCard
            name="Gray 600"
            value="#4b5563"
            description="어두운 회색"
          />
          <ColorCard
            name="Gray 700"
            value="#394252"
            description="더 어두운 회색"
          />
          <ColorCard
            name="Gray 800"
            value="#1f2937"
            description="가장 어두운 회색"
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#1f2937',
            fontFamily: 'Pretendard, sans-serif',
          }}
        >
          State Colors
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          <ColorCard
            name="Disabled"
            value="#969da8"
            description="비활성화 상태"
          />
          <ColorCard
            name="Focus Ring"
            value="#fd28ec"
            description="포커스 링 컬러"
          />
          <ColorCard
            name="Dim 50%"
            value="rgba(0, 0, 0, 0.5)"
            description="50% 어둡게"
          />
          <ColorCard
            name="Dim 70%"
            value="rgba(0, 0, 0, 0.7)"
            description="70% 어둡게"
          />
          <ColorCard
            name="Border 300"
            value="#ccd0d6"
            description="테두리 컬러"
          />
          <ColorCard name="Shadow" value="#000000" description="그림자 컬러" />
        </div>
      </div>
    </div>
  ),
};
