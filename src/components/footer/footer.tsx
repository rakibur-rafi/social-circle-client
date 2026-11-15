import Link from "next/link";
import type { SVGProps } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo/logo";

const exploreLinks = [
  { label: "Upcoming Events", href: "/events" },
  { label: "Create Event", href: "/create-event" },
  { label: "Joined Events", href: "/joined-events" },
];

const accountLinks = [
  { label: "Profile", href: "/profile" },
  { label: "Become a Volunteer", href: "/signup" },
  { label: "Login", href: "/login" },
];

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const socialLinks = [
  { label: "X (Twitter)", href: "https://x.com", Icon: XIcon },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
  { label: "YouTube", href: "https://youtube.com", Icon: YoutubeIcon },
];

function FooterNav({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <Logo className="size-5" />
              <span className="text-base font-semibold tracking-tight">
                Social Circle
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Social Circle brings neighbors together through local volunteer
              events — lend a hand, meet like-minded people, and turn small
              acts into lasting impact.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <Button
                  key={label}
                  variant="outline"
                  size="icon-sm"
                  className="rounded-full text-muted-foreground hover:text-foreground"
                  nativeButton={false}
                  render={
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                    />
                  }
                >
                  <Icon className="size-4" />
                </Button>
              ))}
            </div>
          </div>

          <FooterNav title="Explore" links={exploreLinks} />
          <FooterNav title="Account" links={accountLinks} />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Social Circle. All rights reserved.</p>
          <p>Built for community volunteers, by community volunteers.</p>
        </div>
      </div>
    </footer>
  );
}
