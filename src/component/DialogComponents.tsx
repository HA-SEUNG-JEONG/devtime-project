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
import { Button } from "@/components/ui/button";
import { CustomButton } from "./CustomButton";

const DialogComponents = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Open Dialog</Button>
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

export default DialogComponents;
