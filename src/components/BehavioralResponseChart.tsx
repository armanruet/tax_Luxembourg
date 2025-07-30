'use client'

import { useState } from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  Area
} from 'recharts'

export function BehavioralResponseChart() {
  const [selectedGraph, setSelectedGraph] = useState<string | null>(null)
  
  // Data for Graph 1: Labor Supply Effect (from the PDF)
  const laborSupplyData = [
    {
      category: 'Labor Hours',
      men: 0.14,
      women: 2.30,
      color: '#3B82F6'
    },
    {
      category: 'Participation',
      men: 0.05,
      women: 3.20,
      color: '#10B981'
    }
  ]

  // Data for Graph 2: Secondary Earner Budget Constraint
  const secondaryEarnerData = [
    { hours: 0, gross: 1040, joint: 1040, individual: 1040 },
    { hours: 5, gross: 1145, joint: 1080, individual: 1120 },
    { hours: 10, gross: 1250, joint: 1120, individual: 1200 },
    { hours: 15, gross: 1355, joint: 1160, individual: 1280 },
    { hours: 20, gross: 1460, joint: 1200, individual: 1360 },
    { hours: 25, gross: 1565, joint: 1240, individual: 1440 },
    { hours: 30, gross: 1670, joint: 1280, individual: 1520 },
    { hours: 35, gross: 1775, joint: 1320, individual: 1600 },
    { hours: 40, gross: 1880, joint: 1360, individual: 1680 },
    { hours: 45, gross: 1985, joint: 1400, individual: 1760 },
    { hours: 50, gross: 2090, joint: 1440, individual: 1840 }
  ]

  // Data for Graph 3: Household Budget Constraint
  const householdBudgetData = [
    { hours: 0, gross: 4400, joint: 3900, individual: 3300 },
    { hours: 5, gross: 5045, joint: 4340, individual: 3720 },
    { hours: 10, gross: 5690, joint: 4780, individual: 4140 },
    { hours: 15, gross: 6335, joint: 5220, individual: 4560 },
    { hours: 20, gross: 6980, joint: 5660, individual: 4980 },
    { hours: 25, gross: 7625, joint: 6100, individual: 5400 },
    { hours: 30, gross: 8270, joint: 6540, individual: 5820 },
    { hours: 35, gross: 8915, joint: 6980, individual: 6240 },
    { hours: 40, gross: 9560, joint: 7420, individual: 6660 },
    { hours: 45, gross: 10205, joint: 7860, individual: 7080 },
    { hours: 50, gross: 10850, joint: 8300, individual: 7500 }
  ]

  const renderGraphDetails = () => {
    switch (selectedGraph) {
      case 'labor-supply':
        return (
          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-blue-900 mb-2">📊 Labor Supply Effect Analysis</h4>
            <div className="text-sm text-blue-800 space-y-2">
              <p><strong>Key Finding:</strong> Individual taxation significantly boosts female labor participation with minimal impact on men.</p>
              <p><strong>Women's Response:</strong> 2.30% increase in labor hours and 3.20% increase in participation rate.</p>
              <p><strong>Men's Response:</strong> Minimal changes (0.14% labor hours, 0.05% participation).</p>
              <p><strong>Policy Implication:</strong> This demonstrates how tax policy can be a powerful tool for promoting gender equity in the labor market.</p>
            </div>
          </div>
        )
      case 'secondary-earner':
        return (
          <div className="bg-green-50 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-green-900 mb-2">💰 Secondary Earner Budget Constraint</h4>
            <div className="text-sm text-green-800 space-y-2">
              <p><strong>Scenario:</strong> Primary earner works 40 hours/week at €26/hour, secondary earner works 0-50 hours/week at €21/hour.</p>
              <p><strong>Joint Taxation Issue:</strong> Creates a "tax cliff" where secondary earners face high marginal rates from the first hour worked.</p>
              <p><strong>Individual Taxation Benefit:</strong> Provides flatter marginal tax rates, preserving more of the secondary earner's income.</p>
              <p><strong>Key Insight:</strong> Individual taxation removes disincentives for secondary earners, encouraging labor participation.</p>
            </div>
          </div>
        )
      case 'household-budget':
        return (
          <div className="bg-purple-50 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-purple-900 mb-2">🏠 Household Budget Constraint</h4>
            <div className="text-sm text-purple-800 space-y-2">
              <p><strong>Total Household Impact:</strong> Shows how both taxation systems affect overall household disposable income.</p>
              <p><strong>Joint Taxation:</strong> May provide higher total household income but creates disincentives for secondary earners.</p>
              <p><strong>Individual Taxation:</strong> Results in lower total household income but provides better work incentives for both partners.</p>
              <p><strong>Policy Trade-off:</strong> Between immediate household tax savings and long-term labor market participation benefits.</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Graph 1: Labor Supply Effect */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          📈 Labor Supply Effect: Change in Working Hours and Participation
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={laborSupplyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="category" 
                fontSize={12}
                tick={{ fill: '#374151' }}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: '#374151' }}
                label={{ value: 'Change (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number) => [`+${value}%`, 'Change']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#F9FAFB', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="women" 
                fill="#EF4444" 
                radius={[4, 4, 0, 0]}
                name="Women"
              />
              <Bar 
                dataKey="men" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                name="Men"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <button
          onClick={() => setSelectedGraph(selectedGraph === 'labor-supply' ? null : 'labor-supply')}
          className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {selectedGraph === 'labor-supply' ? 'Hide Details' : 'Show Details'}
        </button>
        {selectedGraph === 'labor-supply' && renderGraphDetails()}
      </div>

      {/* Graph 2: Secondary Earner Budget Constraint */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          💼 Secondary Earner Budget Constraint: Joint vs Individual Taxation
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Primary earner works 40 hours/week at €26/hour, secondary earner works 0-50 hours/week at €21/hour
        </p>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={secondaryEarnerData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="hours" 
                fontSize={12}
                tick={{ fill: '#374151' }}
                label={{ value: 'Weekly Hours of Secondary Earner', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: '#374151' }}
                label={{ value: 'Income (€)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#F9FAFB', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="gross" 
                stroke="#000000" 
                strokeWidth={3}
                name="Gross Income"
                dot={{ fill: '#000000', strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="joint" 
                stroke="#6B7280" 
                strokeWidth={3}
                name="Disposable Income (Joint)"
                dot={{ fill: '#6B7280', strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="individual" 
                stroke="#10B981" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Disposable Income (Individual)"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <button
          onClick={() => setSelectedGraph(selectedGraph === 'secondary-earner' ? null : 'secondary-earner')}
          className="mt-2 text-green-600 hover:text-green-800 text-sm font-medium"
        >
          {selectedGraph === 'secondary-earner' ? 'Hide Details' : 'Show Details'}
        </button>
        {selectedGraph === 'secondary-earner' && renderGraphDetails()}
      </div>

      {/* Graph 3: Household Budget Constraint */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          🏠 Household Budget Constraint: Joint vs Individual Taxation
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Total household disposable income under different taxation systems
        </p>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={householdBudgetData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="hours" 
                fontSize={12}
                tick={{ fill: '#374151' }}
                label={{ value: 'Weekly Hours of Secondary Earner', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: '#374151' }}
                label={{ value: 'Household Income (€)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#F9FAFB', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="gross" 
                stroke="#000000" 
                strokeWidth={3}
                name="Gross Income"
                dot={{ fill: '#000000', strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="joint" 
                stroke="#6B7280" 
                strokeWidth={3}
                name="Disposable Income (Joint)"
                dot={{ fill: '#6B7280', strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="individual" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Disposable Income (Individual)"
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <button
          onClick={() => setSelectedGraph(selectedGraph === 'household-budget' ? null : 'household-budget')}
          className="mt-2 text-purple-600 hover:text-purple-800 text-sm font-medium"
        >
          {selectedGraph === 'household-budget' ? 'Hide Details' : 'Show Details'}
        </button>
        {selectedGraph === 'household-budget' && renderGraphDetails()}
      </div>

      {/* Key Findings Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600 mb-1">
            +3.20%
          </div>
          <p className="text-sm text-red-800">Women's Participation</p>
          <p className="text-xs text-red-700 mt-1">Largest increase in labor market</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            +2.30%
          </div>
          <p className="text-sm text-green-800">Women's Labor Hours</p>
          <p className="text-xs text-green-700 mt-1">Significant work incentive</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            €9.8M
          </div>
          <p className="text-sm text-blue-800">Fiscal Gain</p>
          <p className="text-xs text-blue-700 mt-1">Net government revenue increase</p>
        </div>
      </div>

      {/* Research Methodology */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">📊 Research Methodology</h4>
        <p className="text-xs text-gray-600">
          <strong>Data Source:</strong> Analysis based on EUROMOD and Lux TaxBen microsimulation models using Luxembourg tax and household data. 
          The research was conducted by Nizamul Islam at the Luxembourg Institute of Socio-Economic Research (LISER).
          <br /><br />
          <strong>Model Assumptions:</strong> The analysis assumes rational economic behavior and considers income and substitution effects. 
          The scenario models a primary earner working 40 hours/week at €26/hour and a secondary earner working 0-50 hours/week at €21/hour.
        </p>
      </div>
    </div>
  )
}
