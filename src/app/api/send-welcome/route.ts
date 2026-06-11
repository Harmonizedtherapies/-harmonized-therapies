import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const DANIELLE_EMAIL = 'danielle@harmonizedtherapies.com.au'
const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS ?? 'Harmonized Therapies <hello@harmonizedtherapies.com.au>'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harmonizedtherapies.com.au'

const gifts: Record<string, {
  name: string
  brand: string
  pdfPath: string
  pdfFilename: string
  accentColor: string
  headerBg: string
  buttonBg: string
  buttonText: string
  emoji: string
  blurb: string
}> = {
  'havening-guide': {
    name: 'Your Free Self-Havening Guide',
    brand: 'Harmonized Therapies',
    pdfPath: '/self-havening-guide-harmonized-therapies.pdf',
    pdfFilename: 'Self-Havening-Guide-Harmonized-Therapies.pdf',
    accentColor: '#7a9e7e',
    headerBg: '#2d3b2e',
    buttonBg: '#7a9e7e',
    buttonText: '#ffffff',
    emoji: '🌿',
    blurb: 'Your guide is a gentle introduction to Havening touch — a simple, science-backed practice you can return to whenever you need to come back to peace.',
  },
  'quiet-morning-ritual': {
    name: 'Your Quiet Morning Ritual',
    brand: 'The Quiet Holders',
    pdfPath: '/the-quiet-morning-ritual-quiet-holders.pdf',
    pdfFilename: 'The-Quiet-Morning-Ritual-The-Quiet-Holders.pdf',
    accentColor: '#c8a96e',
    headerBg: '#1a1a1a',
    buttonBg: '#c8a96e',
    buttonText: '#1a1a1a',
    emoji: '🌙',
    blurb: 'This ritual was written for the quiet mornings — when you need something soft and sacred before the world begins. May it hold you gently.',
  },
}

function welcomeEmail(gift: typeof gifts[string], downloadUrl: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${gift.name}</title>
</head>
<body style="margin:0;padding:0;background:#f8f5f0;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:${gift.headerBg};padding:36px 40px;text-align:center;">
            <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${gift.accentColor};font-weight:400;">${gift.brand}</p>
            <p style="margin:0;font-size:28px;">${gift.emoji}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:44px 44px 32px;">
            <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${gift.accentColor};">Your free gift is ready</p>
            <h1 style="margin:0 0 20px;font-size:28px;font-weight:400;line-height:1.25;color:#2a2a2a;font-style:italic;">${gift.name}</h1>
            <div style="width:40px;height:1px;background:${gift.accentColor};opacity:0.4;margin-bottom:24px;"></div>
            <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#555;font-family:Arial,sans-serif;">
              Thank you for being here. ${gift.blurb}
            </p>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.8;color:#555;font-family:Arial,sans-serif;">
              Click the button below to download your guide. You can save it, print it, or return to it whenever you need it.
            </p>

            <!-- Download button -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
              <tr>
                <td style="background:${gift.buttonBg};border-radius:100px;padding:0;">
                  <a href="${downloadUrl}" style="display:inline-block;padding:14px 32px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${gift.buttonText};text-decoration:none;font-weight:600;">
                    Download Your Free Guide
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px;font-size:14px;line-height:1.8;color:#888;font-family:Arial,sans-serif;font-style:italic;">
              If the button doesn&rsquo;t work, copy and paste this link into your browser:
            </p>
            <p style="margin:0 0 36px;font-size:12px;color:${gift.accentColor};font-family:Arial,sans-serif;word-break:break-all;">
              <a href="${downloadUrl}" style="color:${gift.accentColor};">${downloadUrl}</a>
            </p>

            <div style="border-top:1px solid #f0ebe4;padding-top:28px;">
              <p style="margin:0 0 6px;font-size:15px;line-height:1.8;color:#555;font-family:Arial,sans-serif;">
                With love and care,
              </p>
              <p style="margin:0;font-size:18px;color:#2a2a2a;font-style:italic;">Danielle</p>
              <p style="margin:4px 0 0;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#aaa;font-family:Arial,sans-serif;">${gift.brand}</p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f5f0;padding:24px 44px;text-align:center;border-top:1px solid #ede8e1;">
            <p style="margin:0 0 4px;font-size:11px;color:#bbb;font-family:Arial,sans-serif;">Yarra Valley, Melbourne · harmonizedtherapies.com.au</p>
            <p style="margin:0;font-size:11px;color:#ccc;font-family:Arial,sans-serif;">You received this because you signed up for a free guide.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function notificationEmail(gift: typeof gifts[string], subscriberEmail: string) {
  return `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;color:#333;padding:32px;">
  <h2 style="font-weight:400;color:#2a2a2a;">New lead magnet signup ${gift.emoji}</h2>
  <table style="border-collapse:collapse;margin-top:16px;">
    <tr><td style="padding:6px 16px 6px 0;color:#888;font-size:13px;">Gift</td><td style="padding:6px 0;font-size:14px;">${gift.name}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#888;font-size:13px;">Brand</td><td style="padding:6px 0;font-size:14px;">${gift.brand}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#888;font-size:13px;">Email</td><td style="padding:6px 0;font-size:14px;"><a href="mailto:${subscriberEmail}">${subscriberEmail}</a></td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#888;font-size:13px;">Time</td><td style="padding:6px 0;font-size:14px;">${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })} (Melbourne)</td></tr>
  </table>
  <p style="margin-top:24px;font-size:13px;color:#aaa;">This email was sent automatically from your Harmonized Therapies website.</p>
</body></html>`
}

export async function POST(req: NextRequest) {
  const { email, source } = await req.json()

  const gift = gifts[source]
  if (!gift) return NextResponse.json({ error: 'Unknown source' }, { status: 400 })

  const downloadUrl = `${SITE_URL}${gift.pdfPath}`

  const [welcome, notification] = await Promise.all([
    resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: `${gift.emoji} ${gift.name} — it's here!`,
      html: welcomeEmail(gift, downloadUrl),
    }),
    resend.emails.send({
      from: FROM_ADDRESS,
      to: DANIELLE_EMAIL,
      subject: `New signup: ${gift.brand} — ${email}`,
      html: notificationEmail(gift, email),
    }),
  ])

  if (welcome.error || notification.error) {
    console.error('Resend error:', welcome.error ?? notification.error)
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
