import React from 'react';

export type TimerState = 'ready' | 'paused' | 'in-progress';

export interface TimerActionProps {
  state: TimerState;
  onStart?: () => void;
  onPause?: () => void;
  onFinish?: () => void;
  onSeeTodo?: () => void;
  onReset?: () => void;
}

const TimerAction: React.FC<TimerActionProps> = ({
  state,
  onStart,
  onPause,
  onFinish,
  onSeeTodo,
  onReset,
}) => {
  // 상태별 버튼 활성화 여부 결정
  const isStartEnabled = state === 'ready' || state === 'paused';
  const isPauseEnabled = state === 'in-progress';
  const isFinishEnabled = state === 'paused' || state === 'in-progress';
  const isSeeTodoEnabled = state === 'paused' || state === 'in-progress';
  const isResetEnabled = state === 'paused' || state === 'in-progress';

  // Main-action 버튼 스타일
  const getMainActionButtonStyle = (enabled: boolean) => {
    return enabled ? 'bg-primary rounded-lg' : 'bg-primary-10 rounded-lg';
  };

  // Sub-action 버튼 아이콘 이미지 경로
  const getSeeTodoIcon = () => {
    return isSeeTodoEnabled
      ? '/See TODO-enabled.png'
      : '/See TODO-disabled.png';
  };

  const getResetIcon = () => {
    return isResetEnabled ? '/Reset-enabled.png' : '/Reset-disabled.png';
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-8 lg:gap-[134px] w-full lg:w-[746px] h-auto lg:h-[100px]">
      {/* Main-action */}
      <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-[80px] w-full sm:w-auto lg:w-[460px] h-auto lg:h-[100px]">
        {/* Start */}
        <button
          onClick={onStart}
          disabled={!isStartEnabled}
          className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-[100px] lg:h-[100px] shrink-0 ${getMainActionButtonStyle(
            isStartEnabled
          )} flex items-center justify-center disabled:cursor-not-allowed`}
        >
          <img
            src={isStartEnabled ? '/Start-enabled.png' : '/Start-disabled.png'}
            alt="Start"
            className="w-full h-full object-contain"
          />
        </button>

        {/* Pause */}
        <button
          onClick={onPause}
          disabled={!isPauseEnabled}
          className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-[100px] lg:h-[100px] shrink-0 ${getMainActionButtonStyle(
            isPauseEnabled
          )} flex items-center justify-center disabled:cursor-not-allowed`}
        >
          <img
            src={isPauseEnabled ? '/Pause-enabled.png' : '/Pause-disabled.png'}
            alt="Pause"
            className="w-full h-full object-contain"
          />
        </button>

        {/* Finish */}
        <button
          onClick={onFinish}
          disabled={!isFinishEnabled}
          className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-[100px] lg:h-[100px] shrink-0 ${getMainActionButtonStyle(
            isFinishEnabled
          )} flex items-center justify-center disabled:cursor-not-allowed`}
        >
          <img
            src={
              isFinishEnabled ? '/Finish-enabled.png' : '/Finish-disabled.png'
            }
            alt="Finish"
            className="w-full h-full object-contain"
          />
        </button>
      </div>

      {/* Sub-action */}
      <div className="flex flex-row items-center justify-center gap-4 sm:gap-5 lg:gap-6 w-full sm:w-auto lg:w-[152px] h-auto lg:h-[64px]">
        {/* See TODO */}
        <button
          onClick={onSeeTodo}
          disabled={!isSeeTodoEnabled}
          className="flex flex-row items-center p-1.5 sm:p-2 gap-2 sm:gap-[10px] w-12 h-12 sm:w-14 sm:h-14 lg:w-[64px] lg:h-[64px] bg-white rounded-full sm:rounded-[28px] lg:rounded-[32px] disabled:cursor-not-allowed"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center">
            <img
              src={getSeeTodoIcon()}
              alt="See TODO"
              className="w-full h-full object-contain"
            />
          </div>
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          disabled={!isResetEnabled}
          className="flex flex-row items-center p-1.5 sm:p-2 gap-2 sm:gap-[10px] w-12 h-12 sm:w-14 sm:h-14 lg:w-[64px] lg:h-[64px] bg-white rounded-full sm:rounded-[28px] lg:rounded-[32px] disabled:cursor-not-allowed"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center">
            <img
              src={getResetIcon()}
              alt="Reset"
              className="w-full h-full object-contain"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default TimerAction;
