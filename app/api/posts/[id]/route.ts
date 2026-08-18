import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Get post error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, slug, excerpt, content, featured_image, category, tags, published } = body

    // Get the existing post to check published status
    const { data: existingPost } = await supabase
      .from("blog_posts")
      .select("published, published_at")
      .eq("id", id)
      .single()

    const updateData: any = {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      featured_image: featured_image || null,
      category: category || null,
      tags: tags || [],
      published: published || false,
    }

    // Set published_at only when first publishing
    if (published && !existingPost?.published_at) {
      updateData.published_at = new Date().toISOString()
    }

    const { data: post, error } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating post:", error)
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        )
      }
      return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Update post error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting post:", error)
      return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete post error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
