import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', weight: ['400','500','600','700'], display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', weight: ['400','500'], display: 'swap' })

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Luski Collection',
    url: 'https://luskicollection.com',
    logo: 'https://luskicollection.com/icon.svg',
    email: 'ericlu@ultisai.com',
    description: 'AI video production studio creating film-quality brand films, product videos, and marketing content for businesses worldwide.',
    sameAs: ['https://instagram.com/ericywlu', 'https://x.com/ericluski'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Luski Collection',
    description: 'AI video production for brands. Film-quality brand films, product videos, and social content delivered in 7 days for under $500.',
    url: 'https://luskicollection.com',
    email: 'ericlu@ultisai.com',
    priceRange: '$500 - $1500',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Video Production Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Starter Video Package' }, price: '500', priceCurrency: 'USD' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Video Package' }, price: '1500', priceCurrency: 'USD' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Studio Retainer' }, price: 'Custom' },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Luski Collection — AI Product Video Demo',
    description: 'A cinematic product video made entirely with AI by Luski Collection. Indistinguishable from a $15,000 traditional production.',
    thumbnailUrl: 'https://luskicollection.com/opengraph-image',
    uploadDate: '2025-04-01',
    contentUrl: 'https://luskicollection.com/luskisandals.mp4',
    publisher: { '@type': 'Organization', name: 'Luski Collection', url: 'https://luskicollection.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does AI video production cost?',
        acceptedAnswer: { '@type': 'Answer', text: 'Luski Collection produces film-quality AI videos starting at under $500. A comparable traditional production would cost $15,000 or more.' },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to produce an AI marketing video?',
        acceptedAnswer: { '@type': 'Answer', text: 'We deliver the first draft within 7 business days. Final delivery with revisions typically takes 10 days.' },
      },
      {
        '@type': 'Question',
        name: 'Can you tell that Luski Collection videos are made with AI?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. Our videos are indistinguishable from traditional film production. Most viewers cannot tell the difference.' },
      },
      {
        '@type': 'Question',
        name: 'What types of videos does Luski Collection produce?',
        acceptedAnswer: { '@type': 'Answer', text: 'We produce brand films, product videos, social media content for Instagram Reels and TikTok, and full marketing campaigns.' },
      },
      {
        '@type': 'Question',
        name: 'Who is Luski Collection?',
        acceptedAnswer: { '@type': 'Answer', text: 'Luski Collection is an AI video production studio founded by Eric Lu. We create film-quality videos for brands, startups, and marketing teams worldwide.' },
      },
    ],
  },
]

export const metadata: Metadata = {
  title: 'Luski Collection | AI Video Production for Brands',
  description: 'Film-quality AI video production for brands, startups, and marketing teams. Brand films, product videos, social content — delivered in 7 days for under $500.',
  keywords: [
    'Luski Collection',
    'AI video production',
    'AI marketing videos',
    'brand films',
    'product video production',
    'AI generated video',
    'affordable video production',
    'social media video content',
    'AI video agency',
    'marketing video studio',
    'AI brand videos',
    'AI content creation',
    'video production under $500',
    'film quality AI video',
  ],
  metadataBase: new URL('https://luskicollection.com'),
  alternates: { canonical: 'https://luskicollection.com' },
  openGraph: {
    title: 'Luski Collection | AI Video Production for Brands',
    description: 'Film-quality AI video. Undetectably AI. Under $500.',
    url: 'https://luskicollection.com',
    siteName: 'Luski Collection',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luski Collection | AI Video Production for Brands',
    description: 'Film-quality AI video. Undetectably AI. Under $500.',
    creator: '@ericluski',
    site: '@ericluski',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  verification: {},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {schemas.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </head>
      <body>{children}</body>
    </html>
  )
}
