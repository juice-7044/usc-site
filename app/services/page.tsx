import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTASection } from "@/components/home/cta-section"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { services } from "@/lib/site-data"

export const metadata = {
  title: "Our Services | Universal Solutions Consultancy",
  description: "Comprehensive solutions for international trade, finance, and commodity markets. Trade finance, commodities, oil & gas, and capital raising.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-secondary-foreground mt-2 leading-tight">
              Comprehensive <span className="text-primary">Solutions</span>
            </h1>
            <p className="text-secondary-foreground/70 mt-4 text-lg">
              End-to-end services for international trade, finance, and commodity markets. 
              We bridge markets and facilitate complex transactions with precision and discretion.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.slug}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {service.description}
                  </p>

                  {/* Sub-services */}
                  <div className="grid grid-cols-2 gap-3">
                    {service.subServices.map((sub) => (
                      <div
                        key={sub}
                        className="flex items-center gap-2 text-foreground"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">{sub}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
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
