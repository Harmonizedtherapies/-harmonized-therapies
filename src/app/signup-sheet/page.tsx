import type { Metadata } from 'next'
import PrintButton from './PrintButton'

export const metadata: Metadata = {
  title: 'Massage Sign-Up Sheet — Harmonized Therapies',
}

const slots = [
  '8:30 am',
  '9:30 am',
  '10:30 am',
  '11:30 am',
  '12:30 pm',
  '1:30 pm',
  '2:30 pm',
  '3:30 pm',
  '4:30 pm',
]

export default function SignupSheetPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff; font-family: 'Jost', sans-serif; font-weight: 300; color: #181816; }

        .page { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 18mm 16mm 14mm; background: #fff; }

        .page-border { border: 1.5px solid #c8a96e; padding: 12mm 12mm 10mm; min-height: 267mm; position: relative; }
        .page-border::before { content: ''; position: absolute; inset: 4px; border: 0.5px solid #c8a96e33; pointer-events: none; }

        .corner { position: absolute; width: 18px; height: 18px; border-color: #c8a96e; border-style: solid; }
        .corner-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .corner-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
        .corner-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
        .corner-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

        .header { text-align: center; margin-bottom: 8mm; }
        .brand-tag { font-family: 'Jost', sans-serif; font-size: 8px; letter-spacing: 4px; text-transform: uppercase; color: #c8a96e; margin-bottom: 4mm; }
        .title { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; color: #1B3828; line-height: 1.1; margin-bottom: 2mm; }
        .title em { font-style: italic; font-weight: 300; }
        .subtitle { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 300; font-style: italic; color: #6b6b65; margin-bottom: 3mm; }

        .divider { display: flex; align-items: center; gap: 10px; margin: 4mm 0; }
        .divider-line { flex: 1; height: 0.5px; background: #c8a96e55; }
        .divider-leaf { color: #c8a96e; font-size: 14px; }

        .meta { display: flex; justify-content: space-between; margin-bottom: 6mm; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #6b6b65; }
        .meta-item span { color: #1B3828; font-weight: 400; }

        table { width: 100%; border-collapse: collapse; }
        thead th { font-family: 'Jost', sans-serif; font-size: 8px; letter-spacing: 3px; text-transform: uppercase; color: #c8a96e; font-weight: 400; padding: 3mm 3mm 2mm; text-align: left; border-bottom: 1px solid #c8a96e44; background: #faf8f3; }
        tbody tr { border-bottom: 0.5px solid #e8e4dc; }
        tbody tr:nth-child(even) { background: #faf8f3; }
        tbody td { padding: 3.5mm 3mm; font-size: 11px; vertical-align: middle; }

        .time-cell { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 400; color: #1B3828; white-space: nowrap; width: 22mm; }
        .write-line { border-bottom: 0.5px solid #c8a96e44; display: block; height: 5mm; width: 100%; }
        .name-col { width: 52mm; }
        .phone-col { width: 38mm; }
        .notes-col { width: auto; }

        .footer { margin-top: 7mm; text-align: center; }
        .footer-text { font-size: 8px; letter-spacing: 2px; text-transform: uppercase; color: #c8a96e88; }
        .footer-contact { font-family: 'Cormorant Garamond', serif; font-size: 11px; font-style: italic; color: #6b6b65; margin-top: 2mm; }

        @media print {
          html, body { background: #fff !important; }
          .page { margin: 0; padding: 12mm 12mm 10mm; width: 100%; }
          .no-print { display: none !important; }
          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>

      <PrintButton />

      <div className="page">
        <div className="page-border">
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />

          <div className="header">
            <p className="brand-tag">Harmonized Therapies &nbsp;·&nbsp; Tudor Village Lilydale</p>
            <h1 className="title">Massage<br /><em>Sign-Up Sheet</em></h1>
            <p className="subtitle">Danielle Brierley &nbsp;·&nbsp; Holistic Massage Therapist</p>
            <div className="divider">
              <div className="divider-line" />
              <span className="divider-leaf">✦</span>
              <div className="divider-line" />
            </div>
          </div>

          <div className="meta">
            <div className="meta-item">Friday &nbsp;<span>_____ / _____ / _____</span></div>
            <div className="meta-item">Sessions &nbsp;<span>8:30 am – 5:30 pm</span></div>
            <div className="meta-item">Duration &nbsp;<span>1 hour per resident</span></div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th className="name-col">Resident name</th>
                <th className="phone-col">Room / phone</th>
                <th className="notes-col">Notes</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((time, i) => (
                <tr key={i}>
                  <td className="time-cell">{time}</td>
                  <td className="name-col"><span className="write-line" /></td>
                  <td className="phone-col"><span className="write-line" /></td>
                  <td className="notes-col"><span className="write-line" /></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="footer">
            <div className="divider" style={{ marginTop: '7mm' }}>
              <div className="divider-line" />
              <span className="divider-leaf">✦</span>
              <div className="divider-line" />
            </div>
            <p className="footer-contact">danielle@harmonizedtherapies.com.au &nbsp;·&nbsp; harmonizedtherapies.com.au</p>
            <p className="footer-text" style={{ marginTop: '2mm' }}>Harmonized Therapies &nbsp;·&nbsp; Yarra Valley, Melbourne</p>
          </div>
        </div>
      </div>
    </>
  )
}
