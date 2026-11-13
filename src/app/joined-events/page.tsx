import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { CancelJoinButton } from "@/components/joined-events/cancel-join-button";

const eventTypes: Record<string, string> = {
  cleanup: "Cleanup",
  plantation: "Plantation",
  donation: "Donation",
  workshop: "Workshop",
  "food-drive": "Food Drive",
};

type Join = {
  _id: string;
  eventId: string;
};

type Event = {
  _id: string;
  title: string;
  eventType: string;
  thumbnailUrl: string;
  location: string;
  eventDate: string;
};

function formatEventDate(eventDate: string): string {
  return new Date(`${eventDate}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function JoinedEventsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  let joins: Join[] | null = null;
  let events: Event[] | null = null;
  let failed = false;

  if (user?.email) {
    try {
      const [joinRes, eventRes] = await Promise.all([
        fetch(`http://localhost:5000/joined-events/${user.email}`),
        fetch("http://localhost:5000/events"),
      ]);
      const joinData = await joinRes.json();
      const eventData = await eventRes.json();
      joins = Array.isArray(joinData) ? (joinData as Join[]) : [];
      events = Array.isArray(eventData) ? (eventData as Event[]) : [];
    } catch {
      failed = true;
    }
  }

  const joinedEvents = [...(joins ?? [])]
    .map((join) => (events ?? []).find((event) => event._id === join.eventId))
    .filter((event): event is Event => Boolean(event))
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Joined Events
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The events you&apos;ve signed up for as a volunteer
        </p>
      </div>

      {failed ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Failed to load your joined events. Please try again.
        </p>
      ) : !user ? (
        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-border bg-card p-10 text-center text-card-foreground">
          <h2 className="text-xl font-semibold tracking-tight">
            Log in to see your joined events
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The events you&apos;ve joined as a volunteer will show up here.
          </p>
          <Button
            variant="secondary"
            className="mt-6"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Login
          </Button>
        </div>
      ) : joinedEvents.length === 0 ? (
        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-border bg-card p-10 text-center text-card-foreground">
          <h2 className="text-xl font-semibold tracking-tight">
            You haven&apos;t joined any events yet
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse upcoming events and volunteer to grow your social circle.
          </p>
          <Button
            variant="secondary"
            className="mt-6"
            nativeButton={false}
            render={<Link href="/events" />}
          >
            Browse Events
            <ArrowUpRight />
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {joinedEvents.map((event) => (
            <article
              key={event._id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={event.thumbnailUrl}
                  alt={event.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  unoptimized
                />
                <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {eventTypes[event.eventType] ?? event.eventType}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold tracking-tight line-clamp-1">
                  {event.title}
                </h3>

                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <MapPin className="size-4 shrink-0 text-primary" />
                    <span className="truncate">{event.location}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays className="size-4 shrink-0 text-primary" />
                    {formatEventDate(event.eventDate)}
                  </p>
                </div>

                <div className="mt-5 flex gap-2">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    nativeButton={false}
                    render={<Link href={`/events/${event._id}`} />}
                  >
                    View
                  </Button>
                  <CancelJoinButton
                    eventId={event._id}
                    email={user.email}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
