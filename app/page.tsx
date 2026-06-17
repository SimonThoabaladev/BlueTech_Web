import Link from "next/link"
import { getAllProducts } from "@/app/actions/products"
import { getPublishedArticles } from "@/app/actions/articles"
import { ProductCard } from "@/components/product-card"
import { ArticleCard } from "@/components/article-card"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [products, articles] = await Promise.all([
    getAllProducts(),
    getPublishedArticles(),
  ])
  const featuredProducts = products.slice(0, 8)
  const featuredArticles = articles.slice(0, 3)

  return (
    <main>
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:py-24">
          <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Sales platform + writing hub
          </span>
          <h1 className="max-w-2xl text-pretty text-4xl font-bold tracking-tight sm:text-5xl">
            Shop the latest tech and read sharp, useful articles.
          </h1>
          <p className="max-w-xl text-pretty text-lg text-muted-foreground">
            BlueTech brings together a curated product store and an in-house
            writing platform — everything in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Browse the shop
            </Link>
            <Link
              href="/articles"
              className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Read articles
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Featured products</h2>
          <Link href="/shop" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        {featuredProducts.length === 0 ? (
          <EmptyState message="No products yet. Add some from your dashboard." />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Latest articles</h2>
          <Link href="/articles" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        {featuredArticles.length === 0 ? (
          <EmptyState message="No articles published yet. Write your first one." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
      {message}
    </div>
  )
}
