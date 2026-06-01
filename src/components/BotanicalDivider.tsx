export default function BotanicalDivider({
  className = '',
  color = 'text-sage/40',
}: {
  className?: string
  color?: string
}) {
  return (
    <div className={`flex items-center justify-center py-2 ${className}`}>
      <svg
        viewBox="0 0 320 48"
        fill="none"
        className={`w-64 h-10 ${color}`}
        aria-hidden="true"
      >
        {/* left stem */}
        <line x1="0" y1="24" x2="108" y2="24" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
        {/* left leaf pair */}
        <path d="M108 24 C96 14 80 12 74 20 C84 18 96 20 108 24Z" fill="currentColor" opacity="0.55" />
        <path d="M108 24 C96 34 80 36 74 28 C84 30 96 28 108 24Z" fill="currentColor" opacity="0.35" />
        {/* left small leaf */}
        <path d="M122 24 C114 17 104 16 101 22 C107 20 114 21 122 24Z" fill="currentColor" opacity="0.45" />
        <path d="M122 24 C114 31 104 32 101 26 C107 28 114 27 122 24Z" fill="currentColor" opacity="0.3" />
        {/* central motif — diamond */}
        <path d="M160 11 L168 24 L160 37 L152 24Z" fill="currentColor" opacity="0.5" />
        <path d="M160 16 L165 24 L160 32 L155 24Z" fill="white" opacity="0.6" />
        {/* right small leaf */}
        <path d="M198 24 C206 17 216 16 219 22 C213 20 206 21 198 24Z" fill="currentColor" opacity="0.45" />
        <path d="M198 24 C206 31 216 32 219 26 C213 28 206 27 198 24Z" fill="currentColor" opacity="0.3" />
        {/* right leaf pair */}
        <path d="M212 24 C224 14 240 12 246 20 C236 18 224 20 212 24Z" fill="currentColor" opacity="0.55" />
        <path d="M212 24 C224 34 240 36 246 28 C236 30 224 28 212 24Z" fill="currentColor" opacity="0.35" />
        {/* right stem */}
        <line x1="212" y1="24" x2="320" y2="24" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      </svg>
    </div>
  )
}
