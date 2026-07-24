import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Danielle Brierley — book a session, ask a question, or enquire about retreats. Yarra Valley, Melbourne.',
}

export default function ContactPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-charcoal pt-32 pb-20 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-[0.7rem] tracking-[0.25em] uppercase text-gold/60 mb-4 font-[400]">
            Let&apos;s connect
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-cream leading-tight mb-6">
            Begin Your<br /><em className="italic text-sage-mid">Healing Journey</em>
          </h1>
          <p className="text-cream/60 text-lg font-light leading-relaxed max-w-xl mx-auto">
            Book a free 20-minute discovery call, or reach out with any questions. Danielle is based
            in the Yarra Valley and offers mobile services across Melbourne.
          </p>
        </div>
      </section>

      {/* ─── CONTACT GRID ─── */}
      <section className="bg-cream py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-12">

          {/* Contact info */}
          <div>
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-8 font-[400]">
              Get in touch
            </p>
            <div className="space-y-6 mb-10">
              {[
                {
                  icon: (
                    <svg className="w-4 h-4 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
                    </svg>
                  ),
                  label: 'Location',
                  content: 'Yarra Valley, Melbourne, Australia',
                  href: undefined,
                },
                {
                  icon: (
                    <svg className="w-4 h-4 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  ),
                  label: 'Email',
                  content: 'danielle@harmonizedtherapies.com.au',
                  href: 'mailto:danielle@harmonizedtherapies.com.au',
                },
                {
                  icon: (
                    <svg className="w-4 h-4 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                  ),
                  label: 'New Client Enquiry',
                  content: 'Fill in the new client form',
                  href: '/enquire',
                  external: false,
                },
              ].map(({ icon, label, content, href, external }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-0.5 font-[400]">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-charcoal hover:text-sage transition-colors"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="text-charcoal">{content}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <p className="text-[0.68rem] tracking-[0.18em] uppercase text-muted mb-4 font-[400]">Follow along</p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/harmonized_therapies"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 border border-charcoal/15 rounded-full text-sm text-muted hover:border-sage hover:text-sage transition-colors"
              >
                <span>◎</span> Instagram
              </a>
              <a
                href="https://www.facebook.com/125108761007850"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 border border-charcoal/15 rounded-full text-sm text-muted hover:border-sage hover:text-sage transition-colors"
              >
                <span>f</span> Facebook
              </a>
            </div>

            {/* New client CTA */}
            <div className="mt-10 p-6 bg-sage-dark rounded-2xl text-center">
              <p className="text-[0.68rem] tracking-[0.2em] uppercase text-gold/60 mb-2 font-[400]">New clients</p>
              <p className="text-cream/70 text-sm mb-4 leading-relaxed">
                If you are new to Danielle, the new client enquiry form is the best place to start.
                She reads every one personally.
              </p>
              <Link
                href="/enquire"
                className="inline-block bg-gold text-charcoal text-[0.72rem] tracking-[0.1em] uppercase px-5 py-2.5 rounded-full hover:bg-gold/80 transition-colors"
              >
                New Client Enquiry Form
              </Link>
            </div>
          </div>

          {/* Contact form */}
          <ContactForm />
        </div>
      </section>

      {/* ─── QUICK LINKS ─── */}
      <section className="bg-warm-white py-12 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { href: '/services', label: 'Browse Services', desc: 'Find the right therapy for you.' },
              { href: '/retreats', label: 'Retreats & Workshops', desc: 'Come together and be held.' },
              { href: '/the-quiet-cards', label: 'The Quiet Cards', desc: 'The Quiet Holders Oracle deck.' },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="bg-white rounded-2xl p-6 border border-sage/10 hover:shadow-sm transition-shadow group flex items-center justify-between"
              >
                <div>
                  <p className="font-display text-lg font-light text-charcoal">{label}</p>
                  <p className="text-muted text-xs mt-0.5">{desc}</p>
                </div>
                <span className="text-sage group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
