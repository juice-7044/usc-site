import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react"
import { logos, siteConfig, navigation, officeLocations } from "@/lib/site-data"

const socialLinks = [
  { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/">
              <Image
                src={logos.main}
                alt="Universal Solutions Consultancy"
                width={60}
                height={60}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-secondary-foreground/70 leading-relaxed">
              Global consultancy specializing in trade finance, commodities, and capital raising solutions.
            </p>
            <div className="flex items-center gap-3">
              <Image
                src={logos.brics}
                alt="BRICS Partner"
                width={80}
                height={40}
                className="h-10 w-auto opacity-80"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-primary">Links</h4>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a 
                  href="https://manipulative-agent-launch-flow.base44.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  Join Our Team
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-primary">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/trade-finance" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Trade Finance
                </Link>
              </li>
              <li>
                <Link href="/services/commodities" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Commodities
                </Link>
              </li>
              <li>
                <Link href="/services/oil-gas" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Oil & Gas
                </Link>
              </li>
              <li>
                <Link href="/services/produce" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Produce
                </Link>
              </li>
              <li>
                <Link href="/services/capital-raising" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Capital Raising
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-primary">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-secondary-foreground/70">{siteConfig.address}</span>
              </li>
              <li>
                <a 
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              {siteConfig.phones.map((phone) => (
                <li key={phone.country}>
                  <a 
                    href={`tel:${phone.number.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>
                      <span className="text-primary">{phone.country}:</span> {phone.number}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Office Locations */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <h4 className="font-serif font-bold text-center mb-6 text-primary">Our Global Offices</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {officeLocations.map((location) => (
              <div key={location.city} className="text-center">
                <span className="text-secondary-foreground font-medium">{location.city}</span>
                <span className="block text-secondary-foreground/50 text-sm">{location.country}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-foreground/50 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Universal Solutions Consultancy. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-foreground/50 hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-secondary-foreground/50">
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
