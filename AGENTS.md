# AGENTS.md

## Commands

- npm only (package-lock.json; no other lockfiles committed).
- `npm run dev` / `npm run build` / `npm run lint` / `npm run start`. Next 16 uses Turbopack for dev and build by default.
- No test script and no test framework installed. No typecheck script — run `npx tsc --noEmit` (tsconfig is strict).
- Lint uses ESLint 9 flat config (`eslint.config.mjs` extends `eslint-config-next` core-web-vitals + TS). `npm run lint` passes no args, so it lints the whole repo rather than staged files.

## Stack quirks

- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`, `babel-plugin-react-compiler`). Do not add manual `useMemo`/`useCallback`/`React.memo`. `"use client"` is still required for components using hooks/event handlers.
- **Tailwind CSS v4, no postcss.config** — CSS is compiled via the `@tailwindcss/turbopack` loader rule in `next.config.ts` and `@import "tailwindcss"` in `src/app/globals.css`. Don't remove that rule or add a PostCSS config, or styles break. Theme tokens/variables live in `src/app/globals.css`.
- **shadcn/ui uses Base UI, not Radix** — style is `base-vega` and the primitive dependency is `@base-ui/react` (see `components.json`). Existing components are in `src/components/ui`; add more with `npx shadcn add`. `cn` helper: `@/lib/utils`.
- Dark mode via `next-themes`: `ThemeProvider` (class attribute) wraps the app in `src/app/layout.tsx`; toggle is `src/components/toggler.tsx`.
- `src/` layout: App Router code in `src/app/`, path alias `@/*` → `src/*`; universal components in `src/components/`.

## Design system

Concrete design language established on the homepage — reuse it everywhere:

- **Brand palette** (semantic tokens in `src/app/globals.css`, keep all components on these):
  - `--primary` dark green `oklch(0.32 0.07 152)` (~`#1F3D2B`) — filled buttons, icon accents, progress bars; light/mint in dark mode.
  - `--secondary` / `--accent` mint `oklch(0.95 0.03 145)` (~`#E4F3EA`) with dark-green `*-foreground` — secondary buttons, badges, icon chips.
  - White `--background` / `--card`; neutral grey `--muted` etc.
- **Shapes**: cards/hero `rounded-2xl`, hero section `rounded-3xl`, icon chips are circular (`rounded-full`, `bg-secondary text-secondary-foreground`).
- **Stat/feature card pattern** (see `src/components/home/stats.tsx`): white `bg-card` + `border border-border` (border REQUIRED on white background — shadow alone only works over photos) + icon chip + `text-3xl font-semibold tracking-tight` value + `text-sm text-muted-foreground` label. Equal height/width in a grid; `grid-cols-1 sm:grid-cols-3` responsive pattern.
- **Hero pattern** (see `src/components/home/hero.tsx`): local images from `public/images/` via `next/image` with `fill` + `object-cover`, `bg-gradient-to-t from-black/…` overlay, white overlay text, floating `bg-card` cards top layer, CTA as mint `secondary` Button with `ArrowUpRight`.
- **Typography**: Inter/Geist sans (`--font-sans`), large semibold tracking-tight headings, `text-sm` muted-foreground body. No additional fonts. **Section header pattern** (see `src/components/home/features.tsx`): centered `max-w-2xl` block with `h2` `text-3xl font-semibold tracking-tight` (`sm:text-4xl`) + `mt-3 text-sm text-muted-foreground` subheading, grid starts `mt-10`.
- **Icons**: lucide-react only for UI icons; social brand icons are inline SVGs (lucide has no brand icons) — see `src/components/footer/footer.tsx`.
- **Spacing**: page sections use `mx-auto max-w-7xl px-4 sm:px-6` with `py-10`-ish rhythm; gaps `gap-4` mobile → `gap-6` desktop.
- **Auth pages** (see `src/app/login|signup/page.tsx`): centered `max-w-md` `bg-card` card with logo link on top, `h1` + muted subheading, then a form component in `src/components/login|signup/` using the shadcn `Input` component (label + `space-y-1.5` per field), full-width primary submit, `or` divider, outline "Continue with Google" button (GoogleIcon in `src/components/google-icon/`). Forms are client components with `onSubmit` preventDefault only — wire to the real auth backend before relying on them.
- **Toasts**: react-toastify (`toast` from `"react-toastify"`; v11 = styles auto-injected). `ToastContainer` is wrapped in `src/components/toast-container/toast-container.tsx` (client) with `useTheme` from next-themes so toasts follow light/dark — mounted once in `layout.tsx`; don't add per-page containers. Signup password rule (user-specified): ≥6 chars + uppercase + lowercase, checked in `src/components/signup/signup-form.tsx` `validatePassword`, failures show `toast.error`.
- **Auth**: better-auth via `authClient` from `@/lib/auth-client` — used in navbar (session/user dropdown, logout with `toast`) and guard `if (user) redirect("/")` in login/signup pages. Don't reintroduce plain Link login/signup buttons when a session exists.
- **Create Event page** (`src/app/create-event/page.tsx` + `src/components/create-event/create-event-form.tsx`): title, description (Textarea), event type (Base UI `Select` from `src/components/ui/select.tsx` — pass `items` prop so `SelectValue` renders the label; `name` prop serializes into FormData; trigger needs `className="w-full"` in forms), thumbnail URL, location, event date. User rule: **no past dates** — submit-time check shows `toast.error("Event date must be in the future.")`, and the date input's `min=tomorrow` is set by a ref callback (`setMinToTomorrow`), not state/effect (react-hooks lint bans setState-in-effect; SSR-safe). Form submit only `preventDefault` + `TODO` until backend exists.

## UI guidelines (user-specified — always follow)

All UI work must keep every page looking like part of one application. The homepage (`src/app/page.tsx`, `layout.tsx`) is the primary design reference; the user will supply reference images when relevant.

- **Component structure**: one folder per component under `src/components/<name>/<name>.tsx` (e.g. `navbar/navbar.tsx`, `logo/logo.tsx`). **Universal components** (navbar, footer, logo, ui) live at the top level; **page-section components** live under a folder named after the page — `src/components/home/` for homepage sections (`hero.tsx`, `stats.tsx`; create `src/components/about/` etc. for other pages). Navbar and footer are universal across all pages — render them in `layout.tsx` wrapping `{children}` in `<main className="flex-1">`; never re-add them per page. Page content goes in `page.tsx`.

- **Design consistency**: reuse the homepage's heading and paragraph typography, spacing, margins, gaps, and alignment. Clean, modern, professional look.
- **Navbar**: one navbar design everywhere — keep logo/heading typography and height consistent with the homepage.
- **Buttons**: reuse `src/components/ui/button.tsx` variants/sizes (default, outline, secondary, ghost, destructive, link); no custom one-off button styles.
- **Images & grids**: consistent dimensions/aspect ratios within a section, uniform spacing, consistent `object-fit`, responsive CSS Grid; no stretched/distorted images.
- **Cards**: equal height/width within a grid (especially Services/Projects/Products sections), consistent padding/radius/borders, responsive column counts per breakpoint.
- **Social icons**: current official branding — use the X logo, not the Twitter bird. lucide-react is already installed; prefer it or official brand icon libs. Keep icons sized/aligned consistently.
- **Responsive**: every page must work on mobile, tablet, desktop with no horizontal overflow; use Tailwind breakpoints and check typography/spacing/grids/nav at different widths.
- **Themes**: both light and dark must look right. Use shadcn semantic tokens only (`bg-background`, `text-foreground`, `bg-card`, `text-card-foreground`, `bg-primary`, `text-primary-foreground`, `bg-muted`, `text-muted-foreground`, `border-border`) — no hardcoded light/dark colors. Tokens + `.dark` values live in `src/app/globals.css`. Brand palette (per reference images): dark-green `--primary` + mint `--secondary`/`--accent`. The one allowed exception: `text-white` over photo overlays (hero), since the image is identical in both themes.
- **shadcn/ui**: primary component system. Components here are Base UI-based (`@base-ui/react`, style `base-vega`) — check before using an API. Do NOT use Radix-era `asChild`; Base UI uses the `render` prop. When a Button/Link-style component renders something non-`<button>` via `render` (e.g. `render={<Link …/>}` or `<a/>`), you MUST pass `nativeButton={false}`, or Base UI throws a console error at runtime. Follow current shadcn docs, App Router + modern React patterns.
- **Minimalism**: no over-engineering — avoid unnecessary abstractions, custom hooks, wrappers, extra dependencies, or rewrites of working components. Reuse before duplicating. UI changes must not alter existing functionality/business logic.
- **Before/after**: before touching a page, inspect the homepage, navbar, `globals.css`, theme setup, and `src/components/`. After, check TypeScript errors, hydration, invalid HTML nesting, and responsive layout issues.

## Meta

- `README.md` is unmodified create-next-app boilerplate — e.g. it says to edit `app/page.tsx`, which is actually `src/app/page.tsx`. Don't trust it for paths.
- The block below is regenerated by `next dev`; keep its markers intact.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
