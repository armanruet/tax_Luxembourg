'use client'

import { useState, useEffect } from 'react'
import { 
  compareTaxationMethods, 
  formatCurrency, 
  formatPercentage,
  type ComparisonResult 
} from '@/lib/taxCalculations'

interface TaxCalculatorProps {
  initialIncome1?: number
  initialIncome2?: number
  initialType?: 'joint' | 'individual' | null
}

export function TaxCalculator({ 
  initialIncome1 = 70000, 
  initialIncome2 = 20000,
  initialType = null 
}: TaxCalculatorProps) {
  const [income1, setIncome1] = useState(initialIncome1)
  const [income2, setIncome2] = useState(initialIncome2)
  const [selectedMethods, setSelectedMethods] = useState<{
    joint: boolean
    individual: boolean
  }>({
    joint: initialType === 'joint' || initialType === null,
    individual: initialType === 'individual' || initialType === null
  })
  const [result, setResult] = useState<ComparisonResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // Calculate whenever inputs change
  useEffect(() => {
    if (income1 >= 0 && income2 >= 0) {
      setIsCalculating(true)
      // Add small delay for better UX
      const timer = setTimeout(() => {
        const calculation = compareTaxationMethods(income1, income2)
        setResult(calculation)
        setIsCalculating(false)
      }, 300)
      
      return () => clearTimeout(timer)
    }
  }, [income1, income2])

  const handleIncomeChange = (field: 'income1' | 'income2', value: string) => {
    const numValue = parseInt(value) || 0
    if (field === 'income1') {
      setIncome1(Math.max(0, numValue))
    } else {
      setIncome2(Math.max(0, numValue))
    }
  }

  const handleMethodToggle = (method: 'joint' | 'individual') => {
    setSelectedMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }))
  }

  const showBothMethods = selectedMethods.joint && selectedMethods.individual
  const showJointOnly = selectedMethods.joint && !selectedMethods.individual
  const showIndividualOnly = selectedMethods.individual && !selectedMethods.joint

  return (
    <div className="space-y-6">
      {/* Input Section - HIDDEN FOR NOW */}
      {false && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Household Income</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Partner 1 Annual Income
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                <input
                  type="number"
                  value={income1}
                  onChange={(e) => handleIncomeChange('income1', e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="70000"
                  min="0"
                  max="500000"
                  step="1000"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Partner 2 Annual Income
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                <input
                  type="number"
                  value={income2}
                  onChange={(e) => handleIncomeChange('income2', e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="20000"
                  min="0"
                  max="500000"
                  step="1000"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Total Household Income:</strong> {formatCurrency(income1 + income2)}
            </p>
          </div>
        </div>
      )}

      {/* Method Selection */}
      <div className="space-y-4">
        {/* <h3 className="font-semibold text-gray-800">Taxation Method</h3> */}
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => handleMethodToggle('joint')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedMethods.joint 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethods.joint ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              }`}>
                {selectedMethods.joint && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-800">Joint Taxation</h4>
                <p className="text-sm text-gray-600">Combined household income</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleMethodToggle('individual')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedMethods.individual 
                ? 'border-green-500 bg-green-50 shadow-md' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethods.individual ? 'border-green-500 bg-green-500' : 'border-gray-300'
              }`}>
                {selectedMethods.individual && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-800">Individual Taxation</h4>
                <p className="text-sm text-gray-600">Separate individual incomes</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isCalculating && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Calculating...</span>
        </div>
      )}

      {/* Results Section */}
      {result && !isCalculating && (
        <div className="space-y-6">
          <h3 className="font-semibold text-gray-800">Tax Comparison Results</h3>
          
          {/* Method Information */}
          {showJointOnly && (
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">📋 Joint Taxation Information</h4>
              <div className="space-y-3 text-blue-800 text-sm">
                <p><strong>How it works:</strong> Both partners' incomes are combined and taxed as a single household unit.</p>
                <p><strong>Benefits:</strong> Often provides tax savings for couples with income disparities.</p>
                <p><strong>Considerations:</strong> May discourage secondary earners from working more hours.</p>
                <p><strong>Best for:</strong> Couples with significant income differences or where one partner works part-time.</p>
              </div>
            </div>
          )}

          {showIndividualOnly && (
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3">📋 Individual Taxation Information</h4>
              <div className="space-y-3 text-green-800 text-sm">
                <p><strong>How it works:</strong> Each partner is taxed separately on their individual income.</p>
                <p><strong>Benefits:</strong> Encourages both spouses to work, especially beneficial for women's labor market participation.</p>
                <p><strong>Economic Impact:</strong> Can generate significant economic benefits through increased labor participation.</p>
                <p><strong>Best for:</strong> Couples with similar incomes or where both partners want to maximize their earning potential.</p>
              </div>
            </div>
          )}

          {/* Comparison Information Box - When both methods are selected - HIDDEN FOR NOW */}
          {false && showBothMethods && result && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-4">🔄 Tax Method Comparison Analysis</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-purple-800 mb-3">Financial Comparison</h5>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>Tax Difference:</strong> {formatCurrency(Math.abs(result.difference))}</p>
                    <p><strong>Recommended Method:</strong> {result.recommendation === 'joint' ? 'Joint' : 'Individual'} taxation</p>
                    <p><strong>Annual Savings:</strong> {formatCurrency(result.savings)}</p>
                    <p><strong>Monthly Savings:</strong> {formatCurrency(result.savings / 12)}</p>
                    <p><strong>Effective Tax Rate:</strong> {result.recommendation === 'joint' ? formatPercentage(result.jointTaxation.effectiveRate) : formatPercentage(result.individualTaxation.effectiveRate)}</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-purple-800 mb-3">Key Considerations</h5>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p>• <strong>Labor Market:</strong> Individual taxation encourages work participation</p>
                    <p>• <strong>Gender Equality:</strong> Benefits women's economic participation</p>
                    <p>• <strong>Economic Growth:</strong> Potential for increased tax revenue</p>
                    <p>• <strong>Household Dynamics:</strong> May affect work-life balance decisions</p>
                    <p>• <strong>Income Distribution:</strong> {income1 > income2 ? 'Significant income disparity favors joint taxation' : 'Similar incomes may benefit from individual taxation'}</p>
                  </div>
                </div>
              </div>
              
              {/* Additional Insights */}
              <div className="mt-6 pt-4 border-t border-purple-200">
                <h5 className="font-medium text-purple-800 mb-2">💡 Policy Insights</h5>
                <div className="text-sm text-purple-700 space-y-1">
                  <p><strong>For Your Scenario:</strong> With a household income of {formatCurrency(income1 + income2)} and an income ratio of {(income1 / income2).toFixed(1)}:1, {result.recommendation === 'joint' ? 'joint taxation provides better immediate financial benefits.' : 'individual taxation offers better long-term economic incentives.'}</p>
                  <p><strong>Research Finding:</strong> Individual taxation could increase women's labor participation by 3.20% and overall working hours by 2.30%, potentially generating €9.8 million in additional tax revenue.</p>
                </div>
              </div>
            </div>
          )}

          {/* Impact Analysis - Only show when both methods are selected */}
          {showBothMethods && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-4">⚠️ Important Considerations</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-orange-800 mb-3">Short-term vs Long-term</h5>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p>• <strong>Immediate Savings:</strong> {result && result.recommendation === 'joint' ? 'Joint taxation provides immediate tax savings' : 'Individual taxation may result in higher initial tax burden'}</p>
                    <p>• <strong>Labor Incentives:</strong> Individual taxation removes disincentives for secondary earners</p>
                    <p>• <strong>Economic Growth:</strong> Long-term benefits from increased labor participation</p>
                    <p>• <strong>Gender Equity:</strong> Individual taxation promotes equal work incentives</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-orange-800 mb-3">Policy Implications</h5>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p>• <strong>Administrative Complexity:</strong> Transition requires significant system changes</p>
                    <p>• <strong>Social Security:</strong> Coordination needed across different benefit systems</p>
                    <p>• <strong>Political Feasibility:</strong> Requires consensus building and stakeholder consultation</p>
                    <p>• <strong>EU Coordination:</strong> Harmonization needed across member states</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Summary - HIDDEN FOR NOW */}
          {false && showBothMethods && (
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">💰 Summary</h4>
              <div className="space-y-2 text-blue-800">
                <p>
                  <strong>{result && result.recommendation === 'joint' ? 'Joint' : 'Individual'} taxation</strong> is 
                  better for this scenario, saving you <strong>{result && formatCurrency(result.savings)}</strong> annually.
                </p>
                {result && result.savings > 0 && (
                  <p className="text-sm">
                    That's approximately <strong>{formatCurrency(result.savings / 12)}</strong> per month in savings!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
