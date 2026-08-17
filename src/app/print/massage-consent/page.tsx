'use client'

const CONDITIONS = [
  'Heart disease', 'Diabetes', 'Epilepsy', 'Asthma',
  'Headaches', 'Chronic illness / disease', 'Dizziness', 'High blood pressure',
  'Low blood pressure', 'Night sweats', 'Skin conditions', 'Anxiety',
  'Depression', 'GIT conditions (constipation/diarrhoea)', 'Menstrual irregularities / pain',
  'Menopausal symptoms', 'Major surgeries', 'Other',
]

function Box() {
  return <span className="w-4 h-4 border border-charcoal/40 rounded-sm inline-block flex-shrink-0" />
}

function Circle({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="w-4 h-4 border border-charcoal/40 rounded-full inline-block flex-shrink-0" />
      {label}
    </label>
  )
}

function FieldLine({ tall }: { tall?: boolean }) {
  return <div style={{ borderBottom: '1px solid #ccc', minHeight: tall ? '36px' : '26px', marginTop: '4px' }} />
}

function SectionTitle({ label }: { label: string }) {
  return (
    <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b6b65', marginBottom: '10px', paddingBottom: '4px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
      {label}
    </p>
  )
}

export default function PrintMassageConsent() {
  return (
    <div className="bg-white font-sans text-charcoal" style={{ maxWidth: '680px', margin: '0 auto', padding: '40px 48px', fontSize: '13px', lineHeight: 1.5 }}>

      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; margin: 0; }
          html, body { height: auto; overflow: visible; }
          .no-print { display: none !important; }
          @page { margin: 12mm 14mm; size: A4; }
        }
        @media screen {
          body { background: #f5f5f5; }
        }
        * { box-sizing: border-box; }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #c8a96e', paddingBottom: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Images/logo-new.png" alt="Harmonized Therapies" style={{ width: '72px', height: 'auto' }} />
          <div>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#6b6b65', marginBottom: '4px' }}>Harmonized Therapies</p>
            <h1 style={{ fontSize: '22px', fontWeight: 300, letterSpacing: '0.04em', color: '#181816', margin: 0 }}>Massage Consent Form</h1>
            <p style={{ fontSize: '11px', color: '#6b6b65', marginTop: '4px' }}>All information is held in strict confidence and used only to support your care.</p>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="no-print"
          style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 16px', border: '1px solid #2D5A3D', color: '#2D5A3D', borderRadius: '999px', background: 'none', cursor: 'pointer', flexShrink: 0 }}
        >
          Print / Save PDF
        </button>
      </div>

      {/* Personal details */}
      <section style={{ marginBottom: '22px' }}>
        <SectionTitle label="Personal details" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          <div>
            <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>Full name</label>
            <FieldLine />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>Date of birth</label>
              <FieldLine />
            </div>
            <div>
              <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>Contact number</label>
              <FieldLine />
            </div>
            <div>
              <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>Date</label>
              <FieldLine />
            </div>
          </div>
        </div>
      </section>

      {/* Health information */}
      <section style={{ marginBottom: '22px' }}>
        <SectionTitle label="Health information" />

        {/* Condition checkboxes */}
        <div style={{ marginBottom: '10px' }}>
          <p style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b65', marginBottom: '8px' }}>Please tick any that apply</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 24px' }}>
            {CONDITIONS.map(c => (
              <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                <Box /> {c}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>If you ticked any of the above, please give details</label>
          <FieldLine /><FieldLine />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>Current medications or supplements</label>
          <FieldLine /><FieldLine />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '10px' }}>
          <div>
            <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>Recent surgery, injury or pain</label>
            <FieldLine /><FieldLine />
          </div>
          <div>
            <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>Major accidents / injuries (last 10 yrs)</label>
            <FieldLine /><FieldLine />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>Skin conditions or allergies</label>
            <FieldLine />
          </div>
          <div>
            <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>Pregnant or possibly pregnant?</label>
            <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
              <Circle label="No" /><Circle label="Yes" /><Circle label="Not sure" />
            </div>
          </div>
        </div>
      </section>

      {/* Current complaint */}
      <section style={{ marginBottom: '22px' }}>
        <SectionTitle label="Current complaint (if any)" />
        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>What are you experiencing?</label>
          <FieldLine /><FieldLine />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>When did it begin?</label>
            <FieldLine />
          </div>
          <div>
            <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>What caused it?</label>
            <FieldLine />
          </div>
          <div>
            <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>What relieves it?</label>
            <FieldLine />
          </div>
          <div>
            <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>What aggravates it?</label>
            <FieldLine />
          </div>
        </div>
      </section>

      {/* Wellbeing & preferences */}
      <section style={{ marginBottom: '22px' }}>
        <SectionTitle label="How are you today?" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 32px' }}>
          {[
            { label: 'Pain level', opts: ['Low', 'Medium', 'High'] },
            { label: 'Sleep quality', opts: ['Poor', 'Average', 'Good'] },
            { label: 'Mood', opts: ['Poor', 'Average', 'Good'] },
            { label: 'Energy', opts: ['Poor', 'Average', 'Good'] },
          ].map(({ label, opts }) => (
            <div key={label}>
              <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>{label}</label>
              <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                {opts.map(o => <Circle key={o} label={o} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preferences */}
      <section style={{ marginBottom: '22px' }}>
        <SectionTitle label="Your preferences" />
        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>Areas to avoid or be gentle with</label>
          <FieldLine /><FieldLine />
        </div>
        <div>
          <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>Pressure preference</label>
          <div style={{ display: 'flex', gap: '24px', marginTop: '6px' }}>
            <Circle label="Light" /><Circle label="Medium" /><Circle label="Firm" />
          </div>
        </div>
      </section>

      {/* Consent */}
      <section style={{ marginBottom: '24px' }}>
        <SectionTitle label="Consent" />
        <p style={{ fontSize: '11.5px', color: '#6b6b65', lineHeight: 1.7, marginBottom: '10px' }}>
          Massage therapy involves therapeutic touch. You have the right to ask Danielle to adjust pressure,
          avoid any area, or stop the session at any time. All information shared is held in strict confidence
          and used only to support your care. You may withdraw consent at any time.
        </p>
        <p style={{ fontSize: '12px', color: '#181816', lineHeight: 1.6, marginBottom: '16px' }}>
          I consent to receiving massage therapy from Danielle Brierley / Harmonized Therapies,
          and confirm that the information provided above is accurate to the best of my knowledge.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div>
            <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>Signature</label>
            <FieldLine tall />
          </div>
          <div>
            <label style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b65' }}>Date</label>
            <FieldLine tall />
          </div>
        </div>
      </section>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(200,169,110,0.4)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaa' }}>Harmonized Therapies · Yarra Valley · harmonizedtherapies.com.au</p>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaa' }}>ABN 39 516 208 879</p>
      </div>

    </div>
  )
}
