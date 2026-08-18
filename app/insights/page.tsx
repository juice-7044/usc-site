import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BlogGrid } from "@/components/blog/blog-grid"
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: "Insights | Universal Solutions Consultancy",
  description: "Latest insights, news, and updates from Universal Solutions Consultancy on trade finance, commodities, and global markets.",
}

async function getBlogPosts() {
  const supabase = await createClient()
  
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  return posts || []
}

export default async function InsightsPage() {
  const posts = await getBlogPosts()

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Insights
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-secondary-foreground mt-2 leading-tight">
              News & <span className="text-primary">Insights</span>
            </h1>
            <p className="text-secondary-foreground/70 mt-4 text-lg">
              Stay informed with the latest updates on global trade, commodities markets, 
              and industry developments.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <BlogGrid posts={posts} />
        </div>
      </section>

      <Footer />
    </main>
  )
}
