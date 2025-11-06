import { HeroSection } from '@/components/hero-section'
import { TrustBar } from '@/components/trust-bar'
import { BenefitsSection } from '@/components/benefits-section'
import { CustomizationSection } from '@/components/customization-section'
import { FeaturesSection } from '@/components/features-section'
import { ContactSection } from '@/components/contact-section'
import { VoicePulseBackground } from '@/components/voice-pulse-background'
import { StructuredData } from '@/components/structured-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Infini8 Voice',
  description: 'Automate customer interactions with AI voice calling agents. Collect feedback, qualify leads, and engage customers in English and regional languages. Trusted by 500+ companies worldwide.',
  openGraph: {
    title: 'Infini8 Voice - AI Voice Calling Agents for Customer Engagement',
    description: 'Automate customer interactions with AI voice calling agents. Collect feedback, qualify leads, and engage customers in English and regional languages.',
    url: 'https://infini8voice.com',
    siteName: 'Infini8 Voice',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Infini8 Voice - AI Voice Calling Agents',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infini8 Voice - AI Voice Calling Agents for Customer Engagement',
    description: 'Automate customer interactions with AI voice calling agents. Collect feedback, qualify leads, and engage customers in English and regional languages.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://infini8voice.com',
  },
}

export default function Home() {
  return (
    <>
      <StructuredData />
      {/* Voice pulse background - fixed, non-interactive, behind all content */}
      <VoicePulseBackground />
      
      {/* Main content - rendered above the voice pulse */}
      <div className="relative z-10">
        <HeroSection />
        <TrustBar />
        <BenefitsSection />
        <CustomizationSection />
        <FeaturesSection />
        <ContactSection />
      </div>
    </>
  )
}

