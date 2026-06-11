'use client'

import { useState } from 'react'

type Service = {
  id: string
  name: string
  tagline: string
  icon: string
  description: string[]
  benefits: string[]
  forYouIf: string[]
  note?: string
  cta: string
}

const services: Service[] = [
  {
    id: 'signature',
    name: 'Harmonize Me — Signature',
    tagline: 'The one that changes everything',
    icon: '✨',
    description: [
      "You've been holding it together for so long.",
      "The Harmonize Me Signature Session is my most complete and deeply personal offering — a full-body, full-soul experience that weaves together massage, Havening touch, breathwork, and intuitive coaching into one sacred session.",
      "I'll meet you exactly where you are — whether that's exhausted, anxious, grieving, or simply ready to come home to yourself.",
    ],
    benefits: [
      'Full body therapeutic massage with pure essential oils',
      'Havening Techniques® for emotional release',
      'Breathwork and nervous system regulation',
      'Intuitive coaching and gentle guidance',
      'A personalised take-home practice',
    ],
    forYouIf: [
      "You've been running on empty and your body is asking you to stop",
      "You're carrying stress, grief, or emotions you can't quite name",
      "You want more than a massage — you want to feel genuinely held",
      "You're ready for something that works on every level",
    ],
    cta: 'Enquire About This Session',
  },
  {
    id: 'relaxation',
    name: 'Relaxation & Deep Tissue Massage',
    tagline: 'Let your body finally breathe',
    icon: '🌿',
    description: [
      "Your body remembers everything — every late night, every hard conversation, every time you pushed through when you wanted to stop.",
      "This session is your permission slip to let it all go.",
      "Using long, flowing strokes for deep relaxation and targeted pressure for stubborn tension, I tailor every massage to what your body is asking for on the day. You'll leave feeling lighter, softer, and more like yourself.",
    ],
    benefits: [
      'Melts deep muscle tension and chronic tightness',
      'Calms the nervous system and lowers cortisol',
      'Improves circulation and lymphatic flow',
      'Boosts mood, energy and mental clarity',
      'Supports deeper, more restorative sleep',
    ],
    forYouIf: [
      "Your shoulders live somewhere near your ears",
      "You carry stress in your body and can't seem to switch off",
      "You need genuine, deep rest — not just an hour off",
      "It's been too long since someone took care of you",
    ],
    cta: 'Book a Massage',
  },
  {
    id: 'hotstone',
    name: 'Hot Stone Massage',
    tagline: "Warmth that reaches the places words can't",
    icon: '🪨',
    description: [
      "There is something about warmth — the way it melts not just muscle, but worry. Not just tightness, but the armour we forget we're wearing.",
      "Smooth, heated basalt stones are placed along the body's energy centres and used as an extension of my hands — delivering deep, penetrating heat that loosens tension at a cellular level.",
      "This is the massage people come back to again and again. Once you've experienced it, you'll understand why.",
    ],
    benefits: [
      'Deep muscle relaxation without intense pressure',
      'Improves circulation and detoxification',
      'Eases chronic pain and stiffness',
      'Profoundly calming for anxiety and overwhelm',
      'Restores a sense of deep inner warmth and safety',
    ],
    forYouIf: [
      "You hold tension deeply and find it hard to release",
      "You're sensitive to pressure but need deep work",
      "You're feeling emotionally or physically cold and depleted",
      "You want to feel completely, utterly held",
    ],
    cta: 'Book a Hot Stone Massage',
  },
  {
    id: 'indian-head',
    name: 'Indian Head & Face Massage',
    tagline: 'Release what lives in your head',
    icon: '🙏',
    description: [
      "So much of what we carry lives above the shoulders — the overthinking, the tension headaches, the jaw that hasn't unclenched in months.",
      "Indian Head and Face Massage works with the head, neck, face, scalp and shoulders to release the tension that builds there.",
      "You don't realise how much you're holding in your head until someone helps you let it go.",
    ],
    benefits: [
      'Relieves tension headaches and migraines',
      'Releases jaw tension and TMJ discomfort',
      'Reduces eye strain and sinus pressure',
      'Deeply calming for anxiety and mental fatigue',
      'Stimulates hair growth and scalp circulation',
      'Brings a profound sense of mental clarity and peace',
    ],
    forYouIf: [
      "You live in your head and struggle to come down",
      "You suffer from headaches, migraines or jaw tension",
      "You spend long hours at a screen",
      "You need something that reaches the places a body massage misses",
    ],
    cta: 'Book This Treatment',
  },
  {
    id: 'foot',
    name: 'Foot Massage & Reflexology',
    tagline: 'Everything is connected — start at the ground',
    icon: '🦶',
    description: [
      "In reflexology, every part of your foot maps to a part of your body. By working specific points on the feet, we can support the health and energy flow of your whole system.",
      "This is gentle, grounding, and surprisingly powerful.",
      "Many clients are amazed at how deeply they relax — and how much shifts — in a session that never goes above the ankle.",
    ],
    benefits: [
      "Stimulates the body's natural healing response",
      'Supports digestive, hormonal and immune health',
      'Deeply relaxing for the whole nervous system',
      'Reduces anxiety, stress and overwhelm',
      'Wonderfully grounding for those who feel scattered or disconnected',
    ],
    forYouIf: [
      "You're curious about energy-based healing",
      "You want the benefits of full body work in a gentle format",
      "You're going through hormonal changes or health challenges",
      "You need to feel grounded and reconnected to your body",
    ],
    cta: 'Book a Foot Massage',
  },
  {
    id: 'pregnancy',
    name: 'Pregnancy Massage',
    tagline: 'You are growing life — let someone take care of yours',
    icon: '🤱',
    description: [
      "Pregnancy is miraculous and beautiful and also — honestly — exhausting. Your body is doing the most extraordinary thing, and it deserves extraordinary care.",
      "Pregnancy massage is specifically designed for the changing needs of your body throughout each trimester. Using safe, supported positioning and gentle, nurturing techniques, I create a space where you can simply breathe, rest, and receive.",
      "Because you matter too — not just the baby growing inside you.",
    ],
    benefits: [
      'Relieves back, hip and sciatic pain',
      'Reduces swelling in hands, feet and ankles',
      'Eases pregnancy-related anxiety and overwhelm',
      'Improves sleep quality',
      'Supports nervous system regulation for birth preparation',
    ],
    forYouIf: [
      "Your body is working hard and needs gentle support",
      "You're carrying tension, worry or discomfort",
      "You want to feel nurtured and seen in your pregnancy",
      "You know that a calm mama grows a calm baby",
    ],
    note: 'Available from second trimester. Please consult your midwife or OB before booking.',
    cta: 'Book a Pregnancy Massage',
  },
  {
    id: 'oncology',
    name: 'Oncology Massage',
    tagline: 'A softer way to heal — for those navigating cancer',
    icon: '🌸',
    description: [
      "A cancer diagnosis changes everything. Your body is going through something enormous — and it deserves care that truly understands that.",
      "With Level 1 and 2 Oncology Massage training and hands-on experience working alongside Eastern Palliative Care, I bring both skill and deep compassion to every session.",
      "This is not a standard massage with modifications. It is a completely different approach — one built on safety, sensitivity, and the understanding that your body is doing extraordinary work.",
    ],
    benefits: [
      'Reduces treatment-related fatigue and side effects',
      'Eases nausea and physical discomfort',
      'Supports pain management',
      'Improves sleep and deep relaxation',
      'Provides a sense of normalcy, dignity and care',
    ],
    forYouIf: [
      "You or someone you love is navigating cancer",
      "You want gentle, knowledgeable, compassionate care",
      "You need someone who truly understands your body's needs right now",
      "You can't travel — mobile sessions available",
    ],
    cta: 'Enquire About Oncology Massage',
  },
  {
    id: 'palliative',
    name: 'Palliative Massage',
    tagline: 'The quiet gift of presence',
    icon: '🕊️',
    description: [
      "Some of the most sacred work I do happens in the quietest rooms.",
      "Palliative massage is gentle, intuitive bodywork for people living with life-limiting illness — and for the families who love them. It is not about fixing or curing. It is about comfort, dignity, peace, and the profound healing power of human touch.",
      "I bring this care directly to you — at home, in a hospice, in an aged care facility, or wherever you need me.",
    ],
    benefits: [
      'Eases physical pain and discomfort',
      'Reduces anxiety and restlessness',
      'Promotes deep calm and relaxation',
      'Supports emotional wellbeing for both individual and family',
      "Offers comfort during one of life's most tender passages",
    ],
    forYouIf: [
      "You or a loved one is living with a life-limiting illness",
      "Families wanting gentle, meaningful care for their loved one",
      "Aged care residents seeking comfort and human connection",
      "Anyone who simply needs to feel held",
    ],
    cta: 'Enquire About Palliative Massage',
  },
  {
    id: 'havening',
    name: 'Havening Techniques®',
    tagline: "We can't always change what happened — but we can change how it lives in your body",
    icon: '🤲',
    description: [
      "Some things stay with us long after they should have passed — the anxiety that arrives without warning, the memory that ambushes you, the feeling that no matter how much you process something, it's still there.",
      "Havening is different.",
      "Developed by Dr Ronald Ruden, Havening Techniques® are a science-backed, evidence-informed psychosensory therapy. Through gentle touch applied to the arms, face and hands, Havening generates delta waves in the brain — helping permanently de-link the emotional charge from distressing memories. The result? What once felt unbearable becomes simply something that happened.",
    ],
    benefits: [
      'Trauma, PTSD and complex grief',
      'Anxiety, panic attacks and phobias',
      'Birth trauma and loss',
      'Low self-worth and limiting beliefs',
      'Chronic stress and overwhelm',
      'Insomnia and nightmares',
    ],
    forYouIf: [
      "You've been carrying something heavy for a long time",
      "Talk therapy hasn't been enough",
      "You want rapid, lasting change without reliving every detail",
      "You're ready to feel free of what's been holding you back",
    ],
    note: 'Available in person in the Yarra Valley or via video call anywhere in Australia.',
    cta: 'Book Havening',
  },
  {
    id: 'access',
    name: 'Access Bars®',
    tagline: 'What if you could clear 10,000 years of limitation in 60 minutes?',
    icon: '💫',
    description: [
      "Access Bars® is one of those therapies that's almost impossible to describe — and absolutely unmistakable to experience.",
      "32 points on the head store every thought, belief, judgment, emotion and pattern you've ever had — about money, relationships, your body, and what's possible for you. By lightly holding these points, Access Bars® begins to dissolve the electromagnetic charge of those stored limitations.",
      "The result feels different for everyone. Some describe it as the best sleep they've ever had while still awake. Some feel a profound lightness. At the very least, you'll leave deeply relaxed. At best, your whole life might start to look different.",
    ],
    benefits: [
      'Deep relaxation and nervous system reset',
      'Reduced stress, anxiety and mental chatter',
      'Greater ease in relationships and decision making',
      'Enhanced clarity, creativity and focus',
      'A sense of expanded possibility',
    ],
    forYouIf: [
      "You feel stuck — in patterns, relationships, or your own thinking",
      "You're open to energy-based healing",
      "You want something that works on a deeper level than talk therapy",
      "You're simply curious and ready for something different",
    ],
    cta: 'Book Access Bars',
  },
  {
    id: 'nlp',
    name: 'NLP & Hypnotherapy',
    tagline: 'Change the story. Change the life.',
    icon: '🧠',
    description: [
      "Every pattern you have, every belief that holds you back — it all began as a story. A conclusion your mind drew, often in childhood, often from a single moment.",
      "NLP and conversational hypnotherapy work directly with the subconscious mind — where those stories live — to gently rewrite what no longer serves you.",
      "Sessions are conversational, warm and completely safe. There's no swinging watch, no being 'put under.' You are always in complete control — and many clients leave with a sense of clarity they haven't felt in years.",
    ],
    benefits: [
      'Limiting beliefs about yourself, your worth and potential',
      'Fear, phobias and anxiety',
      'Confidence and self-esteem',
      'Patterns in relationships',
      'Grief, loss and life transitions',
    ],
    forYouIf: [
      "You've tried everything else and keep hitting the same wall",
      "You suspect your mind is working against you",
      "You're ready to change at the root level",
      "You want something that works on the why, not just the what",
    ],
    cta: 'Book a Session',
  },
  {
    id: 'meditation',
    name: 'Meditation & Coaching',
    tagline: 'Come home to yourself',
    icon: '🌙',
    description: [
      "In a world that never stops, learning to be still is one of the most radical things you can do.",
      "Well-being coaching with Danielle is not a one-size-fits-all program. It is a deeply personal, intuitive process — part meditation guidance, part mindfulness practice, part gentle accountability, and part creating space for you to hear your own inner wisdom again.",
      "Whether you're navigating burnout, grief, a major life transition, or simply the quiet feeling that something needs to change — this work meets you where you are.",
    ],
    benefits: [
      'Personalised guided meditation',
      'Mindfulness tools for everyday life',
      'Nervous system regulation practices',
      'Goal setting and gentle accountability',
      'Breathwork and somatic awareness',
    ],
    forYouIf: [
      "You've lost touch with who you are beneath all the doing",
      "You want practical tools you can use every day",
      "You're navigating a significant life change or loss",
      "You need someone in your corner who truly sees you",
    ],
    cta: 'Book a Session',
  },
]

