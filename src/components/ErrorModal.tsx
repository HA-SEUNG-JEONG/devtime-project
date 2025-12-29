import { CustomDialog } from "./Dialog/CustomDialog";

interface ErrorModalProps {
  open: boolean;
  title: string;
  description: string;
  onOpenChange?: (open: boolean) => void;
}

export const ErrorModal = ({
  open,
  title,
  description,
  onOpenChange,
}: ErrorModalProps) => {
  return (
    <CustomDialog open={open} onOpenChange={onOpenChange}>
      <CustomDialog.Content>
        <CustomDialog.Header>
          <CustomDialog.Title>{title}</CustomDialog.Title>
          <CustomDialog.Description>{description}</CustomDialog.Description>
        </CustomDialog.Header>
        <CustomDialog.Footer>
          <CustomDialog.ConfirmButton className="w-full">
            확인
          </CustomDialog.ConfirmButton>
        </CustomDialog.Footer>
      </CustomDialog.Content>
    </CustomDialog>
  );
};
