import { notFound } from "next/navigation"
import { getProduct, updateProduct } from "@/app/actions/products"
import { ProductForm } from "@/components/product-form"
import { getUserId } from "@/lib/session"

export const dynamic = "force-dynamic"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const productId = Number(id)
  const userId = await getUserId()
  const product = await getProduct(productId)
  if (!product || product.userId !== userId) notFound()

  async function action(formData: FormData) {
    "use server"
    await updateProduct(productId, formData)
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold">Edit product</h2>
      <ProductForm action={action} initial={product} submitLabel="Save changes" />
    </div>
  )
}
