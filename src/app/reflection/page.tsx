'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Logo from '@/components/Logo'
import type { ReflectionData } from '@/lib/supabase'

const labelClass = 'block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-1 font-[400]'
const textareaClass = 'w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-muted/40 outline-none focus:border-gold transition-colors resize-none leading-relaxed'

function ReflectionForm() {
  const params = useSearchParams()
  const token = params.get('token') ?? ''

  const [form, setForm] = useState<ReflectionData>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function set(field: keyof ReflectionData, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token) { setStatus('error'); return }
    setStatus('sending')
    try {
      const res = await fetch('/api/reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, reflection: form }),
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
      <div className="min-h-screen bg-gold-light flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <div className="w-10 mx-auto mb-5 text-gold/60">
            <Logo />
          </div>
          <h2 className="font-display text-3xl font-light text-charcoal mb-4">
            <em className="italic">Carry it gently</em>
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">
            Thank you for taking this moment to settle. Your reflections have been sent to Danielle.
            Rest well, drink plenty of water, and be gentle with yourself today.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header — gold tone to mark the close of session */}
      <div className="bg-charcoal px-6 py-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <div className="relative">
          <div className="w-10 mx-auto mb-5 text-gold/40">
            <Logo />
          </div>
          <p className="text-[0.68rem] tracking-[0.22em] uppercase text-gold/60 mb-3 font-[400]">
            After your session
          </p>
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-cream leading-tight mb-4">
            How are you <em className="italic text-gold">landing?</em>
          </h1>
          <p className="text-cream/50 text-sm leading-relaxed max-w-md mx-auto">
            Before the world rushes back in, take a breath and notice where you are.
            These few questions are just for you — and for Danielle to hold.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto px-6 py-14 space-y-6">

        <div className="bg-warm-white rounded-3xl p-7 space-y-7">

          <div>
            <label className={labelClass}>How are you feeling right now?</label>
            <p className="text-muted text-xs mb-4">
              In your body, in your heart — wherever you notice it most.
            </p>
            <textarea
              rows={3}
              className={textareaClass}
              placeholder="e.g. lighter, emotional, spacious, a bit raw…"
              value={form.feeling_now ?? ''}
              onChange={e => set('feeling_now', e.target.value)}
            />
          </div>

          <div className="h-px bg-charcoal/6" />

          <div>
            <label className={labelClass}>What did you notice during the session?</label>
            <p className="text-muted text-xs mb-4">
              Any sensations, images, feelings, or moments that stood out — big or small.
            </p>
            <textarea
              rows={3}
              className={textareaClass}
              placeholder="Whatever rose up, even if it doesn't make sense yet…"
              value={form.what_noticed ?? ''}
              onChange={e => set('what_noticed', e.target.value)}
            />
          </div>

          <div className="h-px bg-charcoal/6" />

          <div>
            <label className={labelClass}>What are you taking home?</label>
            <p className="text-muted text-xs mb-4">
              A feeling, a word, an insight, a release — something that feels like yours to keep.
            </p>
            <textarea
              rows={3}
              className={textareaClass}
              placeholder="What feels different, or newly yours, as you leave…"
              value={form.taking_home ?? ''}
              onChange={e => set('taking_home', e.target.value)}
            />
          </div>

          <div className="h-px bg-charcoal/6" />

          <div>
            <label className={labelClass}>Is there something you want to remember?</label>
            <p className="text-muted text-xs mb-4">
              Something Danielle said, something you felt, something you want to come back to.
            </p>
            <textarea
              rows={2}
              className={textareaClass}
              placeholder="Optional — only if something wants to be held…"
              value={form.want_to_remember ?? ''}
              onChange={e => set('want_to_remember', e.target.value)}
            />
          </div>

        </div>

        {/* Gentle reminder */}
        <div className="rounded-2xl border border-gold/20 bg-gold-light/40 px-6 py-5 text-center">
          <p className="text-charcoal/60 text-xs leading-relaxed">
            After a session, your nervous system is still integrating. Drink water, rest if you can,
            and avoid rushing back into busyness. Be as gentle with yourself as you would with someone you love.
          </p>
        </div>

        {/* Submit */}
        {status === 'error' && (
          <p className="text-center text-sm text-red-500">
            Something went wrong — please try again or reach out to Danielle directly.
          </p>
        )}
        <div className="text-center pb-4">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-block bg-charcoal text-cream text-[0.72rem] tracking-[0.15em] uppercase px-10 py-4 rounded-full hover:bg-charcoal/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending…' : 'Send to Danielle'}
          </button>
          <p className="text-muted text-xs mt-4">Private and held with care.</p>
        </div>

      </form>

      <div className="text-center pb-10">
        <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted/50">Harmonized Therapies · Yarra Valley</p>
      </div>
    </div>
  )
}

export default function ReflectionPage() {
  return (
    <Suspense>
      <ReflectionForm />
    </Suspense>
  )
}
