import BotanicalDivider from './BotanicalDivider'

const reviews = [
  {
    name: 'Havening Client',
    service: 'Havening — Grief Session',
    text: 'I can highly recommend Danielle for Havening. I have had many different sessions now with her. The most amazing life changing experience I had was my session on Grief. Thank you Danielle.',
  },
  {
    name: 'Jodie Smart',
    service: 'Massage Therapy',
    text: 'I had the most amazing massage this week with the talented Danielle Brierley. My whole body went into a deep relaxation while she worked her magic on me. I floated out the door and I am so looking forward to my next session.',
  },
  {
    name: 'Massage & Havening Client',
    service: 'Massage & Havening',
    text: 'Loved my experience with Danielle! She came to my workplace where I received a massage and also Havening techniques. Not only does my body feel a lot more relaxed and not as sore or tight, I also feel so much better in myself.',
  },
  {
    name: 'Havening Client',
    service: 'Havening Techniques®',
    text: 'I cannot recommend Danielle enough! We have had a few sessions of Havening together and after each one I am left feeling so calm, refreshed, and euphoric. I highly suggest you try Havening with Danielle.',
  },
  {
    name: 'Pregnancy & Ongoing Client',
    service: 'Pregnancy & Relaxation Massage',
    text: "I've been seeing Danielle for a few years now and cannot recommend her highly enough! I started seeing her for pregnancy massages and now I see her to fix all my muscle aches and pains. I leave feeling like I'm floating on a cloud every time and I won't ever see anyone else!",
  },
  {
    name: 'Relaxation & Foot Massage Client',
    service: 'Relaxation & Foot Massage',
    text: 'Dani really knows how to get the best massage for your body. I walk out feeling amazing. Today I also added a foot massage — I already feel like I am walking better, no tension in my feet. Amazing! Thank you Dani.',
  },
  {
    name: 'Havening Client',
    service: 'Havening Techniques®',
    text: 'Danielle is a very skilled and intuitive Havening Techniques Practitioner. Her knowledge and experience woven into a gentle and kind manner enabled me to heal from a difficult situation that had influenced me for years.',
  },
  {
    name: 'Elysium Accounting',
    service: 'Massage Therapy',
    text: 'Highly recommend Danielle! An amazing massage therapist who ensures you feel as comfortable and relaxed as possible whilst alleviating all of your stresses. Extremely professional, welcoming, and accommodating to all needs.',
  },
]

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

export default function GoogleReviews() {
  return (
    <section className="bg-warm-white py-20 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <BotanicalDivider className="mb-6" />
          <p className="text-[0.68rem] tracking-[0.25em] uppercase text-sage mb-3 font-[400]">
            Client Experiences
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal mb-3">
            Kind Words
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Stars />
            <span className="text-sm text-muted font-light">5.0 · Google Reviews</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map(({ name, service, text }, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-warm-white flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <Stars />
              <p className="text-charcoal/75 text-sm leading-relaxed flex-1">
                &ldquo;{text}&rdquo;
              </p>
              <div>
                <p className="text-charcoal text-sm font-[400]">{name}</p>
                <p className="text-[0.65rem] tracking-[0.12em] uppercase text-sage mt-0.5">{service}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted text-sm mt-8">
          Find more reviews on{' '}
          <a
            href="https://www.google.com/search?q=Harmonized+Therapies+Danielle+Brierley+Yarra+Valley"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sage hover:underline"
          >
            Google · Harmonized Therapies ↗
          </a>
        </p>
      </div>
    </section>
  )
}
