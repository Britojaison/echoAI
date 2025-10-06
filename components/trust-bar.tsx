"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

const companies = [  
  { name: "", logo: "SS", logoImage: "/SS_logomark.png" },
  { name: "", logo: "JLL", logoImage: "/JLL.png" },
  { name: "", logo: "Paytm", logoImage: "/Paytm.png" },
  { name: "", logo: "Chaatpot", logoImage: "/Chaatpot.png" },
  { name: "", logo: "Gardener", logoImage: "/Gardener.png" },  
  { name: "", logo: "ELDA", logoImage: "/ELDA.png" }, 
  { name: "", logo: "ITILITE", logoImage: "/ITILITE.png" },
  { name: "Black Tulip Flowers", logo: "Tulips"},  
   
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
    <section id="trust-bar" className="py-16 mt-40">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 1 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden"
        >
          {/* Gradient overlays for smooth fade */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50/5 to-transparent z-10" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50/5 to-transparent z-10" />

          {/* Scrolling companies */}
          <div className="flex items-center space-x-16 animate-scroll">
            {/* First set */}
            {companies.map((company, index) => (
              <motion.div
                key={`first-${index}`}
                initial={{ opacity: 1, scale: 1 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex-shrink-0 flex items-center justify-center group cursor-pointer opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  {company.name === 'Black Tulip Flowers' ? null : (
                    <div className={`flex items-center justify-center ${company.logo === 'Tulips' ? 'w-36 h-14' : 'w-28 h-12'}`}>
                      {company.logoImage ? (
                        <Image
                          src={company.logoImage}
                          alt={`${company.name || company.logo} logo`}
                          width={120}
                          height={60}
                          className="max-h-full max-w-full object-contain filter saturate-0 group-hover:saturate-100 transition-all duration-300"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{company.logo}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {(company.name === 'Super Saravana Stores' || company.name === 'Black Tulip Flowers') && (
                    <span className={`text-lg font-semibold text-gray-400 transition-colors duration-300 whitespace-nowrap ${
                      company.name === 'Black Tulip Flowers' 
                        ? 'group-hover:text-green-600' 
                        : 'group-hover:text-gray-600'
                    }`}>
                      {company.name}
                    </span>
                  )}
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
                className="flex-shrink-0 flex items-center justify-center group cursor-pointer opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  {company.name === 'Black Tulip Flowers' ? null : (
                    <div className={`flex items-center justify-center ${company.logo === 'Tulips' ? 'w-36 h-14' : 'w-28 h-12'}`}>
                      {company.logoImage ? (
                        <Image
                          src={company.logoImage}
                          alt={`${company.name || company.logo} logo`}
                          width={120}
                          height={60}
                          className="max-h-full max-w-full object-contain filter saturate-0 group-hover:saturate-100 transition-all duration-300"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{company.logo}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {(company.name === 'Super Saravana Stores' || company.name === 'Black Tulip Flowers') && (
                    <span className={`text-lg font-semibold text-gray-400 transition-colors duration-300 whitespace-nowrap ${
                      company.name === 'Black Tulip Flowers' 
                        ? 'group-hover:text-green-600' 
                        : 'group-hover:text-gray-600'
                    }`}>
                      {company.name}
                    </span>
                  )}
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

