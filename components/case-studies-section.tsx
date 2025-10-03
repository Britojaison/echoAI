"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign,
  ArrowRight,
  Quote,
  Star,
  CheckCircle
} from "lucide-react"

const caseStudies = [
  {
    company: "TechCorp Solutions",
    industry: "Technology",
    logo: "TC",
    challenge: "Struggling with low customer feedback response rates and manual lead qualification processes.",
    solution: "Implemented ECHO AI voice agents for automated feedback collection and lead scoring.",
    results: {
      responseRate: "85%",
      leadQuality: "60%",
      timeSaved: "75%",
      revenue: "40%"
    },
    quote: "ECHO AI transformed how we engage with customers. The automated feedback collection alone increased our response rates by 300%.",
    author: "Sarah Johnson, VP of Customer Success",
    rating: 5,
    color: "from-blue-500 to-blue-600"
  },
  {
    company: "RetailMax",
    industry: "Retail",
    logo: "RM",
    challenge: "Need to scale customer support while maintaining personalized experiences across multiple languages.",
    solution: "Deployed multilingual AI voice agents for 24/7 customer support and feedback collection.",
    results: {
      responseRate: "92%",
      leadQuality: "45%",
      timeSaved: "80%",
      revenue: "55%"
    },
    quote: "Our customers love the personalized touch of ECHO AI. It feels like talking to a real person who truly understands their needs.",
    author: "Michael Chen, Head of Operations",
    rating: 5,
    color: "from-green-500 to-green-600"
  },
  {
    company: "HealthCare Plus",
    industry: "Healthcare",
    logo: "HP",
    challenge: "Required HIPAA-compliant patient feedback collection with high security and privacy standards.",
    solution: "Customized ECHO AI solution with enterprise security and compliance features for patient engagement.",
    results: {
      responseRate: "78%",
      leadQuality: "70%",
      timeSaved: "65%",
      revenue: "35%"
    },
    quote: "ECHO AI's security and compliance features gave us confidence to automate patient interactions. The results speak for themselves.",
    author: "Dr. Emily Rodriguez, Chief Medical Officer",
    rating: 5,
    color: "from-purple-500 to-purple-600"
  },
  {
    company: "FinanceFirst",
    industry: "Financial Services",
    logo: "FF",
    challenge: "Need to qualify loan applicants efficiently while maintaining regulatory compliance.",
    solution: "Implemented AI voice agents for initial loan qualification and customer onboarding processes.",
    results: {
      responseRate: "88%",
      leadQuality: "85%",
      timeSaved: "70%",
      revenue: "50%"
    },
    quote: "ECHO AI revolutionized our loan qualification process. We now process 3x more applications with higher accuracy.",
    author: "David Park, Director of Lending",
    rating: 5,
    color: "from-orange-500 to-orange-600"
  },
  {
    company: "EduTech Solutions",
    industry: "Education",
    logo: "ES",
    challenge: "Need to collect student and parent feedback at scale across multiple educational programs.",
    solution: "Deployed ECHO AI for automated feedback collection and parent engagement across all programs.",
    results: {
      responseRate: "90%",
      leadQuality: "55%",
      timeSaved: "85%",
      revenue: "45%"
    },
    quote: "Parent engagement increased dramatically with ECHO AI. The personalized approach makes everyone feel heard and valued.",
    author: "Lisa Thompson, Director of Student Affairs",
    rating: 5,
    color: "from-cyan-500 to-cyan-600"
  },
  {
    company: "AutoDrive Motors",
    industry: "Automotive",
    logo: "AM",
    challenge: "Need to collect post-purchase feedback and identify upsell opportunities for service packages.",
    solution: "Implemented ECHO AI for automated customer follow-up and service package qualification.",
    results: {
      responseRate: "82%",
      leadQuality: "65%",
      timeSaved: "60%",
      revenue: "60%"
    },
    quote: "ECHO AI helped us maintain strong relationships with customers post-purchase. Service package sales increased significantly.",
    author: "Robert Kim, Customer Relations Manager",
    rating: 5,
    color: "from-red-500 to-red-600"
  }
]

export function CaseStudiesSection() {
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

    const element = document.getElementById("case-studies")
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
    <section id="case-studies" className="py-20 bg-gradient-to-br from-background to-background/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Success{" "}
            <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how leading companies across industries are transforming their customer 
            engagement with ECHO AI voice agents.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 1, y: 0 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 group">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${study.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{study.logo}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                        {study.company}
                      </h3>
                      <p className="text-sm text-muted-foreground">{study.industry}</p>
                    </div>
                  </div>

                  {/* Challenge */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-sm">Challenge</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-sm">Solution</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {study.solution}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-sm">Results</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <div className="text-lg font-bold text-primary">{study.results.responseRate}</div>
                        <div className="text-xs text-muted-foreground">Response Rate</div>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <div className="text-lg font-bold text-primary">{study.results.revenue}</div>
                        <div className="text-xs text-muted-foreground">Revenue Increase</div>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <div className="text-lg font-bold text-primary">{study.results.timeSaved}</div>
                        <div className="text-xs text-muted-foreground">Time Saved</div>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <div className="text-lg font-bold text-primary">{study.results.leadQuality}</div>
                        <div className="text-xs text-muted-foreground">Lead Quality</div>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="mb-6">
                    <Quote className="w-5 h-5 text-primary mb-2" />
                    <p className="text-sm italic text-muted-foreground mb-3">
                      &ldquo;{study.quote}&rdquo;
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="font-semibold text-sm">{study.author}</div>
                      <div className="flex">
                        {[...Array(study.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
                  >
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">500+</div>
            <div className="text-muted-foreground">Companies Trust ECHO AI</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">1M+</div>
            <div className="text-muted-foreground">Successful Conversations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">95%</div>
            <div className="text-muted-foreground">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">60%</div>
            <div className="text-muted-foreground">Average ROI Increase</div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-center space-x-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                ))}
                <span className="text-lg font-semibold ml-2">5.0/5 Customer Rating</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">
                Join Hundreds of Successful Companies
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Start your journey with ECHO AI and see why industry leaders choose us 
                for their customer engagement automation needs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">30-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">24/7 support</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Start Free Trial</span>
                </Button>
                <Button variant="outline" size="lg" className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Schedule Demo</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

