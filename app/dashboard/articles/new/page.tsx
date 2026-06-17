import { createArticle } from "@/app/actions/articles"
import { ArticleForm } from "@/components/article-form"

export default function NewArticlePage() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold">New article</h2>
      <ArticleForm action={createArticle} submitLabel="Create article" />
    </div>
  )
}
