import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { useForm } from "react-hook-form";
import { useAppContext } from "../hooks/useAppContext";
import Input from "../components/Input";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { navigate } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      console.log("Login with", data);
      // API call here
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <div className="flex items-center justify-center py-16">
      <Card className="w-[420px] bg-transparent py-6 px-10 text-zinc-800 ">
        <CardHeader>
          <CardTitle className="text-4xl">Sign In</CardTitle>
          <CardDescription className="text-base font-normal">
            Welcome back! Please sign in.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="grid w-full items-center gap-4">
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

              <div className="flex flex-col space-y-1.5">
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={errors.password?.message}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border border-gray-300"
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <Button type="submit" className="w-full text-base">
            Sign In
          </Button>
          <p className="text-sm text-center">
            Not registered?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-red-400 hover:underline"
            >
              Create an account
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
