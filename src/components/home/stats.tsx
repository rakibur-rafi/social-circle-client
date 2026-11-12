import { CalendarDays, HeartHandshake, Users } from "lucide-react";

const stats = [
  { value: "1,000+", label: "Active volunteers", Icon: Users },
  { value: "100+", label: "Community events", Icon: CalendarDays },
  { value: "15,000", label: "People helped", Icon: HeartHandshake },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        {stats.map(({ value, label, Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 text-card-foreground md:p-8"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Icon className="size-5" />
            </span>
            <div>
              <p className="text-3xl font-semibold tracking-tight">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
