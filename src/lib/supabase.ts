import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://pnbpgusjfklliymymwme.supabase.co',
  'sb_publishable_JDR8cwp6rflrRiDoXsFgBg_EYzwPmcB'
)

export type IntakeData = {
  what_brought_you?: string
  how_long_carrying?: string
  what_would_healing_feel_like?: string
  where_in_body?: string
  needs_care?: string
  dob?: string
  emergency_contact?: string
  occupation?: string
  medical_conditions?: string
  medications?: string
  recent_injuries?: string
  skin_conditions?: string
  pregnant?: 'yes' | 'no' | 'unsure'
  areas_to_avoid?: string
  consent_given?: boolean
  consent_date?: string
}

export type ArrivalData = {
  word?: string
  body_feeling?: number
  heart_feeling?: number
  anything_to_know?: string
}

export type ReflectionData = {
  feeling_now?: string
  what_noticed?: string
  taking_home?: string
  want_to_remember?: string
}

export type Session = {
  id: string
  client_id: string
  session_date: string
  arrival: ArrivalData | null
  arrival_token: string
  arrival_submitted_at: string | null
  reflection: ReflectionData | null
  reflection_token: string
  reflection_submitted_at: string | null
  danielle_notes: string | null
  created_at: string
}

export type Client = {
  id: string
  name: string
  phone: string | null
  email: string | null
  service: string | null
  notes: string | null
  intake: IntakeData | null
  intake_token: string
  intake_submitted_at: string | null
  massage_consent: MassageConsentData | null
  massage_consent_token: string
  massage_consent_submitted_at: string | null
  created_at: string
  updated_at: string
}

export type MassageConsentData = {
  full_name?: string
  dob?: string
  phone?: string
  health_conditions_list?: string[]
  health_conditions?: string
  medications?: string
  recent_surgery_injury?: string
  accidents_injuries?: string
  skin_conditions?: string
  pregnant?: 'yes' | 'no' | 'unsure'
  current_complaint?: string
  complaint_began?: string
  complaint_cause?: string
  complaint_relieves?: string
  complaint_aggravates?: string
  pain_level?: 'low' | 'medium' | 'high'
  sleep_quality?: 'poor' | 'average' | 'good'
  mood?: 'poor' | 'average' | 'good'
  energy?: 'poor' | 'average' | 'good'
  areas_to_avoid?: string
  pressure_preference?: 'light' | 'medium' | 'firm'
  consent_given?: boolean
  consent_date?: string
}

export type ClientFile = {
  id: string
  client_id: string
  name: string
  path: string
  size: number | null
  created_at: string
}

export type ClientRecording = {
  id: string
  client_id: string
  title: string
  file_path: string
  token: string
  message: string | null
  emailed_at: string | null
  created_at: string
}

export type NewsletterSignup = {
  id: string
  email: string
  name: string | null
  source: string
  created_at: string
}

export type Invoice = {
  id: string
  invoice_number: number
  client_name: string
  client_email: string | null
  description: string | null
  amount: number
  invoice_date: string
  due_date: string | null
  paid: boolean
  paid_date: string | null
  notes: string | null
  created_at: string
}
