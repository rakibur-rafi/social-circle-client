import Image from "next/image";

const galleryItems = [
  { caption: "Riverfront Cleanup", position: "object-[12%_20%]" },
  { caption: "Community Meetup", position: "object-[38%_28%]" },
  { caption: "Volunteer Day", position: "object-[62%_32%]" },
  { caption: "Neighbors Helping Neighbors", position: "object-[88%_45%]" },
  { caption: "Youth Outreach", position: "object-[25%_65%]" },
  { caption: "Together for the Neighborhood", position: "object-center" },
];

export function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Gallery
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Moments from our community service events — the people, the places,
          and the impact we create together.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {galleryItems.map(({ caption, position }) => (
          <figure
            key={caption}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border"
          >
            <Image
              src="/images/banner.jpg"
              alt={caption}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className={`object-cover ${position}`}
            />
            <figcaption className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
