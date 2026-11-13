import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { EventSearch } from "@/components/events/event-search";
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

function buildFilterHref(type: string, q: string): string {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (q) params.set("q", q);
  const query = params.toString();
  return query ? `/events?${query}` : "/events";
}


export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const type = params.type && params.type in eventTypes ? params.type : "";

  const upcomingEvents = (await getEvents()).filter((event) =>
    isUpcoming(event.eventDate),
  );

  const filteredEvents = upcomingEvents
    .filter((event) => !type || event.eventType === type)
    .filter((event) => {
      if (!q) return true;
      const needle = q.toLowerCase();
      return (
        event.title.toLowerCase().includes(needle) ||
        event.name.toLowerCase().includes(needle) ||
        event.location.toLowerCase().includes(needle)
      );
    })
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Upcoming Events
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Check out the events happening soon
          </p>
        </div>
        <Button
          variant="secondary"
          className="shrink-0"
          nativeButton={false}
          render={<Link href="/create-event" />}
        >
          Create Event
          <ArrowUpRight />
        </Button>
      </div>

      {upcomingEvents.length > 0 ? (
        <>
          <div className="mt-10 flex flex-col max-sm:items-center gap-4">
            <EventSearch q={q} type={type} />
            <div className="flex flex-wrap max-sm:justify-center gap-2">
              {[
                { value: "", label: "All" },
                ...Object.entries(eventTypes).map(([value, label]) => ({
                  value,
                  label,
                })),
              ].map((filter) => (
                <Button
                  key={filter.value || "all"}
                  variant={filter.value === type ? "default" : "outline"}
                  size="sm"
                  nativeButton={false}
                  render={<Link href={buildFilterHref(filter.value, q)} />}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {filteredEvents.map((event) => (
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
          ) : (
            <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-border bg-card p-10 text-center text-card-foreground">
              <h2 className="text-xl font-semibold tracking-tight">
                No events match your filters
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a different event type or search term.
              </p>
              <Button
                variant="secondary"
                className="mt-6"
                nativeButton={false}
                render={<Link href="/events" />}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </>
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
