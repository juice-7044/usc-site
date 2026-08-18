"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { testimonials } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

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
    <section className="py-20 lg:py-32 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-2 text-balance">
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 px-4"
                >
                  <div className="bg-card rounded-xl p-8 md:p-12 shadow-lg">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Author Image */}
                      <div className="flex-shrink-0">
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden mx-auto md:mx-0">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-center md:text-left mt-4">
                          <h4 className="font-serif font-bold text-foreground">
                            {testimonial.name}
                          </h4>
                          <p className="text-primary text-sm font-medium">
                            {testimonial.role}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="flex-1">
                        <Quote className="h-10 w-10 text-primary/30 mb-4" />
                        <blockquote className="text-lg md:text-xl text-foreground leading-relaxed italic">
                          {testimonial.quote}
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full border-foreground/20"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    selectedIndex === index
                      ? "bg-primary w-6"
                      : "bg-foreground/20"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full border-foreground/20"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
