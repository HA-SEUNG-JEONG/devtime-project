import { useState, useRef, useEffect } from "react";
import SymbolLogo from "../SymbolLogo";
import EditIcon from "../Icon/EditIcon";
import TrashIcon from "../Icon/TrashIcon";
import CheckIcon from "../Icon/CheckIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(task.content);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditContent(task.content);
  };

  const handleSaveEdit = () => {
    if (editContent.trim() && editContent.trim() !== task.content) {
      onEdit(task.id, editContent.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditContent(task.content);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-md p-4",
        task.isCompleted ? "bg-gray-400" : "bg-primary-0",
      )}
    >
      <SymbolLogo className="mr-4 shrink-0 text-white" />

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSaveEdit}
          maxLength={30}
          className="typography-body-s mr-4 flex-1 rounded border-none bg-white/20 px-2 py-1 text-white outline-none placeholder:text-white/60"
        />
      ) : (
        <span
          className={cn(
            "typography-body-s mr-4 flex-1 text-white",
            task.isCompleted && "line-through opacity-70",
          )}
        >
          {task.content}
        </span>
      )}

      {isEditing ? (
        <button
          type="button"
          onClick={handleSaveEdit}
          className="cursor-pointer p-1"
          aria-label="저장"
        >
          <CheckIcon className="text-white" size={20} />
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleStartEdit}
            className="cursor-pointer p-1"
            aria-label="수정"
          >
            <EditIcon className="text-white" size={20} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="cursor-pointer p-1"
            aria-label="삭제"
          >
            <TrashIcon className="text-white" size={20} />
          </button>
          {task.isCompleted ? (
            <CheckIcon className="text-white" size={20} />
          ) : (
            <Checkbox
              checked={task.isCompleted}
              onCheckedChange={() => onToggleComplete(task.id)}
              className="data-[state=checked]:text-primary-0 border-white data-[state=checked]:bg-white"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
