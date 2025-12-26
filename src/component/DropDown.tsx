import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface DropdownProps {
  label?: string;
  placeholder?: string;
  items: {id: number, label: string}[];
  onSelect?: (value: string) => void;
  defaultValue?: string;
}

const DropDown = ({
  label = "Dropdown Label",
  placeholder = "Placeholder",
  items,
  onSelect,
  defaultValue
}: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(
    defaultValue || null
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect?.(value);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div className="relative w-full">
            <Input
              readOnly
              value={selectedValue || ""}
              placeholder={placeholder}
              className={
                selectedValue
                  ? "typography-body-b text-foreground pr-10"
                  : "typography-body-m text-muted-foreground pr-10"
              }
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              {isOpen ? (
                <ChevronUp className="text-primary-0" />
              ) : (
                <ChevronDown className="text-primary-0" />
              )}
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) bg-white border-border shadow-lg">
          {items.map((item, index) => (
            <div key={item.id}>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-accent focus:bg-accent data-highlighted:bg-accent"
                onClick={() => handleSelect(item.label)}
              >
                <span
                  className={
                    selectedValue === item.label
                      ? "text-primary-0"
                      : "text-foreground"
                  }
                >
                  {item.label}
                </span>
              </DropdownMenuItem>
              {index < items.length - 1 && <DropdownMenuSeparator className="mx-3"/>}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDown;
