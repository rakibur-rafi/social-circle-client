import { EventGridSkeleton } from "@/components/events/event-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <Skeleton className="mx-auto h-9 w-48" />
        <Skeleton className="mx-auto h-4 max-w-md" />
      </div>

      <div className="mt-10">
        <EventGridSkeleton />
      </div>
    </section>
  );
}
