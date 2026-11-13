"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EventSearch({ q, type }: { q: string; type: string }) {
  const router = useRouter();
  const [value, setValue] = useState(q);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (value.trim()) params.set("q", value.trim());
    const query = params.toString();
    router.push(query ? `/events?${query}` : "/events");
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-md gap-2">
      <Input
        type="text"
        placeholder="Search by title, host, or location..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="h-10"
      />
      <Button type="submit">
        <Search />
        Search
      </Button>
    </form>
  );
}
