import { HeroSection } from '@/components/hero-section'
import { TrustBar } from '@/components/trust-bar'
import { BenefitsSection } from '@/components/benefits-section'
import { CustomizationSection } from '@/components/customization-section'
import { FeaturesSection } from '@/components/features-section'
import { ContactSection } from '@/components/contact-section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <BenefitsSection />
      <CustomizationSection />
      <FeaturesSection />
      <ContactSection />
    </>
  )
}

