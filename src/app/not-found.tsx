import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-10 text-center text-card-foreground">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <Compass className="size-5" />
        </span>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have
          moved. Check the URL or head back to safety.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Button
            variant="secondary"
            nativeButton={false}
            render={<Link href="/" />}
          >
            <ArrowLeft />
            Back to Home
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/events" />}
          >
            Browse Events
          </Button>
        </div>
      </div>
    </section>
  );
}
