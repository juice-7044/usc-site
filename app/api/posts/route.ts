import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching posts:", error)
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
    }

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Posts API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, slug, excerpt, content, featured_image, category, tags, published } = body

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 }
      )
    }

    const { data: post, error } = await supabase
      .from("blog_posts")
      .insert({
        title,
        slug,
        excerpt: excerpt || null,
        content,
        featured_image: featured_image || null,
        category: category || null,
        tags: tags || [],
        published: published || false,
        published_at: published ? new Date().toISOString() : null,
        user_id: user.id,
        author_name: user.email?.split("@")[0] || "Admin",
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating post:", error)
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        )
      }
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Create post error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
