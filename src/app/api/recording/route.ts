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

  let audioUrl: string
  if (recording.file_path.startsWith('lib::')) {
    const libPath = recording.file_path.slice(5)
    audioUrl = `https://pnbpgusjfklliymymwme.supabase.co/storage/v1/object/public/meditations/${libPath}`
  } else {
    const { data: signed } = await supabase.storage
      .from('client-files')
      .createSignedUrl(recording.file_path, 3600)
    if (!signed?.signedUrl) return NextResponse.json({ error: 'Could not generate link' }, { status: 500 })
    audioUrl = signed.signedUrl
  }

  return NextResponse.json({ url: audioUrl, title: recording.title })
}
