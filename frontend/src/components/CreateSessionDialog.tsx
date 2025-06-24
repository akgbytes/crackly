import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../hooks/useAppContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Input from "./Input";
import { Button } from "./ui/button";
import Spinner from "./Spinner";

interface SessionForm {
  role: string;
  experience: number;
  importantTopics: string;
}

interface CreateSessionDialogProps {
  children: React.ReactNode;
  onSuccess: () => void;
}

const CreateSessionDialog = ({
  children,
  onSuccess,
}: CreateSessionDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SessionForm>();

  const { SERVER_URL } = useAppContext();

  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = async (data: SessionForm) => {
    try {
      await axios.post(
        `${SERVER_URL}/api/v1/sessions/generate`,
        {
          ...data,
          numberOfQuestions: 10,
        },
        { withCredentials: true }
      );

      reset();
      setShowDialog(false);
      onSuccess();
    } catch (error: any) {}
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create a New Interview Session</DialogTitle>
            <DialogDescription>
              Fill out a few quick details and unlock your personalized set of
              interview questions!
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Role */}
            <div className="flex flex-col space-y-1.5">
              <Input
                label="Target Role"
                placeholder="e.g. Backend Developer"
                {...register("role", {
                  required: "Role is required",
                })}
                error={errors.role?.message}
              />
            </div>

            {/* Experience */}
            <div className="flex flex-col space-y-1.5">
              <Input
                type="number"
                label="Years of Experience"
                placeholder="e.g. 2 years"
                {...register("experience", {
                  required: "Experience is required",
                  valueAsNumber: true,
                })}
                error={errors.experience?.message}
              />
            </div>

            {/* Important Topics */}
            <div className="flex flex-col space-y-1.5">
              <Input
                label="Important Topics to Focus On"
                placeholder="e.g. React, Node.js"
                {...register("importantTopics", {
                  required: "Topics are required",
                })}
                error={errors.importantTopics?.message}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  Creating Session
                </div>
              ) : (
                "Create Session"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSessionDialog;
