import type { InterviewSet } from "../types";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface DeleteInterviewSetDialogProps {
  open: boolean;
  interviewSet: InterviewSet | null;
  onClose: () => void;
  onDelete: (interviewSet: InterviewSet | null) => void;
}

const DeleteInterviewSetDialog = ({
  open,
  interviewSet,
  onClose,
  onDelete,
}: DeleteInterviewSetDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Interview Set</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this interview set? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => onDelete(interviewSet)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteInterviewSetDialog;
