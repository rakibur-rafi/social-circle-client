import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { JoinEvent } from "@/components/events/join-event";

const eventTypes: Record<string, string> = {
  cleanup: "Cleanup",
  plantation: "Plantation",
  donation: "Donation",
  workshop: "Workshop",
  "food-drive": "Food Drive",
};

type Event = {
  _id: string;
  name: string;
  image: string;
  title: string;
  description: string;
  eventType: string;
  thumbnailUrl: string;
  location: string;
  eventDate: string;
};

type Join = {
  _id: string;
  eventId: string;
  name: string;
  email: string;
  image: string;
  joinedAt?: string;
};

async function getEvents(): Promise<Event[]> {
  try {
    const res = await fetch("http://localhost:5000/events", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const events = await res.json();
    return Array.isArray(events) ? (events as Event[]) : [];
  } catch {
    return [];
  }
}

async function getJoins(eventId: string): Promise<Join[]> {
  try {
    const res = await fetch("http://localhost:5000/joined-events", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const joins = await res.json();
    return Array.isArray(joins)
      ? (joins as Join[]).filter((join) => join.eventId === eventId)
      : [];
  } catch {
    return [];
  }
}

function formatEventDate(eventDate: string): string {
  return new Date(`${eventDate}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const metadata = {
  title: "Event · Social Circle",
};

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = (await getEvents()).find((event) => event._id === id);

  if (!event) notFound();

  const joins = await getJoins(event._id);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={<Link href="/events" />}
      >
        <ArrowLeft />
        Back to events
      </Button>

      <div className="mt-4 overflow-hidden rounded-3xl border border-border bg-card text-card-foreground">
        <div className="relative aspect-[21/9] w-full">
          <Image
            src={event.thumbnailUrl}
            alt={event.title}
            fill
            sizes="(min-width: 1280px) 80rem, 100vw"
            className="object-cover"
            unoptimized
            priority
          />
          <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {eventTypes[event.eventType] ?? event.eventType}
          </span>
        </div>

        <div className="p-6 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {event.title}
          </h1>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <CalendarDays className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm text-muted-foreground">
                  {formatEventDate(event.eventDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <MapPin className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {event.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarImage src={event.image || ""} alt={event.name} />
                <AvatarFallback>
                  {event.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Hosted by</p>
                <p className="text-sm text-muted-foreground">{event.name}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 max-w-3xl">
            <h2 className="text-lg font-semibold tracking-tight">
              About this event
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {event.description}
            </p>
          </div>

          <JoinEvent eventId={event._id} initialJoins={joins} />
        </div>
      </div>
    </section>
  );
}
