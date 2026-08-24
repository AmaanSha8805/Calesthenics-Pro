'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaArrowRight, FaCheck, FaHome } from 'react-icons/fa'
import axios from 'axios'

interface AgeGroupOption {
  label: string
  image: string
  highlight: string
}

const HEIGHT_QUESTION_ID = 3
const WEIGHT_QUESTION_ID = 4

interface Question {
  id: number
  question: string
  type: 'text' | 'number' | 'select' | 'radio' | 'checkbox' | 'age-group'
  options?: string[]
  ageGroups?: AgeGroupOption[]
  image?: string
  placeholder?: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's your name?",
    type: 'text',
    placeholder: 'Enter your name',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    question: 'Select your age group',
    type: 'age-group',
    ageGroups: [
      {
        label: 'Age 18–29',
        highlight: 'Prime Foundation',
        image: '/images/Gemini_Generated_Image_1m879m1m879m1m87.png',
      },
      {
        label: 'Age 30–39',
        highlight: 'Peak Performance',
        image: '/images/Gemini_Generated_Image_lzxfvilzxfvilzxf.png',
      },
      {
        label: 'Age 40–49',
        highlight: 'Focused Power',
        image: '/images/Gemini_Generated_Image_up3r3xup3r3xup3r.png',
      },
      {
        label: 'Age 50+',
        highlight: 'Timeless Strength',
        image: '/images/Gemini_Generated_Image_w63t51w63t51w63t.png',
      },
    ],
  },
  {
    id: 3,
    question: 'What is your height (cm)?',
    type: 'number',
    placeholder: 'Enter your height',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    question: 'What is your current weight (kg)?',
    type: 'number',
    placeholder: 'Enter your weight',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    question: 'What is your primary fitness goal?',
    type: 'radio',
    options: ['Build Muscle', 'Lose Weight', 'Increase Strength', 'Improve Flexibility', 'General Fitness'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
  },
  {
    id: 6,
    question: 'What is your current fitness level?',
    type: 'radio',
    options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
  },
  {
    id: 7,
    question: 'How many days per week can you commit to training?',
    type: 'radio',
    options: ['2-3 days', '4-5 days', '6 days', '7 days'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
  },
  {
    id: 8,
    question: 'How long can you train per session?',
    type: 'radio',
    options: ['30 minutes', '45 minutes', '60 minutes', '90+ minutes'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop',
  },
  {
    id: 9,
    question: 'What time of day do you prefer to workout?',
    type: 'radio',
    options: ['Morning (6-9 AM)', 'Midday (10 AM-2 PM)', 'Afternoon (3-6 PM)', 'Evening (7-10 PM)'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop',
  },
  {
    id: 10,
    question: 'Do you have access to equipment?',
    type: 'radio',
    options: ['No equipment (bodyweight only)', 'Pull-up bar', 'Resistance bands', 'Full home gym'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop',
  },
  {
    id: 11,
    question: 'What is your current diet type?',
    type: 'radio',
    options: ['Omnivore', 'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Flexible'],
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
  },
  {
    id: 12,
    question: 'How many meals do you typically eat per day?',
    type: 'radio',
    options: ['2 meals', '3 meals', '4 meals', '5+ meals'],
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
  },
  {
    id: 13,
    question: 'Do you have any dietary restrictions or allergies?',
    type: 'text',
    placeholder: 'List any restrictions (e.g., nuts, dairy, gluten)',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
  },
  {
    id: 14,
    question: 'What is your activity level outside of workouts?',
    type: 'radio',
    options: ['Sedentary (desk job)', 'Lightly active', 'Moderately active', 'Very active'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
  },
  {
    id: 15,
    question: 'Do you have any medical conditions or injuries?',
    type: 'text',
    placeholder: 'Please describe (or type "None")',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
  },
  {
    id: 16,
    question: 'What calisthenics skills are you interested in? (Select all that apply)',
    type: 'checkbox',
    options: ['Push-ups', 'Pull-ups', 'Muscle-ups', 'Handstand', 'Planche', 'Front Lever', 'Back Lever', 'Human Flag'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
  },
  {
    id: 17,
    question: 'What motivates you most?',
    type: 'radio',
    options: ['Looking better', 'Feeling stronger', 'Achieving skills', 'Health benefits', 'Competition'],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
  },
  {
    id: 18,
    question: 'How do you prefer to track progress?',
    type: 'radio',
    options: ['Photos', 'Measurements', 'Weight', 'Strength gains', 'Skill achievements'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
  },
]

export default function AssessmentPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [loading, setLoading] = useState(false)

  const handleAnswer = (value: any, autoAdvance = false) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: value }))
    if (autoAdvance) {
      setTimeout(() => {
        handleNext()
      }, 180)
    }
  }

  const handleNext = () => {
    setCurrentQuestion((prev) => {
      if (prev < questions.length - 1) {
        return prev + 1
      }
      if (!loading) {
        handleSubmit()
      }
      return prev
    })
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/api/assess', {
        answers,
      })
      router.push(`/results?data=${encodeURIComponent(JSON.stringify(response.data))}`)
    } catch (error) {
      console.error('Error submitting assessment:', error)
      alert('Error generating your plan. Please try again.')
      setLoading(false)
    }
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentAnswer = answers[currentQ.id]
  const heightValue =
    answers[HEIGHT_QUESTION_ID] !== undefined && answers[HEIGHT_QUESTION_ID] !== ''
      ? parseFloat(answers[HEIGHT_QUESTION_ID])
      : undefined
  const weightValue =
    answers[WEIGHT_QUESTION_ID] !== undefined && answers[WEIGHT_QUESTION_ID] !== ''
      ? parseFloat(answers[WEIGHT_QUESTION_ID])
      : undefined
  const bmiValue =
    currentQ.id === WEIGHT_QUESTION_ID && heightValue && weightValue
      ? weightValue / Math.pow(heightValue / 100, 2)
      : undefined

  const bmiCategory = (bmi: number) => {
    if (bmi < 18.5) return 'Lean Physique'
    if (bmi < 25) return 'Athletic Balance'
    if (bmi < 30) return 'Power Build'
    return 'Heavy Powerhouse'
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
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-300">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-400 to-purple-400 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="glass-effect rounded-3xl p-8"
          >
            {/* Question Image */}
            {currentQ.type !== 'age-group' && currentQ.image && (
              <div className="mb-6 rounded-2xl overflow-hidden">
                <img
                  src={currentQ.image}
                  alt={currentQ.question}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Question */}
            {currentQ.type === 'age-group' ? (
              <div className="text-center mb-10">
                <p className="uppercase tracking-[0.3em] text-xs text-blue-200 mb-3">
                  Perfect Body with Calesthenics Pro
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Choose Your Age Group
                </h2>
                <p className="text-gray-300">
                  Tailor your transformation to the stage you&apos;re currently mastering.
                </p>
              </div>
            ) : (
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                {currentQ.question}
              </h2>
            )}

            {/* Answer Input */}
            <div className="mb-8">
              {currentQ.type === 'text' && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={currentAnswer || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        handleNext()
                      }
                    }}
                    placeholder={currentQ.placeholder}
                    className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <p className="text-sm text-gray-400 text-right">Press Enter to continue</p>
                </div>
              )}

              {currentQ.type === 'number' && (
                <div className="space-y-3">
                  <input
                    type="number"
                    value={currentAnswer || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value !== '') {
                        handleNext()
                      }
                    }}
                    placeholder={currentQ.placeholder}
                    className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <p className="text-sm text-gray-400 text-right">Press Enter to continue</p>

                  {currentQ.id === WEIGHT_QUESTION_ID && (
                    <div className="mt-4 glass-effect rounded-2xl p-5 border border-white/10 bg-white/5">
                      {heightValue ? (
                        bmiValue ? (
                          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                              <p className="text-xs uppercase tracking-[0.4em] text-blue-200 mb-1">Instant BMI</p>
                              <p className="text-4xl font-bold text-white">
                                {bmiValue.toFixed(1)}
                                <span className="text-base text-blue-200 ml-2">kg/m²</span>
                              </p>
                              <p className="text-sm text-gray-300 mt-1">
                                {bmiCategory(bmiValue)} · {weightValue} kg Ht: {heightValue} cm
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400 mb-1">Performance Window</p>
                              <div className="flex items-center gap-2">
                                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                                    style={{
                                      width: `${Math.min(Math.max(((bmiValue - 10) / 25) * 100, 0), 100)}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-200">{bmiValue.toFixed(1)}</span>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">Tap Enter to lock it in</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-300">Enter your weight to calculate BMI instantly.</p>
                        )
                      ) : (
                        <p className="text-sm text-gray-300">
                          Add your height first so we can calculate your precise BMI.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {currentQ.type === 'age-group' && currentQ.ageGroups && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentQ.ageGroups.map((group, idx) => {
                    const selected = answers[currentQ.id] === group.label
                    return (
                      <motion.button
                        key={group.label}
                        onClick={() => handleAnswer(group.label, true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative group rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/70 to-blue-900/40 border border-white/5 backdrop-blur-xl ${
                          selected ? 'ring-2 ring-blue-400 shadow-xl shadow-blue-500/30' : ''
                        }`}
                      >
                        <div className="relative h-64 w-full overflow-hidden">
                          <img
                            src={group.image}
                            alt={group.label}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-gray-900/40 to-gray-900/90" />
                          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-sm text-blue-200 border border-white/20">
                            {group.highlight}
                          </div>
                          <div className="absolute inset-x-0 bottom-0 px-5 py-4 bg-white/5 backdrop-blur-lg border-t border-white/10 flex items-center justify-between">
                            <div className="text-left">
                              <p className="text-lg font-semibold text-white">{group.label}</p>
                              <p className="text-xs text-gray-300">Tap to unlock your program</p>
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-blue-200">
                              <FaArrowRight />
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              )}

              {currentQ.type === 'radio' && currentQ.options && (
                <div className="space-y-4">
                  {currentQ.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleAnswer(option, true)}
                      className={`w-full glass-button p-4 rounded-xl text-left flex items-center justify-between ${
                        answers[currentQ.id] === option ? 'ring-2 ring-blue-400' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{option}</span>
                      {answers[currentQ.id] === option && (
                        <FaCheck className="text-blue-400" />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {currentQ.type === 'checkbox' && currentQ.options && (
                <div className="space-y-4">
                  {currentQ.options.map((option, idx) => {
                    const selected = (answers[currentQ.id] || []).includes(option)
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => {
                          const current = currentAnswer || []
                          const updated = selected
                            ? current.filter((v: string) => v !== option)
                            : [...current, option]
                          handleAnswer(updated)
                        }}
                        className={`w-full glass-button p-4 rounded-xl text-left flex items-center justify-between ${
                          selected ? 'ring-2 ring-blue-400' : ''
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{option}</span>
                        {selected && <FaCheck className="text-blue-400" />}
                      </motion.button>
                    )
                  })}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNext}
                      disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
                      className={`glass-button px-6 py-3 rounded-xl flex items-center gap-2 ${
                        !currentAnswer || currentAnswer.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Continue
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`glass-button px-6 py-3 rounded-xl flex items-center gap-2 ${
                  currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FaArrowLeft />
                Previous
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

