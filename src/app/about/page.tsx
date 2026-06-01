import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Testimonials from '@/components/Testimonials'

export const metadata: Metadata = {
  title: 'About Danielle Brierley',
  description:
    'Danielle Brierley is a certified massage therapist, Havening Techniques® practitioner, and holistic healer based in the Yarra Valley, Melbourne. 14 years of heart-centred healing — specialising in oncology massage, palliative care, grief support, and trauma healing.',
}

export default function AboutPage() {
  const credentials = [
    'Certified Massage Therapist',
    'Havening Techniques® Practitioner',
    'Oncology Massage Level 1 & 2',
    'Eastern Palliative Care — Clinical Experience',
    'Access Bars® Practitioner',
    'NLP Practitioner',
    'Conversational Hypnotherapist',
    'Belief Change Practitioner',
    'Meditation & Well-being Coach',
  ]

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-charcoal">
        <Image
          src="/Images/danielle-outdoor-portrait.png"
          alt="Danielle Brierley — Harmonized Therapies"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/20" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 pb-20 pt-40 text-center w-full">
          <p className="text-[0.7rem] tracking-[0.25em] uppercase text-sage-light/70 mb-4 font-[400]">About Danielle</p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-cream leading-tight mb-6">
            14 Years of<br /><em className="italic">Heart-Centred Healing</em>
          </h1>
          <p className="text-cream/60 text-lg font-light leading-relaxed max-w-xl mx-auto">
            Massage therapist, Havening practitioner, and grief space holder — Danielle brings
            her whole self to every session.
          </p>
        </div>
      </section>

      {/* ─── STORY ─── */}
      <section className="bg-cream py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="rounded-3xl overflow-hidden aspect-[4/5] relative">
            <Image
              src="/Images/danielle-outdoor-portrait.png"
              alt="Danielle Brierley — founder of Harmonized Therapies"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-4 font-[400]">My Story</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-light text-charcoal mb-6">
              Where Harmonized Therapies began
            </h2>

            <div className="space-y-5 text-charcoal/70 leading-relaxed">
              <p>
                Hi, I&apos;m Danielle Brierley — founder of Harmonized Therapies, based in the beautiful
                Yarra Valley, Melbourne. I have been a massage therapist for over 14 years. But the
                reason I do this work began long before any qualification.
              </p>
              <p>
                I have experienced miscarriage — the invisible kind that women were expected to endure
                quietly, with no ceremony and no real space to grieve. I have spent weeks in hospital
                without my newborn son, unable to walk, expressing milk for a baby I couldn&apos;t yet hold,
                watching the screens and praying. I have sat in rooms where the curtains were pulled
                around tiny babies who weren&apos;t going to make it. I have lived the weight of what it
                means to carry things alone.
              </p>
              <p>
                And I have experienced the profound difference that one person — one quiet holder — can
                make. A nurse who stays. A hand that reaches. A presence that says: <em>I see you.
                You are not alone.</em> That changed everything for me.
              </p>
              <p>
                It is why I trained in therapeutic, oncology, palliative, and relaxation massage. It is
                why I became a Havening Techniques® Practitioner. It is why I hold space for grief and
                birth trauma and the things that have no name. Not because I studied them — but because
                I have lived them. And I wanted to become the kind of person who holds others through them.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[['14+', 'Years experience'], ['6+', 'Modalities'], ['Free', 'Discovery call']].map(([val, label]) => (
                <div key={label} className="text-center bg-warm-white rounded-2xl p-5 border border-sage/10">
                  <strong className="block font-display text-3xl text-sage font-light">{val}</strong>
                  <span className="text-[0.68rem] text-muted uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section className="bg-warm-white py-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-4 font-[400]">My philosophy</p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light text-charcoal mb-8">
            The Mind, Body &amp; Soul Connection
          </h2>
          <p className="text-muted leading-relaxed max-w-xl mx-auto mb-14">
            When these three elements work in balance, we experience greater harmony, resilience,
            and overall health. True healing happens when we nurture the whole self.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🧠', title: 'Mind', text: 'Your mind shapes your reality. Cultivating a positive, empowered mindset is key to personal growth and lasting transformation.' },
              { icon: '🌿', title: 'Body', text: 'Your body is your vessel. Caring for your physical health through massage and nourishment helps restore energy and vitality.' },
              { icon: '✨', title: 'Soul', text: 'Your soul is your essence — the source of inner wisdom and deep connection to yourself and the world around you.' },
            ].map(({ icon, title, text }) => (
              <div key={title} className="bg-white rounded-2xl p-8 border border-warm-white text-center hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-4">{icon}</span>
                <h3 className="font-display text-2xl font-light text-charcoal mb-3">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CREDENTIALS ─── */}
      <section className="bg-cream py-20 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-4 font-[400]">Training &amp; Qualifications</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-light text-charcoal">
              Certifications &amp; Expertise
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {credentials.map(cred => (
              <div key={cred} className="flex items-start gap-3 bg-warm-white rounded-xl p-4 border border-sage/10">
                <span className="text-sage mt-0.5 flex-shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l4 4 6-6" />
                  </svg>
                </span>
                <span className="text-sm text-charcoal/80 leading-snug">{cred}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <Testimonials heading="What Clients Say About Danielle" />

      {/* ─── QUOTE ─── */}
      <section className="bg-charcoal py-20 px-6 lg:px-10 text-center">
        <div className="max-w-3xl mx-auto">
          <blockquote className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-cream italic font-light leading-relaxed mb-6">
            &ldquo;Not as the one being held —<br />but as the one who holds.<br />That is why I do what I do.&rdquo;
          </blockquote>
          <cite className="text-[0.72rem] tracking-[0.18em] uppercase text-gold/70 not-italic">
            — Danielle Brierley
          </cite>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-cream py-20 px-6 lg:px-10 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal mb-5">
            Ready to begin?
          </h2>
          <p className="text-muted leading-relaxed mb-8">
            Book a free discovery call and let&apos;s find the right path forward for you.
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
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
