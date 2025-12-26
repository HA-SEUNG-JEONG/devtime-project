import type React from "react";

import { useState, useRef, useEffect, useId } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CustomAutocompleteProps {
  label?: string;
  placeholder?: string;
  items: { id: number; name: string }[];
  onSelect?: (value: string) => void;
  handleAddNewItem?: (value: string) => void;
}

const AutoComplete = ({
  label = "Autocomplete Label",
  placeholder = "Placeholder",
  items,
  onSelect,
  handleAddNewItem,
}: CustomAutocompleteProps) => {
  const autocompleteId = useId();
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredItems = inputValue
    ? items.filter((item: { id: number; name: string }) =>
        item.name.toLowerCase().startsWith(inputValue.toLowerCase()),
      )
    : [];

  const showAddNewItem = inputValue.length > 0 && filteredItems.length === 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(value.length > 0);
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    setIsOpen(false);
    onSelect?.(value);
  };

  const highlightMatch = (text: string, query: string) => {
    return (
      <>
        <span className="typography-body-b">
          {text.substring(0, query.length)}
        </span>
        <span className="text-muted-foreground typography-body-r">
          {text.substring(query.length)}
        </span>
      </>
    );
  };

  return (
    <div className="relative" ref={containerRef}>
      <label
        htmlFor={autocompleteId}
        className="typography-body-b text-foreground mb-2"
      >
        {label}
      </label>
      <Input
        type="text"
        id={autocompleteId}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          if (inputValue) setIsOpen(true);
        }}
        className="bg-background border-input focus-visible:ring-ring"
      />

      {isOpen && (filteredItems.length > 0 || showAddNewItem) && (
        <div className="border-border absolute z-50 mt-2 w-full rounded-lg border bg-white shadow-lg">
          {filteredItems.length > 0 && (
            <div className="max-h-[300px] overflow-y-auto p-1">
              {filteredItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleSelect(item.name)}
                  className="hover:bg-accent w-full rounded-md px-3 py-2 text-left text-base transition-colors"
                >
                  {highlightMatch(item.name, inputValue)}
                </button>
              ))}
            </div>
          )}

          {showAddNewItem && (
            <>
              {filteredItems.length > 0 && (
                <div className="border-border border-t" />
              )}
              <div className="p-1">
                <Button
                  variant="tertiary"
                  onClick={() => handleAddNewItem?.(inputValue)}
                  className="text-primary-0 hover:bg-accent hover:text-primary-0 w-full justify-start bg-transparent font-semibold"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Item
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
