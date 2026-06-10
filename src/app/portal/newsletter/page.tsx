'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, type NewsletterSignup } from '@/lib/supabase'

export default function NewsletterPage() {
  const [signups, setSignups] = useState<NewsletterSignup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('newsletter_signups').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setSignups(data ?? [])
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-sage/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-light text-charcoal">Client Hub</h1>
          <p className="text-muted text-xs">Harmonized Therapies</p>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/portal/clients" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Clients</Link>
          <Link href="/portal/newsletter" className="text-[0.7rem] tracking-[0.12em] uppercase text-sage font-[400]">Newsletter</Link>
          <Link href="/" className="text-[0.7rem] tracking-[0.12em] uppercase text-muted hover:text-sage transition-colors">Website</Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-light text-charcoal">Newsletter Signups</h2>
          <p className="text-muted text-sm">{signups.length} subscribers from your website</p>
        </div>

        {loading ? (
          <p className="text-muted text-sm text-center py-10">Loading...</p>
        ) : signups.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted text-sm">No signups yet — they'll appear here when people subscribe on your website.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-sage/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sage/10">
                  <th className="text-left px-6 py-4 text-[0.65rem] tracking-[0.15em] uppercase text-muted font-[400]">Email</th>
                  <th className="text-left px-6 py-4 text-[0.65rem] tracking-[0.15em] uppercase text-muted font-[400] hidden sm:table-cell">Name</th>
                  <th className="text-left px-6 py-4 text-[0.65rem] tracking-[0.15em] uppercase text-muted font-[400] hidden md:table-cell">Source</th>
                  <th className="text-left px-6 py-4 text-[0.65rem] tracking-[0.15em] uppercase text-muted font-[400] hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {signups.map((s, i) => (
                  <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-cream/40'}>
                    <td className="px-6 py-4 text-charcoal">{s.email}</td>
                    <td className="px-6 py-4 text-muted hidden sm:table-cell">{s.name || '—'}</td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-[0.65rem] tracking-[0.1em] uppercase text-sage bg-sage/8 px-2 py-1 rounded-full">{s.source}</span>
                    </td>
                    <td className="px-6 py-4 text-muted hidden md:table-cell">
                      {new Date(s.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
