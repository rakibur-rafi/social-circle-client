import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="px-4 py-2 sm:px-6 max-w-7xl mx-auto">
      <div className="relative flex min-h-[560px] flex-col overflow-hidden rounded-3xl lg:min-h-[640px]">
        <Image
          src="/images/banner.jpg"
          alt="Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/20" />

        <div className="relative flex w-full flex-1 flex-col justify-end gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-10">
          <div className="max-w-xl">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Every Shared Moment Builds a Stronger Community
            </h1>
            <p className="mt-4 max-w-md text-sm text-white/80">
              Social Circle brings people together through local events. Be a
              participant, lend a hand, and turn small acts into lasting impact.
            </p>
            <Button
              variant="secondary"
              className="mt-6"
              nativeButton={false}
              render={<Link href="/signup" />}
            >
              Join Upcoming Events
              <ArrowUpRight />
            </Button>
          </div>

          <div className="w-full max-w-sm space-y-3 flex justify-end">
            <div className="rounded-2xl bg-card p-5 text-card-foreground shadow-lg md:w-72">
              <p className="text-3xl font-semibold tracking-tight">Be a Volunteer</p>
              <div className="mt-3 h-1.5 rounded-full bg-muted">
                <div className="h-full w-2/3 rounded-full bg-primary" />
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">1000+ Joined</span>
now               </div>
            </div>

          
          </div>
        </div>
      </div>
    </section>
  );
}
