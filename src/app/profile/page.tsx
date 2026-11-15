import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UpdateProfileDialog } from "@/components/profile/update-profile-dialog";

export const metadata = {
  title: "Profile · Social Circle",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) redirect("/login");

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center text-card-foreground">
        <Avatar className="mx-auto size-20 text-2xl">
          <AvatarImage src={user.image || ""} alt={user.name || "User"} />
          <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          {user.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>

        <UpdateProfileDialog name={user.name ?? ""} image={user.image ?? ""} />
      </div>
    </section>
  );
}
