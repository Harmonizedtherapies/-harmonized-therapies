import type { Metadata } from 'next'
import Link from 'next/link'
import MeditationPlayer from '@/components/MeditationPlayer'
import FadeIn from '@/components/FadeIn'
import FloatingOrbs from '@/components/FloatingOrbs'

export const metadata: Metadata = {
  title: 'Coming Home to Yourself — Guided Meditation',
  description:
    'A free guided meditation by Danielle Brierley of Harmonized Therapies. A grounding, forest-walk meditation for rest, release, and coming home to yourself.',
}

const sections = [
  {
    heading: 'Welcome',
    text: 'Find a comfortable position — sitting or lying down. Let your hands rest gently in your lap or by your sides. There is nowhere else you need to be. Nothing you need to fix. Nothing you need to become.',
  },
  {
    heading: 'Grounding',
    text: 'Feel the weight of your body. Press your feet gently into the floor. The earth is holding you right now — it has always been holding you. Breathe in … and let it go.',
  },
  {
    heading: 'Colour Breathing',
    text: 'Think of a colour that feels safe and warm — soft gold, deep forest green, gentle rose. Breathe it in slowly, watch it fill your heart. Breathe out anything heavy that isn\'t yours to carry.',
  },
  {
    heading: 'The Forest Walk',
    text: 'You are standing at the edge of a forest. The air is cool and clean. You can smell the earth after rain. Trees reach up like a cathedral — soft light dappling the path ahead in gold and green.',
  },
  {
    heading: 'The Sanctuary',
    text: 'A clearing bathed in warm golden light. A place made just for you. You arrive, and something releases in your chest. You can rest here. You are safe — completely safe.',
  },
  {
    heading: 'Affirmations',
    text: 'You are safe. You are held. You are not alone. You are allowed to rest. You are becoming. Everything you have carried has made you tender — and tender is powerful.',
  },
]

export default function MeditationPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[75vh] flex items-center bg-charcoal overflow-hidden">
        <FloatingOrbs />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />

        <div className="relative max-w-3xl mx-auto px-6 lg:px-10 pt-32 pb-24 text-center w-full">
          <p className="text-[0.7rem] tracking-[0.28em] uppercase text-gold/60 mb-5 font-[400]">
            Free Guided Meditation
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-cream italic leading-tight mb-6">
            Coming Home<br />to Yourself
          </h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-6" />
          <p className="text-cream/60 text-lg font-light leading-relaxed max-w-xl mx-auto mb-4">
            A grounding meditation for rest, release, and returning to the quiet within.
            Guided by Danielle Brierley of Harmonized Therapies.
          </p>
          <p className="text-cream/35 text-sm">
            Approx. 15–20 minutes · Find somewhere comfortable · Headphones recommended
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/25 animate-bounce">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ─── PLAYER ─── */}
      <section className="bg-charcoal py-16 px-6 lg:px-10">
        <FadeIn className="max-w-lg mx-auto">
          <MeditationPlayer
            src="/audio/coming-home-to-yourself.m4a"
            title="Coming Home to Yourself"
          />
          <p className="text-center text-cream/30 text-xs mt-5 leading-relaxed">
            If you have been introduced to Havening, you may like to softly begin
            havening your arms, face, or hands as we move through this together.
          </p>
        </FadeIn>
      </section>

      {/* ─── WHAT TO EXPECT ─── */}
      <section className="bg-warm-white py-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-3 font-[400]">What unfolds</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-light text-charcoal">
              A journey in six moments
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map(({ heading, text }, i) => (
              <FadeIn key={heading} delay={i * 0.1}>
                <div className="luxury-card bg-white rounded-2xl p-7 border border-warm-white h-full">
                  <span className="text-[0.62rem] tracking-[0.2em] uppercase text-gold font-[400] block mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-xl font-light text-charcoal mb-3">{heading}</h3>
                  <p className="text-muted text-sm leading-relaxed">{text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HAVENING NOTE ─── */}
      <section className="bg-cream py-16 px-6 lg:px-10">
        <FadeIn className="max-w-3xl mx-auto">
          <div className="bg-sage/8 border border-sage/20 rounded-3xl p-8 lg:p-10">
            <p className="text-[0.68rem] tracking-[0.2em] uppercase text-sage mb-4 font-[400]">A note on Havening</p>
            <p className="text-charcoal/70 leading-relaxed mb-4">
              During this meditation, you are invited to use gentle self-soothing Havening touch —
              softly stroking your upper arms, your face, or the palms of your hands. This
              psychosensory technique creates delta waves in the brain and deepens the relaxation
              response beautifully alongside meditation.
            </p>
            <p className="text-charcoal/70 leading-relaxed">
              If you are new to Havening, simply rest comfortably and allow the words to guide you.
              There is no wrong way to be here.
            </p>
            <div className="mt-6">
              <Link
                href="/services#havening"
                className="text-[0.72rem] tracking-[0.1em] uppercase text-sage border-b border-sage/40 pb-0.5 hover:border-sage transition-colors"
              >
                Learn more about Havening →
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── FROM DANIELLE ─── */}
      <section className="bg-charcoal py-20 px-6 lg:px-10 relative overflow-hidden">
        <FloatingOrbs />
        <FadeIn className="max-w-3xl mx-auto text-center relative">
          <blockquote className="font-display text-[clamp(1.3rem,2.5vw,2rem)] italic text-cream font-light leading-relaxed mb-6">
            &ldquo;You don&apos;t need to earn rest. You don&apos;t need to be in crisis to deserve
            stillness. This meditation is simply a doorway — back to yourself, back to safety,
            back to the quiet that was always there.&rdquo;
          </blockquote>
          <div className="w-12 h-px bg-gold/40 mx-auto mb-5" />
          <cite className="text-[0.72rem] tracking-[0.18em] uppercase text-gold/70 not-italic">
            — Danielle Brierley
          </cite>
        </FadeIn>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-cream py-20 px-6 lg:px-10 text-center">
        <FadeIn className="max-w-xl mx-auto">
          <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-4 font-[400]">Go deeper</p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light text-charcoal mb-5">
            Ready for a one-on-one session?
          </h2>
          <p className="text-muted leading-relaxed mb-8">
            If this meditation moved something in you, a private Havening or holistic session
            with Danielle can take that healing much further. Book a free discovery call to find
            the right path for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=Free Discovery Call"
              className="bg-sage text-white text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-sage-dark transition-colors"
            >
              Book a Free Discovery Call
            </a>
            <Link
              href="/services"
              className="border border-charcoal/20 text-charcoal text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:border-charcoal/40 transition-colors"
            >
              Explore All Services
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
