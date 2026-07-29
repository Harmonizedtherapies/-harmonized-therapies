import Link from 'next/link'
import type { Metadata } from 'next'
import MeditationPlayer from '@/components/MeditationPlayer'
import FadeIn from '@/components/FadeIn'
import FloatingOrbs from '@/components/FloatingOrbs'

export const metadata: Metadata = {
  title: 'Sleep & Surrender — Guided Meditation',
  description:
    'A free guided sleep meditation by Danielle Brierley of Harmonized Therapies. A gentle journey into deep rest for anyone whose nervous system has forgotten how to let go.',
}

const sections = [
  {
    heading: 'Settling In',
    text: 'You are guided to soften every part of your body, from the crown of your head to the soles of your feet — releasing the day with each slow breath out.',
  },
  {
    heading: 'The Breath',
    text: 'A gentle 4-7-8 breathing practice to slow your nervous system and invite your body into the deep rest it has been waiting for.',
  },
  {
    heading: 'Body Scan',
    text: 'Moving softly through the body — noticing, releasing, letting go. Areas of tension are met with warmth, not force.',
  },
  {
    heading: 'The Night Sky',
    text: 'You are taken gently into a vast, quiet night — stars above, earth below, nothing required of you. Simply to exist. To drift.',
  },
  {
    heading: 'Havening Touch',
    text: 'Optional self-havening — soft strokes along the arms and face that create delta waves in the brain, deepening sleep naturally.',
  },
  {
    heading: 'Surrender',
    text: 'A final invitation to release the day completely. To trust that you have done enough. To let sleep find you.',
  },
]

export default function SleepMeditationPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center bg-[#0d0f1a] overflow-hidden">
        {/* Star field */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: i % 7 === 0 ? '2px' : '1px',
                height: i % 7 === 0 ? '2px' : '1px',
                top: `${(i * 37 + 13) % 100}%`,
                left: `${(i * 61 + 7) % 100}%`,
                opacity: ((i % 5) + 1) * 0.12,
              }}
            />
          ))}
          <div className="absolute top-16 right-24 w-40 h-40 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute top-16 right-24 w-20 h-20 rounded-full bg-gold/15 blur-xl" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#111827]/80 to-transparent" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 lg:px-10 pt-36 pb-24 text-center w-full">
          <p className="text-[0.68rem] tracking-[0.3em] uppercase text-gold/50 mb-6 font-[400]">
            Free Guided Meditation · Approx. 21 minutes
          </p>
          <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-light text-cream italic leading-tight mb-5">
            Sleep &amp; Surrender
          </h1>
          <div className="w-16 h-px bg-gold/30 mx-auto mb-7" />
          <p className="text-cream/50 text-lg font-light leading-relaxed max-w-xl mx-auto mb-3">
            A guided meditation for deep rest, nervous system healing,
            and the gentle art of letting the day go.
          </p>
          <p className="text-cream/30 text-sm">
            Best listened to in bed · Headphones recommended
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/20 animate-bounce">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ─── PLAYER ─── */}
      <section className="bg-[#111827] py-16 px-6 lg:px-10">
        <FadeIn className="max-w-lg mx-auto">
          <MeditationPlayer
            src="/audio/sleep-and-surrender.m4a"
            title="Sleep & Surrender"
          />
          <p className="text-center text-cream/30 text-xs mt-5 leading-relaxed">
            If you have been introduced to Havening, you may like to softly begin
            havening your arms or face as you drift into sleep.
          </p>
        </FadeIn>
      </section>

      {/* ─── WHAT TO EXPECT ─── */}
      <section className="bg-[#0d0f1a] py-24 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-gold/50 mb-3 font-[400]">What unfolds</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-light text-cream italic">
              A journey in six moments
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map(({ heading, text }, i) => (
              <FadeIn key={heading} delay={i * 0.1}>
                <div className="rounded-2xl border border-white/6 bg-white/3 p-7 h-full">
                  <span className="text-[0.62rem] tracking-[0.2em] uppercase text-gold/40 font-[400] block mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-xl font-light text-cream italic mb-3">{heading}</h3>
                  <p className="text-cream/40 text-sm leading-relaxed">{text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FROM DANIELLE ─── */}
      <section className="bg-[#111827] py-20 px-6 lg:px-10 relative overflow-hidden">
        <FadeIn className="max-w-3xl mx-auto text-center relative">
          <blockquote className="font-display text-[clamp(1.3rem,2.5vw,2rem)] italic text-cream font-light leading-relaxed mb-6">
            &ldquo;Sleep is not laziness. It is medicine. And so many of the people I work with
            haven&apos;t truly rested in years — not because they don&apos;t try, but because
            their nervous system never got the memo that the danger has passed.
            This meditation is that memo.&rdquo;
          </blockquote>
          <div className="w-12 h-px bg-gold/30 mx-auto mb-5" />
          <cite className="text-[0.72rem] tracking-[0.18em] uppercase text-gold/50 not-italic">
            — Danielle Brierley
          </cite>
        </FadeIn>
      </section>

      {/* ─── ALSO TRY ─── */}
      <section className="bg-[#0d0f1a] py-16 px-6 lg:px-10 border-t border-white/5">
        <FadeIn className="max-w-4xl mx-auto">
          <p className="text-[0.68rem] tracking-[0.22em] uppercase text-gold/40 mb-8 font-[400] text-center">
            Also in the library
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/meditation"
              className="group rounded-2xl border border-white/8 bg-white/3 p-7 flex items-center justify-between hover:border-sage/30 transition-colors"
            >
              <div>
                <p className="text-[0.65rem] tracking-[0.18em] uppercase text-sage/60 mb-1 font-[400]">Available now</p>
                <h3 className="font-display text-lg font-light text-cream italic">Coming Home to Yourself</h3>
                <p className="text-cream/35 text-sm mt-1">A grounding meditation for rest &amp; release</p>
              </div>
              <span className="text-sage/50 group-hover:text-sage group-hover:translate-x-1 transition-all">→</span>
            </Link>
            <a
              href="/self-havening-guide-harmonized-therapies.pdf"
              download
              className="group rounded-2xl border border-white/8 bg-white/3 p-7 flex items-center justify-between hover:border-gold/30 transition-colors"
            >
              <div>
                <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gold/50 mb-1 font-[400]">Free download</p>
                <h3 className="font-display text-lg font-light text-cream italic">Self-Havening Guide</h3>
                <p className="text-cream/35 text-sm mt-1">A 5-minute calming practice for any moment</p>
              </div>
              <span className="text-gold/50 group-hover:text-gold group-hover:translate-x-1 transition-all">→</span>
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
