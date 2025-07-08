'use client'

import { useState, useEffect } from 'react'
import QRCode from 'react-qr-code'

export function QRCodeDisplay() {
  const [baseUrl, setBaseUrl] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set the base URL after component mounts to avoid SSR issues
    if (typeof window !== 'undefined') {
      const currentUrl = `${window.location.protocol}//${window.location.host}`
      setBaseUrl(currentUrl)
    }
    setMounted(true)
  }, [])

  const scenarios = [
    { 
      id: 'qr-test', 
      label: 'QR Code Test', 
      path: '/qr-test',
      params: ''
    },
    { 
      id: 'couple-70k-20k', 
      label: 'Couple: €70k + €20k', 
      path: '/tax-simulator',
      params: '?income1=70000&income2=20000' 
    },
    { 
      id: 'couple-50k-30k', 
      label: 'Couple: €50k + €30k', 
      path: '/tax-simulator',
      params: '?income1=50000&income2=30000' 
    },
    { 
      id: 'couple-60k-25k', 
      label: 'Couple: €60k + €25k', 
      path: '/tax-simulator',
      params: '?income1=60000&income2=25000' 
    },
  ]

  const [selectedScenario, setSelectedScenario] = useState(scenarios[0])
  const qrUrl = `${baseUrl}${selectedScenario.path}${selectedScenario.params}`

  // Don't render until component is mounted to avoid hydration issues
  if (!mounted || !baseUrl) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-200 animate-pulse">
            <div className="w-48 h-48 bg-gray-300 rounded"></div>
          </div>
          <p className="text-sm text-gray-500">Loading QR code...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Scenario Selector */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Choose a scenario:
        </label>
        <select 
          value={selectedScenario.id}
          onChange={(e) => setSelectedScenario(scenarios.find(s => s.id === e.target.value) || scenarios[0])}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.label}
            </option>
          ))}
        </select>
      </div>

      {/* QR Code Display */}
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
          <QRCode
            size={200}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={qrUrl}
            viewBox={`0 0 200 200`}
          />
        </div>
        
        <p className="text-sm text-gray-600 text-center max-w-xs">
          Scan with your phone to access the {selectedScenario.label.toLowerCase()}
        </p>
        
        {/* URL Display for debugging */}
        <div className="text-center bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-600 mb-2">QR Code URL:</p>
          <code className="text-xs bg-white p-2 rounded border break-all block">
            {qrUrl}
          </code>
        </div>
        
        {/* Direct Link */}
        <div className="text-center">
          <a 
            href={qrUrl}
            className="text-blue-600 hover:text-blue-800 text-sm underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 Click here to test the link directly
          </a>
        </div>

        {/* Instructions */}
        {selectedScenario.id === 'qr-test' && (
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm">
            <p className="text-yellow-800">
              <strong>🔧 Testing Mode:</strong> This QR code will take you to a test page to verify the QR scanning is working correctly.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
