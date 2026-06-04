'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

const links = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/the-quiet-holders', label: 'Quiet Holders' },
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

  const light = open

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        light
          ? 'bg-cream/95 backdrop-blur-sm border-b border-sage/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-[120px] flex items-center justify-between">
        {/* Logo / Wordmark */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative w-[100px] h-[92px] flex-shrink-0 overflow-hidden">
            <Image
              src="/Images/logo-submark.png"
              alt="Harmonized Therapies"
              fill
              className="object-cover object-top"
              priority
              sizes="100px"
            />
          </div>
          <span className="hidden md:block font-display text-[1.35rem] font-light tracking-wide text-cream whitespace-nowrap">
            Harmonized <em className="not-italic text-gold">Therapies</em>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-5">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`link-underline text-[0.68rem] tracking-[0.10em] uppercase transition-colors font-body font-[400] whitespace-nowrap ${
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
              className="border border-gold text-gold text-[0.72rem] tracking-[0.12em] uppercase px-6 py-2.5 rounded-full hover:bg-gold hover:text-charcoal transition-colors whitespace-nowrap"
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
