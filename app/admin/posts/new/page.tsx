import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { PostEditor } from "@/components/admin/post-editor"

export default async function NewPostPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-muted">
      <AdminSidebar user={user} />

      <div className="lg:ml-64">
        <header className="bg-card shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-serif font-bold text-foreground">Create New Post</h1>
          </div>
        </header>

        <main className="p-6">
          <PostEditor />
        </main>
      </div>
    </div>
  )
}
