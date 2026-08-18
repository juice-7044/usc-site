import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Check if user is on login page
  const isLoginPage = false // This will be handled by individual pages

  if (!user && !isLoginPage) {
    // We'll handle this in the middleware
  }

  return <>{children}</>
}
