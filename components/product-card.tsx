import Link from "next/link"
import { formatPrice } from "@/lib/utils"

type Product = {
  id: number
  name: string
  description: string | null
  price: string
  image: string | null
  category: string | null
  stock: number
}

export function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.stock <= 0
  return (
    <Link
      href={`/shop/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
        {product.category && (
          <span className="absolute left-2 top-2 rounded-full bg-background/90 px-2 py-1 text-xs font-medium text-foreground">
            {product.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">{product.name}</h3>
        <p className="mt-auto pt-2 text-lg font-semibold text-foreground">
          {formatPrice(product.price)}
        </p>
        <p className={`text-xs ${outOfStock ? "text-destructive" : "text-success"}`}>
          {outOfStock ? "Out of stock" : `In stock (${product.stock})`}
        </p>
      </div>
    </Link>
  )
}
