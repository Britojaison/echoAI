"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Phone, 
  Calendar, 
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
  const [activeForm, setActiveForm] = useState<'demo' | 'sales'>('demo')

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

  const demoFeatures = [
    "Live AI voice agent demonstration",
    "Custom conversation flow examples",
    "Integration capabilities overview",
    "ROI and performance metrics",
    "Q&A session with our experts"
  ]

  const salesBenefits = [
    "Personalized solution consultation",
    "Custom pricing and packaging",
    "Implementation timeline planning",
    "Technical requirements assessment",
    "Dedicated account manager assignment"
  ]

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Get{" "}
            <span className="gradient-text">Started</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose how you&apos;d like to connect with us. Book a demo to see ECHO AI in action, 
            or talk to our sales team for a personalized consultation.
          </p>
        </motion.div>

        {/* Form Toggle */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-muted/50 p-1 rounded-lg flex">
            <button
              onClick={() => setActiveForm('demo')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeForm === 'demo'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Book Demo
            </button>
            <button
              onClick={() => setActiveForm('sales')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeForm === 'sales'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Phone className="w-4 h-4 inline mr-2" />
              Talk to Sales
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {activeForm === 'demo' ? (
                    <>
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>Book a Demo</span>
                    </>
                  ) : (
                    <>
                      <Phone className="w-5 h-5 text-primary" />
                      <span>Talk to Sales</span>
                    </>
                  )}
                </CardTitle>
                <p className="text-muted-foreground">
                  {activeForm === 'demo' 
                    ? "Schedule a personalized demonstration of ECHO AI's capabilities."
                    : "Get a customized consultation for your specific business needs."
                  }
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <Input placeholder="John" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <Input placeholder="Doe" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input type="email" placeholder="john@company.com" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Company *</label>
                    <Input placeholder="Your Company Name" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input type="tel" placeholder="+1 (555) 123-4567" />
                  </div>

                  {activeForm === 'demo' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Use Case</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                        <option>Customer Feedback Collection</option>
                        <option>Lead Qualification</option>
                        <option>Customer Support</option>
                        <option>Market Research</option>
                        <option>Appointment Scheduling</option>
                        <option>Other</option>
                      </select>
                    </div>
                  )}

                  {activeForm === 'sales' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Company Size</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                        <option>1-10 employees</option>
                        <option>11-50 employees</option>
                        <option>51-200 employees</option>
                        <option>201-1000 employees</option>
                        <option>1000+ employees</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {activeForm === 'demo' ? 'Additional Notes' : 'Project Details'}
                    </label>
                    <Textarea 
                      placeholder={
                        activeForm === 'demo' 
                          ? "Tell us about your specific use case or any questions you have..."
                          : "Describe your project requirements, timeline, and specific needs..."
                      }
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    {activeForm === 'demo' ? 'Schedule Demo' : 'Contact Sales Team'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            {/* What You'll Get */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>
                    {activeForm === 'demo' ? 'What You\'ll See' : 'What You\'ll Get'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(activeForm === 'demo' ? demoFeatures : salesBenefits).map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
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
                      <div className="text-sm text-muted-foreground">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">hello@echoai.com</div>
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
                      <div className="text-sm text-muted-foreground">
                        {activeForm === 'demo' ? 'Within 2 hours' : 'Within 30 minutes'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Signals */}
            <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Trusted by 500+ Companies</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Join industry leaders who have transformed their customer engagement with ECHO AI.
                  </p>
                  <div className="flex justify-center space-x-4 text-xs">
                    <div className="text-center">
                      <div className="font-bold text-primary">95%</div>
                      <div className="text-muted-foreground">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-primary">24/7</div>
                      <div className="text-muted-foreground">Support</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-primary">99.9%</div>
                      <div className="text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

