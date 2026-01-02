import type { Meta, StoryObj } from "@storybook/react-vite";
import { CustomDialog } from "./CustomDialog";
import { CustomButton } from "../Button/CustomButton";
import TextField from "../Text/TextField";

const meta = {
  title: "Components/Dialog",
  component: CustomDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof CustomDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Alert: Story = {
  render: () => (
    <CustomDialog>
      <CustomDialog.Trigger>
        <CustomButton
          label="Alert 다이얼로그 열기"
          variant="primary"
          className="bg-secondary-negative hover:bg-secondary-negative/90"
        />
      </CustomDialog.Trigger>
      <CustomDialog.Content>
        <CustomDialog.Header>
          <CustomDialog.Title>로그인 실패</CustomDialog.Title>
          <CustomDialog.Description>
            로그인 정보를 다시 확인해 주세요.
          </CustomDialog.Description>
        </CustomDialog.Header>
        <CustomDialog.Footer>
          <CustomDialog.ConfirmButton>확인</CustomDialog.ConfirmButton>
        </CustomDialog.Footer>
      </CustomDialog.Content>
    </CustomDialog>
  ),
};

export const Confirm: Story = {
  render: () => (
    <CustomDialog>
      <CustomDialog.Trigger>
        <CustomButton label="Confirm 다이얼로그 열기" variant="primary" />
      </CustomDialog.Trigger>
      <CustomDialog.Content>
        <CustomDialog.Header>
          <CustomDialog.Title>저장 확인</CustomDialog.Title>
          <CustomDialog.Description>
            변경사항을 저장하시겠습니까?
          </CustomDialog.Description>
        </CustomDialog.Header>
        <CustomDialog.Footer>
          <CustomDialog.CancelButton>취소</CustomDialog.CancelButton>
          <CustomDialog.ConfirmButton>저장</CustomDialog.ConfirmButton>
        </CustomDialog.Footer>
      </CustomDialog.Content>
    </CustomDialog>
  ),
};

export const Danger: Story = {
  render: () => (
    <CustomDialog>
      <CustomDialog.Trigger>
        <CustomButton
          label="계정 삭제"
          variant="primary"
          className="bg-secondary-negative hover:bg-secondary-negative/90"
        />
      </CustomDialog.Trigger>
      <CustomDialog.Content>
        <CustomDialog.Header>
          <CustomDialog.Title>계정 삭제</CustomDialog.Title>
          <CustomDialog.Description>
            정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </CustomDialog.Description>
        </CustomDialog.Header>
        <CustomDialog.Footer>
          <CustomDialog.CancelButton>취소</CustomDialog.CancelButton>
          <CustomDialog.ConfirmButton variant="danger">
            삭제
          </CustomDialog.ConfirmButton>
        </CustomDialog.Footer>
      </CustomDialog.Content>
    </CustomDialog>
  ),
};

export const WithForm: Story = {
  render: () => (
    <CustomDialog>
      <CustomDialog.Trigger>
        <CustomButton label="닉네임 변경" variant="primary" />
      </CustomDialog.Trigger>
      <CustomDialog.Content>
        <CustomDialog.Header>
          <CustomDialog.Title>닉네임 변경</CustomDialog.Title>
          <CustomDialog.Description>
            새로운 닉네임을 입력해주세요.
          </CustomDialog.Description>
        </CustomDialog.Header>
        <CustomDialog.Body>
          <TextField>
            <TextField.Label>닉네임</TextField.Label>
            <TextField.Input placeholder="닉네임을 입력해주세요" />
          </TextField>
        </CustomDialog.Body>
        <CustomDialog.Footer>
          <CustomDialog.CancelButton>취소</CustomDialog.CancelButton>
          <CustomDialog.ConfirmButton>변경</CustomDialog.ConfirmButton>
        </CustomDialog.Footer>
      </CustomDialog.Content>
    </CustomDialog>
  ),
};

export const WithCloseButton: Story = {
  render: () => (
    <CustomDialog>
      <CustomDialog.Trigger>
        <CustomButton label="다이얼로그 열기" variant="primary" />
      </CustomDialog.Trigger>
      <CustomDialog.Content showCloseButton>
        <CustomDialog.Header>
          <CustomDialog.Title>알림</CustomDialog.Title>
          <CustomDialog.Description>
            우측 상단의 X 버튼으로도 닫을 수 있습니다.
          </CustomDialog.Description>
        </CustomDialog.Header>
        <CustomDialog.Footer>
          <CustomDialog.ConfirmButton>확인</CustomDialog.ConfirmButton>
        </CustomDialog.Footer>
      </CustomDialog.Content>
    </CustomDialog>
  ),
};
