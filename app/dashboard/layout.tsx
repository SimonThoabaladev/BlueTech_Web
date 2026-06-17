import { redirect } from "next/navigation"
import Link from "next/link"
import { getSession } from "@/lib/session"
import { DashboardNav } from "@/components/dashboard-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session?.user) redirect("/sign-in")

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Signed in as {session.user.name} ({session.user.email})
        </p>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <aside className="md:w-52 md:shrink-0">
          <DashboardNav />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <p className="mt-8 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          ← Back to site
        </Link>
      </p>
    </div>
  )
}
