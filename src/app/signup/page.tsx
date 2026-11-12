"use client";
import Link from "next/link";
import { Logo } from "@/components/logo/logo";
import { SignupForm } from "@/components/signup/signup-form";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";


export default function SignupPage() {

  const {data: session} = authClient.useSession();
  const user = session?.user;
  
  if(user) return redirect('/');
  return (
    <section className="mx-auto flex max-w-7xl justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 text-card-foreground sm:p-8">
        <Link href="/" className="flex items-center justify-center gap-2 text-foreground">
          <Logo className="size-5" />
          <span className="text-base font-semibold tracking-tight">Social Circle</span>
        </Link>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join events and volunteer in your community.
        </p>
        <SignupForm />
      </div>
    </section>
  );
}
