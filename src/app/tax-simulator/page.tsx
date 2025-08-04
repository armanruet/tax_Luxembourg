'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { TaxCalculator } from '@/components/TaxCalculator'
import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Utility function to get correct image path for GitHub Pages
function getImagePath(imageName: string): string {
  // Check if we're on GitHub Pages (repository name in path)
  if (typeof window !== 'undefined' && window.location.pathname.includes('/tax_Luxembourg')) {
    return `/tax_Luxembourg${imageName}`
  }
  return imageName
}

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
  const [selectedTab, setSelectedTab] = useState<'joint' | 'individual' | 'impact'>('joint')
  
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
      {/* Back to Home Button */}
      <div className="absolute top-4 right-4 z-10">
        <Link 
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          ← Back to Home
        </Link>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        {/* Introduction Section */}
        <section className="mb-8">
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <img 
                src={getImagePath("/tax_policy_choices.png")} 
                alt="Taxing Choices: Joint vs Individual Taxation" 
                className="w-full max-w-4xl h-auto rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Interactive Information Section */}
        <section className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
              📊 Understanding Taxation Methods
            </h2>
            
            {/* Tab Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setSelectedTab('joint')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedTab === 'joint'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                }`}
              >
                Joint Taxation
              </button>
              <button
                onClick={() => setSelectedTab('individual')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedTab === 'individual'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                Individual Taxation
              </button>
              <button
                onClick={() => setSelectedTab('impact')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedTab === 'impact'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Impact
              </button>
            </div>

            {/* Content Area */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Text Content */}
              <div className="space-y-4">
                {selectedTab === 'joint' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-orange-800">Joint Taxation</h3>
                    <div className="space-y-3 text-gray-700">
                      <div>
                        <strong>How it works:</strong> Both partners' incomes are combined and taxed as a single household unit.
                      </div>
                      <div>
                        <strong>Benefits:</strong> Often provides tax savings for couples with income disparities.
                      </div>
                      <div>
                        <strong>Considerations:</strong> May discourage secondary earners from working more hours.
                      </div>
                      <div>
                        <strong>Best for:</strong> Couples with significant income differences or where one partner works part-time.
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'individual' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-800">Individual Taxation</h3>
                    <div className="space-y-3 text-gray-700">
                      <div>
                        <strong>How it works:</strong> Each partner is taxed separately on their individual income.
                      </div>
                      <div>
                        <strong>Benefits:</strong> Encourages both spouses to work, especially beneficial for women's labor market participation.
                      </div>
                      <div>
                        <strong>Economic Impact:</strong> Can generate significant economic benefits through increased labor participation.
                      </div>
                      <div>
                        <strong>Best for:</strong> Couples with similar incomes or where both partners want to maximize their earning potential.
                      </div>
                    </div>
                  </div>
                )}

                                {selectedTab === 'impact' && (
                  <div className="space-y-32">
                    {/* First Box - Labour Supply Impact */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4">Labour Supply Impact</h3>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-center">
                          <span className="font-bold text-pink-600 mr-2">Women:</span>
                          <span>Labor ↑ 2.3%, Participation ↑ 3.2%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold text-blue-600 mr-2">Men:</span>
                          <span>Minor impact</span>
                        </div>
                      </div>
                    </div>
                  
                    {/* Second Box - Economic & Fiscal Impact */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4">Economic & Fiscal Impact</h3>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-center">
                          <span className="font-bold text-purple-600 mr-2">Economic Impact:</span>
                          <span>Disposable income increases by around €32M euros</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold text-orange-600 mr-2">Tax Revenue:</span>
                          <span>Tax revenue increases by around €0.25M euros</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold text-indigo-600 mr-2">Fiscal Surplus:</span>
                          <span>After VAT receipts reduction, results in a fiscal surplus of €10M euros</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold text-green-600 mr-2">Revenue:</span>
                          <span>+€9.8 million for government</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Image Content */}
              <div className="space-y-4 flex flex-col items-center">
                {selectedTab === 'joint' && (
                  <>
                    <div className="bg-gray-50 p-1 rounded-lg">
                      <img 
                        src={getImagePath("/Joint_taxation.png")} 
                        alt="Tax unit choice illustration" 
                        className="w-full max-w-md h-auto rounded-lg shadow-md"
                      />
                    </div>
                    {/* <div className="bg-gray-50 p-1 rounded-lg">
                      <img 
                        src="/tax_policy_choices.jpg" 
                        alt="Couple making tax decisions" 
                        className="w-full max-w-md h-auto rounded-lg shadow-md"
                      />
                    </div> */}
                  </>
                )}

                {selectedTab === 'individual' && (
                  <>
                    {/* <div className="bg-gray-50 p-1 rounded-lg">
                      <img 
                        src="/Individual_no_ad.png" 
                        alt="Individual taxation results" 
                        className="w-full max-w-md h-auto rounded-lg shadow-md"
                      />
                    </div> */}
                    <div className="bg-gray-50 p-1 rounded-lg">
                      <img 
                        src={getImagePath("/Individual_taxation.png")} 
                        alt="Woman with calculator and tax form" 
                        className="w-full max-w-md h-auto rounded-lg shadow-md"
                      />
                    </div>
                  </>
                )}

                {selectedTab === 'impact' && (
                  <>
                    <div className="bg-gray-50 p-1 rounded-lg">
                      <img 
                        src={getImagePath("/result_1.png")} 
                        alt="Impact analysis results" 
                        className="w-full max-w-md h-auto rounded-lg shadow-md"
                      />
                    </div>
                    <div className="bg-gray-50 p-1 rounded-lg">
                      <img 
                        src={getImagePath("/Impact.png")} 
                        alt="Roads diverging - choice metaphor" 
                        className="w-full max-w-md h-auto rounded-lg shadow-md"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Single Column Layout */}
        {/* <div className="max-w-4xl mx-auto">
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
        </div> */}

        {/* Key Insights Section */}
        {/* <section className="mt-12">
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
        </section> */}
{/* 
        Call to Action
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
        </section> */}

        {/* Concluding Remarks */}
        <section className="mb-8">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              📋 Concluding Remarks
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                  <span className="mr-3 mt-1 text-blue-600 font-bold">•</span>
                  <span><strong>Labor Force Participation:</strong> Individual taxation increases labor force participation, especially among women.</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 mt-1 text-green-600 font-bold">•</span>
                  <span><strong>Distributional Effects:</strong> Distributional effects depend on household composition and income level.</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 mt-1 text-purple-600 font-bold">•</span>
                  <span><strong>Fiscal Neutrality:</strong> Fiscal neutrality is possible with minimal tax parameter adjustments.</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 mt-1 text-orange-600 font-bold">•</span>
                  <span><strong>Microsimulation Value:</strong> Microsimulation proves essential for ex-ante evaluation of tax reforms.</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 mt-1 text-indigo-600 font-bold">•</span>
                  <span><strong>Policy Lever:</strong> Tax unit choice is a powerful lever in modernizing fiscal policy.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 gradient-bg">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Method Section */}
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-20">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center mr-3">
                      <span className="text-sm">🔬</span>
                    </div>
                    <h3 className="text-base font-bold text-white">Methodology</h3>
                  </div>
                  <p className="text-gray-200 text-xs leading-tight">
                    We combined a labour supply model with the LuxTaxBen tax-benefit simulator to analyze the impacts of the proposed tax change.
                  </p>
                </div>

                {/* Data Section */}
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-20">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center mr-3">
                      <span className="text-sm">📊</span>
                    </div>
                    <h3 className="text-base font-bold text-white">Data Source</h3>
                  </div>
                  <p className="text-gray-200 text-xs leading-tight">
                    The study relies on the 2010 EU-SILC dataset, focusing on couple households residing in Luxembourg.
                  </p>
                </div>
              </div>

              {/* Research Credit
              <div className="mt-3 text-center">
                <div className="inline-flex items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-3 py-1 border border-white border-opacity-20">
                  <span className="text-xs text-gray-300">
                    Research by <span className="font-semibold text-white">Nizamul Islam</span> at 
                    <span className="font-semibold text-white"> LISER</span>
                  </span>
                </div>
              </div> */}

              {/* Reference Citation */}
              <div className="mt-4 text-center">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-20 max-w-4xl mx-auto">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    <span className="font-semibold text-white">Reference:</span> Islam, N. (2024). Micro-simulation analysis of joint to individual taxation in Luxembourg. 
                    <em className="text-gray-200">Cahiers de fiscalité luxembourgeoise et européenne</em>, 2023(2). 
                    <a href="https://www.larcier-intersentia.com/fr/cahiers-fiscalite-luxembourgeoise-europeenne.html" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-blue-300 hover:text-blue-200 underline">
                      https://www.larcier-intersentia.com/fr/cahiers-fiscalite-luxembourgeoise-europeenne.html
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
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