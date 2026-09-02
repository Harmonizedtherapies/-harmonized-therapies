'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type ParsedClient = {
  name: string
  phone: string
  email: string
  service: string
}

function parseCSVLine(line: string): string[] {
  const cols: string[] = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      cols.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  cols.push(current.trim())
  return cols
}

function parseCSV(text: string): ParsedClient[] {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []

  const headers = parseCSVLine(lines[0]).map(h => h.replace(/^"|"$/g, '').toLowerCase())
  const col = (name: string) => headers.indexOf(name)

  const nameIdx = col('full name')
  const mobileIdx = col('mobile')
  const phoneIdx = col('phone')
  const emailIdx = col('email address')
  const serviceIdx = col('last appt. service')

  const seen = new Set<string>()
  const result: ParsedClient[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    const cols = parseCSVLine(line)
    const name = cols[nameIdx]?.replace(/^"|"$/g, '').trim() || ''
    if (!name) continue

    const key = name.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)

    result.push({
      name,
      phone: cols[mobileIdx]?.trim() || cols[phoneIdx]?.trim() || '',
      email: cols[emailIdx]?.trim() || '',
      service: cols[serviceIdx]?.trim() || '',
    })
  }
  return result
}

export default function ImportPage() {
  const [clients, setClients] = useState<ParsedClient[]>([])
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<{ clients: number; newsletter: number } | null>(null)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setResult(null)
    const reader = new FileReader()
    reader.onload = ev => {
      const parsed = parseCSV(ev.target?.result as string)
      if (parsed.length === 0) {
        setError('No clients found — make sure this is a Timely client export CSV.')
      } else {
        setClients(parsed)
      }
    }
    reader.readAsText(file)
  }

  async function handleImport() {
    setImporting(true)
    setError('')

    const { error: clientErr } = await supabase.from('clients').insert(
      clients.map(c => ({
        name: c.name,
        phone: c.phone || null,
        email: c.email || null,
        service: c.service || null,
      }))
    )

    if (clientErr) {
      setError(`Import failed: ${clientErr.message} (code: ${clientErr.code})`)
      setImporting(false)
      return
    }

    const withEmail = clients.filter(c => c.email)
    if (withEmail.length > 0) {
      await supabase.from('newsletter_signups').upsert(
        withEmail.map(c => ({ name: c.name, email: c.email, source: 'timely-import' })),
        { onConflict: 'email', ignoreDuplicates: true }
      )
    }

    setResult({ clients: clients.length, newsletter: withEmail.length })
    setClients([])
    setImporting(false)
  }

  const withEmail = clients.filter(c => c.email).length

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
          <Link href="/portal/recordings" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Recordings</Link>
          <Link href="/portal/templates" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Templates</Link>
          <Link href="/" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Website</Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/portal/clients" className="text-muted hover:text-sage transition-colors text-sm">← Clients</Link>
          <span className="text-muted/40">/</span>
          <h2 className="font-display text-2xl font-light text-charcoal">Import from CSV</h2>
        </div>

        {result ? (
          <div className="bg-white rounded-2xl p-10 border border-sage/10 text-center space-y-4">
            <p className="font-display text-3xl font-light text-charcoal">Done</p>
            <p className="text-muted text-sm">{result.clients} clients added to your client list</p>
            <p className="text-muted text-sm">{result.newsletter} added to your newsletter list</p>
            <div className="flex justify-center gap-4 pt-4">
              <Link href="/portal/clients" className="bg-sage text-white text-[0.72rem] tracking-[0.1em] uppercase px-6 py-3 rounded-full hover:bg-sage-dark transition-colors">
                View Clients
              </Link>
              <button onClick={() => { setResult(null); if (fileRef.current) fileRef.current.value = '' }}
                className="border border-charcoal/10 text-muted text-[0.72rem] tracking-[0.1em] uppercase px-6 py-3 rounded-full hover:border-sage hover:text-sage transition-colors">
                Import Another
              </button>
            </div>
          </div>
        ) : clients.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-sage/10 text-center space-y-6">
            <div>
              <p className="font-display text-xl font-light text-charcoal mb-2">Upload your Timely export</p>
              <p className="text-muted text-sm">Export your client list from Timely as a CSV, then upload it here.</p>
            </div>
            <label className="inline-flex flex-col items-center gap-3 cursor-pointer">
              <div className="border-2 border-dashed border-sage/30 rounded-2xl px-12 py-10 hover:border-sage/60 transition-colors">
                <p className="text-sage text-[0.75rem] tracking-[0.1em] uppercase">Choose CSV file</p>
                <p className="text-muted text-xs mt-1">or drag and drop</p>
              </div>
              <input ref={fileRef} type="file" accept=".csv" onChange={handleFile} className="hidden" />
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-sage/10 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-charcoal text-sm font-[400]">{clients.length} clients ready to import</p>
                <p className="text-muted text-xs">{withEmail} have email addresses and will also be added to your newsletter list</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setClients([]); if (fileRef.current) fileRef.current.value = '' }}
                  className="border border-charcoal/10 text-muted text-[0.72rem] tracking-[0.1em] uppercase px-5 py-2.5 rounded-full hover:border-sage hover:text-sage transition-colors">
                  Cancel
                </button>
                <button onClick={handleImport} disabled={importing}
                  className="bg-sage text-white text-[0.72rem] tracking-[0.1em] uppercase px-5 py-2.5 rounded-full hover:bg-sage-dark transition-colors disabled:opacity-60">
                  {importing ? 'Importing...' : 'Import All'}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="bg-white rounded-2xl border border-sage/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sage/10">
                    <th className="text-left px-6 py-4 text-[0.65rem] tracking-[0.15em] uppercase text-muted font-[400]">Name</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] tracking-[0.15em] uppercase text-muted font-[400] hidden sm:table-cell">Phone</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] tracking-[0.15em] uppercase text-muted font-[400]">Email</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] tracking-[0.15em] uppercase text-muted font-[400] hidden md:table-cell">Last Service</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-cream/40'}>
                      <td className="px-6 py-3 text-charcoal">{c.name}</td>
                      <td className="px-6 py-3 text-muted hidden sm:table-cell">{c.phone || '—'}</td>
                      <td className="px-6 py-3 text-muted">{c.email || '—'}</td>
                      <td className="px-6 py-3 text-muted hidden md:table-cell">{c.service || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
