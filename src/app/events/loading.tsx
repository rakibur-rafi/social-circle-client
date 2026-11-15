import { EventGridSkeleton } from "@/components/events/event-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="space-y-3">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      <div className="mt-10 space-y-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-24 rounded-lg" />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <EventGridSkeleton />
      </div>
    </section>
  );
}
