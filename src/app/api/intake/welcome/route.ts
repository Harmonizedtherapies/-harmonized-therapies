import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { token, intake } = await req.json()
  const { error } = await supabase
    .from('clients')
    .update({ intake, intake_submitted_at: new Date().toISOString() })
    .eq('intake_token', token)
    .is('intake_submitted_at', null)
  if (error) return NextResponse.json({ ok: false }, { status: 500 })
  return NextResponse.json({ ok: true })
}
