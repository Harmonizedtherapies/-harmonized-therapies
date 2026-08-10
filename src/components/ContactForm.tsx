'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
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
              [{ name: [firstName, lastName].filter(Boolean).join(' '), email, source: 'contact' }],
              { onConflict: 'email', ignoreDuplicates: true }
            )
          }
        }
        setStatus('success')
        form.reset()
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
      <div className="bg-warm-white rounded-3xl p-8 lg:p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-light text-charcoal mb-3">Message sent!</h2>
        <p className="text-muted text-sm max-w-xs mx-auto">Thank you for reaching out. Danielle will be in touch within 1–2 business days.</p>
      </div>
    )
  }

  return (
    <div className="bg-warm-white rounded-3xl p-8 lg:p-10">
      <h2 className="font-display text-2xl font-light text-charcoal mb-1">Send a message</h2>
      <p className="text-muted text-sm mb-7">Danielle will get back to you within 1–2 business days.</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2 font-[400]">
              First name
            </label>
            <input
              id="firstName"
              name="First Name"
              type="text"
              required
              className="w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-muted/50 outline-none focus:border-sage transition-colors"
              placeholder="Your first name"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2 font-[400]">
              Last name
            </label>
            <input
              id="lastName"
              name="Last Name"
              type="text"
              className="w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-muted/50 outline-none focus:border-sage transition-colors"
              placeholder="Your last name"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2 font-[400]">
            Email address
          </label>
          <input
            id="email"
            name="Email"
            type="email"
            required
            className="w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-muted/50 outline-none focus:border-sage transition-colors"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="interest" className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2 font-[400]">
            I&apos;m interested in
          </label>
          <select
            id="interest"
            name="Interest"
            className="w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal outline-none focus:border-sage transition-colors appearance-none cursor-pointer"
          >
            <option value="">Select an option</option>
            <option>Massage Therapy</option>
            <option>Havening Techniques®</option>
            <option>Oncology Massage</option>
            <option>Palliative Massage</option>
            <option>Access Bars®</option>
            <option>NLP & Hypnotherapy</option>
            <option>Meditation & Coaching</option>
            <option>Retreat / Workshop</option>
            <option>The Quiet Cards</option>
            <option>General Enquiry</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2 font-[400]">
            Message
          </label>
          <textarea
            id="message"
            name="Message"
            rows={5}
            className="w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-muted/50 outline-none focus:border-sage transition-colors resize-none"
            placeholder="Tell Danielle a little about what you're looking for..."
          />
        </div>
        {/* Newsletter consent */}
        <label className="flex items-start gap-3 cursor-pointer">
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
          <p className="text-red-500 text-sm text-center">Something went wrong — please try again or email Danielle directly.</p>
        )}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-sage text-white text-[0.78rem] tracking-[0.1em] uppercase py-4 rounded-full hover:bg-sage-dark transition-colors disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
