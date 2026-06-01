import Link from 'next/link'
import Image from 'next/image'
import Testimonials from '@/components/Testimonials'
import FadeIn from '@/components/FadeIn'
import BotanicalDivider from '@/components/BotanicalDivider'

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center bg-charcoal overflow-hidden">
        {/* Botanical bg decorations */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
          <svg viewBox="0 0 800 800" className="absolute -top-40 -right-40 w-[700px] h-[700px] text-sage" fill="currentColor">
            <ellipse cx="400" cy="200" rx="180" ry="320" opacity="0.4" />
            <ellipse cx="400" cy="200" rx="320" ry="180" opacity="0.25" />
            <ellipse cx="580" cy="350" rx="120" ry="210" opacity="0.3" />
          </svg>
          <svg viewBox="0 0 400 400" className="absolute -bottom-20 -left-20 w-[400px] h-[400px] text-sage-dark" fill="currentColor">
            <ellipse cx="200" cy="280" rx="140" ry="200" opacity="0.5" />
          </svg>
        </div>

        {/* Gold line accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center pt-24 pb-20">
          {/* Left — copy */}
          <div>
            <p className="text-[0.7rem] tracking-[0.25em] uppercase text-sage mb-6 font-[400]">
              Yarra Valley, Melbourne · Holistic Wellness
            </p>
            <h1 className="font-display text-[clamp(3rem,6vw,5rem)] font-light leading-[1.05] text-cream mb-7">
              You were never meant<br />
              to carry this{' '}
              <em className="text-sage italic">alone.</em>
            </h1>
            <p className="text-cream/60 text-lg font-light leading-relaxed max-w-md mb-10">
              A space for grief, healing and becoming. Through massage, Havening,
              and holistic therapy, Danielle holds space for women ready to heal.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/services"
                className="bg-sage text-white text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-sage-dark transition-colors"
              >
                Work With Me
              </Link>
              <Link
                href="/retreats"
                className="border border-cream/30 text-cream text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:border-cream/60 transition-colors"
              >
                Join a Retreat
              </Link>
              <Link
                href="/about"
                className="text-cream/60 text-[0.78rem] tracking-[0.06em] uppercase border-b border-gold/50 pb-0.5 hover:text-cream hover:border-gold transition-colors"
              >
                Read My Story
              </Link>
            </div>
          </div>

          {/* Right — Danielle portrait */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-[340px] h-[440px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/Images/danielle-outdoor-portrait.png"
                alt="Danielle Brierley — Harmonized Therapies"
                fill
                className="object-cover object-center"
                priority
                sizes="340px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <h2 className="font-display text-2xl text-cream font-light mb-0.5">Danielle Brierley</h2>
                <p className="text-[0.7rem] tracking-[0.12em] uppercase text-sage-mid">
                  Massage Therapist &amp; Holistic Practitioner
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/30 animate-bounce">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ─── BRAND COLLAGE ─── */}
      <section className="bg-charcoal py-16 px-6 lg:px-10">
        <FadeIn className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[0.68rem] tracking-[0.25em] uppercase text-gold/60 mb-3 font-[400]">From Danielle</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-light text-cream">
              The Journey Back to You
            </h2>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/Images/danielle-brand-collage-2.png"
              alt="Danielle Brierley — healing, heart-centred practice in the Yarra Valley"
              width={1000}
              height={650}
              className="w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
          </div>
        </FadeIn>
      </section>

      {/* ─── THREE PILLARS ─── */}
      <section className="bg-warm-white py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-3 font-[400]">
              Three ways to work with Danielle
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal">
              Hold. Gather. Retreat.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-1 rounded-2xl overflow-hidden border border-sage/15">
            {[
              {
                tag: 'Hold',
                title: 'One on One Sessions',
                desc: 'Deeply personal healing — massage, Havening, coaching, and NLP. Held with care, tailored to you.',
                href: '/services',
                cta: 'Explore Services',
                bg: 'bg-white',
              },
              {
                tag: 'Gather',
                title: 'Workshops & Events',
                desc: 'Come together in a warm, supported group space to heal, share, and become. Half or full day workshops.',
                href: '/retreats',
                cta: 'View Workshops',
                bg: 'bg-sage-light/40',
              },
              {
                tag: 'Retreat',
                title: 'The Quiet Holders Retreat',
                desc: 'Overnight and weekend retreats — nature-based, spiritual, grounded. For those ready to go deeper.',
                href: '/retreats',
                cta: 'Explore Retreats',
                bg: 'bg-white',
              },
            ].map(({ tag, title, desc, href, cta, bg }) => (
              <div key={tag} className={`${bg} p-10 flex flex-col gap-4`}>
                <span className="text-[0.68rem] tracking-[0.2em] uppercase text-sage font-[400]">{tag}</span>
                <h3 className="font-display text-2xl font-light text-charcoal">{title}</h3>
                <p className="text-muted text-sm leading-relaxed flex-1">{desc}</p>
                <Link
                  href={href}
                  className="self-start text-[0.72rem] tracking-[0.1em] uppercase text-sage border-b border-sage/40 pb-0.5 hover:border-sage transition-colors"
                >
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section className="bg-cream py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-3 font-[400]">What I offer</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal">Healing Therapies</h2>
            </div>
            <Link
              href="/services"
              className="self-start md:self-auto text-[0.72rem] tracking-[0.1em] uppercase text-sage border-b border-sage/40 pb-0.5 hover:border-sage transition-colors whitespace-nowrap"
            >
              View all services →
            </Link>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🌿', name: 'Massage Therapy', desc: 'Pure essential oils, hot stones, and natural oils — tailored to your unique needs.' },
              { icon: '✋', name: 'Havening Techniques®', desc: 'Science-backed psychosensory touch that creates rapid, lasting emotional change.' },
              { icon: '🌸', name: 'Oncology Massage', desc: 'Specialised and deeply caring massage for individuals at all stages of their cancer journey.' },
              { icon: '🕊️', name: 'Palliative Massage', desc: 'Compassionate, gentle care for those facing life-limiting illness. Mobile services available.' },
              { icon: '✨', name: 'Access Bars®', desc: 'Gentle touch of 32 points on the head to release limitations and create more ease and clarity.' },
              { icon: '🧠', name: 'NLP & Hypnotherapy', desc: 'Shift patterns, release limiting beliefs, and step into a more empowered version of yourself.' },
            ].map(({ icon, name, desc }) => (
              <div
                key={name}
                className="bg-white rounded-2xl p-7 border border-warm-white hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span className="text-2xl mb-4 block">{icon}</span>
                <h3 className="font-display text-xl font-light text-charcoal mb-2">{name}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT DANIELLE ─── */}
      <section className="bg-sage-dark py-24 px-6 lg:px-10 overflow-hidden relative">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none">
          <svg viewBox="0 0 300 600" className="w-full h-full text-cream" fill="currentColor">
            <ellipse cx="150" cy="300" rx="150" ry="280" />
          </svg>
        </div>
        <FadeIn className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative">
          <div>
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage-light/70 mb-4 font-[400]">About Danielle</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-cream italic leading-tight mb-8">
              &ldquo;I want to inspire people. I want someone to look at me and say — because of you, I didn&apos;t give up.&rdquo;
            </h2>
            <p className="text-cream/50 text-[0.78rem] tracking-[0.15em] uppercase">— Danielle Brierley</p>
          </div>
          <div>
            <p className="text-cream/70 leading-relaxed mb-5">
              Hi, I&apos;m Danielle Brierley — founder of Harmonized Therapies, based in the beautiful Yarra Valley,
              Melbourne. Over 14 years I&apos;ve worked as a massage therapist and holistic practitioner. But the
              real reason I do this work runs much deeper than any qualification.
            </p>
            <p className="text-cream/70 leading-relaxed mb-5">
              I have held babies who came too early. I have sat with a grief that had no ceremony and no witness.
              I have spent weeks in a hospital room without my newborn son — learning what it truly means to be
              held, and what it costs when you aren&apos;t.
            </p>
            <p className="text-cream/70 leading-relaxed mb-8">
              That is not a qualification I studied for. That is a life. And it is why people feel seen in my space.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['Certified Massage Therapist', 'Havening Techniques®', 'Oncology Massage L1 & L2', 'Access Bars®', 'NLP & Hypnotherapy'].map(tag => (
                <span key={tag} className="text-[0.7rem] tracking-wide px-3 py-1.5 border border-cream/20 text-cream/60 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/about"
              className="inline-block bg-transparent border border-cream/30 text-cream text-[0.75rem] tracking-[0.1em] uppercase px-6 py-3 rounded-full hover:border-cream/60 transition-colors"
            >
              Read My Story
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <Testimonials />

      {/* ─── THE QUIET HOLDERS ─── */}
      <section className="bg-charcoal py-24 px-6 lg:px-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <svg viewBox="0 0 800 400" className="w-full h-full text-gold" fill="currentColor">
            <circle cx="400" cy="200" r="280" />
          </svg>
        </div>
        <FadeIn className="max-w-3xl mx-auto relative">
          <p className="text-[0.7rem] tracking-[0.25em] uppercase text-gold/70 mb-4 font-[400]">Sub-brand</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light text-cream italic mb-5">
            The Quiet Holders
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-7" />
          <p className="text-cream/60 text-lg font-light leading-relaxed mb-10">
            Holding space for grief, healing &amp; becoming. A deck of 44 oracle cards, upcoming book,
            workshops and retreats — for those who carry too much, alone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/the-quiet-holders"
              className="bg-gold text-charcoal text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-gold/80 transition-colors"
            >
              Explore The Quiet Holders
            </Link>
            <Link
              href="/oracle-cards"
              className="border border-cream/20 text-cream text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:border-cream/40 transition-colors"
            >
              Oracle Cards
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ─── ORACLE CARD TEASER ─── */}
      <section className="bg-gold-light py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Oracle card image */}
          <div className="flex justify-center">
            <div className="rounded-3xl overflow-hidden shadow-xl w-full max-w-[320px]">
              <Image
                src="/Images/oracle-card-you-are-not-alone.png"
                alt="The Quiet Holders Oracle — You Are Not Alone card"
                width={500}
                height={650}
                className="w-full object-cover"
                sizes="(max-width: 1024px) 80vw, 320px"
              />
            </div>
          </div>
          <div>
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-3 font-[400]">Oracle Cards</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal mb-5">
              44 cards to guide you back to your truth
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Messages for the soul. Healing for the heart. The Quiet Holders Oracle is a 44-card deck
              created to support your healing, ground you when you&apos;re lost, and remind you that you
              are not alone.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Warm, earthy, and soulful — these cards are for daily draws, grief circles, retreats,
              and the quiet moments in between.
            </p>
            <Link
              href="/oracle-cards"
              className="inline-block bg-sage text-white text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-sage-dark transition-colors"
            >
              Explore the Deck
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STORY PULL ─── */}
      <section className="bg-charcoal py-24 px-6 lg:px-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <svg viewBox="0 0 800 400" className="w-full h-full text-gold" fill="currentColor">
            <circle cx="400" cy="200" r="320" />
          </svg>
        </div>
        <div className="max-w-3xl mx-auto relative">
          <p className="text-[0.68rem] tracking-[0.3em] uppercase text-gold/60 mb-8 font-[400]">The origin of The Quiet Holders</p>
          <blockquote className="font-display text-[clamp(1.5rem,3vw,2.4rem)] text-cream italic font-light leading-relaxed mb-8">
            &ldquo;They weren&apos;t just nurses and staff. They were The Quiet Holders — the ones who stood in the
            space between fear and hope, holding life when we couldn&apos;t.
            <br /><br />
            Somewhere along the journey of healing, I realised I wanted to become one too.&rdquo;
          </blockquote>
          <div className="w-12 h-px bg-gold/40 mx-auto mb-6" />
          <cite className="text-[0.72rem] tracking-[0.18em] uppercase text-gold/70 not-italic">
            — Danielle Brierley
          </cite>
          <div className="mt-10">
            <Link
              href="/about"
              className="text-cream/50 text-[0.75rem] tracking-[0.1em] uppercase border-b border-cream/20 pb-0.5 hover:text-cream hover:border-cream/50 transition-colors"
            >
              Read Danielle&apos;s Story →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM ─── */}
      <section className="bg-warm-white py-20 px-6 lg:px-10">
        <FadeIn className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-3 font-[400]">Follow Along</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-light text-charcoal mb-3">
              @harmonized_therapies
            </h2>
            <p className="text-muted text-sm max-w-md mx-auto">
              Behind the scenes, healing insights, oracle card pulls, and moments from the Yarra Valley.
            </p>
          </div>
          {/* Placeholder grid — styled to look like an Instagram feed */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {[
              { bg: 'bg-sage-dark', label: 'Massage & Healing' },
              { bg: 'bg-gold-light', label: 'Oracle Cards' },
              { bg: 'bg-charcoal', label: 'The Quiet Holders' },
              { bg: 'bg-sage-light/60', label: 'Yarra Valley' },
            ].map(({ bg, label }) => (
              <a
                key={label}
                href="https://www.instagram.com/harmonized_therapies"
                target="_blank"
                rel="noopener noreferrer"
                className={`${bg} aspect-square rounded-2xl flex items-end p-4 group overflow-hidden relative hover:opacity-90 transition-opacity`}
              >
                <span className="text-[0.65rem] tracking-[0.15em] uppercase text-white/70 group-hover:text-white transition-colors">{label}</span>
              </a>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://www.instagram.com/harmonized_therapies"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-charcoal text-cream text-[0.75rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-charcoal/80 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow on Instagram
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ─── CONTACT CTA ─── */}
      <section className="bg-cream py-24 px-6 lg:px-10 text-center">
        <FadeIn className="max-w-2xl mx-auto">
          <BotanicalDivider className="mb-8" />
          <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-4 font-[400]">Begin your healing journey</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-charcoal mb-5">
            Ready to feel held?
          </h2>
          <p className="text-muted leading-relaxed mb-10">
            Book a free 20-minute discovery call, or reach out with any questions. Danielle is based in
            the Yarra Valley and offers mobile services across Melbourne.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=Free Discovery Call"
              className="bg-sage text-white text-[0.78rem] tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:bg-sage-dark transition-colors"
            >
              Book a Free Discovery Call
            </a>
            <Link
              href="/contact"
              className="border border-charcoal/20 text-charcoal text-[0.78rem] tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:border-charcoal/40 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
