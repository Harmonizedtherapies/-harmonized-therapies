import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import NewsletterSignup from '@/components/NewsletterSignup'
import GoogleReviews from '@/components/GoogleReviews'

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.harmonizedtherapies.com.au'),
  title: {
    default: 'Harmonized Therapies | Massage & Holistic Healing | Yarra Valley Melbourne',
    template: '%s | Harmonized Therapies',
  },
  description:
    'Massage therapy, Havening Techniques®, oncology massage, and holistic healing with Danielle Brierley — Yarra Valley, Melbourne. 14 years of heart-centred care. Mobile services available.',
  keywords: [
    'massage therapist Yarra Valley',
    'massage Melbourne',
    'Havening Techniques Melbourne',
    'oncology massage Melbourne',
    'palliative massage Yarra Valley',
    'holistic healing Yarra Valley',
    'relaxation massage Yarra Valley',
    'Danielle Brierley',
    'Harmonized Therapies',
    'grief support Melbourne',
  ],
  openGraph: {
    siteName: 'Harmonized Therapies',
    locale: 'en_AU',
    type: 'website',
    url: 'https://www.harmonizedtherapies.com.au',
    images: [
      {
        url: '/Images/danielle-outdoor-portrait.png',
        width: 1200,
        height: 630,
        alt: 'Danielle Brierley — Harmonized Therapies, Yarra Valley Melbourne',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/Images/danielle-outdoor-portrait.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
  name: 'Harmonized Therapies',
  description: 'Massage therapy, Havening Techniques®, oncology massage, palliative massage, and holistic healing with Danielle Brierley — Yarra Valley, Melbourne.',
  url: 'https://www.harmonizedtherapies.com.au',
  email: 'danielle@harmonizedtherapies.com.au',
  image: 'https://www.harmonizedtherapies.com.au/Images/danielle-outdoor-portrait.png',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Yarra Valley',
    addressRegion: 'VIC',
    addressCountry: 'AU',
  },
  areaServed: [
    { '@type': 'State', name: 'Victoria' },
    { '@type': 'City', name: 'Melbourne' },
    { '@type': 'City', name: 'Yarra Valley' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Healing Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Relaxation & Deep Tissue Massage' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hot Stone Massage' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Oncology Massage' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Palliative Massage' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pregnancy Massage' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Havening Techniques®' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Access Bars®' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'NLP & Hypnotherapy' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meditation & Coaching' } },
    ],
  },
  founder: { '@type': 'Person', name: 'Danielle Brierley' },
  sameAs: [
    'https://www.facebook.com/125108761007850',
    'https://www.instagram.com/harmonized_therapies',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-body antialiased overflow-x-hidden">
        <Nav />
        <main>{children}</main>
        <GoogleReviews />
        <NewsletterSignup />
        <Footer />
      </body>
    </html>
  )
}
