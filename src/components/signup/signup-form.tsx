"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleIcon } from "@/components/google-icon/google-icon";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

function validatePassword(password: string) {
  const missing: string[] = [];
  if (password.length < 6) missing.push("be at least 6 characters");
  if (!/[A-Z]/.test(password)) missing.push("include an uppercase letter");
  if (!/[a-z]/.test(password)) missing.push("include a lowercase letter");
  return missing;
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const user = Object.fromEntries(formData.entries()) as {name: string; email: string; image: string; password: string};

  const password = user.password.toString();

  const missing = validatePassword(password);

  if (missing.length > 0) {
    toast.error(`Password must contain ${missing.join(", ")}.`);
    return
  }

  const {data, error} = await authClient.signUp.email({
    ...user
  })
  if(data){
    toast.success("Account created successfully!");
    authClient.signOut();
    redirect("/login");
  }
  if(error){
    toast.error(error.message);
  }

}

export function SignupForm() {
  return (
    <form
      className="mt-6 space-y-4"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input id="name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input id="email" name="email" type="email" placeholder="youremail@example.com" autoComplete="email" required />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="image" className="text-sm font-medium">
          Image URL
        </label>
        <Input id="image" name="image" type="url" placeholder="https://example.com/avatar.png" />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Uppercase, lowercase, 6+ characters"
          autoComplete="new-password"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Sign Up
      </Button>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button type="button" variant="outline" className="w-full">
        <GoogleIcon className="size-4" />
        Continue with Google
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already signed up?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
