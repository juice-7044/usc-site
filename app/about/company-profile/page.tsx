import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Company Profile | Universal Solutions Consultancy",
  description: "Download our comprehensive company profile to learn more about Universal Solutions Consultancy's services, expertise, and global reach.",
}

export default function CompanyProfilePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Company Profile
              </h1>
              <p className="text-lg text-white/80 leading-relaxed">
                Download our comprehensive company profile to learn more about Universal Solutions Consultancy&apos;s 
                services, expertise, and global reach.
              </p>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-card border border-border rounded-2xl p-12 shadow-lg">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileText className="w-10 h-10 text-primary" />
                </div>
                
                <h2 className="text-2xl font-serif font-bold mb-4">
                  USC Consultancy Profile 2024
                </h2>
                
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Our company profile provides a comprehensive overview of our services, 
                  team expertise, global operations, and track record of success in facilitating 
                  international trade and finance solutions.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/downloads/USC_Consultancy-Profile.pdf" 
                    download="USC_Consultancy-Profile.pdf"
                  >
                    <Button size="lg" className="w-full sm:w-auto">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </a>
                  <a 
                    href="/downloads/USC_Consultancy-Profile.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      <FileText className="w-4 h-4 mr-2" />
                      View Online
                    </Button>
                  </a>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions about our services?
                </p>
                <Link href="/contact">
                  <Button variant="ghost">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
