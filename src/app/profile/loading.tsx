import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
        <Skeleton className="mx-auto size-20 rounded-full" />
        <Skeleton className="mx-auto mt-4 h-7 w-40" />
        <Skeleton className="mx-auto mt-2 h-4 w-52" />
        <Skeleton className="mx-auto mt-6 h-10 w-44 rounded-lg" />
      </div>
    </section>
  );
}
