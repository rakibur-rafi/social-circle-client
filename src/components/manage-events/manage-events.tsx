"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { CalendarDays, MapPin, Pencil, Trash2 } from "lucide-react";import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
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

function setMinToTomorrow(element: HTMLInputElement | null) {
  if (!element) return;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const pad = (n: number) => String(n).padStart(2, "0");
  element.min = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}`;
}

function formatEventDate(eventDate: string): string {
  return new Date(`${eventDate}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function ManageEventForm({
  event,
  onSaved,
  onCancel,
}: {
  event: Event;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [eventType, setEventType] = useState(event.eventType);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated = Object.fromEntries(formData.entries()) as {
      title: string;
      description: string;
      thumbnailUrl: string;
      location: string;
      eventDate: string;
    };
    if (!eventType) {
      toast.error("Please select an event type.");
      return;
    }

    const res = await fetch(`${API_URL}/events/${event._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updated, eventType }),
    });

    if (res.ok) {
      toast.success("Event updated successfully!");
      onSaved();
    } else {
      toast.error("Failed to update event.");
    }
  };

  return (
    <form className="mt-1 space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <label htmlFor={`title-${event._id}`} className="text-sm font-medium">
          Title
        </label>
        <Input
          id={`title-${event._id}`}
          name="title"
          type="text"
          defaultValue={event.title}
          required
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor={`description-${event._id}`}
          className="text-sm font-medium"
        >
          Description
        </label>
        <Textarea
          id={`description-${event._id}`}
          name="description"
          defaultValue={event.description}
          required
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor={`eventType-${event._id}`}
          className="text-sm font-medium"
        >
          Event type
        </label>
        <Select
          items={eventTypes}
          name="eventType"
          value={eventType}
          onValueChange={(value) => setEventType(value ?? "")}
        >
          <SelectTrigger id={`eventType-${event._id}`} className="w-full">
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(eventTypes).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor={`thumbnailUrl-${event._id}`}
          className="text-sm font-medium"
        >
          Thumbnail image URL
        </label>
        <Input
          id={`thumbnailUrl-${event._id}`}
          name="thumbnailUrl"
          type="url"
          defaultValue={event.thumbnailUrl}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor={`location-${event._id}`}
            className="text-sm font-medium"
          >
            Location
          </label>
          <Input
            id={`location-${event._id}`}
            name="location"
            type="text"
            defaultValue={event.location}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor={`eventDate-${event._id}`}
            className="text-sm font-medium"
          >
            Event date
          </label>
          <Input
            id={`eventDate-${event._id}`}
            name="eventDate"
            type="date"
            defaultValue={event.eventDate}
            ref={setMinToTomorrow}
            required
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          Save Changes
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function ManageEventCard({
  event,
  onUpdated,
}: {
  event: Event;
  onUpdated: () => void;
}) {
  const [editing, setEditing] = useState(false);


  const handleDelete = async () => {
    if (!window.confirm(`Delete "${event.title}"? This cannot be undone.`)) {
      return;
    }

    const res = await fetch(`${API_URL}/events/${event._id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Event deleted.");
      onUpdated();
    } else {
      toast.error("Failed to delete event.");
    }
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
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
          <Dialog open={editing} onOpenChange={setEditing}>
            <DialogTrigger
              render={<Button variant="outline" className="flex-1" />}
            >
              <Pencil />
              Edit
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
                <DialogDescription>
                  Update the details of &quot;{event.title}&quot;.
                </DialogDescription>
              </DialogHeader>
              <ManageEventForm
                event={event}
                onSaved={() => {
                  setEditing(false);
                  onUpdated();
                }}
                onCancel={() => setEditing(false)}
              />
            </DialogContent>
          </Dialog>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleDelete}
          >
            <Trash2 />
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ManageEvents() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [events, setEvents] = useState<Event[] | null>(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!user?.email) return;
    let active = true;
    const load = async () => {
      try {
        const res = await fetch(
          `${API_URL}/events/${user.email}`,
        );
        const data = await res.json();
        if (active) setEvents(Array.isArray(data) ? (data as Event[]) : []);
      } catch {
        if (active) {
          setEvents([]);
          toast.error("Failed to load your events.");
        }
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [user?.email, refresh]);

  if (isPending) return null;

  if (!user) {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-border bg-card p-10 text-center text-card-foreground">
        <h2 className="text-xl font-semibold tracking-tight">
          Log in to manage your events
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Only the events you&apos;ve created show up here for editing and
          deletion.
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
    );
  }

  if (events === null) {
    return (
      <p className="mt-10 text-center text-sm text-muted-foreground">
        Loading your events...
      </p>
    );
  }

  if (events.length === 0) {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-border bg-card p-10 text-center text-card-foreground">
        <h2 className="text-xl font-semibold tracking-tight">
          You haven&apos;t created any events yet
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Host your first event and it will show up here for editing.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          nativeButton={false}
          render={<Link href="/create-event" />}
        >
          Create Event
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {events.map((event) => (
        <ManageEventCard
          key={event._id}
          event={event}
          onUpdated={() => setRefresh((r) => r + 1)}
        />
      ))}
    </div>
  );
}
