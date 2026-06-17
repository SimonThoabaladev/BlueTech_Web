import Link from "next/link"
import { getMyProducts } from "@/app/actions/products"
import { formatPrice } from "@/lib/utils"
import { DeleteProductButton } from "@/components/delete-buttons"

export const dynamic = "force-dynamic"

export default async function DashboardProducts() {
  const products = await getMyProducts()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your products</h2>
        <Link
          href="/dashboard/products/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          New product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          You haven&apos;t added any products yet.
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-3"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image || "/placeholder.svg"} alt={p.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatPrice(p.price)} · {p.stock} in stock
                  {p.category ? ` · ${p.category}` : ""}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/shop/${p.id}`}
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                >
                  View
                </Link>
                <Link
                  href={`/dashboard/products/${p.id}`}
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                >
                  Edit
                </Link>
                <DeleteProductButton id={p.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
