import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CustomButton } from "./CustomButton";

const DialogContainer = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="typography-body-b bg-primary-0 cursor-pointer rounded-[5px] px-4 py-3 text-white">
          다이얼로그 열기
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="typography-title-s text-gray-800">
            Edit profile
          </DialogTitle>
          <DialogDescription className="typography-body-m text-gray-600">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <CustomButton variant="secondary" label="Cancel" />
          </DialogClose>
          <DialogClose asChild>
            <CustomButton variant="primary" label="Save changes" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogContainer;
