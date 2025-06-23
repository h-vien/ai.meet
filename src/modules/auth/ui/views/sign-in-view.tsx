"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    try {
      const { error } = await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (error) => {
            setError(error.error.message || "An error occurred");
          },
        }
      );
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back!</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account
                  </p>
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
                            placeholder="Email"
                            className="input"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            className="input"
                            {...field}
                          />
                        </FormControl>
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
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:felx after:items-center after:justify-center after:border-t">
                  <span className="bg-card text-muted-forceground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="w-full">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={() => {
                      authClient.signIn.social({
                        provider: "github",
                        callbackURL: "/",
                      });
                    }}
                  >
                    <span className="text-sm">GitHub</span>
                  </Button>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?
                  <Link
                    href="/sign-up"
                    className="text-primary ml-2 underline-offset-4 hover:underline underline-offset-4"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-sm text-center text-balance *:[a]:underline">
        By clicking continue, you agree to our{" "}
        <Link href="/terms" className="text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-primary">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};
