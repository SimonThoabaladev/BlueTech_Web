"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/articles", label: "Articles" },
]

export function HeaderNav({
  isAuthed,
  userName,
}: {
  isAuthed: boolean
  userName: string | null
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)
    await authClient.signOut()
    setSigningOut(false)
    router.push("/")
    router.refresh()
  }

  return (
    <nav className="flex items-center gap-1 sm:gap-2">
      {links.map((link) => {
        const active = pathname === link.href || pathname.startsWith(link.href + "/")
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {link.label}
          </Link>
        )
      })}
      {isAuthed ? (
        <>
          <Link
            href="/dashboard"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-60"
          >
            {signingOut ? "..." : "Sign out"}
          </button>
        </>
      ) : (
        <Link
          href="/sign-in"
          className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
        >
          Sign in
        </Link>
      )}
    </nav>
  )
}
