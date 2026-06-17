"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

type ArticleValues = {
  title?: string
  excerpt?: string | null
  content?: string
  coverImage?: string | null
  published?: boolean
}

export function ArticleForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>
  initial?: ArticleValues
  submitLabel: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      try {
        await action(formData)
        router.push("/dashboard/articles")
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field label="Title" htmlFor="title">
        <input
          id="title"
          name="title"
          className="form-input"
          defaultValue={initial?.title ?? ""}
          required
        />
      </Field>

      <Field label="Cover image URL" htmlFor="coverImage" optional>
        <input
          id="coverImage"
          name="coverImage"
          className="form-input"
          placeholder="https://..."
          defaultValue={initial?.coverImage ?? ""}
        />
      </Field>

      <Field label="Excerpt" htmlFor="excerpt" optional>
        <textarea
          id="excerpt"
          name="excerpt"
          className="form-input min-h-20"
          placeholder="Short summary shown in cards"
          defaultValue={initial?.excerpt ?? ""}
        />
      </Field>

      <Field label="Content" htmlFor="content">
        <textarea
          id="content"
          name="content"
          className="form-input min-h-72 font-mono text-sm"
          defaultValue={initial?.content ?? ""}
          required
        />
      </Field>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initial?.published ?? false}
          className="h-4 w-4 rounded border-border"
        />
        Publish (visible to everyone)
      </label>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string
  htmlFor: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {optional && <span className="ml-1 text-muted-foreground">(optional)</span>}
      </label>
      {children}
    </div>
  )
}
