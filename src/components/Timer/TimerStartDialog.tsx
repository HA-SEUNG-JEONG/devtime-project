import { useState, useCallback } from "react";
import { CustomDialog } from "@/components/Dialog/CustomDialog";
import { CustomButton } from "@/components/Button/CustomButton";
import TaskItem, { type Task } from "./TaskItem";
import TextField from "../Text/TextField";
import { cn } from "@/lib/utils";

interface TimerStartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStart: (todayGoal: string, tasks: string[]) => void;
  isLoading?: boolean;
  initialGoal?: string;
  initialTasks?: Task[];
}

const TimerStartDialog = ({
  open,
  onOpenChange,
  onStart,
  isLoading = false,
  initialGoal = "",
  initialTasks = [],
}: TimerStartDialogProps) => {
  const [todayGoal, setTodayGoal] = useState(initialGoal);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskContent, setNewTaskContent] = useState("");

  const generateId = () =>
    `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  const handleAddTask = useCallback(() => {
    const trimmed = newTaskContent.trim();
    if (!trimmed || trimmed.length > 30) return;

    const newTask: Task = {
      id: generateId(),
      content: trimmed,
      isCompleted: false,
    };

    setTasks((prev) => [...prev, newTask]);
    // setTodayGoal("");
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

  const handleStart = () => {
    const trimmedGoal = todayGoal.trim();
    if (!trimmedGoal || tasks.length === 0) return;
    const taskContents = tasks.map((t) => t.content);
    onStart(trimmedGoal, taskContents);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTodayGoal(initialGoal);
      setTasks(initialTasks);
      setNewTaskContent("");
    }
    onOpenChange(newOpen);
  };

  return (
    <CustomDialog open={open} onOpenChange={handleOpenChange}>
      <CustomDialog.Content className="sm:max-w-lg">
        <CustomDialog.Header>
          <input
            placeholder="오늘의 목표를 입력해 주세요"
            value={todayGoal}
            onChange={(e) => setTodayGoal(e.target.value)}
            minLength={1}
            maxLength={30}
            required
            className="typography-title-m text-left text-4xl font-bold text-gray-300"
          />
          {todayGoal.trim().length > 30 && (
            <p className="text-secondary-negative typography-body-small-m mt-1 text-left">
              오늘의 목표는 30자 이하로 입력해 주세요
            </p>
          )}
        </CustomDialog.Header>

        <CustomDialog.Body className="space-y-4">
          <div className="space-y-2">
            <div className="gap-2">
              <TextField value={newTaskContent} className="relative">
                <TextField.Label>할 일 목록</TextField.Label>
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

          {tasks.length > 0 && (
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
          )}
        </CustomDialog.Body>

        <CustomDialog.Footer className="flex justify-end gap-2">
          <CustomButton
            variant="secondary"
            label="취소"
            onClick={() => handleOpenChange(false)}
          />
          <CustomButton
            variant="primary"
            label={isLoading ? "시작 중..." : "타이머 시작하기"}
            onClick={handleStart}
            disabled={tasks.length === 0}
          />
        </CustomDialog.Footer>
      </CustomDialog.Content>
    </CustomDialog>
  );
};

export default TimerStartDialog;
