import Link from 'next/link'
import { QRCodeDisplay } from '@/components/QRCodeDisplay'
import { PollResults } from '@/components/PollResults'

// Utility function to get correct image path for GitHub Pages
function getImagePath(imageName: string): string {
  // Check if we're on GitHub Pages (repository name in path)
  if (typeof window !== 'undefined' && window.location.pathname.includes('/tax_Luxembourg')) {
    return `/tax_Luxembourg${imageName}`
  }
  return imageName
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-4">
        <div className="gradient-bg text-white py-8 px-6 rounded-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Taxing Choices: Joint vs Individual Taxation
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            NIZAMUL ISLAM, LISER
          </p>
          <p className="text-lg opacity-90">
            Luxembourg Institute of Socio-Economic Research (LISER)
          </p>
        </div>
      </header>

      {/* Why Does It Matter Section */}
      <section className="bg-white rounded-xl p-8 shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Why Does It Matter?
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Joint Taxation */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Joint Taxation:</h3>
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                Household taxed as a single unit.
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                Can reduce taxes for one-earner couples, but may penalize second earners (often women).
              </li>
            </ul>
          </div>

          {/* Individual Taxation */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-900 mb-4">Individual Taxation:</h3>
            <ul className="space-y-3 text-green-800">
              <li className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                Each person taxed separately.
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                Promotes independence and equal work incentives, but might increase tax burden for some families.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Project Objective Box */}
      <section className="mb-12">
        <div className="gradient-bg rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Project Objective
            </h2>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
              <p className="text-lg md:text-xl text-white leading-relaxed font-medium">
                To evaluate the fiscal, distributional, and behavioral impacts of shifting from joint to individual taxation in Luxembourg, using microsimulation to inform equitable and efficient policy reform.
              </p>
            </div>
            
            {/* Key Pillars */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <div className="text-2xl mb-2">💰</div>
                <h3 className="font-semibold text-white text-sm">Fiscal Impact</h3>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <div className="text-2xl mb-2">⚖️</div>
                <h3 className="font-semibold text-white text-sm">Distributional Analysis</h3>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold text-white text-sm">Behavioral Response</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* QR Code Section */}
        <section className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            📱 Try MicroSIM Yourself!
          </h2>
          <QRCodeDisplay />
          {/* <div className="mt-6 space-y-3 text-gray-700">
            <p className="flex items-center">
              <span className="mr-2">✓</span>
              Experience tax changes in real-time!
            </p>
            <p className="flex items-center">
              <span className="mr-2">✓</span>
              Compare scenarios: single earner vs dual earner
            </p>
            <p className="flex items-center">
              <span className="mr-2">✓</span>
              Test "what-if" reforms with your own inputs
            </p>
          </div> */}
        </section>

        {/* Poll Section */}
        <section className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            📊 Visitor Poll: What Matters Most to You?
          </h2>
          <PollResults />
        </section>
      </div>

      {/* Interactive Demo Section */}
      {/* <section className="bg-white rounded-xl p-8 shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🤔 What Would You Choose?
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Imagine you are:</h3>
            <p className="text-lg">
              A married couple: one partner earns <strong>€70,000/year</strong>, 
              the other <strong>€20,000/year</strong>.
            </p>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-xl font-medium mb-6">
              Under which tax system would your total net income be higher?
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
              <Link href="/tax-simulator?type=joint" 
                    className="btn-primary block text-center">
                1️⃣ Joint Taxation
              </Link>
              <Link href="/tax-simulator?type=individual" 
                    className="btn-primary block text-center">
                2️⃣ Individual Taxation
              </Link>
            </div>
            
            <p className="mt-6 text-gray-600 italic">
              Use the MicroSIM tablet on the stand to test your answer!
            </p>
          </div>
        </div>
      </section> */}
{/* 
      Key Behavioral Response Section
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          📈 Key Behavioral Response
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">+2.58%</div>
            <p className="text-gray-700">Women increase participation</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">+2.27%</div>
            <p className="text-gray-700">Working hours increase</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600 mb-2">Minimal</div>
            <p className="text-gray-700">Men show status quo bias</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">€9.77M</div>
            <p className="text-gray-700">Net gain in tax revenue</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-xl font-medium text-gray-700">
            What could happen if we scale this EU-wide?
          </p>
        </div>
      </section> */}
    </main>
  )
}
