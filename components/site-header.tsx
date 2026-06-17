import { cookies } from "next/headers"
import Link from "next/link"
import { getSession } from "@/lib/session"
import { HeaderNav } from "./header-nav"

export async function SiteHeader() {
  const session = await getSession()
  void cookies()
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
            BT
          </span>
          <span className="text-lg font-semibold tracking-tight">BlueTech</span>
        </Link>
        <HeaderNav isAuthed={!!session?.user} userName={session?.user?.name ?? null} />
      </div>
    </header>
  )
}
