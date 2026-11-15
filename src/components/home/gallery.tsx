import Image from "next/image";

const galleryItems = [
  { caption: "Free Food for the Hungry", position: "object-[12%_20%]", image :"/images/newsletter1.jpg" },
  { caption: "Connecting People", position: "object-[38%_28%]", image :"/images/newsletter2.jpg"},
  { caption: "Winter Food Distribution", position: "object-[62%_32%]", image :"/images/newsletter3.jpg" },
  { caption: "Tree Planting", position: "object-[88%_45%]", image :"/images/newsletter4.jpg" },
  { caption: "Smiles We Share", position: "object-[25%_65%]", image :"/images/newsletter5.jpg" },
  { caption: "Free Clothing for the Homeless", position: "object-center", image :"/images/newsletter6.jpg" },
];

export function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Gallery
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Moments from our community service events.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {galleryItems.map(({ caption, position, image }) => (
          <figure
            key={caption}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border"
          >
            <Image
              src={image}
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
