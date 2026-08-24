'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaDownload, FaDumbbell, FaUtensils, FaHeartbeat, FaHome } from 'react-icons/fa'
import axios from 'axios'

interface ResultsData {
  workout_plan: string
  diet_plan: string
  health_tips: string
}

function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [results, setResults] = useState<ResultsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const dataParam = searchParams.get('data')
    if (dataParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(dataParam))
        setResults(parsed)
      } catch (error) {
        console.error('Error parsing results:', error)
      }
    }
    setLoading(false)
  }, [searchParams])

  const handleDownloadPDF = async () => {
    if (!results) return

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/api/generate-pdf',
        results,
        { responseType: 'blob' }
      )
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'calisthenics-plan.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error downloading PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-xl">Loading your personalized plan...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">No results found</p>
          <button
            onClick={() => router.push('/')}
            className="glass-button px-6 py-3 rounded-xl"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-8 relative">
      <Link
        href="/"
        className="fixed top-6 right-6 glass-button px-5 py-3 rounded-full flex items-center gap-2 z-50 shadow-xl shadow-blue-500/20"
      >
        <FaHome />
        Home
      </Link>
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your Personalized Plan is Ready!
          </h1>
          <button
            onClick={handleDownloadPDF}
            className="glass-button px-8 py-4 rounded-xl text-lg font-semibold flex items-center gap-2 mx-auto hover:scale-105 transition-transform"
          >
            <FaDownload />
            Download PDF
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workout Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaDumbbell className="text-3xl text-blue-400" />
              <h2 className="text-2xl font-bold">Workout Plan</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-300">
                {results.workout_plan}
              </div>
            </div>
          </motion.div>

          {/* Diet Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaUtensils className="text-3xl text-green-400" />
              <h2 className="text-2xl font-bold">Diet Plan</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-300">
                {results.diet_plan}
              </div>
            </div>
          </motion.div>

          {/* Health Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-effect rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaHeartbeat className="text-3xl text-red-400" />
              <h2 className="text-2xl font-bold">Health Tips</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-300">
                {results.health_tips}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/')}
            className="glass-button px-6 py-3 rounded-xl"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}

