import { Skeleton } from "@/components/ui/skeleton";

export function EventCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <Skeleton className="aspect-[16/10] rounded-none" />

      <div className="flex flex-1 flex-col p-5">
        <Skeleton className="h-6 w-3/4" />

        <div className="mt-3 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <Skeleton className="mt-5 h-9 w-full" />
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
}
