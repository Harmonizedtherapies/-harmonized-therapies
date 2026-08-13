import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { createElement } from 'react'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'
import { InvoicePDF } from '@/lib/invoice-pdf'

const getResend = () => new Resend(process.env.RESEND_API_KEY ?? 're_placeholder')
const FROM = 'Danielle Brierley <danielle@harmonizedtherapies.com.au>'

function fmtDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function emailHtml(invoice: { invoice_number: number; client_name: string; amount: number; invoice_date: string }) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f8f5f0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;padding:40px 20px;">
<tr><td align="center">
<table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#fff;border-radius:16px;overflow:hidden;">
<tr><td style="background:#2D5A3D;padding:28px 40px;">
  <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#a8c8b0;">Harmonized Therapies</p>
</td></tr>
<tr><td style="padding:40px 40px 36px;">
  <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#2a2a2a;">Hi ${invoice.client_name},</p>
  <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#555;">Please find your invoice attached.</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;background:#f8f5f0;border-radius:10px;overflow:hidden;">
    <tr>
      <td style="padding:14px 20px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6b6b65;">Invoice No</td>
      <td style="padding:14px 20px;font-size:15px;color:#181816;text-align:right;font-weight:600;">#${invoice.invoice_number}</td>
    </tr>
    <tr style="border-top:1px solid #e8e4df;">
      <td style="padding:14px 20px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6b6b65;">Date</td>
      <td style="padding:14px 20px;font-size:13px;color:#181816;text-align:right;">${fmtDate(invoice.invoice_date)}</td>
    </tr>
    <tr style="border-top:1px solid #e8e4df;">
      <td style="padding:14px 20px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6b6b65;">Total Due</td>
      <td style="padding:14px 20px;font-size:16px;color:#2D5A3D;text-align:right;font-weight:600;">$${invoice.amount.toFixed(2)}</td>
    </tr>
  </table>
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;background:#f8f5f0;border-radius:10px;">
    <tr><td style="padding:16px 20px;">
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6b6b65;">Bank Transfer</p>
      <p style="margin:0;font-size:13px;color:#181816;line-height:1.8;">Name: Danielle Brierley<br/>BSB: 063-252<br/>Account: 10594148</p>
    </td></tr>
  </table>
  <p style="margin:0;font-size:13px;color:#888;">If you have any questions, please reply to this email or call 0411 267 676.</p>
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
  const { invoiceId, email } = await req.json()
  if (!invoiceId || !email) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const { data: invoice } = await supabase.from('invoices').select('*').eq('id', invoiceId).single()
  if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })

  const pdfBuffer = await renderToBuffer(createElement(InvoicePDF, { invoice }) as unknown as Parameters<typeof renderToBuffer>[0])

  const { error } = await getResend().emails.send({
    from: FROM,
    to: email,
    subject: `Invoice #${invoice.invoice_number} – Harmonized Therapies`,
    html: emailHtml(invoice),
    attachments: [{
      filename: `invoice-${invoice.invoice_number}-harmonized-therapies.pdf`,
      content: pdfBuffer,
    }],
  })

  if (error) return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
