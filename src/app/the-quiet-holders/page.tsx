import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'The Quiet Holders',
  description:
    'Holding space for grief, healing and becoming. Oracle cards, workshops, retreats, and an upcoming book by Danielle Brierley.',
}

export default function QuietHoldersPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-charcoal min-h-[80vh] flex items-center pt-24 pb-20 px-6 lg:px-10 relative overflow-hidden">
        {/* Atmospheric decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-gold/8 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-[0.68rem] tracking-[0.3em] uppercase text-gold/70 mb-5 font-[400]">
            Danielle Brierley · Harmonized Therapies
          </p>
          <h1 className="font-display text-[clamp(3rem,7vw,6rem)] font-light text-cream italic leading-tight mb-6">
            The Quiet Holders
          </h1>
          <div className="w-20 h-px bg-gold/40 mx-auto mb-8" />
          <p className="font-display text-[clamp(1.1rem,2.2vw,1.5rem)] text-cream/70 font-light italic leading-relaxed max-w-2xl mx-auto mb-4">
            To the ones who stay.
          </p>
          <p className="text-cream/50 leading-relaxed max-w-2xl mx-auto mb-4">
            The ones who walk quietly into the hardest rooms —
            holding space between fear and hope, life and loss, heartbreak and healing.
            The ones who hold tiny hands, wipe silent tears,
            and carry families through the unimaginable while asking for little in return.
          </p>
          <p className="text-cream/50 leading-relaxed max-w-xl mx-auto mb-10">
            You may never fully know the impact of your presence.
            But families remember. Mothers remember.
            <em className="text-cream/70 italic"> I remember.</em>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/retreats"
              className="bg-gold text-charcoal text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-gold/80 transition-colors"
            >
              Join a Retreat
            </Link>
            <Link
              href="/oracle-cards"
              className="border border-cream/25 text-cream text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:border-cream/50 transition-colors"
            >
              Oracle Cards
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHAT IS THE QUIET HOLDERS ─── */}
      <section className="bg-cream py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-4 font-[400]">About</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal mb-6">
              You were never meant to carry this alone
            </h2>
            <div className="space-y-4 text-charcoal/70 leading-relaxed">
              <p>
                The Quiet Holders is a brand born from lived experience. It grew from Danielle&apos;s own
                journey through grief, loss, birth trauma, and healing — and from the thousands of
                quiet moments she has shared with clients carrying their own unspoken weight.
              </p>
              <p>
                The name comes from the understanding that some things are simply too heavy to carry
                alone. The Quiet Holders are the people, the moments, the practices — and sometimes
                just the space — that hold you when you can no longer hold yourself.
              </p>
              <p>
                This is a space for women, mothers, carers, nurses, and anyone who knows what it
                means to grieve. Here, your story matters. Your pain is honoured. And healing is possible.
              </p>
            </div>
          </div>
          <div className="bg-charcoal rounded-3xl p-10 text-center">
            <blockquote className="font-display text-[clamp(1.4rem,2.5vw,2rem)] text-cream italic font-light leading-relaxed mb-6">
              &ldquo;You are someone who has lived every single thing you hold space for. That is not a
              qualification you can study for. That is a life.&rdquo;
            </blockquote>
            <div className="w-12 h-px bg-gold/40 mx-auto mb-4" />
            <p className="text-[0.7rem] tracking-[0.15em] uppercase text-gold/70">
              — Danielle Brierley
            </p>
          </div>
        </div>
      </section>

      {/* ─── THREE PILLARS ─── */}
      <section className="bg-warm-white py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-3 font-[400]">Three pillars</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal">
              How we work together
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                tag: 'Hold',
                title: 'One on One Sessions',
                desc: 'Deeply personal healing — Havening, massage, coaching, NLP, and birth trauma healing. Held with care, tailored completely to you.',
                who: 'For anyone carrying grief, trauma, anxiety, loss, birth trauma, or unspoken pain.',
                href: '/services',
                cta: 'Explore Sessions',
              },
              {
                num: '02',
                tag: 'Gather',
                title: 'Workshops',
                desc: 'Half day or full day gatherings — run locally, in your home, or at hired venues. Topics include grief, miscarriage loss, birth trauma, nervous system healing, menopause, and becoming a quiet holder.',
                who: 'For women, mothers, carers, and anyone wanting to understand their story.',
                href: '/retreats',
                cta: 'View Workshops',
              },
              {
                num: '03',
                tag: 'Retreat',
                title: 'The Quiet Holders Retreat',
                desc: 'Overnight or weekend retreats. Spiritual, grounded, nature-based. Guided meditation, Havening, group sharing, rest, and reflection.',
                who: 'For those ready to go deeper. To grieve. To heal. To be held.',
                href: '/retreats',
                cta: 'Explore Retreats',
              },
            ].map(({ num, tag, title, desc, who, href, cta }) => (
              <div key={num} className="bg-white rounded-2xl p-8 border border-warm-white flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <span className="font-display text-4xl text-sage/20 font-light leading-none">{num}</span>
                  <span className="text-[0.68rem] tracking-[0.2em] uppercase text-sage font-[400]">{tag}</span>
                </div>
                <h3 className="font-display text-xl font-light text-charcoal mb-3">{title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4 flex-1">{desc}</p>
                <p className="text-sage text-xs leading-relaxed mb-5 italic">{who}</p>
                <Link
                  href={href}
                  className="self-start text-[0.72rem] tracking-[0.1em] uppercase text-charcoal border-b border-charcoal/20 pb-0.5 hover:text-sage hover:border-sage transition-colors"
                >
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE BOOK ─── */}
      <section className="bg-charcoal py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/Images/IMG_0474.PNG"
              alt="The Quiet Holders — Book by Danielle Brierley"
              width={700}
              height={900}
              className="w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-[0.7rem] tracking-[0.25em] uppercase text-gold/60 mb-4 font-[400]">
              In the making
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-cream mb-4">
              The Book
            </h2>
            <div className="w-16 h-px bg-gold/40 mb-7" />
            <p className="text-cream/60 text-lg font-light italic leading-relaxed mb-5">
              &ldquo;Written from the heart — for the ones who stay.&rdquo;
            </p>
            <div className="space-y-4 text-cream/50 leading-relaxed mb-8">
              <p>
                This is not a self-help book. It is a story. Danielle&apos;s story — of the babies
                she carried and lost, the hospital rooms she sat in alone, the healer she found in
                Bali, and the Havening that changed everything.
              </p>
              <p>
                Written raw and unedited from the inside of the grief it describes — for anyone
                who has ever carried something too heavy, alone. And for the quiet holders who
                stayed when everyone else moved on.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                ['Part One', 'The Children Who Shaped Me'],
                ['Part Two', 'The Grief I Carried'],
                ['Part Three', 'The Healing That Found Me'],
                ['Part Four', 'Somewhere In Between'],
              ].map(([part, title]) => (
                <div key={part} className="bg-charcoal/60 border border-cream/10 rounded-xl p-4">
                  <p className="text-[0.65rem] tracking-[0.15em] uppercase text-gold/50 mb-1">{part}</p>
                  <p className="font-display text-sm text-cream font-light leading-snug">{title}</p>
                </div>
              ))}
            </div>
            <div className="bg-charcoal/60 border border-gold/20 rounded-2xl p-6">
              <h3 className="font-display text-lg text-cream font-light mb-1">Be the first to know</h3>
              <p className="text-cream/40 text-sm mb-4">Register your interest and Danielle will reach out when the book is ready.</p>
              <form
                action="mailto:danielle@harmonizedtherapies.com.au?subject=The Quiet Holders Book — Register Interest"
                method="post"
                encType="text/plain"
                className="flex gap-3"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-white/8 border border-cream/15 rounded-full px-4 py-2.5 text-cream placeholder-cream/30 text-sm outline-none focus:border-gold/50 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-gold text-charcoal text-[0.72rem] tracking-[0.1em] uppercase px-5 py-2.5 rounded-full hover:bg-gold/80 transition-colors whitespace-nowrap"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE JOURNAL ─── */}
      <section className="bg-warm-white py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[0.7rem] tracking-[0.25em] uppercase text-sage mb-4 font-[400]">
              Coming soon
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-charcoal mb-4">
              The Journal
            </h2>
            <div className="w-16 h-px bg-sage/30 mb-7" />
            <p className="text-charcoal/70 text-lg font-light italic leading-relaxed mb-5">
              &ldquo;A gentle guide for anyone navigating loss, change, or the path back to themselves.&rdquo;
            </p>
            <div className="space-y-4 text-charcoal/60 leading-relaxed mb-8">
              <p>
                A companion for your healing — a space to reflect, feel, and find your way back
                to yourself. Written by Danielle from the inside of her own healing journey.
              </p>
              <p>
                Currently in creation. Register your interest below to be first to know when it arrives.
              </p>
            </div>
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=The Quiet Holders Journal — Register My Interest"
              className="inline-block bg-sage text-white text-[0.75rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-sage-dark transition-colors"
            >
              Register My Interest
            </a>
          </div>
          <div>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/Images/IMG_0475.PNG"
                alt="The Quiet Holders Journal — a space to hold, reflect and heal"
                width={700}
                height={700}
                className="w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── LINKS ─── */}
      <section className="bg-cream py-16 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
          <Link
            href="/oracle-cards"
            className="bg-warm-white rounded-2xl p-7 border border-sage/10 hover:shadow-md transition-shadow group flex items-center justify-between"
          >
            <div>
              <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage mb-1 font-[400]">Explore</p>
              <h3 className="font-display text-xl font-light text-charcoal">Oracle Cards</h3>
              <p className="text-muted text-sm mt-1">44 cards to guide you back to your truth.</p>
            </div>
            <span className="text-sage group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/retreats"
            className="bg-warm-white rounded-2xl p-7 border border-sage/10 hover:shadow-md transition-shadow group flex items-center justify-between"
          >
            <div>
              <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage mb-1 font-[400]">Join us</p>
              <h3 className="font-display text-xl font-light text-charcoal">Retreats &amp; Workshops</h3>
              <p className="text-muted text-sm mt-1">Come together. Be held. Begin again.</p>
            </div>
            <span className="text-sage group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
