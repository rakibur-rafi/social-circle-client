"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api";

export function CancelJoinButton({
  eventId,
  email,
}: {
  eventId: string;
  email: string;
}) {
  const router = useRouter();

  const handleCancel = async () => {
    const res = await fetch(
      `${API_URL}/joined-events/${encodeURIComponent(email)}/${eventId}`,
      {
        method: "DELETE",
      },
    );

    if (res.ok) {
      toast.success("Your join was cancelled.");
      router.refresh();
    } else {
      toast.error("Failed to cancel your join.");
    }
  };

  return (
    <Button variant="destructive" className="flex-1" onClick={handleCancel}>
      Cancel Join
    </Button>
  );
}
