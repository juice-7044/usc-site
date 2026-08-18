"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { PostEditor } from "@/components/admin/post-editor"
import { Spinner } from "@/components/ui/spinner"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image: string | null
  category: string | null
  tags: string[]
  published: boolean
}

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push("/admin/login")
        return
      }
      
      setUser(user)

      // Fetch the post
      const { data: postData, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", params.id)
        .single()

      if (error || !postData) {
        router.push("/admin/posts")
        return
      }

      setPost(postData)
      setLoading(false)
    }

    checkAuth()
  }, [params.id, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  if (!user || !post) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-8">Edit Post</h1>
          <PostEditor post={post} />
        </div>
      </main>
    </div>
  )
}
