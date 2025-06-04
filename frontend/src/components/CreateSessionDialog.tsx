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
import { LoaderCircle } from "lucide-react";

interface SessionForm {
  role: string;
  experience: number;
  importantTopics: string;
  description: string;
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
      const response = await axios.post(
        `${SERVER_URL}/api/v1/sessions/generate`,
        {
          ...data,
          numberOfQuestions: 10,
        },
        { withCredentials: true }
      );

      console.log("session response: ", response.data);
      reset();
      setShowDialog(false);
      onSuccess();
    } catch (error: any) {
      console.log("session error response: ", error);
    }
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

            {/* Description */}
            <div className="flex flex-col space-y-1.5">
              <Input
                label="Description"
                placeholder="Any specific notes..."
                {...register("description", {
                  required: "Description is required",
                })}
                error={errors.description?.message}
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
                  <LoaderCircle className="animate-spin w-5 h-5 text-blue-600" />
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
