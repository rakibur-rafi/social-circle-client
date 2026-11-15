import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Skeleton className="h-8 w-36 rounded-lg" />

      <div className="mt-4 overflow-hidden rounded-3xl border border-border">
        <Skeleton className="aspect-[21/9] w-full rounded-none" />
      </div>

      <div className="mt-8">
        <Skeleton className="h-10 w-2/3 max-w-xl" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 max-w-3xl space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <Skeleton className="mt-8 h-44 w-full rounded-2xl" />
    </section>
  );
}
