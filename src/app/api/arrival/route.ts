import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { token, arrival } = await req.json()
  const { error } = await supabase
    .from('sessions')
    .update({ arrival, arrival_submitted_at: new Date().toISOString() })
    .eq('arrival_token', token)
    .is('arrival_submitted_at', null)
  if (error) return NextResponse.json({ ok: false }, { status: 500 })
  return NextResponse.json({ ok: true })
}
