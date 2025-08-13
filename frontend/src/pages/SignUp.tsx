import { useState } from "react";
import { OctagonAlertIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";
import { Card, CardContent } from "../components/ui/card";
import { FcGoogle } from "react-icons/fc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Alert, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { FaGithub } from "react-icons/fa6";

const formSchema = z
  .object({
    name: z.string().min(1, { error: "Password is required" }),
    email: z.email(),
    password: z.string().min(1, { error: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { error: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords must match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);

    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: `${import.meta.env.FRONTEND_URL}/dashboard`,
      },
      {
        onError: ({ error }) => {
          setError(error.message);
        },
      }
    );
  };

  const onSocial = async (provider: "google" | "github") => {
    setError(null);

    await authClient.signIn.social({
      provider,
      callbackURL: `${import.meta.env.FRONTEND_URL}/dashboard`,
    });
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full min-h-screen">
      <Card className="overflow-hidden p-0 justify-center">
        <CardContent className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="px-4 md:px-6 mt-5"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Let&apos;s get started</h1>
                  <p className="text-muted-foreground text-balance">
                    Create your account
                  </p>
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="John Doe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="kk@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}

                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="w-full cursor-pointer"
                >
                  Sign up
                </Button>

                {/* Separator */}
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    disabled={form.formState.isSubmitting}
                    variant="outline"
                    type="button"
                    className="w-full cursor-pointer"
                    onClick={() => onSocial("google")}
                  >
                    <FcGoogle />
                    Google
                  </Button>
                  <Button
                    disabled={form.formState.isSubmitting}
                    variant="outline"
                    type="button"
                    className="w-full cursor-pointer"
                    onClick={() => onSocial("github")}
                  >
                    <FaGithub />
                    Github
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/sign-in" className="underline underline-offset-4">
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 px-4 md:px-6 mb-6 mt-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> andand{" "}
            <a href="#">Privacy Policy</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
