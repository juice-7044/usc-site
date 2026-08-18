import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Users, Globe, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { icon: Globe, value: "4+", label: "Global Offices" },
  { icon: Users, value: "50+", label: "Expert Team" },
  { icon: Briefcase, value: "200+", label: "Projects Delivered" },
  { icon: Award, value: "15+", label: "Years Experience" },
]

export function AboutSection() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/h1-portfolio-03-welcome%20block-MLlNl0QKCH3Y7aoD6jagTF833kQpF1.jpg"
                alt="Global Trade Operations"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -right-4 lg:-right-8 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl">
              <div className="text-4xl font-serif font-bold">15+</div>
              <div className="text-sm font-medium">Years of Excellence</div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/30 rounded-lg -z-10" />
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <div>
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-2 leading-tight text-balance">
                Global Expertise, <span className="text-primary">Limitless</span> Solutions
              </h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-lg">
              Universal Solutions Consultancy is a global advisory firm specializing in trade finance, 
              commodities, and capital raising solutions. With offices across South Africa, USA, UAE, 
              and Maldives, we bridge markets and facilitate complex international transactions with 
              precision and discretion.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Our team of experts brings decades of combined experience in banking, trade, and 
              commodity markets. We don&apos;t just connect buyers and sellers — we structure deals, 
              verify counterparties, and ensure compliance at every step.
            </p>

            <div className="grid grid-cols-2 gap-4 py-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-serif font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/about">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/about/company-profile">
                <Button size="lg" variant="outline" className="border-foreground/20 hover:bg-foreground/5">
                  Company Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
