import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Oracle Cards',
  description:
    'The Quiet Holders Oracle — 44 cards to support your healing, guide you back to your truth, and remind you that you are not alone.',
}

const sampleCards = [
  { num: 1, title: 'You Are Not Alone', message: 'Support surrounds you, even when you can\'t see it yet.' },
  { num: 2, title: 'Breathe', message: 'Come back to your breath. You are safe right now.' },
  { num: 3, title: 'You Are Safe', message: 'This moment is holding you. You don\'t have to hold it all.' },
  { num: 5, title: 'Slow Down', message: 'Gentle is the new strong. You are allowed to take up space.' },
  { num: 15, title: 'Grief Is Love', message: 'It hurts because it mattered. You are not alone.' },
  { num: 20, title: 'You Are Enough', message: 'You have always been enough. You always will.' },
  { num: 22, title: 'Bloom Slowly', message: 'You are becoming something beautiful.' },
  { num: 31, title: 'The Quiet Holders', message: 'You are held. You are seen. You are not alone.' },
  { num: 37, title: 'Boundaries Are Beautiful', message: 'Protecting your peace is sacred.' },
  { num: 42, title: 'Light Returns', message: 'After every dark night, the light returns.' },
  { num: 43, title: 'You Are Becoming', message: 'Trust the beautiful process.' },
  { num: 44, title: 'Home', message: 'You are coming home to yourself.' },
]

const cardGroups = [
  { name: 'Grief & Loss', cards: ['Grief Is Love', 'Tears Are Sacred', 'Let the Ocean Hold It', 'Honour Your Story', 'Sunflower', 'Your Angels Walk Beside You', 'Signs'] },
  { name: 'The Body & Healing', cards: ['The Body Remembers', 'Breathe', 'Heal at Your Own Pace', 'Give Yourself Time', 'Softening', 'Rest', 'Slow Down'] },
  { name: 'Safety & Grounding', cards: ['You Are Not Alone', 'You Are Safe', 'Be Held', 'Here Now', 'Protection', 'The Quiet Holders', 'Surrender'] },
  { name: 'Courage & Becoming', cards: ['Begin Again', 'Quiet Courage', 'Bloom Slowly', 'Rise', 'You Are Becoming', 'Look How Far You\'ve Come', 'Small Steps Count'] },
  { name: 'Trust & Intuition', cards: ['Trust the Timing', 'Inner Knowing', 'Soul Whispers', 'The Path Will Reveal Itself', 'Sacred Pause'] },
  { name: 'Self Worth & Identity', cards: ['You Are Enough', 'Choose You', 'Return to Yourself', 'Boundaries Are Beautiful', 'You Are Not Behind'] },
]

