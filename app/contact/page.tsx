import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { siteConfig, officeLocations } from "@/lib/site-data"
import Image from "next/image"

export const metadata = {
  title: "Contact Us | Universal Solutions Consultancy",
  description: "Get in touch with Universal Solutions Consultancy. Offices in South Africa, USA, UAE, and Maldives.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-secondary-foreground mt-2 leading-tight">
              Let&apos;s Start a <span className="text-primary">Conversation</span>
            </h1>
            <p className="text-secondary-foreground/70 mt-4 text-lg">
              Ready to explore how we can help your business? Reach out to our team and 
              let&apos;s discuss your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <a 
                        href={`mailto:${siteConfig.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  {siteConfig.phones.map((phone) => (
                    <div key={phone.country} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{phone.country}</h3>
                        <a 
                          href={`tel:${phone.number.replace(/\s/g, '')}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {phone.number}
                        </a>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Headquarters</h3>
                      <p className="text-muted-foreground">{siteConfig.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-muted-foreground text-sm">(Multiple time zones served)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground">
              Our Global Offices
            </h2>
            <p className="text-muted-foreground mt-2">
              Visit us at any of our worldwide locations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {officeLocations.map((location) => (
              <div
                key={location.city}
                className="bg-card rounded-lg overflow-hidden shadow-md"
              >
                <div className="aspect-video relative">
                  <Image
                    src={location.image}
                    alt={`${location.city} Office`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-bold text-foreground">
                    {location.city}
                  </h3>
                  <p className="text-muted-foreground text-sm">{location.country}</p>
                  <p className="text-muted-foreground text-sm mt-2">{location.address}</p>
                  {location.phone && (
                    <a 
                      href={`tel:${location.phone.replace(/\s/g, '')}`}
                      className="text-primary text-sm hover:underline mt-1 block"
                    >
                      {location.phone}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
