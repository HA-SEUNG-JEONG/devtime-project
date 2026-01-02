import { CustomDialog } from "./Dialog/CustomDialog";
import { useNavigate } from "react-router";

interface LoginRequiredModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginRequiredModal = ({
  open,
  onOpenChange,
}: LoginRequiredModalProps) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onOpenChange(false);
    navigate("/signin");
  };

  return (
    <CustomDialog open={open} onOpenChange={onOpenChange}>
      <CustomDialog.Content>
        <CustomDialog.Header>
          <CustomDialog.Title>로그인이 필요합니다</CustomDialog.Title>
          <CustomDialog.Description>
            이 기능을 사용하려면 로그인이 필요합니다.
          </CustomDialog.Description>
        </CustomDialog.Header>
        <CustomDialog.Footer>
          <CustomDialog.CancelButton onClick={() => onOpenChange(false)}>
            취소
          </CustomDialog.CancelButton>
          <CustomDialog.ConfirmButton onClick={handleLogin}>
            로그인하기
          </CustomDialog.ConfirmButton>
        </CustomDialog.Footer>
      </CustomDialog.Content>
    </CustomDialog>
  );
};
