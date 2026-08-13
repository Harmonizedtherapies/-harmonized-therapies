'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, type Invoice } from '@/lib/supabase'

type SendState = { invoiceId: string; email: string; sending: boolean; sent: boolean; error: string }

const EMPTY_FORM = {
  invoice_number: '',
  client_name: '',
  client_email: '',
  description: '',
  amount: '',
  invoice_date: new Date().toISOString().split('T')[0],
  due_date: '',
  notes: '',
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'paid'>('all')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [send, setSend] = useState<SendState | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    loadInvoices()
  }, [])

  async function loadInvoices() {
    const { data } = await supabase
      .from('invoices')
      .select('*')
      .order('invoice_date', { ascending: false })
    setInvoices(data ?? [])
    setLoading(false)
  }

  async function markPaid(invoice: Invoice) {
    const paid = !invoice.paid
    await supabase.from('invoices').update({
      paid,
      paid_date: paid ? new Date().toISOString().split('T')[0] : null,
    }).eq('id', invoice.id)
    setInvoices(prev => prev.map(i => i.id === invoice.id ? { ...i, paid, paid_date: paid ? new Date().toISOString().split('T')[0] : null } : i))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.client_name || !form.amount || !form.invoice_number) {
      setError('Please fill in invoice number, client name and amount.')
      return
    }
    setSaving(true)
    const { error: err } = await supabase.from('invoices').insert([{
      invoice_number: parseInt(form.invoice_number),
      client_name: form.client_name,
      client_email: form.client_email || null,
      description: form.description || null,
      amount: parseFloat(form.amount),
      invoice_date: form.invoice_date,
      due_date: form.due_date || null,
      notes: form.notes || null,
      paid: false,
    }])
    setSaving(false)
    if (err) { setError('Something went wrong — please try again.'); return }
    setForm(EMPTY_FORM)
    setShowForm(false)
    loadInvoices()
  }

  const filtered = invoices.filter(i =>
    filter === 'all' ? true : filter === 'paid' ? i.paid : !i.paid
  )
  const outstanding = invoices.filter(i => !i.paid).reduce((sum, i) => sum + i.amount, 0)
  const totalPaid = invoices.filter(i => i.paid).reduce((sum, i) => sum + i.amount, 0)

  async function handleDelete(id: string) {
    if (!confirm('Delete this invoice?')) return
    setDeleting(id)
    await supabase.from('invoices').delete().eq('id', id)
    setInvoices(prev => prev.filter(i => i.id !== id))
    setDeleting(null)
  }

  function openSend(invoice: Invoice) {
    setSend({ invoiceId: invoice.id, email: invoice.client_email ?? '', sending: false, sent: false, error: '' })
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!send) return
    setSend(s => s ? { ...s, sending: true, error: '' } : s)
    const res = await fetch('/api/portal/send-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId: send.invoiceId, email: send.email }),
    })
    if (res.ok) {
      setSend(s => s ? { ...s, sending: false, sent: true } : s)
      setTimeout(() => setSend(null), 3000)
    } else {
      setSend(s => s ? { ...s, sending: false, error: 'Something went wrong — please try again.' } : s)
    }
  }

  function fmt(amount: number) {
    return `$${amount.toFixed(2)}`
  }
  function fmtDate(d: string) {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
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
          <Link href="/portal/invoices" className="text-[0.7rem] tracking-[0.12em] uppercase text-sage font-[400]">Invoices</Link>
          <Link href="/portal/newsletter" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Newsletter</Link>
          <Link href="/portal/templates" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Templates</Link>
          <Link href="/" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Website</Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl px-6 py-5 border border-sage/10">
            <p className="text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-1">Outstanding</p>
            <p className="font-display text-2xl font-light text-charcoal">{fmt(outstanding)}</p>
          </div>
          <div className="bg-white rounded-2xl px-6 py-5 border border-sage/10">
            <p className="text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-1">Paid to date</p>
            <p className="font-display text-2xl font-light text-sage">{fmt(totalPaid)}</p>
          </div>
          <div className="bg-white rounded-2xl px-6 py-5 border border-sage/10">
            <p className="text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-1">Total invoices</p>
            <p className="font-display text-2xl font-light text-charcoal">{invoices.length}</p>
          </div>
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {(['all', 'unpaid', 'paid'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-[0.68rem] tracking-[0.1em] uppercase px-4 py-1.5 rounded-full transition-colors ${
                  filter === f ? 'bg-sage text-white' : 'bg-white text-muted border border-charcoal/10 hover:border-sage/40'
                }`}>
                {f}
              </button>
            ))}
          </div>
          <button onClick={() => setShowForm(v => !v)}
            className="bg-sage text-white text-[0.72rem] tracking-[0.1em] uppercase px-5 py-2.5 rounded-full hover:bg-sage-dark transition-colors">
            {showForm ? 'Cancel' : '+ Add Invoice'}
          </button>
        </div>

        {/* Add invoice form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-sage/10 p-6 mb-6 space-y-4">
            <h3 className="font-display text-lg font-light text-charcoal">New Invoice</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-1.5">Invoice No *</label>
                <input type="number" value={form.invoice_number} onChange={e => setForm(f => ({ ...f, invoice_number: e.target.value }))}
                  className="w-full border border-charcoal/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sage transition-colors" placeholder="e.g. 29" />
              </div>
              <div>
                <label className="block text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-1.5">Amount *</label>
                <input type="number" step="0.01" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                  className="w-full border border-charcoal/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sage transition-colors" placeholder="e.g. 372.00" />
              </div>
              <div>
                <label className="block text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-1.5">Client Name *</label>
                <input type="text" value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))}
                  className="w-full border border-charcoal/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sage transition-colors" placeholder="e.g. Rest & Restore" />
              </div>
              <div>
                <label className="block text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-1.5">Client Email</label>
                <input type="email" value={form.client_email} onChange={e => setForm(f => ({ ...f, client_email: e.target.value }))}
                  className="w-full border border-charcoal/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sage transition-colors" placeholder="e.g. hello@restandrestore.com.au" />
              </div>
              <div className="col-span-2">
                <label className="block text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-1.5">Description</label>
                <input type="text" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full border border-charcoal/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sage transition-colors" placeholder="e.g. 4 × 60 min Remedial Massage @ $93" />
              </div>
              <div>
                <label className="block text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-1.5">Invoice Date</label>
                <input type="date" value={form.invoice_date} onChange={e => setForm(f => ({ ...f, invoice_date: e.target.value }))}
                  className="w-full border border-charcoal/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sage transition-colors" />
              </div>
              <div>
                <label className="block text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-1.5">Due Date</label>
                <input type="date" value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))}
                  className="w-full border border-charcoal/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sage transition-colors" />
              </div>
              <div className="col-span-2">
                <label className="block text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-1.5">Notes</label>
                <input type="text" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  className="w-full border border-charcoal/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sage transition-colors" placeholder="Optional" />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={saving}
              className="bg-sage text-white text-[0.72rem] tracking-[0.1em] uppercase px-6 py-2.5 rounded-full hover:bg-sage-dark transition-colors disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Invoice'}
            </button>
          </form>
        )}

        {/* Invoice list */}
        {loading ? (
          <p className="text-muted text-sm text-center py-10">Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted text-sm mb-4">{filter !== 'all' ? `No ${filter} invoices.` : 'No invoices yet.'}</p>
            {filter === 'all' && <button onClick={() => setShowForm(true)} className="text-sage text-sm hover:underline">Add your first invoice →</button>}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(invoice => (
              <div key={invoice.id} className="bg-white rounded-2xl px-6 py-5 border border-sage/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center font-display text-sm text-sage font-light flex-shrink-0">
                    {invoice.invoice_number}
                  </div>
                  <div className="min-w-0">
                    <p className="text-charcoal font-[400] text-sm">{invoice.client_name}</p>
                    {invoice.description && <p className="text-muted text-xs truncate">{invoice.description}</p>}
                    <p className="text-muted text-xs">{fmtDate(invoice.invoice_date)}{invoice.due_date ? ` · due ${fmtDate(invoice.due_date)}` : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <p className="font-display text-lg font-light text-charcoal">{fmt(invoice.amount)}</p>
                  <a href={`/api/portal/preview-invoice?id=${invoice.id}`} target="_blank" rel="noopener noreferrer"
                    className="text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-charcoal/15 text-muted hover:bg-sage/10 hover:text-sage hover:border-sage/30 transition-colors">
                    Preview
                  </a>
                  <button onClick={() => openSend(invoice)}
                    className="text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-charcoal/15 text-muted hover:bg-sage/10 hover:text-sage hover:border-sage/30 transition-colors">
                    Send PDF
                  </button>
                  <button onClick={() => markPaid(invoice)}
                    className={`text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border transition-colors ${
                      invoice.paid
                        ? 'bg-sage/10 text-sage border-sage/20 hover:bg-red-50 hover:text-red-400 hover:border-red-200'
                        : 'bg-white text-muted border-charcoal/15 hover:bg-sage/10 hover:text-sage hover:border-sage/30'
                    }`}>
                    {invoice.paid ? '✓ Paid' : 'Mark paid'}
                  </button>
                  <button onClick={() => handleDelete(invoice.id)} disabled={deleting === invoice.id}
                    className="text-[0.65rem] tracking-[0.1em] uppercase text-muted hover:text-red-400 transition-colors disabled:opacity-40 px-1">
                    {deleting === invoice.id ? '…' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Send PDF modal */}
      {send && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl border border-sage/10 p-8 w-full max-w-sm shadow-xl">
            {send.sent ? (
              <div className="text-center py-4">
                <p className="font-display text-xl font-light text-sage mb-2">Sent</p>
                <p className="text-muted text-sm">Invoice emailed to {send.email}</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-light text-charcoal mb-1">Send Invoice PDF</h3>
                <p className="text-muted text-sm mb-6">The PDF will be attached to the email.</p>
                <form onSubmit={handleSend} className="space-y-4">
                  <div>
                    <label className="block text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-1.5">Send to</label>
                    <input
                      type="email"
                      required
                      value={send.email}
                      onChange={e => setSend(s => s ? { ...s, email: e.target.value } : s)}
                      className="w-full border border-charcoal/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sage transition-colors"
                      placeholder="client@email.com"
                    />
                  </div>
                  {send.error && <p className="text-red-500 text-sm">{send.error}</p>}
                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => setSend(null)}
                      className="flex-1 text-[0.72rem] tracking-[0.1em] uppercase px-4 py-2.5 rounded-full border border-charcoal/15 text-muted hover:border-sage/40 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={send.sending}
                      className="flex-1 bg-sage text-white text-[0.72rem] tracking-[0.1em] uppercase px-4 py-2.5 rounded-full hover:bg-sage-dark transition-colors disabled:opacity-60">
                      {send.sending ? 'Sending…' : 'Send'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
