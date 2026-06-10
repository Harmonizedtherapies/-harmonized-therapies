'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, type Client } from '@/lib/supabase'

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('clients').select('*').order('name').then(({ data }) => {
      setClients(data ?? [])
      setLoading(false)
    })
  }, [])

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  )

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

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-light text-charcoal">Clients</h2>
            <p className="text-muted text-sm">{clients.length} total</p>
          </div>
          <Link href="/portal/clients/new" className="bg-sage text-white text-[0.72rem] tracking-[0.1em] uppercase px-5 py-2.5 rounded-full hover:bg-sage-dark transition-colors">
            + Add Client
          </Link>
        </div>

        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email or phone..."
          className="w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal outline-none focus:border-sage transition-colors mb-6"
        />

        {loading ? (
          <p className="text-muted text-sm text-center py-10">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted text-sm mb-4">{search ? 'No clients found.' : 'No clients yet.'}</p>
            {!search && <Link href="/portal/clients/new" className="text-sage text-sm hover:underline">Add your first client →</Link>}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(client => (
              <Link key={client.id} href={`/portal/clients/${client.id}`}
                className="bg-white rounded-2xl px-6 py-5 border border-sage/10 flex items-center justify-between hover:shadow-sm transition-shadow group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center font-display text-lg text-sage font-light flex-shrink-0">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-charcoal font-[400] text-sm">{client.name}</p>
                    <p className="text-muted text-xs">{client.email || client.phone || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {client.service && (
                    <span className="text-[0.65rem] tracking-[0.12em] uppercase text-sage bg-sage/8 px-3 py-1 rounded-full hidden sm:block">
                      {client.service}
                    </span>
                  )}
                  <span className="text-muted group-hover:text-sage transition-colors">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
