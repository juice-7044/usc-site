import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} | Universal Solutions Consultancy`,
    description: post.excerpt || undefined,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error || !post) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-secondary" />
          )}
          <div className="absolute inset-0 bg-secondary/70" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                {post.category && (
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full mb-4">
                    {post.category}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center gap-6 text-white/80">
                  {post.author_name && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author_name}</span>
                    </div>
                  )}
                  {post.published_at && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(post.published_at), "MMMM d, yyyy")}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Link href="/insights">
                <Button variant="ghost" className="mb-8 -ml-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Insights
                </Button>
              </Link>

              {post.excerpt && (
                <p className="text-xl text-muted-foreground mb-8 font-medium leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              <div 
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
