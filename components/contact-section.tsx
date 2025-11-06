"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock,
  CheckCircle,
  Users,
  ArrowRight,
  Headphones,
  Zap
} from "lucide-react"

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    useCase: "Customer Feedback Collection",
    notes: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById("contact")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const salesBenefits = [
    "Personalized solution consultation",
    "Custom pricing and packaging",
    "Implementation timeline planning",
    "Technical requirements assessment",
    "Dedicated account manager assignment"
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
    // Clear submit status when user makes changes
    if (submitStatus) {
      setSubmitStatus(null)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus(null)

    if (!validateForm()) return

    try {
      setLoading(true)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit form")
      }

      // Success
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Our sales team will contact you within 2 hours.'
      })
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        company: "",
        useCase: "Customer Feedback Collection",
        notes: ""
      })

      // Scroll to success message
      setTimeout(() => {
        const contactElement = document.getElementById("contact")
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)

    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error?.message || "Something went wrong. Please try again or contact us directly."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20" style={{ background: 'transparent' }}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Get{" "}
            <span className="gradient-text">Started</span>?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get in touch with our sales team for a personalized consultation and learn how Infini8 Voice can transform your business.
          </p>
        </motion.div>


        {/* Talk to Sales Section - Full Width */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="w-full bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
                <Phone className="w-6 h-6 text-primary" />
                <span>Talk to Sales</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Get in touch with our sales team to discuss your specific needs and requirements.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                {/* Success/Error Messages */}
                {submitStatus && (
                  <div className={`p-4 rounded-lg ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-500/20 border border-green-500/50 text-green-100' 
                      : 'bg-red-500/20 border border-red-500/50 text-red-100'
                  }`}>
                    <p className="text-sm font-medium">{submitStatus.message}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <Input 
                      placeholder="John" 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={errors.firstName ? "border-red-500" : ""}
                      disabled={loading}
                      required 
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <Input 
                      placeholder="Doe" 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={errors.lastName ? "border-red-500" : ""}
                      disabled={loading}
                      required 
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input 
                    type="email" 
                    placeholder="john@company.com" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                    disabled={loading}
                    required 
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <Input 
                    type="tel" 
                    placeholder="+1 (555) 123-4567" 
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={errors.phoneNumber ? "border-red-500" : ""}
                    disabled={loading}
                    required 
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input 
                    placeholder="Your Company Name" 
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Use Case</label>
                  <select 
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    value={formData.useCase}
                    onChange={(e) => handleInputChange('useCase', e.target.value)}
                    disabled={loading}
                  >
                    <option>Customer Feedback Collection</option>
                    <option>Lead Qualification</option>
                    <option>Customer Support</option>
                    <option>Market Research</option>
                    <option>Appointment Scheduling</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Notes</label>
                  <Textarea 
                    placeholder="Tell us about your specific use case or any questions you have..."
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    disabled={loading}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Two Column Section - What You'll See & Get in Touch */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* What You'll See */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="h-full bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>What You&apos;ll See</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {salesBenefits.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Get in Touch */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="h-full bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Headphones className="w-5 h-5 text-primary" />
                  <span>Get in Touch</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-sm text-muted-foreground">+91 9876543210</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">connect@88gb.in</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium">Live Chat</div>
                      <div className="text-sm text-muted-foreground">Available 24/7</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium">Response Time</div>
                      <div className="text-sm text-muted-foreground">Within 2 hours</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Trusted by Banner - Full Width */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Card className="w-full bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold mb-4">TRUSTED by 500+ COMPANIES</h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-4xl mx-auto">
                  Join industry leaders who have transformed their customer engagement with Infini8 Voice.
                </p>
                <div className="flex flex-row flex-wrap justify-center gap-6 sm:gap-8 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <div className="text-muted-foreground">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-muted-foreground">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">99.9%</div>
                    <div className="text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

