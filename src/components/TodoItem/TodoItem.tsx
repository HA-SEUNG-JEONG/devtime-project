import SymbolLogo from "../SymbolLogo";
import EditIcon from "../Icon/EditIcon";
import TrashIcon from "../Icon/TrashIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import CheckIcon from "../Icon/CheckIcon";

interface TodoItemProps {
  backgroundColor?: string;
  textColor?: string;
  checked?: boolean;
  isEditing?: boolean;
  checkedBackgroundColor?: string;
}

const TodoItem = ({
  backgroundColor,
  textColor,
  checked,
  isEditing,
  checkedBackgroundColor = "bg-gray-400",
}: TodoItemProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      className={`flex items-center justify-between rounded-md p-6 ${
        isChecked ? checkedBackgroundColor : backgroundColor
      }`}
    >
      <SymbolLogo className="mr-4" />
      <span className={`typography-body-s inline-flex flex-1 ${textColor}`}>
        TODO ITEM
      </span>

      {!isEditing && !checked && (
        <Checkbox
          checked={isChecked}
          onCheckedChange={() => setIsChecked(!isChecked)}
        />
      )}

      {isEditing && !checked && <CheckIcon className="text-white" />}

      {checked && (
        <div className="flex items-center gap-4">
          <EditIcon className="text-white" />
          <TrashIcon className="text-white" />
        </div>
      )}
    </div>
  );
};

export default TodoItem;
