import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featured_image: string | null
  category: string | null
  author_name: string | null
  published_at: string | null
  created_at: string
}

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-serif font-bold text-foreground mb-2">
            No Posts Yet
          </h3>
          <p className="text-muted-foreground">
            Check back soon for the latest insights and updates from our team.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/insights/${post.slug}`}
          className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
        >
          {/* Image */}
          <div className="aspect-video relative overflow-hidden">
            {post.featured_image ? (
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
            {post.category && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded">
                  {post.category}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              {post.published_at && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                  </span>
                </div>
              )}
              {post.author_name && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author_name}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                {post.excerpt}
              </p>
            )}

            {/* Read More */}
            <div className="flex items-center gap-2 mt-4 text-primary font-semibold text-sm">
              Read More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
