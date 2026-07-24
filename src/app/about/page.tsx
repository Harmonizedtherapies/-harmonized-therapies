import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Testimonials from '@/components/Testimonials'
import ParallaxImage from '@/components/ParallaxImage'

export const metadata: Metadata = {
  title: 'About Danielle Brierley',
  description:
    'Danielle Brierley is a certified massage therapist, Havening Techniques® practitioner, and holistic healer based in the Yarra Valley, Melbourne. 14 years of heart-centred healing — specialising in oncology massage, palliative care, grief support, and trauma healing.',
}

export default function AboutPage() {
  const credentials = [
    'Certified Massage Therapist',
    'Havening Techniques Practitioner',
    'Oncology Massage Level 1 & 2',
    'Eastern Palliative Care — Clinical Experience',
    'Access Bars Practitioner',
    'NLP Practitioner',
    'Conversational Hypnotherapist',
    'Belief Change Practitioner',
    'Meditation & Well-being Coach',
  ]

  return (
    <>
      {/* ─── HERO PHOTO ─── */}
      <section className="relative h-[70vh] overflow-hidden bg-charcoal pt-[80px]">
        <ParallaxImage
          src="/Images/IMG_0467.PNG"
          alt="Yarra Valley — Harmonized Therapies"
          priority
          quality={95}
        />
        <div className="absolute inset-0 bg-charcoal/20" />
      </section>

      {/* ─── HERO TEXT ─── */}
      <section className="bg-charcoal py-16 px-6 lg:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-[0.7rem] tracking-[0.25em] uppercase text-sage-light/70 mb-4 font-[400]">About Danielle</p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-white leading-tight mb-5">
            For the women who have spent<br />
            <em className="italic text-sage">a lifetime holding everyone else.</em>
          </h1>
          <p className="text-white/70 text-lg font-light leading-relaxed max-w-xl mx-auto">
            Holding space for grief, healing and becoming — Yarra Valley, Melbourne.
          </p>
        </div>
      </section>

      {/* ─── STORY ─── */}
      <section className="bg-cream py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="rounded-3xl overflow-hidden relative" style={{aspectRatio: '4/5', maxHeight: '640px'}}>
            <Image
              src="/Images/danielle-portrait.png"
              alt="Danielle Brierley — founder of Harmonized Therapies"
              fill
              className="object-cover object-[center_20%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={95}
            />
          </div>

          <div>
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-4 font-[400]">My Story</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-light text-charcoal mb-6">
              Where Harmonized Therapies began
            </h2>

            <div className="space-y-5 text-charcoal/70 leading-relaxed">
              <p>
                I never set out to become a therapist. I simply followed the people who had quietly held me,
                and somewhere along the way, I realised I wanted to become one of them too.
              </p>
              <p>
                Life has taken me through motherhood, miscarriage, grief, hospital rooms, healing and many
                seasons of beginning again. Along the way, I discovered that some of the most important
                people in our lives are what I call <em>The Quiet Holders</em> — the ones who stay. The
                ones who sit beside us when words aren&apos;t enough. The ones who carry hope when we can&apos;t.
              </p>
              <p>
                For more than fourteen years, I have had the privilege of supporting people through massage,
                oncology and palliative care, Havening Techniques&reg;, meditation and nervous system healing.
                Yet the greatest lessons I&apos;ve learned have not come from books or courses. They came from
                life itself.
              </p>
              <p>
                Through my own experiences, I learned that healing isn&apos;t about fixing ourselves. It isn&apos;t
                about having all the answers. Sometimes healing is simply being seen. Being heard. Feeling
                safe enough to exhale.
              </p>
              <p>
                Today, through Harmonized Therapies and The Quiet Corner, I hold space for women navigating
                stress, grief, life&apos;s transitions and those seasons where we no longer quite recognise
                ourselves. I believe healing is a lifelong returning to ourselves. And I believe no one
                should have to walk that journey alone.
              </p>
              <p className="text-charcoal/80 font-light italic">
                I&apos;m so glad you&apos;re here. Danielle x
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
              { title: 'Mind', text: 'Your mind shapes your reality. Cultivating a positive, empowered mindset is key to personal growth and lasting transformation.' },
              { title: 'Body', text: 'Your body is your vessel. Caring for your physical health through massage and nourishment helps restore energy and vitality.' },
              { title: 'Soul', text: 'Your soul is your essence, the source of inner wisdom and deep connection to yourself and the world around you.' },
            ].map(({ title, text }) => (
              <div key={title} className="bg-white rounded-2xl p-8 border border-warm-white text-center hover:shadow-md transition-shadow">
                <div className="w-6 h-px bg-gold/50 mx-auto mb-5" />
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
            &ldquo;Some seasons break us open.<br />Some teach us how to hold others.<br />And some quietly teach us how to finally hold ourselves.&rdquo;
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
