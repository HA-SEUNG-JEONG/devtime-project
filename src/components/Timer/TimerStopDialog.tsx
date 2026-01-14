import { useState, useCallback, useEffect, useRef } from "react";
import { CustomDialog } from "@/components/Dialog/CustomDialog";
import { CustomButton } from "@/components/Button/CustomButton";
import TaskItem, { type Task } from "./TaskItem";
import TextField from "../Text/TextField";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const MIN_REVIEW_LENGTH = 15;
const MAX_REVIEW_LENGTH = 500;

interface TimerStopDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStop: (review: string, tasks: Task[]) => Promise<void>;
  todayGoal: string;
  initialTasks: Task[];
  elapsedSeconds: number;
  isLoading?: boolean;
}

const formatElapsedTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}시간`);
  if (minutes > 0) parts.push(`${minutes}분`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}초`);

  return parts.join(" ");
};

const generateId = () =>
  `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const TimerStopDialog = ({
  open,
  onOpenChange,
  onStop,
  todayGoal,
  initialTasks,
  elapsedSeconds,
  isLoading = false,
}: TimerStopDialogProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [review, setReview] = useState("");
  const [isStopping, setIsStopping] = useState(false);
  const prevOpenRef = useRef(open);

  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setTasks(initialTasks);
      setNewTaskContent("");
      setReview("");
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

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_REVIEW_LENGTH) {
      setReview(value);
    }
  };

  const handleStop = async () => {
    if (review.trim().length < MIN_REVIEW_LENGTH) return;

    setIsStopping(true);
    try {
      await onStop(review.trim(), tasks);
      onOpenChange(false);
    } catch {
      // 에러는 상위에서 처리됨
    } finally {
      setIsStopping(false);
    }
  };

  const handleCancel = () => {
    setTasks(initialTasks);
    setNewTaskContent("");
    setReview("");
    onOpenChange(false);
  };

  const isReviewValid = review.trim().length >= MIN_REVIEW_LENGTH;
  const completedCount = tasks.filter((t) => t.isCompleted).length;

  return (
    <CustomDialog open={open} onOpenChange={() => {}}>
      <CustomDialog.Content className="sm:max-w-lg">
        <CustomDialog.Header>
          <h2 className="typography-title-m text-left text-3xl font-bold text-gray-800">
            공부를 마무리할까요?
          </h2>
          <div className="mt-2 space-y-1">
            <p className="typography-body-m text-left text-gray-600">
              오늘의 목표: <span className="font-semibold">{todayGoal}</span>
            </p>
            <p className="typography-body-m text-left text-gray-600">
              학습 시간:{" "}
              <span className="text-primary-0 font-semibold">
                {formatElapsedTime(elapsedSeconds)}
              </span>
            </p>
          </div>
        </CustomDialog.Header>

        <CustomDialog.Body className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="typography-body-b text-gray-700">
                할 일 목록
              </span>
              <span className="typography-body-small-m text-gray-500">
                {completedCount}/{tasks.length} 완료
              </span>
            </div>

            <div className="gap-2">
              <TextField value={newTaskContent} className="relative">
                <div className="flex items-center">
                  <TextField.Input
                    hasButton
                    placeholder="할 일을 추가해 주세요"
                    value={newTaskContent}
                    onChange={(e) => setNewTaskContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={30}
                    className="h-12"
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

            {tasks.length > 0 && (
              <div className="max-h-40 space-y-2 overflow-y-auto">
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
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="review"
                className="typography-body-b text-gray-700"
              >
                학습 회고
              </label>
              <span
                className={cn(
                  "typography-body-small-m",
                  review.length < MIN_REVIEW_LENGTH
                    ? "text-secondary-negative"
                    : "text-gray-500",
                )}
              >
                {review.length}/{MAX_REVIEW_LENGTH}자
              </span>
            </div>
            <Textarea
              id="review"
              placeholder={`오늘 학습한 내용을 회고해 주세요 (최소 ${MIN_REVIEW_LENGTH}자)`}
              value={review}
              onChange={handleReviewChange}
              className="min-h-32 resize-none"
            />
            {review.length > 0 && review.length < MIN_REVIEW_LENGTH && (
              <p className="text-secondary-negative typography-body-small-m">
                최소 {MIN_REVIEW_LENGTH}자 이상 입력해 주세요 (현재{" "}
                {review.length}자)
              </p>
            )}
          </div>
        </CustomDialog.Body>

        <CustomDialog.Footer className="flex justify-end gap-2">
          <CustomButton
            variant="secondary"
            label="취소"
            onClick={handleCancel}
            disabled={isStopping || isLoading}
          />
          <CustomButton
            variant="primary"
            label={isStopping ? "완료 중..." : "공부 완료하기"}
            onClick={handleStop}
            disabled={!isReviewValid || isStopping || isLoading}
          />
        </CustomDialog.Footer>
      </CustomDialog.Content>
    </CustomDialog>
  );
};

export default TimerStopDialog;
