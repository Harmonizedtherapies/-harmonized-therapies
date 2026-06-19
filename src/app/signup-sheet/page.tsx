import type { Metadata } from 'next'
import SignupSheet from './SignupSheet'

export const metadata: Metadata = {
  title: 'Massage Sign-Up Sheet — Harmonized Therapies',
}

export default function SignupSheetPage() {
  return <SignupSheet />
}
