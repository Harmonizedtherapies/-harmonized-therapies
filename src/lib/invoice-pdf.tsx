import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
  family: 'Cormorant',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3YmX5slCNuHLi8bLeY9MK7whWMhyjYrEPjuw.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjQAllvuQ.ttf', fontWeight: 600 },
  ],
})

const SAGE = '#2D5A3D'
const GOLD = '#c8a96e'
const MUTED = '#6b6b65'
const CREAM = '#faf8f3'

const s = StyleSheet.create({
  page: { backgroundColor: CREAM, padding: '40 48', fontFamily: 'Helvetica', fontSize: 10, color: '#181816' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', borderBottomWidth: 2, borderBottomColor: GOLD, paddingBottom: 20, marginBottom: 24 },
  brand: { fontFamily: 'Cormorant', fontSize: 28, fontWeight: 400, color: SAGE, letterSpacing: 1 },
  brandSub: { fontSize: 8, color: MUTED, letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 },
  invoiceLabel: { fontFamily: 'Cormorant', fontSize: 28, color: SAGE, textAlign: 'right' },
  metaRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 4 },
  metaKey: { fontSize: 8, color: MUTED, letterSpacing: 1.5, textTransform: 'uppercase', minWidth: 60, textAlign: 'right' },
  metaVal: { fontSize: 10, fontFamily: 'Helvetica-Bold', minWidth: 90 },
  parties: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 },
  partyLabel: { fontSize: 7.5, color: GOLD, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 },
  partyName: { fontFamily: 'Cormorant', fontSize: 14, fontWeight: 600, color: SAGE, marginBottom: 3 },
  partyDetail: { fontSize: 9, color: MUTED, lineHeight: 1.6 },
  goldLine: { height: 1, backgroundColor: GOLD, marginBottom: 20, opacity: 0.5 },
  tableHeader: { flexDirection: 'row', backgroundColor: SAGE, padding: '9 12', marginBottom: 0 },
  tableHeaderText: { fontSize: 8, color: CREAM, letterSpacing: 1.5, textTransform: 'uppercase' },
  tableRow: { flexDirection: 'row', padding: '10 12', borderBottomWidth: 1, borderBottomColor: '#D4E8D8' },
  tableRowAlt: { flexDirection: 'row', padding: '10 12', borderBottomWidth: 1, borderBottomColor: '#D4E8D8', backgroundColor: 'rgba(212,232,216,0.18)' },
  colDesc: { flex: 2.2, fontSize: 10 },
  colRight: { flex: 0.9, textAlign: 'right', fontSize: 10 },
  totalsRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 2 },
  totalsTable: { width: 200 },
  totalDueRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: SAGE, padding: '10 12' },
  totalDueText: { fontFamily: 'Cormorant', fontSize: 14, fontWeight: 600, color: CREAM },
  gstNote: { fontSize: 8, color: MUTED, fontStyle: 'italic', textAlign: 'right', marginTop: 6 },
  notesBox: { marginTop: 24, padding: '14 16', backgroundColor: 'rgba(212,232,216,0.2)', borderLeftWidth: 3, borderLeftColor: GOLD },
  notesLabel: { fontSize: 7.5, color: GOLD, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  notesText: { fontSize: 9, color: MUTED, lineHeight: 1.6 },
  paymentSection: { marginTop: 28, paddingTop: 20, borderTopWidth: 2, borderTopColor: GOLD },
  paymentLabel: { fontSize: 7.5, color: GOLD, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 },
  paymentGrid: { flexDirection: 'row', gap: 40 },
  paymentRow: { flexDirection: 'row', gap: 10, marginBottom: 5 },
  paymentKey: { fontSize: 8, color: MUTED, letterSpacing: 1, textTransform: 'uppercase', minWidth: 55 },
  paymentVal: { fontSize: 9, fontFamily: 'Helvetica-Bold' },
  footer: { marginTop: 'auto', paddingTop: 20, alignItems: 'center' },
  footerText: { fontSize: 8, color: MUTED, letterSpacing: 1, textTransform: 'uppercase' },
})

type Invoice = {
  invoice_number: number
  client_name: string
  client_email: string | null
  description: string | null
  amount: number
  invoice_date: string
  due_date: string | null
  notes: string | null
}

function fmtDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function fmt(n: number) {
  return `$${n.toFixed(2)}`
}

export function InvoicePDF({ invoice }: { invoice: Invoice }) {
  const lines = invoice.description
    ? invoice.description.split('\n').filter(Boolean)
    : [{ desc: 'Services', amount: invoice.amount }]

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.brand}>Harmonized Therapies</Text>
            <Text style={s.brandSub}>ABN 39 516 208 879</Text>
          </View>
          <View>
            <Text style={s.invoiceLabel}>Invoice</Text>
            <View style={s.metaRow}>
              <Text style={s.metaKey}>Invoice No</Text>
              <Text style={s.metaVal}>{invoice.invoice_number}</Text>
            </View>
            <View style={s.metaRow}>
              <Text style={s.metaKey}>Date</Text>
              <Text style={s.metaVal}>{fmtDate(invoice.invoice_date)}</Text>
            </View>
            {invoice.due_date && (
              <View style={s.metaRow}>
                <Text style={s.metaKey}>Due</Text>
                <Text style={s.metaVal}>{fmtDate(invoice.due_date)}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Parties */}
        <View style={s.parties}>
          <View>
            <Text style={s.partyLabel}>From</Text>
            <Text style={s.partyName}>Danielle Brierley</Text>
            <Text style={s.partyDetail}>Harmonized Therapies{'\n'}danielle@harmonizedtherapies.com.au{'\n'}0411 267 676</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.partyLabel}>Billed To</Text>
            <Text style={s.partyName}>{invoice.client_name}</Text>
            {invoice.client_email && <Text style={s.partyDetail}>{invoice.client_email}</Text>}
          </View>
        </View>

        <View style={s.goldLine} />

        {/* Table */}
        <View style={{ borderWidth: 1, borderColor: '#D4E8D8', borderRadius: 3, overflow: 'hidden' }}>
          <View style={s.tableHeader}>
            <Text style={[s.tableHeaderText, s.colDesc]}>Description</Text>
            <Text style={[s.tableHeaderText, s.colRight]}>Amount</Text>
          </View>
          {lines.map((line, i) => (
            <View key={i} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
              <Text style={s.colDesc}>{typeof line === 'string' ? line : line.desc}</Text>
              <Text style={s.colRight}>{typeof line === 'object' ? fmt(line.amount) : ''}</Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={s.totalsRow}>
          <View style={s.totalsTable}>
            <View style={s.totalDueRow}>
              <Text style={s.totalDueText}>Total Due</Text>
              <Text style={s.totalDueText}>{fmt(invoice.amount)}</Text>
            </View>
          </View>
        </View>
        <Text style={s.gstNote}>Not registered for GST — no GST has been charged.</Text>

        {/* Notes */}
        {invoice.notes && (
          <View style={s.notesBox}>
            <Text style={s.notesLabel}>Notes</Text>
            <Text style={s.notesText}>{invoice.notes}</Text>
          </View>
        )}

        {/* Payment details */}
        <View style={s.paymentSection}>
          <Text style={s.paymentLabel}>Payment Details</Text>
          <View style={s.paymentGrid}>
            <View>
              <View style={s.paymentRow}>
                <Text style={s.paymentKey}>Name</Text>
                <Text style={s.paymentVal}>Danielle Brierley</Text>
              </View>
              <View style={s.paymentRow}>
                <Text style={s.paymentKey}>BSB</Text>
                <Text style={s.paymentVal}>063-252</Text>
              </View>
              <View style={s.paymentRow}>
                <Text style={s.paymentKey}>Account</Text>
                <Text style={s.paymentVal}>10594148</Text>
              </View>
            </View>
            <View>
              <View style={s.paymentRow}>
                <Text style={s.paymentKey}>Phone</Text>
                <Text style={s.paymentVal}>0411 267 676</Text>
              </View>
              <View style={s.paymentRow}>
                <Text style={s.paymentKey}>Email</Text>
                <Text style={s.paymentVal}>daniellebrierley@bigpond.com</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerText}>Harmonized Therapies · Yarra Valley · harmonizedtherapies.com.au</Text>
        </View>

      </Page>
    </Document>
  )
}
