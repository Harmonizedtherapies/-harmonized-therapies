import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import BotanicalDivider from '@/components/BotanicalDivider'

export const metadata: Metadata = {
  title: 'Retreats & Workshops',
  description:
    'Sacred retreats and workshops for grief, healing, nervous system restoration, and becoming. Half day, full day, and overnight retreat experiences in the Yarra Valley and beyond. Danielle Brierley — Harmonized Therapies.',
}

const retreats = [
  {
    tag: 'The Quiet Holders',
    title: 'For the Babies Held Only in Our Hearts',
    desc: 'Sacred ceremony, grief circles, and deep holding for women who have experienced pregnancy loss, miscarriage, or stillbirth. A space to honour your baby, witness your grief, and find your way forward — in a room full of women who understand.',
    for: 'For women who have lost a pregnancy or baby, at any stage, at any time.',
    formats: ['Half day', 'Full day', 'Weekend overnight'],
    featured: true,
    href: '/retreats/quiet-holders',
    cta: 'Learn more',
    image: '/Images/retreats-promo.png',
  },
  {
    tag: 'Becoming a Quiet Holder',
    title: 'For the Ones Who Stay',
    desc: 'You walk into the hardest rooms. You hold space for grief, for fear, for the unimaginable — and you do it with steadiness and love. But who holds space for you? This retreat is your day. Breathwork, Havening, group sharing, and nervous system rest.',
    for: 'For carers, nurses, midwives, counsellors, and anyone who holds space for others.',
    formats: ['Half day', 'Full day'],
    featured: false,
    href: 'mailto:danielle@harmonizedtherapies.com.au?subject=Retreat Enquiry — Becoming a Quiet Holder',
    cta: 'Register interest',
    image: null,
  },
  {
    tag: 'The Body Remembers',
    title: 'Nervous System Healing',
    desc: 'The body holds what the mind tries to forget. This retreat is for anyone carrying the weight of birth trauma, medical trauma, grief, or chronic stress — held in the body long after the event has passed. Through Havening, somatic movement, and breathwork, we learn to regulate, release, and restore.',
    for: 'For anyone whose body is still carrying something their mind has tried to move on from.',
    formats: ['Full day'],
    featured: false,
    href: 'mailto:danielle@harmonizedtherapies.com.au?subject=Retreat Enquiry — The Body Remembers',
    cta: 'Register interest',
    image: null,
  },
  {
    tag: 'Somewhere In Between',
    title: 'For the Grief That Has No Name',
    desc: 'Not all grief comes with a clear story. Sometimes it is exhaustion. A relationship that quietly ended. A chapter of life that closed without ceremony. An identity that shifted and left you not quite knowing who you are now. You are welcome here exactly as you are.',
    for: 'For anyone navigating change, loss, or exhaustion — no diagnosis required.',
    formats: ['Half day', 'Full day'],
    featured: false,
    href: 'mailto:danielle@harmonizedtherapies.com.au?subject=Retreat Enquiry — Somewhere In Between',
    cta: 'Register interest',
    image: null,
  },
]

