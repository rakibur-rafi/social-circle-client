import { CreateEventForm } from "@/components/create-event/create-event-form";


export default function CreateEventPage() {
  return (
    <section className="mx-auto flex max-w-7xl justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 text-card-foreground sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Create Event</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Host an upcoming event and invite volunteers from your community.
        </p>
        <CreateEventForm />
      </div>
    </section>
  );
}
