import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { PostActions } from "@/components/admin/post-actions"
import { Button } from "@/components/ui/button"
import { PenSquare } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default async function AdminPostsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-muted">
      <AdminSidebar user={user} />

      <div className="lg:ml-64">
        <header className="bg-card shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-serif font-bold text-foreground">Blog Posts</h1>
            <Link href="/admin/posts/new">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <PenSquare className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </Link>
          </div>
        </header>

        <main className="p-6">
          <div className="bg-card rounded-xl shadow-sm overflow-hidden">
            {!posts || posts.length === 0 ? (
              <div className="text-center py-16">
                <PenSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-4">Create your first blog post to get started.</p>
                <Link href="/admin/posts/new">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Create Post
                  </Button>
                </Link>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-foreground">{post.title}</div>
                        <div className="text-sm text-muted-foreground">/insights/{post.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.published 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {post.category || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      </td>
                      <td className="px-6 py-4">
                        <PostActions
                          postId={post.id}
                          postSlug={post.slug}
                          postTitle={post.title}
                          isPublished={post.published}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
