import { useState, useId } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownProps {
  label?: string;
  placeholder?: string;
  items: { id: number; label: string }[];
  onSelect?: (value: string) => void;
  defaultValue?: string;
}

const DropDown = ({
  label = "Dropdown Label",
  placeholder = "Placeholder",
  items,
  onSelect,
  defaultValue,
}: DropdownProps) => {
  const dropdownId = useId();
  const [selectedValue, setSelectedValue] = useState<string | null>(
    defaultValue || null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect?.(value);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={dropdownId} className="typography-body-small-m text-left">
        {label}
      </label>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div className="relative w-full">
            <Input
              id={dropdownId}
              readOnly
              value={selectedValue || ""}
              placeholder={placeholder}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              className={
                selectedValue
                  ? "typography-body-m pr-10 text-gray-600"
                  : "typography-body-m bg-gray-50 pr-10 text-gray-50"
              }
            />
            <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
              {isOpen ? (
                <ChevronUp className="text-primary-0" aria-hidden="true" />
              ) : (
                <ChevronDown className="text-primary-0" aria-hidden="true" />
              )}
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-border w-(--radix-dropdown-menu-trigger-width) bg-white shadow-lg">
          {items.map((item, index) => (
            <div key={item.id}>
              <DropdownMenuItem
                className="hover:bg-accent focus:bg-accent data-highlighted:bg-accent cursor-pointer"
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
              {index < items.length - 1 && (
                <DropdownMenuSeparator className="mx-3" />
              )}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDown;
