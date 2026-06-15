import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import FloatingOrbs from '@/components/FloatingOrbs'
import { posts } from '@/lib/posts'

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find(p => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

// ─── Post content ────────────────────────────────────────────────────────────

function PostSittingWithGrief() {
  return (
    <>
      <p>
        I used to think grief was something you got through. A door you walked through once,
        and then you were on the other side of it.
      </p>
      <p>I don&apos;t think that anymore.</p>
      <p>
        After fourteen years of holding space for people — on the table, in conversation,
        in the quiet moments before and after a session — I&apos;ve come to understand grief
        differently. It&apos;s not a door. It&apos;s more like weather. It moves through. It changes
        shape. Some days it&apos;s a fine mist you barely notice. Other days it&apos;s a storm that
        knocks you flat, even years later, even when you thought you&apos;d &ldquo;dealt with it.&rdquo;
      </p>
      <p>Here&apos;s what I&apos;ve learned, sitting with people in that weather.</p>

      <p>
        <strong className="text-charcoal font-medium">Grief doesn&apos;t need to be fixed.</strong>{' '}
        So often, people apologise to me — for crying, for &ldquo;not being over it yet,&rdquo; for
        taking up space with their sadness. But grief was never a problem to solve. It&apos;s love
        with nowhere left to go. When someone lets themselves feel it fully, even for a moment,
        something in their body softens. Not because the grief is gone, but because it&apos;s been
        allowed to exist.
      </p>

      <p>
        <strong className="text-charcoal font-medium">The body remembers what the mind tries to forget.</strong>{' '}
        I&apos;ve worked with people who could talk about their loss calmly, almost matter-of-factly —
        and then, the moment I placed a hand on their shoulder, they wept. Not because anything
        was wrong, but because their body had been holding it, waiting for permission to let go,
        even briefly.
      </p>

      <p>
        <strong className="text-charcoal font-medium">You can be held without being fixed.</strong>{' '}
        This might be the biggest one. So much of what we&apos;re offered when we&apos;re grieving is
        advice — what to do, how to move forward, what stage we should be in. What I&apos;ve found
        people actually need, more often, is simply to not be alone in it. To have someone sit
        with them in the weather, without trying to change it.
      </p>

      <p>
        <strong className="text-charcoal font-medium">Healing isn&apos;t linear, and that&apos;s not a failure.</strong>{' '}
        I&apos;ve seen people make enormous progress — and then, on an anniversary, a smell, a song,
        find themselves right back in it. That&apos;s not regression. That&apos;s just how grief moves.
        It loops. It returns. It doesn&apos;t mean the healing didn&apos;t happen.
      </p>

      <p>
        <strong className="text-charcoal font-medium">You are allowed to be both — broken and becoming.</strong>{' '}
        So many of the people I sit with carry a quiet shame, as if grieving means they&apos;re
        somehow failing at life, at resilience, at moving on. But I&apos;ve never once seen
        someone&apos;s grief and thought less of them for it. If anything, it&apos;s often the people
        who&apos;ve grieved the deepest who go on to hold the most space for others.
      </p>

      <p>
        If there&apos;s one thing I&apos;d want anyone reading this to take with them, it&apos;s this:
        you don&apos;t have to carry it alone, and you don&apos;t have to carry it &ldquo;right.&rdquo;
        Grief isn&apos;t something to get over. It&apos;s something to be held through.
      </p>

      <p>That&apos;s the work. That&apos;s always been the work.</p>
    </>
  )
}

function PostHoldingSpace() {
  return (
    <>
      <p>
        &ldquo;Holding space&rdquo; has become one of those phrases that gets used so often it risks
        losing its meaning. So let me tell you what it actually means — not in theory, but in the
        moments I have lived it.
      </p>
      <p>It means sitting in a hospital room at midnight when everyone else has gone home.</p>
      <p>
        It means not offering solutions when someone is sobbing. Not filling the silence. Not
        reaching for your phone. Just — staying.
      </p>
      <p>
        It means trusting that another person&apos;s pain does not need to be fixed.
        It needs to be <em>witnessed</em>.
      </p>
      <p>
        I first truly understood this in the NICU, when my son was in a humidicrib and I was across
        the ward in a wheelchair, unable to reach him. The nurses who held space for me in those
        days didn&apos;t say the right things. There are no right things. But they stayed present.
        They saw me. And that — that seeing — was everything.
      </p>
      <p>
        It is where the name <em>The Quiet Holders</em> comes from. Those people who walk quietly
        into the hardest rooms. Who hold the space between fear and hope without trying to rush you
        to one side or the other.
      </p>

      <h2>What holding space is not</h2>
      <p>It is not fixing. It is not advising. It is not making someone feel better so that <em>you</em> feel better.</p>
      <p>
        It is not waiting for your turn to speak. It is not comparing their pain to someone else&apos;s.
        It is not saying <em>I know how you feel</em> when you don&apos;t.
      </p>

      <h2>What holding space is</h2>
      <p>It is full presence. The choice to be <em>here</em>, in this moment, with this person, without an agenda.</p>
      <p>It is trusting that silence is not awkward — it is generous.</p>
      <p>It is understanding that your discomfort with someone&apos;s grief is not their responsibility to manage.</p>
      <p>
        It is believing, deeply, that people have within them the capacity to move through hard
        things — and that your role is simply to accompany them while they do.
      </p>

      <h2>You can learn to hold space — for others, and for yourself</h2>
      <p>
        This is something I teach in my workshops and retreats. But it begins simply: with a
        willingness to stay. To resist the urge to fix. To let someone&apos;s experience be exactly
        what it is, without rushing it toward resolution.
      </p>
      <p>
        If you feel called to this work — whether for the people you love, or as a professional
        practice — I would love to explore that with you.
      </p>
      <p>The world needs more quiet holders.</p>
    </>
  )
}

function PostWhatIsHavening() {
  return (
    <>
      <p>
        Havening is a relatively new psychosensory healing technique, and I get asked about it
        constantly. People find me through Google or Instagram and their first question is always
        some version of: <em>what even is it?</em>
      </p>
      <p>So let me explain — simply, warmly, and honestly.</p>
      <p>
        Havening Techniques® were developed by Dr Ronald Ruden, a New York physician and
        neuroscientist, who spent years studying how the brain encodes trauma and how it can be
        helped to release it. The name comes from the word <em>haven</em> — a place of safety.
      </p>
      <p>
        At its heart, Havening is a form of touch therapy. Gentle, rhythmic strokes applied to
        specific parts of the body — the arms, face, and palms — create delta waves in the brain.
        These are the same slow waves produced during deep sleep. And when delta waves are present
        at the same time as a distressing memory or feeling, something remarkable happens: the
        emotional charge attached to that memory begins to dissolve.
      </p>
      <p>
        The science is called <em>depotentiation</em> — the weakening of a traumatic memory&apos;s
        grip on the nervous system. What was encoded during a moment of overwhelm is gently, safely
        re-processed. The memory doesn&apos;t disappear. But it no longer has the same power over you.
      </p>
      <p>
        I came to Havening not through study, but through my own healing. After years of grief —
        babies lost, hospital rooms, the kind of pain that has no ceremony — I found my way to a
        healer in Bali who introduced me to Havening. Within a session, something shifted that
        14 years of other work hadn&apos;t touched.
      </p>
      <p>That is why I trained. That is why I use it.</p>

      <h2>What can Havening help with?</h2>
      <p>In my practice, I use Havening Techniques® with clients working through:</p>
      <ul>
        <li>Anxiety and chronic stress</li>
        <li>Grief and loss — including pregnancy loss, birth trauma, and anticipatory grief</li>
        <li>Phobias and fears</li>
        <li>Traumatic memories</li>
        <li>Emotional overwhelm</li>
        <li>Sleeplessness rooted in an activated nervous system</li>
      </ul>
      <p>
        It is also beautiful simply as a self-soothing practice — which is why I teach self-Havening
        in sessions, and why I created a free guide to help you begin at home.
      </p>

      <h2>What does a session feel like?</h2>
      <p>
        Sessions are gentle, fully clothed, and led entirely at your pace. I will guide you through
        specific eye movements and self-touch while we move through the memory or feeling
        that&apos;s troubling you. Many clients describe a sense of lightness afterward — like
        something they&apos;ve been carrying has been set down.
      </p>
      <p>Some notice shifts within a single session. For deeper or more complex trauma, we build over time.</p>

      <h2>Is it right for me?</h2>
      <p>
        If you&apos;ve tried talk therapy and feel like the words run out before the healing does —
        Havening might be worth exploring. It works at the body level, not just the mind. It meets
        you where you are.
      </p>
      <p>If you&apos;d like to learn more or book a session, I&apos;d love to hear from you.</p>
    </>
  )
}

function PostGriefTimeline() {
  return (
    <>
      <p>Someone said to me recently: <em>&ldquo;I should be over it by now.&rdquo;</em></p>
      <p>
        They were talking about a loss from three years ago. A baby who came too early. A grief
        that had no funeral, no ceremony, no casseroles on the doorstep. The kind of loss that
        people around you quietly expect you to recover from — because they don&apos;t know what
        else to do with it.
      </p>
      <p>
        I sat with them in that moment and I thought: <em>who told you that? Who taught you that
        grief has a deadline?</em>
      </p>

      <h2>Grief is not a process you complete</h2>
      <p>
        It is not a set of stages to move through and emerge from, ticking boxes as you go. It is
        not linear. It does not respond to time the way we want it to. It resurfaces at strange
        moments — in the cereal aisle, on a Tuesday afternoon, when a song plays that you
        didn&apos;t even know was connected.
      </p>
      <p>That is not failure. That is love, with nowhere to go.</p>

      <h2>What grief needs is not time. It needs witness.</h2>
      <p>
        The reason so many people carry grief quietly and alone is that our culture does not know
        how to sit with it. We rush to comfort. We offer silver linings. We say <em>at least</em>{' '}
        and <em>you&apos;ll get through this</em> and <em>they&apos;re in a better place</em> —
        because the discomfort of witnessing someone&apos;s pain is almost unbearable.
      </p>
      <p>
        But what grieving people often need is not solutions or timelines or encouragement. They
        need someone to stay. To sit in the hard room with them, without flinching or looking for
        the exit.
      </p>
      <p>
        That is what I try to offer in my practice. And it is what The Quiet Holders, at its heart,
        is about.
      </p>

      <h2>If you are still carrying something</h2>
      <p>You are not behind. You are not broken. You are not failing at grief.</p>
      <p>
        You are carrying something real, and real things take time — not a prescribed amount of
        time, but the right time. <em>Your</em> time.
      </p>
      <p>
        If you would like support — whether through Havening, massage, coaching, or simply a held
        space — my door is open.
      </p>
      <p>You don&apos;t have to carry this alone.</p>
    </>
  )
}

const contentMap: Record<string, React.FC> = {
  'what-ive-learned-sitting-with-grief': PostSittingWithGrief,
  'what-it-means-to-hold-space': PostHoldingSpace,
  'what-is-havening': PostWhatIsHavening,
  'grief-has-no-timeline': PostGriefTimeline,
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts.find(p => p.slug === slug)
  if (!post) notFound()

  const Content = contentMap[slug]
  if (!Content) notFound()

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-charcoal pt-36 pb-20 px-6 lg:px-10 overflow-hidden">
        <FloatingOrbs />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <FadeIn className="max-w-3xl mx-auto text-center relative">
          <Link
            href="/the-quiet-corner"
            className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.22em] uppercase text-cream/40 hover:text-cream/70 transition-colors mb-8"
          >
            ← The Quiet Corner
          </Link>
          <p className="text-[0.65rem] tracking-[0.22em] uppercase text-gold/60 mb-5 font-[400]">
            {post.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.8rem)] font-light text-cream italic leading-tight mb-6">
            {post.title}
          </h1>
          <div className="w-14 h-px bg-gold/40 mx-auto mb-6" />
          <div className="flex items-center justify-center gap-4 text-xs text-cream/35">
            <time dateTime={post.dateISO}>{post.date}</time>
            <span className="w-1 h-1 rounded-full bg-cream/20 inline-block" />
            <span>{post.readTime}</span>
          </div>
        </FadeIn>
      </section>

      {/* ─── CONTENT ─── */}
      <section className="bg-warm-white py-20 px-6 lg:px-10">
        <FadeIn className="max-w-2xl mx-auto">
          <div className="
            text-charcoal/70 leading-[1.9] text-[1.05rem]
            [&>p]:mb-6
            [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-light [&>h2]:text-charcoal [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:italic
            [&>ul]:mb-6 [&>ul]:space-y-2 [&>ul>li]:pl-5 [&>ul>li]:relative [&>ul>li]:before:content-['–'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-sage
            [&>em]:text-charcoal/90
          ">
            <Content />
          </div>

          {/* Signature */}
          <div className="mt-14 pt-10 border-t border-sage/15">
            <p className="font-display text-lg italic text-charcoal/60 mb-1">With love,</p>
            <p className="font-display text-2xl font-light text-charcoal italic">Danielle</p>
            <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted mt-1">
              Harmonized Therapies · Yarra Valley
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ─── MORE POSTS ─── */}
      <section className="bg-cream py-16 px-6 lg:px-10">
        <FadeIn className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[0.68rem] tracking-[0.2em] uppercase text-sage mb-2 font-[400]">Keep reading</p>
            <p className="font-display text-xl font-light text-charcoal italic">More from The Quiet Corner</p>
          </div>
          <Link
            href="/the-quiet-corner"
            className="whitespace-nowrap bg-sage text-white text-[0.72rem] tracking-[0.1em] uppercase px-6 py-3 rounded-full hover:bg-sage-dark transition-colors"
          >
            All Writings →
          </Link>
        </FadeIn>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-charcoal py-20 px-6 lg:px-10 relative overflow-hidden">
        <FloatingOrbs />
        <FadeIn className="max-w-2xl mx-auto text-center relative">
          <p className="text-[0.68rem] tracking-[0.25em] uppercase text-gold/60 mb-4 font-[400]">
            Go deeper
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light text-cream mb-5">
            Ready for a one-on-one session?
          </h2>
          <p className="text-cream/50 leading-relaxed mb-8">
            If something here moved you, a private session with Danielle can take that
            healing further. Book a free 20-minute discovery call.
          </p>
          <a
            href="mailto:danielle@harmonizedtherapies.com.au?subject=Free Discovery Call"
            className="inline-block bg-gold text-charcoal text-[0.75rem] tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:bg-gold/80 transition-colors"
          >
            Book a Free Discovery Call
          </a>
        </FadeIn>
      </section>
    </>
  )
}
