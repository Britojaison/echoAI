'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Inter } from 'next/font/google'
import { ChevronRight, Phone, Users, TrendingUp, Clock, CheckCircle, Quote } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'

const inter = Inter({ subsets: ['latin'] })

// Case studies data
const caseStudies = [
  {
    id: 'creative-orbit',
    company: 'Creative Orbit',
    industry: 'Digital Marketing & Creative Agency',
    hero: {
      title: 'How ECHO AI Helped Creative Orbit Scale Client Communication',
      subtitle: 'Automating client follow-ups and feedback collection while maintaining personalized service',
      description: 'Creative Orbit, a full-service digital marketing agency, leveraged ECHO AI to automate client communications and gather feedback, allowing their team to focus on creative work while maintaining excellent client relationships.'
    },
    challenge: {
      title: 'The Challenge',
      description: 'Creative Orbit managed over 100+ active clients across various industries. Their team spent countless hours on routine follow-up calls, project status updates, and feedback collection. This manual process was time-consuming and took away from their core creative work.',
      points: [
        'High volume of routine client check-in calls',
        'Inconsistent feedback collection across projects',
        'Team burnout from repetitive communication tasks',
        'Difficulty scaling client communication with growth'
      ]
    },
    solution: {
      title: 'The ECHO AI Solution',
      description: 'Creative Orbit implemented ECHO AI to handle routine client communications, feedback collection, and follow-ups. The AI agents were trained to understand their service offerings and communicate in their brand voice.',
      features: [
        {
          title: 'Automated Follow-ups',
          description: 'ECHO AI automatically contacts clients for project updates and status checks',
          icon: Phone
        },
        {
          title: 'Feedback Collection',
          description: 'Systematic gathering of client feedback after each project milestone',
          icon: Users
        },
        {
          title: 'Multilingual Support',
          description: 'Communicate with international clients in their preferred language',
          icon: TrendingUp
        },
        {
          title: '24/7 Availability',
          description: 'Clients can provide feedback anytime, not limited to business hours',
          icon: Clock
        }
      ]
    },
    results: {
      title: 'Results That Matter',
      metrics: [
        { label: 'Reduction in manual calls', value: '75%', icon: TrendingUp },
        { label: 'Increase in feedback response rate', value: '60%', icon: Users },
        { label: 'Hours saved per week', value: '40+', icon: Clock },
        { label: 'Client satisfaction score', value: '4.8/5', icon: CheckCircle }
      ],
      quote: {
        text: 'ECHO AI has transformed how we communicate with our clients. We\'re now able to maintain consistent touchpoints with every client while our team focuses on what we do best – creating amazing work.',
        author: 'Sarah Mitchell',
        role: 'Founder & Creative Director',
        company: 'Creative Orbit'
      }
    },
    impact: [
      'Scaled client communication by 3x without adding headcount',
      'Improved project delivery timelines by reducing communication delays',
      'Enhanced client satisfaction through consistent and timely follow-ups',
      'Freed up creative team to focus on high-value work'
    ]
  },
  {
    id: 'cinco',
    company: 'Cinco',
    industry: 'Restaurant & Hospitality',
    hero: {
      title: 'How Cinco Restaurant Chain Automated Reservations with ECHO AI',
      subtitle: 'Handling thousands of reservation calls while delivering exceptional customer experience',
      description: 'Cinco, a rapidly growing restaurant chain with 25 locations, implemented ECHO AI to manage their high-volume reservation system, enabling them to handle peak hours efficiently while maintaining their commitment to customer service.'
    },
    challenge: {
      title: 'The Challenge',
      description: 'With 25 locations and growing, Cinco faced overwhelming call volumes during peak hours. Their staff struggled to answer phones while serving in-house guests, leading to missed reservations and frustrated customers.',
      points: [
        'Missed calls during dinner rush hours (6-9 PM)',
        'Staff overwhelmed managing both calls and in-person service',
        'Inconsistent reservation information across locations',
        'Limited ability to handle multilingual customer requests'
      ]
    },
    solution: {
      title: 'The ECHO AI Solution',
      description: 'Cinco deployed ECHO AI across all 25 locations to handle reservation calls, table availability checks, and customer inquiries. The system was integrated with their existing reservation management platform.',
      features: [
        {
          title: 'Smart Reservations',
          description: 'ECHO AI handles booking, modifications, and cancellations seamlessly',
          icon: Phone
        },
        {
          title: 'Real-time Availability',
          description: 'Instant access to table availability across all locations',
          icon: Clock
        },
        {
          title: 'Multi-location Support',
          description: 'Centralized system managing 25 locations simultaneously',
          icon: Users
        },
        {
          title: 'Special Requests',
          description: 'Captures dietary restrictions, celebrations, and preferences',
          icon: CheckCircle
        }
      ]
    },
    results: {
      title: 'Exceptional Results',
      metrics: [
        { label: 'Calls answered', value: '99.8%', icon: Phone },
        { label: 'Increase in reservations', value: '45%', icon: TrendingUp },
        { label: 'Reduction in no-shows', value: '30%', icon: CheckCircle },
        { label: 'Customer satisfaction', value: '4.9/5', icon: Users }
      ],
      quote: {
        text: 'ECHO AI has been a game-changer for our business. We never miss a reservation call now, and our staff can focus on delivering exceptional in-person service. It\'s like having a dedicated receptionist at every location.',
        author: 'Carlos Rodriguez',
        role: 'Operations Director',
        company: 'Cinco Restaurant Group'
      }
    },
    impact: [
      'Zero missed calls during peak hours',
      'Increased revenue through higher reservation conversion',
      'Improved staff morale by reducing phone interruptions',
      'Enhanced guest experience with consistent service across all locations'
    ]
  }
]

