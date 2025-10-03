"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  MessageSquare, 
  Globe, 
  Shield, 
  Zap,
  ArrowRight,
  Languages,
  Settings,
  Lock,
  Send,
  Headphones
} from "lucide-react"

const benefits = [
  {
    icon: Languages,
    title: "Multilingual Support",
    description: "Engage customers in English and regional languages with native-level conversation capabilities and cultural understanding.",
    color: "#8B5CF6",
    layer: 1
  },
  {
    icon: Settings,
    title: "Complete Customization",
    description: "Tailor conversation flows, voice tone, and responses to match your brand personality and specific business needs.",
    color: "#FFFFFF",
    layer: 2
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption, compliance certifications, and robust data protection measures.",
    color: "#8B5CF6",
    layer: 3
  },
  {
    icon: Send,
    title: "Multi-Channel Actions",
    description: "Trigger automated follow-up actions across email, WhatsApp, and other channels based on conversation outcomes.",
    color: "#FFFFFF",
    layer: 4
  }
]

export function BenefitsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeLayer, setActiveLayer] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById("benefits")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  // Auto-cycle through layers
  useEffect(() => {
    if (!isVisible) return
    
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % benefits.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section id="benefits" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="space-y-32">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 1, y: 0 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content Column */}
              <motion.div
                className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                initial={{ opacity: 1, x: 0 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {benefit.title}
                </h2>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>

                <Button variant="ghost" className="text-white hover:text-primary p-0 h-auto font-medium text-lg group">
                  Learn More 
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              {/* Animation Column */}
              <motion.div
                className={`relative flex justify-center items-center h-96 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                initial={{ opacity: 1, x: 0 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
              >
                {/* Benefit-specific Animation */}
                <motion.div
                  className="relative perspective-1000"
                  initial={{ scale: 1, rotateY: 0 }}
                  animate={isVisible ? { scale: 1, rotateY: 0 } : { scale: 1, rotateY: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: index * 0.2 + 0.7,
                    type: "spring",
                    stiffness: 80
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Animated Layer */}
                  <div 
                    className="w-80 h-40 rounded-lg border-2 shadow-2xl cursor-pointer transition-all duration-300"
                    style={{ 
                      backgroundColor: benefit.color,
                      borderColor: '#3B82F6',
                      boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <motion.div
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <benefit.icon 
                            className={`w-16 h-16 mx-auto mb-4 ${
                              benefit.color === '#FFFFFF' ? 'text-gray-800' : 'text-white'
                            }`} 
                          />
                        </motion.div>
                        <h3 className={`text-2xl font-bold ${
                          benefit.color === '#FFFFFF' ? 'text-gray-800' : 'text-white'
                        }`}>
                          {benefit.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/30 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/30 rounded-full"
                    animate={{
                      y: [0, 10, 0],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5 + 1
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

