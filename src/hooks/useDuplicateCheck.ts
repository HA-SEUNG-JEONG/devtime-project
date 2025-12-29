import { useState, useCallback } from "react";

interface HelperText {
  message: string;
  isAvailable: boolean;
}

interface FieldState {
  isChecked: boolean;
  isTouched: boolean;
  helperText: HelperText | null;
}

interface DuplicateCheckConfig {
  fields: string[];
  endpoints: Record<string, (value: string) => string>;
  validators: Record<string, (value: string) => boolean>;
}

const INITIAL_FIELD_STATE: FieldState = {
  isChecked: false,
  isTouched: false,
  helperText: null,
};

function createInitialStates(fields: string[]): Record<string, FieldState> {
  return Object.fromEntries(
    fields.map((field) => [field, { ...INITIAL_FIELD_STATE }]),
  );
}

export function useDuplicateCheck(config: DuplicateCheckConfig) {
  const { fields, endpoints, validators } = config;

  const [fieldStates, setFieldStates] = useState(() =>
    createInitialStates(fields),
  );

  const updateField = useCallback(
    (field: string, updates: Partial<FieldState>) => {
      setFieldStates((prev) => ({
        ...prev,
        [field]: { ...prev[field], ...updates },
      }));
    },
    [],
  );

  const handleCheck = useCallback(
    async (
      field: string,
      value: string,
      triggerValidation: () => Promise<boolean>,
    ) => {
      const isValid = await triggerValidation();
      if (!isValid) return;

      try {
        const response = await fetch(endpoints[field](value), {
          method: "GET",
        });
        const data = await response.json();

        updateField(field, {
          isChecked: data.available,
          helperText: {
            message:
              data.message ||
              (data.available ? "사용 가능합니다." : "이미 사용 중입니다."),
            isAvailable: data.available,
          },
        });
      } catch (error) {
        console.error(error);
        updateField(field, {
          isChecked: false,
          helperText: {
            message: "중복 확인 중 오류가 발생했습니다.",
            isAvailable: false,
          },
        });
      }
    },
    [endpoints, updateField],
  );

  const handleFieldChange = useCallback(
    (field: string) => {
      updateField(field, INITIAL_FIELD_STATE);
    },
    [updateField],
  );

  const handleFieldBlur = useCallback(
    (field: string, value: string) => {
      const isValid = validators[field](value);
      const isNotChecked = !fieldStates[field].isChecked;

      if (isValid && isNotChecked) {
        updateField(field, { isTouched: true });
      }
    },
    [validators, fieldStates, updateField],
  );

  const showCheckWarning = useCallback(
    (field: string, value: string, hasError: boolean) => {
      const { isTouched, isChecked } = fieldStates[field];
      const isValid = validators[field](value);

      return isTouched && isValid && !isChecked && !hasError;
    },
    [fieldStates, validators],
  );

  const isAllChecked = useCallback(
    (targetFields: string[]) => {
      return targetFields.every((field) => fieldStates[field].isChecked);
    },
    [fieldStates],
  );

  return {
    fieldStates,
    handleCheck,
    handleFieldChange,
    handleFieldBlur,
    showCheckWarning,
    isAllChecked,
  };
}
