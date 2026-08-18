"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Loader2, Upload, X, Save, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { RichTextEditor } from "./rich-text-editor"
import Link from "next/link"
import Image from "next/image"

interface PostFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string
  author_name: string
  published: boolean
}

interface PostEditorProps {
  initialData?: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: string
    category: string | null
    tags: string[] | null
    author_name: string | null
    featured_image: string | null
    published: boolean
  }
}

export function PostEditor({ initialData }: PostEditorProps) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [featuredImage, setFeaturedImage] = useState<string | null>(initialData?.featured_image || null)
  const [content, setContent] = useState(initialData?.content || "")
  const [error, setError] = useState("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      category: initialData?.category || "",
      tags: initialData?.tags?.join(", ") || "",
      author_name: initialData?.author_name || "",
      published: initialData?.published || false,
    },
  })

  const title = watch("title")
  const published = watch("published")

  // Auto-generate slug from title
  const generateSlug = useCallback(() => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    setValue("slug", slug)
  }, [title, setValue])

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const { url } = await response.json()
      setFeaturedImage(url)
    } catch {
      setError("Failed to upload image. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (data: PostFormData) => {
    setLoading(true)
    setError("")

    const supabase = createClient()

    const postData = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      content: content,
      category: data.category || null,
      tags: data.tags ? data.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
      author_name: data.author_name || null,
      featured_image: featuredImage,
      published: data.published,
      published_at: data.published ? new Date().toISOString() : null,
    }

    try {
      if (initialData?.id) {
        // Update existing post
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", initialData.id)

        if (error) throw error
      } else {
        // Create new post
        const { error } = await supabase
          .from("blog_posts")
          .insert(postData)

        if (error) throw error
      }

      router.push("/admin/posts")
      router.refresh()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to save post"
      setError(errorMessage)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/posts">
          <Button type="button" variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={published}
              onCheckedChange={(checked) => setValue("published", checked)}
            />
            <Label>{published ? "Published" : "Draft"}</Label>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Post
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl p-6 shadow-sm space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                {...register("title", { required: "Title is required" })}
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug">Slug *</Label>
                <Button type="button" variant="link" size="sm" onClick={generateSlug}>
                  Generate from title
                </Button>
              </div>
              <Input
                id="slug"
                placeholder="post-url-slug"
                {...register("slug", { required: "Slug is required" })}
                className={errors.slug ? "border-destructive" : ""}
              />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                placeholder="Brief summary of the post"
                rows={3}
                {...register("excerpt")}
              />
            </div>

            <div className="space-y-2">
              <Label>Content *</Label>
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Write your post content here..."
              />
              {!content && (
                <p className="text-sm text-destructive">Content is required</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
            <Label>Featured Image</Label>
            {featuredImage ? (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={featuredImage}
                  alt="Featured"
                  fill
                  className="object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => setFeaturedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {uploading ? (
                  <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload</span>
                  </>
                )}
              </label>
            )}
          </div>

          {/* Meta */}
          <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Trade Finance"
                {...register("category")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="tag1, tag2, tag3"
                {...register("tags")}
              />
              <p className="text-xs text-muted-foreground">Separate with commas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author_name">Author Name</Label>
              <Input
                id="author_name"
                placeholder="John Doe"
                {...register("author_name")}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
