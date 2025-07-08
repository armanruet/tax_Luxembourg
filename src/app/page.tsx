import Link from 'next/link'
import { QRCodeDisplay } from '@/components/QRCodeDisplay'
import { PollResults } from '@/components/PollResults'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="gradient-bg text-white py-8 px-6 rounded-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Taxing Choices: Joint vs Individual Taxation
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Assessing Behavioral Responses with Microsimulation
          </p>
          <p className="text-lg opacity-90">
            Luxembourg Institute of Socio-Economic Research (LISER)
          </p>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* QR Code Section */}
        <section className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            📱 Try MicroSIM Yourself!
          </h2>
          <QRCodeDisplay />
          <div className="mt-6 space-y-3 text-gray-700">
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
          </div>
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
      <section className="bg-white rounded-xl p-8 shadow-lg mb-12">
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
      </section>

      {/* Key Behavioral Response Section */}
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
      </section>
    </main>
  )
}
