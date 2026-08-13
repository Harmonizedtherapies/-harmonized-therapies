'use client'
import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Footer from './Footer'
import GoogleReviews from './GoogleReviews'
import NewsletterSignup from './NewsletterSignup'

const STANDALONE_PREFIXES = ['/welcome', '/arrival', '/reflection', '/portal', '/signup-sheet', '/tudor-village', '/print', '/massage-consent']

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const standalone = STANDALONE_PREFIXES.some(p => pathname.startsWith(p))
  if (standalone) return <>{children}</>
  return (
    <>
      <Nav />
      <main>{children}</main>
      <GoogleReviews />
      <NewsletterSignup />
      <Footer />
    </>
  )
}
