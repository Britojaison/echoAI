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
    <section id="benefits" className="md:py-20" style={{ background: 'transparent' }}>
      <div className="container mx-auto px-4">
        <div className="space-y-20 md:space-y-40">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 1, y: 0 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content Column */}
              <motion.div
                className={`space-y-4 sm:space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                initial={{ opacity: 1, x: 0 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {benefit.title}
                </h2>
                
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>

                <Button variant="ghost" className="text-white hover:text-primary p-0 h-auto font-medium text-lg group">
                  Learn More 
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              {/* Animation Column */}
              <motion.div
                className={`relative flex justify-center items-center h-40 sm:h-64 lg:h-96 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                initial={{ opacity: 1, x: 0 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
              >
                {index === 0 ? (
                  /* Language Cluster for Multilingual Support */
                  <motion.div
                    className="relative w-96 h-96 sm:w-[36rem] sm:h-[36rem] lg:w-[40rem] lg:h-[40rem] flex items-center justify-center overflow-visible"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.7 }}
                  >
                    {/* All languages - arranged in a circular pattern with equal spacing */}
                    {(() => {
                      const languages = [
                        { text: "हिंदी", lang: "Hindi" },
                        { text: "English", lang: "English" },
                        { text: "தமிழ்", lang: "Tamil" },
                        { text: "తెలుగు", lang: "Telugu" },
                        { text: "ಕನ್ನಡ", lang: "Kannada" },
                        { text: "বাংলা", lang: "Bangla" },
                        { text: "ਪੰਜਾਬੀ", lang: "Punjabi" },
                        { text: "اردو", lang: "Urdu" },
                        { text: "Español", lang: "Spanish" },
                        { text: "العربية", lang: "Arabic" },
                      ]
                      const radius = 110 // Circle radius - increased significantly for better readability
                      const angleStep = (2 * Math.PI) / languages.length // Equal angle between each language
                      const startAngle = -Math.PI / 2 // Start from top (12 o'clock position)
                      
                      return languages.map((lang, index) => {
                        const angle = startAngle + (index * angleStep)
                        const x = radius * Math.cos(angle)
                        const y = radius * Math.sin(angle)
                        
                        return {
                          ...lang,
                          delay: index * 0.1,
                          x: Math.round(x),
                          y: Math.round(y),
                          opacity: index === 1 ? [0.6, 1, 0.6] : [0.4, 0.9, 0.4], // English slightly brighter
                          z: index % 3
                        }
                      })
                    })().map((lang, langIndex) => (
                      <motion.div
                        key={lang.lang}
                        className="absolute text-2xl sm:text-3xl lg:text-4xl font-semibold whitespace-nowrap pointer-events-none text-white"
                        style={{
                          x: lang.x,
                          y: lang.y,
                          zIndex: lang.z,
                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", sans-serif',
                        }}
                        initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
                        animate={isVisible ? {
                          opacity: lang.opacity,
                          scale: [0.9, 1.1, 0.9],
                          rotate: [-3, 3, -3],
                          x: lang.x,
                          y: lang.y,
                        } : { opacity: 0, scale: 0.5 }}
                        transition={{
                          duration: 4 + langIndex * 0.3,
                          delay: lang.delay,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          opacity: {
                            duration: 5 + langIndex * 0.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatType: "reverse"
                          },
                          scale: {
                            duration: 4 + langIndex * 0.3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatType: "reverse"
                          },
                          rotate: {
                            duration: 6 + langIndex * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatType: "reverse"
                          }
                        }}
                      >
                        {lang.text}
                      </motion.div>
                    ))}
                    
                    {/* Floating circles */}
                    <motion.div
                      className="absolute -top-8 -right-8 w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/30 rounded-full blur-sm"
                      animate={isVisible ? {
                        y: [0, -15, 0],
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1]
                      } : { opacity: 0 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-8 -left-8 w-12 h-12 sm:w-16 sm:h-16 bg-purple-500/30 rounded-full blur-sm"
                      animate={isVisible ? {
                        y: [0, 15, 0],
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1]
                      } : { opacity: 0 }}
                      transition={{
                        duration: 3,
                        delay: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                ) : (
                  /* Default icon animation for other benefits */
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
                    {/* Animated Icon Only */}
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
                        className="w-12 h-12 sm:w-16 sm:h-16 text-white" 
                      />
                    </motion.div>

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
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

