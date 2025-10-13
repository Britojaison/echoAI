"use client"

import React from "react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Palette, 
  MessageCircle, 
  Workflow, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Settings,
  Users,
  Globe,
  Shield,
  Send
} from "lucide-react"

const customizationFeatures = [
  {
    icon: Palette,
    title: "Brand Voice & Tone",
    description: "Match your unique brand personality with customizable voice characteristics, speaking style, and conversation tone.",
    features: ["Voice pitch & speed", "Tone adaptation", "Brand vocabulary", "Personality traits"]
  },
  {
    icon: Workflow,
    title: "Custom Conversation Flows",
    description: "Design tailored conversation paths that guide customers through your specific business processes and objectives.",
    features: ["Flow designer", "Conditional logic", "Multi-step processes", "Dynamic responses"]
  },
  {
    icon: Settings,
    title: "Industry Templates",
    description: "Leverage pre-built templates designed for your industry, from healthcare to retail to financial services.",
    features: ["Industry-specific flows", "Best practices", "Quick setup", "Expert insights"]
  },
  {
    icon: Send,
    title: "Integration Capabilities",
    description: "Seamlessly connect with your existing tools and systems for a unified customer experience.",
    features: ["CRM integration", "API connections", "Webhook support", "Real-time sync"]
  }
]

const integrations = [
  { name: "Salesforce", logo: "SF" },
  { name: "HubSpot", logo: "HS" },
  { name: "Zendesk", logo: "ZE" },
  { name: "Slack", logo: "SL" },
  { name: "Microsoft Teams", logo: "MS" },
  { name: "WhatsApp Business", logo: "WA" },
]

export function CustomizationSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById("customization")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  // Scroll progress tracking for cascade effect
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("customization")
      if (!element) return

      const rect = element.getBoundingClientRect()
      const elementHeight = element.offsetHeight
      const viewportHeight = window.innerHeight
      
      // Calculate scroll progress within the section
      const scrollStart = -rect.top + viewportHeight * 0.5
      const scrollEnd = scrollStart + elementHeight
      const progress = Math.max(0, Math.min(1, scrollStart / elementHeight))
      
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="customization" className="py-20 bg-gradient-to-br from-background to-background/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Complete{" "}
            <span className="gradient-text">Customization</span>{" "}
            for Your Brand
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-6xl mx-auto leading-relaxed">
            Every conversation should feel authentically yours. Customize every aspect 
            of your AI voice agents to align perfectly with your brand and business needs.
          </p>
        </motion.div>

        {/* Creative Grid Layout for Four Customization Points */}
        <div className="relative max-w-8xl mx-auto">

          {/* Four Customization Cards in Diamond Formation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 max-w-8xl mx-auto">
            {customizationFeatures.map((feature, index) => {
              const delay = 0.4 + index * 0.15

              return (
                <motion.div
                  key={feature.title}
                  initial={{ 
                    opacity: 1, 
                    scale: 1,
                    x: 0,
                    y: 0
                  }}
                  animate={isVisible ? { 
                    opacity: 1, 
                    scale: 1,
                    x: 0,
                    y: 0
                  } : { opacity: 1, scale: 1, x: 0, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: delay,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="relative"
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    z: 50,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div
                    className="p-4 sm:p-6 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-card/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                    whileHover={{ y: -5 }}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <motion.div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg bg-muted text-muted-foreground"
                        animate={{ 
                          y: [0, -4, 0],
                          rotate: [0, 3, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      >
                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </motion.div>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-lg sm:text-xl font-bold text-center">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base text-center leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {/* Feature Tags */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {feature.features.slice(0, 2).map((item, idx) => (
                          <motion.span
                            key={idx}
                            className="px-2 sm:px-3 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground"
                            whileHover={{ scale: 1.05 }}
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Floating Particles - Hidden on mobile for better performance */}
          <div className="hidden sm:block">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full"
                style={{
                  top: `${20 + (i * 10)}%`,
                  left: `${15 + (i * 10)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="max-w-8xl mx-auto bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Brand Consistency</h4>
                  <p className="text-sm text-muted-foreground">Maintain your brand voice across all customer touchpoints</p>
                </div>
                <div className="text-center">
                  <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Global Reach</h4>
                  <p className="text-sm text-muted-foreground">Engage customers in their preferred language and culture</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Enterprise Security</h4>
                  <p className="text-sm text-muted-foreground">Bank-grade security with complete data protection</p>
                </div>
              </div>
              <Button size="lg" className="px-8">
                Start Customizing Your AI Agent
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
