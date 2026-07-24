import type { Metadata } from 'next'
import NewClientForm from './NewClientForm'
import BotanicalDivider from '@/components/BotanicalDivider'

export const metadata: Metadata = {
  title: 'Work With Danielle — New Client Enquiry',
  description:
    'Reach out to Danielle Brierley to enquire about massage therapy, Havening Techniques®, holistic healing, and retreats. Yarra Valley, Melbourne.',
}

export default function EnquirePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-charcoal pt-32 pb-20 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold/8 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-[0.68rem] tracking-[0.3em] uppercase text-gold/70 mb-5 font-[400]">
            New Client Enquiry
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light text-cream leading-tight mb-6">
            Let&apos;s See If We&apos;re<br />
            <em className="italic">the Right Fit</em>
          </h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-7" />
          <p className="text-cream/60 text-lg font-light leading-relaxed max-w-xl mx-auto">
            Before we begin, Danielle would love to know a little about you and what you are
            carrying. Fill in the form below and she will be in touch personally within a day or two.
          </p>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section className="bg-cream py-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.8fr] gap-14 items-start">

          {/* Left — what to expect */}
          <div className="lg:sticky lg:top-32">
            <BotanicalDivider className="mb-8" />
            <h2 className="font-display text-2xl font-light text-charcoal mb-5">
              What happens next
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'You fill in the form',
                  desc: 'Share as much or as little as you feel comfortable. There are no wrong answers.',
                },
                {
                  step: '02',
                  title: 'Danielle reads it personally',
                  desc: 'Every enquiry is read by Danielle — not a receptionist, not an assistant. Just her.',
                },
                {
                  step: '03',
                  title: 'She gets back to you',
                  desc: 'Usually within one to two days. She will reach out by text or email — whichever you prefer.',
                },
                {
                  step: '04',
                  title: 'You decide together',
                  desc: 'No pressure, no obligation. If it feels right for both of you, you arrange a time.',
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <span className="font-display text-3xl text-sage/20 font-light leading-none flex-shrink-0 mt-0.5">{step}</span>
                  <div>
                    <p className="text-charcoal font-[400] text-sm mb-1">{title}</p>
                    <p className="text-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-sage-dark rounded-2xl p-6">
              <p className="text-cream/60 text-sm leading-relaxed mb-1">
                Prefer to reach out directly?
              </p>
              <a
                href="mailto:danielle@harmonizedtherapies.com.au"
                className="text-gold/80 text-sm hover:text-gold transition-colors"
              >
                danielle@harmonizedtherapies.com.au
              </a>
            </div>
          </div>

          {/* Right — form */}
          <NewClientForm />
        </div>
      </section>
    </>
  )
}
