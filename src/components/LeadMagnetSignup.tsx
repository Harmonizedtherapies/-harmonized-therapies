'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Props = {
  eyebrow?: string
  title: string
  subtitle: string
  description: string
  bullets: string[]
  pdfPath: string
  pdfFilename: string
  source: string
  variant: 'sage' | 'gold'
  mockupTitle: string
  mockupBrand: string
}

export default function LeadMagnetSignup({
  eyebrow = 'Free Gift',
  title,
  subtitle,
  description,
  bullets,
  pdfPath,
  pdfFilename,
  source,
  variant,
  mockupTitle,
  mockupBrand,
}: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const isSage = variant === 'sage'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    const { error } = await supabase
      .from('newsletter_signups')
      .insert([{ email, source }])

    if (error && error.code !== '23505') {
      setStatus('error')
      return
    }

    // Send welcome + notification emails (best-effort — don't block on failure)
    try {
      await fetch('/api/send-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
    } catch {
      // email is non-critical; user still gets the download
    }

    setStatus('success')
  }

  return (
    <section className={`${isSage ? 'bg-sage-dark' : 'bg-charcoal'} py-24 px-6 lg:px-10 relative overflow-hidden`}>
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-20 ${isSage ? 'bg-sage-light' : 'bg-gold'}`} />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Left: PDF mockup ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Shadow layer */}
              <div className={`absolute inset-0 translate-x-3 translate-y-3 rounded-2xl opacity-30 ${isSage ? 'bg-charcoal' : 'bg-black'}`} />
              {/* Card */}
              <div className={`relative rounded-2xl w-[240px] sm:w-[270px] overflow-hidden shadow-2xl border ${isSage ? 'bg-white border-cream/20' : 'bg-charcoal/80 border-gold/30'}`}>
                {/* Top colour bar */}
                <div className={`h-2 w-full ${isSage ? 'bg-gradient-to-r from-sage to-sage-mid' : 'bg-gradient-to-r from-gold/80 to-gold'}`} />
                <div className="px-7 py-8">
                  {/* Label */}
                  <p className={`text-[0.62rem] tracking-[0.25em] uppercase mb-5 font-[400] ${isSage ? 'text-sage' : 'text-gold'}`}>
                    Free Guide
                  </p>
                  {/* Botanical decoration */}
                  <div className={`text-4xl mb-5 ${isSage ? '' : ''}`}>
                    {isSage ? '🌿' : '🌙'}
                  </div>
                  {/* Title */}
                  <h3 className={`font-display text-[1.35rem] font-light italic leading-snug mb-6 ${isSage ? 'text-charcoal' : 'text-cream'}`}>
                    {mockupTitle}
                  </h3>
                  {/* Divider */}
                  <div className={`w-10 h-px mb-4 ${isSage ? 'bg-sage/40' : 'bg-gold/40'}`} />
                  {/* Brand */}
                  <p className={`text-[0.65rem] tracking-[0.18em] uppercase font-[400] ${isSage ? 'text-muted' : 'text-cream/50'}`}>
                    {mockupBrand}
                  </p>
                </div>
                {/* Bottom bar */}
                <div className={`h-1 w-full ${isSage ? 'bg-sage/20' : 'bg-gold/20'}`} />
              </div>
            </div>
          </div>

          {/* ── Right: Copy + form ── */}
          <div>
            <p className={`text-[0.68rem] tracking-[0.28em] uppercase mb-4 font-[400] ${isSage ? 'text-sage-light/70' : 'text-gold/70'}`}>
              {eyebrow}
            </p>
            <h2 className={`font-display text-[clamp(2rem,3.5vw,2.8rem)] font-light leading-tight mb-3 ${isSage ? 'text-cream' : 'text-cream'}`}>
              {title}
            </h2>
            <p className={`font-display text-base italic font-light mb-5 ${isSage ? 'text-sage-light/80' : 'text-gold/80'}`}>
              {subtitle}
            </p>
            <p className={`text-sm leading-relaxed mb-6 ${isSage ? 'text-cream/60' : 'text-cream/60'}`}>
              {description}
            </p>

            {/* Bullet list */}
            <ul className="space-y-2.5 mb-8">
              {bullets.map(b => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className={`mt-0.5 flex-shrink-0 ${isSage ? 'text-sage-light' : 'text-gold'}`}>
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l4 4 6-6" />
                    </svg>
                  </span>
                  <span className="text-cream/70">{b}</span>
                </li>
              ))}
            </ul>

            {/* Form / success state */}
            {status === 'success' ? (
              <div className={`rounded-2xl p-6 border ${isSage ? 'bg-white/8 border-sage-light/20' : 'bg-white/5 border-gold/25'}`}>
                <p className={`font-display text-lg font-light italic mb-4 ${isSage ? 'text-cream' : 'text-cream'}`}>
                  Your guide is ready to download. 🌿
                </p>
                <p className={`text-sm mb-5 ${isSage ? 'text-cream/60' : 'text-cream/60'}`}>
                  Thank you — enjoy, and reach out if you have any questions.
                </p>
                <a
                  href={pdfPath}
                  download={pdfFilename}
                  className={`inline-flex items-center gap-2 text-[0.75rem] tracking-[0.1em] uppercase px-6 py-3 rounded-full transition-colors ${
                    isSage
                      ? 'bg-sage-light text-charcoal hover:bg-cream'
                      : 'bg-gold text-charcoal hover:bg-gold/80'
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M3 18h18" />
                  </svg>
                  Download Your Free Guide
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className={`flex-1 bg-white/10 border rounded-full px-5 py-3 text-sm text-cream placeholder-cream/40 outline-none transition-colors ${
                      isSage ? 'border-cream/20 focus:border-sage-light/60' : 'border-cream/20 focus:border-gold/50'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`text-[0.72rem] tracking-[0.12em] uppercase px-6 py-3 rounded-full transition-colors whitespace-nowrap disabled:opacity-60 ${
                      isSage
                        ? 'bg-sage-light text-charcoal hover:bg-cream'
                        : 'bg-gold text-charcoal hover:bg-gold/80'
                    }`}
                  >
                    {status === 'sending' ? 'One moment...' : 'Send Me the Guide'}
                  </button>
                </div>
                {status === 'error' && (
                  <p className="text-red-300 text-xs">Something went wrong — please try again.</p>
                )}
                <p className={`text-[0.68rem] ${isSage ? 'text-cream/30' : 'text-cream/30'}`}>
                  No spam. Just meaningful content from Danielle.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
