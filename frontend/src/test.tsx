import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppContext } from "../hooks/useAppContext";
import Input from "../components/Input";

import axios from "axios";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const { navigate, SERVER_URL, fetchUser, setLoading } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleLogin: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/v1/auth/login`,
        data
      );

      const { accessToken } = response.data.data;

      localStorage.setItem("token", accessToken);
      await fetchUser();

      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-16">
      <Card className="w-[480px] bg-transparent py-6 px-10 text-zinc-800 ">
        <CardHeader>
          <CardTitle className="text-4xl">Welcome Back</CardTitle>
          <CardDescription className="text-base font-normal">
            We're glad to see you again — log in to continue where you left off.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)} className="mt-4">
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
                        "Password must include uppercase, lowercase, number, and special character.",
                    },
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

            <CardFooter className="flex flex-col space-y-2 px-0 mt-6">
              <Button type="submit" className="w-full text-base">
                Sign In
              </Button>
              <p className="text-sm text-center">
                Not registered?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-red-400 hover:underline cursor-pointer"
                >
                  Create an account
                </span>
              </p>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
