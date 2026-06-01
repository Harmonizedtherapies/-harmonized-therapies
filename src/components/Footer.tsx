import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-white">
                <Image
                  src="/Images/logo-circle.png"
                  alt="Harmonized Therapies logo"
                  fill
                  className="object-cover object-center"
                  sizes="48px"
                />
              </div>
              <span className="font-display text-[1.15rem] font-light text-cream">
                Harmonized <em className="not-italic text-sage-mid">Therapies</em>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 text-cream/50 max-w-xs">
              Holding space for grief, healing and becoming. Yarra Valley, Melbourne.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/125108761007850"
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
            <h4 className="text-[0.68rem] tracking-[0.2em] uppercase text-sage-mid mb-4 font-[400]">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: '/about', label: 'About Danielle' },
                { href: '/services', label: 'Services' },
                { href: '/the-quiet-holders', label: 'The Quiet Holders' },
                { href: '/oracle-cards', label: 'Oracle Cards' },
                { href: '/retreats', label: 'Retreats & Workshops' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-cream/50 hover:text-sage-mid transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[0.68rem] tracking-[0.2em] uppercase text-sage-mid mb-4 font-[400]">
              Connect
            </h4>
            <ul className="space-y-3 text-sm text-cream/50">
              <li className="flex gap-2.5 items-start">
                <span className="mt-0.5">📍</span>
                <span>Yarra Valley, Melbourne, Australia</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="mt-0.5">✉️</span>
                <a
                  href="mailto:danielle@harmonizedtherapies.com.au"
                  className="hover:text-sage-mid transition-colors"
                >
                  danielle@harmonizedtherapies.com.au
                </a>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="mt-0.5">📅</span>
                <a
                  href="mailto:danielle@harmonizedtherapies.com.au?subject=Session Enquiry"
                  className="hover:text-sage-mid transition-colors"
                >
                  Book a session
                </a>
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

        <div className="border-t border-cream/8 pt-6 text-center text-[0.72rem] text-cream/30">
          © 2025 Harmonized Therapies · Danielle Brierley · Yarra Valley, Melbourne ·{' '}
          <a href="mailto:danielle@harmonizedtherapies.com.au" className="hover:text-sage-mid transition-colors">
            danielle@harmonizedtherapies.com.au
          </a>
        </div>
      </div>
    </footer>
  )
}
