import Link from "next/link"
import { getMyArticles } from "@/app/actions/articles"
import { formatDate } from "@/lib/utils"
import { DeleteArticleButton } from "@/components/delete-buttons"

export const dynamic = "force-dynamic"

export default async function DashboardArticles() {
  const articles = await getMyArticles()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your articles</h2>
        <Link
          href="/dashboard/articles/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          New article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          You haven&apos;t written any articles yet.
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {articles.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium">{a.title}</p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      a.published
                        ? "bg-success/15 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {a.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Updated {formatDate(a.updatedAt)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {a.published && (
                  <Link
                    href={`/articles/${a.slug}`}
                    className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                  >
                    View
                  </Link>
                )}
                <Link
                  href={`/dashboard/articles/${a.id}`}
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                >
                  Edit
                </Link>
                <DeleteArticleButton id={a.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
