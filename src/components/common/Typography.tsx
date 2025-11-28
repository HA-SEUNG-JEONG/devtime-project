import React from 'react';

interface TypographyProps {
  variant: string;
  sampleText?: string;
}

// font.css의 정보를 기반으로 한 타입 정보 매핑
const typographyInfo: Record<
  string,
  { fontSize: string; fontWeight: string; lineHeight: string }
> = {
  'text-36b': {
    fontSize: '2.25rem (24px)',
    fontWeight: '700',
    lineHeight: '2.875rem (46px)',
  },
  'text-36sb': {
    fontSize: '2.25rem (24px)',
    fontWeight: '600',
    lineHeight: '2.875rem (46px)',
  },
  'text-36m': {
    fontSize: '2.25rem (24px)',
    fontWeight: '500',
    lineHeight: '2.875rem (46px)',
  },
  'text-36r': {
    fontSize: '2.25rem (24px)',
    fontWeight: '400',
    lineHeight: '2.875rem (46px)',
  },
  'text-24b': {
    fontSize: '1.5rem (24px)',
    fontWeight: '700',
    lineHeight: '1.875rem (30px)',
  },
  'text-24sb': {
    fontSize: '1.5rem (24px)',
    fontWeight: '600',
    lineHeight: '1.875rem (30px)',
  },
  'text-24m': {
    fontSize: '1.5rem (24px)',
    fontWeight: '500',
    lineHeight: '1.875rem (30px)',
  },
  'text-24r': {
    fontSize: '1.5rem (24px)',
    fontWeight: '400',
    lineHeight: '1.875rem (30px)',
  },
  'text-20b': {
    fontSize: '1.25rem (20px)',
    fontWeight: '700',
    lineHeight: '1.5rem (24px)',
  },
  'text-20sb': {
    fontSize: '1.25rem (20px)',
    fontWeight: '600',
    lineHeight: '1.5rem (24px)',
  },
  'text-20m': {
    fontSize: '1.25rem (20px)',
    fontWeight: '500',
    lineHeight: '1.5rem (24px)',
  },
  'text-20r': {
    fontSize: '1.25rem (20px)',
    fontWeight: '400',
    lineHeight: '1.5rem (24px)',
  },
  'text-18b': {
    fontSize: '1.125rem (18px)',
    fontWeight: '700',
    lineHeight: '1.375rem (22px)',
  },
  'text-18sb': {
    fontSize: '1.125rem (18px)',
    fontWeight: '600',
    lineHeight: '1.375rem (22px)',
  },
  'text-18m': {
    fontSize: '1.125rem (18px)',
    fontWeight: '500',
    lineHeight: '1.375rem (22px)',
  },
  'text-18r': {
    fontSize: '1.125rem (18px)',
    fontWeight: '400',
    lineHeight: '1.375rem (22px)',
  },
  'text-16b': {
    fontSize: '1rem (16px)',
    fontWeight: '700',
    lineHeight: '1.25rem (20px)',
  },
  'text-16sb': {
    fontSize: '1rem (16px)',
    fontWeight: '600',
    lineHeight: '1.25rem (20px)',
  },
  'text-16m': {
    fontSize: '1rem (16px)',
    fontWeight: '500',
    lineHeight: '1.25rem (20px)',
  },
  'text-16r': {
    fontSize: '1rem (16px)',
    fontWeight: '400',
    lineHeight: '1.25rem (20px)',
  },
  'text-14b': {
    fontSize: '0.875rem (14px)',
    fontWeight: '700',
    lineHeight: '1.125rem (18px)',
  },
  'text-14sb': {
    fontSize: '0.875rem (14px)',
    fontWeight: '600',
    lineHeight: '1.125rem (18px)',
  },
  'text-14m': {
    fontSize: '0.875rem (14px)',
    fontWeight: '500',
    lineHeight: '1.125rem (18px)',
  },
  'text-14r': {
    fontSize: '0.875rem (14px)',
    fontWeight: '400',
    lineHeight: '1.125rem (18px)',
  },
  'text-12b': {
    fontSize: '0.75rem (12px)',
    fontWeight: '700',
    lineHeight: '1rem (16px)',
  },
  'text-12sb': {
    fontSize: '0.75rem (12px)',
    fontWeight: '600',
    lineHeight: '1rem (16px)',
  },
  'text-12m': {
    fontSize: '0.75rem (12px)',
    fontWeight: '500',
    lineHeight: '1rem (16px)',
  },
  'text-12r': {
    fontSize: '0.75rem (12px)',
    fontWeight: '400',
    lineHeight: '1rem (16px)',
  },
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  sampleText = 'The quick brown fox jumps over the lazy dog',
}) => {
  const info = typographyInfo[variant] || {
    fontSize: 'N/A',
    fontWeight: 'N/A',
    lineHeight: 'N/A',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '16px',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div className={variant} style={{ color: '#1F2937' }}>
        {sampleText}
      </div>
      <div
        style={{
          fontSize: '12px',
          color: '#6B7280',
          fontFamily: 'monospace',
          marginTop: '8px',
          paddingTop: '8px',
          borderTop: '1px solid #E5E7EB',
        }}
      >
        <div>
          <strong>Class:</strong> .{variant}
        </div>
        <div style={{ marginTop: '4px' }}>
          <strong>Font Size:</strong> {info.fontSize}
        </div>
        <div style={{ marginTop: '4px' }}>
          <strong>Font Weight:</strong> {info.fontWeight}
        </div>
        <div style={{ marginTop: '4px' }}>
          <strong>Line Height:</strong> {info.lineHeight}
        </div>
      </div>
    </div>
  );
};

export default Typography;
