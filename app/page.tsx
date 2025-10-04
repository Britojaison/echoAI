import { HeroSection } from '@/components/hero-section'
import { TrustBar } from '@/components/trust-bar'
import { BenefitsSection } from '@/components/benefits-section'
import { CustomizationSection } from '@/components/customization-section'
import { FeaturesSection } from '@/components/features-section'
import { ContactSection } from '@/components/contact-section'
import { VoicePulseBackground } from '@/components/voice-pulse-background'

export default function Home() {
  return (
    <>
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

