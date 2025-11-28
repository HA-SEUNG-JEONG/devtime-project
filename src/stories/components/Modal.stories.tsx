import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import TodoItem from '@/components/common/TodoItem';
import TextArea from '@/components/common/TextArea';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 할 일 목록 (수정 모드)
export const TodoListEdit: Story = {
  render: () => {
    const TodoListEditComponent = () => {
      const [newItem, setNewItem] = useState('');
      const [items, setItems] = useState([
        '코딩테스트 문제 1개 풀어보기',
        '온라인 강의 Chapter 3-4 듣기',
        '프로젝트 코드 리팩토링하기',
        '기술 면접 빈출 문항 답변 정리하기',
        '기술 블로그 작성하기',
        '오늘 공부한 내용 TIL 작성하기',
      ]);
      const [editingIndex, setEditingIndex] = useState<number | null>(null);

      const handleAddItem = () => {
        if (newItem.trim()) {
          setItems([newItem, ...items]);
          setNewItem('');
        }
      };

      const handleUpdateItem = (index: number, newText: string) => {
        const newItems = [...items];
        newItems[index] = newText;
        setItems(newItems);
      };

      const handleDeleteItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
        if (editingIndex === index) {
          setEditingIndex(null);
        } else if (editingIndex !== null && editingIndex > index) {
          setEditingIndex(editingIndex - 1);
        }
      };

      return (
        <Modal
          title="할 일 목록"
          footer={
            <>
              <Button priority="tertiary" className="w-[80px]">
                취소
              </Button>
              <Button priority="primary" className="w-[180px]">
                변경 사항 저장하기
              </Button>
            </>
          }
        >
          <Input
            variant={newItem ? 'typing' : 'ready'}
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="할 일을 추가해 주세요."
            rightElement={
              <button
                type="button"
                onClick={handleAddItem}
                className="text-16sb text-primary hover:text-primary-dark transition-colors whitespace-nowrap shrink-0"
              >
                추가
              </button>
            }
            className="w-full shrink-0"
          />
          <div className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden max-h-[200px] sm:max-h-[300px] lg:max-h-[400px] min-h-0 w-full">
            {items.map((item, index) => (
              <TodoItem
                key={index}
                status={editingIndex === index ? 'typing' : 'list-adding'}
                text={item}
                className="w-full shrink-0"
                onEdit={() => setEditingIndex(index)}
                onDelete={() => handleDeleteItem(index)}
                onCheck={() => setEditingIndex(null)}
                onTextChange={text => handleUpdateItem(index, text)}
              />
            ))}
          </div>
        </Modal>
      );
    };
    return <TodoListEditComponent />;
  },
};

// 2. 오늘의 목표 (시작 전)
export const TodayGoal: Story = {
  render: () => {
    const TodayGoalComponent = () => {
      const [goal] = useState('프로젝트 코드 리팩토링해');
      const items = [
        '코딩테스트 문제 1개 풀어보기',
        '온라인 강의 Chapter 3 듣기',
      ];

      return (
        <Modal
          title="오늘의 목표"
          footer={
            <>
              <Button priority="tertiary" className="w-[80px]">
                취소
              </Button>
              <Button priority="secondary" className="w-[160px]">
                타이머 시작하기
              </Button>
            </>
          }
        >
          <div className="flex flex-col gap-2 shrink-0">
            <p className="text-14m text-gray-600">할 일 목록</p>
            <div className="bg-gray-50 rounded-[5px] p-4 flex justify-between items-center w-full">
              <span className="text-16m text-gray-800 wrap-break-word flex-1 min-w-0">
                {goal}
              </span>
              <button className="text-16sb text-primary shrink-0 ml-2">
                추가
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0 w-full">
            {items.map((item, index) => (
              <TodoItem
                key={index}
                status="list-adding"
                text={item}
                className="w-full"
              />
            ))}
          </div>
        </Modal>
      );
    };
    return <TodayGoalComponent />;
  },
};

