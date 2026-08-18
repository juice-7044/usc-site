import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { services } from "@/lib/site-data"

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-secondary-foreground mt-2 text-balance">
            Our Core Services
          </h2>
          <p className="text-secondary-foreground/70 mt-4 max-w-2xl mx-auto text-lg">
            Comprehensive solutions for international trade, finance, and commodity markets
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative bg-secondary-foreground/5 rounded-lg overflow-hidden hover:bg-secondary-foreground/10 transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-secondary-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-secondary-foreground/70 mt-2 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                {/* Sub-services */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {service.subServices.slice(0, 3).map((sub) => (
                    <span
                      key={sub}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 mt-4 text-primary font-semibold text-sm">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/services">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
