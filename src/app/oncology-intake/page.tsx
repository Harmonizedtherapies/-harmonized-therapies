'use client'
import { useState } from 'react'
import Logo from '@/components/Logo'

const labelClass = 'block text-[0.68rem] tracking-[0.15em] uppercase text-muted mb-2 font-[400]'
const inputClass = 'w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-muted/40 outline-none focus:border-sage transition-colors'
const textareaClass = `${inputClass} resize-none leading-relaxed`

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px flex-1 bg-sage/15" />
      <p className="text-[0.68rem] tracking-[0.22em] uppercase text-sage font-[400]">{label}</p>
      <div className="h-px flex-1 bg-sage/15" />
    </div>
  )
}

const TREATMENTS = [
  'Chemotherapy',
  'Radiation therapy',
  'Surgery',
  'Hormone therapy',
  'Immunotherapy',
  'Targeted therapy',
  'Palliative care',
  'Not currently in active treatment',
]

export default function OncologyIntakePage() {
  const [form, setForm] = useState({
    // Personal
    name: '', dob: '', phone: '', email: '',
    emergency_name: '', emergency_phone: '',
    // Medical team
    oncologist_name: '', oncologist_phone: '',
    gp_name: '', gp_phone: '',
    // Diagnosis
    cancer_type: '', cancer_stage: '', diagnosis_date: '',
    // Treatment
    current_treatments: [] as string[],
    last_treatment_date: '', next_treatment_date: '',
    treatment_other: '',
    // Ports
    has_port: '', port_location: '',
    has_picc: '', picc_arm: '',
    other_devices: '',
    // Surgery & lymph nodes
    recent_surgery: '', surgery_details: '', surgery_date: '',
    lymph_nodes_removed: '', lymph_node_location: '',
    has_lymphedema: '', lymphedema_location: '',
    // Radiation
    radiation_areas: '', radiation_skin_changes: '',
    // Bone
    bone_mets: '', bone_mets_location: '',
    osteoporosis: '',
    // Symptoms
    fatigue_level: '', pain_level: '',
    neuropathy: '', neuropathy_location: '',
    other_symptoms: '',
    // Medications
    medications: '',
    // Massage preferences
    areas_to_avoid: '', areas_helpful: '',
    pressure_preference: '',
    positioning_needs: '',
    // Allergies
    allergies: '',
    // Consent
    consent_given: false,
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function set(field: string, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function toggleTreatment(t: string) {
    setForm(f => ({
      ...f,
      current_treatments: f.current_treatments.includes(t)
        ? f.current_treatments.filter(x => x !== t)
        : [...f.current_treatments, t],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name) return
    setStatus('sending')
    try {
      const res = await fetch('/api/oncology-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, consent_date: new Date().toISOString() }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div className="w-10 mx-auto mb-6 text-sage/50"><Logo /></div>
          <h2 className="font-display text-3xl font-light text-charcoal mb-4">
            Thank you, <em className="italic">beautiful soul</em>
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
            Your information has been received and will be held with the greatest care.
            Danielle will review everything before your session. See you soon.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-sage-dark px-6 py-10 text-center">
        <div className="w-10 mx-auto mb-5 text-cream/60"><Logo /></div>
        <p className="text-[0.68rem] tracking-[0.22em] uppercase text-gold/60 mb-3 font-[400]">Harmonized Therapies</p>
        <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-cream leading-tight mb-4">
          Oncology Massage <em className="italic text-sage-mid">Intake Form</em>
        </h1>
        <p className="text-cream/60 text-sm leading-relaxed max-w-xl mx-auto">
          This form helps Danielle work safely and thoughtfully with your body during the retreat.
          Everything you share is completely confidential. Take your time — there are no right answers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-6 py-14 space-y-14">

        {/* About You */}
        <section>
          <SectionDivider label="About you" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className={labelClass}>Full name *</label>
                <input type="text" required className={inputClass} value={form.name}
                  onChange={e => set('name', e.target.value)} placeholder="Your full name" />
              </div>
              <div>
                <label className={labelClass}>Date of birth</label>
                <input type="date" className={inputClass} value={form.dob} onChange={e => set('dob', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input type="tel" className={inputClass} value={form.phone}
                  onChange={e => set('phone', e.target.value)} placeholder="0400 000 000" />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Email</label>
                <input type="email" className={inputClass} value={form.email}
                  onChange={e => set('email', e.target.value)} placeholder="your@email.com" />
              </div>
              <div>
                <label className={labelClass}>Emergency contact name</label>
                <input type="text" className={inputClass} value={form.emergency_name}
                  onChange={e => set('emergency_name', e.target.value)} placeholder="Name" />
              </div>
              <div>
                <label className={labelClass}>Emergency contact phone</label>
                <input type="tel" className={inputClass} value={form.emergency_phone}
                  onChange={e => set('emergency_phone', e.target.value)} placeholder="0400 000 000" />
              </div>
            </div>
          </div>
        </section>

        {/* Medical Team */}
        <section>
          <SectionDivider label="Your medical team" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Oncologist name</label>
                <input type="text" className={inputClass} value={form.oncologist_name}
                  onChange={e => set('oncologist_name', e.target.value)} placeholder="Dr. name" />
              </div>
              <div>
                <label className={labelClass}>Oncologist phone / clinic</label>
                <input type="text" className={inputClass} value={form.oncologist_phone}
                  onChange={e => set('oncologist_phone', e.target.value)} placeholder="Clinic name or phone" />
              </div>
              <div>
                <label className={labelClass}>GP name</label>
                <input type="text" className={inputClass} value={form.gp_name}
                  onChange={e => set('gp_name', e.target.value)} placeholder="Dr. name" />
              </div>
              <div>
                <label className={labelClass}>GP phone / clinic</label>
                <input type="text" className={inputClass} value={form.gp_phone}
                  onChange={e => set('gp_phone', e.target.value)} placeholder="Clinic name or phone" />
              </div>
            </div>
          </div>
        </section>

        {/* Diagnosis */}
        <section>
          <SectionDivider label="Your diagnosis" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-6">
            <div>
              <label className={labelClass}>Type of cancer</label>
              <input type="text" className={inputClass} value={form.cancer_type}
                onChange={e => set('cancer_type', e.target.value)} placeholder="e.g. Breast cancer, lymphoma…" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Stage (if known)</label>
                <input type="text" className={inputClass} value={form.cancer_stage}
                  onChange={e => set('cancer_stage', e.target.value)} placeholder="e.g. Stage 2, or unknown" />
              </div>
              <div>
                <label className={labelClass}>Date of diagnosis</label>
                <input type="date" className={inputClass} value={form.diagnosis_date}
                  onChange={e => set('diagnosis_date', e.target.value)} />
              </div>
            </div>
          </div>
        </section>

        {/* Current Treatment */}
        <section>
          <SectionDivider label="Current treatment" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-6">
            <div>
              <label className={labelClass}>Current or recent treatments (tick all that apply)</label>
              <div className="grid sm:grid-cols-2 gap-3 mt-1">
                {TREATMENTS.map(t => (
                  <label key={t} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" checked={form.current_treatments.includes(t)}
                      onChange={() => toggleTreatment(t)} className="accent-sage w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-charcoal group-hover:text-sage transition-colors">{t}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>Any other treatments not listed above</label>
              <input type="text" className={inputClass} value={form.treatment_other}
                onChange={e => set('treatment_other', e.target.value)} placeholder="Please describe" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Date of last treatment</label>
                <input type="date" className={inputClass} value={form.last_treatment_date}
                  onChange={e => set('last_treatment_date', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Date of next treatment</label>
                <input type="date" className={inputClass} value={form.next_treatment_date}
                  onChange={e => set('next_treatment_date', e.target.value)} />
              </div>
            </div>
          </div>
        </section>

        {/* Ports & Devices */}
        <section>
          <SectionDivider label="Ports & medical devices" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-6">
            <p className="text-muted text-xs leading-relaxed -mt-1">
              This helps Danielle know which areas to avoid during your massage.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Do you have a port-a-cath?</label>
                <div className="flex gap-4 mt-1">
                  {['Yes', 'No'].map(o => (
                    <label key={o} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="has_port" value={o} checked={form.has_port === o}
                        onChange={() => set('has_port', o)} className="accent-sage w-4 h-4" />
                      <span className="text-sm text-charcoal group-hover:text-sage transition-colors">{o}</span>
                    </label>
                  ))}
                </div>
              </div>
              {form.has_port === 'Yes' && (
                <div>
                  <label className={labelClass}>Port location</label>
                  <input type="text" className={inputClass} value={form.port_location}
                    onChange={e => set('port_location', e.target.value)} placeholder="e.g. Right chest" />
                </div>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Do you have a PICC line?</label>
                <div className="flex gap-4 mt-1">
                  {['Yes', 'No'].map(o => (
                    <label key={o} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="has_picc" value={o} checked={form.has_picc === o}
                        onChange={() => set('has_picc', o)} className="accent-sage w-4 h-4" />
                      <span className="text-sm text-charcoal group-hover:text-sage transition-colors">{o}</span>
                    </label>
                  ))}
                </div>
              </div>
              {form.has_picc === 'Yes' && (
                <div>
                  <label className={labelClass}>Which arm?</label>
                  <input type="text" className={inputClass} value={form.picc_arm}
                    onChange={e => set('picc_arm', e.target.value)} placeholder="e.g. Left arm" />
                </div>
              )}
            </div>
            <div>
              <label className={labelClass}>Any other medical devices or implants</label>
              <input type="text" className={inputClass} value={form.other_devices}
                onChange={e => set('other_devices', e.target.value)} placeholder="e.g. pacemaker, stent, drain…" />
            </div>
          </div>
        </section>

        {/* Surgery & Lymph Nodes */}
        <section>
          <SectionDivider label="Surgery & lymph nodes" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-6">
            <div>
              <label className={labelClass}>Have you had surgery related to your cancer?</label>
              <div className="flex gap-4 mt-1">
                {['Yes', 'No'].map(o => (
                  <label key={o} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="recent_surgery" value={o} checked={form.recent_surgery === o}
                      onChange={() => set('recent_surgery', o)} className="accent-sage w-4 h-4" />
                    <span className="text-sm text-charcoal group-hover:text-sage transition-colors">{o}</span>
                  </label>
                ))}
              </div>
            </div>
            {form.recent_surgery === 'Yes' && (
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Surgery details</label>
                  <input type="text" className={inputClass} value={form.surgery_details}
                    onChange={e => set('surgery_details', e.target.value)} placeholder="e.g. Mastectomy, lumpectomy…" />
                </div>
                <div>
                  <label className={labelClass}>Date of surgery</label>
                  <input type="date" className={inputClass} value={form.surgery_date}
                    onChange={e => set('surgery_date', e.target.value)} />
                </div>
              </div>
            )}
            <div>
              <label className={labelClass}>Have any lymph nodes been removed?</label>
              <div className="flex gap-4 mt-1">
                {['Yes', 'No'].map(o => (
                  <label key={o} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="lymph_nodes_removed" value={o} checked={form.lymph_nodes_removed === o}
                      onChange={() => set('lymph_nodes_removed', o)} className="accent-sage w-4 h-4" />
                    <span className="text-sm text-charcoal group-hover:text-sage transition-colors">{o}</span>
                  </label>
                ))}
              </div>
            </div>
            {form.lymph_nodes_removed === 'Yes' && (
              <div>
                <label className={labelClass}>Where were they removed?</label>
                <input type="text" className={inputClass} value={form.lymph_node_location}
                  onChange={e => set('lymph_node_location', e.target.value)} placeholder="e.g. Left axilla (armpit)" />
              </div>
            )}
            <div>
              <label className={labelClass}>Do you have lymphedema?</label>
              <div className="flex gap-4 mt-1">
                {['Yes', 'No'].map(o => (
                  <label key={o} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="has_lymphedema" value={o} checked={form.has_lymphedema === o}
                      onChange={() => set('has_lymphedema', o)} className="accent-sage w-4 h-4" />
                    <span className="text-sm text-charcoal group-hover:text-sage transition-colors">{o}</span>
                  </label>
                ))}
              </div>
            </div>
            {form.has_lymphedema === 'Yes' && (
              <div>
                <label className={labelClass}>Where?</label>
                <input type="text" className={inputClass} value={form.lymphedema_location}
                  onChange={e => set('lymphedema_location', e.target.value)} placeholder="e.g. Left arm" />
              </div>
            )}
          </div>
        </section>

        {/* Radiation */}
        <section>
          <SectionDivider label="Radiation" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-6">
            <div>
              <label className={labelClass}>Areas that have received radiation</label>
              <input type="text" className={inputClass} value={form.radiation_areas}
                onChange={e => set('radiation_areas', e.target.value)}
                placeholder="e.g. Chest, neck — or 'none'" />
            </div>
            <div>
              <label className={labelClass}>Any skin changes or reactions in radiated areas?</label>
              <textarea rows={2} className={textareaClass} value={form.radiation_skin_changes}
                onChange={e => set('radiation_skin_changes', e.target.value)}
                placeholder="e.g. Redness, sensitivity, scarring…" />
            </div>
          </div>
        </section>

        {/* Bone health */}
        <section>
          <SectionDivider label="Bone health" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-6">
            <div>
              <label className={labelClass}>Do you have bone metastases?</label>
              <div className="flex gap-4 mt-1">
                {['Yes', 'No', 'Unknown'].map(o => (
                  <label key={o} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="bone_mets" value={o} checked={form.bone_mets === o}
                      onChange={() => set('bone_mets', o)} className="accent-sage w-4 h-4" />
                    <span className="text-sm text-charcoal group-hover:text-sage transition-colors">{o}</span>
                  </label>
                ))}
              </div>
            </div>
            {form.bone_mets === 'Yes' && (
              <div>
                <label className={labelClass}>Location of bone metastases</label>
                <input type="text" className={inputClass} value={form.bone_mets_location}
                  onChange={e => set('bone_mets_location', e.target.value)} placeholder="e.g. Spine, ribs…" />
              </div>
            )}
            <div>
              <label className={labelClass}>Do you have osteoporosis or reduced bone density?</label>
              <div className="flex gap-4 mt-1">
                {['Yes', 'No', 'Unknown'].map(o => (
                  <label key={o} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="osteoporosis" value={o} checked={form.osteoporosis === o}
                      onChange={() => set('osteoporosis', o)} className="accent-sage w-4 h-4" />
                    <span className="text-sm text-charcoal group-hover:text-sage transition-colors">{o}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Symptoms */}
        <section>
          <SectionDivider label="Current symptoms" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Fatigue level today (1 = none, 10 = severe)</label>
                <input type="number" min="1" max="10" className={inputClass} value={form.fatigue_level}
                  onChange={e => set('fatigue_level', e.target.value)} placeholder="1–10" />
              </div>
              <div>
                <label className={labelClass}>Pain level today (1 = none, 10 = severe)</label>
                <input type="number" min="1" max="10" className={inputClass} value={form.pain_level}
                  onChange={e => set('pain_level', e.target.value)} placeholder="1–10" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Do you have peripheral neuropathy (numbness/tingling)?</label>
              <div className="flex gap-4 mt-1">
                {['Yes', 'No'].map(o => (
                  <label key={o} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="neuropathy" value={o} checked={form.neuropathy === o}
                      onChange={() => set('neuropathy', o)} className="accent-sage w-4 h-4" />
                    <span className="text-sm text-charcoal group-hover:text-sage transition-colors">{o}</span>
                  </label>
                ))}
              </div>
            </div>
            {form.neuropathy === 'Yes' && (
              <div>
                <label className={labelClass}>Where do you feel the neuropathy?</label>
                <input type="text" className={inputClass} value={form.neuropathy_location}
                  onChange={e => set('neuropathy_location', e.target.value)} placeholder="e.g. Hands, feet…" />
              </div>
            )}
            <div>
              <label className={labelClass}>Any other symptoms to be aware of</label>
              <textarea rows={2} className={textareaClass} value={form.other_symptoms}
                onChange={e => set('other_symptoms', e.target.value)}
                placeholder="e.g. Nausea, dizziness, shortness of breath, blood clot history…" />
            </div>
          </div>
        </section>

        {/* Medications */}
        <section>
          <SectionDivider label="Medications" />
          <div className="bg-warm-white rounded-3xl p-7">
            <label className={labelClass}>Current medications (including supplements)</label>
            <textarea rows={4} className={textareaClass} value={form.medications}
              onChange={e => set('medications', e.target.value)}
              placeholder="Please list all medications, including blood thinners, steroids, supplements…" />
          </div>
        </section>

        {/* Massage Preferences */}
        <section>
          <SectionDivider label="Massage preferences" />
          <div className="bg-warm-white rounded-3xl p-7 space-y-6">
            <div>
              <label className={labelClass}>Areas you would like Danielle to avoid</label>
              <textarea rows={2} className={textareaClass} value={form.areas_to_avoid}
                onChange={e => set('areas_to_avoid', e.target.value)}
                placeholder="Ports, surgical sites, radiation areas, anything tender…" />
            </div>
            <div>
              <label className={labelClass}>Areas that tend to feel helpful or therapeutic</label>
              <textarea rows={2} className={textareaClass} value={form.areas_helpful}
                onChange={e => set('areas_helpful', e.target.value)}
                placeholder="Where does your body most want care right now?" />
            </div>
            <div>
              <label className={labelClass}>Pressure preference</label>
              <div className="flex gap-4 mt-1 flex-wrap">
                {['Very light', 'Light', 'Medium', 'Unsure — let Danielle guide'].map(o => (
                  <label key={o} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="pressure_preference" value={o} checked={form.pressure_preference === o}
                      onChange={() => set('pressure_preference', o)} className="accent-sage w-4 h-4" />
                    <span className="text-sm text-charcoal group-hover:text-sage transition-colors">{o}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>Any positioning needs or restrictions</label>
              <textarea rows={2} className={textareaClass} value={form.positioning_needs}
                onChange={e => set('positioning_needs', e.target.value)}
                placeholder="e.g. Can't lie flat, need extra pillows, difficulty turning over…" />
            </div>
            <div>
              <label className={labelClass}>Allergies to oils, fragrance or latex</label>
              <input type="text" className={inputClass} value={form.allergies}
                onChange={e => set('allergies', e.target.value)}
                placeholder="e.g. Nut oils, fragrance, latex — or 'none known'" />
            </div>
          </div>
        </section>

        {/* Consent */}
        <section>
          <SectionDivider label="Consent" />
          <div className="bg-warm-white rounded-3xl p-7">
            <p className="text-muted text-sm leading-relaxed mb-6">
              All information you share is held in strict confidence and used only to ensure your massage
              is safe, comfortable, and supportive of your wellbeing. You may update or withdraw this
              information at any time by contacting Danielle directly.
            </p>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" required checked={form.consent_given}
                onChange={e => set('consent_given', e.target.checked)}
                className="accent-sage w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-charcoal leading-relaxed group-hover:text-sage transition-colors">
                I consent to Danielle Brierley / Harmonized Therapies collecting and storing this information
                for the purpose of providing oncology massage services, and confirm the details above are
                accurate to the best of my knowledge.
              </span>
            </label>
          </div>
        </section>

        {status === 'error' && (
          <p className="text-center text-sm text-red-500">
            Something went wrong — please try again or contact Danielle directly.
          </p>
        )}

        <div className="text-center pb-4">
          <button type="submit" disabled={status === 'sending'}
            className="inline-block bg-sage-dark text-cream text-[0.72rem] tracking-[0.15em] uppercase px-10 py-4 rounded-full hover:bg-sage transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {status === 'sending' ? 'Submitting…' : 'Submit my intake form'}
          </button>
          <p className="text-muted text-xs mt-4">Your responses go directly to Danielle and are kept private.</p>
        </div>

      </form>

      <div className="text-center pb-10">
        <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted/50">Harmonized Therapies · Yarra Valley</p>
      </div>
    </div>
  )
}