// 3. 오늘도 수고하셨어요! (종료 후)
export const DailyReview: Story = {
  render: () => {
    const DailyReviewComponent = () => {
      const [review, setReview] = useState(
        '생각보다 코드가 엉킨 것 같다. 내일 더 정리해봐야지.\n생각보다 코드가 엉킨 것 같다. 내일 더 정리해봐야지.\n생각보다 코드가 엉킨 것 같다. 내일 더 정리해봐야지.\n생각보다 코드가 엉킨 것 같다. 내일 더 정리해봐야지.\n생각보다 코드가 엉킨 것 같다. 내일 더 정리해봐야지.'
      );
      const [checkedItems, setCheckedItems] = useState<boolean[]>([
        true,
        true,
        true,
        true,
      ]);
      const items = [
        '코딩테스트 문제 1개 풀어보기',
        '온라인 강의 Chapter 3 듣기',
        '프로젝트 코드 리팩토링하기',
        '기술 면접 빈출 문항 답변 정리하기',
      ];

      const handleReviewChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        setReview(e.target.value);
      };

      const handleCheck = (index: number) => {
        const newChecked = [...checkedItems];
        newChecked[index] = !newChecked[index];
        setCheckedItems(newChecked);
      };

      return (
        <Modal
          title="오늘도 수고하셨어요!"
          description="완료한 일을 체크하고, 오늘의 학습 회고를 작성해 주세요."
          footer={
            <>
              <Button priority="tertiary" className="w-[80px]">
                취소
              </Button>
              <Button priority="secondary" className="w-[160px]">
                공부 완료하기
              </Button>
            </>
          }
        >
          {/* 할 일 추가 입력 필드 */}
          <Input
            variant="ready"
            placeholder="할 일을 추가해 주세요."
            rightElement={
              <button
                type="button"
                className="text-16sb text-primary hover:opacity-80 transition-opacity shrink-0"
              >
                추가
              </button>
            }
            className="w-full shrink-0"
          />

          {/* 할 일 목록 섹션 */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="flex justify-between items-center shrink-0">
              <h3 className="text-18sb text-gray-900">할 일 목록</h3>
              <button
                type="button"
                className="flex items-center gap-1 text-14m text-gray-600 hover:opacity-80 transition-opacity shrink-0"
              >
                <img src="/edit.png" alt="수정" className="w-4 h-4" />
                <span>할 일 수정</span>
              </button>
            </div>

            {/* TodoItem 리스트 */}
            <div className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden max-h-[150px] sm:max-h-[200px] lg:max-h-[300px] min-h-0 w-full">
              {items.map((item, index) => (
                <TodoItem
                  key={index}
                  status={checkedItems[index] ? 'checked' : 'checkable'}
                  text={item}
                  className="w-full shrink-0"
                  onCheck={() => handleCheck(index)}
                />
              ))}
            </div>
          </div>

          {/* 학습 회고 섹션 */}
          <div className="flex flex-col gap-2 shrink-0">
            <p className="text-14m text-gray-600">학습 회고</p>
            <TextArea
              variant="typing"
              value={review}
              onChange={handleReviewChange}
              placeholder="오늘의 학습 회고를 작성해주세요."
              className="w-full"
            />
          </div>
        </Modal>
      );
    };
    return <DailyReviewComponent />;
  },
};

// 4. 불필요한 중복 코드 줄이기 (상세)
export const DetailView: Story = {
  render: () => {
    return (
      <Modal
        title="불필요한 중복 코드 줄이기"
        footer={
          <Button priority="tertiary" className="w-full sm:w-auto">
            닫기
          </Button>
        }
      >
        <div className="flex flex-col gap-3">
          <TodoItem
            status="list-adding"
            text="TODO List Item"
            className="w-full"
          />
          <TodoItem
            status="list-adding"
            text="TODO List Item"
            className="w-full"
          />
          <TodoItem status="failed" text="TODO List Item" className="w-full" />
        </div>

        <div className="mt-8">
          <p className="text-14m text-gray-600 mb-2">한 줄 소감</p>
          <p className="text-18sb text-gray-900">
            오늘도 엄청 뿌듯하게 공부 완료!!
          </p>
        </div>
      </Modal>
    );
  },
};
