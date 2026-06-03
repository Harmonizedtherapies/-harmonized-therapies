export default function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="orb-1 absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="orb-2 absolute bottom-0 left-10 w-72 h-72 rounded-full bg-gold/4 blur-3xl" />
    </div>
  )
}
