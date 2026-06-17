import Link from "next/link"
import { notFound } from "next/navigation"
import { getProduct } from "@/app/actions/products"
import { formatPrice } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(Number(id))
  if (!product) notFound()

  const outOfStock = product.stock <= 0

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to shop
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border bg-muted">
          <div className="aspect-square">
            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                No image
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {product.category && (
            <span className="w-fit rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              {product.category}
            </span>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-balance">{product.name}</h1>
          <p className="text-3xl font-semibold">{formatPrice(product.price)}</p>
          <p className={`text-sm ${outOfStock ? "text-destructive" : "text-success"}`}>
            {outOfStock ? "Out of stock" : `In stock (${product.stock} available)`}
          </p>
          {product.description && (
            <p className="leading-relaxed text-muted-foreground">{product.description}</p>
          )}
          <button
            disabled={outOfStock}
            className="mt-2 w-full rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {outOfStock ? "Unavailable" : "Add to cart"}
          </button>
        </div>
      </div>
    </main>
  )
}
