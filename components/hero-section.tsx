"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-[50vh] md:h-[60vh] flex items-end justify-center"
      style={{ background: 'transparent' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-80 items-center max-w-12xl mx-auto lg:ml-5">
          {/* Left Column - Headline */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Voice AI that treats every call like first-class service.
            </h1>
          </motion.div>

          {/* Right Column - CTA */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="text-lg sm:text-xl text-white font-medium">Don&apos;t believe us?</p>
              <p className="text-lg sm:text-xl text-white font-medium">Have ECHO AI give you a call.</p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <Input
                type="tel"
                placeholder="Your Phone Number"
                className="w-full h-12 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-white/50"
              />
              <Button 
                size="lg" 
                className="w-full h-12 bg-white hover:bg-gray-100 text-blue-600 font-medium"
              >
                Let&apos;s Talk
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

