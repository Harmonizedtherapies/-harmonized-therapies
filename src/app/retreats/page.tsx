import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import BotanicalDivider from '@/components/BotanicalDivider'

export const metadata: Metadata = {
  title: 'Retreats & Workshops',
  description:
    'The Quiet Holders Retreat — sacred ceremony, grief circles, and healing for women honouring pregnancy loss, miscarriage, and the babies held only in their hearts. Yarra Valley, Melbourne.',
}

export default function RetreatsPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-charcoal pt-32 pb-24 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <svg viewBox="0 0 700 500" className="absolute -right-20 -top-10 w-2/3 text-gold opacity-5" fill="currentColor">
            <circle cx="450" cy="200" r="300" />
          </svg>
          <svg viewBox="0 0 400 400" className="absolute -left-20 bottom-0 w-1/3 text-sage-dark opacity-20" fill="currentColor">
            <ellipse cx="200" cy="280" rx="180" ry="220" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-[0.68rem] tracking-[0.3em] uppercase text-gold/70 mb-5 font-[400]">
            The Quiet Holders
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-cream leading-tight mb-6">
            For the Babies Held<br />
            <em className="italic">Only in Our Hearts</em>
          </h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-7" />
          <p className="text-cream/60 text-lg font-light leading-relaxed max-w-2xl mx-auto mb-8">
            Sacred ceremonies, grief circles, and healing retreats for women
            honouring pregnancy loss, miscarriage, and the silent grief that is so often
            carried alone.
          </p>
          <p className="text-cream/40 text-sm italic max-w-lg mx-auto mb-10">
            You grieved because you loved. That love deserves to be witnessed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=Retreat Enquiry"
              className="bg-gold text-charcoal text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-gold/80 transition-colors"
            >
              Register Your Interest
            </a>
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=Retreat Enquiry"
              className="border border-cream/25 text-cream text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:border-cream/50 transition-colors"
            >
              Ask Danielle a Question
            </a>
          </div>
        </div>
      </section>

      {/* ─── THE VISION ─── */}
      <section className="bg-cream py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-4 font-[400]">The vision</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-charcoal mb-6">
              Grief this sacred deserves a ceremony
            </h2>
            <div className="space-y-4 text-charcoal/70 leading-relaxed">
              <p>
                When a baby is lost — to miscarriage, stillbirth, or the quiet grief of a pregnancy
                that never was — there is often no ritual. No witness. No space to say hello, and
                goodbye, and <em>you mattered</em>.
              </p>
              <p>
                Danielle knows this grief from the inside. It is why The Quiet Holders was born.
                These retreats are built around something she is designing from lived experience —
                a ceremony for honouring the babies we carried, however briefly, and the mothers
                who carry them still.
              </p>
              <p>
                This is not therapy. It is something older than that. It is ritual, witness,
                and the kind of holding that only comes from being in a room full of women
                who understand.
              </p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/Images/retreats-brand-collage.png"
              alt="The Quiet Holders Retreat — women gathering to heal and reconnect"
              width={700}
              height={525}
              className="w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ─── THE CEREMONY ─── */}
      <section className="bg-sage-dark py-24 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg viewBox="0 0 600 400" className="absolute right-0 top-0 w-2/3 text-cream" fill="currentColor">
            <circle cx="400" cy="200" r="250" />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-14">
            <p className="text-[0.68rem] tracking-[0.3em] uppercase text-sage-light/60 mb-4 font-[400]">
              Danielle&apos;s signature offering
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-cream mb-5">
              The Ceremony
            </h2>
            <div className="w-16 h-px bg-gold/40 mx-auto mb-6" />
            <p className="text-cream/60 text-lg font-light italic leading-relaxed max-w-2xl mx-auto">
              A sacred, unique ceremony designed by Danielle — to honour the baby, hold the mother,
              and give grief the witnessing it was never offered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Honour',
                desc: 'Each ceremony creates space to acknowledge the baby — their existence, their name if you have one, and the love that remains. Nothing is bypassed. Everything is welcomed.',
                icon: '🕯️',
              },
              {
                title: 'Release',
                desc: 'Through breathwork, gentle movement, and Havening, we work with the body — because grief lives there. The body needs ceremony just as much as the heart does.',
                icon: '🌊',
              },
              {
                title: 'Become',
                desc: 'You leave having been witnessed. With something tangible to carry forward — a ritual, a symbol, a sense that your grief has a rightful place in the world.',
                icon: '🌿',
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="bg-sage-dark/60 border border-cream/10 rounded-2xl p-8 text-center">
                <span className="text-3xl block mb-4">{icon}</span>
                <h3 className="font-display text-xl font-light text-cream mb-3">{title}</h3>
                <p className="text-cream/55 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-cream/40 text-sm italic max-w-lg mx-auto">
              The ceremony is currently being designed. Danielle is also studying breathwork and birth
              to deepen this work. Dates will be announced to the community first.
            </p>
          </div>
        </div>
      </section>

      {/* ─── RETREAT FORMATS ─── */}
      <section className="bg-warm-white py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <BotanicalDivider className="mb-6" />
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-3 font-[400]">
              How we gather
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal">
              Retreat Formats
            </h2>
            <p className="text-muted mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              From a morning together to a full weekend away — each format holds the same
              intention. You choose what you are ready for.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-1 rounded-2xl overflow-hidden border border-sage/15">
            {[
              {
                format: 'Half Day',
                title: 'A Ceremony of Remembrance',
                desc: 'A morning or afternoon held in sacred space. Guided ceremony, grief circle, oracle cards, and a closing ritual. Intimate — up to 8 women.',
                includes: ['Danielle\'s ceremony', 'Grief sharing circle', 'Oracle card practice', 'Closing ritual'],
                bg: 'bg-white',
              },
              {
                format: 'Full Day',
                title: 'The Full Holding',
                desc: 'The complete experience. Ceremony, Havening for emotional release, breathwork, shared nourishment, story circles, and rest. A day that changes something.',
                includes: ['Ceremony', 'Havening Techniques®', 'Breathwork', 'Story circle', 'Shared meal'],
                bg: 'bg-sage-light/30',
              },
              {
                format: 'Weekend Overnight',
                title: 'The Quiet Holders Retreat',
                desc: 'An overnight or full weekend away — nature-based, unhurried, and deeply restorative. For those ready to go all the way in.',
                includes: ['All of the above', 'Private sessions with Danielle', 'Guided meditation', 'Nature & stillness', 'Connection with like-hearted women'],
                bg: 'bg-white',
              },
            ].map(({ format, title, desc, includes, bg }) => (
              <div key={format} className={`${bg} p-10 flex flex-col gap-5`}>
                <span className="text-[0.68rem] tracking-[0.2em] uppercase text-sage font-[400]">{format}</span>
                <h3 className="font-display text-2xl font-light text-charcoal">{title}</h3>
                <p className="text-muted text-sm leading-relaxed flex-1">{desc}</p>
                <ul className="space-y-2">
                  {includes.map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-charcoal/60">
                      <span className="text-sage flex-shrink-0">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l4 4 6-6" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ─── */}
      <section className="bg-charcoal py-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage-mid mb-4 font-[400]">Who comes</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-cream mb-8">
              These spaces are for you if...
            </h2>
            <div className="space-y-4">
              {[
                'You have experienced miscarriage, stillbirth, or pregnancy loss — recently or years ago',
                'You never had a ceremony or ritual to honour your baby',
                'You carry a grief that others don\'t fully acknowledge or understand',
                'You have experienced birth trauma and your body still holds it',
                'You are a mother navigating the complexity of loving a baby you didn\'t get to keep',
                'You are ready — even just a little — to let yourself be held',
                'You are a carer, nurse, or space holder who needs space held for you',
              ].map(item => (
                <div key={item} className="flex items-start gap-3 text-sm text-cream/60">
                  <span className="text-gold mt-1.5 flex-shrink-0 text-xs">◦</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-charcoal/60 border border-gold/20 rounded-2xl p-8">
              <blockquote className="font-display text-xl italic text-cream font-light leading-relaxed mb-5">
                &ldquo;Back then, miscarriage felt like a silent loss. Something women endured quietly.
                There were no real conversations — no space held for the heartbreak of losing a baby
                you had already begun loving. These retreats are that space.&rdquo;
              </blockquote>
              <cite className="text-[0.7rem] tracking-[0.15em] uppercase text-gold/60 not-italic">
                — Danielle Brierley
              </cite>
            </div>

            <div className="bg-charcoal/40 border border-cream/8 rounded-2xl p-7">
              <p className="text-[0.68rem] tracking-[0.2em] uppercase text-sage mb-3 font-[400]">Also available</p>
              <div className="space-y-3">
                {[
                  { title: 'Becoming a Quiet Holder', desc: 'For carers, nurses, and space holders who need to be held themselves.' },
                  { title: 'The Body Remembers', desc: 'Nervous system healing — how to regulate, release, and restore after trauma.' },
                  { title: 'Somewhere In Between', desc: 'For grief without a name. For the exhausted. For those navigating change.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="border-b border-cream/8 pb-3 last:border-0 last:pb-0">
                    <p className="text-cream/80 text-sm font-[400] mb-0.5">{title}</p>
                    <p className="text-cream/40 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-cream py-24 px-6 lg:px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <BotanicalDivider className="mb-8" />
          <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-4 font-[400]">Be the first to know</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal mb-5">
            Retreat Dates Coming Soon
          </h2>
          <p className="text-muted leading-relaxed mb-3 max-w-lg mx-auto">
            Dates and locations are announced to The Quiet Holders community first.
            Register your interest and Danielle will reach out personally when the first retreat is ready.
          </p>
          <p className="text-muted/60 text-sm italic mb-10">
            You don&apos;t have to be ready. You just have to be curious.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=Retreat — Register Interest"
              className="bg-sage text-white text-[0.78rem] tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:bg-sage-dark transition-colors"
            >
              Register My Interest
            </a>
            <Link
              href="/the-quiet-holders"
              className="border border-charcoal/20 text-charcoal text-[0.78rem] tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:border-charcoal/40 transition-colors"
            >
              About The Quiet Holders
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
