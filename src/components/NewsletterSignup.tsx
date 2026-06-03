import BotanicalDivider from './BotanicalDivider'

export default function NewsletterSignup() {
  return (
    <section className="bg-cream py-20 px-6 lg:px-10 relative overflow-hidden">

      <div className="max-w-2xl mx-auto text-center relative">
        <BotanicalDivider className="mb-8" />

        <p className="text-[0.68rem] tracking-[0.28em] uppercase text-sage mb-4 font-[400]">
          The Quiet Holders Community
        </p>

        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal italic mb-5">
          You don&apos;t have to walk this<br />path alone.
        </h2>

        <p className="text-muted leading-relaxed mb-2 max-w-md mx-auto">
          Receive gentle notes from Danielle on grief, healing, and becoming.
          Early access to retreats, oracle card releases, and offerings — straight to your inbox.
        </p>
        <p className="text-muted/60 text-sm mb-10">No spam. Just soul.</p>

        {/* Email form — opens email client to register interest */}
        <form
          action="mailto:danielle@harmonizedtherapies.com.au"
          method="post"
          encType="text/plain"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
        >
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            required
            className="flex-1 bg-white border border-sage/20 rounded-full px-5 py-3 text-sm text-charcoal placeholder-muted/50 outline-none focus:border-sage transition-colors"
          />
          <button
            type="submit"
            className="bg-sage text-white text-[0.72rem] tracking-[0.12em] uppercase px-6 py-3 rounded-full hover:bg-sage-dark transition-colors whitespace-nowrap"
          >
            Join the Community
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-4 text-[0.68rem] tracking-wide text-muted/60 uppercase">
          {['Oracle Card Updates', 'Retreat Announcements', 'Gentle Wisdom', 'Early Access'].map(tag => (
            <span key={tag} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-sage/50 inline-block" />
              {tag}
            </span>
          ))}
        </div>

        <BotanicalDivider className="mt-8" />
      </div>
    </section>
  )
}
