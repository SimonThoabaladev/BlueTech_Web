"use server"

import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { getUserId } from "@/lib/session"
import { and, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function getAllProducts() {
  return db.select().from(products).orderBy(desc(products.createdAt))
}

export async function getProduct(id: number) {
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1)
  return rows[0] ?? null
}

export async function getMyProducts() {
  const userId = await getUserId()
  return db
    .select()
    .from(products)
    .where(eq(products.userId, userId))
    .orderBy(desc(products.createdAt))
}

function parseForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()
  const priceRaw = String(formData.get("price") ?? "0").trim()
  const image = String(formData.get("image") ?? "").trim()
  const category = String(formData.get("category") ?? "").trim()
  const stockRaw = String(formData.get("stock") ?? "0").trim()

  if (!name) throw new Error("Product name is required")
  const price = Number.parseFloat(priceRaw)
  const stock = Number.parseInt(stockRaw, 10)

  return {
    name,
    description: description || null,
    price: Number.isFinite(price) ? price.toFixed(2) : "0",
    image: image || null,
    category: category || null,
    stock: Number.isFinite(stock) ? stock : 0,
  }
}

export async function createProduct(formData: FormData) {
  const userId = await getUserId()
  const data = parseForm(formData)
  await db.insert(products).values({ userId, ...data })
  revalidatePath("/shop")
  revalidatePath("/dashboard/products")
}

export async function updateProduct(id: number, formData: FormData) {
  const userId = await getUserId()
  const data = parseForm(formData)
  await db
    .update(products)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(products.id, id), eq(products.userId, userId)))
  revalidatePath("/shop")
  revalidatePath("/dashboard/products")
}

export async function deleteProduct(id: number) {
  const userId = await getUserId()
  await db.delete(products).where(and(eq(products.id, id), eq(products.userId, userId)))
  revalidatePath("/shop")
  revalidatePath("/dashboard/products")
}
