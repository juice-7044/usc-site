"use client"

export function MarqueeSection() {
  return (
    <section className="py-8 bg-secondary overflow-hidden">
      <div className="relative flex">
        <div className="flex items-center whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-secondary-foreground/10 mx-8">
              There Is / <span className="text-primary/30">No Limit</span>
            </span>
          ))}
        </div>
        <div className="absolute top-0 flex items-center whitespace-nowrap animate-[marquee2_30s_linear_infinite]">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-secondary-foreground/10 mx-8">
              There Is / <span className="text-primary/30">No Limit</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
