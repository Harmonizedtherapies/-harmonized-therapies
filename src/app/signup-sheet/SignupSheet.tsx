'use client'
import { useState } from 'react'
import Image from 'next/image'

const oneHourSlots = [
  '8:30 am', '9:30 am', '10:30 am', '11:30 am', '12:30 pm',
  '1:30 pm', '2:30 pm', '3:30 pm', '4:30 pm',
]

const halfHourSlots = [
  '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am',
  '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm', '2:00 pm',
  '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm', '5:00 pm',
]

export default function SignupSheet() {
  const [mode, setMode] = useState<'1hr' | '30min'>('1hr')
  const slots = mode === '1hr' ? oneHourSlots : halfHourSlots
  const rowPad = mode === '1hr' ? '3.5mm' : '2mm'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff; font-family: 'Jost', sans-serif; font-weight: 300; color: #181816; }

        .page { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 14mm 14mm 12mm; background: #fff; }
        .page-border { border: 1.5px solid #c8a96e; padding: 10mm 11mm 9mm; min-height: 270mm; position: relative; }
        .page-border::before { content: ''; position: absolute; inset: 4px; border: 0.5px solid #c8a96e33; pointer-events: none; }

        .corner { position: absolute; width: 16px; height: 16px; border-color: #c8a96e; border-style: solid; }
        .corner-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .corner-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
        .corner-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
        .corner-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

        .header { text-align: center; margin-bottom: 6mm; }
        .logo-wrap { margin-bottom: 3mm; }
        .brand-tag { font-size: 7.5px; letter-spacing: 4px; text-transform: uppercase; color: #c8a96e; margin-bottom: 3mm; }
        .title { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 300; color: #1B3828; line-height: 1.1; margin-bottom: 1.5mm; }
        .title em { font-style: italic; }
        .subtitle { font-family: 'Cormorant Garamond', serif; font-size: 13px; font-weight: 300; font-style: italic; color: #6b6b65; }

        .divider { display: flex; align-items: center; gap: 8px; margin: 3.5mm 0; }
        .divider-line { flex: 1; height: 0.5px; background: #c8a96e55; }
        .divider-leaf { color: #c8a96e; font-size: 12px; }

        .meta { display: flex; justify-content: space-between; margin-bottom: 5mm; font-size: 8.5px; letter-spacing: 1.5px; text-transform: uppercase; color: #6b6b65; }
        .meta span { color: #1B3828; font-weight: 400; }

        table { width: 100%; border-collapse: collapse; }
        thead th { font-size: 7.5px; letter-spacing: 3px; text-transform: uppercase; color: #c8a96e; font-weight: 400; padding: 2.5mm 3mm 2mm; text-align: left; border-bottom: 1px solid #c8a96e44; background: #faf8f3; }
        tbody tr { border-bottom: 0.5px solid #e8e4dc; }
        tbody tr:nth-child(even) { background: #faf8f3; }
        tbody td { vertical-align: middle; font-size: 10px; }

        .time-cell { font-family: 'Cormorant Garamond', serif; font-size: 13px; font-weight: 400; color: #1B3828; white-space: nowrap; width: 20mm; padding: 0 3mm; }
        .write-line { border-bottom: 0.5px solid #c8a96e44; display: block; width: 100%; }
        .name-col { width: 50mm; padding: 0 3mm; }
        .phone-col { width: 35mm; padding: 0 3mm; }
        .notes-col { padding: 0 3mm; }

        .footer { margin-top: 5mm; text-align: center; }
        .footer-contact { font-family: 'Cormorant Garamond', serif; font-size: 10px; font-style: italic; color: #6b6b65; margin-top: 1.5mm; }
        .footer-text { font-size: 7px; letter-spacing: 2px; text-transform: uppercase; color: #c8a96e88; margin-top: 1.5mm; }

        @media print {
          html, body { background: #fff !important; }
          .page { margin: 0; padding: 10mm 10mm 8mm; width: 100%; }
          .no-print { display: none !important; }
          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>

      {/* Controls — hidden on print */}
      <div className="no-print" style={{ textAlign: 'center', padding: '20px 20px 16px', background: '#f8f5f0', borderBottom: '1px solid #e8e4dc' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#6b6b65', marginBottom: '12px' }}>
          Tudor Village Lilydale — Friday massage sign-up sheet
        </p>
        {/* Slot toggle */}
        <div style={{ display: 'inline-flex', background: '#e8e4dc', borderRadius: '100px', padding: '3px', marginBottom: '12px' }}>
          {(['1hr', '30min'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '7px 18px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase',
                background: mode === m ? '#1B3828' : 'transparent',
                color: mode === m ? '#fff' : '#6b6b65',
                transition: 'all 0.2s',
              }}
            >
              {m === '1hr' ? '1 hour slots' : '30 min slots'}
            </button>
          ))}
        </div>
        <br />
        <button
          onClick={() => window.print()}
          style={{
            background: '#c8a96e', color: '#fff', border: 'none',
            padding: '10px 28px', borderRadius: '100px',
            fontFamily: 'sans-serif', fontSize: '11px',
            letterSpacing: '2px', textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Print sheet
        </button>
      </div>

      {/* Printable sheet */}
      <div className="page">
        <div className="page-border">
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />

          <div className="header">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3mm' }}>
              <Image
                src="/Images/logo-submark.png"
                alt="Harmonized Therapies"
                width={90}
                height={110}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="brand-tag">Tudor Village Lilydale</p>
            <h1 className="title">Massage <em>Sign-Up Sheet</em></h1>
            <p className="subtitle">Danielle Brierley &nbsp;·&nbsp; Holistic Massage Therapist</p>
            <div className="divider">
              <div className="divider-line" />
              <span className="divider-leaf">✦</span>
              <div className="divider-line" />
            </div>
          </div>

          <div className="meta">
            <div>Friday &nbsp;<span>_____ / _____ / _____</span></div>
            <div>Sessions &nbsp;<span>8:30 am – 5:30 pm</span></div>
            <div>Duration &nbsp;<span>{mode === '1hr' ? '1 hour' : '30 minutes'} per resident</span></div>
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
                  <td className="time-cell" style={{ paddingTop: rowPad, paddingBottom: rowPad }}>{time}</td>
                  <td className="name-col" style={{ paddingTop: rowPad, paddingBottom: rowPad }}>
                    <span className="write-line" style={{ height: mode === '1hr' ? '5mm' : '3.5mm' }} />
                  </td>
                  <td className="phone-col" style={{ paddingTop: rowPad, paddingBottom: rowPad }}>
                    <span className="write-line" style={{ height: mode === '1hr' ? '5mm' : '3.5mm' }} />
                  </td>
                  <td className="notes-col" style={{ paddingTop: rowPad, paddingBottom: rowPad }}>
                    <span className="write-line" style={{ height: mode === '1hr' ? '5mm' : '3.5mm' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="footer">
            <div className="divider" style={{ marginTop: '5mm' }}>
              <div className="divider-line" />
              <span className="divider-leaf">✦</span>
              <div className="divider-line" />
            </div>
            <p className="footer-contact">danielle@harmonizedtherapies.com.au &nbsp;·&nbsp; harmonizedtherapies.com.au</p>
            <p className="footer-text">Harmonized Therapies &nbsp;·&nbsp; Yarra Valley, Melbourne</p>
          </div>
        </div>
      </div>
    </>
  )
}
