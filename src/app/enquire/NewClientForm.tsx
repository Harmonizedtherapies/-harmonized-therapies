'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputClass = 'w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-muted/50 outline-none focus:border-sage transition-colors'
const labelClass = 'block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2 font-[400]'

export default function NewClientForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [therapy, setTherapy] = useState('')
  const [newsletter, setNewsletter] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('https://formspree.io/f/mzdqzqjg', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        if (newsletter) {
          const firstName = (data.get('First Name') as string || '').trim()
          const lastName = (data.get('Last Name') as string || '').trim()
          const email = (data.get('Email') as string || '').trim()
          if (email) {
            await supabase.from('newsletter_signups').upsert(
              [{ name: [firstName, lastName].filter(Boolean).join(' '), email, source: 'enquiry' }],
              { onConflict: 'email', ignoreDuplicates: true }
            )
          }
        }
        setStatus('success')
        form.reset()
        setTherapy('')
        setNewsletter(false)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-warm-white rounded-3xl p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-light text-charcoal mb-3">
          Thank you for reaching out.
        </h2>
        <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
          Danielle will read your message personally and be in touch within one to two days.
          You don&apos;t need to do anything else.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-warm-white rounded-3xl p-8 lg:p-10">
      <h2 className="font-display text-2xl font-light text-charcoal mb-1">Tell Danielle about yourself</h2>
      <p className="text-muted text-sm mb-8 leading-relaxed">
        Share as much as you feel comfortable. Everything you write is read only by Danielle.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className={labelClass}>First name *</label>
            <input id="firstName" name="First Name" type="text" required placeholder="Your first name" className={inputClass} />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>Last name</label>
            <input id="lastName" name="Last Name" type="text" placeholder="Your last name" className={inputClass} />
          </div>
        </div>

        {/* Contact */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className={labelClass}>Email address *</label>
            <input id="email" name="Email" type="email" required placeholder="your@email.com" className={inputClass} />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Phone / mobile</label>
            <input id="phone" name="Phone" type="tel" placeholder="For Danielle to text you back" className={inputClass} />
          </div>
        </div>

        {/* Preferred contact */}
        <div>
          <label htmlFor="contactPref" className={labelClass}>How would you like Danielle to reach you?</label>
          <select id="contactPref" name="Preferred Contact" className={inputClass + ' cursor-pointer appearance-none'}>
            <option value="">Select a preference</option>
            <option>Text message</option>
            <option>Email</option>
            <option>Either is fine</option>
          </select>
        </div>

        {/* Therapy type */}
        <div>
          <label htmlFor="therapy" className={labelClass}>I am interested in *</label>
          <select
            id="therapy"
            name="Therapy Interest"
            required
            value={therapy}
            onChange={e => setTherapy(e.target.value)}
            className={inputClass + ' cursor-pointer appearance-none'}
          >
            <option value="">Select an option</option>
            <optgroup label="Massage Therapy">
              <option>Relaxation &amp; Deep Tissue Massage</option>
              <option>Hot Stone Massage</option>
              <option>Indian Head &amp; Face Massage</option>
              <option>Foot Massage &amp; Reflexology</option>
              <option>Pregnancy Massage</option>
              <option>Oncology Massage</option>
              <option>Palliative Massage</option>
              <option>Harmonize Me — Signature Session</option>
            </optgroup>
            <optgroup label="Holistic &amp; Mind-Body Therapies">
              <option>Havening Techniques®</option>
              <option>Access Bars®</option>
              <option>NLP &amp; Hypnotherapy</option>
              <option>Meditation &amp; Wellbeing Coaching</option>
            </optgroup>
            <optgroup label="Other">
              <option>Retreat or Workshop</option>
              <option>Not sure yet — I would like guidance</option>
            </optgroup>
          </select>
        </div>

        {/* Location — only show for massage */}
        {(therapy.includes('Massage') || therapy.includes('Signature') || therapy === '') && therapy !== 'Retreat or Workshop' && (
          <div>
            <label htmlFor="location" className={labelClass}>Where are you based?</label>
            <input
              id="location"
              name="Location"
              type="text"
              placeholder="Suburb or area — helps Danielle understand travel"
              className={inputClass}
            />
          </div>
        )}

        {/* What they are carrying */}
        <div>
          <label htmlFor="carrying" className={labelClass}>What are you carrying right now?</label>
          <p className="text-muted/70 text-xs mb-2 leading-relaxed">
            This might be physical — tension, pain, fatigue. It might be emotional — grief, anxiety, something you can&apos;t quite name.
            Share whatever feels right.
          </p>
          <textarea
            id="carrying"
            name="What I Am Carrying"
            rows={4}
            placeholder="There are no wrong answers here..."
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* Health considerations */}
        <div>
          <label htmlFor="health" className={labelClass}>Is there anything about your health Danielle should know?</label>
          <p className="text-muted/70 text-xs mb-2 leading-relaxed">
            For example: injuries, medical conditions, recent surgery, pregnancy, medications, or anything else that feels relevant.
            This helps Danielle prepare the right approach for you.
          </p>
          <textarea
            id="health"
            name="Health Considerations"
            rows={3}
            placeholder="You can also share this in person if you prefer..."
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* Previous therapy */}
        <div>
          <label htmlFor="previous" className={labelClass}>Have you had this type of therapy before?</label>
          <select id="previous" name="Previous Experience" className={inputClass + ' cursor-pointer appearance-none'}>
            <option value="">Select an option</option>
            <option>Yes, I have had this before</option>
            <option>No, this would be my first time</option>
            <option>I have had something similar</option>
          </select>
        </div>

        {/* How did they find Danielle */}
        <div>
          <label htmlFor="referral" className={labelClass}>How did you find Danielle?</label>
          <select id="referral" name="Referral Source" className={inputClass + ' cursor-pointer appearance-none'}>
            <option value="">Select an option</option>
            <option>Google search</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>Referred by a friend or family member</option>
            <option>Referred by another practitioner</option>
            <option>Tudor Village Lilydale</option>
            <option>Other</option>
          </select>
        </div>

        {/* Anything else */}
        <div>
          <label htmlFor="anything" className={labelClass}>Anything else you&apos;d like Danielle to know?</label>
          <textarea
            id="anything"
            name="Anything Else"
            rows={3}
            placeholder="Questions, concerns, or anything on your mind..."
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* Newsletter consent */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={e => setNewsletter(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-charcoal/20 text-sage accent-sage flex-shrink-0"
          />
          <span className="text-muted text-xs leading-relaxed">
            Keep me updated with occasional news from Danielle — upcoming retreats, offerings, and gentle reminders to look after yourself.
          </span>
        </label>

        {status === 'error' && (
          <p className="text-red-500 text-sm">Something went wrong — please try again or email Danielle directly at danielle@harmonizedtherapies.com.au</p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-sage text-white text-[0.78rem] tracking-[0.1em] uppercase py-4 rounded-full hover:bg-sage-dark transition-colors disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending...' : 'Send My Enquiry to Danielle'}
        </button>

        <p className="text-muted/60 text-xs text-center leading-relaxed">
          Your enquiry goes directly to Danielle. She will respond personally within one to two days.
        </p>
      </form>
    </div>
  )
}
