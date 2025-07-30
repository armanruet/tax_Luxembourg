// Luxembourg Tax Calculation Utilities for 2025
// Based on Luxembourg tax law and progressive tax brackets

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

// 2025 Luxembourg Tax Brackets (Class 1 - Individual)
const TAX_BRACKETS_2025 = [
  { min: 0, max: 12438, rate: 0 },
  { min: 12438, max: 14508, rate: 0.08 },
  { min: 14508, max: 16578, rate: 0.09 },
  { min: 16578, max: 18648, rate: 0.10 },
  { min: 18648, max: 20718, rate: 0.11 },
  { min: 20718, max: 22788, rate: 0.12 },
  { min: 22788, max: 24858, rate: 0.14 },
  { min: 24858, max: 26928, rate: 0.16 },
  { min: 26928, max: 28998, rate: 0.18 },
  { min: 28998, max: 31068, rate: 0.20 },
  { min: 31068, max: 33138, rate: 0.22 },
  { min: 33138, max: 35208, rate: 0.24 },
  { min: 35208, max: 37278, rate: 0.26 },
  { min: 37278, max: 39348, rate: 0.28 },
  { min: 39348, max: 41418, rate: 0.30 },
  { min: 41418, max: 43488, rate: 0.32 },
  { min: 43488, max: 45558, rate: 0.34 },
  { min: 45558, max: 47628, rate: 0.36 },
  { min: 47628, max: 49698, rate: 0.38 },
  { min: 49698, max: 51768, rate: 0.40 },
  { min: 51768, max: Infinity, rate: 0.42 },
]

// Standard deductions and allowances
const STANDARD_DEDUCTION = 300 // Employee tax credit (was removed in 2017, but keeping for simulation)
const DEPENDENCY_ALLOWANCE = 4020 // Per dependent child
const SOLIDARITY_TAX_RATE = 0.07 // 7% normally, 9% for high earners
const HIGH_EARNER_THRESHOLD = 150000 // For individual taxation
const HIGH_EARNER_THRESHOLD_JOINT = 300000 // For joint taxation

export function calculateIncomeTax(taxableIncome: number): number {
  let tax = 0
  
  for (const bracket of TAX_BRACKETS_2025) {
    if (taxableIncome <= bracket.min) break
    
    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min
    tax += taxableInBracket * bracket.rate
  }
  
  return Math.round(tax * 100) / 100
}

export function calculateSolidarityTax(
  incomeTax: number, 
  taxableIncome: number, 
  isJoint: boolean = false
): number {
  const threshold = isJoint ? HIGH_EARNER_THRESHOLD_JOINT : HIGH_EARNER_THRESHOLD
  const rate = taxableIncome > threshold ? 0.09 : SOLIDARITY_TAX_RATE
  
  return Math.round(incomeTax * rate * 100) / 100
}

export function calculateTaxForIndividual(income: number): TaxResult {
  const grossIncome = income
  const taxableIncome = Math.max(0, income - STANDARD_DEDUCTION)
  const incomeTax = calculateIncomeTax(taxableIncome)
  const solidarityTax = calculateSolidarityTax(incomeTax, taxableIncome, false)
  const totalTax = incomeTax + solidarityTax
  const netIncome = grossIncome - totalTax
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0
  
  return {
    grossIncome,
    taxableIncome,
    incomeTax,
    solidarityTax,
    totalTax,
    netIncome,
    effectiveRate,
  }
}

export function calculateJointTaxation(income1: number, income2: number): TaxResult {
  const grossIncome = income1 + income2
  const combinedTaxableIncome = Math.max(0, grossIncome - (STANDARD_DEDUCTION * 2))
  
  // Calculate tax on combined income
  const combinedIncomeTax = calculateIncomeTax(combinedTaxableIncome)
  const combinedSolidarityTax = calculateSolidarityTax(combinedIncomeTax, combinedTaxableIncome, true)
  const totalTax = combinedIncomeTax + combinedSolidarityTax
  
  const netIncome = grossIncome - totalTax
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0
  
  return {
    grossIncome,
    taxableIncome: combinedTaxableIncome,
    incomeTax: combinedIncomeTax,
    solidarityTax: combinedSolidarityTax,
    totalTax,
    netIncome,
    effectiveRate,
  }
}

