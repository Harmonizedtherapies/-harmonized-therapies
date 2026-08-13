'use client'
import { useState } from 'react'
import Link from 'next/link'

const smsTemplates = [
  {
    id: 'sms-reminder-day-before',
    title: 'Appointment reminder — day before',
    body: `Hi [Name], just a reminder that you have a [service] with Danielle tomorrow at [time] at Harmonized Therapies. Looking forward to seeing you 🌿 Reply if you need to reschedule.`,
  },
  {
    id: 'sms-reminder-morning',
    title: 'Appointment reminder — morning of',
    body: `Good morning [Name] 🌿 Just a reminder you have your [service] with Danielle today at [time]. See you soon — Harmonized Therapies.`,
  },
  {
    id: 'sms-retreat',
    title: 'Retreat / event announcement',
    body: `Hi [Name], I have a [retreat/event name] coming up on [date] and thought of you. I'd love for you to join us if it feels right. More details here: [link] — Danielle, Harmonized Therapies.`,
  },
  {
    id: 'sms-follow-up',
    title: 'Follow-up after session',
    body: `Hi [Name], I hope you're feeling well after your session yesterday. Take it gently and please reach out if anything comes up. Warmly, Danielle 🌿`,
  },
  {
    id: 'sms-newsletter',
    title: 'Newsletter / general update',
    body: `Hi [Name], I have some news to share — [brief detail]. You can read more here: [link]. Take care — Danielle, Harmonized Therapies.`,
  },
]

const templates = [
  {
    id: 'retreat-general',
    title: 'Retreat Enquiry — General',
    body: `Hi [Name],

Thank you so much for reaching out and for your interest in the retreats. It means a lot that you're drawn to creating space for yourself in this way.

The retreats I facilitate are designed as gentle, nurturing experiences — opportunities to slow down, reconnect with yourself and feel held in a safe, compassionate environment. While they're not a substitute for medical or psychological care, they offer something that can be hard to find: genuine rest, reflection and connection.

I'm currently planning retreat dates for 2027 and would love to keep you in the loop as soon as they're confirmed. In the meantime, I'd be happy to arrange a brief phone call so I can answer any questions and hear a little more about what you're hoping for — that way we can make sure it's the right fit for you.

If you feel you'd benefit from some support sooner, I also offer therapeutic massage and trauma-informed wellbeing sessions on an individual basis, and you're always welcome to reach out about those.

There's no pressure at all — my priority is simply helping you find what's right for you at this time.

Warmly,
Danielle Brierley
Harmonized Therapies
https://harmonizedtherapies.com.au`,
  },
  {
    id: 'therapy-massage',
    title: 'General Therapy / Massage Enquiry',
    body: `Hi [Name],

Thank you for getting in touch — I'm so glad you reached out.

I offer therapeutic massage and trauma-informed wellbeing sessions, and I'd love to hear a little more about what's brought you here and what kind of support you're looking for. Everyone comes with different needs, and I always like to have a brief conversation first to make sure we're a good fit and that I can offer what will be most helpful for you.

If you'd like to share a little about what you're hoping for, feel free to reply here or give me a text and we can go from there. There's no obligation — I just want to make sure whatever we do together genuinely serves you.

I look forward to connecting with you.

Warmly,
Danielle Brierley
Harmonized Therapies
https://harmonizedtherapies.com.au`,
  },
  {
    id: 'quiet-holders',
    title: 'The Quiet Holders / Pregnancy Loss',
    body: `Hi [Name],

Thank you so much for reaching out, and for trusting me with something so tender. I'm truly sorry for your loss.

The Quiet Holders is a space I created specifically for people navigating pregnancy loss — a place that honours the depth of that grief and offers something gentle in return. Whether that's through one-on-one sessions, the retreat space or simply knowing that support is here when you're ready, I want you to feel there's no rush and no wrong way to move through this.

I'm currently planning Quiet Holders retreat dates for 2027, and I'd be honoured to keep you in the loop when those are confirmed. If you'd like to connect sooner, I also offer individual therapeutic and trauma-informed sessions and would be happy to have a quiet conversation first to hear where you're at.

Please know there's no pressure whatsoever. You don't have to have it figured out — that's what I'm here for.

With care,
Danielle Brierley
Harmonized Therapies | The Quiet Holders
https://harmonizedtherapies.com.au`,
  },
  {
    id: 'oracle-cards',
    title: 'Oracle Cards Enquiry',
    body: `Hi [Name],

Thank you for your interest in The Quiet Cards — I'm so glad they caught your attention.

The Quiet Cards are a companion deck created for times of grief, uncertainty and quiet reflection. Each card offers a gentle prompt or permission — something to sit with rather than solve. They're designed to be used in your own time, in your own way.

[Add purchase/availability details here]

If you have any questions at all, please don't hesitate to ask. I'm happy to help you find what feels right.

Warmly,
Danielle Brierley
Harmonized Therapies | The Quiet Holders
https://harmonizedtherapies.com.au`,
  },
  {
    id: 'not-sure',
    title: 'Not Sure Where to Start',
    body: `Hi [Name],

Thank you so much for reaching out — and please know, not knowing where to start is completely okay. That's a very normal place to be, and it takes something to reach out anyway.

I offer a few different things depending on what you're navigating right now — therapeutic massage, trauma-informed wellbeing sessions, oracle cards and retreat spaces. Some people come knowing exactly what they need; others just know they need something. Both are welcome here.

If you'd like to share a little about what's going on for you — even just a few words — I'd be happy to have a gentle conversation and help you figure out what might be the best fit. There's no obligation and no pressure, just a chance to connect and see what feels right.

I look forward to hearing from you.

Warmly,
Danielle Brierley
Harmonized Therapies
https://harmonizedtherapies.com.au`,
  },
]

