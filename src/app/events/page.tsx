import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";

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
  title: string;
  description: string;
  eventType: string;
  thumbnailUrl: string;
  location: string;
  eventDate: string;
};

async function getEvents(): Promise<Event[]> {
  try {
    const res = await fetch("http://localhost:5000/events");
    if (!res.ok) return [];
    const events = await res.json();
    return Array.isArray(events) ? (events as Event[]) : [];
  } catch {
    return [];
  }
}

function isUpcoming(eventDate: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) return false;
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  return eventDate >= today;
}

function formatEventDate(eventDate: string): string {
  return new Date(`${eventDate}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}


export default async function EventsPage() {
  const events = (await getEvents())
    .filter((event) => isUpcoming(event.eventDate))
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Upcoming Events
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          A clean list of what&apos;s happening soon - pick an event, pitch in,
          and grow your social circle.
        </p>
      </div>

      {events.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {events.map((event) => (
            <EventCard
              key={event._id}
              id={event._id}
              title={event.title}
              description={event.description}
              thumbnailUrl={event.thumbnailUrl}
              location={event.location}
              host={event.name}
              typeLabel={eventTypes[event.eventType] ?? event.eventType}
              dateLabel={formatEventDate(event.eventDate)}
            />
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-border bg-card p-10 text-center text-card-foreground">
          <h2 className="text-xl font-semibold tracking-tight">
            No upcoming events yet
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Be the first to bring your community together — host an event and
            it will show up here.
          </p>
          <Button
            variant="secondary"
            className="mt-6"
            nativeButton={false}
            render={<Link href="/create-event" />}
          >
            Create Event
            <ArrowUpRight />
          </Button>
        </div>
      )}
    </section>
  );
}
