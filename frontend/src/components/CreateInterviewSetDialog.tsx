import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
import CustomInput from "./ui/custom-input";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import type { InterviewSetForm } from "../types";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";

interface CreateInterviewSetDialogProps {
  children: React.ReactNode;
  onSuccess: () => void;
}

const CreateInterviewSetDialog = ({
  children,
  onSuccess,
}: CreateInterviewSetDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InterviewSetForm>();

  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = async (data: InterviewSetForm) => {
    const { role, experience, importantTopics } = data;
    try {
      const payload = {
        role,
        experience,
        numberOfQuestions: 10,
        ...(importantTopics?.trim()
          ? { importantTopics: importantTopics.trim() }
          : {}),
      };

      await axios.post(`${BASE_URL}/generate`, payload, {
        withCredentials: true,
      });

      reset();
      setShowDialog(false);
      onSuccess();
    } catch (error: any) {
      toast.error("Error generating interview questions");
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create a New Interview Set</DialogTitle>
            <DialogDescription>
              Fill out a few quick details and unlock your personalized set of
              interview questions!
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Role */}
            <div className="flex flex-col space-y-1.5">
              <CustomInput
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
              <CustomInput
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
              <CustomInput
                label="Important Topics (Optional)"
                placeholder="e.g. NodeJS, Databases"
                {...register("importantTopics")}
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
                  Creating Interview Set...
                </div>
              ) : (
                "Create Interview Set"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInterviewSetDialog;
