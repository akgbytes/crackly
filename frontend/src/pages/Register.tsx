import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Button } from "../components/ui/button";
import { useAppContext } from "../hooks/useAppContext";
import { Controller, useForm } from "react-hook-form";
import AvatarUpload from "../components/AvatarUpload";
import Input from "../components/Input";
import axios from "axios";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  password: string;
  avatar: File | null;
}

const Register = () => {
  const { navigate, SERVER_URL } = useAppContext();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/v1/auth/register`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("register response: ", response.data);

      toast.success("User registered successfully");
      navigate("/login");
    } catch (error: any) {
      console.log("register error: ", error.response.data);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center py-16">
      <Card className="bg-transparent w-[480px] py-6 px-10 text-zinc-800">
        <CardHeader>
          <CardTitle className="text-4xl">Create Your Account</CardTitle>
          <CardDescription className="text-base font-normal">
            Join us today and start preparing for your next big opportunity.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="grid w-full items-center gap-4">
              {/* avatar upload */}
              <Controller
                name="avatar"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <AvatarUpload image={field.value} onChange={field.onChange} />
                )}
              />

              {/* name */}
              <div className="flex flex-col space-y-1.5">
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 6,
                      message: "Name must be at least 6 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message: "Name must be at most 20 characters long",
                    },
                  })}
                  error={errors.name?.message}
                />
              </div>

              {/* email */}
              <div className="flex flex-col space-y-1.5">
                <Input
                  label="Email"
                  placeholder="Enter your email address"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  error={errors.email?.message}
                />
              </div>

              {/* passsword */}
              <div className="flex flex-col space-y-1.5">
                <Input
                  label="Password"
                  placeholder="Choose a password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    maxLength: {
                      value: 16,
                      message: "Password must be at most 16 characters long",
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
                      message:
                        "Password must include at least one uppercase, lowercase, number, and special character.",
                    },
                  })}
                  error={errors.password?.message}
                />
              </div>
            </div>
            <CardFooter className="flex flex-col gap-2 mt-8 px-0">
              <Button type="submit" className="w-full text-base cursor-pointer">
                Create Account
              </Button>
              <p className="text-sm text-center">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-red-400 hover:underline cursor-pointer"
                >
                  Login here
                </span>
              </p>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Register;
