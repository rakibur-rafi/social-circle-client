import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="rounded-3xl bg-secondary px-6 py-12 text-center text-secondary-foreground sm:px-10">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Mail className="size-5" />
        </span>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Stay in the Loop
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-secondary-foreground/80">
          Get upcoming community events and volunteer opportunities delivered
          straight to your inbox. No spam — unsubscribe anytime.
        </p>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            className="h-11 flex-1 rounded-lg bg-card"
          />
          <Button type="button" className="h-11 rounded-lg">
            Subscribe
          </Button>
        </div>

        <p className="mt-4 text-xs text-secondary-foreground/70">
          Join 1,000+ volunteers already subscribed.
        </p>
      </div>
    </section>
  );
}
