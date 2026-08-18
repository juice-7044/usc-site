import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Universal Solutions Consultancy",
  description: "Learn how Universal Solutions Consultancy collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Privacy Policy
              </h1>
              <p className="text-lg text-white/80">
                Last updated: May 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-10">
              {/* Introduction */}
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Universal Solutions Consultancy (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is 
                  committed to protecting your personal data. This privacy policy explains how we collect, 
                  use, and safeguard your information when you visit our website or use our services.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-foreground border-b border-primary/30 pb-2">
                  INFORMATION WE COLLECT
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may collect the following types of information:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground"><strong className="text-foreground">Personal Information:</strong> Name, email address, phone number, company name, and other contact details you provide through our contact forms.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground"><strong className="text-foreground">Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent on pages, and navigation patterns.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground"><strong className="text-foreground">Technical Data:</strong> IP address, browser type, device information, and operating system.</span>
                  </li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-foreground border-b border-primary/30 pb-2">
                  HOW WE USE YOUR INFORMATION
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use your personal information for the following purposes:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground">To respond to your inquiries and provide requested services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground">To send you relevant information about our services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground">To improve our website and user experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground">To comply with legal obligations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground">To protect our rights and prevent fraud</span>
                  </li>
                </ul>
              </div>

              {/* Data Sharing */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-foreground border-b border-primary/30 pb-2">
                  DATA SHARING
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. 
                  We may share your information with trusted service providers who assist us in 
                  operating our website and conducting our business, subject to confidentiality agreements.
                </p>
              </div>

              {/* Data Security */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-foreground border-b border-primary/30 pb-2">
                  DATA SECURITY
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your 
                  personal data against unauthorized access, alteration, disclosure, or destruction. 
                  However, no method of transmission over the Internet is 100% secure.
                </p>
              </div>

              {/* Your Rights */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-foreground border-b border-primary/30 pb-2">
                  YOUR RIGHTS
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You have the right to:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground">Access the personal data we hold about you</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground">Request correction of inaccurate data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground">Request deletion of your data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground">Object to processing of your data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground">Request transfer of your data</span>
                  </li>
                </ul>
              </div>

              {/* Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-foreground border-b border-primary/30 pb-2">
                  COOKIES
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website uses cookies to enhance your browsing experience. You can control 
                  cookie settings through your browser preferences. Disabling cookies may affect 
                  the functionality of certain features on our website.
                </p>
              </div>

              {/* Third-Party Links */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-foreground border-b border-primary/30 pb-2">
                  THIRD-PARTY LINKS
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible 
                  for the privacy practices or content of these external sites. We encourage you 
                  to review the privacy policies of any third-party sites you visit.
                </p>
              </div>

              {/* Changes to This Policy */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-foreground border-b border-primary/30 pb-2">
                  CHANGES TO THIS POLICY
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this privacy policy from time to time. Any changes will be posted 
                  on this page with an updated revision date. We encourage you to review this 
                  policy periodically.
                </p>
              </div>

              {/* Contact Us */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-foreground border-b border-primary/30 pb-2">
                  CONTACT US
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this privacy policy or our data practices, 
                  please contact us at:
                </p>
                <div className="bg-muted/50 rounded-lg p-6 space-y-2">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Email:</strong> info@universalsolutionsconsultancy.com
                  </p>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Phone:</strong> +27 795 720 081
                  </p>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Address:</strong> 14 Berg St., Wellington 7655, Western Cape, South Africa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