export default function ServicesTabPanel() {
  const [active, setActive] = useState('signature')
  const current = services.find(s => s.id === active)!

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-1 rounded-2xl overflow-hidden border border-charcoal/10 bg-warm-white">
      {/* Sidebar list */}
      <div className="bg-white flex flex-col">
        {services.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`flex items-center gap-3 px-6 py-4 text-left transition-colors border-b border-sage/8 last:border-0 ${
              active === s.id
                ? 'bg-sage text-white'
                : 'hover:bg-sage-light/40 text-charcoal'
            }`}
          >
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${active === s.id ? 'bg-white' : 'bg-sage'}`} />
            <span className="text-sm font-[400] tracking-wide">{s.name}</span>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div className="bg-white p-8 lg:p-10">
        <div className="flex items-start gap-4 mb-5">
          <span className="text-3xl">{current.icon}</span>
          <div>
            <h3 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-light text-charcoal leading-tight">
              {current.name}
            </h3>
            <p className="font-display text-sm font-light italic text-sage mt-1">{current.tagline}</p>
          </div>
        </div>

        <div className="space-y-3 mb-7">
          {current.description.map((para, i) => (
            <p key={i} className="text-charcoal/70 leading-relaxed">{para}</p>
          ))}
        </div>

        <div className="mb-6">
          <p className="text-[0.63rem] tracking-[0.18em] uppercase text-muted font-[400] mb-3">Benefits</p>
          <ul className="space-y-2.5">
            {current.benefits.map(b => (
              <li key={b} className="flex items-start gap-3 text-sm text-charcoal/70">
                <span className="text-sage mt-0.5 flex-shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l4 4 6-6" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-7">
          <p className="text-[0.63rem] tracking-[0.18em] uppercase text-muted font-[400] mb-3">This is for you if</p>
          <ul className="space-y-2.5">
            {current.forYouIf.map(item => (
              <li key={item} className="flex items-start gap-3 text-sm text-charcoal/70">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {current.note && (
          <p className="text-xs text-muted/70 italic mb-6 border-l-2 border-sage/20 pl-3">{current.note}</p>
        )}

        <a
          href={`mailto:danielle@harmonizedtherapies.com.au?subject=${encodeURIComponent(current.cta + ' — ' + current.name)}`}
          className="inline-block bg-sage text-white text-[0.75rem] tracking-[0.1em] uppercase px-6 py-3 rounded-full hover:bg-sage-dark transition-colors"
        >
          {current.cta}
        </a>
      </div>
    </div>
  )
}
