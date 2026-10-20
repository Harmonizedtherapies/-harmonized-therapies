import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const getResend = () => new Resend(process.env.RESEND_API_KEY ?? 're_placeholder')
const DANIELLE_EMAIL = 'danielle@harmonizedtherapies.com.au'
const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS ?? 'Harmonized Therapies <hello@harmonizedtherapies.com.au>'

function row(label: string, value: string | undefined) {
  if (!value) return ''
  return `<tr><td style="padding:5px 16px 5px 0;color:#888;font-size:13px;vertical-align:top;white-space:nowrap;">${label}</td><td style="padding:5px 0;font-size:14px;">${value}</td></tr>`
}

function notificationEmail(data: Record<string, unknown>) {
  const treatments = Array.isArray(data.current_treatments) ? (data.current_treatments as string[]).join(', ') : ''
  return `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;color:#333;padding:32px;max-width:600px;">
  <h2 style="font-weight:400;color:#2D5A3D;margin-bottom:4px;">New Oncology Intake Form</h2>
  <p style="color:#888;font-size:13px;margin-top:0 0 24px;">Submitted via harmonizedtherapies.com.au</p>

  <h3 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#c8a96e;font-weight:400;margin:24px 0 8px;">About</h3>
  <table style="border-collapse:collapse;">
    ${row('Name', data.name as string)}
    ${row('DOB', data.dob as string)}
    ${row('Phone', data.phone as string)}
    ${row('Email', data.email as string)}
    ${row('Emergency contact', data.emergency_name as string)}
    ${row('Emergency phone', data.emergency_phone as string)}
  </table>

  <h3 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#c8a96e;font-weight:400;margin:24px 0 8px;">Medical Team</h3>
  <table style="border-collapse:collapse;">
    ${row('Oncologist', data.oncologist_name as string)}
    ${row('Oncologist contact', data.oncologist_phone as string)}
    ${row('GP', data.gp_name as string)}
    ${row('GP contact', data.gp_phone as string)}
  </table>

  <h3 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#c8a96e;font-weight:400;margin:24px 0 8px;">Diagnosis</h3>
  <table style="border-collapse:collapse;">
    ${row('Cancer type', data.cancer_type as string)}
    ${row('Stage', data.cancer_stage as string)}
    ${row('Diagnosed', data.diagnosis_date as string)}
  </table>

  <h3 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#c8a96e;font-weight:400;margin:24px 0 8px;">Treatment</h3>
  <table style="border-collapse:collapse;">
    ${row('Treatments', treatments)}
    ${row('Other treatment', data.treatment_other as string)}
    ${row('Last treatment', data.last_treatment_date as string)}
    ${row('Next treatment', data.next_treatment_date as string)}
  </table>

  <h3 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#c8a96e;font-weight:400;margin:24px 0 8px;">Ports & Devices</h3>
  <table style="border-collapse:collapse;">
    ${row('Port-a-cath', data.has_port as string)}
    ${row('Port location', data.port_location as string)}
    ${row('PICC line', data.has_picc as string)}
    ${row('PICC arm', data.picc_arm as string)}
    ${row('Other devices', data.other_devices as string)}
  </table>

  <h3 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#c8a96e;font-weight:400;margin:24px 0 8px;">Surgery & Lymph Nodes</h3>
  <table style="border-collapse:collapse;">
    ${row('Surgery', data.recent_surgery as string)}
    ${row('Surgery details', data.surgery_details as string)}
    ${row('Surgery date', data.surgery_date as string)}
    ${row('Lymph nodes removed', data.lymph_nodes_removed as string)}
    ${row('Lymph node location', data.lymph_node_location as string)}
    ${row('Lymphedema', data.has_lymphedema as string)}
    ${row('Lymphedema location', data.lymphedema_location as string)}
  </table>

  <h3 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#c8a96e;font-weight:400;margin:24px 0 8px;">Radiation & Bone</h3>
  <table style="border-collapse:collapse;">
    ${row('Radiation areas', data.radiation_areas as string)}
    ${row('Skin changes', data.radiation_skin_changes as string)}
    ${row('Bone mets', data.bone_mets as string)}
    ${row('Bone mets location', data.bone_mets_location as string)}
    ${row('Osteoporosis', data.osteoporosis as string)}
  </table>

  <h3 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#c8a96e;font-weight:400;margin:24px 0 8px;">Symptoms & Medications</h3>
  <table style="border-collapse:collapse;">
    ${row('Fatigue (1-10)', data.fatigue_level as string)}
    ${row('Pain (1-10)', data.pain_level as string)}
    ${row('Neuropathy', data.neuropathy as string)}
    ${row('Neuropathy location', data.neuropathy_location as string)}
    ${row('Other symptoms', data.other_symptoms as string)}
    ${row('Medications', data.medications as string)}
  </table>

  <h3 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#c8a96e;font-weight:400;margin:24px 0 8px;">Massage Preferences</h3>
  <table style="border-collapse:collapse;">
    ${row('Areas to avoid', data.areas_to_avoid as string)}
    ${row('Helpful areas', data.areas_helpful as string)}
    ${row('Pressure', data.pressure_preference as string)}
    ${row('Positioning', data.positioning_needs as string)}
    ${row('Allergies', data.allergies as string)}
  </table>

  <p style="margin-top:32px;font-size:13px;color:#aaa;">Submitted ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })} (Melbourne time)</p>
</body></html>`
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const { name, email, phone, consent_given, consent_date, ...rest } = data

  const { error } = await supabase.from('oncology_intakes').insert([{
    name,
    email: email || null,
    phone: phone || null,
    data: rest,
    consent_given: !!consent_given,
    consent_date: consent_date ?? new Date().toISOString(),
  }])

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  try {
    const resend = getResend()
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: DANIELLE_EMAIL,
      subject: `New oncology intake: ${name}`,
      html: notificationEmail(data),
    })
  } catch (err) {
    console.error('Email error:', err)
  }

  return NextResponse.json({ ok: true })
}
