import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

type EventCardProps = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  location: string;
  host: string;
  typeLabel: string;
  dateLabel: string;
};

export function EventCard({
  id,
  title,
  description,
  thumbnailUrl,
  location,
  host,
  typeLabel,
  dateLabel,
}: EventCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
      <div className="relative aspect-[16/10]">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          unoptimized
        />
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {typeLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tight line-clamp-1">
          {title}
        </h3>

        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-primary" />
            <span className="truncate">{location}</span>
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0 text-primary" />
            {dateLabel}
          </p>
          <p className="flex items-center gap-2">
            <UserRound className="size-4 shrink-0 text-primary" />
            <span className="truncate">Hosted by {host}</span>
          </p>
        </div>

        <Button
          className="mt-5 w-full"
          nativeButton={false}
          render={<Link href={`/events/${id}`} />}
        >
          View Event
        </Button>
      </div>
    </article>
  );
}
