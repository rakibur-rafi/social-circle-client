import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ManageEvents } from "@/components/manage-events/manage-events";
import { Button } from "@/components/ui/button";

export default function ManageEventsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Manage Events
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Update or remove the events you&apos;ve created
          </p>
        </div>
        <Button
          variant="secondary"
          className="shrink-0"
          nativeButton={false}
          render={<Link href="/create-event" />}
        >
          Create Event
          <ArrowUpRight />
        </Button>
      </div>
      <ManageEvents />
    </section>
  );
}
