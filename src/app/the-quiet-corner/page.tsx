import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import FloatingOrbs from '@/components/FloatingOrbs'
import BotanicalDivider from '@/components/BotanicalDivider'
import { posts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'The Quiet Corner — Writings from Danielle',
  description:
    'A space for reflection, healing, and honest words. Writings on grief, Havening, holding space, and the journey back to yourself — by Danielle Brierley of Harmonized Therapies.',
}

const eyebrowColors: Record<string, string> = {
  'Healing & Presence': 'text-sage',
  'Havening Techniques': 'text-gold',
  'Grief & Healing': 'text-sage',
}

export default function QuietCornerPage() {
  const [featured, ...rest] = posts

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[70vh] flex items-center bg-charcoal overflow-hidden">
        <FloatingOrbs />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 pt-36 pb-24 text-center w-full">
          <p className="text-[0.68rem] tracking-[0.3em] uppercase text-gold/60 mb-5 font-[400]">
            From Danielle · Harmonized Therapies
          </p>
          <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] font-light text-cream italic leading-tight mb-6">
            The Quiet Corner
          </h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          <p className="text-cream/55 text-lg font-light leading-relaxed max-w-xl mx-auto">
            A space for honest words. Reflections on grief, healing, Havening,
            and what it means to hold space — for others, and for yourself.
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/25 animate-bounce">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ─── FEATURED POST ─── */}
      <section className="bg-cream py-20 px-6 lg:px-10">
        <FadeIn className="max-w-5xl mx-auto">
          <p className="text-[0.68rem] tracking-[0.22em] uppercase text-sage mb-8 font-[400]">Latest</p>
          <Link href={`/the-quiet-corner/${featured.slug}`} className="group block">
            <div className="grid lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden border border-sage/10 hover:shadow-xl transition-shadow duration-500">
              {/* Colour block */}
              <div className="lg:col-span-2 bg-charcoal min-h-[220px] lg:min-h-0 flex flex-col justify-end p-10 relative overflow-hidden">
                <FloatingOrbs />
                <span className={`relative text-[0.65rem] tracking-[0.22em] uppercase font-[400] mb-4 ${eyebrowColors[featured.eyebrow] ?? 'text-sage'}`}>
                  {featured.eyebrow}
                </span>
                <h2 className="relative font-display text-[clamp(1.6rem,3vw,2.2rem)] font-light text-cream italic leading-snug">
                  {featured.title}
                </h2>
              </div>
              {/* Content */}
              <div className="lg:col-span-3 bg-white p-10 flex flex-col justify-between">
                <div>
                  <p className="text-charcoal/65 leading-relaxed text-[1.05rem] mb-8">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <time dateTime={featured.dateISO}>{featured.date}</time>
                    <span className="w-1 h-1 rounded-full bg-muted/40 inline-block" />
                    <span>{featured.readTime}</span>
                  </div>
                  <span className="text-[0.72rem] tracking-[0.1em] uppercase text-sage border-b border-sage/40 pb-0.5 group-hover:border-sage transition-colors">
                    Read on →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </FadeIn>
      </section>

      {/* ─── POST GRID ─── */}
      {rest.length > 0 && (
        <section className="bg-warm-white py-16 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <BotanicalDivider className="mb-14" />
            <div className="grid sm:grid-cols-2 gap-6">
              {rest.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 0.1}>
                  <Link href={`/the-quiet-corner/${post.slug}`} className="group block h-full">
                    <article className="bg-white rounded-2xl border border-sage/10 p-8 flex flex-col h-full hover:shadow-lg transition-shadow duration-400">
                      <span className={`text-[0.63rem] tracking-[0.22em] uppercase font-[400] mb-4 block ${eyebrowColors[post.eyebrow] ?? 'text-sage'}`}>
                        {post.eyebrow}
                      </span>
                      <h2 className="font-display text-xl font-light text-charcoal italic leading-snug mb-4 flex-1">
                        {post.title}
                      </h2>
                      <p className="text-muted text-sm leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3 text-xs text-muted">
                          <time dateTime={post.dateISO}>{post.date}</time>
                          <span className="w-1 h-1 rounded-full bg-muted/40 inline-block" />
                          <span>{post.readTime}</span>
                        </div>
                        <span className="text-[0.68rem] tracking-[0.1em] uppercase text-sage border-b border-sage/40 pb-0.5 group-hover:border-sage transition-colors">
                          Read →
                        </span>
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FROM DANIELLE ─── */}
      <section className="bg-charcoal py-20 px-6 lg:px-10 relative overflow-hidden">
        <FloatingOrbs />
        <FadeIn className="max-w-3xl mx-auto text-center relative">
          <p className="text-[0.68rem] tracking-[0.28em] uppercase text-gold/60 mb-6 font-[400]">Why I write</p>
          <blockquote className="font-display text-[clamp(1.3rem,2.5vw,2rem)] italic text-cream font-light leading-relaxed mb-6">
            &ldquo;I write because healing is not a destination — it&apos;s a conversation.
            And some conversations need to be had quietly, in a corner, with a warm drink and no pressure.
            That&apos;s what this space is.&rdquo;
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
          <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-4 font-[400]">Ready to go deeper?</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal mb-5">
            Words are just the beginning.
          </h2>
          <p className="text-muted leading-relaxed mb-8">
            If something you read here moved you, a private session with Danielle can take that
            healing further. Book a free 20-minute discovery call to find the right path.
          </p>
          <a
            href="mailto:danielle@harmonizedtherapies.com.au?subject=Free Discovery Call"
            className="inline-block bg-sage text-white text-[0.78rem] tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:bg-sage-dark transition-colors"
          >
            Book a Free Discovery Call
          </a>
        </FadeIn>
      </section>
    </>
  )
}
