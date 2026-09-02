'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { supabase, type Meditation, type Client } from '@/lib/supabase'

const labelClass = 'text-[0.65rem] tracking-[0.15em] uppercase text-muted font-[400]'
const inputClass = 'w-full border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal outline-none focus:border-sage transition-colors'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'live') return (
    <span className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.1em] uppercase text-sage">
      <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />Live
    </span>
  )
  if (status === 'ready') return (
    <span className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.1em] uppercase text-gold">
      <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />Ready
    </span>
  )
  return (
    <span className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.1em] uppercase text-muted">
      <span className="w-1.5 h-1.5 rounded-full bg-charcoal/20 inline-block" />Draft
    </span>
  )
}

function SendToClientPanel({
  recording,
  clients,
  onClose,
}: {
  recording: Meditation
  clients: Pick<Client, 'id' | 'name' | 'email'>[]
  onClose: () => void
}) {
  const [clientId, setClientId] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const eligibleClients = clients.filter(c => c.email)

  async function handleSend() {
    if (!clientId) return
    setStatus('sending')
    const token = crypto.randomUUID()
    const { data: inserted, error } = await supabase.from('client_recordings').insert([{
      client_id: clientId,
      title: recording.title,
      message: message.trim() || null,
      file_path: `lib::${recording.file_path}`,
      token,
    }]).select('id').single()

    if (error || !inserted) { setStatus('error'); return }

    const res = await fetch('/api/portal/send-recording', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recording_id: inserted.id }),
    })
    setStatus(res.ok ? 'sent' : 'error')
  }

  return (
    <div className="mt-4 pt-4 border-t border-charcoal/6 space-y-3">
      <p className={labelClass}>Send to a client</p>

      {eligibleClients.length === 0 ? (
        <p className="text-muted text-xs">No clients with an email address on file.</p>
      ) : (
        <>
          <select
            value={clientId}
            onChange={e => setClientId(e.target.value)}
            className={inputClass + ' appearance-none'}
          >
            <option value="">Select a client…</option>
            {eligibleClients.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            className={inputClass + ' resize-none'}
            placeholder="Personal message (optional) — e.g. I made this especially for you…"
          />

          <div className="flex items-center gap-3">
            <button
              onClick={handleSend}
              disabled={!clientId || status === 'sending' || status === 'sent'}
              className="text-[0.7rem] tracking-[0.1em] uppercase px-5 py-2.5 rounded-full bg-sage-dark text-cream hover:bg-sage transition-colors disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : status === 'error' ? 'Error — try again' : 'Send email'}
            </button>
            <button onClick={onClose} className="text-[0.65rem] text-muted/50 hover:text-muted transition-colors">
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function RecordingCard({
  recording,
  clients,
}: {
  recording: Meditation
  clients: Pick<Client, 'id' | 'name' | 'email'>[]
}) {
  const [status, setStatus] = useState(recording.status)
  const [showSend, setShowSend] = useState(false)
  const [copied, setCopied] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function updateStatus(newStatus: string) {
    await supabase.from('meditations').update({ status: newStatus }).eq('id', recording.id)
    setStatus(newStatus)
  }

  async function handleDelete() {
    if (!confirm(`Delete "${recording.title}"? This cannot be undone.`)) return
    setDeleting(true)
    if (recording.file_path) {
      await supabase.storage.from('meditations').remove([recording.file_path])
    }
    await supabase.from('meditations').delete().eq('id', recording.id)
  }

  function copyUrl() {
    if (!recording.file_path) return
    const url = `https://pnbpgusjfklliymymwme.supabase.co/storage/v1/object/public/meditations/${recording.file_path}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (deleting) return null

  return (
    <div className="bg-white rounded-2xl border border-sage/10 p-5">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div className="min-w-0">
          <p className="text-charcoal font-medium text-sm truncate">{recording.title}</p>
          <p className="text-muted/50 text-[0.63rem] font-mono mt-0.5">{recording.slug}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      {recording.notes && (
        <p className="text-muted text-xs mt-2 leading-relaxed">{recording.notes}</p>
      )}

      <p className="text-[0.63rem] text-muted/40 mt-2 mb-4">
        {new Date(recording.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
        {recording.file_path && (
          <> · {recording.file_path.split('.').pop()?.toUpperCase()}</>
        )}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        {status !== 'draft' && (
          <button onClick={() => updateStatus('draft')}
            className="text-[0.63rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-charcoal/10 text-muted hover:border-charcoal/30 transition-colors">
            Set Draft
          </button>
        )}
        {status !== 'ready' && (
          <button onClick={() => updateStatus('ready')}
            className="text-[0.63rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-colors">
            Mark Ready
          </button>
        )}
        {status !== 'live' && (
          <button onClick={() => updateStatus('live')}
            className="text-[0.63rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full bg-sage text-white hover:bg-sage-dark transition-colors">
            Publish Live
          </button>
        )}

        {recording.file_path && (
          <>
            <button onClick={copyUrl}
              className="text-[0.63rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-sage/20 text-sage hover:bg-sage/5 transition-colors">
              {copied ? 'Copied ✓' : 'Copy URL'}
            </button>
            <button
              onClick={() => setShowSend(s => !s)}
              className="text-[0.63rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-sage/30 text-sage hover:bg-sage hover:text-white transition-colors"
            >
              {showSend ? 'Cancel' : 'Send to client'}
            </button>
          </>
        )}

        <button onClick={handleDelete}
          className="ml-auto text-[0.63rem] text-muted/30 hover:text-red-400 transition-colors">
          Delete
        </button>
      </div>

      {showSend && (
        <SendToClientPanel
          recording={recording}
          clients={clients}
          onClose={() => setShowSend(false)}
        />
      )}
    </div>
  )
}

export default function RecordingsPage() {
  const [recordings, setRecordings] = useState<Meditation[]>([])
  const [clients, setClients] = useState<Pick<Client, 'id' | 'name' | 'email'>[]>([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [notes, setNotes] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    const [recResult, clientResult] = await Promise.all([
      supabase.from('meditations').select('*').order('created_at', { ascending: false }),
      supabase.from('clients').select('id, name, email').order('name'),
    ])
    setRecordings(recResult.data ?? [])
    setClients(clientResult.data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function handleTitleChange(val: string) {
    setTitle(val)
    setSlug(slugify(val))
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !title.trim()) return
    setUploading(true)
    setUploadError('')
    const ext = file.name.split('.').pop()
    const filePath = `${slug || slugify(title)}-${crypto.randomUUID().slice(0, 8)}.${ext}`
    const { error } = await supabase.storage.from('meditations').upload(filePath, file)
    if (error) {
      setUploadError('Upload failed — make sure the "meditations" storage bucket exists and is set to public.')
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
      return
    }
    await supabase.from('meditations').insert([{
      slug: slug || slugify(title),
      title: title.trim(),
      notes: notes.trim() || null,
      file_path: filePath,
      status: 'draft',
    }])
    setTitle('')
    setSlug('')
    setNotes('')
    if (fileRef.current) fileRef.current.value = ''
    await load()
    setUploading(false)
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-sage/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-light text-charcoal">Client Hub</h1>
          <p className="text-muted text-xs">Harmonized Therapies</p>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/portal/clients" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Clients</Link>
          <Link href="/portal/invoices" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Invoices</Link>
          <Link href="/portal/newsletter" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Newsletter</Link>
          <Link href="/portal/recordings" className="text-[0.7rem] tracking-[0.12em] uppercase text-sage font-[400]">Recordings</Link>
          <Link href="/portal/templates" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Templates</Link>
          <Link href="/" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Website</Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-light text-charcoal mb-1">My Recordings</h2>
          <p className="text-muted text-sm">Upload recordings here as you make them. When you&rsquo;re happy with one, send it to a client or mark it Live to publish it on the website.</p>
        </div>

        {/* Upload form */}
        <div className="bg-white rounded-2xl p-6 border border-sage/10 mb-8 space-y-4">
          <p className={labelClass}>Upload a new recording</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-1.5">Title *</label>
              <input
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
                className={inputClass}
                placeholder="e.g. Releasing Grief"
              />
            </div>
            <div>
              <label className="block text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-1.5">Slug</label>
              <input
                value={slug}
                onChange={e => setSlug(e.target.value)}
                className={inputClass}
                placeholder="releasing-grief"
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-1.5">Notes <span className="normal-case">(for yourself only)</span></label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              className={inputClass + ' resize-none'}
              placeholder="e.g. Version 2 — re-recorded intro. Needs music mix before publishing."
            />
          </div>

          <label className={`inline-flex items-center gap-2 text-[0.7rem] tracking-[0.1em] uppercase px-5 py-2.5 rounded-full border transition-colors cursor-pointer ${
            !title.trim() || uploading
              ? 'border-charcoal/10 text-muted/40 pointer-events-none'
              : 'border-sage/30 text-sage hover:bg-sage hover:text-white'
          }`}>
            {uploading ? 'Uploading…' : '+ Upload audio file'}
            <input
              ref={fileRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleUpload}
              disabled={!title.trim() || uploading}
            />
          </label>

          {uploadError && <p className="text-red-400 text-xs">{uploadError}</p>}
        </div>

        {/* List */}
        {loading ? (
          <p className="text-center text-muted text-sm py-10">Loading…</p>
        ) : recordings.length === 0 ? (
          <p className="text-center text-muted text-sm py-14">No recordings yet — upload your first one above.</p>
        ) : (
          <div className="space-y-3">
            {recordings.map(rec => (
              <RecordingCard key={rec.id} recording={rec} clients={clients} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
