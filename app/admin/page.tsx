import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch dashboard stats
  const [postsResult, contactsResult, subscribersResult] = await Promise.all([
    supabase.from("blog_posts").select("id", { count: "exact" }),
    supabase.from("contact_submissions").select("id", { count: "exact" }).eq("read", false),
    supabase.from("newsletter_subscriptions").select("id", { count: "exact" }),
  ])

  const stats = {
    totalPosts: postsResult.count || 0,
    unreadContacts: contactsResult.count || 0,
    totalSubscribers: subscribersResult.count || 0,
  }

  return <AdminDashboard user={user} stats={stats} />
}
