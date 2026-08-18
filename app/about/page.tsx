import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTASection } from "@/components/home/cta-section"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Users, Globe, Briefcase, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logos } from "@/lib/site-data"

export const metadata = {
  title: "About Us | Universal Solutions Consultancy",
  description: "Learn about Universal Solutions Consultancy - a global advisory firm specializing in trade finance, commodities, and capital raising solutions.",
}

const stats = [
  { icon: Globe, value: "4+", label: "Global Offices" },
  { icon: Users, value: "50+", label: "Expert Team" },
  { icon: Briefcase, value: "200+", label: "Projects Delivered" },
  { icon: Award, value: "15+", label: "Years Experience" },
]

const values = [
  {
    title: "Integrity",
    description: "We operate with the highest ethical standards, ensuring transparency and trust in every transaction.",
  },
  {
    title: "Excellence",
    description: "We strive for excellence in everything we do, delivering exceptional results for our clients.",
  },
  {
    title: "Innovation",
    description: "We embrace innovative solutions to solve complex challenges in global trade and finance.",
  },
  {
    title: "Partnership",
    description: "We build lasting partnerships based on mutual respect, collaboration, and shared success.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-secondary-foreground mt-2 leading-tight">
              Global Expertise, <span className="text-primary">Limitless</span> Solutions
            </h1>
            <p className="text-secondary-foreground/70 mt-4 text-lg">
              Universal Solutions Consultancy is a global advisory firm specializing in trade finance, 
              commodities, and capital raising solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/h1-portfolio-03-welcome%20block-MLlNl0QKCH3Y7aoD6jagTF833kQpF1.jpg"
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl">
                <div className="text-3xl font-serif font-bold">15+</div>
                <div className="text-sm font-medium">Years of Excellence</div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded with a vision to bridge markets and facilitate complex international transactions, 
                Universal Solutions Consultancy has grown into a trusted global advisory firm with 
                offices across four continents.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team brings together decades of combined experience in banking, trade, commodity 
                markets, and international finance. We don&apos;t just connect buyers and sellers — we 
                structure deals, verify counterparties, and ensure compliance at every step.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As a proud partner of the BRICS network, we leverage our extensive relationships to 
                open doors and create opportunities for our clients in emerging and established markets alike.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <Image
                  src={logos.brics}
                  alt="BRICS Partner"
                  width={100}
                  height={50}
                  className="h-12 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-10 w-10 text-primary-foreground/70 mx-auto mb-3" />
                <div className="text-4xl font-serif font-bold text-primary-foreground">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="p-6 bg-card rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Our Approach
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We take a hands-on, relationship-driven approach to every engagement. Our team 
                works closely with clients to understand their unique needs and develop tailored 
                solutions that deliver measurable results.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Deep industry expertise and market knowledge",
                  "Extensive network of verified counterparties",
                  "Comprehensive due diligence and compliance",
                  "End-to-end transaction support",
                  "Transparent communication throughout",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/services">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Our Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about/team">
                  <Button variant="outline">
                    Meet Our Team
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/h1-portfolio-01-welcome%20block-6ILPOyGgnZE5E7lfhkoFHHgRdqWxOa.jpg"
                  alt="Our Approach"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
