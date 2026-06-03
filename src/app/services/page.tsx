import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ServicesTabPanel from '@/components/ServicesTabPanel'

export const metadata: Metadata = {
  title: 'Massage Therapy & Healing Services',
  description:
    'Relaxation massage, hot stone, oncology massage, palliative care, pregnancy massage, Havening Techniques®, Access Bars®, NLP and meditation coaching. Based in Yarra Valley with mobile services across Melbourne. Danielle Brierley — 14 years experience.',
}

export default function ServicesPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-sage-dark pt-32 pb-20 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-[0.7rem] tracking-[0.25em] uppercase text-sage-light/60 mb-4 font-[400]">
            What I offer
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-cream leading-tight mb-6">
            Healing Therapies
          </h1>
          <p className="text-cream/60 text-lg font-light leading-relaxed max-w-xl mx-auto">
            Every session is tailored to you — your body, your story, your healing. Offered in the
            Yarra Valley, with mobile services available across Melbourne.
          </p>
        </div>
      </section>

      {/* ─── SERVICES TAB PANEL ─── */}
      <section className="bg-cream py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <ServicesTabPanel />
        </div>
      </section>

      {/* ─── PHOTO STRIP ─── */}
      <section className="bg-warm-white py-12 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4 items-start">
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <Image
              src="/Images/havening-brand-promo.png"
              alt="Danielle Brierley — Havening Techniques® session"
              width={700}
              height={525}
              className="w-full h-full object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <Image
              src="/Images/massage-promo-oncology.png"
              alt="Danielle Brierley — oncology massage therapy in the Yarra Valley"
              width={700}
              height={525}
              className="w-full h-full object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ─── MOBILE / ONCOLOGY CALLOUT ─── */}
      <section className="bg-warm-white py-16 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-sage/10">
            <span className="text-2xl block mb-4">🚗</span>
            <h3 className="font-display text-xl font-light text-charcoal mb-3">Mobile Services</h3>
            <p className="text-muted text-sm leading-relaxed">
              Danielle brings her healing practice to you. Mobile sessions available across Melbourne —
              to your home, hospital, hospice, or care facility. Ideal for oncology, palliative care,
              and anyone who finds it difficult to travel.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-sage/10">
            <span className="text-2xl block mb-4">📞</span>
            <h3 className="font-display text-xl font-light text-charcoal mb-3">Free Discovery Call</h3>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Not sure where to start? Book a free 20-minute discovery call and Danielle will help you
              find the right therapy for your needs — with zero pressure.
            </p>
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=Free Discovery Call"
              className="inline-block bg-sage text-white text-[0.72rem] tracking-[0.1em] uppercase px-5 py-2.5 rounded-full hover:bg-sage-dark transition-colors"
            >
              Book a Free Call
            </a>
          </div>
        </div>
      </section>

      {/* ─── GIFT VOUCHERS ─── */}
      <section className="bg-gold-light py-16 px-6 lg:px-10 text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-3xl block mb-4">🎁</span>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-light text-charcoal mb-4">
            Gift Vouchers
          </h2>
          <p className="text-charcoal/70 leading-relaxed mb-8">
            Give someone you love the gift of harmony. Harmonized Therapies gift vouchers can be used
            across any of Danielle&apos;s sessions — the perfect present for any occasion.
          </p>
          <a
            href="mailto:danielle@harmonizedtherapies.com.au?subject=Gift Voucher Enquiry"
            className="inline-block bg-charcoal text-cream text-[0.75rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-charcoal/80 transition-colors"
          >
            Enquire About Gift Vouchers
          </a>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-charcoal py-20 px-6 lg:px-10 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-cream mb-5">
            Ready to begin your healing journey?
          </h2>
          <p className="text-cream/50 leading-relaxed mb-8">
            Reach out via email or the contact page and Danielle will find the right session for you.
            Based in the Yarra Valley with mobile services across Melbourne.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:danielle@harmonizedtherapies.com.au?subject=Session Enquiry"
              className="bg-sage text-white text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-sage-dark transition-colors"
            >
              Enquire Now
            </a>
            <Link
              href="/contact"
              className="border border-cream/25 text-cream text-[0.78rem] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:border-cream/50 transition-colors"
            >
              Contact Danielle
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
