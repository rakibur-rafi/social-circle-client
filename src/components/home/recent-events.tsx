import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api";

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

async function fetchJsonEvents(path: string): Promise<Event[]> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const events = await res.json();
    return Array.isArray(events) ? (events as Event[]) : [];
  } catch {
    return [];
  }
}

async function getRecentUpcomingEvents(): Promise<Event[]> {

  const recentEvents = await fetchJsonEvents("/events");
  if (recentEvents.length > 0) return recentEvents.slice(0, 6);

  return (await fetchJsonEvents("/events"))
    .filter((event) => isUpcoming(event.eventDate))
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate))
    .slice(0, 6);
}

export async function RecentEvents() {
  const events = await getRecentUpcomingEvents();

  if (events.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Recent Upcoming Events
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Six of the next events happening in your community — grab a spot
          before they fill up.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {events.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            title={event.title}
            thumbnailUrl={event.thumbnailUrl}
            location={event.location}
            host={event.name}
            typeLabel={eventTypes[event.eventType] ?? event.eventType}
            dateLabel={formatEventDate(event.eventDate)}
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button
          variant="secondary"
          nativeButton={false}
          render={<Link href="/events" />}
        >
          View All Events
          <ArrowUpRight />
        </Button>
      </div>
    </section>
  );
}
