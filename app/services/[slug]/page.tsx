import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTASection } from "@/components/home/cta-section"
import { services } from "@/lib/site-data"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// Service-specific detailed content
const serviceDetails: Record<string, {
  intro: string
  sections: { title: string; content: string; items?: string[] }[]
  faqs?: { question: string; answer: string }[]
}> = {
  "trade-finance": {
    intro: "USC provides comprehensive trade finance solutions to facilitate secure international transactions. Our instruments reduce risk and enable global commerce.",
    sections: [
      {
        title: "Letters of Credit (LC)",
        content: "Documentary and standby letters of credit issued by prime banks to guarantee payment in international transactions.",
        items: [
          "Sight Letters of Credit",
          "Usance/Deferred Letters of Credit",
          "Transferable Letters of Credit",
          "Back-to-Back Letters of Credit"
        ]
      },
      {
        title: "Bank Guarantees",
        content: "Financial instruments that assure contractual obligations will be met.",
        items: [
          "Performance Guarantees",
          "Bid Bond Guarantees",
          "Advance Payment Guarantees",
          "Retention Guarantees"
        ]
      },
      {
        title: "Standby Letters of Credit",
        content: "Secondary payment mechanisms that serve as a safety net for both buyers and sellers.",
        items: [
          "Performance Standby",
          "Financial Standby",
          "Direct Pay Standby"
        ]
      }
    ],
    faqs: [
      { question: "What is the typical turnaround time for LC issuance?", answer: "Standard processing takes 5-10 business days depending on the issuing bank and transaction complexity." },
      { question: "What are the costs associated with trade finance instruments?", answer: "Fees vary based on the instrument type, amount, and tenor. Typical costs range from 0.5% to 3% of the face value." }
    ]
  },
  "commodities": {
    intro: "USC facilitates the sourcing and export of soft and hard commodities with comprehensive supply chain management and quality assurance.",
    sections: [
      {
        title: "Hard Commodities",
        content: "Mining and extraction products including metals, minerals, and energy resources.",
        items: [
          "Chrome Ore",
          "Manganese Ore",
          "Iron Ore",
          "Coal",
          "Copper Concentrates"
        ]
      },
      {
        title: "Soft Commodities",
        content: "Agricultural products and livestock-related commodities.",
        items: [
          "Grains (Wheat, Maize, Rice)",
          "Sugar",
          "Cotton",
          "Coffee",
          "Cocoa"
        ]
      },
      {
        title: "Supply Chain Services",
        content: "End-to-end logistics and documentation for commodity trade.",
        items: [
          "Supplier verification and due diligence",
          "Quality inspection and certification",
          "Shipping and logistics coordination",
          "Trade documentation management"
        ]
      }
    ]
  },
  "oil-gas": {
    intro: "USC brokers fuel transactions for verified buyers and sellers worldwide and maintains relationships with refineries and tank farms.",
    sections: [
      {
        title: "Jet Fuel",
        content: "Aviation-grade fuels for commercial and private aviation.",
        items: [
          "Jet Fuel JP54 (K-1 Colonial Grade 54)",
          "Jet Fuel A1 91/91 – GOST 10227-86"
        ]
      },
      {
        title: "Diesel & Gas Oils",
        content: "High-quality diesel fuels for industrial and automotive applications.",
        items: [
          "D2 Diesel Gas Oil L-0.2-62, GOST 305-82",
          "Diesel Gas Oil Ultra-Low Sulphur Diesel 50 PPM",
          "HSD2 Gas Oil L-0.2-62 GOST 305-82 AGO",
          "USLD Diesel EN590 10PPM, Euro 4, 5 & 6"
        ]
      },
      {
        title: "Crude Oils",
        content: "Various grades of crude oil from international sources.",
        items: [
          "Russia Export Blend Crude (REBCO)",
          "Siberian Light Crude Oil (SLCO)",
          "Bonny Light (BLCO)",
          "North Sea Asguard 53"
        ]
      },
      {
        title: "Fuel Trade Services",
        content: "Comprehensive support for fuel transactions.",
        items: [
          "Buyer/seller matching",
          "Refinery coordination",
          "SGS inspection facilitation",
          "Logistics & shipping coordination",
          "End-to-end trade documentation"
        ]
      }
    ]
  },
  "produce": {
    intro: "USC specializes in premium agricultural commodity supply, connecting producers with international markets through reliable sourcing and quality assurance.",
    sections: [
      {
        title: "Grains & Cereals",
        content: "Staple crops sourced from verified agricultural producers.",
        items: [
          "Yellow Corn / Maize",
          "White Corn / Maize",
          "Wheat (Various Grades)",
          "Sorghum",
          "Barley"
        ]
      },
      {
        title: "Pulses & Legumes",
        content: "High-protein crops for food and feed applications.",
        items: [
          "Soybeans",
          "Chickpeas",
          "Lentils",
          "Black-Eyed Peas",
          "Kidney Beans"
        ]
      },
      {
        title: "Specialty Crops",
        content: "Premium agricultural products for specialized markets.",
        items: [
          "Macadamia Nuts",
          "Citrus Fruits",
          "Wine Grapes",
          "Organic Produce",
          "Essential Oils"
        ]
      }
    ]
  },
  "procurement": {
    intro: "USC facilitates global procurement for SMEs, corporations, and government bodies with comprehensive sourcing and supply chain solutions.",
    sections: [
      {
        title: "Procurement Capabilities",
        content: "End-to-end procurement support for international sourcing.",
        items: [
          "Sourcing certified suppliers",
          "Negotiating supply contracts",
          "Quality validation & documentation",
          "Trade finance integration"
        ]
      },
      {
        title: "Industries Served",
        content: "Cross-sector procurement expertise.",
        items: [
          "Construction & Infrastructure",
          "Energy & Utilities",
          "Manufacturing",
          "Healthcare",
          "Government & Public Sector"
        ]
      }
    ],
    faqs: [
      { question: "What types of procurement services does USC provide?", answer: "We offer end-to-end global procurement support, including supplier sourcing, contract negotiation, quality validation, documentation, and trade finance integration." },
      { question: "Who can benefit from your procurement services?", answer: "Our services are designed for SMEs, large corporations, and government entities seeking reliable sourcing and efficient supply chain solutions across international markets." },
      { question: "How do you ensure supplier reliability and product quality?", answer: "We work with certified suppliers and conduct thorough due diligence, including verification of certifications, production standards, and quality control documentation." },
      { question: "Can you support financing for large procurement orders?", answer: "We facilitate trade finance solutions by connecting clients with financial partners, helping to structure transactions and manage cash flow effectively." }
    ]
  },
  "capital-raising": {
    intro: "USC assists corporations, SMEs, sovereign bodies, and private issuers in raising institutional capital for expansion, infrastructure, and strategic development.",
    sections: [
      {
        title: "IPO Facilitation (Equity Financing)",
        content: "USC supports SMEs, corporations, and governments in raising capital through Initial Public Offerings. Financing range: USD 1 million to USD 5 billion.",
        items: [
          "Pre-IPO advisory and preparation",
          "Regulatory compliance support",
          "Investor roadshow coordination",
          "Post-IPO support services"
        ]
      },
      {
        title: "Bond Facilitation (Debt Financing)",
        content: "Assistance with raising debt capital through sovereign or corporate bonds. Funding range: USD 10 million to USD 5 billion.",
        items: [
          "Corporate bond issuance",
          "Sovereign bond facilitation",
          "Green bond structuring",
          "Private placement bonds"
        ]
      },
      {
        title: "What Clients Gain",
        content: "Strategic advantages from working with USC.",
        items: [
          "Access to institutional investors and global capital markets",
          "Strengthened creditworthiness",
          "Professional fundraising documentation & positioning",
          "Regulatory and compliance support",
          "Faster deal structuring"
        ]
      },
      {
        title: "Why USC",
        content: "Our competitive advantages in capital raising.",
        items: [
          "Cross-border capital markets experience",
          "Strong investor network in Asia, the Middle East, Europe, and Africa",
          "Expertise guiding SMEs, corporations, and governments",
          "Strategic advisory aligned with global investment standards"
        ]
      }
    ]
  }
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  
  if (!service) {
    return {
      title: "Service Not Found | Universal Solutions Consultancy",
    }
  }

  return {
    title: `${service.title} | Universal Solutions Consultancy`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  const details = serviceDetails[slug]

  if (!service) {
    notFound()
  }

  const serviceIndex = services.findIndex((s) => s.slug === slug)
  const prevService = serviceIndex > 0 ? services[serviceIndex - 1] : null
  const nextService = serviceIndex < services.length - 1 ? services[serviceIndex + 1] : null

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
          <div className="max-w-3xl">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mt-2 leading-tight">
              {service.title}
            </h1>
            <p className="text-white/80 mt-4 text-lg">
              {details?.intro || service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Featured Image */}
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Service Sections */}
              {details?.sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                  {section.items && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* FAQs */}
              {details?.faqs && details.faqs.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {details.faqs.map((faq, index) => (
                      <div key={index} className="bg-muted rounded-lg p-6">
                        <h3 className="font-semibold text-foreground mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-muted-foreground">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Service List */}
              <div className="bg-secondary rounded-lg p-6">
                <h3 className="text-lg font-serif font-bold text-white mb-4">
                  Our Services
                </h3>
                <ul className="space-y-2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className={`block py-2 px-3 rounded transition-colors ${
                          s.slug === slug
                            ? "bg-primary text-secondary font-semibold"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Box */}
              <div className="bg-primary rounded-lg p-6 text-secondary">
                <h3 className="text-lg font-serif font-bold mb-2">
                  Need This Service?
                </h3>
                <p className="text-secondary/80 text-sm mb-4">
                  Contact us to discuss how we can help with your {service.title.toLowerCase()} requirements.
                </p>
                <Link
                  href="/contact"
                  className="block w-full py-3 px-4 bg-secondary text-primary font-semibold rounded text-center hover:bg-secondary/90 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>

              {/* Download Profile */}
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                  Company Profile
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Download our company profile for detailed information about our services.
                </p>
                <Link
                  href="/downloads/USC_Consultancy-Profile.pdf"
                  download
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                  Download PDF
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {prevService ? (
              <Link
                href={`/services/${prevService.slug}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{prevService.title}</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            ) : (
              <div />
            )}
            {nextService ? (
              <Link
                href={`/services/${nextService.slug}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="hidden sm:inline">{nextService.title}</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
