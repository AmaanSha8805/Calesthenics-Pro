'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FaDumbbell, FaFire, FaHeartbeat, FaChartLine } from 'react-icons/fa'

export default function Home() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/assessment')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Calisthenics Pro
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            Transform Your Body with Calisthenics Pro
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={handleGetStarted}
            className="glass-button px-8 py-4 rounded-full text-lg font-semibold text-white hover:scale-105"
          >
            Start Your Journey →
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              icon: FaDumbbell,
              title: 'Personalized Workouts',
              description: 'Bespoke calisthenics routines tailored to your goals',
            },
            {
              icon: FaFire,
              title: 'Custom Diet Plans',
              description: 'Nutrition plans designed for your body and lifestyle',
            },
            {
              icon: FaHeartbeat,
              title: 'Health Insights',
              description: 'Get expert health tips and recommendations',
            },
            {
              icon: FaChartLine,
              title: 'Track Progress',
              description: 'Monitor your fitness journey with detailed analytics',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="glass-effect p-6 rounded-2xl hover:scale-105 transition-transform"
            >
              <feature.icon className="text-4xl mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { duration: '1 Month', price: '$29', features: ['Workout Plan', 'Health Tips'] },
              { duration: '4 Months', price: '$99', features: ['Workout Plan', 'Diet Plan', 'Health Tips'], highlight: true },
              { duration: '8 Months', price: '$179', features: ['Workout Plan', 'Diet Plan', 'Health Tips', 'Progress Tracking'] },
              { duration: '1 Year', price: '$249', features: ['Everything in 8 Months', 'Priority Support', 'Monthly Updates'] },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className={`glass-effect p-6 rounded-2xl ${plan.highlight ? 'ring-2 ring-blue-400 scale-105' : ''}`}
              >
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold mb-2">{plan.duration}</h3>
                  <p className="text-4xl font-bold text-blue-400 mb-4">{plan.price}</p>
                  {plan.highlight && (
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
                  )}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="glass-button w-full py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

