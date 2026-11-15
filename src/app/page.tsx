import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Features } from "@/components/home/features";
import { RecentEvents } from "@/components/home/recent-events";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <RecentEvents />
      <Features />
    </>
  );
}
