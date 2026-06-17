import { notFound } from "next/navigation"
import { getMyArticle, updateArticle } from "@/app/actions/articles"
import { ArticleForm } from "@/components/article-form"

export const dynamic = "force-dynamic"

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const articleId = Number(id)
  const article = await getMyArticle(articleId)
  if (!article) notFound()

  async function action(formData: FormData) {
    "use server"
    await updateArticle(articleId, formData)
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold">Edit article</h2>
      <ArticleForm action={action} initial={article} submitLabel="Save changes" />
    </div>
  )
}
