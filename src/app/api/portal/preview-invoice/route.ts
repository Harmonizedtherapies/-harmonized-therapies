import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { createElement } from 'react'
import { supabase } from '@/lib/supabase'
import { InvoicePDF } from '@/lib/invoice-pdf'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const { data: invoice } = await supabase.from('invoices').select('*').eq('id', id).single()
  if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })

  const pdfBuffer = await renderToBuffer(createElement(InvoicePDF, { invoice }) as unknown as Parameters<typeof renderToBuffer>[0])

  return new NextResponse(Buffer.from(pdfBuffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="invoice-${invoice.invoice_number}.pdf"`,
    },
  })
}
