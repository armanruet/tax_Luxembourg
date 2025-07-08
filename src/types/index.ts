// Types for the Luxembourg Tax Simulator

export interface TaxScenario {
  income1: number
  income2: number
  taxClass: 'joint' | 'individual'
}

export interface TaxResult {
  grossIncome: number
  taxableIncome: number
  incomeTax: number
  solidarityTax: number
  totalTax: number
  netIncome: number
  effectiveRate: number
}

export interface ComparisonResult {
  jointTaxation: TaxResult
  individualTaxation: TaxResult
  difference: number
  recommendation: 'joint' | 'individual'
  savings: number
}

export interface BehavioralResponse {
  womenParticipationIncrease: number
  workingHoursIncrease: number
  menChangeMinimal: boolean
  taxRevenueGain: number
}

export interface PollOption {
  id: string
  text: string
  votes: number
}

export interface PollData {
  question: string
  options: PollOption[]
  totalVotes: number
  lastUpdated: Date
}
