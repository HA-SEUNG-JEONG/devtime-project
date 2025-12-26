import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface CustomDropdownProps {
  label?: string;
  placeholder?: string;
  items: string[];
  onSelect?: (value: string) => void;
  defaultValue?: string;
}

const DropDown = ({
  label = "Dropdown Label",
  placeholder = "Placeholder",
  items,
  onSelect,
  defaultValue
}: CustomDropdownProps) => {
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
          <Button
            variant="outline"
            className="w-full justify-between bg-background hover:bg-background border-input"
          >
            <span
              className={
                selectedValue
                  ? "typography-body-b text-foreground"
                  : "typography-body-m text-muted-foreground"
              }
            >
              {selectedValue || placeholder}
            </span>
            {isOpen ? (
              <ChevronUp className="text-primary-0" />
            ) : (
              <ChevronDown className="text-primary-0" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) bg-white border-border shadow-lg">
          {items.map((item, index) => (
            <div key={index}>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-accent focus:bg-accent data-highlighted:bg-accent"
                onClick={() => handleSelect(item)}
              >
                <span
                  className={
                    selectedValue === item
                      ? "text-primary-0"
                      : "text-foreground"
                  }
                >
                  {item}
                </span>
              </DropdownMenuItem>
              {index < items.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDown;
