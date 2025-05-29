"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    console.log("Submitted Values:", email, name, password);

    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: (error) => {
          console.error("Error during sign up:", error);
        },
        onSuccess: (data) => {
          console.log("Sign up successful:", data);
        },
        onLoading: () => {
          console.log("Signing up...");
        },
      }
    );
  };
  return (
    <div className="text-green-300">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="mt-4" onClick={onSubmit}>
        Submit
      </Button>
      <p className="mt-4">Check the console for the submitted values.</p>
    </div>
  );
}
