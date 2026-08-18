"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  PenSquare,
  Eye,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { logos } from "@/lib/site-data"
import type { User } from "@supabase/supabase-js"

interface AdminDashboardProps {
  user: User
  stats: {
    totalPosts: number
    unreadContacts: number
    totalSubscribers: number
  }
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Blog Posts", href: "/admin/posts", icon: FileText },
  { name: "Contact Submissions", href: "/admin/contacts", icon: MessageSquare },
  { name: "Subscribers", href: "/admin/subscribers", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminDashboard({ user, stats }: AdminDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-secondary transform transition-transform duration-300
        lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <Image
                src={logos.main}
                alt="USC Admin"
                width={40}
                height={40}
              />
              <span className="font-serif font-bold text-secondary-foreground">Admin</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-secondary-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary-foreground/70 hover:bg-secondary-foreground/5 hover:text-secondary-foreground transition-colors"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
                {item.name === "Contact Submissions" && stats.unreadContacts > 0 && (
                  <span className="ml-auto px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                    {stats.unreadContacts}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-secondary-foreground/10">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-secondary-foreground/70 hover:text-secondary-foreground mt-2"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-card shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-serif font-bold text-foreground">Dashboard</h1>
            <div className="flex items-center gap-4">
              <Link href="/" target="_blank">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Site
                </Button>
              </Link>
              <Link href="/admin/posts/new">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <PenSquare className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalPosts}</p>
                  <p className="text-muted-foreground text-sm">Blog Posts</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.unreadContacts}</p>
                  <p className="text-muted-foreground text-sm">Unread Contacts</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalSubscribers}</p>
                  <p className="text-muted-foreground text-sm">Newsletter Subscribers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-serif font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/admin/posts/new">
                <Button variant="outline" className="w-full justify-start">
                  <PenSquare className="h-4 w-4 mr-2" />
                  Create Blog Post
                </Button>
              </Link>
              <Link href="/admin/contacts">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Contacts
                </Button>
              </Link>
              <Link href="/admin/subscribers">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  View Subscribers
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
