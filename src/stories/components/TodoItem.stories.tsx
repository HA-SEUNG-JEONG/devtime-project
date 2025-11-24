import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import TodoItem from '../../components/common/TodoItem';
// colors.css와 font.css는 index.css에서 import됨

const meta = {
  title: 'Components/TodoItem',
  component: TodoItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: [
        'list-adding',
        'typing',
        'checkable',
        'checked',
        'completed',
        'failed',
      ],
      description: 'TODO 아이템의 상태',
    },
    text: {
      control: 'text',
      description: 'TODO 텍스트 내용',
    },
    onEdit: {
      action: 'edit clicked',
      description: '편집 버튼 클릭 핸들러',
    },
    onDelete: {
      action: 'delete clicked',
      description: '삭제 버튼 클릭 핸들러',
    },
    onCheck: {
      action: 'check clicked',
      description: '체크 버튼 클릭 핸들러',
    },
    onTextChange: {
      action: 'text changed',
      description: '텍스트 변경 핸들러',
    },
  },
  args: {
    onEdit: fn(),
    onDelete: fn(),
    onCheck: fn(),
    onTextChange: fn(),
  },
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// List Adding - 기본 TODO 아이템 (편집, 삭제 버튼 포함)
export const ListAdding: Story = {
  args: {
    status: 'list-adding',
    text: 'TODO List Item',
    onEdit: fn(),
    onDelete: fn(),
  },
};

// Typing - 입력 중인 상태 (타이핑 중, 체크 버튼 포함)
export const Typing: Story = {
  args: {
    status: 'typing',
    text: 'Typing',
    onCheck: fn(),
    onTextChange: fn(),
  },
};

// Checkable - 체크박스가 있는 상태
export const Checkable: Story = {
  args: {
    status: 'checkable',
    text: 'TODO List Item',
    onCheck: fn(),
  },
};

// Checked - 체크된 상태 (회색 배경)
export const Checked: Story = {
  args: {
    status: 'checked',
    text: 'TODO List Item',
  },
};

// Completed - 완료된 상태
export const Completed: Story = {
  args: {
    status: 'completed',
    text: 'TODO List Item',
  },
};

// Failed - 실패한 상태 (회색 배경, 회색 텍스트)
export const Failed: Story = {
  args: {
    status: 'failed',
    text: 'TODO List Item',
  },
};

// TODO List - 모든 상태를 포함한 컨테이너
export const TODOList: Story = {
  args: {
    status: 'list-adding',
  },
  render: () => (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '20px',
        gap: '16px',
        width: '608px',
        height: '552px',
        border: '1px dashed #9747FF',
        borderRadius: '5px',
      }}
    >
      {/* Usage=List Adding */}
      <TodoItem
        status="list-adding"
        text="TODO List Item"
        onEdit={fn()}
        onDelete={fn()}
      />

      {/* Usage=Typing */}
      <TodoItem
        status="typing"
        text="Typing"
        onCheck={fn()}
        onTextChange={fn()}
      />

      {/* Usage=Checkable */}
      <TodoItem status="checkable" text="TODO List Item" onCheck={fn()} />

      {/* Usage=Checked */}
      <TodoItem status="checked" text="TODO List Item" />

      {/* Usage=Completed */}
      <TodoItem status="completed" text="TODO List Item" />

      {/* Usage=Failed */}
      <TodoItem status="failed" text="TODO List Item" />
    </div>
  ),
};

// All States Overview - 각 상태별 설명과 함께
export const AllStates: Story = {
  args: {
    status: 'list-adding',
  },
  render: () => (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <section>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1F2937',
          }}
        >
          Usage=List Adding
        </h2>
        <TodoItem
          status="list-adding"
          text="TODO List Item"
          onEdit={fn()}
          onDelete={fn()}
        />
      </section>

      <section>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1F2937',
          }}
        >
          Usage=Typing
        </h2>
        <TodoItem
          status="typing"
          text="Typing"
          onCheck={fn()}
          onTextChange={fn()}
        />
      </section>

      <section>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1F2937',
          }}
        >
          Usage=Checkable
        </h2>
        <TodoItem status="checkable" text="TODO List Item" onCheck={fn()} />
      </section>

      <section>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1F2937',
          }}
        >
          Usage=Checked
        </h2>
        <TodoItem status="checked" text="TODO List Item" />
      </section>

      <section>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1F2937',
          }}
        >
          Usage=Completed
        </h2>
        <TodoItem status="completed" text="TODO List Item" />
      </section>

      <section>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1F2937',
          }}
        >
          Usage=Failed
        </h2>
        <TodoItem status="failed" text="TODO List Item" />
      </section>
    </div>
  ),
};
