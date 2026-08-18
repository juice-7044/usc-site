import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { AboutSection } from "@/components/home/about-section"
import { ServicesSection } from "@/components/home/services-section"
import { TeamSection } from "@/components/home/team-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { VideoSection } from "@/components/home/video-section"
import { LocationsSection } from "@/components/home/locations-section"
import { MarqueeSection } from "@/components/home/marquee-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroCarousel />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <TestimonialsSection />
      <VideoSection />
      <MarqueeSection />
      <LocationsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
