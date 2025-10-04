"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const companies = [
  { name: "TechCorp", logo: "TC" },
  { name: "Global Solutions", logo: "GS" },
  { name: "InnovateX", logo: "IX" },
  { name: "Digital First", logo: "DF" },
  { name: "Cloud Systems", logo: "CS" },
  { name: "AI Ventures", logo: "AV" },
  { name: "Smart Business", logo: "SB" },
  { name: "Future Tech", logo: "FT" },
]

export function TrustBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById("trust-bar")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section id="trust-bar" className="py-12" style={{ background: 'transparent' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
        
        </motion.div>

        <motion.div
          initial={{ opacity: 1 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden"
        >
          {/* Gradient overlays for smooth fade */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10" />

          {/* Scrolling companies */}
          <div className="flex items-center space-x-12 animate-scroll">
            {/* First set */}
            {companies.map((company, index) => (
              <motion.div
                key={`first-${index}`}
                initial={{ opacity: 1, scale: 1 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex-shrink-0 flex items-center justify-center group cursor-pointer"
              >
                <div className="w-32 h-16 bg-card border border-border rounded-lg flex items-center justify-center transition-all duration-300 group-hover:border-primary/50 group-hover:bg-card/80">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-1">
                      <span className="text-white text-xs font-bold">{company.logo}</span>
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      {company.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Duplicate set for seamless loop */}
            {companies.map((company, index) => (
              <motion.div
                key={`second-${index}`}
                initial={{ opacity: 1, scale: 1 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex-shrink-0 flex items-center justify-center group cursor-pointer"
              >
                <div className="w-32 h-16 bg-card border border-border rounded-lg flex items-center justify-center transition-all duration-300 group-hover:border-primary/50 group-hover:bg-card/80">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-1">
                      <span className="text-white text-xs font-bold">{company.logo}</span>
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      {company.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center"
        >
          <div>
            <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">50+</div>
            <div className="text-sm text-muted-foreground">Companies</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">1M+</div>
            <div className="text-sm text-muted-foreground">Calls Made</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">95%</div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

