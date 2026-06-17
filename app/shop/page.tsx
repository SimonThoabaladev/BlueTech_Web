import { getAllProducts } from "@/app/actions/products"
import { ProductCard } from "@/components/product-card"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Shop — BlueTech",
  description: "Browse tech products from BlueTech.",
}

export default async function ShopPage() {
  const products = await getAllProducts()
  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean)),
  ) as string[]

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
        <p className="mt-1 text-muted-foreground">
          {products.length} {products.length === 1 ? "product" : "products"} available
        </p>
      </header>

      {categories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      )}

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center text-sm text-muted-foreground">
          No products yet. Sign in and add products from your dashboard.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  )
}
