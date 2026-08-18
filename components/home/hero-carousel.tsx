"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { heroSlides, logos } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Carousel */}
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] min-w-0 h-full"
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={`${slide.title} ${slide.subtitle}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-secondary/70" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Rotating Hire Us Badge */}
                    <div className="hidden lg:flex lg:col-span-3 justify-center">
                      <div className="relative">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/h4-hero-rotate-Ir78zYoHC6wJeNPGcNdPqlykSO2HSv.png"
                          alt="Hire Us Today"
                          width={140}
                          height={140}
                          className="animate-spin-slow"
                        />
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="lg:col-span-9">
                      <div
                        className={cn(
                          "transition-all duration-700",
                          selectedIndex === index
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                        )}
                      >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-secondary-foreground mb-6 leading-tight">
                          {slide.title}
                          <br />
                          {slide.subtitle}{" "}
                          <Link
                            href={slide.link}
                            className="text-primary hover:underline decoration-2 underline-offset-8"
                          >
                            {slide.highlight}
                          </Link>
                        </h1>
                        <Link href="/services">
                          <Button
                            size="lg"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 group mt-4"
                          >
                            Our Services
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              selectedIndex === index
                ? "bg-primary w-8"
                : "bg-secondary-foreground/30 hover:bg-secondary-foreground/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2">
        <span className="text-secondary-foreground/50 text-sm tracking-wider rotate-90 origin-center translate-y-8">
          SCROLL
        </span>
        <div className="w-px h-16 bg-secondary-foreground/20 relative overflow-hidden">
          <div className="absolute top-0 w-full h-1/2 bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  )
}
