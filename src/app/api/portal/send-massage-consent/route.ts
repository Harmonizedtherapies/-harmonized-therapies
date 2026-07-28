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
<tr><td style="background:#1B3828;padding:28px 40px;">
  <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#7a9e7e;">Harmonized Therapies</p>
</td></tr>
<tr><td style="padding:40px 40px 36px;">
  <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#2a2a2a;">Hi ${name},</p>
  <p style="margin:0 0 32px;font-size:16px;line-height:1.8;color:#555;">Before your massage session, I'd love you to complete a short consent form. It only takes a couple of minutes and helps me tailor your session to your needs.</p>
  <table cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
    <tr><td style="background:#2D5A3D;border-radius:100px;">
      <a href="${link}" style="display:inline-block;padding:14px 28px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#fff;text-decoration:none;">Complete consent form</a>
    </td></tr>
  </table>
  <p style="margin:0 0 4px;font-size:13px;color:#aaa;">If the button doesn't work, copy this link into your browser:</p>
  <p style="margin:0;font-size:12px;word-break:break-all;"><a href="${link}" style="color:#7a9e7e;">${link}</a></p>
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
  const { client_id } = await req.json()
  const { data: client } = await supabase.from('clients').select('name, email, massage_consent_token').eq('id', client_id).single()
  if (!client?.email) return NextResponse.json({ error: 'No email on file' }, { status: 400 })

  const firstName = client.name.split(' ')[0]
  const link = `${SITE_URL}/massage-consent?token=${client.massage_consent_token}`

  const { error } = await getResend().emails.send({
    from: FROM,
    to: client.email,
    subject: 'Massage consent form — Harmonized Therapies',
    html: html(firstName, link),
  })

  if (error) return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
