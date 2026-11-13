
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo/logo";
import { ModeToggle } from "../toggler";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";

const navLinks = [
  { label: "Upcoming Events", href: "/events" },
];

type UserDropdownProps = {
  user: {
    name: string;
    image?: string | null;
  };
  handleLogout: () => void;
};

function UserDropdown({ user, handleLogout }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Avatar>
              <AvatarImage src={user.image || ""} alt={user.name || "User"} />
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase() || <User size={18} />}
              </AvatarFallback>
            </Avatar>
          </button>
        }
      />

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem render={<Link href="/create-event" />}>
          Create Event
        </DropdownMenuItem>

        <DropdownMenuItem render={<Link href="/manage-events" />}>
          Manage Events
        </DropdownMenuItem>

        <DropdownMenuItem render={<Link href="/joined-events" />}>
          Joined Events
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:text-destructive"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logged out successfully!");
    setOpen(false);
    redirect("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Logo />
          <span className="text-lg font-semibold tracking-tight">
            Social Circle
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ModeToggle />

          {!isPending &&
            (user ? (
              <UserDropdown user={user} handleLogout={handleLogout} />
            ) : (
              <>
                <Button
                  variant="secondary"
                  nativeButton={false}
                  render={<Link href="/login" />}
                >
                  Login
                </Button>

                <Button
                  nativeButton={false}
                  render={<Link href="/signup" />}
                >
                  Sign Up
                </Button>
              </>
            ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <div className="border-t bg-background px-4 py-4 sm:px-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {!isPending &&
              (user ? (
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />
                      <AvatarFallback>
                        {user.name?.charAt(0).toUpperCase() || (
                          <User size={18} />
                        )}
                      </AvatarFallback>
                    </Avatar>

                    <span className="text-sm font-medium">{user.name}</span>
                  </div>

                  <UserDropdown
                    user={user}
                    handleLogout={handleLogout}
                  />
                </div>
              ) : (
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    nativeButton={false}
                    render={<Link href="/login" />}
                  >
                    Login
                  </Button>

                  <Button
                    className="flex-1"
                    nativeButton={false}
                    render={<Link href="/signup" />}
                  >
                    Sign Up
                  </Button>
                </div>
              ))}
          </nav>
        </div>
      )}
    </header>
  );
}
