import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Skeleton className="min-h-[560px] w-full rounded-3xl lg:min-h-[640px]" />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-40 rounded-2xl" />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-72 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
