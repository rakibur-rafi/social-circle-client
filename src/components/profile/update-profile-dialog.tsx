"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UserRoundPen } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function UpdateProfileDialog({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const user = Object.fromEntries(formData);
    // Skip empty fields so untouched inputs don't overwrite existing values.
    const updates = Object.fromEntries(
      Object.entries(user).filter(([, value]) => value !== ""),
    );
    const updated = await authClient.updateUser({
      ...updates,
    });

    if (updated.error) {
      toast.error(updated.error.message || "Failed to update your profile.");
      return;
    }

    toast.success("Profile updated!");
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="mt-6" />}>
        <UserRoundPen />
        Update Profile
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Change the name and image shown on your profile and events.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input id="name" name="name" defaultValue={name} required />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="image" className="text-sm font-medium">
              Image URL
            </label>
            <Input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/avatar.png"
              defaultValue={image}
            />
          </div>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
