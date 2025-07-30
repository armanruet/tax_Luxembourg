'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { TaxCalculator } from '@/components/TaxCalculator'
import { BehavioralResponseChart } from '@/components/BehavioralResponseChart'
import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Loading component for Suspense fallback
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
}

// Component that uses useSearchParams - must be wrapped in Suspense
function TaxSimulatorContent() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  
  // Get initial values from URL parameters
  const initialIncome1 = searchParams.get('income1') ? parseInt(searchParams.get('income1')!) : 70000
  const initialIncome2 = searchParams.get('income2') ? parseInt(searchParams.get('income2')!) : 20000
  const initialType = searchParams.get('type') as 'joint' | 'individual' | null

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Luxembourg Tax Policy Analysis
              </h1>
              <p className="text-gray-600 mt-1">
                Interactive Calculator & Behavioral Effects of Joint vs Individual Taxation
              </p>
            </div>
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Introduction Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              🎯 Research Overview
            </h2>
            <div className="text-sm text-gray-700 space-y-3">
              <p>
                <strong>Study Objective:</strong> This analysis examines the behavioral and fiscal effects of switching from joint to individual taxation in Luxembourg. 
                Conducted by Nizamul Islam at the Luxembourg Institute of Socio-Economic Research (LISER), the research uses EUROMOD and Lux TaxBen microsimulation models 
                to inform fairer and more effective tax policies.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">Joint Taxation</h3>
                  <p>The household is treated as a single tax unit. While it can reduce tax burden for single-earner families, it may create disincentives for second earners, often women.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Individual Taxation</h3>
                  <p>Each person is taxed separately on their own income. This approach supports equal work incentives but may lead to higher tax burden for some families.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tax Calculator */}
          <div className="space-y-6">
            <section className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-gray-800">
                🧮 Taxation Method
              </h2>
              <TaxCalculator 
                initialIncome1={initialIncome1}
                initialIncome2={initialIncome2}
                initialType={initialType}
              />
            </section>
          </div>

          {/* Behavioral Response Analysis */}
          <div className="space-y-6">
            <section className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-gray-800">
                📊 Behavioral Response Analysis
              </h2>
              <BehavioralResponseChart />
            </section>
          </div>
        </div>

        {/* Key Insights Section */}
        <section className="mt-12">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              💡 Key Research Findings
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">👩‍💼</div>
                <h3 className="font-semibold text-blue-800 mb-2">Women's Labor Supply</h3>
                <p className="text-sm text-blue-700">
                  Individual taxation would increase women's labor hours by 2.30% and participation by 3.20%, significantly boosting female economic participation.
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-semibold text-green-800 mb-2">Fiscal Benefits</h3>
                <p className="text-sm text-green-700">
                  The transition to individual taxation is projected to generate a net fiscal gain of €9.8 million for the government.
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl mb-2">⚖️</div>
                <h3 className="font-semibold text-purple-800 mb-2">Gender Equity</h3>
                <p className="text-sm text-purple-700">
                  Individual taxation promotes gender equity by removing disincentives for secondary earners and creating fairer work incentives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Learn More?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              This analysis combines interactive tax calculation with comprehensive research findings. Explore how different income scenarios affect your tax burden 
              while understanding the broader behavioral and economic impacts of tax policy choices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Return to Main Demo
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                Try Different Scenario
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Main component with Suspense wrapper
export default function TaxSimulator() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TaxSimulatorContent />
    </Suspense>
  )
}