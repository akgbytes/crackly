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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

interface SessionForm {
  role: string;
  experience: string;
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

  const { SERVER_URL, navigate } = useAppContext();

  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = async (data: SessionForm) => {
    try {
      const aiResponse = await axios.post(`${SERVER_URL}/api/v1/ai/questions`, {
        role: data.role,
        experience: data.experience,
        importantTopics: data.importantTopics,
        numberOfQuestions: 10,
      });

      const generatedQuestions = aiResponse.data.data;

      const response = await axios.post(`${SERVER_URL}/api/sessions/create`, {
        ...data,
        questions: generatedQuestions,
      });
      if (response.data?.session.id) {
        navigate(`/prep/session/${response.data?.session.id}`);
      }

      reset();
      setShowDialog(false);
      onSuccess();
    } catch (error) {
      console.error("Error creating session:", error);
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
            <div className="grid gap-2">
              <Label htmlFor="role">Target Role</Label>
              <Input
                id="role"
                placeholder="e.g. Backend Developer"
                {...register("role", { required: "Role is required" })}
              />
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>

            {/* Experience */}
            <div className="grid gap-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                placeholder="e.g. 2 years"
                {...register("experience", {
                  required: "Experience is required",
                })}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Important Topics */}
            <div className="grid gap-2">
              <Label htmlFor="importantTopics">
                Important Topics to Focus On
              </Label>
              <Input
                id="importantTopics"
                placeholder="e.g. React, Node.js"
                {...register("importantTopics", {
                  required: "Topics are required",
                })}
              />
              {errors.importantTopics && (
                <p className="text-sm text-red-500">
                  {errors.importantTopics.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Any specific notes..."
                {...register("description")}
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
                <div>
                  <LoaderCircle className="animate-spin w-6 h-6 text-blue-600" />
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
