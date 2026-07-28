import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { token, consent } = await req.json()
  const { error } = await supabase
    .from('clients')
    .update({ massage_consent: consent, massage_consent_submitted_at: new Date().toISOString() })
    .eq('massage_consent_token', token)
    .is('massage_consent_submitted_at', null)
  if (error) return NextResponse.json({ ok: false }, { status: 500 })
  return NextResponse.json({ ok: true })
}
