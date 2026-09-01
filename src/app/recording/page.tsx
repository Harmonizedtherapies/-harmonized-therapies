'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Logo from '@/components/Logo'

function RecordingPlayer() {
  const params = useSearchParams()
  const token = params.get('token') ?? ''
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [title, setTitle] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!token) { setStatus('error'); return }
    fetch(`/api/recording?token=${token}`)
      .then(r => r.json())
      .then(d => {
        if (d.url) { setAudioUrl(d.url); setTitle(d.title); setStatus('ready') }
        else setStatus('error')
      })
      .catch(() => setStatus('error'))
  }, [token])

  function togglePlay() {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause(); setPlaying(false) }
    else { a.play(); setPlaying(true) }
  }

  function onTimeUpdate() {
    const a = audioRef.current
    if (!a || !a.duration) return
    setProgress((a.currentTime / a.duration) * 100)
  }

  function onLoadedMetadata() {
    const a = audioRef.current
    if (a) setDuration(a.duration)
  }

  function onEnded() { setPlaying(false); setProgress(0) }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const a = audioRef.current
    if (!a) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    a.currentTime = pct * a.duration
  }

  function formatTime(s: number) {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const currentTime = audioRef.current?.currentTime ?? 0

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-muted text-sm">Loading your recording…</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <p className="text-muted text-sm text-center">This link appears to be invalid. Please check your message from Danielle.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-charcoal px-6 py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <div className="relative">
          <div className="w-10 mx-auto mb-5 text-gold/40">
            <Logo />
          </div>
          <p className="text-[0.68rem] tracking-[0.22em] uppercase text-gold/60 mb-3 font-[400]">
            A recording for you
          </p>
          <h1 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-light text-cream leading-tight">
            {title}
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-14">
        <div className="bg-white rounded-3xl p-8 border border-sage/10 shadow-sm">

          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onEnded={onEnded}
          />

          {/* Play button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-sage flex items-center justify-center hover:bg-sage-dark transition-colors shadow-md"
            >
              {playing ? (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Progress bar */}
          <div
            className="h-1.5 bg-cream rounded-full cursor-pointer mb-3 overflow-hidden"
            onClick={seek}
          >
            <div
              className="h-full bg-sage rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Times */}
          <div className="flex justify-between text-[0.65rem] text-muted/60 mb-8">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Download */}
          <a
            href={audioUrl}
            download
            className="block text-center w-full border border-charcoal/10 rounded-full py-3.5 text-[0.72rem] tracking-[0.15em] uppercase text-muted hover:border-sage hover:text-sage transition-colors"
          >
            Download recording
          </a>
        </div>

        <div className="mt-8 rounded-2xl border border-gold/20 bg-gold-light/40 px-6 py-5 text-center">
          <p className="text-charcoal/60 text-xs leading-relaxed">
            This recording was made especially for you by Danielle.<br />
            Find a quiet moment, put in your headphones, and let yourself receive it.
          </p>
        </div>
      </div>

      <div className="text-center pb-10">
        <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted/50">Harmonized Therapies · Yarra Valley</p>
      </div>
    </div>
  )
}

export default function RecordingPage() {
  return (
    <Suspense>
      <RecordingPlayer />
    </Suspense>
  )
}