export default function OracleCardsPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-charcoal pt-32 pb-20 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-gold/8 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-block bg-gold/20 border border-gold/40 rounded-full px-5 py-1.5 mb-6">
            <p className="text-[0.68rem] tracking-[0.25em] uppercase text-gold font-[400]">Coming Soon — Register Your Interest</p>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-light text-cream italic leading-tight mb-5">
            44 Cards for the Soul
          </h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-7" />
          <p className="text-cream/60 text-lg font-light leading-relaxed max-w-xl mx-auto mb-8">
            Messages for the soul. Healing for the heart. The Quiet Holders Oracle is currently being produced — register your interest below to be first to know when it&apos;s available.
          </p>
          <a
            href="mailto:danielle@harmonizedtherapies.com.au?subject=Oracle Cards — Register My Interest"
            className="inline-block bg-gold text-charcoal text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-gold/80 transition-colors"
          >
            Register My Interest
          </a>
        </div>
      </section>

      {/* ─── DECK DESCRIPTION ─── */}
      <section className="bg-cream py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-4 font-[400]">About the deck</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal mb-6">
              44 cards to guide you back to your truth
            </h2>
            <div className="space-y-4 text-charcoal/70 leading-relaxed">
              <p>
                The Quiet Holders Oracle is a 44-card deck created to support your healing, ground you
                when you&apos;re lost, and remind you that you are not alone. Each card carries a single
                message — simple, true, and exactly what you need to hear.
              </p>
              <p>
                Warm, earthy, and soulful — inspired by ocean coastlines, pathways through nature,
                candles and soft light, botanicals, and the quiet courage of women who keep going.
              </p>
              <p>
                Whether you use them for a daily draw, in a grief circle, at a retreat, or in the
                quiet moments before sleep — these cards are a companion for your healing journey.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              {['44 Cards', 'Grief & Healing', 'Retreat Use', 'Daily Draw', 'Journal Prompts'].map(tag => (
                <span key={tag} className="text-[0.7rem] px-3 py-1.5 bg-sage-light rounded-full text-sage-dark tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {/* Featured card */}
          <div className="flex justify-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl max-w-xs w-full">
              <Image
                src="/Images/oracle-card-you-are-not-alone.png"
                alt="Card 1 — You Are Not Alone — The Quiet Holders Oracle"
                width={400}
                height={560}
                className="w-full object-cover"
                sizes="(max-width: 1024px) 80vw, 400px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FULL DECK VISUAL ─── */}
      <section className="bg-charcoal py-16 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-gold/60 mb-3 font-[400]">All 44 cards</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-light text-cream">
              The Complete Deck
            </h2>
          </div>
          <div className="rounded-3xl border border-gold/20 bg-charcoal/60 p-16 text-center">
            <p className="font-display text-5xl text-gold/30 mb-4 italic">44</p>
            <p className="text-[0.7rem] tracking-[0.25em] uppercase text-gold/50 mb-3">Cards</p>
            <div className="w-12 h-px bg-gold/20 mx-auto mb-4" />
            <p className="text-cream/40 text-sm italic">Deck photography coming soon</p>
          </div>
        </div>
      </section>

      {/* ─── SAMPLE CARDS ─── */}
      <section className="bg-warm-white py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-3 font-[400]">A glimpse inside</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal">
              Sample Cards
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sampleCards.map(({ num, title, message }) => (
              <div
                key={num}
                className="bg-white rounded-2xl border border-gold/20 p-6 hover:shadow-md transition-shadow flex flex-col justify-between aspect-[3/4]"
              >
                <div className="flex justify-between items-start">
                  <div className="w-5 h-px bg-gold/50 mt-1" />
                  <span className="font-display text-[0.6rem] tracking-[0.15em] uppercase text-gold/50">{num}</span>
                </div>
                <div className="text-center py-4">
                  <p className="font-display text-xl italic text-charcoal font-light leading-snug mb-3">{title}</p>
                  <p className="text-muted text-xs leading-relaxed">{message}</p>
                </div>
                <p className="text-[0.58rem] tracking-[0.15em] uppercase text-gold/50 text-center">The Quiet Holders Oracle</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CARD GROUPINGS ─── */}
      <section className="bg-cream py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-3 font-[400]">For retreat and workshop use</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal">
              Card Groupings by Theme
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cardGroups.map(({ name, cards }) => (
              <div key={name} className="bg-warm-white rounded-2xl p-6 border border-sage/10">
                <h3 className="font-display text-lg font-light text-charcoal mb-4">{name}</h3>
                <div className="flex flex-wrap gap-2">
                  {cards.map(card => (
                    <span key={card} className="text-[0.67rem] px-2.5 py-1 bg-white border border-sage/15 rounded-full text-muted">
                      {card}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW TO USE ─── */}
      <section className="bg-charcoal py-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage-mid mb-3 font-[400]">Guidance</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-cream">
              How to Use the Cards
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '☀️', title: 'Daily Draw', desc: 'Pull one card each morning as a gentle reminder and intention for the day.' },
              { icon: '🌿', title: 'Retreat Use', desc: 'Spread cards face down — invite each woman to choose one that speaks to her. Use as an opening for sharing.' },
              { icon: '💧', title: 'Grief Circles', desc: 'Use the Grief & Loss grouping as a dedicated healing practice — each woman draws one card and shares.' },
              { icon: '📖', title: 'Journal Prompts', desc: 'Each card can be a journaling prompt: "What does this card mean for me right now?"' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-charcoal/60 border border-cream/8 rounded-2xl p-6 text-center">
                <span className="text-2xl block mb-3">{icon}</span>
                <h3 className="font-display text-lg font-light text-cream mb-2">{title}</h3>
                <p className="text-cream/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMING SOON CTA ─── */}
      <section className="bg-charcoal py-24 px-6 lg:px-10 text-center">
        <div className="max-w-xl mx-auto">
          <div className="w-12 h-px bg-gold/40 mx-auto mb-8" />
          <p className="text-[0.7rem] tracking-[0.22em] uppercase text-gold/60 mb-4 font-[400]">
            Be the first to know
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-cream mb-5">
            Register Your Interest
          </h2>
          <p className="text-cream/60 leading-relaxed mb-3">
            The deck is currently being produced. Register your interest and Danielle will reach
            out personally when the cards are ready — with early access details.
          </p>
          <p className="text-cream/40 text-sm italic mb-10">
            No commitment. Just a way to stay connected.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=Oracle Cards — Register My Interest"
              className="bg-gold text-charcoal text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-gold/80 transition-colors"
            >
              Register My Interest
            </a>
            <Link
              href="/the-quiet-holders"
              className="border border-cream/25 text-cream text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:border-cream/50 transition-colors"
            >
              About The Quiet Holders
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
