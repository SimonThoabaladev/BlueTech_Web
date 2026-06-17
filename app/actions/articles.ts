"use server"

import { db } from "@/lib/db"
import { articles } from "@/lib/db/schema"
import { getSession, getUserId } from "@/lib/session"
import { slugify } from "@/lib/utils"
import { and, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function getPublishedArticles() {
  return db
    .select()
    .from(articles)
    .where(eq(articles.published, true))
    .orderBy(desc(articles.createdAt))
}

export async function getArticleBySlug(slug: string) {
  const rows = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1)
  return rows[0] ?? null
}

export async function getMyArticles() {
  const userId = await getUserId()
  return db
    .select()
    .from(articles)
    .where(eq(articles.userId, userId))
    .orderBy(desc(articles.updatedAt))
}

export async function getMyArticle(id: number) {
  const userId = await getUserId()
  const rows = await db
    .select()
    .from(articles)
    .where(and(eq(articles.id, id), eq(articles.userId, userId)))
    .limit(1)
  return rows[0] ?? null
}

async function uniqueSlug(base: string, ignoreId?: number) {
  let slug = slugify(base) || "article"
  let suffix = 1
  // ensure uniqueness
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const rows = await db.select({ id: articles.id }).from(articles).where(eq(articles.slug, slug))
    const clash = rows.find((r) => r.id !== ignoreId)
    if (!clash) return slug
    suffix += 1
    slug = `${slugify(base)}-${suffix}`
  }
}

export async function createArticle(formData: FormData) {
  const session = await getSession()
  if (!session?.user) throw new Error("Unauthorized")

  const title = String(formData.get("title") ?? "").trim()
  const content = String(formData.get("content") ?? "").trim()
  const excerpt = String(formData.get("excerpt") ?? "").trim()
  const coverImage = String(formData.get("coverImage") ?? "").trim()
  const published = formData.get("published") === "on"

  if (!title || !content) throw new Error("Title and content are required")

  const slug = await uniqueSlug(title)

  await db.insert(articles).values({
    userId: session.user.id,
    authorName: session.user.name,
    title,
    slug,
    excerpt: excerpt || content.slice(0, 160),
    content,
    coverImage: coverImage || null,
    published,
  })

  revalidatePath("/articles")
  revalidatePath("/dashboard/articles")
}

export async function updateArticle(id: number, formData: FormData) {
  const userId = await getUserId()

  const title = String(formData.get("title") ?? "").trim()
  const content = String(formData.get("content") ?? "").trim()
  const excerpt = String(formData.get("excerpt") ?? "").trim()
  const coverImage = String(formData.get("coverImage") ?? "").trim()
  const published = formData.get("published") === "on"

  if (!title || !content) throw new Error("Title and content are required")

  await db
    .update(articles)
    .set({
      title,
      content,
      excerpt: excerpt || content.slice(0, 160),
      coverImage: coverImage || null,
      published,
      updatedAt: new Date(),
    })
    .where(and(eq(articles.id, id), eq(articles.userId, userId)))

  revalidatePath("/articles")
  revalidatePath("/dashboard/articles")
}

export async function deleteArticle(id: number) {
  const userId = await getUserId()
  await db.delete(articles).where(and(eq(articles.id, id), eq(articles.userId, userId)))
  revalidatePath("/articles")
  revalidatePath("/dashboard/articles")
}
