'use client'
import { useState } from 'react'

export default function ComingHomeSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    const res = await fetch('/api/coming-home', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (res.ok) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
    }
  }

  return (
    <section className="bg-charcoal py-20 px-6 lg:px-10 relative overflow-hidden">
      {/* Soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sage/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center">

        <p className="text-[0.68rem] tracking-[0.3em] uppercase text-gold/70 mb-4 font-[400]">
          A free gift for you
        </p>

        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-cream italic leading-tight mb-4">
          Coming Home
        </h2>

        <p className="text-cream/60 text-sm tracking-wide mb-6">
          A guided relaxation &amp; nervous system reset
        </p>

        <div className="w-12 h-px bg-gold/30 mx-auto mb-8" />

        <p className="text-cream/75 leading-relaxed mb-2 max-w-md mx-auto">
          Sometimes the most healing thing you can do is stop — and let yourself arrive.
        </p>
        <p className="text-cream/75 leading-relaxed mb-10 max-w-md mx-auto">
          Enter your email and I&apos;ll send this recording straight to your inbox, with love.
        </p>

        {status === 'success' ? (
          <div className="bg-sage/15 border border-sage/20 rounded-2xl px-8 py-7 max-w-md mx-auto">
            <p className="font-display text-xl italic text-cream mb-2">It&apos;s on its way 🌿</p>
            <p className="text-cream/60 text-sm leading-relaxed">
              Check your inbox for your Coming Home recording. I hope it brings you a moment of quiet.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-white/8 border border-white/15 rounded-full px-5 py-3.5 text-sm text-cream placeholder-cream/35 outline-none focus:border-gold/40 transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-gold/90 hover:bg-gold text-charcoal text-[0.72rem] tracking-[0.12em] uppercase px-6 py-3.5 rounded-full transition-colors whitespace-nowrap disabled:opacity-60 font-[500]"
            >
              {status === 'sending' ? 'Sending...' : 'Send it to me'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-400/80 text-sm mt-4">Something went wrong — please try again.</p>
        )}

        <p className="text-cream/30 text-xs mt-6 tracking-wide">
          No spam. Just soul. Unsubscribe any time.
        </p>

      </div>
    </section>
  )
}
