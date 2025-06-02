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

interface FormData {
  name: string;
  email: string;
  password: string;
  avatar: File | null;
}

const Register = () => {
  const { navigate } = useAppContext();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Submitting registration", data);
      // API call here
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="flex items-center justify-center py-16">
      <Card className="bg-transparent w-[450px] py-6 px-10 text-zinc-800">
        <CardHeader>
          <CardTitle className="text-4xl">Create an Account</CardTitle>
          {/* <CardDescription className="text-base font-normal">
            Join us today by entering your details below.
          </CardDescription> */}
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
                  {...register("name", { required: "Name is required" })}
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
                      message: "Minimum 6 characters required",
                    },
                  })}
                  error={errors.password?.message}
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 mt-8">
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
      </Card>
    </div>
  );
};
export default Register;
