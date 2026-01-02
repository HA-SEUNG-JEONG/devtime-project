import type React from "react";

import { useState, useRef, useEffect, useId, useCallback } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CustomAutocompleteProps {
  label?: string;
  placeholder?: string;
  items: { id: number; name: string }[];
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
  handleAddNewItem?: (value: string) => void;
  addNewItemLabel?: string;
}

const AutoComplete = ({
  label = "Autocomplete Label",
  placeholder = "Placeholder",
  items,
  value,
  onChange,
  onSelect,
  handleAddNewItem,
  addNewItemLabel = "새 항목 추가",
}: CustomAutocompleteProps) => {
  const autocompleteId = useId();
  const listboxId = useId();
  const optionIdPrefix = useId();
  const [internalValue, setInternalValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const inputValue = value !== undefined ? value : internalValue;

  const showAddNewItem =
    inputValue.length > 0 && items.length === 0 && !!handleAddNewItem;
  const showDropdown = isOpen && (items.length > 0 || showAddNewItem);
  const totalOptions = items.length + (showAddNewItem ? 1 : 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const safeHighlightedIndex =
    highlightedIndex >= totalOptions ? 0 : highlightedIndex;

  const getOptionId = useCallback(
    (index: number) => `${optionIdPrefix}-option-${index}`,
    [optionIdPrefix],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) {
      if (e.key === "ArrowDown" && inputValue) {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < totalOptions - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : totalOptions - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (safeHighlightedIndex >= 0 && safeHighlightedIndex < items.length) {
          handleSelect(items[safeHighlightedIndex].name);
        } else if (safeHighlightedIndex === items.length && showAddNewItem) {
          handleAddNewItem?.(inputValue);
          setIsOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
    setIsOpen(newValue.length > 0);
    setHighlightedIndex(0);
  };

  const handleSelect = (selectedValue: string) => {
    if (onChange) {
      onChange("");
    } else {
      setInternalValue("");
    }
    setIsOpen(false);
    onSelect?.(selectedValue);
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
    <div className="relative flex flex-col gap-2" ref={containerRef}>
      <label
        htmlFor={autocompleteId}
        className="typography-body-small-m text-left"
      >
        {label}
      </label>
      <Input
        type="text"
        id={autocompleteId}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (inputValue) {
            setIsOpen(true);
            setHighlightedIndex(0);
          }
        }}
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={
          showDropdown && safeHighlightedIndex >= 0
            ? getOptionId(safeHighlightedIndex)
            : undefined
        }
        autoComplete="off"
        className="bg-background border-input focus-visible:ring-ring typography-body-m"
      />

      {showDropdown && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="border-border absolute top-full z-50 mt-1 w-full rounded-lg border bg-white shadow-lg"
        >
          {items.length > 0 && (
            <div className="max-h-[300px] overflow-y-auto p-1">
              {items.map((item, index) => (
                <button
                  type="button"
                  role="option"
                  id={getOptionId(index)}
                  key={item.id}
                  aria-selected={safeHighlightedIndex === index}
                  onClick={() => handleSelect(item.name)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`w-full rounded-md px-3 py-2 text-left text-base transition-colors ${
                    safeHighlightedIndex === index
                      ? "bg-accent"
                      : "hover:bg-accent"
                  }`}
                >
                  {highlightMatch(item.name, inputValue)}
                </button>
              ))}
            </div>
          )}

          {showAddNewItem && (
            <>
              {items.length > 0 && <div className="border-border border-t" />}
              <div className="p-1">
                <Button
                  id={getOptionId(items.length)}
                  role="option"
                  aria-selected={safeHighlightedIndex === items.length}
                  variant="tertiary"
                  onClick={() => {
                    handleAddNewItem?.(inputValue);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setHighlightedIndex(items.length)}
                  className={`text-primary-0 hover:text-primary-0 w-full justify-start bg-transparent font-semibold ${
                    safeHighlightedIndex === items.length
                      ? "bg-accent"
                      : "hover:bg-accent"
                  }`}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {addNewItemLabel}
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
