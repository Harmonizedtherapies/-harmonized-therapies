'use client'

import { useState, useRef, useEffect } from 'react'

export default function MeditationPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onLoaded = () => { setDuration(audio.duration); setLoaded(true) }
    const onTime = () => setProgress(audio.currentTime / audio.duration)
    const onEnded = () => { setPlaying(false); setProgress(0) }
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play(); setPlaying(true) }
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * audio.duration
  }

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-charcoal/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-gold/20 shadow-2xl">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Title */}
      <div className="text-center mb-8">
        <p className="text-[0.65rem] tracking-[0.22em] uppercase text-gold/60 mb-2">Guided Meditation</p>
        <h3 className="font-display text-[clamp(1.4rem,2.5vw,1.8rem)] italic font-light text-cream">{title}</h3>
        <p className="text-cream/40 text-xs mt-1">by Danielle Brierley</p>
      </div>

      {/* Waveform decorative */}
      <div className="flex items-center justify-center gap-0.5 mb-8 h-8" aria-hidden>
        {Array.from({ length: 40 }).map((_, i) => {
          const h = [0.3, 0.5, 0.8, 1, 0.7, 0.4, 0.9, 0.6, 0.3, 0.7][i % 10]
          const active = progress > i / 40
          return (
            <div
              key={i}
              className={`w-1 rounded-full transition-colors duration-300 ${active ? 'bg-gold' : 'bg-cream/15'}`}
              style={{ height: `${h * 100}%` }}
            />
          )
        })}
      </div>

      {/* Progress bar */}
      <div
        className="relative h-1 bg-cream/10 rounded-full mb-3 cursor-pointer group"
        onClick={seek}
      >
        <div
          className="absolute inset-y-0 left-0 bg-gold rounded-full transition-all"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `calc(${progress * 100}% - 6px)` }}
        />
      </div>

      {/* Times */}
      <div className="flex justify-between text-[0.65rem] text-cream/30 mb-8">
        <span>{fmt((audioRef.current?.currentTime) ?? 0)}</span>
        <span>{fmt(duration)}</span>
      </div>

      {/* Play / Pause button */}
      <div className="flex justify-center">
        <button
          onClick={toggle}
          disabled={!loaded}
          className="w-16 h-16 rounded-full bg-gold flex items-center justify-center hover:bg-gold/80 transition-colors disabled:opacity-40 shadow-lg shadow-gold/20"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg className="w-6 h-6 text-charcoal" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-charcoal ml-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
