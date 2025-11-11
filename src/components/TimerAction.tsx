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
    return enabled ? 'bg-primary rounded-lg' : 'rounded-lg';
  };

  // 메인 액션 버튼 설정
  const mainActions = [
    {
      name: 'start',
      enabled: isStartEnabled,
      handler: onStart,
      label: '타이머 시작',
    },
    {
      name: 'pause',
      enabled: isPauseEnabled,
      handler: onPause,
      label: '타이머 일시정지',
    },
    {
      name: 'finish',
      enabled: isFinishEnabled,
      handler: onFinish,
      label: '타이머 완료',
    },
  ] as const;

  // 서브 액션 버튼 설정
  const subActions = [
    {
      name: 'See TODO',
      enabled: isSeeTodoEnabled,
      handler: onSeeTodo,
      label: '할 일 목록 보기',
    },
    {
      name: 'Reset',
      enabled: isResetEnabled,
      handler: onReset,
      label: '타이머 초기화',
    },
  ] as const;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-8 lg:gap-[134px] w-full lg:w-[746px] h-auto lg:h-[100px]">
      {/* Main-action */}
      <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-[80px] w-full sm:w-auto lg:w-[460px] h-auto lg:h-[100px]">
        {mainActions.map(({ name, enabled, handler, label }) => (
          <button
            key={name}
            onClick={handler}
            disabled={!enabled}
            aria-label={label}
            aria-disabled={!enabled}
            className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-[100px] lg:h-[100px] shrink-0 ${getMainActionButtonStyle(
              enabled
            )} flex items-center justify-center disabled:cursor-not-allowed`}
          >
            <img
              src={
                enabled
                  ? `/${name.charAt(0).toUpperCase() + name.slice(1)}-enabled.png`
                  : `/${name.charAt(0).toUpperCase() + name.slice(1)}-disabled.png`
              }
              alt={label}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>

      {/* Sub-action */}
      <div className="flex flex-row items-center justify-center gap-4 sm:gap-5 lg:gap-6 w-full sm:w-auto lg:w-[152px] h-auto lg:h-[64px]">
        {subActions.map(({ name, enabled, handler, label }) => (
          <button
            key={name}
            onClick={handler}
            disabled={!enabled}
            aria-label={label}
            aria-disabled={!enabled}
            className="flex flex-row items-center p-1.5 sm:p-2 gap-2 sm:gap-[10px] w-12 h-12 sm:w-14 sm:h-14 lg:w-[64px] lg:h-[64px] bg-white rounded-full sm:rounded-[28px] lg:rounded-[32px] disabled:cursor-not-allowed"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center">
              <img
                src={enabled ? `/${name}-enabled.png` : `/${name}-disabled.png`}
                alt={label}
                className="w-full h-full object-contain"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimerAction;
