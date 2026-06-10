import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://pnbpgusjfklliymymwme.supabase.co',
  'sb_publishable_JDR8cwp6rflrRiDoXsFgBg_EYzwPmcB'
)

export type Client = {
  id: string
  name: string
  phone: string | null
  email: string | null
  service: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export type NewsletterSignup = {
  id: string
  email: string
  name: string | null
  source: string
  created_at: string
}
