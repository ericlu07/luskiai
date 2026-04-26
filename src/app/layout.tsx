import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
  display: 'swap',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Luski Collection',
  description: 'AI video production studio creating film-quality brand films, product videos, and social content for businesses.',
  url: 'https://luskicollection.com',
  email: 'ericlu@ultisai.com',
  sameAs: [
    'https://instagram.com/ericywlu',
    'https://x.com/ericluski',
  ],
  serviceType: ['Video Production', 'Brand Films', 'Marketing Videos', 'AI Video Production'],
  priceRange: '$500 - $1500',
  areaServed: 'Worldwide',
}

export const metadata: Metadata = {
  title: 'Luski Collection | AI Video Production for Brands',
  description: 'Film-quality AI video production for brands, startups, and marketing teams. Brand films, product videos, and social content — delivered in 7 days for under $500.',
  keywords: [
    'AI video production',
    'brand films',
    'AI marketing videos',
    'product video production',
    'social media video content',
    'affordable video production',
    'AI generated video',
    'marketing video agency',
    'brand video studio',
    'Luski Collection',
  ],
  metadataBase: new URL('https://luskicollection.com'),
  alternates: {
    canonical: 'https://luskicollection.com',
  },
  openGraph: {
    title: 'Luski Collection | AI Video Production for Brands',
    description: 'Film-quality AI video production for brands. Brand films, product videos, social content — delivered in 7 days for under $500.',
    url: 'https://luskicollection.com',
    siteName: 'Luski Collection',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luski Collection | AI Video Production for Brands',
    description: 'Film-quality AI video production for brands. Delivered in 7 days for under $500.',
    creator: '@ericluski',
    site: '@ericluski',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
