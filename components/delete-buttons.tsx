"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteArticle } from "@/app/actions/articles"
import { deleteProduct } from "@/app/actions/products"

export function DeleteArticleButton({ id }: { id: number }) {
  return <DeleteButton onDelete={() => deleteArticle(id)} label="article" />
}

export function DeleteProductButton({ id }: { id: number }) {
  return <DeleteButton onDelete={() => deleteProduct(id)} label="product" />
}

function DeleteButton({
  onDelete,
  label,
}: {
  onDelete: () => Promise<void>
  label: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm(`Delete this ${label}? This cannot be undone.`)) return
    startTransition(async () => {
      await onDelete()
      router.refresh()
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-md border border-destructive/40 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60"
    >
      {isPending ? "..." : "Delete"}
    </button>
  )
}
