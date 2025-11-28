// TimerAction의 초기 상태는 ready? paused? in-progress?
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import Button from './Button';
import InputLabel from './InputLabel';
import TodoItem from './TodoItem';

export type TimerState = 'ready' | 'paused' | 'in-progress';

export interface TimerActionProps {
  state: TimerState;
  onStart?: (goal: string, tasks: string[]) => void;
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
  // 타이머를 재생할려면 오늘의 목표와 최소 한 개 이상의 할 일 목록이 작성되어야 함
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goal, setGoal] = useState('');
  const [todoList, setTodoList] = useState('');
  const [todoItems, setTodoItems] = useState<
    Array<{
      id: string;
      text: string;
      status:
        | 'list-adding'
        | 'typing'
        | 'checkable'
        | 'checked'
        | 'completed'
        | 'failed';
    }>
  >([]);

  const isStartEnabled = state === 'ready';
  const isPauseEnabled = state === 'in-progress' || state === 'paused';
  const isFinishEnabled = state === 'in-progress' || state === 'paused';

  const isSeeTodoEnabled = state === 'paused' || state === 'in-progress';
  const isResetEnabled = state === 'paused' || state === 'in-progress';

  const handleStartClick = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    if (goal.trim() && todoItems.length > 0) {
      const tasks = todoItems.map(item => item.text);
      onStart?.(goal.trim(), tasks);
      setIsModalOpen(false);
      setGoal('');
      setTodoList('');
      setTodoItems([]);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setGoal('');
    setTodoList('');
    setTodoItems([]);
  };

  const handleAddTodo = () => {
    if (todoList.trim()) {
      const newTodo = {
        id: Date.now().toString(),
        text: todoList.trim(),
        status: 'list-adding' as const,
      };
      setTodoItems([...todoItems, newTodo]);
      setTodoList('');
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  // 메인 액션 버튼 설정
  const mainActions = [
    {
      name: 'start',
      enabled: isStartEnabled,
      handler: handleStartClick,
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
      name: 'TODO',
      enabled: isSeeTodoEnabled,
      handler: onSeeTodo,
      label: '할 일 목록 보기',
    },
    {
      name: 'reset',
      enabled: isResetEnabled,
      handler: onReset,
      label: '타이머 초기화',
    },
  ] as const;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-8 lg:gap-[134px] lg:w-[746px] h-auto lg:h-[100px]">
      {/* Main-action */}
      <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-[80px] w-full sm:w-auto lg:w-[460px] h-auto lg:h-[100px]">
        {mainActions.map(({ name, enabled, handler, label }) => (
          <button
            key={name}
            onClick={handler}
            disabled={!enabled}
            aria-label={label}
            aria-disabled={!enabled}
            className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-[100px] lg:h-[100px] shrink-0 flex items-center justify-center disabled:cursor-not-allowed`}
          >
            {enabled && (
              <img
                src={`/${name.charAt(0) + name.slice(1)}-enabled.png`}
                alt={label}
                className="w-full h-full object-contain"
              />
            )}
            {!enabled && (
              <img
                src={`/${name.charAt(0) + name.slice(1)}-disabled.png`}
                alt={label}
                className="w-full h-full object-contain"
              />
            )}
          </button>
        ))}
      </div>

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

      {/* 타이머 시작 모달 */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="flex flex-col p-4 sm:p-6 gap-4 sm:gap-6 w-full sm:w-[400px] lg:w-[500px]">
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* 오늘의 목표 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="goal"
                className="text-14m sm:text-16m text-gray-900"
              >
                오늘의 목표
              </label>
              <InputLabel
                variant="typing"
                value={goal}
                onChange={e => setGoal(e.target.value)}
                placeholder="오늘의 목표를 입력하세요"
                maxLength={30}
                className="w-full"
              />
            </div>

            {/* 할 일 목록 */}
            <div className="flex flex-col gap-2">
              <label className="text-14m sm:text-16m text-gray-900">
                할 일 목록
              </label>
              <InputLabel
                variant="typing"
                value={todoList}
                onChange={e => setTodoList(e.target.value)}
                placeholder="할 일 목록을 입력하세요"
                helperText="추가"
                onHelperTextClick={handleAddTodo}
                maxLength={30}
                className="w-full"
              />
              {/* TodoItem 리스트 */}
              {todoItems.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                  {todoItems.map(item => (
                    <TodoItem
                      key={item.id}
                      status={item.status}
                      text={item.text}
                      onDelete={() => handleDeleteTodo(item.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex-row items-start gap-4 sm:gap-4 sm:justify-end">
            <Button priority="tertiary" onClick={handleModalCancel}>
              취소
            </Button>
            <Button
              priority="primary"
              onClick={handleModalConfirm}
              disabled={!goal.trim() || todoItems.length === 0}
            >
              시작하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimerAction;