function TemplateCard({ title, body }: { title: string; body: string }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl border border-sage/10 overflow-hidden">
      <div
        className="flex items-center justify-between px-6 py-5 cursor-pointer"
        onClick={() => setExpanded(e => !e)}
      >
        <h3 className="font-display text-base font-light text-charcoal">{title}</h3>
        <span className="text-muted text-sm select-none">{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div className="border-t border-sage/10 px-6 py-5">
          <pre className="text-sm text-charcoal/80 leading-relaxed whitespace-pre-wrap font-sans mb-5">{body}</pre>
          <button
            onClick={copy}
            className="text-[0.7rem] tracking-[0.1em] uppercase px-5 py-2.5 rounded-full border border-sage/30 text-sage hover:bg-sage hover:text-white transition-colors"
          >
            {copied ? 'Copied ✓' : 'Copy template'}
          </button>
        </div>
      )}
    </div>
  )
}

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-sage/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-light text-charcoal">Client Hub</h1>
          <p className="text-muted text-xs">Harmonized Therapies</p>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/portal/clients" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Clients</Link>
          <Link href="/portal/invoices" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Invoices</Link>
          <Link href="/portal/newsletter" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Newsletter</Link>
          <Link href="/portal/templates" className="text-[0.7rem] tracking-[0.12em] uppercase text-sage font-[400]">Templates</Link>
          <Link href="/" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Website</Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h2 className="font-display text-2xl font-light text-charcoal">Text Message Templates</h2>
          <p className="text-muted text-sm mt-1">Copy and paste into a text message. Replace anything in [brackets] before sending.</p>
        </div>

        <div className="space-y-4 mb-14">
          {smsTemplates.map(t => (
            <TemplateCard key={t.id} title={t.title} body={t.body} />
          ))}
        </div>

        <div className="mb-8">
          <h2 className="font-display text-2xl font-light text-charcoal">Email Templates</h2>
          <p className="text-muted text-sm mt-1">Click a template to expand, then copy and paste into your email.</p>
        </div>

        <div className="space-y-4">
          {templates.map(t => (
            <TemplateCard key={t.id} title={t.title} body={t.body} />
          ))}
        </div>
      </main>
    </div>
  )
}
