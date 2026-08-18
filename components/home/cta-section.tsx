import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-foreground text-balance">
              Ready to work with us?
            </h2>
            <p className="text-primary-foreground/80 mt-2">
              Let&apos;s discuss how we can help achieve your business objectives.
            </p>
          </div>
          <Link href="/contact">
            <Button 
              size="lg" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 group whitespace-nowrap"
            >
              Let&apos;s Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
