"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { API_URL } from "@/lib/api";
import { redirect } from "next/navigation";

const eventTypes = {
  cleanup: "Cleanup",
  plantation: "Plantation",
  donation: "Donation",
  workshop: "Workshop",
  "food-drive": "Food Drive",
};

type EventTypeKey = keyof typeof eventTypes;

function setMinToTomorrow(element: HTMLInputElement | null) {
  if (!element) return;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const pad = (n: number) => String(n).padStart(2, "0");
  element.min = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}`;
}

export function CreateEventForm() {
  const [eventType, setEventType] = useState<EventTypeKey | null>(null);

  const {data: session} = authClient.useSession();
  const user = session?.user;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const event = Object.fromEntries(formData.entries()) as {
      title: string;
      description: string;
      eventType: EventTypeKey;
      thumbnailUrl: string;
      location: string;
      eventDate: string;
    };
    if (!event.eventType) {
      toast.error("Please select an event type.");
      return;
    }
    
    const data= {
      name: user?.name,
      email: user?.email,
      image: user?.image,
      ...event
    }
    
    const res= await fetch(`${API_URL}/add-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const eventData= await res.json();
    if(res.ok){
      toast.success("Event created successfully!");
      redirect("/");
    } else {
      toast.error(eventData.message || "Failed to create event.");
    }
  }



  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="space-y-1.5">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input id="title" name="title" type="text" placeholder="Local Field Cleanup" required />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          placeholder="What will volunteers do at this event?"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="eventType" className="text-sm font-medium">
          Event type
        </label>
        <Select
          items={eventTypes}
          name="eventType"
          value={eventType}
          onValueChange={(value) => setEventType(value ?? null)}
        >
          <SelectTrigger id="eventType" className="w-full">
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
        <label htmlFor="thumbnailUrl" className="text-sm font-medium">
          Thumbnail image URL
        </label>
        <Input
          id="thumbnailUrl"
          name="thumbnailUrl"
          type="url"
          placeholder="https://example.com/thumbnail.png"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <Input id="location" name="location" type="text" placeholder="Halishahar, Chittagong" required />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="eventDate" className="text-sm font-medium">
            Event date
          </label>
          <Input id="eventDate" name="eventDate" type="date" ref={setMinToTomorrow} required />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Create Event
      </Button>
    </form>
  );
}
