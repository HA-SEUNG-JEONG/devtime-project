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
    <div className="flex flex-row items-center gap-[134px] w-[746px] h-[100px]">
      {/* Main-action */}
      <div className="flex flex-row items-center gap-[80px] w-[460px] h-[100px]">
        {/* Start */}
        <button
          onClick={onStart}
          disabled={!isStartEnabled}
          className={`w-[100px] h-[100px] shrink-0 ${getMainActionButtonStyle(
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
          className={`w-[100px] h-[100px] shrink-0 ${getMainActionButtonStyle(
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
          className={`w-[100px] h-[100px] shrink-0 ${getMainActionButtonStyle(
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
      <div className="flex flex-row items-center gap-6 w-[152px] h-[64px]">
        {/* See TODO */}
        <button
          onClick={onSeeTodo}
          disabled={!isSeeTodoEnabled}
          className="flex flex-row items-center p-2 gap-[10px] w-[64px] h-[64px] bg-white rounded-[32px] disabled:cursor-not-allowed"
        >
          <div className="w-12 h-12 flex items-center justify-center">
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
          className="flex flex-row items-center p-2 gap-[10px] w-[64px] h-[64px] bg-white rounded-[32px] disabled:cursor-not-allowed"
        >
          <div className="w-12 h-12 flex items-center justify-center">
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
