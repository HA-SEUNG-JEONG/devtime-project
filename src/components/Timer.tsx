import React from 'react';

export interface TimerProps {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const Timer: React.FC<TimerProps> = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
}) => {
  // 숫자를 2자리 문자열로 포맷팅
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="flex flex-row items-center gap-[48px] w-[1032px] h-[298px]">
      {/* Hours Frame */}
      <div className="box-border flex flex-col items-center p-2 pb-9 gap-9 w-[264px] h-[298px] bg-linear-to-br from-primary/0 to-primary-30 border border-primary rounded-xl flex-none order-0 grow-0">
        <div className="w-[250px] h-[200px] font-digital-numbers font-normal text-[154px] leading-[200px] text-primary text-center flex items-center justify-center flex-none order-0 grow-0">
          {formatNumber(hours)}
        </div>
        <div className="w-[62px] h-[18px] font-pretendard font-semibold text-sm leading-[18px] text-center text-primary flex-none order-1 grow-0">
          H O U R S
        </div>
      </div>

      {/* Separator */}
      <div className="flex flex-col items-start gap-16 w-6 h-[112px] flex-none order-1 grow-0">
        <div className="w-6 h-6 bg-primary rounded-full flex-none order-0 self-stretch grow-0" />
        <div className="w-6 h-6 bg-primary rounded-full flex-none order-1 self-stretch grow-0" />
      </div>

      {/* Minutes Frame */}
      <div className="box-border flex flex-col items-center p-2 pb-9 gap-9 w-[264px] h-[298px] bg-linear-to-br from-primary/0 to-primary-30 border border-primary rounded-xl flex-none order-2 grow-0">
        <div className="w-[250px] h-[200px] font-digital-numbers font-normal text-[154px] leading-[200px] text-primary text-center flex items-center justify-center flex-none order-0 grow-0">
          {formatNumber(minutes)}
        </div>
        <div className="w-[82px] h-[18px] font-pretendard font-semibold text-sm leading-[18px] text-center text-primary flex-none order-1 grow-0">
          M I N U T E S
        </div>
      </div>

      {/* Separator */}
      <div className="flex flex-col items-start gap-16 w-6 h-[112px] flex-none order-3 grow-0">
        <div className="w-6 h-6 bg-primary rounded-full flex-none order-0 self-stretch grow-0" />
        <div className="w-6 h-6 bg-primary rounded-full flex-none order-1 self-stretch grow-0" />
      </div>

      {/* Seconds Frame */}
      <div className="box-border flex flex-col items-center p-2 pb-9 gap-9 w-[264px] h-[298px] bg-linear-to-br from-primary/0 to-primary-30 border border-primary rounded-xl flex-none order-4 grow-0">
        <div className="w-[250px] h-[200px] font-digital-numbers font-normal text-[154px] leading-[200px] text-primary text-center flex items-center justify-center flex-none order-0 grow-0">
          {formatNumber(seconds)}
        </div>
        <div className="w-[86px] h-[18px] font-pretendard font-semibold text-sm leading-[18px] text-center text-primary flex-none order-1 grow-0">
          S E C O N D S
        </div>
      </div>
    </div>
  );
};

export default Timer;
