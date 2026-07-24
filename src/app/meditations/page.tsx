'use client'

import { useState } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import FloatingOrbs from '@/components/FloatingOrbs'
import ComingHomeSignup from '@/components/ComingHomeSignup'

const meditations = [
  {
    slug: '/meditation',
    title: 'Coming Home to Yourself',
    description: 'A grounding forest-walk meditation for rest, release, and returning to the quiet within. Begin here.',
    duration: '15–20 min',
    theme: 'Grounding · Rest · Release',
    num: '01',
    status: 'available' as const,
  },
  {
    slug: '/meditation/sleep',
    title: 'Sleep & Surrender',
    description: 'A gentle journey into deep rest for anyone whose nervous system has forgotten how to let go at the end of the day.',
    duration: '20 min',
    theme: 'Sleep · Nervous System · Surrender',
    num: '02',
    status: 'recording' as const,
  },
  {
    slug: null,
    title: 'Releasing Grief',
    description: 'A held, tender meditation for anyone carrying loss, spoken or unspoken, witnessed or not. You are allowed to put it down.',
    duration: '~20 min',
    theme: 'Grief · Loss · Release',
    num: '03',
    status: 'soon' as const,
  },
  {
    slug: null,
    title: 'The Nervous System Reset',
    description: 'When anxiety has moved in and won\'t leave. A body-based meditation using breath, Havening touch, and stillness.',
    duration: '~15 min',
    theme: 'Anxiety · Calm · Havening',
    num: '04',
    status: 'soon' as const,
  },
  {
    slug: null,
    title: 'Morning Intentions',
    description: 'Begin your day with softness. A short, grounding practice to set the tone before the world makes its demands.',
    duration: '~10 min',
    theme: 'Morning · Intentions · Clarity',
    num: '05',
    status: 'soon' as const,
  },
  {
    slug: null,
    title: 'For the Quiet Holders',
    description: 'Dedicated to carers, nurses, mothers, and anyone who holds space for others. This one is just for you.',
    duration: '~20 min',
    theme: 'Carers · Replenish · Rest',
    num: '06',
    status: 'soon' as const,
  },
]

const statusLabel = {
  available: 'Listen Now',
  recording: 'Recording in Progress',
  soon: 'Coming Soon',
}

const statusStyle = {
  available: 'bg-sage text-white',
  recording: 'bg-gold/20 text-gold border border-gold/30',
  soon: 'bg-cream/8 text-cream/40 border border-cream/10',
}

export default function MeditationsPage() {
  const available = meditations.filter(m => m.status === 'available')
  const upcoming = meditations.filter(m => m.status !== 'available')

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[70vh] flex items-center bg-charcoal overflow-hidden">
        <FloatingOrbs />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 pt-36 pb-24 text-center w-full">
          <p className="text-[0.68rem] tracking-[0.3em] uppercase text-gold/60 mb-5 font-[400]">
            Free · Guided · Always here
          </p>
          <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] font-light text-cream italic leading-tight mb-6">
            The Meditation Corner
          </h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          <p className="text-cream/55 text-lg font-light leading-relaxed max-w-xl mx-auto">
            A growing library of free guided meditations by Danielle Brierley —
            for rest, grief, anxiety, and the quiet moments in between.
            New recordings added regularly.
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/25 animate-bounce">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ─── AVAILABLE NOW ─── */}
      <section className="bg-warm-white py-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-12">
            <p className="text-[0.68rem] tracking-[0.22em] uppercase text-sage mb-3 font-[400]">Available now</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-light text-charcoal">
              Ready to listen
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-1 gap-5">
            {available.map((m, i) => (
              <FadeIn key={m.title} delay={i * 0.1}>
                <Link href={m.slug!} className="group block">
                  <div className="bg-white rounded-2xl border border-sage/10 p-8 hover:shadow-xl transition-shadow duration-400 grid sm:grid-cols-[auto_1fr_auto] gap-6 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-sage/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-sage text-lg font-light italic">{m.num}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[0.62rem] tracking-[0.18em] uppercase px-3 py-1 rounded-full font-[500] ${statusStyle[m.status]}`}>
                          {statusLabel[m.status]}
                        </span>
                        <span className="text-xs text-muted">{m.duration}</span>
                      </div>
                      <h3 className="font-display text-xl font-light text-charcoal italic mb-2">{m.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{m.description}</p>
                      <p className="text-[0.65rem] tracking-wide uppercase text-sage/60 mt-3">{m.theme}</p>
                    </div>
                    <div className="text-sage text-2xl group-hover:translate-x-1 transition-transform hidden sm:block">→</div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMING SOON ─── */}
      <section className="bg-charcoal py-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-12">
            <p className="text-[0.68rem] tracking-[0.22em] uppercase text-gold/60 mb-3 font-[400]">The series</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-light text-cream">
              Coming to the library
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-4">
            {upcoming.map((m, i) => (
              <FadeIn key={m.title} delay={i * 0.08}>
                {m.slug ? (
                  <Link href={m.slug} className="group block h-full">
                    <div className="rounded-2xl border border-white/8 bg-white/3 p-7 h-full hover:border-gold/20 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <span className="font-display text-cream/30 text-sm font-light italic">{m.num}</span>
                        <span className={`text-[0.6rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full ${statusStyle[m.status]}`}>
                          {statusLabel[m.status]}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-light text-cream italic mb-2">{m.title}</h3>
                      <p className="text-cream/40 text-sm leading-relaxed mb-3">{m.description}</p>
                      <p className="text-[0.62rem] tracking-wide uppercase text-gold/40">{m.theme}</p>
                    </div>
                  </Link>
                ) : (
                  <div className="rounded-2xl border border-white/6 bg-white/2 p-7 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <span className="font-display text-cream/20 text-sm font-light italic">{m.num}</span>
                      <span className={`text-[0.6rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full ${statusStyle[m.status]}`}>
                        {statusLabel[m.status]}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-light text-cream/50 italic mb-2">{m.title}</h3>
                    <p className="text-cream/25 text-sm leading-relaxed mb-3">{m.description}</p>
                    <p className="text-[0.62rem] tracking-wide uppercase text-gold/25">{m.theme}</p>
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIBRARY SIGNUP ─── */}
      <ComingHomeSignup />

      {/* ─── FROM DANIELLE ─── */}
      <section className="bg-charcoal py-20 px-6 lg:px-10 relative overflow-hidden border-t border-white/5">
        <FloatingOrbs />
        <FadeIn className="max-w-3xl mx-auto text-center relative">
          <blockquote className="font-display text-[clamp(1.3rem,2.5vw,2rem)] italic text-cream font-light leading-relaxed mb-6">
            &ldquo;You don&apos;t need to be in a session with me to feel held.
            These meditations are my way of reaching through the screen —
            to sit with you wherever you are, for as long as you need.&rdquo;
          </blockquote>
          <div className="w-12 h-px bg-gold/40 mx-auto mb-5" />
          <cite className="text-[0.72rem] tracking-[0.18em] uppercase text-gold/60 not-italic">
            — Danielle Brierley
          </cite>
          <div className="mt-10">
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=Free Discovery Call"
              className="inline-block bg-sage text-white text-[0.75rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-sage-dark transition-colors"
            >
              Book a Free Discovery Call
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
