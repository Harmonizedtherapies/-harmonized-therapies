'use client'
export default function OncologyIntakePrintPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff; font-family: 'Jost', sans-serif; font-weight: 300; color: #181816; font-size: 10px; }

        .no-print { display: block; }
        .page { width: 210mm; margin: 0 auto; padding: 12mm 14mm; background: #fff; }

        .header { text-align: center; border-bottom: 2px solid #c8a96e; padding-bottom: 6mm; margin-bottom: 6mm; }
        .brand { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; color: #1B3828; letter-spacing: 3px; text-transform: uppercase; }
        .form-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; color: #1B3828; margin: 1mm 0; }
        .subtitle { font-size: 8px; letter-spacing: 2px; text-transform: uppercase; color: #6b6b65; }

        .section { margin-bottom: 5mm; }
        .section-title { font-size: 7.5px; letter-spacing: 3px; text-transform: uppercase; color: #c8a96e; font-weight: 400; margin-bottom: 2.5mm; padding-bottom: 1mm; border-bottom: 0.5px solid #c8a96e44; }

        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 3mm; }
        .field { margin-bottom: 3mm; }
        .field-label { font-size: 7.5px; letter-spacing: 1.5px; text-transform: uppercase; color: #6b6b65; margin-bottom: 1mm; display: block; }
        .write-line { border-bottom: 0.5px solid #c8a96e66; height: 5mm; display: block; width: 100%; }
        .write-line-tall { border-bottom: 0.5px solid #c8a96e66; height: 5mm; display: block; width: 100%; margin-bottom: 1mm; }

        .checkbox-row { display: flex; flex-wrap: wrap; gap: 2mm 5mm; }
        .checkbox-item { display: flex; align-items: center; gap: 1.5mm; font-size: 9px; }
        .box { width: 3.5mm; height: 3.5mm; border: 0.75px solid #1B3828; flex-shrink: 0; }

        .radio-row { display: flex; gap: 5mm; align-items: center; }
        .radio-item { display: flex; align-items: center; gap: 1.5mm; font-size: 9px; }
        .circle { width: 3.5mm; height: 3.5mm; border: 0.75px solid #1B3828; border-radius: 50%; flex-shrink: 0; }

        .consent-box { border: 0.75px solid #c8a96e55; padding: 3mm; margin-top: 2mm; background: #faf8f3; }
        .consent-text { font-size: 8px; line-height: 1.6; color: #6b6b65; margin-bottom: 3mm; }
        .sig-row { display: flex; gap: 8mm; margin-top: 2mm; }
        .sig-field { flex: 1; }

        .footer { text-align: center; margin-top: 6mm; padding-top: 4mm; border-top: 0.5px solid #c8a96e44; }
        .footer-text { font-size: 7.5px; letter-spacing: 2px; text-transform: uppercase; color: #c8a96e88; }

        @media print {
          .no-print { display: none !important; }
          body { font-size: 10px; }
          .page { margin: 0; padding: 10mm 12mm; width: 100%; }
          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>

      {/* Screen controls */}
      <div className="no-print" style={{ textAlign: 'center', padding: '20px', background: '#f8f5f0', borderBottom: '1px solid #e8e4dc' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#6b6b65', marginBottom: '12px' }}>
          Oncology Massage Intake — Printable Blank Form
        </p>
        <button onClick={() => window.print()}
          style={{ background: '#2D5A3D', color: '#fff', border: 'none', padding: '10px 28px', borderRadius: '100px', fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>
          Print / Save as PDF
        </button>
        <p style={{ fontFamily: 'sans-serif', fontSize: '11px', color: '#aaa', marginTop: '8px' }}>
          In the print dialog → More settings → uncheck <strong>Headers and footers</strong>
        </p>
      </div>

      <div className="page">
        <div className="header">
          <p className="brand">Harmonized Therapies</p>
          <p className="form-title">Oncology Massage <em>Intake Form</em></p>
          <p className="subtitle">Confidential · Danielle Brierley · 0411 267 676 · danielle@harmonizedtherapies.com.au</p>
        </div>

        {/* About You */}
        <div className="section">
          <p className="section-title">About You</p>
          <div className="grid-2">
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Full name</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">Date of birth</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">Phone</span>
              <span className="write-line" />
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Email</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">Emergency contact name</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">Emergency contact phone</span>
              <span className="write-line" />
            </div>
          </div>
        </div>

        {/* Medical Team */}
        <div className="section">
          <p className="section-title">Medical Team</p>
          <div className="grid-2">
            <div className="field">
              <span className="field-label">Oncologist name</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">Oncologist phone / clinic</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">GP name</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">GP phone / clinic</span>
              <span className="write-line" />
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="section">
          <p className="section-title">Diagnosis</p>
          <div className="grid-3">
            <div className="field" style={{ gridColumn: '1 / 3' }}>
              <span className="field-label">Type of cancer</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">Stage (if known)</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">Date of diagnosis</span>
              <span className="write-line" />
            </div>
          </div>
        </div>

        {/* Current Treatment */}
        <div className="section">
          <p className="section-title">Current Treatment (tick all that apply)</p>
          <div className="checkbox-row" style={{ marginBottom: '2mm' }}>
            {['Chemotherapy', 'Radiation therapy', 'Surgery', 'Hormone therapy', 'Immunotherapy', 'Targeted therapy', 'Palliative care', 'Not currently in active treatment'].map(t => (
              <div key={t} className="checkbox-item"><div className="box" /><span>{t}</span></div>
            ))}
          </div>
          <div className="grid-2" style={{ marginTop: '2mm' }}>
            <div className="field">
              <span className="field-label">Date of last treatment</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">Date of next treatment</span>
              <span className="write-line" />
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Other treatments</span>
              <span className="write-line" />
            </div>
          </div>
        </div>

        {/* Ports */}
        <div className="section">
          <p className="section-title">Ports & Medical Devices</p>
          <div className="grid-2">
            <div className="field">
              <span className="field-label">Port-a-cath?</span>
              <div className="radio-row"><div className="radio-item"><div className="circle" /><span>Yes</span></div><div className="radio-item"><div className="circle" /><span>No</span></div></div>
            </div>
            <div className="field">
              <span className="field-label">If yes — location</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">PICC line?</span>
              <div className="radio-row"><div className="radio-item"><div className="circle" /><span>Yes</span></div><div className="radio-item"><div className="circle" /><span>No</span></div></div>
            </div>
            <div className="field">
              <span className="field-label">If yes — which arm</span>
              <span className="write-line" />
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Other devices / implants</span>
              <span className="write-line" />
            </div>
          </div>
        </div>

        {/* Surgery & Lymph */}
        <div className="section">
          <p className="section-title">Surgery & Lymph Nodes</p>
          <div className="grid-2">
            <div className="field">
              <span className="field-label">Cancer-related surgery?</span>
              <div className="radio-row"><div className="radio-item"><div className="circle" /><span>Yes</span></div><div className="radio-item"><div className="circle" /><span>No</span></div></div>
            </div>
            <div className="field">
              <span className="field-label">Surgery date</span>
              <span className="write-line" />
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Surgery details</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">Lymph nodes removed?</span>
              <div className="radio-row"><div className="radio-item"><div className="circle" /><span>Yes</span></div><div className="radio-item"><div className="circle" /><span>No</span></div></div>
            </div>
            <div className="field">
              <span className="field-label">If yes — where</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">Lymphedema?</span>
              <div className="radio-row"><div className="radio-item"><div className="circle" /><span>Yes</span></div><div className="radio-item"><div className="circle" /><span>No</span></div></div>
            </div>
            <div className="field">
              <span className="field-label">If yes — where</span>
              <span className="write-line" />
            </div>
          </div>
        </div>

        {/* Radiation & Bone */}
        <div className="section">
          <p className="section-title">Radiation & Bone Health</p>
          <div className="grid-2">
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Areas that have received radiation</span>
              <span className="write-line" />
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Skin changes in radiated areas</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">Bone metastases?</span>
              <div className="radio-row"><div className="radio-item"><div className="circle" /><span>Yes</span></div><div className="radio-item"><div className="circle" /><span>No</span></div><div className="radio-item"><div className="circle" /><span>Unknown</span></div></div>
            </div>
            <div className="field">
              <span className="field-label">If yes — location</span>
              <span className="write-line" />
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Osteoporosis / reduced bone density?</span>
              <div className="radio-row"><div className="radio-item"><div className="circle" /><span>Yes</span></div><div className="radio-item"><div className="circle" /><span>No</span></div><div className="radio-item"><div className="circle" /><span>Unknown</span></div></div>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="section">
          <p className="section-title">Current Symptoms</p>
          <div className="grid-2">
            <div className="field">
              <span className="field-label">Fatigue level today (1 = none, 10 = severe)</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">Pain level today (1 = none, 10 = severe)</span>
              <span className="write-line" />
            </div>
            <div className="field">
              <span className="field-label">Neuropathy (numbness/tingling)?</span>
              <div className="radio-row"><div className="radio-item"><div className="circle" /><span>Yes</span></div><div className="radio-item"><div className="circle" /><span>No</span></div></div>
            </div>
            <div className="field">
              <span className="field-label">If yes — where</span>
              <span className="write-line" />
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Other symptoms (nausea, dizziness, blood clot history…)</span>
              <span className="write-line" />
            </div>
          </div>
        </div>

        {/* Medications */}
        <div className="section">
          <p className="section-title">Medications (including supplements & blood thinners)</p>
          <span className="write-line-tall" />
          <span className="write-line-tall" />
          <span className="write-line-tall" />
        </div>

        {/* Massage Preferences */}
        <div className="section">
          <p className="section-title">Massage Preferences</p>
          <div className="grid-2">
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Areas to avoid (ports, surgical sites, radiation areas…)</span>
              <span className="write-line-tall" />
              <span className="write-line-tall" />
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Areas that tend to feel helpful or therapeutic</span>
              <span className="write-line-tall" />
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Pressure preference</span>
              <div className="radio-row"><div className="radio-item"><div className="circle" /><span>Very light</span></div><div className="radio-item"><div className="circle" /><span>Light</span></div><div className="radio-item"><div className="circle" /><span>Medium</span></div><div className="radio-item"><div className="circle" /><span>Let Danielle guide</span></div></div>
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Positioning needs (can&apos;t lie flat, need pillows…)</span>
              <span className="write-line" />
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Allergies to oils, fragrance or latex</span>
              <span className="write-line" />
            </div>
          </div>
        </div>

        {/* Consent */}
        <div className="section">
          <p className="section-title">Consent</p>
          <div className="consent-box">
            <p className="consent-text">
              All information shared on this form is held in strict confidence and used only to ensure your massage is safe, comfortable,
              and supportive of your wellbeing. You may update or withdraw this information at any time by contacting Danielle directly.
              By signing below, you confirm the details above are accurate to the best of your knowledge and consent to Danielle Brierley /
              Harmonized Therapies collecting and storing this information for the purpose of providing oncology massage services.
            </p>
            <div className="sig-row">
              <div className="sig-field">
                <span className="field-label">Signature</span>
                <span className="write-line" style={{ marginTop: '4mm' }} />
              </div>
              <div className="sig-field">
                <span className="field-label">Date</span>
                <span className="write-line" style={{ marginTop: '4mm' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <p className="footer-text">Harmonized Therapies · Danielle Brierley · 0411 267 676 · harmonizedtherapies.com.au · ABN 39 516 208 879</p>
        </div>
      </div>
    </>
  )
}
