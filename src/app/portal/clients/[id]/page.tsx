'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase, type Client, type Session, type ClientFile, type ClientRecording, type MassageConsentData } from '@/lib/supabase'

const labelClass = 'text-[0.65rem] tracking-[0.15em] uppercase text-muted font-[400]'
const inputClass = 'w-full border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal outline-none focus:border-sage transition-colors'

// ─── Helpers ────────────────────────────────────────────────────────────────

function CopyButton({ url, label = 'Copy link' }: { url: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="text-[0.7rem] tracking-[0.1em] uppercase px-4 py-2 rounded-full border border-sage/30 text-sage hover:bg-sage hover:text-white transition-colors whitespace-nowrap"
    >
      {copied ? 'Copied ✓' : label}
    </button>
  )
}

function StatusPill({ submitted, submittedAt }: { submitted: boolean; submittedAt: string | null }) {
  return submitted ? (
    <span className="flex items-center gap-1.5 text-[0.65rem] tracking-[0.08em] uppercase text-sage">
      <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
      {submittedAt ? new Date(submittedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }) : 'Submitted'}
    </span>
  ) : (
    <span className="flex items-center gap-1.5 text-[0.65rem] tracking-[0.08em] uppercase text-muted">
      <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
      Awaiting
    </span>
  )
}

function ReadField({ label, value }: { label: string; value: string | number | boolean | null | undefined }) {
  if (value === null || value === undefined || value === '') return null
  const display = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)
  return (
    <div className="pt-4 first:pt-0">
      <p className={labelClass + ' mb-1'}>{label}</p>
      <p className="text-sm text-charcoal leading-relaxed">{display}</p>
    </div>
  )
}

function SendButton({ onSend, hasEmail }: { onSend: () => Promise<void>; hasEmail: boolean }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  if (!hasEmail) return <span className="text-[0.65rem] text-muted/40">No email on file</span>
  async function handle() {
    setStatus('sending')
    try { await onSend(); setStatus('sent') } catch { setStatus('error') }
    setTimeout(() => setStatus('idle'), 3000)
  }
  return (
    <button onClick={handle} disabled={status === 'sending'}
      className="text-[0.7rem] tracking-[0.1em] uppercase px-4 py-2 rounded-full bg-sage-dark text-cream hover:bg-sage transition-colors disabled:opacity-50 whitespace-nowrap">
      {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : status === 'error' ? 'Error' : 'Send email'}
    </button>
  )
}

function LinkCard({ label, link, submitted, submittedAt, onSend, hasEmail }: {
  label: string; link: string; submitted: boolean; submittedAt: string | null
  onSend?: () => Promise<void>; hasEmail?: boolean
}) {
  return (
    <div className="bg-cream rounded-xl p-4 border border-charcoal/6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className={labelClass}>{label}</p>
        <StatusPill submitted={submitted} submittedAt={submittedAt} />
      </div>
      <p className="text-[0.65rem] text-muted/60 font-mono truncate mb-3">{link}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <CopyButton url={link} />
        {onSend && <SendButton onSend={onSend} hasEmail={hasEmail ?? false} />}
      </div>
    </div>
  )
}

// ─── Intake section ──────────────────────────────────────────────────────────

