'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Logo from '@/components/Logo'
import type { ArrivalData } from '@/lib/supabase'

function SliderField({
  label,
  hint,
  lowLabel,
  highLabel,
  value,
  onChange,
}: {
  label: string
  hint: string
  lowLabel: string
  highLabel: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-1 font-[400]">
        {label}
      </label>
      <p className="text-muted text-xs mb-4">{hint}</p>
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted w-20 text-right leading-tight">{lowLabel}</span>
        <div className="flex-1 relative">
          <input
            type="range"
            min={1}
            max={10}
            value={value}
            onChange={e => onChange(Number(e.target.value))}
            className="w-full accent-sage h-1.5 rounded-full cursor-pointer"
          />
          <div className="flex justify-between mt-1.5 px-0.5">
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className={`text-[0.6rem] transition-colors ${value === i + 1 ? 'text-sage font-[500]' : 'text-muted/40'}`}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
        <span className="text-xs text-muted w-20 leading-tight">{highLabel}</span>
      </div>
    </div>
  )
}

function ArrivalForm() {
  const params = useSearchParams()
  const token = params.get('token') ?? ''

  const [form, setForm] = useState<ArrivalData>({ body_feeling: 5, heart_feeling: 5 })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function set<K extends keyof ArrivalData>(field: K, value: ArrivalData[K]) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token) { setStatus('error'); return }
    setStatus('sending')
    try {
      const res = await fetch('/api/arrival', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, arrival: form }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <p className="text-muted text-sm text-center">
          This link appears to be invalid. Please check your message from Danielle.
        </p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div className="w-10 mx-auto mb-5 text-sage/50">
            <Logo />
          </div>
          <h2 className="font-display text-3xl font-light text-charcoal mb-4">
            <em className="italic">See you soon</em>
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            Thank you for checking in. Danielle will hold what you&apos;ve shared as she prepares your space.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-sage-dark px-6 py-10 text-center">
        <div className="w-10 mx-auto mb-5 text-cream/60">
          <Logo />
        </div>
        <p className="text-[0.68rem] tracking-[0.22em] uppercase text-gold/60 mb-3 font-[400]">
          Before your session
        </p>
        <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-cream leading-tight mb-4">
          How are you <em className="italic text-sage-mid">arriving today?</em>
        </h1>
        <p className="text-cream/60 text-sm leading-relaxed max-w-md mx-auto">
          Just a few moments to check in with yourself before we begin.
          There&apos;s nothing to get right here.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto px-6 py-14 space-y-10">

        {/* Word */}
        <div className="bg-warm-white rounded-3xl p-7">
          <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-1 font-[400]">
            One word
          </label>
          <p className="text-muted text-xs mb-5">
            If you had to name how you&apos;re arriving in one word, what would it be?
          </p>
          <input
            type="text"
            maxLength={40}
            className="w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-charcoal placeholder-muted/40 outline-none focus:border-sage transition-colors text-center font-display text-xl font-light"
            placeholder="e.g. scattered, tender, hopeful…"
            value={form.word ?? ''}
            onChange={e => set('word', e.target.value)}
          />
        </div>

        {/* Sliders */}
        <div className="bg-warm-white rounded-3xl p-7 space-y-9">
          <SliderField
            label="Your body right now"
            hint="How does your physical body feel as you arrive?"
            lowLabel="Heavy, tense, or in pain"
            highLabel="Light, open, at ease"
            value={form.body_feeling ?? 5}
            onChange={v => set('body_feeling', v)}
          />
          <div className="h-px bg-charcoal/6" />
          <SliderField
            label="Your heart right now"
            hint="How are you feeling emotionally?"
            lowLabel="Overwhelmed or closed"
            highLabel="Open and settled"
            value={form.heart_feeling ?? 5}
            onChange={v => set('heart_feeling', v)}
          />
        </div>

        {/* Anything to know */}
        <div className="bg-warm-white rounded-3xl p-7">
          <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-1 font-[400]">
            Anything Danielle should know?
          </label>
          <p className="text-muted text-xs mb-5">
            Anything that&apos;s present for you today — big or small. You can also share this when you arrive.
          </p>
          <textarea
            rows={3}
            className="w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-muted/40 outline-none focus:border-sage transition-colors resize-none leading-relaxed"
            placeholder="Optional…"
            value={form.anything_to_know ?? ''}
            onChange={e => set('anything_to_know', e.target.value)}
          />
        </div>

        {/* Submit */}
        {status === 'error' && (
          <p className="text-center text-sm text-red-500">
            Something went wrong — please try again or let Danielle know when you arrive.
          </p>
        )}
        <div className="text-center pb-4">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-block bg-sage-dark text-cream text-[0.72rem] tracking-[0.15em] uppercase px-10 py-4 rounded-full hover:bg-sage transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending…' : 'I\'m ready'}
          </button>
          <p className="text-muted text-xs mt-4">Goes directly to Danielle before your session.</p>
        </div>

      </form>

      <div className="text-center pb-10">
        <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted/50">Harmonized Therapies · Yarra Valley</p>
      </div>
    </div>
  )
}

export default function ArrivalPage() {
  return (
    <Suspense>
      <ArrivalForm />
    </Suspense>
  )
}
