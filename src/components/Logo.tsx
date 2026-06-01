export default function Logo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      className={className}
      aria-label="Harmonized Therapies logo"
    >
      <circle cx="22" cy="22" r="20.5" stroke="currentColor" strokeWidth="1.2" />
      {/* left leaf — filled */}
      <path
        d="M22 3.5 C22 3.5 10 11 10 22 C10 33 22 40.5 22 40.5 C22 40.5 18 35 16 29 C14 23 14 21 16 15 C18 9 22 3.5 22 3.5Z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* right leaf — lighter */}
      <path
        d="M22 3.5 C22 3.5 34 11 34 22 C34 33 22 40.5 22 40.5 C22 40.5 26 35 28 29 C30 23 30 21 28 15 C26 9 22 3.5 22 3.5Z"
        fill="currentColor"
        opacity="0.35"
      />
      {/* upper dot */}
      <circle cx="22" cy="14" r="3.2" fill="white" />
      {/* lower dot */}
      <circle cx="22" cy="30" r="3.2" fill="currentColor" opacity="0.55" />
    </svg>
  )
}
