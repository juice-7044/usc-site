import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { VapiWidget } from '@/components/vapi-widget'
import './globals.css'

export const metadata: Metadata = {
  title: 'Universal Solutions Consultancy | There Is No Limit',
  description: 'Global consultancy specializing in trade finance, commodities, oil & gas, and capital raising. Operating across South Africa, USA, UAE, and Maldives.',
  keywords: ['trade finance', 'commodities', 'consultancy', 'oil and gas', 'capital raising', 'letters of credit', 'BRICS'],
  authors: [{ name: 'Universal Solutions Consultancy' }],
  openGraph: {
    title: 'Universal Solutions Consultancy | There Is No Limit',
    description: 'Global consultancy specializing in trade finance, commodities, oil & gas, and capital raising.',
    url: 'https://universalsolutionsconsultancy.com',
    siteName: 'Universal Solutions Consultancy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universal Solutions Consultancy | There Is No Limit',
    description: 'Global consultancy specializing in trade finance, commodities, oil & gas, and capital raising.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {/* Vapi Chat Widget */}
        <script
          src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js"
          async
          type="text/javascript"
        />
        <VapiWidget />
      </body>
    </html>
  )
}
