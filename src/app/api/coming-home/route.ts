import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const getResend = () => new Resend(process.env.RESEND_API_KEY ?? 're_placeholder')
const FROM = process.env.RESEND_FROM_ADDRESS ?? 'Danielle at Harmonized Therapies <hello@harmonizedtherapies.com.au>'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harmonizedtherapies.com.au'

function html(downloadUrl: string) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f8f5f0;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;padding:40px 20px;">
<tr><td align="center">
<table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#fff;border-radius:16px;overflow:hidden;">

<tr><td style="background:#1B3828;padding:28px 40px;">
  <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#c8a96e;font-family:Arial,sans-serif;">Harmonized Therapies</p>
  <p style="margin:8px 0 0;font-size:22px;font-style:italic;color:#fff;font-weight:300;">The Quiet Corner</p>
</td></tr>

<tr><td style="padding:40px 40px 12px;">
  <p style="margin:0 0 20px;font-size:16px;line-height:1.9;color:#2a2a2a;">
    Welcome to The Quiet Corner.
  </p>
  <p style="margin:0 0 20px;font-size:15px;line-height:1.9;color:#444;">
    I hope this recording brings you a moment of rest — and reminds you that you don&apos;t have to carry everything alone.
  </p>
  <p style="margin:0 0 20px;font-size:15px;line-height:1.9;color:#444;">
    <em>Coming Home</em> is a gentle guided relaxation to help your nervous system soften and settle.
    Find somewhere comfortable, press play, and let yourself arrive.
  </p>
</td></tr>

<tr><td style="padding:4px 40px 36px;">
  <table cellpadding="0" cellspacing="0"><tr><td>
    <a href="${downloadUrl}" style="display:inline-block;background:#1B3828;color:#fff;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:14px 32px;border-radius:100px;">
      Download Coming Home
    </a>
  </td></tr></table>
</td></tr>

<tr><td style="padding:0 40px 36px;">
  <div style="border-top:1px solid #e8e4dc;padding-top:28px;">
    <p style="margin:0 0 10px;font-size:13px;line-height:1.8;color:#666;">
      I&apos;ll send you the occasional gentle note — reflections on healing, grief, and becoming.
      Nothing salesy. Just soul.
    </p>
    <p style="margin:0;font-size:13px;line-height:1.8;color:#666;font-style:italic;">
      With warmth,<br/>Danielle 🌿
    </p>
  </div>
</td></tr>

<tr><td style="background:#faf8f3;padding:16px 40px;border-top:1px solid #e8e4dc;">
  <p style="margin:0;font-size:11px;color:#999;font-family:Arial,sans-serif;text-align:center;">
    harmonizedtherapies.com.au &nbsp;·&nbsp; Yarra Valley, Melbourne
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`
}

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const { error: dbError } = await supabase
    .from('newsletter_signups')
    .insert([{ email, source: 'coming-home' }])

  if (dbError && dbError.code !== '23505') {
    return NextResponse.json({ error: 'Could not save email' }, { status: 500 })
  }

  const downloadUrl = `${SITE_URL}/audio/coming-home-to-yourself.m4a`

  const { error: emailError } = await getResend().emails.send({
    from: FROM,
    to: email,
    subject: 'Your Coming Home recording 🌿',
    html: html(downloadUrl),
  })

  if (emailError) {
    return NextResponse.json({ error: 'Could not send email' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
