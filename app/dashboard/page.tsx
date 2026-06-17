import Link from "next/link"
import { getMyArticles } from "@/app/actions/articles"
import { getMyProducts } from "@/app/actions/products"

export const dynamic = "force-dynamic"

export default async function DashboardOverview() {
  const [articles, products] = await Promise.all([getMyArticles(), getMyProducts()])
  const published = articles.filter((a) => a.published).length

  const stats = [
    { label: "Articles", value: articles.length, href: "/dashboard/articles" },
    { label: "Published", value: published, href: "/dashboard/articles" },
    { label: "Products", value: products.length, href: "/dashboard/products" },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm"
          >
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ActionCard
          title="Write an article"
          description="Create and publish a new article to the writing platform."
          href="/dashboard/articles/new"
          cta="New article"
        />
        <ActionCard
          title="Add a product"
          description="List a new product with a photo, price, and stock."
          href="/dashboard/products/new"
          cta="New product"
        />
      </div>
    </div>
  )
}

function ActionCard({
  title,
  description,
  href,
  cta,
}: {
  title: string
  description: string
  href: string
  cta: string
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Link
        href={href}
        className="mt-auto w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        {cta}
      </Link>
    </div>
  )
}
