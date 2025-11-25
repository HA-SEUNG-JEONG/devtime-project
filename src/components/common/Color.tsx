import React from 'react';

interface ColorProps {
  name: string;
  color: string;
  width?: number;
  height?: number;
}

const Color: React.FC<ColorProps> = ({
  name,
  color,
  width = 80,
  height = 60,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {/* 색상 박스 */}
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: color,
          borderRadius: '3px',
        }}
      />
      {/* 색상 정보 (박스 밖) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div
          style={{
            color: '#1F2937',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {name}
        </div>
        <div
          style={{
            color: '#6B7280',
            fontSize: '10px',
            fontWeight: 400,
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            lineHeight: '1.4',
          }}
        >
          {color}
        </div>
      </div>
    </div>
  );
};

export default Color;