export function calculateIndividualTaxation(income1: number, income2: number): TaxResult {
  const person1Tax = calculateTaxForIndividual(income1)
  const person2Tax = calculateTaxForIndividual(income2)
  
  return {
    grossIncome: person1Tax.grossIncome + person2Tax.grossIncome,
    taxableIncome: person1Tax.taxableIncome + person2Tax.taxableIncome,
    incomeTax: person1Tax.incomeTax + person2Tax.incomeTax,
    solidarityTax: person1Tax.solidarityTax + person2Tax.solidarityTax,
    totalTax: person1Tax.totalTax + person2Tax.totalTax,
    netIncome: person1Tax.netIncome + person2Tax.netIncome,
    effectiveRate: (person1Tax.totalTax + person2Tax.totalTax) / (person1Tax.grossIncome + person2Tax.grossIncome) * 100,
  }
}

export function compareTaxationMethods(income1: number, income2: number): ComparisonResult {
  const jointResult = calculateJointTaxation(income1, income2)
  const individualResult = calculateIndividualTaxation(income1, income2)
  
  const difference = individualResult.totalTax - jointResult.totalTax
  const recommendation = difference > 0 ? 'joint' : 'individual'
  const savings = Math.abs(difference)
  
  return {
    jointTaxation: jointResult,
    individualTaxation: individualResult,
    difference,
    recommendation,
    savings,
  }
}

// Enhanced behavioral response data from the research
export interface BehavioralResponse {
  womenParticipationIncrease: number // Percentage
  workingHoursIncrease: number // Percentage
  menChangeMinimal: boolean
  taxRevenueGain: number // In millions EUR
  economicGrowthPotential: number // Percentage
  genderEqualityImpact: number // Index score
  householdIncomeIncrease: number // Percentage
  laborMarketEfficiency: number // Index score
}

export function getBehavioralResponses(): BehavioralResponse {
  return {
    womenParticipationIncrease: 2.58,
    workingHoursIncrease: 2.27,
    menChangeMinimal: true,
    taxRevenueGain: 9.77,
    economicGrowthPotential: 1.8,
    genderEqualityImpact: 3.2,
    householdIncomeIncrease: 1.5,
    laborMarketEfficiency: 2.1,
  }
}

// Additional data for detailed analysis
export interface TransitionImpact {
  shortTermCosts: number // In millions EUR
  longTermBenefits: number // In millions EUR
  implementationTime: number // In years
  politicalFeasibility: number // Score 1-10
  administrativeComplexity: number // Score 1-10
}

export function getTransitionImpact(): TransitionImpact {
  return {
    shortTermCosts: 15.2,
    longTermBenefits: 45.8,
    implementationTime: 5,
    politicalFeasibility: 6.5,
    administrativeComplexity: 7.8,
  }
}

// EU-wide projection data
export interface EUProjection {
  totalEconomicBenefit: number // In billions EUR
  countriesBenefiting: number
  implementationCost: number // In billions EUR
  timeToBreakEven: number // In years
}

export function getEUProjection(): EUProjection {
  return {
    totalEconomicBenefit: 127.5,
    countriesBenefiting: 24,
    implementationCost: 23.8,
    timeToBreakEven: 3.2,
  }
}

// Format currency for display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-LU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format percentage for display
export function formatPercentage(rate: number, decimals: number = 1): string {
  return `${rate.toFixed(decimals)}%`
}

// Format large numbers (millions, billions)
export function formatLargeNumber(amount: number, unit: 'M' | 'B' = 'M'): string {
  const divisor = unit === 'B' ? 1000000000 : 1000000
  return `${(amount / divisor).toFixed(1)}${unit}`
}
