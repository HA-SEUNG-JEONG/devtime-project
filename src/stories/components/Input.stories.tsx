import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import Input from '@/components/common/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['ready', 'typing', 'typed'],
      description: 'Input의 상태 (Ready, Typing, Typed)',
    },
    value: {
      control: 'text',
      description: '입력된 값',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// State=Ready - Placeholder 상태
export const Ready: Story = {
  args: {
    variant: 'ready',
    placeholder: 'Placeholder',
  },
};

// State=Typing - 입력 중 상태 (실제 입력 가능)
export const Typing: Story = {
  render: args => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        variant="typing"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Placeholder"
      />
    );
  },
  args: {
    variant: 'typing',
    placeholder: 'Placeholder',
  },
};

// State=Typed - 입력 완료 상태
export const Typed: Story = {
  args: {
    variant: 'typed',
    value: 'Typed',
  },
};

// 커스텀 플레이스홀더
export const CustomPlaceholder: Story = {
  args: {
    variant: 'ready',
    placeholder: '검색어를 입력하세요',
  },
};

// 커스텀 너비
export const CustomWidth: Story = {
  args: {
    variant: 'ready',
    placeholder: 'Placeholder',
    className: 'w-[300px]',
  },
};

// 모든 상태 비교
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm text-gray-600">Ready State</p>
        <Input variant="ready" placeholder="Placeholder" />
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-600">Typing State</p>
        <Input variant="typing" placeholder="Placeholder" value="Typing" />
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-600">Typed State</p>
        <Input variant="typed" value="Typed" />
      </div>
    </div>
  ),
};

// 추가 버튼과 함께 사용 - 기본 (Input 내부)
export const WithAddButton: Story = {
  render: () => (
    <div className="w-[400px]">
      <Input
        variant="ready"
        placeholder="항목을 입력하세요"
        rightElement={
          <button
            type="button"
            className="text-16sb text-primary hover:text-primary-dark transition-colors whitespace-nowrap"
          >
            추가
          </button>
        }
      />
    </div>
  ),
};

// 추가 버튼과 함께 사용 - 인터랙티브 (Input 내부)
export const WithAddButtonInteractive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [items, setItems] = useState<string[]>([]);

    const handleAdd = () => {
      if (value.trim()) {
        setItems([...items, value]);
        setValue('');
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleAdd();
      }
    };

    return (
      <div className="flex flex-col gap-4 w-[400px]">
        <Input
          variant={value ? 'typing' : 'ready'}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="항목을 입력하세요"
          rightElement={
            <button
              type="button"
              onClick={handleAdd}
              disabled={!value.trim()}
              className="text-16sb text-primary hover:text-primary-dark disabled:text-gray-400 transition-colors whitespace-nowrap"
            >
              추가
            </button>
          }
        />
        {items.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            <p className="text-sm text-gray-600">추가된 항목:</p>
            <ul className="flex flex-col gap-1">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-800 p-2 bg-gray-50 rounded"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

// 할일 추가 예제 (Input 내부)
export const AddTodoExample: Story = {
  render: () => {
    const [todoText, setTodoText] = useState('');
    const [todos, setTodos] = useState<Array<{ id: number; text: string }>>([]);

    const handleAddTodo = () => {
      if (todoText.trim()) {
        setTodos([...todos, { id: Date.now(), text: todoText }]);
        setTodoText('');
      }
    };

    const handleRemoveTodo = (id: number) => {
      setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
      <div className="flex flex-col gap-4 w-[500px]">
        <h3 className="text-lg font-semibold text-gray-800">할일 목록</h3>
        <Input
          variant={todoText ? 'typing' : 'ready'}
          value={todoText}
          onChange={e => setTodoText(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') handleAddTodo();
          }}
          placeholder="할일을 입력하세요"
          rightElement={
            <button
              type="button"
              onClick={handleAddTodo}
              disabled={!todoText.trim()}
              className="text-16sb text-primary hover:text-primary-dark disabled:text-gray-400 transition-colors whitespace-nowrap"
            >
              추가
            </button>
          }
        />
        {todos.length > 0 && (
          <div className="flex flex-col gap-2">
            {todos.map(todo => (
              <div
                key={todo.id}
                className="flex flex-row items-center justify-between p-3 bg-gray-50 rounded-[5px]"
              >
                <span className="text-16m text-gray-800">{todo.text}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTodo(todo.id)}
                  className="text-14m text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        )}
        {todos.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">
            할일을 추가해보세요!
          </p>
        )}
      </div>
    );
  },
};
