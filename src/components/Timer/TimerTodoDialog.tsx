import { useState, useCallback, useEffect, useRef } from "react";
import { CustomDialog } from "@/components/Dialog/CustomDialog";
import { CustomButton } from "@/components/Button/CustomButton";
import TaskItem, { type Task } from "./TaskItem";
import TextField from "../Text/TextField";
import { cn } from "@/lib/utils";

interface TimerTodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (tasks: Task[]) => Promise<void>;
  todayGoal: string;
  initialTasks: Task[];
  isLoading?: boolean;
}

const generateId = () =>
  `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const TimerTodoDialog = ({
  open,
  onOpenChange,
  onSave,
  todayGoal,
  initialTasks,
  isLoading = false,
}: TimerTodoDialogProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const prevOpenRef = useRef(open);

  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setTasks(initialTasks);
      setNewTaskContent("");
    }
    prevOpenRef.current = open;
  }, [open, initialTasks]);

  const handleAddTask = useCallback(() => {
    const trimmed = newTaskContent.trim();
    if (!trimmed || trimmed.length > 30) return;

    const newTask: Task = {
      id: generateId(),
      content: trimmed,
      isCompleted: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskContent("");
  }, [newTaskContent]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleAddTask();
    }
  };

  const handleToggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  }, []);

  const handleEditTask = useCallback((id: string, content: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, content } : task)),
    );
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(tasks);
      onOpenChange(false);
    } catch {
      // 에러는 상위에서 처리됨
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTasks(initialTasks);
    setNewTaskContent("");
    onOpenChange(false);
  };

  const hasChanges =
    JSON.stringify(tasks) !== JSON.stringify(initialTasks);

  return (
    <CustomDialog open={open} onOpenChange={() => {}}>
      <CustomDialog.Content className="sm:max-w-lg">
        <CustomDialog.Header>
          <h2 className="typography-title-m text-left text-4xl font-bold text-gray-800">
            {todayGoal}
          </h2>
          <p className="typography-body-small-m mt-1 text-left text-gray-500">
            오늘의 목표
          </p>
        </CustomDialog.Header>

        <CustomDialog.Body className="space-y-4">
          <div className="space-y-2">
            <div className="gap-2">
              <TextField value={newTaskContent} className="relative">
                <TextField.Label>할 일 추가</TextField.Label>
                <div className="flex items-center">
                  <TextField.Input
                    hasButton
                    placeholder="할 일을 입력해 주세요"
                    value={newTaskContent}
                    onChange={(e) => setNewTaskContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={30}
                    className="h-14"
                  />
                  <button
                    type="button"
                    onClick={handleAddTask}
                    className={cn(
                      "typography-body-small-m absolute right-6 cursor-pointer border-none bg-transparent",
                      !newTaskContent.trim()
                        ? "text-gray-400"
                        : "text-primary-0",
                    )}
                    disabled={!newTaskContent.trim()}
                  >
                    추가
                  </button>
                </div>
              </TextField>
            </div>
          </div>

          {tasks.length > 0 ? (
            <div className="max-h-60 space-y-2 overflow-y-auto">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-400">
              할 일이 없습니다. 새로운 할 일을 추가해 보세요.
            </div>
          )}
        </CustomDialog.Body>

        <CustomDialog.Footer className="flex justify-end gap-2">
          <CustomButton
            variant="secondary"
            label="취소"
            onClick={handleCancel}
            disabled={isSaving || isLoading}
          />
          <CustomButton
            variant="primary"
            label={isSaving ? "저장 중..." : "저장하기"}
            onClick={handleSave}
            disabled={!hasChanges || isSaving || isLoading}
          />
        </CustomDialog.Footer>
      </CustomDialog.Content>
    </CustomDialog>
  );
};

export default TimerTodoDialog;
