import Link from "next/link"
import { formatDate } from "@/lib/utils"

type Article = {
  id: number
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  authorName: string
  createdAt: Date | string
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {article.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.coverImage || "/placeholder.svg"}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm text-primary">
            BlueTech
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold leading-snug group-hover:text-primary">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
        )}
        <p className="mt-auto pt-2 text-xs text-muted-foreground">
          {article.authorName} · {formatDate(article.createdAt)}
        </p>
      </div>
    </Link>
  )
}
