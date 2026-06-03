const items = [
  'Healing', 'Becoming', 'Grief', 'Restoration',
  'The Quiet Holders', 'Havening', 'Returning Home',
  'You Are Not Alone', 'Heart-Centred', 'Yarra Valley',
]

const dot = <span className="mx-6 text-gold/25">◆</span>

export default function Marquee() {
  const content = items.flatMap((item, i) => [
    <span key={`a-${i}`} className="text-gold/50 text-[0.6rem] tracking-[0.35em] uppercase font-body">
      {item}
    </span>,
    <span key={`d-${i}`} className="mx-6 text-gold/20">◆</span>,
  ])

  return (
    <div className="bg-charcoal border-y border-gold/10 py-3.5 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Duplicate for seamless loop */}
        <div className="flex items-center flex-shrink-0">{content}</div>
        <div className="flex items-center flex-shrink-0" aria-hidden>{content}</div>
      </div>
    </div>
  )
}
