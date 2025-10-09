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
    id: 'cinco',
    company: 'Cinco',
    industry: 'Real Estate',
    hero: {
      title: 'How Cinco India Automated Property Inquiries with ECHO AI',
      subtitle: 'Handling thousands of property inquiry calls while delivering exceptional client experience',
      description: 'Cinco, a rapidly growing real estate brand with 25 locations, implemented ECHO AI to manage their high-volume property inquiry system, enabling them to handle peak viewing hours efficiently while maintaining their commitment to client service.'
    },
    challenge: {
      title: 'Handling Peak-Hour Call Overload',
      paragraphs: [
        'Cinco is a rapidly expanding real estate brand with a growing client base. As the company scaled, it began facing challenges in managing heavy call volumes during peak business hours.',
        'Between 6 and 9 PM, when client inquiries peaked, staff were overwhelmed trying to manage phone calls and in-person meetings. This led to missed calls, lost opportunities, and delayed follow-ups, impacting customer satisfaction and sales.',
        'The challenge grew with limited multilingual support, restricting Cinco\'s ability to provide a seamless, personalized experience. To solve this, Cinco looked for a scalable solution to automate routine calls, ensure consistent service, and boost client engagement across locations.'
      ]
    },
    solution: {
      title: 'The ECHO AI Solution',
      description: 'Cinco deployed ECHO AI to handle property inquiry calls, property availability checks, and client inquiries. The system was integrated with their existing property management platform.',
      features: [
        {
          title: 'Smart Property Inquiries',
          description: 'ECHO AI handles property inquiries, viewing appointments, and follow-ups seamlessly',
          icon: Phone
        },
        {
          title: 'Real-time Property Availability',
          description: 'Instant access to property availability across all locations',
          icon: Clock
        },
        {
          title: 'Multi-location Support',
          description: 'Centralized system managing 25 locations simultaneously',
          icon: Users
        },
        {
          title: 'Client Preferences',
          description: 'Captures property requirements, budget preferences, and location preferences',
          icon: CheckCircle
        }
      ]
    },
    results: {
      title: 'Exceptional Results',
      metrics: [
        { label: 'Calls answered', value: '99.8%', icon: Phone },
        { label: 'Increase in property inquiries', value: '45%', icon: TrendingUp },
        { label: 'Reduction in missed appointments', value: '30%', icon: CheckCircle },
        { label: 'Client satisfaction', value: '4.9/5', icon: Users }
      ],
      quote: {
        text: 'ECHO AI has been a game-changer for our real estate business. We never miss a property inquiry now, and our agents can focus on delivering exceptional in-person service. It\'s like having a dedicated receptionist at every property.',
        author: 'Carlos Rodriguez',
        role: 'Operations Director',
        company: 'Cinco Real Estate'
      }
    },
    impact: [
      'Zero missed calls during peak hours',
      'Increased revenue through higher reservation conversion',
      'Improved staff morale by reducing phone interruptions',
      'Enhanced guest experience with consistent service across all locations'
    ]
  },
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
      paragraphs: [
        'Creative Orbit managed over 100+ active clients across various industries. Their team spent countless hours on routine follow-up calls, project status updates, and feedback collection. This manual process was time-consuming and took away from their core creative work.',
        'High volume of routine client check-in calls created significant bottlenecks in their workflow. The team struggled with inconsistent feedback collection across projects, leading to gaps in client communication and delayed project deliveries.',
        'Team burnout from repetitive communication tasks became a growing concern, making it increasingly difficult to scale client communication as the agency continued to grow. The challenge was finding a solution that could automate routine communications while maintaining the personalized touch that Creative Orbit was known for.'
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
    industry: 'Real Estate',
    hero: {
      title: 'How Cinco India Automated Property Inquiries with ECHO AI',
      subtitle: 'Handling thousands of property inquiry calls while delivering exceptional client experience',
      description: 'Cinco, a rapidly growing real estate brand with 25 locations, implemented ECHO AI to manage their high-volume property inquiry system, enabling them to handle peak viewing hours efficiently while maintaining their commitment to client service.'
    },
    challenge: {
      title: 'Handling Peak-Hour Call Overload',
      paragraphs: [
        'Cinco is a rapidly expanding real estate brand with a growing client base. As the company scaled, it began facing challenges in managing heavy call volumes during peak business hours.',
        'Between 6 and 9 PM, when client inquiries peaked, staff were overwhelmed trying to manage phone calls and in-person meetings. This led to missed calls, lost opportunities, and delayed follow-ups, impacting customer satisfaction and sales.',
        'The challenge grew with limited multilingual support, restricting Cinco\'s ability to provide a seamless, personalized experience. To solve this, Cinco looked for a scalable solution to automate routine calls, ensure consistent service, and boost client engagement across locations.'
      ]
    },
    solution: {
      title: 'The ECHO AI Solution',
      description: 'Cinco deployed ECHO AI to handle property inquiry calls, property availability checks, and client inquiries. The system was integrated with their existing property management platform.',
      features: [
        {
          title: 'Smart Property Inquiries',
          description: 'ECHO AI handles property inquiries, viewing appointments, and follow-ups seamlessly',
          icon: Phone
        },
        {
          title: 'Real-time Property Availability',
          description: 'Instant access to property availability across all locations',
          icon: Clock
        },
        {
          title: 'Multi-location Support',
          description: 'Centralized system managing 25 locations simultaneously',
          icon: Users
        },
        {
          title: 'Special Requests',
          description: 'Captures property preferences, viewing schedules, and client requirements',
          icon: CheckCircle
        }
      ]
    },
    results: {
      title: 'Exceptional Results',
      metrics: [
        { label: 'Calls answered', value: '99.8%', icon: Phone },
        { label: 'Increase in inquiries', value: '45%', icon: TrendingUp },
        { label: 'Reduction in missed calls', value: '30%', icon: CheckCircle },
        { label: 'Client satisfaction', value: '4.9/5', icon: Users }
      ],
      quote: {
        text: 'ECHO AI has been a game-changer for our business. We never miss a property inquiry call now, and our staff can focus on delivering exceptional in-person service. It\'s like having a dedicated receptionist at every location.',
        author: 'Carlos Rodriguez',
        role: 'Operations Director',
        company: 'Cinco Real Estate'
      }
    },
    impact: [
      'Zero missed calls during peak hours',
      'Increased revenue through higher inquiry conversion',
      'Improved staff morale by reducing phone interruptions',
      'Enhanced client experience with consistent service across all locations'
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
        className="pt-8 pb-12 md:pt-14 md:pb-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-full md:max-w-[90%] lg:max-w-[80%] mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 md:p-12 lg:p-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left Content */}
                <div className="text-left order-2 md:order-1">
                  <div className="inline-block px-3 py-2 md:px-4 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs md:text-sm font-semibold mb-4 md:mb-6">
                    {selectedCase.industry}
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                    {selectedCase.hero.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-4 md:mb-6 leading-relaxed">
                    {selectedCase.hero.subtitle}
                  </p>
                  <p className="text-base md:text-lg text-white/90 leading-relaxed">
                    {selectedCase.hero.description}
                  </p>
                </div>

                {/* Right Content - Brand Logo */}
                <div className="text-center md:text-right flex justify-center md:justify-end order-1 md:order-2">
                  <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] flex items-center justify-center p-4 md:p-8">
                    {selectedCase.id === 'creative-orbit' ? (
                      <img 
                          src="/creative_orbit.png" 
                        alt="Creative Orbit Logo" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <img 
                        src="/cinco_logo.png" 
                        alt="Cinco Logo" 
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Challenge Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="py-12 md:py-16 bg-white relative"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-full md:max-w-[90%] lg:max-w-[85%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch relative">
              {/* Left side content */}
              <div className="md:col-span-1 p-4 md:p-8 order-1 md:order-1 flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black md:text-gray-900 mb-6 md:mb-8 leading-tight">
                    {selectedCase.challenge.title}
                  </h2>
                
                {/* Challenge paragraphs */}
                <div className="space-y-4 md:space-y-6">
                  {selectedCase.challenge.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-base md:text-lg text-black md:text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
               {/* Right side with dynamic challenge image - Independent for each case study */}
              <div className="md:col-span-1 flex justify-center items-start order-2 md:order-2">
                <div className="w-full h-full flex items-start justify-center overflow-hidden pt-12">
                  <img 
                    src={selectedCase.id === 'cinco' ? '/cat.png' : '/challenge.png'} 
                    alt="Challenge Illustration" 
                    className="w-full h-auto rounded-t-2xl rounded-b-lg shadow-lg object-contain transform scale-125"
                    style={{ minHeight: '450px', maxHeight: '500px' }}
                  />
                </div>
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
         className="py-16 md:py-20 lg:py-24 bg-white"
      >
        <div className="container mx-auto px-4">
           <div className="max-w-full md:max-w-6xl lg:max-w-7xl mx-auto">
             {/* Section Title */}
             <div className="text-center mb-12 md:mb-16 lg:mb-20">
               <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-black md:text-[#1A2B47] mb-6 md:mb-8 leading-tight" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', letterSpacing: '-0.02em' }}>
                 The ECHO AI Solutions
              </h2>
               <p className="text-lg md:text-xl lg:text-2xl text-black md:text-[#1A2B47] max-w-4xl mx-auto leading-relaxed opacity-80">
                {selectedCase.solution.description}
              </p>
            </div>

             {/* Two-Column Layout */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
               {/* Left Column - Features */}
               <div className="space-y-8 md:space-y-10 lg:space-y-12 order-2 lg:order-1">
              {selectedCase.solution.features.map((feature, index) => {
                const Icon = feature.icon
                return (
                     <motion.div 
                    key={index}
                       initial={{ opacity: 0, x: -50 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: 0.5 + index * 0.2 }}
                       className="group cursor-pointer"
                     >
                       <div className="flex items-start gap-4 md:gap-6">
                         {/* Numbered Circle */}
                         <motion.div 
                           className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#7CAAEB] flex items-center justify-center flex-shrink-0 group-hover:bg-[#7CAAEB] transition-all duration-300"
                           whileHover={{ scale: 1.05 }}
                         >
                           <span className="text-sm md:text-lg font-bold text-black md:text-[#1A2B47] group-hover:text-white transition-colors duration-300">
                             {String(index + 1).padStart(2, '0')}
                           </span>
                         </motion.div>
                         
                         {/* Content */}
                         <motion.div 
                           className="flex-1 group-hover:-translate-y-1 transition-transform duration-300"
                         >
                           <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black md:text-[#1A2B47] mb-3 md:mb-4 leading-tight" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', letterSpacing: '-0.02em' }}>
                             {feature.title}
                           </h3>
                           <p className="text-base md:text-lg text-black md:text-[#1A2B47] leading-relaxed opacity-80" style={{ lineHeight: '1.7' }}>
                             {feature.description}
                           </p>
                         </motion.div>
                       </div>
                     </motion.div>
                   )
                 })}
               </div>

               {/* Right Column - Video */}
               <div className="relative order-1 lg:order-2">
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.8, duration: 0.8 }}
                   className="relative"
                 >
                    {/* Dynamic Visual - Independent for each case study */}
                    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative rounded-3xl shadow-2xl overflow-hidden">
                      {selectedCase.id === 'cinco' ? (
                        <video 
                          src="/solution2.mp4" 
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover rounded-3xl"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : selectedCase.id === 'creative-orbit' ? (
                        <video 
                          src="/challenge.mp4" 
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover rounded-3xl"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img 
                          src="/challenge.png" 
                          alt="Default Solution Illustration" 
                          className="w-full h-full object-cover rounded-3xl"
                        />
                      )}
                      
                      {/* Subtle overlay for better text contrast if needed */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#7CAAEB]/5 pointer-events-none"></div>
                    </div>
                 </motion.div>
               </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Results Section - MonsterRG-style Horizontal Three-Block Layout */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="py-16 md:py-20 lg:py-24 bg-white relative"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-full md:max-w-6xl lg:max-w-7xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#1A2B47] mb-6 md:mb-8 leading-tight" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', letterSpacing: '-0.02em' }}>
                Results That Matter
            </h2>
              <p className="text-xl md:text-2xl text-[#1A2B47] max-w-4xl mx-auto leading-relaxed opacity-80" style={{ lineHeight: '1.7' }}>
                Measurable outcomes that demonstrate ECHO AI&apos;s impact on your business
              </p>
            </div>

            {/* Testimonial Quote - Highlighted Text Style */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative mb-12 md:mb-16 max-w-full md:max-w-6xl lg:max-w-7xl mx-auto text-center px-4"
            >
              {/* Quote Text with Highlight Background */}
              <blockquote className="mb-6 md:mb-8">
                <p className="text-white font-black inline text-xl sm:text-2xl md:text-3xl lg:text-4xl" style={{ lineHeight: '1.2' }}>
                  <span className="bg-[#007bff] px-2 py-1 box-decoration-clone" style={{ lineHeight: '1.2' }}>
                    {selectedCase.id === 'cinco' 
                      ? '"ECHO AI has been a game-changer for our real estate business. We never miss a property inquiry now, and our agents can focus on delivering exceptional in-person service. It\'s like having a dedicated receptionist at every property." '
                      : '"ECHO AI has transformed how we communicate with our clients. We\'re now able to maintain consistent touchpoints with every client while our team focuses on what we do best – creating amazing work." '
                    }
                  </span>
                  <span className="inline-block ml-2 md:ml-4 text-black font-bold text-sm sm:text-base md:text-lg lg:text-xl" style={{ lineHeight: '1.2' }}>
                    {selectedCase.id === 'cinco' ? (
                      <>
                        Carlos Rodriguez<br />
                        Operations Director, Cinco India
                      </>
                    ) : (
                      <>
                        Sarah Mitchell<br />
                        Founder & Creative Director, Creative Orbit
                      </>
                    )}
                  </span>
                </p>
              </blockquote>
            </motion.div>

            {/* Four Separate Text Blocks */}
            <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 mt-12 md:mt-16 text-center">
              {/* Metric 1: Client Satisfaction */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="p-2 sm:p-4 md:p-6"
              >
                <h3 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-black leading-none mb-1 sm:mb-2">
                  4.8/5
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-black leading-tight mb-1">
                  Client Satisfaction
                </p>
                <p className="text-xs md:text-sm lg:text-base text-black/80 leading-relaxed hidden sm:block">
                  Exceptional customer experience ratings
                </p>
              </motion.div>

              {/* Metric 2: Efficiency Gains (75%) */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="p-2 sm:p-4 md:p-6"
              >
                <h3 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-black leading-none mb-1 sm:mb-2">
                  75%
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-black leading-tight mb-1">
                  Efficiency Gains
                </p>
                <p className="text-xs md:text-sm lg:text-base text-black/80 leading-relaxed hidden sm:block">
                  Reduction in manual calls
                </p>
              </motion.div>

              {/* Metric 3: Efficiency Gains (40+) */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="p-2 sm:p-4 md:p-6"
              >
                <h3 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-black leading-none mb-1 sm:mb-2">
                  40+
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-black leading-tight mb-1">
                  Efficiency Gains
                </p>
                <p className="text-xs md:text-sm lg:text-base text-black/80 leading-relaxed hidden sm:block">
                  Hours saved per week
                </p>
              </motion.div>

              {/* Metric 4: Engagement Boost */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="p-2 sm:p-4 md:p-6"
              >
                <h3 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-black leading-none mb-1 sm:mb-2">
                  60%
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-black leading-tight mb-1">
                  Engagement Boost
                </p>
                <p className="text-xs md:text-sm lg:text-base text-black/80 leading-relaxed hidden sm:block">
                  Increase in feedback response rate
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Business Impact Section - Portuguese Event Style */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="py-16 md:py-20 pb-24 md:pb-32 bg-gradient-to-br from-[#1A2B47] to-[#00004C]"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-full md:max-w-6xl lg:max-w-7xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-wide mb-4">
                Business Impact
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Measurable outcomes that demonstrate ECHO AI&apos;s transformative effect
              </p>
            </div>

            {/* Three Impact Cards */}
            <div className="space-y-6 md:grid md:grid-cols-3 md:gap-8 md:space-y-0 lg:gap-12">
              {/* Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="relative w-full"
              >
                {/* Number */}
                <div className="flex items-center justify-center md:justify-start mb-4 md:mb-6">
                  <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-[#00A9FF] mr-2 md:mr-4">01</div>
                  <div className="flex-1 h-0.5 bg-[#00A9FF] hidden md:block"></div>
                </div>
                
                {/* Card */}
                <div className="bg-[#1A2B47] border border-[#00A9FF] rounded-2xl p-6 md:p-8 h-full">
                  <p className="text-white text-base md:text-lg leading-relaxed text-center md:text-left">
                    {selectedCase.id === 'cinco' 
                      ? "Scaled property inquiry management by 3x without adding staff, handling peak viewing hours seamlessly"
                      : "Scaled client communication by 3x without adding headcount, maintaining consistent touchpoints"
                    }
                  </p>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="relative w-full"
              >
                {/* Number */}
                <div className="flex items-center justify-center md:justify-start mb-4 md:mb-6">
                  <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-[#00A9FF] mr-2 md:mr-4">02</div>
                  <div className="flex-1 h-0.5 bg-[#00A9FF] hidden md:block"></div>
                </div>
                
                {/* Card */}
                <div className="bg-[#1A2B47] border border-[#00A9FF] rounded-2xl p-6 md:p-8 h-full">
                  <p className="text-white text-base md:text-lg leading-relaxed text-center md:text-left">
                    {selectedCase.id === 'cinco' 
                      ? "Improved property sales process by reducing inquiry response delays and streamlining client communications"
                      : "Improved project delivery timelines by reducing communication delays and enhancing workflow efficiency"
                    }
                  </p>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="relative w-full"
              >
                {/* Number */}
                <div className="flex items-center justify-center md:justify-start mb-4 md:mb-6">
                  <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-[#00A9FF] mr-2 md:mr-4">03</div>
                  <div className="flex-1 h-0.5 bg-[#00A9FF] hidden md:block"></div>
                </div>
                
                {/* Card */}
                <div className="bg-[#1A2B47] border border-[#00A9FF] rounded-2xl p-6 md:p-8 h-full">
                  <p className="text-white text-base md:text-lg leading-relaxed text-center md:text-left">
                    {selectedCase.id === 'cinco' 
                      ? "Enhanced client satisfaction through consistent and timely property inquiry management"
                      : "Enhanced client satisfaction through consistent and timely follow-ups, building stronger relationships"
                    }
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="container mx-auto px-4">
          <div className="max-w-full md:max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8">
              Join {selectedCase.company} and hundreds of other companies using ECHO AI to automate customer communications.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link 
                href="/#contact"
                className="px-6 py-3 md:px-8 md:py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 text-sm md:text-base"
              >
                Book a Demo
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link 
                href="/#contact"
                className="px-6 py-3 md:px-8 md:py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2 text-sm md:text-base"
              >
                Talk to Sales
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
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




