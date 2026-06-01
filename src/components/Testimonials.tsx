const testimonials = [
  {
    quote:
      'Danielle and I worked on my anxiety and panic disorder for approximately 6 months and it was probably one of the best decisions I have ever made. She has given me numerous positive coping methods to aid in my anxiety and panic disorder — helping me not only prepare for life challenges but also increase my confidence and self worth as a person.',
    service: 'Anxiety & Panic Disorder · Havening',
    featured: true,
  },
  {
    quote:
      "My Havening session with Danielle was fantastic. I'd been holding on to a traumatic experience for a long time — walked out feeling so much better. Would highly recommend giving it a try!",
    service: 'Havening Session',
    featured: false,
  },
  {
    quote:
      'Danielle is a very skilled and intuitive Havening Techniques Practitioner. Her knowledge and experience woven into a gentle and kind manner enabled me to heal from a difficult situation that had influenced me for years. I would definitely recommend her to anyone wanting to create a healthier and happier life.',
    service: 'Havening Techniques®',
    featured: false,
  },
  {
    quote:
      "Danielle makes you feel instantly comfortable and will adjust each session on the day if other things have arisen. She has helped me through some really tough traumas and given me the ability to move past them despite previous help from other sources. I couldn't recommend Danielle highly enough.",
    service: 'Trauma & Anxiety · Havening',
    featured: false,
  },
]

function Stars() {
  return (
    <span className="flex gap-0.5 text-gold text-base" aria-label="5 stars">
      {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
    </span>
  )
}

export default function Testimonials({ heading = 'What Clients Say' }: { heading?: string }) {
  const [featured, ...rest] = testimonials

  return (
    <section className="bg-warm-white py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[0.7rem] tracking-[0.22em] uppercase text-sage mb-3 font-[400]">
            Real words from real people
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal">
            {heading}
          </h2>
          <p className="mt-4 font-display text-lg italic text-muted font-light max-w-xl mx-auto">
            &ldquo;You are not alone — and you don&apos;t have to stay where you are.&rdquo;
          </p>
        </div>

        {/* Featured review */}
        <div className="bg-charcoal rounded-3xl p-8 lg:p-12 mb-6 relative overflow-hidden">
          <span
            aria-hidden="true"
            className="absolute -top-6 left-6 font-display text-[12rem] text-sage/8 leading-none pointer-events-none select-none"
          >
            &ldquo;
          </span>
          <div className="relative grid lg:grid-cols-[auto_1fr] gap-8 items-start">
            <div className="flex flex-col items-center lg:items-start gap-3">
              <div className="w-14 h-14 rounded-full bg-sage-dark flex items-center justify-center font-display text-2xl text-cream font-light flex-shrink-0">
                D
              </div>
              <Stars />
            </div>
            <div>
              <p className="font-display text-[clamp(1.1rem,2vw,1.4rem)] italic text-cream font-light leading-relaxed mb-4">
                &ldquo;{featured.quote}&rdquo;
              </p>
              <span className="text-[0.68rem] tracking-[0.15em] uppercase text-sage-mid">
                {featured.service}
              </span>
            </div>
          </div>
        </div>

        {/* Three card grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {rest.map(({ quote, service }, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 border border-warm-white flex flex-col gap-4"
            >
              <Stars />
              <p className="text-charcoal/75 text-sm leading-relaxed flex-1">
                &ldquo;{quote}&rdquo;
              </p>
              <span className="text-[0.66rem] tracking-[0.14em] uppercase text-sage font-[400]">
                {service}
              </span>
            </div>
          ))}
        </div>

        {/* Google link */}
        <p className="text-center text-muted text-sm">
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
