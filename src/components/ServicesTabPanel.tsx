'use client'

import { useState } from 'react'

const services = [
  {
    id: 'signature',
    name: 'Harmonize Me — Signature',
    icon: '✨',
    description:
      'The ultimate Harmonized Therapies experience — 2.5 hours of full-body and soul integration. This signature session weaves together Havening, Access Bars, hot stone massage, and energy work into one deeply transformative treatment. Created by Danielle as a complete reset for the mind, body, and soul.',
    benefits: [
      '2.5 hour immersive treatment',
      'Combines Havening, Access Bars, and hot stone massage',
      'Deep nervous system reset and emotional release',
      'Energy work woven throughout',
      'Leaves you feeling clear, held, and profoundly restored',
    ],
    cta: 'Enquire About This Session',
  },
  {
    id: 'relaxation',
    name: 'Relaxation & Deep Tissue Massage',
    icon: '🌿',
    description:
      'A full-body massage designed to release the feel-good hormones and decrease cortisol. Using pure essential oils and natural oils, each session is tailored to your unique needs — whether you seek deep relaxation, relief from physical tension, or a restorative experience. A powerful pathway back to yourself.',
    benefits: [
      'Releases tension and muscular tightness',
      'Reduces cortisol and stress hormones',
      'Boosts endorphins, serotonin, and dopamine',
      'Improves circulation and lymphatic flow',
      'Deeply restorative for mind and body',
    ],
    cta: 'Book a Massage',
  },
  {
    id: 'hotstone',
    name: 'Hot Stone Massage',
    icon: '🪨',
    description:
      'An ancient form of healing using smooth, heated basalt stones placed along the body and used as an extension of the hands. The warmth penetrates deep into the muscles, melting tension and creating a profound sense of peace. Combined with aromatic oils, this is one of the most deeply grounding treatments available.',
    benefits: [
      'Deep muscle relaxation through therapeutic heat',
      'Relieves chronic muscle tension and pain',
      'Improves circulation and energy flow',
      'Calms the nervous system',
      'Deeply grounding and restorative',
    ],
    cta: 'Book a Hot Stone Massage',
  },
  {
    id: 'indian-head',
    name: 'Indian Head & Face Massage',
    icon: '🙏',
    description:
      'A deeply relaxing treatment targeting the head, neck, face, and shoulders — the areas where we hold the most tension. Drawing on ancient Ayurvedic tradition, this treatment relieves headaches, eases jaw tension, and creates a beautiful sense of calm. Often combined with Havening for an even deeper release.',
    benefits: [
      'Relieves headaches, migraines, and eye strain',
      'Eases jaw, neck, and shoulder tension',
      'Promotes deep relaxation and mental clarity',
      'Stimulates circulation to the scalp and face',
      'Can be combined with Face Havening for deeper release',
    ],
    cta: 'Book This Treatment',
  },
  {
    id: 'foot',
    name: 'Relaxation Foot Massage',
    icon: '🦶',
    description:
      'Your feet carry you through life — this treatment is a thank you to them. A deeply soothing foot massage working connection points throughout the foot and lower leg to promote relaxation throughout the whole body. Perfect as a standalone treatment or added to any session.',
    benefits: [
      'Relieves foot pain and plantar tension',
      'Stimulates reflexology connection points',
      'Reduces whole-body tension and stress',
      'Improves circulation in the legs and feet',
      'Deeply calming for the nervous system',
    ],
    cta: 'Book a Foot Massage',
  },
  {
    id: 'pregnancy',
    name: 'Pregnancy Massage',
    icon: '🤱',
    description:
      'A nurturing, gentle massage specifically designed for expectant mothers — using specialised supportive pillows to ensure comfort and safety at every stage of pregnancy. Eases the physical demands of carrying new life, reduces swelling, and creates a beautiful moment of connection between mother and baby.',
    benefits: [
      'Relieves back, hip, and pelvis discomfort',
      'Reduces swelling in hands, legs, and feet',
      'Eases stress, anxiety, and emotional overwhelm',
      'Promotes better sleep and deep relaxation',
      'Safe, gentle, and fully adapted to your stage of pregnancy',
    ],
    cta: 'Book a Pregnancy Massage',
  },
  {
    id: 'oncology',
    name: 'Oncology Massage',
    icon: '🌸',
    description:
      'Specialised massage therapy adapted for individuals at all stages of their cancer journey. With Level 1 and 2 Oncology Massage training and hands-on experience at Eastern Palliative Care, Danielle tailors every session with the utmost care. Mobile sessions are available — brought to your home, hospital, or care facility.',
    benefits: [
      'Reduces stress, anxiety, and treatment fatigue',
      'Eases nausea and discomfort',
      'Supports pain management with a gentle touch',
      'Improves sleep and relaxation',
      'Emotional and psychological support throughout',
    ],
    cta: 'Enquire About Oncology Massage',
  },
  {
    id: 'palliative',
    name: 'Palliative Massage',
    icon: '🕊️',
    description:
      'Compassionate, gentle massage designed to bring comfort, relaxation, and dignity to those facing life-limiting illness. Danielle\'s approach is intuitive and heart-centred, creating a safe space of peace and connection — for both the recipient and their loved ones. Mobile services available to homes, hospices, and aged care facilities.',
    benefits: [
      'Reduces pain and physical discomfort',
      'Eases anxiety and promotes calm',
      'Provides emotional and psychological support',
      'Enhances well-being and quality of life',
      'Mobile — wherever you need care',
    ],
    cta: 'Enquire About Palliative Massage',
  },
  {
    id: 'havening',
    name: 'Havening Techniques®',
    icon: '🤲',
    description:
      'Havening uses gentle psychosensory touch — applied to the upper arms, face, and hands — to stimulate delta waves in the brain, helping to de-link distressing memories from their emotional impact. Developed by Dr. Ronald A. Ruden, it\'s a science-backed technique that can create rapid, lasting change — often in just one session. Available in-person or via Zoom.',
    benefits: [
      'Rapid relief from trauma, stress, and anxiety',
      'Release of negative emotions and intrusive thoughts',
      'Boosts serotonin, dopamine and endorphins',
      'Improves emotional resilience and mental clarity',
      'Available in-person or via video call',
    ],
    cta: 'Book Havening',
  },
  {
    id: 'access',
    name: 'Access Bars',
    icon: '💫',
    description:
      'A gentle, hands-on energy technique that lightly touches 32 points on the head, storing the thoughts, beliefs, emotions, and patterns that shape your life. By activating them, Access Bars helps release limitations and create space for more ease, joy, and clarity. Many people describe it as feeling like you\'ve had a whole body massage — or a deeply restorative walk in nature.',
    benefits: [
      'Improved sleep and deep relaxation',
      'Reduced stress, anxiety, and overwhelm',
      'Greater ease in relationships and communication',
      'Enhanced mental clarity and focus',
      'Increased sense of possibility and openness',
    ],
    cta: 'Book Access Bars',
  },
  {
    id: 'nlp',
    name: 'NLP & Hypnotherapy',
    icon: '🧠',
    description:
      'Neuro-Linguistic Programming and conversational hypnotherapy work at the level of the subconscious mind to help you shift patterns, release limiting beliefs, and step into a more empowered version of yourself. Combined with Belief Change and Havening techniques, this is a powerful toolkit for transformation.',
    benefits: [
      'Release limiting beliefs and patterns',
      'Build confidence and self-esteem',
      'Overcome fears and phobias',
      'Support personal and professional goals',
      'Achieve lasting mindset change',
    ],
    cta: 'Book a Session',
  },
  {
    id: 'meditation',
    name: 'Meditation & Coaching',
    icon: '🌙',
    description:
      'Personalised well-being coaching integrating guided meditation, mindfulness practices, and holistic coaching strategies. Danielle creates a safe, trusting space where you feel heard, supported, and empowered — helping you plant new seeds of growth and release what no longer serves you.',
    benefits: [
      'Personalised meditation guidance',
      'Stress and anxiety management tools',
      'Mindfulness practices for daily life',
      'Goal setting and accountability',
      'Holistic approach to overall well-being',
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
          <h3 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-light text-charcoal leading-tight">
            {current.name}
          </h3>
        </div>
        <p className="text-charcoal/70 leading-relaxed mb-6">{current.description}</p>
        <ul className="space-y-2.5 mb-8">
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