function IntakeSection({ client }: { client: Client }) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const link = `${baseUrl}/welcome?token=${client.intake_token}`
  const intake = client.intake

  async function sendIntake() {
    const res = await fetch('/api/portal/send-intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: client.id }),
    })
    if (!res.ok) throw new Error('Send failed')
  }

  return (
    <div className="space-y-5">
      {/* Link card */}
      <div className="bg-white rounded-2xl p-6 border border-sage/10">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <p className={labelClass + ' mb-1'}>Welcome intake form</p>
            <p className="text-[0.65rem] text-muted/60 font-mono truncate max-w-xs">{link}</p>
          </div>
          <StatusPill submitted={!!client.intake_submitted_at} submittedAt={client.intake_submitted_at} />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <CopyButton url={link} />
          <SendButton onSend={sendIntake} hasEmail={!!client.email} />
        </div>
      </div>

      {!intake && (
        <p className="text-center text-muted text-sm py-6">No intake response yet.</p>
      )}

      {/* Soul responses */}
      {intake && (
        <>
          <div className="bg-white rounded-2xl p-6 border border-sage/10">
            <p className="text-[0.68rem] tracking-[0.22em] uppercase text-sage mb-4">Soul</p>
            <div className="divide-y divide-charcoal/5">
              <ReadField label="What brought them here" value={intake.what_brought_you} />
              <ReadField label="How long carrying this" value={intake.how_long_carrying} />
              <ReadField label="What healing would feel like" value={intake.what_would_healing_feel_like} />
              <ReadField label="Where they feel it in their body" value={intake.where_in_body} />
              <ReadField label="What needs the most care" value={intake.needs_care} />
            </div>
          </div>

          {/* Health responses */}
          <div className="bg-white rounded-2xl p-6 border border-sage/10">
            <p className="text-[0.68rem] tracking-[0.22em] uppercase text-sage mb-4">Health & body</p>
            <div className="divide-y divide-charcoal/5">
              <div className="grid sm:grid-cols-3 gap-x-6 pb-4">
                <ReadField label="Date of birth" value={intake.dob ? new Date(intake.dob + 'T00:00:00').toLocaleDateString('en-AU') : null} />
                <ReadField label="Occupation" value={intake.occupation} />
                <ReadField label="Emergency contact" value={intake.emergency_contact} />
              </div>
              <ReadField label="Medical conditions" value={intake.medical_conditions} />
              <ReadField label="Medications" value={intake.medications} />
              <ReadField label="Recent injuries" value={intake.recent_injuries} />
              <ReadField label="Skin conditions" value={intake.skin_conditions} />
              <ReadField label="Pregnant" value={intake.pregnant} />
              <ReadField label="Areas to avoid" value={intake.areas_to_avoid} />
              <ReadField label="Consent given" value={intake.consent_given} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ─── Consent section ─────────────────────────────────────────────────────────

function ConsentSection({ client }: { client: Client }) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const link = `${baseUrl}/massage-consent?token=${client.massage_consent_token}`
  const consent = client.massage_consent as MassageConsentData | null

  async function sendConsent() {
    const res = await fetch('/api/portal/send-massage-consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: client.id }),
    })
    if (!res.ok) throw new Error('Send failed')
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl p-6 border border-sage/10">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <p className={labelClass + ' mb-1'}>Massage consent form</p>
            <p className="text-[0.65rem] text-muted/60 font-mono truncate max-w-xs">{link}</p>
          </div>
          <StatusPill submitted={!!client.massage_consent_submitted_at} submittedAt={client.massage_consent_submitted_at} />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <CopyButton url={link} />
          <SendButton onSend={sendConsent} hasEmail={!!client.email} />
          <a
            href="/print/massage-consent"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.7rem] tracking-[0.1em] uppercase px-4 py-2 rounded-full border border-sage/30 text-sage hover:bg-sage hover:text-white transition-colors whitespace-nowrap"
          >
            Print blank form
          </a>
        </div>
      </div>

      {!consent && (
        <p className="text-center text-muted text-sm py-6">No consent form submitted yet.</p>
      )}

      {consent && (
        <>
          <div className="bg-white rounded-2xl p-6 border border-sage/10">
            <p className="text-[0.68rem] tracking-[0.22em] uppercase text-sage mb-4">Personal details</p>
            <div className="divide-y divide-charcoal/5">
              <div className="grid sm:grid-cols-3 gap-x-6 pb-4">
                <ReadField label="Full name" value={consent.full_name} />
                <ReadField label="Date of birth" value={consent.dob ? new Date(consent.dob + 'T00:00:00').toLocaleDateString('en-AU') : null} />
                <ReadField label="Phone" value={consent.phone} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-sage/10">
            <p className="text-[0.68rem] tracking-[0.22em] uppercase text-sage mb-4">Health information</p>
            <div className="divide-y divide-charcoal/5">
              <ReadField label="Health conditions" value={consent.health_conditions} />
              <ReadField label="Medications" value={consent.medications} />
              <ReadField label="Recent surgery or injury" value={consent.recent_surgery_injury} />
              <ReadField label="Skin conditions or allergies" value={consent.skin_conditions} />
              <ReadField label="Pregnant" value={consent.pregnant} />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-sage/10">
            <p className="text-[0.68rem] tracking-[0.22em] uppercase text-sage mb-4">Preferences</p>
            <div className="divide-y divide-charcoal/5">
              <ReadField label="Areas to avoid" value={consent.areas_to_avoid} />
              <ReadField label="Pressure preference" value={consent.pressure_preference} />
              <ReadField label="Consent given" value={consent.consent_given} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ─── Session card ────────────────────────────────────────────────────────────

function SessionCard({ session, clientEmail, onUpdate }: { session: Session; clientEmail: string | null; onUpdate: () => void }) {
  const [open, setOpen] = useState(false)
  const [notes, setNotes] = useState(session.danielle_notes ?? '')
  const [savingNotes, setSavingNotes] = useState(false)
  const [savedNotes, setSavedNotes] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  const arrivalLink = `${baseUrl}/arrival?token=${session.arrival_token}`
  const reflectionLink = `${baseUrl}/reflection?token=${session.reflection_token}`

  async function sendArrival() {
    const res = await fetch('/api/portal/send-arrival', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: session.id }),
    })
    if (!res.ok) throw new Error('Send failed')
  }

  async function sendReflection() {
    const res = await fetch('/api/portal/send-reflection', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: session.id }),
    })
    if (!res.ok) throw new Error('Send failed')
  }
  const date = new Date(session.session_date + 'T00:00:00').toLocaleDateString('en-AU', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  async function saveNotes() {
    setSavingNotes(true)
    await supabase.from('sessions').update({ danielle_notes: notes }).eq('id', session.id)
    setSavingNotes(false)
    setSavedNotes(true)
    setTimeout(() => setSavedNotes(false), 2000)
  }

  async function deleteSession() {
    if (!confirm('Delete this session? This cannot be undone.')) return
    setDeleting(true)
    await supabase.from('sessions').delete().eq('id', session.id)
    onUpdate()
  }

  return (
    <div className="bg-white rounded-2xl border border-sage/10 overflow-hidden">
      {/* Header row */}
      <div className="flex items-center">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex-1 px-6 py-5 flex items-center gap-5 hover:bg-sage/2 transition-colors text-left"
        >
          <span className={`text-muted text-sm transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>▶</span>
          <div>
            <p className="font-display text-lg font-light text-charcoal">{date}</p>
            <div className="flex items-center gap-4 mt-0.5">
              <StatusPill submitted={!!session.arrival_submitted_at} submittedAt={session.arrival_submitted_at} />
              <span className="text-muted/30 text-xs">·</span>
              <StatusPill submitted={!!session.reflection_submitted_at} submittedAt={session.reflection_submitted_at} />
            </div>
          </div>
        </button>
        <button
          onClick={deleteSession}
          disabled={deleting}
          className="px-5 py-5 text-muted/30 hover:text-red-400 transition-colors text-sm disabled:opacity-40"
          title="Delete session"
        >
          ✕
        </button>
      </div>

      {open && (
        <div className="px-6 pb-7 space-y-6 border-t border-charcoal/5 pt-5">

          {/* Form links */}
          <div className="grid sm:grid-cols-2 gap-3">
            <LinkCard
              label="Arrival check-in"
              link={arrivalLink}
              submitted={!!session.arrival_submitted_at}
              submittedAt={session.arrival_submitted_at}
              onSend={sendArrival}
              hasEmail={!!clientEmail}
            />
            <LinkCard
              label="Post-session reflection"
              link={reflectionLink}
              submitted={!!session.reflection_submitted_at}
              submittedAt={session.reflection_submitted_at}
              onSend={sendReflection}
              hasEmail={!!clientEmail}
            />
          </div>

          {/* Arrival responses */}
          {session.arrival && (
            <div className="bg-sage/5 rounded-xl p-5">
              <p className="text-[0.65rem] tracking-[0.18em] uppercase text-sage mb-4">Arrival check-in</p>
              <div className="grid sm:grid-cols-3 gap-x-6 mb-4">
                <ReadField label="One word" value={session.arrival.word} />
                <ReadField label="Body feeling" value={session.arrival.body_feeling != null ? `${session.arrival.body_feeling} / 10` : null} />
                <ReadField label="Heart feeling" value={session.arrival.heart_feeling != null ? `${session.arrival.heart_feeling} / 10` : null} />
              </div>
              {session.arrival.anything_to_know && (
                <ReadField label="Anything to know" value={session.arrival.anything_to_know} />
              )}
            </div>
          )}

          {/* Reflection responses */}
          {session.reflection && (
            <div className="bg-gold-light/40 rounded-xl p-5">
              <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gold mb-4">Post-session reflection</p>
              <div className="divide-y divide-charcoal/5">
                <ReadField label="How they're feeling now" value={session.reflection.feeling_now} />
                <ReadField label="What they noticed" value={session.reflection.what_noticed} />
                <ReadField label="Taking home" value={session.reflection.taking_home} />
                <ReadField label="Want to remember" value={session.reflection.want_to_remember} />
              </div>
            </div>
          )}

          {/* Danielle's notes */}
          <div>
            <label className={labelClass + ' mb-2 block'}>My notes</label>
            <textarea
              rows={4}
              value={notes}
              onChange={e => { setNotes(e.target.value); setSavedNotes(false) }}
              className="w-full border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal outline-none focus:border-sage transition-colors resize-none"
              placeholder="Session observations, what came up, follow-up intentions..."
            />
            <button
              onClick={saveNotes}
              disabled={savingNotes}
              className="mt-2 bg-sage text-white text-[0.7rem] tracking-[0.1em] uppercase px-5 py-2 rounded-full hover:bg-sage-dark transition-colors disabled:opacity-60"
            >
              {savingNotes ? 'Saving...' : savedNotes ? 'Saved ✓' : 'Save notes'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Sessions section ────────────────────────────────────────────────────────

function SessionsSection({ clientId, clientEmail }: { clientId: string; clientEmail: string | null }) {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0])

  const load = useCallback(async () => {
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .eq('client_id', clientId)
      .order('session_date', { ascending: false })
    setSessions(data ?? [])
    setLoading(false)
  }, [clientId])

  useEffect(() => { load() }, [load])

  async function createSession() {
    setCreating(true)
    await supabase.from('sessions').insert([{
      client_id: clientId,
      session_date: newDate,
      arrival_token: crypto.randomUUID(),
      reflection_token: crypto.randomUUID(),
    }])
    await load()
    setCreating(false)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-6 border border-sage/10 flex items-end gap-4">
        <div className="flex-1">
          <label className={labelClass + ' mb-2 block'}>New session date</label>
          <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className={inputClass} />
        </div>
        <button
          onClick={createSession}
          disabled={creating}
          className="bg-sage text-white text-[0.72rem] tracking-[0.1em] uppercase px-6 py-3 rounded-full hover:bg-sage-dark transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {creating ? '...' : '+ Add Session'}
        </button>
      </div>

      {loading ? (
        <p className="text-center text-muted text-sm py-8">Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p className="text-center text-muted text-sm py-8">No sessions yet — add one above.</p>
      ) : (
        sessions.map(s => <SessionCard key={s.id} session={s} clientEmail={clientEmail} onUpdate={load} />)
      )}
    </div>
  )
}

// ─── Client files ────────────────────────────────────────────────────────────

function formatSize(bytes: number | null) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function ClientFiles({ clientId }: { clientId: string }) {
  const [files, setFiles] = useState<ClientFile[]>([])
  const [urls, setUrls] = useState<Record<string, string>>({})
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    const { data } = await supabase
      .from('client_files')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
    const list = data ?? []
    setFiles(list)

    const signed: Record<string, string> = {}
    await Promise.all(list.map(async (f) => {
      const { data: u } = await supabase.storage.from('client-files').createSignedUrl(f.path, 3600)
      if (u?.signedUrl) signed[f.id] = u.signedUrl
    }))
    setUrls(signed)
  }, [clientId])

  useEffect(() => { load() }, [load])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const path = `${clientId}/${crypto.randomUUID()}-${file.name}`
    const { error } = await supabase.storage.from('client-files').upload(path, file)
    if (!error) {
      await supabase.from('client_files').insert([{ client_id: clientId, name: file.name, path, size: file.size }])
      await load()
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleDelete(f: ClientFile) {
    if (!confirm(`Delete "${f.name}"?`)) return
    setDeleting(f.id)
    await supabase.storage.from('client-files').remove([f.path])
    await supabase.from('client_files').delete().eq('id', f.id)
    await load()
    setDeleting(null)
  }

  return (
    <div className="mt-5 bg-white rounded-2xl p-6 border border-sage/10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className={labelClass}>Client files</p>
          <p className="text-muted text-xs mt-0.5">Consent forms, referrals, documents</p>
        </div>
        <label className={`text-[0.7rem] tracking-[0.1em] uppercase px-4 py-2 rounded-full border border-sage/30 text-sage hover:bg-sage hover:text-white transition-colors cursor-pointer whitespace-nowrap ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          {uploading ? 'Uploading…' : '+ Upload file'}
          <input ref={fileRef} type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {files.length === 0 ? (
        <p className="text-muted text-xs text-center py-4">No files uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {files.map(f => (
            <li key={f.id} className="flex items-center justify-between gap-3 py-2.5 border-b border-charcoal/5 last:border-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-muted text-base flex-shrink-0">📄</span>
                <div className="min-w-0">
                  <p className="text-sm text-charcoal truncate">{f.name}</p>
                  <p className="text-[0.65rem] text-muted/60">{formatSize(f.size)} · {new Date(f.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {urls[f.id] && (
                  <a href={urls[f.id]} target="_blank" rel="noopener noreferrer"
                    className="text-[0.68rem] tracking-[0.08em] uppercase text-sage hover:underline">
                    Download
                  </a>
                )}
                <button onClick={() => handleDelete(f)} disabled={deleting === f.id}
                  className="text-muted/30 hover:text-red-400 transition-colors text-sm disabled:opacity-40">
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Recordings section ──────────────────────────────────────────────────────

function ClientRecordings({ clientId, clientEmail }: { clientId: string; clientEmail: string | null }) {
  const [recordings, setRecordings] = useState<ClientRecording[]>([])
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [sending, setSending] = useState<string | null>(null)
  const [sent, setSent] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    const { data } = await supabase
      .from('client_recordings')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
    setRecordings(data ?? [])
  }, [clientId])

  useEffect(() => { load() }, [load])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !title.trim()) return
    setUploading(true)
    const path = `recordings/${clientId}/${crypto.randomUUID()}-${file.name}`
    const { error } = await supabase.storage.from('client-files').upload(path, file)
    if (!error) {
      await supabase.from('client_recordings').insert([{ client_id: clientId, title: title.trim(), message: message.trim() || null, file_path: path }])
      setTitle('')
      setMessage('')
      await load()
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleSend(recording: ClientRecording) {
    setSending(recording.id)
    const res = await fetch('/api/portal/send-recording', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recording_id: recording.id }),
    })
    if (res.ok) { setSent(recording.id); await load() }
    setSending(null)
    setTimeout(() => setSent(null), 3000)
  }

  async function handleDelete(recording: ClientRecording) {
    if (!confirm(`Delete "${recording.title}"?`)) return
    await supabase.storage.from('client-files').remove([recording.file_path])
    await supabase.from('client_recordings').delete().eq('id', recording.id)
    await load()
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-sage/10">
      <p className={labelClass + ' mb-5'}>Recordings</p>

      <div className="space-y-3 mb-6">
        <div>
          <label className="block text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-1.5">Recording title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-charcoal/10 rounded-xl px-4 py-2.5 text-sm text-charcoal outline-none focus:border-sage transition-colors"
            placeholder="e.g. Sleep & Surrender, Grounding Meditation…"
          />
        </div>
        <div>
          <label className="block text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-1.5">Personal message <span className="normal-case">(optional)</span></label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={6}
            className="w-full border border-charcoal/10 rounded-xl px-4 py-2.5 text-sm text-charcoal outline-none focus:border-sage transition-colors resize-none"
            placeholder="e.g. I made this especially for you to help with the new job nerves…"
          />
        </div>
        <label className={`inline-flex items-center gap-2 text-[0.7rem] tracking-[0.1em] uppercase px-5 py-2.5 rounded-full border transition-colors cursor-pointer ${
          !title.trim() || uploading
            ? 'border-charcoal/10 text-muted/40 pointer-events-none'
            : 'border-sage/30 text-sage hover:bg-sage hover:text-white'
        }`}>
          {uploading ? 'Uploading…' : '+ Upload audio file'}
          <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={handleUpload} disabled={!title.trim() || uploading} />
        </label>
      </div>

      {recordings.length === 0 ? (
        <p className="text-muted text-xs text-center py-4">No recordings yet.</p>
      ) : (
        <ul className="space-y-3">
          {recordings.map(r => (
            <li key={r.id} className="flex items-center justify-between gap-3 bg-cream rounded-xl p-4 border border-charcoal/6">
              <div className="min-w-0">
                <p className="text-sm text-charcoal font-medium truncate">{r.title}</p>
                <p className="text-[0.65rem] text-muted/60 mt-0.5">
                  {new Date(r.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {r.emailed_at && ` · Sent ${new Date(r.emailed_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}`}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {clientEmail ? (
                  <button
                    onClick={() => handleSend(r)}
                    disabled={sending === r.id}
                    className="text-[0.7rem] tracking-[0.1em] uppercase px-4 py-2 rounded-full bg-sage-dark text-cream hover:bg-sage transition-colors disabled:opacity-50"
                  >
                    {sending === r.id ? 'Sending…' : sent === r.id ? 'Sent ✓' : r.emailed_at ? 'Resend' : 'Send email'}
                  </button>
                ) : (
                  <span className="text-[0.65rem] text-muted/40">No email on file</span>
                )}
                <button
                  onClick={() => handleDelete(r)}
                  className="text-[0.65rem] text-muted/40 hover:text-red-400 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

type Tab = 'profile' | 'intake' | 'consent' | 'sessions' | 'recordings'

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', notes: '' })
  const [tab, setTab] = useState<Tab>('profile')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    supabase.from('clients').select('*').eq('id', id).single().then(({ data }) => {
      if (data) {
        setClient(data)
        setForm({ name: data.name, phone: data.phone ?? '', email: data.email ?? '', service: data.service ?? '', notes: data.notes ?? '' })
      }
    })
  }, [id])

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    setSaved(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await supabase.from('clients').update({ ...form, updated_at: new Date().toISOString() }).eq('id', id)
    setSaving(false)
    setSaved(true)
  }

  async function handleDelete() {
    if (!confirm(`Delete ${client?.name}? This cannot be undone.`)) return
    setDeleting(true)
    await supabase.from('clients').delete().eq('id', id)
    router.push('/portal/clients')
  }

  if (!client) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <p className="text-muted text-sm">Loading...</p>
    </div>
  )

  const tabs: { id: Tab; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'intake', label: client.intake_submitted_at ? 'Intake ✓' : 'Intake' },
    { id: 'consent', label: client.massage_consent_submitted_at ? 'Consent ✓' : 'Consent' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'recordings', label: 'Recordings' },
  ]

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-sage/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-light text-charcoal">Client Hub</h1>
          <p className="text-muted text-xs">Harmonized Therapies</p>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/portal/clients" className="text-[0.7rem] tracking-[0.12em] uppercase text-sage font-[400]">Clients</Link>
          <Link href="/portal/invoices" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Invoices</Link>
          <Link href="/portal/newsletter" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Newsletter</Link>
          <Link href="/portal/templates" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Templates</Link>
          <Link href="/" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Website</Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/portal/clients" className="text-muted hover:text-sage transition-colors text-sm">← Clients</Link>
          <span className="text-muted/40">/</span>
          <h2 className="font-display text-2xl font-light text-charcoal">{client.name}</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-warm-white rounded-xl p-1 mb-7 w-fit">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`text-[0.7rem] tracking-[0.1em] uppercase px-5 py-2 rounded-lg transition-all ${
                tab === t.id
                  ? 'bg-white text-sage shadow-sm'
                  : 'text-muted hover:text-charcoal'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Profile tab */}
        {tab === 'profile' && (
          <form onSubmit={handleSave} className="bg-white rounded-2xl p-8 border border-sage/10 space-y-5">
            <div>
              <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2">Full name *</label>
              <input required value={form.name} onChange={e => update('name', e.target.value)} className={inputClass} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2">Phone</label>
                <input value={form.phone} onChange={e => update('phone', e.target.value)} className={inputClass} placeholder="04xx xxx xxx" />
              </div>
              <div>
                <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2">Email</label>
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className={inputClass} placeholder="their@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2">Service</label>
              <select value={form.service} onChange={e => update('service', e.target.value)} className={inputClass + ' appearance-none'}>
                <option value="">Select a service</option>
                <option>Massage Therapy</option>
                <option>Havening Techniques®</option>
                <option>Oncology Massage</option>
                <option>Palliative Massage</option>
                <option>Access Bars®</option>
                <option>NLP & Hypnotherapy</option>
                <option>Meditation & Coaching</option>
                <option>Retreat / Workshop</option>
                <option>Multiple Services</option>
              </select>
            </div>
            <div>
              <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2">Notes</label>
              <textarea value={form.notes} onChange={e => update('notes', e.target.value)} rows={6}
                className={inputClass + ' resize-none'}
                placeholder="Session notes, preferences, anything to remember..." />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving}
                className="flex-1 bg-sage text-white text-[0.78rem] tracking-[0.1em] uppercase py-3.5 rounded-full hover:bg-sage-dark transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save Changes'}
              </button>
              <button type="button" onClick={handleDelete} disabled={deleting}
                className="px-6 py-3.5 border border-red-200 rounded-full text-[0.78rem] tracking-[0.1em] uppercase text-red-400 hover:border-red-400 transition-colors disabled:opacity-60">
                {deleting ? '...' : 'Delete'}
              </button>
            </div>
            <p className="text-[0.65rem] text-muted/50 text-center">
              Added {new Date(client.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </form>
        )}

        {tab === 'profile' && <ClientFiles clientId={id} />}

        {/* Intake tab */}
        {tab === 'intake' && <IntakeSection client={client} />}

        {/* Consent tab */}
        {tab === 'consent' && <ConsentSection client={client} />}

        {/* Sessions tab */}
        {tab === 'sessions' && <SessionsSection clientId={id} clientEmail={client.email} />}

        {/* Recordings tab */}
        {tab === 'recordings' && <ClientRecordings clientId={id} clientEmail={client.email} />}
      </main>
    </div>
  )
}
