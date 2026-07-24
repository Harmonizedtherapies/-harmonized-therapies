import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-14">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden">
                <Image
                  src="/Images/logo-submark.png"
                  alt="Harmonized Therapies logo"
                  fill
                  className="object-cover object-top"
                  sizes="56px"
                />
              </div>
              <span className="font-display text-[1.3rem] font-light text-cream">
                Harmonized <em className="not-italic text-gold">Therapies</em>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 text-cream/60 max-w-xs">
              Holding space for grief, healing and becoming. Yarra Valley, Melbourne.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100063942132425"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center text-[0.7rem] hover:border-sage-mid hover:text-sage-mid transition-colors"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="https://www.instagram.com/harmonized_therapies"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center text-[0.7rem] hover:border-sage-mid hover:text-sage-mid transition-colors"
                aria-label="Instagram"
              >
                ◎
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[0.68rem] tracking-[0.2em] uppercase text-gold/70 mb-5 font-[400]">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About Danielle' },
                { href: '/services', label: 'Services' },
                { href: '/the-quiet-holders', label: 'The Quiet Holders' },
                { href: '/the-quiet-cards', label: 'The Quiet Cards' },
                { href: '/retreats', label: 'Retreats & Workshops' },
                { href: '/meditation', label: 'Free Meditation' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[0.68rem] tracking-[0.2em] uppercase text-gold/70 mb-5 font-[400]">
              Connect
            </h4>
            <ul className="space-y-3 text-sm text-cream/60">
              <li className="flex gap-2.5 items-start">
                <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
                </svg>
                <span>Yarra Valley, Melbourne, Australia</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a
                  href="mailto:danielle@harmonizedtherapies.com.au"
                  className="hover:text-sage-mid transition-colors"
                >
                  danielle@harmonizedtherapies.com.au
                </a>
              </li>
              <li className="flex gap-2.5 items-start">
                <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                <Link
                  href="/enquire"
                  className="hover:text-sage-mid transition-colors"
                >
                  New client enquiry
                </Link>
              </li>
            </ul>
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=Free Discovery Call"
              className="inline-block mt-6 bg-sage text-white text-[0.7rem] tracking-[0.12em] uppercase px-5 py-2.5 rounded-full hover:bg-sage-dark transition-colors"
            >
              Book a Free Discovery Call
            </a>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 text-center text-[0.72rem] text-cream/40">
          © 2025 Harmonized Therapies · Danielle Brierley · Yarra Valley, Melbourne ·{' '}
          <a href="mailto:danielle@harmonizedtherapies.com.au" className="hover:text-sage-mid transition-colors">
            danielle@harmonizedtherapies.com.au
          </a>
        </div>
      </div>
    </footer>
  )
}
