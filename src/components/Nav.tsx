'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

const links = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/the-quiet-holders', label: 'The Quiet Holders' },
  { href: '/oracle-cards', label: 'Oracle Cards' },
  { href: '/retreats', label: 'Retreats' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const light = scrolled || open

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        light
          ? 'bg-cream/95 backdrop-blur-sm border-b border-sage/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
        {/* Logo / Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {light ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/Images/logo-circle.png"
                alt="Harmonized Therapies"
                fill
                className="object-cover"
                priority
                sizes="40px"
              />
            </div>
          ) : (
            <span className="text-sage-light">
              <Logo className="h-9 w-9" />
            </span>
          )}
          <span
            className={`font-display text-[1.2rem] font-light tracking-wide transition-colors ${
              light ? 'text-charcoal' : 'text-cream'
            }`}
          >
            Harmonized <em className="not-italic text-sage">Therapies</em>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-[0.72rem] tracking-[0.14em] uppercase transition-colors font-body font-[400] ${
                  light ? 'text-muted hover:text-sage' : 'text-cream/70 hover:text-cream'
                } ${pathname === href ? (light ? 'text-sage' : 'text-cream') : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=Session Enquiry"
              className="bg-sage text-white text-[0.72rem] tracking-[0.12em] uppercase px-5 py-2.5 rounded-full hover:bg-sage-dark transition-colors"
            >
              Get in Touch
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 ${light ? 'text-charcoal' : 'text-cream'}`}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-cream border-t border-sage/10 px-6 py-6 flex flex-col gap-5">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-[0.8rem] tracking-[0.14em] uppercase font-[400] ${
                pathname === href ? 'text-sage' : 'text-muted hover:text-sage'
              } transition-colors`}
            >
              {label}
            </Link>
          ))}
          <a
            href="mailto:danielle@harmonizedtherapies.com.au?subject=Session Enquiry"
            className="self-start bg-sage text-white text-[0.72rem] tracking-[0.12em] uppercase px-6 py-3 rounded-full hover:bg-sage-dark transition-colors mt-2"
          >
            Get in Touch
          </a>
        </div>
      )}
    </header>
  )
}
