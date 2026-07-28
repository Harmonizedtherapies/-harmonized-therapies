export default function PrintMassageConsent() {
  return (
    <div className="min-h-screen bg-white p-10 print:p-8 font-sans text-sm text-charcoal max-w-2xl mx-auto">

      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
        }
        .field-line { border-bottom: 1px solid #ccc; min-height: 28px; margin-top: 4px; }
        .field-line-lg { border-bottom: 1px solid #ccc; min-height: 28px; margin-top: 4px; }
      `}</style>

      {/* Header */}
      <div className="border-b-2 border-charcoal/20 pb-6 mb-8">
        <p className="text-[0.6rem] tracking-[0.25em] uppercase text-muted mb-2">Harmonized Therapies</p>
        <h1 className="text-2xl font-light tracking-wide text-charcoal">Massage Consent Form</h1>
        <p className="text-xs text-muted mt-1">All information is held in strict confidence and used only to support your care.</p>
      </div>

      {/* Personal details */}
      <section className="mb-8">
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-muted mb-4 border-b border-charcoal/10 pb-1">Personal details</p>
        <div className="space-y-4">
          <div>
            <label className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">Full name</label>
            <div className="field-line" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">Date of birth</label>
              <div className="field-line" />
            </div>
            <div>
              <label className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">Contact number</label>
              <div className="field-line" />
            </div>
          </div>
          <div>
            <label className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">Date of session</label>
            <div className="field-line" />
          </div>
        </div>
      </section>

      {/* Health information */}
      <section className="mb-8">
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-muted mb-4 border-b border-charcoal/10 pb-1">Health information</p>
        <div className="space-y-5">
          <div>
            <label className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">Health conditions or medical history</label>
            <div className="field-line mt-1" />
            <div className="field-line mt-1" />
            <div className="field-line mt-1" />
          </div>
          <div>
            <label className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">Current medications or supplements</label>
            <div className="field-line mt-1" />
            <div className="field-line mt-1" />
          </div>
          <div>
            <label className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">Recent surgery, injury or areas of pain</label>
            <div className="field-line mt-1" />
            <div className="field-line mt-1" />
          </div>
          <div>
            <label className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">Skin conditions or allergies</label>
            <div className="field-line mt-1" />
          </div>
          <div>
            <label className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">Pregnant or possibly pregnant?</label>
            <div className="flex gap-8 mt-2">
              {['No', 'Yes', 'Not sure'].map(opt => (
                <label key={opt} className="flex items-center gap-2 text-sm">
                  <span className="w-4 h-4 border border-charcoal/40 rounded-sm inline-block flex-shrink-0" />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="mb-8">
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-muted mb-4 border-b border-charcoal/10 pb-1">Your preferences</p>
        <div className="space-y-5">
          <div>
            <label className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">Areas to avoid or be gentle with</label>
            <div className="field-line mt-1" />
            <div className="field-line mt-1" />
          </div>
          <div>
            <label className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">Pressure preference</label>
            <div className="flex gap-8 mt-2">
              {['Light', 'Medium', 'Firm'].map(opt => (
                <label key={opt} className="flex items-center gap-2 text-sm">
                  <span className="w-4 h-4 border border-charcoal/40 rounded-sm inline-block flex-shrink-0" />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consent */}
      <section className="mb-10">
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-muted mb-4 border-b border-charcoal/10 pb-1">Consent</p>
        <p className="text-xs text-muted leading-relaxed mb-5">
          Massage therapy involves therapeutic touch. You have the right to ask Danielle to adjust pressure,
          avoid any area, or stop the session at any time. All information shared is held in strict confidence
          and used only to support your care. You may withdraw consent at any time.
        </p>
        <p className="text-sm text-charcoal leading-relaxed mb-6">
          I consent to receiving massage therapy from Danielle Brierley / Harmonized Therapies,
          and confirm that the information provided above is accurate to the best of my knowledge.
        </p>
        <div className="grid grid-cols-2 gap-8 mt-2">
          <div>
            <label className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">Signature</label>
            <div className="field-line mt-4" />
          </div>
          <div>
            <label className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">Date</label>
            <div className="field-line mt-4" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-charcoal/10 pt-4 flex items-center justify-between">
        <p className="text-[0.6rem] tracking-[0.18em] uppercase text-muted/60">Harmonized Therapies · Yarra Valley</p>
        <button
          onClick={() => window.print()}
          className="no-print text-[0.65rem] tracking-[0.1em] uppercase px-4 py-2 border border-sage/30 text-sage rounded-full hover:bg-sage hover:text-white transition-colors"
        >
          Print
        </button>
      </div>
    </div>
  )
}
