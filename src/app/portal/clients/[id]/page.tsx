'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase, type Client, type Session } from '@/lib/supabase'

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

function LinkCard({ label, link, submitted, submittedAt }: {
  label: string; link: string; submitted: boolean; submittedAt: string | null
}) {
  return (
    <div className="bg-cream rounded-xl p-4 border border-charcoal/6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className={labelClass}>{label}</p>
        <StatusPill submitted={submitted} submittedAt={submittedAt} />
      </div>
      <p className="text-[0.65rem] text-muted/60 font-mono truncate mb-3">{link}</p>
      <CopyButton url={link} />
    </div>
  )
}

// ─── Intake section ──────────────────────────────────────────────────────────

function IntakeSection({ client }: { client: Client }) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const link = `${baseUrl}/welcome?token=${client.intake_token}`
  const intake = client.intake

  return (
    <div className="space-y-5">
      {/* Link card */}
      <div className="bg-white rounded-2xl p-6 border border-sage/10">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <p className={labelClass + ' mb-1'}>Welcome intake form</p>
            <p className="text-[0.65rem] text-muted/60 font-mono truncate max-w-xs">{link}</p>
          </div>
          <CopyButton url={link} />
        </div>
        <StatusPill submitted={!!client.intake_submitted_at} submittedAt={client.intake_submitted_at} />
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

// ─── Session card ────────────────────────────────────────────────────────────

function SessionCard({ session, onUpdate }: { session: Session; onUpdate: () => void }) {
  const [open, setOpen] = useState(false)
  const [notes, setNotes] = useState(session.danielle_notes ?? '')
  const [savingNotes, setSavingNotes] = useState(false)
  const [savedNotes, setSavedNotes] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  const arrivalLink = `${baseUrl}/arrival?token=${session.arrival_token}`
  const reflectionLink = `${baseUrl}/reflection?token=${session.reflection_token}`
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
            />
            <LinkCard
              label="Post-session reflection"
              link={reflectionLink}
              submitted={!!session.reflection_submitted_at}
              submittedAt={session.reflection_submitted_at}
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

function SessionsSection({ clientId }: { clientId: string }) {
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
        sessions.map(s => <SessionCard key={s.id} session={s} onUpdate={load} />)
      )}
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

type Tab = 'profile' | 'intake' | 'sessions'

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
    { id: 'sessions', label: 'Sessions' },
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
          <Link href="/portal/newsletter" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Newsletter</Link>
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

        {/* Intake tab */}
        {tab === 'intake' && <IntakeSection client={client} />}

        {/* Sessions tab */}
        {tab === 'sessions' && <SessionsSection clientId={id} />}
      </main>
    </div>
  )
}
