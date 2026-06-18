'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Logo from '@/components/Logo'
import type { IntakeData } from '@/lib/supabase'

const labelClass = 'block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2 font-[400]'
const inputClass = 'w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-muted/40 outline-none focus:border-sage transition-colors'
const textareaClass = `${inputClass} resize-none leading-relaxed`
const sectionHeadingClass = 'font-display text-2xl font-light text-charcoal mb-1'
const sectionSubClass = 'text-muted text-sm mb-7 leading-relaxed'

function WelcomeForm() {
  const params = useSearchParams()
  const token = params.get('token') ?? ''

  const [form, setForm] = useState<IntakeData>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function set(field: keyof IntakeData, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token) { setStatus('error'); return }
    setStatus('sending')
    try {
      const res = await fetch('/api/intake/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          intake: { ...form, consent_date: new Date().toISOString() },
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-muted text-sm">This link appears to be invalid. Please check your email for the correct link.</p>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div className="w-10 mx-auto mb-6 text-sage/50">
            <Logo />
          </div>
          <h2 className="font-display text-3xl font-light text-charcoal mb-4">
            Thank you, <em className="italic">beautiful soul</em>
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
            Your intake form has been received. Danielle will hold this with care before your session.
            You don&apos;t need to do anything else — see you soon.
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
          Harmonized Therapies
        </p>
        <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-cream leading-tight mb-4">
          Welcome, <em className="italic text-sage-mid">I&apos;m glad you&apos;re here</em>
        </h1>
        <p className="text-cream/60 text-sm leading-relaxed max-w-xl mx-auto">
          Before your session, I&apos;d love to understand a little more about you — both what your body carries
          and what your heart is holding. Take your time with this. There are no right answers.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-6 py-14 space-y-14">

        {/* ─── Section 1: Soul ─── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-sage/15" />
            <p className="text-[0.68rem] tracking-[0.22em] uppercase text-sage font-[400]">A little about your soul</p>
            <div className="h-px flex-1 bg-sage/15" />
          </div>
          <div className="bg-warm-white rounded-3xl p-7 space-y-6">
            <div>
              <label className={labelClass}>What brought you here?</label>
              <textarea
                rows={3}
                className={textareaClass}
                placeholder="What's been going on? What made you reach out?"
                value={form.what_brought_you ?? ''}
                onChange={e => set('what_brought_you', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>How long have you been carrying this?</label>
              <textarea
                rows={2}
                className={textareaClass}
                placeholder="Days, months, years — or maybe you're not quite sure…"
                value={form.how_long_carrying ?? ''}
                onChange={e => set('how_long_carrying', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>What would healing feel like for you?</label>
              <textarea
                rows={3}
                className={textareaClass}
                placeholder="Not what it looks like — what it feels like. In your body, in your life…"
                value={form.what_would_healing_feel_like ?? ''}
                onChange={e => set('what_would_healing_feel_like', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Where do you feel this most in your body?</label>
              <textarea
                rows={2}
                className={textareaClass}
                placeholder="Chest, shoulders, gut, throat… wherever it tends to live"
                value={form.where_in_body ?? ''}
                onChange={e => set('where_in_body', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>What needs the most care right now?</label>
              <textarea
                rows={2}
                className={textareaClass}
                placeholder="Is there something specific you&apos;d like me to hold gently in our session?"
                value={form.needs_care ?? ''}
                onChange={e => set('needs_care', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* ─── Section 2: Health ─── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-sage/15" />
            <p className="text-[0.68rem] tracking-[0.22em] uppercase text-sage font-[400]">Health &amp; body</p>
            <div className="h-px flex-1 bg-sage/15" />
          </div>
          <div className="bg-warm-white rounded-3xl p-7 space-y-6">
            <p className="text-muted text-xs leading-relaxed -mt-1">
              This information helps me work safely and thoughtfully with your body. Everything shared here is completely confidential.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Date of birth</label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.dob ?? ''}
                  onChange={e => set('dob', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Occupation</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="What do you do?"
                  value={form.occupation ?? ''}
                  onChange={e => set('occupation', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Emergency contact (name &amp; phone)</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. Jane Smith — 0412 345 678"
                value={form.emergency_contact ?? ''}
                onChange={e => set('emergency_contact', e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Medical conditions or health history</label>
              <textarea
                rows={3}
                className={textareaClass}
                placeholder="Anything I should know about — chronic conditions, surgeries, diagnoses, mental health…"
                value={form.medical_conditions ?? ''}
                onChange={e => set('medical_conditions', e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Current medications or supplements</label>
              <textarea
                rows={2}
                className={textareaClass}
                placeholder="Including any herbal or natural remedies"
                value={form.medications ?? ''}
                onChange={e => set('medications', e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Recent injuries or areas of pain</label>
              <textarea
                rows={2}
                className={textareaClass}
                placeholder="Anything recent — sprains, strains, flare-ups, surgery recovery…"
                value={form.recent_injuries ?? ''}
                onChange={e => set('recent_injuries', e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Skin conditions or sensitivities</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. eczema, psoriasis, allergies to oils or fragrance"
                value={form.skin_conditions ?? ''}
                onChange={e => set('skin_conditions', e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Are you pregnant, or could you be?</label>
              <div className="flex gap-3 flex-wrap">
                {(['no', 'yes', 'unsure'] as const).map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="pregnant"
                      value={opt}
                      checked={form.pregnant === opt}
                      onChange={() => set('pregnant', opt)}
                      className="accent-sage w-4 h-4"
                    />
                    <span className="text-sm text-charcoal capitalize group-hover:text-sage transition-colors">
                      {opt === 'no' ? 'No' : opt === 'yes' ? 'Yes' : 'Not sure'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Areas you'd prefer I avoid or be gentle with</label>
              <textarea
                rows={2}
                className={textareaClass}
                placeholder="Any part of your body that needs extra care or boundaries today"
                value={form.areas_to_avoid ?? ''}
                onChange={e => set('areas_to_avoid', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* ─── Section 3: Consent ─── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-sage/15" />
            <p className="text-[0.68rem] tracking-[0.22em] uppercase text-sage font-[400]">Consent</p>
            <div className="h-px flex-1 bg-sage/15" />
          </div>
          <div className="bg-warm-white rounded-3xl p-7">
            <p className="text-muted text-sm leading-relaxed mb-6">
              All information you share is held in strict confidence and used only to support your care.
              You may withdraw consent at any time and request that your information be deleted.
              By submitting this form, you confirm that the information provided is accurate to the best of your knowledge.
            </p>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                required
                checked={form.consent_given ?? false}
                onChange={e => set('consent_given', e.target.checked)}
                className="accent-sage w-4 h-4 mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-charcoal leading-relaxed group-hover:text-sage transition-colors">
                I consent to Danielle Brierley / Harmonized Therapies collecting and storing this information
                for the purpose of providing holistic health services.
              </span>
            </label>
          </div>
        </section>

        {/* Submit */}
        {status === 'error' && (
          <p className="text-center text-sm text-red-500">
            Something went wrong — please try again or email Danielle directly.
          </p>
        )}
        <div className="text-center pb-4">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-block bg-sage-dark text-cream text-[0.72rem] tracking-[0.15em] uppercase px-10 py-4 rounded-full hover:bg-sage transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending…' : 'Submit my intake form'}
          </button>
          <p className="text-muted text-xs mt-4">Your responses go directly to Danielle and are kept private.</p>
        </div>

      </form>

      {/* Footer mark */}
      <div className="text-center pb-10">
        <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted/50">Harmonized Therapies · Yarra Valley</p>
      </div>
    </div>
  )
}

export default function WelcomePage() {
  return (
    <Suspense>
      <WelcomeForm />
    </Suspense>
  )
}
