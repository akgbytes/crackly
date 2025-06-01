import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";

const Login = () => {
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
          <form className="mt-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
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
          <Button className="w-full text-base">Sign In</Button>
          <p className="text-sm text-center">
            Not registered?{" "}
            <a href="#" className="text-red-400 hover:underline">
              Create an account
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
