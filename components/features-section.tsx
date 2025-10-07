"use client"

import React from "react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Phone, 
  Mic, 
  Database, 
  Zap, 
  BarChart3, 
  MessageSquare, 
  Clock, 
  Users, 
  Eye, 
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Voice Conversation",
    description: "AI agents engage customers with natural, human-like conversations using advanced speech recognition and synthesis.",
    icon: Mic,
    features: ["Real-time speech processing", "Natural language understanding", "Emotional tone detection", "Multi-language support"],
    color: "from-blue-500 to-blue-600"
  },
  {
    number: "02", 
    title: "Data Collection",
    description: "Intelligently gather customer feedback, preferences, and insights during every conversation.",
    icon: Database,
    features: ["Structured data capture", "Sentiment analysis", "Key metrics tracking", "Real-time insights"],
    color: "from-purple-500 to-purple-600"
  },
  {
    number: "03",
    title: "Action Triggers",
    description: "Automatically initiate follow-up actions based on conversation outcomes and customer responses.",
    icon: Zap,
    features: ["Email automation", "WhatsApp messaging", "CRM updates", "Task assignments"],
    color: "from-green-500 to-green-600"
  },
  {
    number: "04",
    title: "Analytics & Reporting",
    description: "Gain deep insights into customer interactions with comprehensive analytics and reporting tools.",
    icon: BarChart3,
    features: ["Performance dashboards", "Customer journey mapping", "ROI tracking", "Custom reports"],
    color: "from-orange-500 to-orange-600"
  }
]

const features = [
  {
    icon: MessageSquare,
    title: "Intelligent Conversations",
    description: "AI that understands context, emotions, and intent for meaningful customer interactions.",
    stats: "95% accuracy"
  },
  {
    icon: Clock,
    title: "Real-time Processing",
    description: "Instant responses and actions with sub-second latency for seamless customer experience.",
    stats: "Instant Response"
  },
  {
    icon: Users,
    title: "Scalable Operations",
    description: "Handle thousands of concurrent conversations without compromising quality or performance.",
    stats: "Unlimited calls"
  },
  {
    icon: Eye,
    title: "Complete Visibility",
    description: "Monitor and analyze every conversation with detailed logs and performance metrics.",
    stats: "100% tracking"
  }
]

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [stepProgress, setStepProgress] = useState([false, false, false, false])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById("features")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  // Scroll-based step progression
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("features")
      if (!element || !isVisible) return

      const rect = element.getBoundingClientRect()
      const elementHeight = element.offsetHeight
      const viewportHeight = window.innerHeight
      
      // Calculate scroll progress within the section
      const scrollStart = -rect.top + viewportHeight * 0.3
      const progress = Math.max(0, Math.min(1, scrollStart / (elementHeight * 0.8)))
      
      // Determine which steps should be active based on scroll progress
      const newStepProgress = steps.map((_, index) => {
        const stepThreshold = (index + 1) / steps.length
        return progress >= stepThreshold - 0.2
      })
      
      setStepProgress(newStepProgress)
      
      // Set active step
      const newActiveStep = Math.floor(progress * steps.length)
      setActiveStep(Math.min(newActiveStep, steps.length - 1))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  return (
    <section id="how-it-works" className="py-20" style={{ background: 'transparent' }}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            How ECHO AI Works
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Our intelligent voice AI system transforms customer conversations into actionable insights and automated workflows.
          </p>
        </motion.div>

        {/* Interactive Steps Flow */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 via-green-500 to-orange-500 transform -translate-x-1/2 hidden md:block" />

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: false, margin: "-100px" }}
                className={`step-item fade-up grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center ${
                  index % 2 === 1 ? 'md:grid-flow-col-dense' : ''
                }`}
              >
                {/* Step Content */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: false, margin: "-100px" }}
                  className={`space-y-6 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg`}>
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {step.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.5 + idx * 0.1 }}
                        viewport={{ once: false, margin: "-100px" }}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Step Visual */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: false, margin: "-100px" }}
                  className={`relative hidden sm:flex justify-center items-center h-48 sm:h-56 md:h-64 ${index % 2 === 1 ? 'md:col-start-1' : ''}`}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br ${step.color} shadow-xl flex items-center justify-center`}>
                      <step.icon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/30 rounded-full animate-pulse" />
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 1, y: 0 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="relative"
              >
                <Card className="h-full hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="text-2xl font-bold text-white">{feature.stats}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-20"
        >
          <Card className="max-w-8xl mx-auto bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Customer Engagement?
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Experience the power of intelligent voice AI that understands, engages, and converts your customers like never before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold rounded-full shadow-lg">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
                <Button variant="outline" size="lg" className="border-primary/30 text-white hover:bg-primary/10 px-8 py-3 text-lg font-semibold rounded-full">
                  Watch Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}