import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.json({ error: 'Invalid' }, { status: 400 })

  const { data: recording } = await supabase
    .from('client_recordings')
    .select('file_path, title')
    .eq('token', token)
    .single()

  if (!recording) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data: signed } = await supabase.storage
    .from('client-files')
    .createSignedUrl(recording.file_path, 3600)

  if (!signed?.signedUrl) return NextResponse.json({ error: 'Could not generate link' }, { status: 500 })

  return NextResponse.json({ url: signed.signedUrl, title: recording.title })
}
