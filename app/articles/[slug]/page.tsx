import Link from "next/link"
import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/app/actions/articles"
import { formatDate } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article || !article.published) notFound()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/articles" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to articles
      </Link>

      <article className="mt-6">
        <header className="mb-8">
          <h1 className="text-balance text-4xl font-bold tracking-tight">{article.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            By {article.authorName} · {formatDate(article.createdAt)}
          </p>
        </header>

        {article.coverImage && (
          <div className="mb-8 overflow-hidden rounded-xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage || "/placeholder.svg"}
              alt={article.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <div className="article-content text-[15px] text-foreground/90">
          {article.content.split("\n").map((para, i) =>
            para.trim() ? <p key={i}>{para}</p> : null,
          )}
        </div>
      </article>
    </main>
  )
}
