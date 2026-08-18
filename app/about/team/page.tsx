import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTASection } from "@/components/home/cta-section"
import Image from "next/image"
import { teamMembers } from "@/lib/site-data"

export const metadata = {
  title: "Our Team | Universal Solutions Consultancy",
  description: "Meet the leadership team at Universal Solutions Consultancy - industry experts with decades of experience in global trade and finance.",
}

export default function TeamPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Our Team
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-secondary-foreground mt-2 leading-tight">
              Meet Our <span className="text-primary">Leadership</span>
            </h1>
            <p className="text-secondary-foreground/70 mt-4 text-lg">
              Industry experts with decades of combined experience in global trade, finance, 
              and commodity markets.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mt-1">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
