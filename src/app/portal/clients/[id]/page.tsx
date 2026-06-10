'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase, type Client } from '@/lib/supabase'

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('clients').select('*').eq('id', id).single().then(({ data }) => {
      if (data) { setClient(data); setForm({ name: data.name, phone: data.phone ?? '', email: data.email ?? '', service: data.service ?? '', notes: data.notes ?? '' }) }
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

  if (!client) return <div className="min-h-screen bg-cream flex items-center justify-center"><p className="text-muted text-sm">Loading...</p></div>

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

      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/portal/clients" className="text-muted hover:text-sage transition-colors text-sm">← Clients</Link>
          <span className="text-muted/40">/</span>
          <h2 className="font-display text-2xl font-light text-charcoal">{client.name}</h2>
        </div>

        <form onSubmit={handleSave} className="bg-white rounded-2xl p-8 border border-sage/10 space-y-5">
          <div>
            <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2">Full name *</label>
            <input required value={form.name} onChange={e => update('name', e.target.value)}
              className="w-full border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal outline-none focus:border-sage transition-colors" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2">Phone</label>
              <input value={form.phone} onChange={e => update('phone', e.target.value)}
                className="w-full border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal outline-none focus:border-sage transition-colors"
                placeholder="04xx xxx xxx" />
            </div>
            <div>
              <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2">Email</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                className="w-full border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal outline-none focus:border-sage transition-colors"
                placeholder="their@email.com" />
            </div>
          </div>
          <div>
            <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2">Service</label>
            <select value={form.service} onChange={e => update('service', e.target.value)}
              className="w-full border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal outline-none focus:border-sage transition-colors appearance-none">
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
              className="w-full border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal outline-none focus:border-sage transition-colors resize-none"
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
      </main>
    </div>
  )
}