export default function RetreatsOverviewPage() {
  const [featured, ...others] = retreats

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-charcoal pt-32 pb-24 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-gold/8 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-[0.68rem] tracking-[0.3em] uppercase text-gold/70 mb-5 font-[400]">
            Harmonized Therapies
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-cream leading-tight mb-6">
            Spaces to Gather,<br />
            <em className="italic">Heal, and Be Held</em>
          </h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-7" />
          <p className="text-cream/60 text-lg font-light leading-relaxed max-w-2xl mx-auto mb-4">
            Some things are too heavy to carry alone. These retreats are for what
            you have been carrying — whether you have a name for it or not.
          </p>
          <p className="text-cream/40 text-sm italic max-w-lg mx-auto mb-10">
            Half day, full day, and overnight retreat experiences held in the Yarra Valley and beyond.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=Retreat Enquiry"
              className="bg-gold text-charcoal text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-gold/80 transition-colors"
            >
              Register Your Interest
            </a>
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=Retreat Question"
              className="border border-cream/25 text-cream text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:border-cream/50 transition-colors"
            >
              Ask Danielle a Question
            </a>
          </div>
        </div>
      </section>

      {/* ─── FEATURED RETREAT ─── */}
      <section className="bg-cream py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <BotanicalDivider className="mb-6" />
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-3 font-[400]">Signature offering</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal">
              The Quiet Holders Retreat
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/Images/retreats-promo.png"
                alt="The Quiet Holders Retreat — women gathering to heal and reconnect"
                width={700}
                height={525}
                className="w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-[0.68rem] tracking-[0.25em] uppercase text-gold/70 mb-3 font-[400]">
                The Quiet Holders
              </p>
              <h3 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-light text-charcoal mb-5 leading-tight">
                For the Babies Held<br />
                <em className="italic">Only in Our Hearts</em>
              </h3>
              <div className="space-y-4 text-charcoal/70 leading-relaxed mb-6">
                <p>
                  Sacred ceremonies, grief circles, and deep holding for women who have experienced
                  pregnancy loss, miscarriage, or stillbirth — recently or years ago.
                </p>
                <p>
                  There is often no ritual for this grief. No witness. No space to say hello, and
                  goodbye, and <em>you mattered</em>. These retreats are that space — built by Danielle
                  from lived experience, held with Havening, breathwork, and ceremony.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {featured.formats.map(f => (
                  <span key={f} className="text-[0.68rem] tracking-[0.15em] uppercase text-sage border border-sage/30 rounded-full px-3 py-1">
                    {f}
                  </span>
                ))}
              </div>
              <Link
                href="/retreats/quiet-holders"
                className="inline-block bg-charcoal text-cream text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-charcoal/80 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OTHER RETREATS ─── */}
      <section className="bg-warm-white py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-3 font-[400]">Also offered</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal">
              More Ways to Gather
            </h2>
            <p className="text-muted mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Each retreat holds the same intention — to create space for what you carry, with
              people who understand, and a facilitator who has lived it herself.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {others.map(({ tag, title, desc, for: forWho, formats, href, cta }) => (
              <div key={tag} className="bg-white rounded-2xl p-8 border border-sage/10 flex flex-col">
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-sage mb-3 font-[400]">{tag}</p>
                <h3 className="font-display text-xl font-light text-charcoal mb-3 leading-snug">{title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4 flex-1">{desc}</p>
                <p className="text-sage text-xs italic leading-relaxed mb-5">{forWho}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {formats.map(f => (
                    <span key={f} className="text-[0.62rem] tracking-[0.12em] uppercase text-sage/70 border border-sage/20 rounded-full px-2.5 py-0.5">
                      {f}
                    </span>
                  ))}
                </div>
                <a
                  href={href}
                  className="self-start text-[0.72rem] tracking-[0.1em] uppercase text-charcoal border-b border-charcoal/20 pb-0.5 hover:text-sage hover:border-sage transition-colors"
                >
                  {cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORMATS ─── */}
      <section className="bg-sage-dark py-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[0.68rem] tracking-[0.3em] uppercase text-sage-light/60 mb-4 font-[400]">
              How we gather
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-cream mb-4">
              You Choose What You Are Ready For
            </h2>
            <p className="text-cream/50 text-sm leading-relaxed max-w-lg mx-auto">
              From a morning together to a full weekend away — every format holds the same
              intention. You don&apos;t have to be fully ready. You just have to show up.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-1 rounded-2xl overflow-hidden border border-cream/8">
            {[
              {
                format: 'Half Day',
                time: '3–4 hours',
                desc: 'A morning or afternoon in sacred space. Ceremony, sharing circle, oracle cards, and a closing ritual. Intimate, small groups — up to 8 women.',
              },
              {
                format: 'Full Day',
                time: '6–8 hours',
                desc: 'The complete experience. Ceremony, Havening, breathwork, story circles, shared nourishment, and rest. A day that changes something.',
              },
              {
                format: 'Weekend Overnight',
                time: '1–2 nights',
                desc: 'Nature-based, unhurried, and deeply restorative. Private sessions with Danielle, guided meditation, connection, and genuine stillness.',
              },
            ].map(({ format, time, desc }) => (
              <div key={format} className="bg-sage-dark/60 p-10 text-center">
                <div className="w-6 h-px bg-gold/40 mx-auto mb-5" />
                <p className="text-[0.68rem] tracking-[0.2em] uppercase text-gold/50 mb-2 font-[400]">{time}</p>
                <h3 className="font-display text-xl font-light text-cream mb-3">{format}</h3>
                <p className="text-cream/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DANIELLE ─── */}
      <section className="bg-cream py-24 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-4 font-[400]">Your facilitator</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal mb-6">
              Danielle Brierley
            </h2>
            <div className="space-y-4 text-charcoal/70 leading-relaxed">
              <p>
                Danielle is a massage therapist, Havening Practitioner, NLP coach, and the founder of
                The Quiet Holders. She has spent 14 years sitting with people in their hardest moments —
                in homes, hospitals, hospices, and healing rooms.
              </p>
              <p>
                She facilitates from lived experience. She knows grief from the inside. She knows what
                it is to carry something unwitnessed for years — and what it feels like when someone
                finally holds space for it.
              </p>
              <p>
                These retreats are built on that knowing.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Havening Techniques®', 'Breathwork (studying)', 'NLP', 'Somatic healing', 'Oracle cards'].map(skill => (
                <span key={skill} className="text-[0.68rem] tracking-[0.12em] uppercase text-charcoal/50 border border-charcoal/15 rounded-full px-3 py-1">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/Images/danielle-portrait.png"
              alt="Danielle Brierley — retreat facilitator and founder of The Quiet Holders"
              width={600}
              height={700}
              className="w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-charcoal py-24 px-6 lg:px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[0.68rem] tracking-[0.3em] uppercase text-gold/70 mb-5 font-[400]">
            Be the first to know
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-cream mb-5">
            Dates Coming Soon
          </h2>
          <p className="text-cream/50 leading-relaxed mb-3 max-w-lg mx-auto">
            Retreat dates and locations are announced to The Quiet Holders community first.
            Register your interest — or reach out to Danielle directly — and she will be
            in touch when something is right for you.
          </p>
          <p className="text-cream/30 text-sm italic mb-10">
            You don&apos;t have to be ready. You just have to be curious.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=Retreat — Register Interest"
              className="bg-gold text-charcoal text-[0.78rem] tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:bg-gold/80 transition-colors"
            >
              Register My Interest
            </a>
            <Link
              href="/the-quiet-holders"
              className="border border-cream/25 text-cream text-[0.78rem] tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:border-cream/50 transition-colors"
            >
              About The Quiet Holders
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
