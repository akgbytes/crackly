import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { useAppContext } from "../hooks/useAppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const { navigate, SERVER_URL, setUser, setLoading } = useAppContext();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-[#fef9f7] backdrop-blur-lg">
        <CardHeader className="">
          <div className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Welcome
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Sign in to continue to your account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <GoogleLogin
            theme="filled_blue"
            text="continue_with"
            size="large"
            onSuccess={async (credentialResponse) => {
              setLoading(true);
              try {
                await axios.post(
                  `${SERVER_URL}/api/v1/auth/login`,
                  { token: credentialResponse.credential },
                  {
                    withCredentials: true,
                  }
                );

                const userProfile = await axios.get(
                  `${SERVER_URL}/api/v1/auth/me`,
                  { withCredentials: true }
                );

                setUser(userProfile.data.data);

                toast.success("Logged in successfully");
                navigate("/dashboard");
              } catch (error: any) {
                toast.error(error.response?.data?.message || "Login failed");
              } finally {
                setLoading(false);
              }
            }}
            onError={() => toast.error("Login Failed")}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
