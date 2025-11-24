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
  // 값 검증 및 클램핑: 시간 0-24, 분/초 0-59
  const clampHours = (value: number): number => {
    const intValue = Math.floor(value);
    if (intValue < 0) {
      console.warn(
        `Timer: hours 값이 범위를 벗어났습니다. ${value}는 0으로 클램핑됩니다.`
      );
      return 0;
    }
    if (intValue > 23) {
      console.warn(
        `Timer: hours 값이 범위를 벗어났습니다. ${value}는 24로 클램핑됩니다.`
      );
      return 23;
    }
    return intValue;
  };

  const clampMinutesOrSeconds = (
    value: number,
    type: 'minutes' | 'seconds'
  ): number => {
    const intValue = Math.floor(value);
    if (intValue < 0) {
      console.warn(
        `Timer: ${type} 값이 범위를 벗어났습니다. ${value}는 0으로 클램핑됩니다.`
      );
      return 0;
    }
    if (intValue > 59) {
      console.warn(
        `Timer: ${type} 값이 범위를 벗어났습니다. ${value}는 59로 클램핑됩니다.`
      );
      return 59;
    }
    return intValue;
  };

  const validatedHours = clampHours(hours);
  const validatedMinutes = clampMinutesOrSeconds(minutes, 'minutes');
  const validatedSeconds = clampMinutesOrSeconds(seconds, 'seconds');

  // 숫자를 2자리 문자열로 포맷팅
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-[48px] w-full lg:w-[1032px] h-auto lg:h-[298px]">
      {/* Hours Frame */}
      <div className="box-border p-2 pb-4 sm:pb-6 lg:pb-9 gap-4 sm:gap-6 lg:gap-9 w-full sm:w-[200px] lg:w-[264px] h-auto lg:h-[298px] bg-linear-to-br from-primary/0 to-primary-30 border border-primary rounded-xl flex-none order-0 grow-0">
        <div className="font-digital-numbers font-normal text-[80px] sm:text-[100px] lg:text-[154px] leading-[100px] sm:leading-[130px] lg:leading-[200px] text-primary text-center flex items-center justify-center flex-none order-0 grow-0 mb-4 sm:mb-6 lg:mb-9">
          {formatNumber(validatedHours)}
        </div>
        <div className="font-pretendard text-14sb sm:text-16sb lg:text-18sb text-center text-primary flex-none order-1 grow-0">
          HOURS
        </div>
      </div>

      {/* Separator */}
      <div className="flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-12 lg:gap-16 w-auto sm:w-4 lg:w-6 h-4 sm:h-[80px] lg:h-[112px] flex-none order-1 grow-0">
        <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-primary rounded-full flex-none order-0" />
        <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-primary rounded-full flex-none order-1" />
      </div>

      {/* Minutes Frame */}
      <div className="box-border items-center p-2 pb-4 sm:pb-6 lg:pb-9 gap-4 sm:gap-6 lg:gap-9 w-full sm:w-[200px] lg:w-[264px] h-auto lg:h-[298px] bg-linear-to-br from-primary/0 to-primary-30 border border-primary rounded-xl flex-none order-2 grow-0">
        <div className="font-digital-numbers font-normal text-[80px] sm:text-[100px] lg:text-[154px] leading-[100px] sm:leading-[130px] lg:leading-[200px] text-primary text-center flex items-center justify-center flex-none order-0 grow-0 mb-4 sm:mb-6 lg:mb-9">
          {formatNumber(validatedMinutes)}
        </div>
        <div className="font-pretendard text-14sb sm:text-16sb lg:text-18sb text-center text-primary flex-none order-1 grow-0">
          MINUTES
        </div>
      </div>

      {/* Separator */}
      <div className="flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-12 lg:gap-16 w-auto sm:w-4 lg:w-6 h-4 sm:h-[80px] lg:h-[112px] flex-none order-3 grow-0">
        <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-primary rounded-full flex-none order-0" />
        <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-primary rounded-full flex-none order-1" />
      </div>

      {/* Seconds Frame */}
      <div className="box-border items-center p-2 pb-4 sm:pb-6 lg:pb-9 gap-4 sm:gap-6 lg:gap-9 w-full sm:w-[200px] lg:w-[264px] h-auto lg:h-[298px] bg-linear-to-br from-primary/0 to-primary-30 border border-primary rounded-xl flex-none order-4 grow-0">
        <div className="font-digital-numbers font-normal text-[80px] sm:text-[100px] lg:text-[154px] leading-[100px] sm:leading-[130px] lg:leading-[200px] text-primary text-center flex items-center justify-center flex-none order-0 grow-0 mb-4 sm:mb-6 lg:mb-9">
          {formatNumber(validatedSeconds)}
        </div>
        <div className="font-pretendard text-14sb sm:text-16sb lg:text-18sb text-center text-primary flex-none order-1 grow-0">
          SECONDS
        </div>
      </div>
    </div>
  );
};

export default Timer;
