'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function PortalLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/portal-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/portal/clients')
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="relative w-20 h-20 mx-auto mb-4 overflow-hidden">
            <Image src="/Images/logo-submark.png" alt="Harmonized Therapies" fill className="object-cover object-top" />
          </div>
          <h1 className="font-display text-2xl font-light text-charcoal">Client Portal</h1>
          <p className="text-muted text-sm mt-1">Harmonized Therapies</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-sage/10 space-y-5">
          <div>
            <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false) }}
              required
              className="w-full border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal outline-none focus:border-sage transition-colors"
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">Incorrect password — try again.</p>}
          <button type="submit" className="w-full bg-sage text-white text-[0.78rem] tracking-[0.1em] uppercase py-3.5 rounded-full hover:bg-sage-dark transition-colors">
            Enter Portal
          </button>
        </form>
      </div>
    </div>
  )
}
