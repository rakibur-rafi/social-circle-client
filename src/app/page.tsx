import { Suspense } from "react";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Features } from "@/components/home/features";
import {
  RecentEvents,
  RecentEventsSkeleton,
} from "@/components/home/recent-events";
import { Gallery } from "@/components/home/gallery";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Suspense fallback={<RecentEventsSkeleton />}>
        <RecentEvents />
      </Suspense>
      <Features />
      <Gallery />
      <Newsletter />
    </>
  );
}
