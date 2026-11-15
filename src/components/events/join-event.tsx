"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { API_URL } from "@/lib/api";

type Join = {
  _id: string;
  eventId: string;
  name: string;
  email: string;
  image: string;
  joinedAt?: string;
};

export function JoinEvent({
  eventId,
  initialJoins,
}: {
  eventId: string;
  initialJoins: Join[];
}) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [joins, setJoins] = useState<Join[]>(initialJoins);
  const [joining, setJoining] = useState(false);

  const myJoin = user
    ? joins.find((join) => join.email === user.email)
    : undefined;

  const handleJoin = async () => {
    if (!user || myJoin || joining) return;
    setJoining(true);

    const data = {
      eventId,
      name: user.name,
      email: user.email,
      image: user.image ?? "",
      joinedAt: new Date().toISOString(),
    };

    const res = await fetch(`${API_URL}/joined-events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      toast.success("You joined this event!");
      setJoins([...joins, { ...data, _id: result.insertedId }]);
    } else {
      toast.error("Failed to join the event.");
    }
    setJoining(false);
  };

  const handleCancel = async () => {
    if (!user) return;

    const res = await fetch(
      `${API_URL}/joined-events/${user.email}/${eventId}`,
      {
        method: "DELETE",
      },
    );

    if (res.ok) {
      toast.success("Your join was cancelled.");
      setJoins(joins.filter((join) => join.email !== user.email));
    } else {
      toast.error("Failed to cancel your join.");
    }
  };

  const recent = [...joins]
    .sort((a, b) => (b.joinedAt ?? "").localeCompare(a.joinedAt ?? ""))
    .slice(0, 5);

  if (isPending) return null;

  return (
    <div className="mt-8 rounded-2xl border border-border p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold tracking-tight">
            {joins.length} {joins.length === 1 ? "volunteer" : "volunteers"}{" "}
            joined
          </p>
          {recent.length > 0 ? (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {recent.map((join) => (
                <div
                  key={join._id}
                  className="flex items-center gap-2"
                  title={join.name}
                >
                  <Avatar size="sm">
                    <AvatarImage src={join.image || ""} alt={join.name} />
                    <AvatarFallback>
                      {join.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {join.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Be the first to volunteer.
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!user ? (
            <Button
              variant="secondary"
              nativeButton={false}
              render={<Link href="/login" />}
            >
              Login to Join
            </Button>
          ) : myJoin ? (
            <>
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                Joined
              </span>
              <Button variant="destructive" onClick={handleCancel}>
                Cancel Join
              </Button>
            </>
          ) : (
            <Button onClick={handleJoin} disabled={joining}>
              <UserPlus />
              Join Event
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
