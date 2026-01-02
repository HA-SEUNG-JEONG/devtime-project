import { createContext, useContext, useState, useCallback } from "react";
import { ErrorModal } from "@/components/ErrorModal";

interface ErrorModalData {
  title: string;
  description: string;
}

interface ErrorModalContextValue {
  showError: (data: ErrorModalData) => void;
  closeError: () => void;
}

const ErrorModalContext = createContext<ErrorModalContextValue | null>(null);

export const useErrorModal = () => {
  const context = useContext(ErrorModalContext);
  if (!context) {
    throw new Error(
      "useErrorModal은 ErrorModalProvider 내부에서 사용해야 합니다.",
    );
  }
  return context;
};

interface ErrorModalProviderProps {
  children: React.ReactNode;
}

export const ErrorModalProvider = ({ children }: ErrorModalProviderProps) => {
  const [errorModal, setErrorModal] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({
    open: false,
    title: "",
    description: "",
  });

  const showError = useCallback((data: ErrorModalData) => {
    setErrorModal({
      open: true,
      title: data.title,
      description: data.description,
    });
  }, []);

  const closeError = useCallback(() => {
    setErrorModal({ open: false, title: "", description: "" });
  }, []);

  return (
    <ErrorModalContext.Provider value={{ showError, closeError }}>
      {children}
      <ErrorModal
        open={errorModal.open}
        title={errorModal.title}
        description={errorModal.description}
        onOpenChange={closeError}
      />
    </ErrorModalContext.Provider>
  );
};
