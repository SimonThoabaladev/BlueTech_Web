import { createProduct } from "@/app/actions/products"
import { ProductForm } from "@/components/product-form"

export default function NewProductPage() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold">New product</h2>
      <ProductForm action={createProduct} submitLabel="Add product" />
    </div>
  )
}
