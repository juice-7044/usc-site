import Image from "next/image"
import { MapPin, Phone } from "lucide-react"
import { officeLocations, worldMapImage } from "@/lib/site-data"

export function LocationsSection() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Global Presence
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-2 text-balance">
            Our Office Locations
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Strategically positioned across four continents to serve our global clients
          </p>
        </div>

        {/* World Map */}
        <div className="relative mb-16">
          <div className="relative aspect-[2/1] max-w-4xl mx-auto">
            <Image
              src={worldMapImage}
              alt="Global Office Locations"
              fill
              className="object-contain opacity-85"
            />
            {/* Location Dots */}
            {/* South Africa - Cape Town (southern tip of Africa) */}
            <div className="absolute" style={{ top: '78%', left: '52%' }}>
              <div className="relative">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-red-600 rounded-full animate-ping opacity-75" />
              </div>
            </div>
            {/* USA - New York (US East Coast) */}
            <div className="absolute" style={{ top: '38%', left: '25%' }}>
              <div className="relative">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-red-600 rounded-full animate-ping opacity-75" />
              </div>
            </div>
            {/* Maldives (Indian Ocean, south of India) */}
            <div className="absolute" style={{ top: '55%', left: '70%' }}>
              <div className="relative">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-red-600 rounded-full animate-ping opacity-75" />
              </div>
            </div>
            {/* UAE - Dubai (Arabian Peninsula) */}
            <div className="absolute" style={{ top: '45%', left: '60%' }}>
              <div className="relative">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-red-600 rounded-full animate-ping opacity-75" />
              </div>
            </div>
            {/* Zimbabwe - Harare */}
            <div className="absolute" style={{ top: '68%', left: '55%' }}>
              <div className="relative">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-red-600 rounded-full animate-ping opacity-75" />
              </div>
            </div>
            {/* Congo - Kinshasa */}
            <div className="absolute" style={{ top: '58%', left: '50%' }}>
              <div className="relative">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-red-600 rounded-full animate-ping opacity-75" />
              </div>
            </div>
            {/* Kenya - Nairobi */}
            <div className="absolute" style={{ top: '55%', left: '56%' }}>
              <div className="relative">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-red-600 rounded-full animate-ping opacity-75" />
              </div>
            </div>
            {/* India - Delhi */}
            <div className="absolute" style={{ top: '42%', left: '70%' }}>
              <div className="relative">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-red-600 rounded-full animate-ping opacity-75" />
              </div>
            </div>
          </div>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {officeLocations.map((location) => (
            <div
              key={location.city}
              className="group relative bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="aspect-[4/3] relative">
                <Image
                  src={location.image}
                  alt={`${location.city} Office`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent" />
                
                {/* City Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-serif font-bold text-secondary-foreground">
                    {location.city}
                  </h3>
                  <p className="text-secondary-foreground/70 text-sm">
                    {location.country}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 bg-card">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{location.address}</span>
                  </div>
                  {location.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                      <a 
                        href={`tel:${location.phone.replace(/\s/g, '')}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {location.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
