import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { teamMembers } from "@/lib/site-data"

export function TeamSection() {
  // Show first 4 team members on homepage
  const displayedMembers = teamMembers.slice(0, 4)

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-2 text-balance">
            Meet Our Leadership
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Industry experts with decades of combined experience in global trade and finance
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedMembers.map((member) => (
            <div
              key={member.name}
              className="group text-center"
            >
              {/* Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <h3 className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium mt-1">
                {member.role}
              </p>
              <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/about/team">
            <Button size="lg" variant="outline" className="border-foreground/20 hover:bg-foreground/5">
              View Full Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
