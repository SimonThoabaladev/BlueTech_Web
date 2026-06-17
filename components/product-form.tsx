"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

type ProductValues = {
  name?: string
  description?: string | null
  price?: string
  image?: string | null
  category?: string | null
  stock?: number
}

export function ProductForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>
  initial?: ProductValues
  submitLabel: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState(initial?.image ?? "")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      try {
        await action(formData)
        router.push("/dashboard/products")
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field label="Product name" htmlFor="name">
        <input
          id="name"
          name="name"
          className="form-input"
          defaultValue={initial?.name ?? ""}
          required
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Price (ZAR)" htmlFor="price">
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            className="form-input"
            defaultValue={initial?.price ?? ""}
            required
          />
        </Field>
        <Field label="Stock" htmlFor="stock">
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            className="form-input"
            defaultValue={initial?.stock ?? 0}
          />
        </Field>
      </div>

      <Field label="Category" htmlFor="category" optional>
        <input
          id="category"
          name="category"
          className="form-input"
          placeholder="e.g. Laptops, Audio, Accessories"
          defaultValue={initial?.category ?? ""}
        />
      </Field>

      <Field label="Image URL" htmlFor="image" optional>
        <input
          id="image"
          name="image"
          className="form-input"
          placeholder="https://..."
          defaultValue={initial?.image ?? ""}
          onChange={(e) => setPreview(e.target.value)}
        />
      </Field>

      {preview && (
        <div className="h-40 w-40 overflow-hidden rounded-lg border border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
        </div>
      )}

      <Field label="Description" htmlFor="description" optional>
        <textarea
          id="description"
          name="description"
          className="form-input min-h-32"
          defaultValue={initial?.description ?? ""}
        />
      </Field>

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
