'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Logo from '@/components/Logo'
import type { MassageConsentData } from '@/lib/supabase'

const labelClass = 'block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2 font-[400]'
const inputClass = 'w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-muted/40 outline-none focus:border-sage transition-colors'
const textareaClass = `${inputClass} resize-none leading-relaxed`

const CONDITIONS = [
  'Heart disease', 'Diabetes', 'Epilepsy', 'Asthma', 'Headaches',
  'Chronic illness / disease', 'Dizziness', 'High blood pressure', 'Low blood pressure',
  'Night sweats', 'Skin conditions', 'Anxiety', 'Depression',
  'GIT conditions (constipation/diarrhoea)', 'Menstrual irregularities / pain',
  'Menopausal symptoms', 'Major surgeries', 'Other',
]

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px flex-1 bg-sage/15" />
      <p className="text-[0.68rem] tracking-[0.22em] uppercase text-sage font-[400]">{label}</p>
      <div className="h-px flex-1 bg-sage/15" />
    </div>
  )
}

function ScaleGroup({ label, name, value, options, onChange }: {
  label: string
  name: string
  value: string | undefined
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex gap-4 flex-wrap">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="accent-sage w-4 h-4"
            />
            <span className="text-sm text-charcoal capitalize group-hover:text-sage transition-colors">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function ConsentForm() {
  const params = useSearchParams()
  const token = params.get('token') ?? ''

  const [form, setForm] = useState<MassageConsentData>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function set(field: keyof MassageConsentData, value: string | boolean | string[]) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function toggleCondition(condition: string) {
    const current = form.health_conditions_list ?? []
    const next = current.includes(condition)
      ? current.filter(c => c !== condition)
      : [...current, condition]
    set('health_conditions_list', next)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token) { setStatus('error'); return }
    setStatus('sending')
    try {
      const res = await fetch('/api/massage-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          consent: { ...form, consent_date: new Date().toISOString() },
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
        <p className="text-muted text-sm text-center">This link appears to be invalid. Please check your email for the correct link.</p>
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
          <h2 className="font-display text-3xl font-light text-charcoal mb-4">Thank you</h2>
          <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
            Your consent form has been received. Danielle will review this before your session.
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
        <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-cream leading-tight mb-4">
          Massage Consent Form
        </h1>
        <p className="text-cream/60 text-sm leading-relaxed max-w-xl mx-auto">
          Please complete this form before your session. All information is held in strict confidence
          and used only to support your care.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-6 py-14 space-y-14">

        {/* ─── Section 1: Personal details ─── */}
        <section>
          <SectionDivider label="Personal details" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-5">
            <div>
              <label className={labelClass}>Full name *</label>
              <input
                type="text"
                required
                className={inputClass}
                placeholder="Your full name"
                value={form.full_name ?? ''}
                onChange={e => set('full_name', e.target.value)}
              />
            </div>
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
                <label className={labelClass}>Contact number</label>
                <input
                  type="tel"
                  className={inputClass}
                  placeholder="04xx xxx xxx"
                  value={form.phone ?? ''}
                  onChange={e => set('phone', e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Health information ─── */}
        <section>
          <SectionDivider label="Health information" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-6">
            <p className="text-muted text-xs leading-relaxed -mt-1">
              This information helps me work safely with your body. Please share anything relevant, even if you&apos;re unsure whether it matters.
            </p>

            {/* Condition checkboxes */}
            <div>
              <label className={labelClass}>Do you have any of the following? (tick all that apply)</label>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mt-3">
                {CONDITIONS.map(condition => (
                  <label key={condition} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={(form.health_conditions_list ?? []).includes(condition)}
                      onChange={() => toggleCondition(condition)}
                      className="accent-sage w-4 h-4 flex-shrink-0"
                    />
                    <span className="text-sm text-charcoal group-hover:text-sage transition-colors leading-snug">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Details if ticked */}
            <div>
              <label className={labelClass}>If you ticked any of the above, please give details</label>
              <textarea
                rows={2}
                className={textareaClass}
                placeholder="e.g. total thyroid removal, anxiety managed with medication…"
                value={form.health_conditions ?? ''}
                onChange={e => set('health_conditions', e.target.value)}
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
              <label className={labelClass}>Recent surgery, injury or areas of pain</label>
              <textarea
                rows={2}
                className={textareaClass}
                placeholder="e.g. recent surgery, sprains, fractures, flare-ups — include approximate timeframe"
                value={form.recent_surgery_injury ?? ''}
                onChange={e => set('recent_surgery_injury', e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Major accidents or injuries in the last 10 years</label>
              <textarea
                rows={2}
                className={textareaClass}
                placeholder="Please describe or write No"
                value={form.accidents_injuries ?? ''}
                onChange={e => set('accidents_injuries', e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Skin conditions or allergies</label>
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
              <div className="flex gap-5 flex-wrap">
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
          </div>
        </section>

        {/* ─── Section 3: Current complaint ─── */}
        <section>
          <SectionDivider label="Current complaint" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-5">
            <p className="text-muted text-xs leading-relaxed -mt-1">
              Is there a specific condition or experience you&apos;re hoping this session may help with? If not, leave this section blank.
            </p>
            <div>
              <label className={labelClass}>What are you experiencing?</label>
              <textarea
                rows={2}
                className={textareaClass}
                placeholder="e.g. lower back tightness, shoulder tension, stress, grief…"
                value={form.current_complaint ?? ''}
                onChange={e => set('current_complaint', e.target.value)}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>When did it begin?</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. 3 months ago, after surgery…"
                  value={form.complaint_began ?? ''}
                  onChange={e => set('complaint_began', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>What do you think caused it?</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. stress, overuse, injury, unknown…"
                  value={form.complaint_cause ?? ''}
                  onChange={e => set('complaint_cause', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>What relieves it?</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. heat, rest, movement…"
                  value={form.complaint_relieves ?? ''}
                  onChange={e => set('complaint_relieves', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>What aggravates it?</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. sitting, cold, stress…"
                  value={form.complaint_aggravates ?? ''}
                  onChange={e => set('complaint_aggravates', e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 4: Wellbeing today ─── */}
        <section>
          <SectionDivider label="How are you today?" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-6">
            <p className="text-muted text-xs leading-relaxed -mt-1">
              A quick snapshot so I can meet you where you are.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <ScaleGroup
                label="Pain level"
                name="pain_level"
                value={form.pain_level}
                options={['low', 'medium', 'high']}
                onChange={v => set('pain_level', v)}
              />
              <ScaleGroup
                label="Sleep quality"
                name="sleep_quality"
                value={form.sleep_quality}
                options={['poor', 'average', 'good']}
                onChange={v => set('sleep_quality', v)}
              />
              <ScaleGroup
                label="Mood"
                name="mood"
                value={form.mood}
                options={['poor', 'average', 'good']}
                onChange={v => set('mood', v)}
              />
              <ScaleGroup
                label="Energy"
                name="energy"
                value={form.energy}
                options={['poor', 'average', 'good']}
                onChange={v => set('energy', v)}
              />
            </div>
          </div>
        </section>

        {/* ─── Section 5: Preferences ─── */}
        <section>
          <SectionDivider label="Your preferences" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-5">
            <div>
              <label className={labelClass}>Areas you&apos;d prefer I avoid or be gentle with</label>
              <textarea
                rows={2}
                className={textareaClass}
                placeholder="Any part of your body that needs extra care or has boundaries today"
                value={form.areas_to_avoid ?? ''}
                onChange={e => set('areas_to_avoid', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Pressure preference</label>
              <div className="flex gap-5 flex-wrap">
                {(['light', 'medium', 'firm'] as const).map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="pressure"
                      value={opt}
                      checked={form.pressure_preference === opt}
                      onChange={() => set('pressure_preference', opt)}
                      className="accent-sage w-4 h-4"
                    />
                    <span className="text-sm text-charcoal capitalize group-hover:text-sage transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 6: Consent ─── */}
        <section>
          <SectionDivider label="Consent" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-5">
            <p className="text-muted text-sm leading-relaxed">
              Massage therapy involves therapeutic touch. You have the right to ask Danielle to adjust
              pressure, avoid any area, or stop the session at any time. All information shared is held
              in strict confidence and used only to support your care. You may withdraw consent at any
              time and request that your information be deleted.
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
                I consent to receiving massage therapy from Danielle Brierley / Harmonized Therapies,
                and confirm that the information provided above is accurate to the best of my knowledge.
              </span>
            </label>
          </div>
        </section>

        {status === 'error' && (
          <p className="text-center text-sm text-red-500">
            Something went wrong — please try again or contact Danielle directly.
          </p>
        )}

        <div className="text-center pb-4">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-block bg-sage-dark text-cream text-[0.72rem] tracking-[0.15em] uppercase px-10 py-4 rounded-full hover:bg-sage transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Submitting…' : 'Submit consent form'}
          </button>
          <p className="text-muted text-xs mt-4">Your responses go directly to Danielle and are kept private.</p>
        </div>
      </form>

      <div className="text-center pb-10">
        <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted/50">Harmonized Therapies · Yarra Valley</p>
      </div>
    </div>
  )
}

export default function MassageConsentPage() {
  return (
    <Suspense>
      <ConsentForm />
    </Suspense>
  )
}