function CaseStudiesContent() {
  const searchParams = useSearchParams()
  const studyParam = searchParams.get('study')
  
  const [selectedCase, setSelectedCase] = useState(() => {
    const study = caseStudies.find(cs => cs.id === studyParam)
    return study || caseStudies[0]
  })

  useEffect(() => {
    if (studyParam) {
      const study = caseStudies.find(cs => cs.id === studyParam)
      if (study) {
        setSelectedCase(study)
      }
    }
  }, [studyParam])

  return (
    <div className={`${inter.className} min-h-screen bg-white`}>
      {/* Navigation Bar */}
      <Navigation lightTheme={true} />

      {/* Hero Section */}
      <motion.section 
        key={selectedCase.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-32 pb-16 bg-gradient-to-br from-blue-600 to-purple-700"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
              {selectedCase.industry}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {selectedCase.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              {selectedCase.hero.subtitle}
            </p>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              {selectedCase.hero.description}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Challenge Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {selectedCase.challenge.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {selectedCase.challenge.description}
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Key Challenges:</h3>
                <ul className="space-y-4">
                  {selectedCase.challenge.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                      </div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Solution Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="py-16 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {selectedCase.solution.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {selectedCase.solution.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {selectedCase.solution.features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Results Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              {selectedCase.results.title}
            </h2>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {selectedCase.results.metrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <div 
                    key={index}
                    className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200"
                  >
                    <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {metric.label}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quote */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              <Quote className="absolute top-6 right-6 w-16 h-16 text-white/20" />
              <div className="relative z-10">
                <p className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
                  &ldquo;{selectedCase.results.quote.text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                    {selectedCase.results.quote.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{selectedCase.results.quote.author}</div>
                    <div className="text-blue-100">{selectedCase.results.quote.role}, {selectedCase.results.quote.company}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Impact Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="py-16 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Business Impact
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {selectedCase.impact.map((point, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 bg-white rounded-xl p-6 border border-gray-200"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 text-lg">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join {selectedCase.company} and hundreds of other companies using ECHO AI to automate customer communications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#contact"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                Book a Demo
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/#contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
              >
                Talk to Sales
                <Phone className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 ECHO AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function CaseStudiesPage() {
  return (
    <Suspense fallback={
      <div className={`${inter.className} min-h-screen bg-white flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading case studies...</p>
        </div>
      </div>
    }>
      <CaseStudiesContent />
    </Suspense>
  )
}

