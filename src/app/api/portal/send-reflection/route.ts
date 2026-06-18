import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const getResend = () => new Resend(process.env.RESEND_API_KEY ?? 're_placeholder')
const FROM = process.env.RESEND_FROM_ADDRESS ?? 'Harmonized Therapies <hello@harmonizedtherapies.com.au>'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harmonizedtherapies.com.au'

function html(name: string, link: string) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f8f5f0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;padding:40px 20px;">
<tr><td align="center">
<table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#fff;border-radius:16px;overflow:hidden;">
<tr><td style="background:#181816;padding:28px 40px;">
  <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#c8a96e;">Harmonized Therapies</p>
</td></tr>
<tr><td style="padding:40px 40px 36px;">
  <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#2a2a2a;">Hi ${name},</p>
  <p style="margin:0 0 32px;font-size:16px;line-height:1.8;color:#555;">When you're ready — and only when you're ready — I'd love to hear how you're landing after today. Take your time with this.</p>
  <table cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
    <tr><td style="background:#181816;border-radius:100px;">
      <a href="${link}" style="display:inline-block;padding:14px 28px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#fff;text-decoration:none;">Open reflection</a>
    </td></tr>
  </table>
  <p style="margin:0 0 4px;font-size:13px;color:#aaa;">If the button doesn't work, copy this link into your browser:</p>
  <p style="margin:0;font-size:12px;word-break:break-all;"><a href="${link}" style="color:#c8a96e;">${link}</a></p>
</td></tr>
<tr><td style="padding:20px 40px 28px;border-top:1px solid #f0ebe4;">
  <p style="margin:0;font-size:15px;color:#2a2a2a;font-style:italic;">Danielle</p>
  <p style="margin:4px 0 0;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#aaa;">Harmonized Therapies · Yarra Valley</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`
}

export async function POST(req: NextRequest) {
  const { session_id } = await req.json()
  const { data: session } = await supabase
    .from('sessions')
    .select('reflection_token, clients(name, email)')
    .eq('id', session_id)
    .single()

  const client = Array.isArray(session?.clients) ? session.clients[0] : session?.clients
  if (!client?.email || !session) return NextResponse.json({ error: 'No email on file' }, { status: 400 })

  const firstName = client.name.split(' ')[0]
  const link = `${SITE_URL}/reflection?token=${session.reflection_token}`

  const { error } = await getResend().emails.send({
    from: FROM,
    to: client.email,
    subject: 'After your session — Harmonized Therapies',
    html: html(firstName, link),
  })

  if (error) return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
