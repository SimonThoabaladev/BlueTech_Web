import { getPublishedArticles } from "@/app/actions/articles"
import { ArticleCard } from "@/components/article-card"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Articles — BlueTech",
  description: "Read the latest articles from the BlueTech team.",
}

export default async function ArticlesPage() {
  const articles = await getPublishedArticles()

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
        <p className="mt-1 text-muted-foreground">
          Insights, guides, and stories from BlueTech.
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center text-sm text-muted-foreground">
          No articles published yet. Sign in to write the first one.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </main>
  )
}
