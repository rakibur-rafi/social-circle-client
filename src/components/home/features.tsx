import { CalendarClock, MousePointerClick, Sparkles, Users } from "lucide-react";

const features = [
  {
    title: "Community-led",
    description: "Events are created and run by community members — anyone can start one.",
    Icon: Users,
  },
  {
    title: "One-click participation",
    description: "Join an event or sign up to volunteer in seconds, no long forms.",
    Icon: MousePointerClick,
  },
  {
    title: "Upcoming events only",
    description: "A clean list of what's happening soon — no stale or expired listings.",
    Icon: CalendarClock,
  },
  {
    title: "Meet like-minded people",
    description: "Every event is a chance to grow your social circle and make new friends.",
    Icon: Sparkles,
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Why Social Circle
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Everything you need to discover local events, pitch in, and connect
          with your community — no friction, no clutter.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {features.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-card p-6 text-card-foreground"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
