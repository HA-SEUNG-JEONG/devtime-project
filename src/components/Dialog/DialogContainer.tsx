import { CustomDialog } from "./CustomDialog";

const DialogContainer = () => {
  return (
    <CustomDialog>
      <CustomDialog.Trigger>
        <button className="typography-body-b bg-primary-0 cursor-pointer rounded-[5px] px-4 py-3 text-white">
          다이얼로그 열기
        </button>
      </CustomDialog.Trigger>
      <CustomDialog.Content>
        <CustomDialog.Header>
          <CustomDialog.Title>프로필 수정</CustomDialog.Title>
          <CustomDialog.Description>
            프로필 정보를 수정할 수 있습니다. 완료 후 저장 버튼을 눌러주세요.
          </CustomDialog.Description>
        </CustomDialog.Header>
        <CustomDialog.Footer>
          <CustomDialog.CancelButton>취소</CustomDialog.CancelButton>
          <CustomDialog.ConfirmButton>저장</CustomDialog.ConfirmButton>
        </CustomDialog.Footer>
      </CustomDialog.Content>
    </CustomDialog>
  );
};

export default DialogContainer;
