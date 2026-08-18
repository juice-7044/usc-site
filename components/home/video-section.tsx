"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-data"

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="relative py-32 lg:py-48">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/business-team-global-business-planning-working-con-2025-02-09-22-57-34-utc-FYzKRIqSK6kL4tEEMe3QjiW8fKGqbw.jpg"
          alt="In the Media"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-secondary/80" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <span className="text-primary font-semibold tracking-wider uppercase text-sm">
          Our Business
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-secondary-foreground mt-2 mb-12 text-balance">
          In the Media
        </h2>

        {/* Play Button */}
        <button
          onClick={() => setIsPlaying(true)}
          className="group relative mx-auto flex items-center justify-center"
        >
          <span className="absolute w-32 h-32 rounded-full bg-primary/20 animate-ping" />
          <span className="absolute w-28 h-28 rounded-full bg-primary/30" />
          <span className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="h-8 w-8 text-primary-foreground ml-1" />
          </span>
        </button>

        <p className="text-secondary-foreground/70 mt-8 text-lg">
          Watch our introduction video to learn more about Universal Solutions Consultancy
        </p>
      </div>

      {/* Video Modal */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/10"
              onClick={() => setIsPlaying(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close video</span>
            </Button>
            <iframe
              src={`https://www.youtube.com/embed/${siteConfig.youtubeVideoId}?autoplay=1`}
              title="USC Introduction Video"
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}
