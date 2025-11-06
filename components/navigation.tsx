"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Calendar, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { DemoBookingModal } from "@/components/demo-booking-modal"

interface NavigationProps {
  lightTheme?: boolean
}

export function Navigation({ lightTheme = false }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const pathname = usePathname()
  
  // Check if we're on a case studies page
  const isCaseStudiesPage = pathname === '/case-studies'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.case-studies-dropdown')) {
        setIsCaseStudiesOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  const navigation = [
    { name: "Benefits", href: "/#benefits" },
    { name: "Customization", href: "/#customization" },
    { name: "How It Works", href: "/#how-it-works" },
  ]

  const caseStudies = [
    { name: "Creative Orbit", href: "/case-studies?study=creative-orbit" },
    { name: "Cinco", href: "/case-studies?study=cinco" },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        lightTheme
          ? isScrolled
            ? "bg-white/90 backdrop-blur-md border-b border-gray-200"
            : "bg-white border-b border-gray-200"
          : isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/echo-logo.png"
              alt="Infini8 Voice Logo"
              width={80}
              height={80}
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
            <span className={cn(
              "text-xl font-semibold",
              lightTheme ? "text-gray-900" : "text-foreground"
            )}>
              Infini8 Voice
            </span>
          </Link>

          {/* Desktop Navigation - All items grouped on the right with equal spacing */}
          <div className="hidden md:flex items-center ml-auto space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors duration-200",
                  lightTheme
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Case Studies Dropdown */}
            <div 
              className="relative case-studies-dropdown"
              onMouseEnter={() => {
                if (hoverTimeout) {
                  clearTimeout(hoverTimeout)
                  setHoverTimeout(null)
                }
                setIsCaseStudiesOpen(true)
              }}
              onMouseLeave={() => {
                const timeout = setTimeout(() => {
                  setIsCaseStudiesOpen(false)
                }, 150)
                setHoverTimeout(timeout)
              }}
            >
              <button 
                className={cn(
                  "flex items-center gap-1 transition-colors duration-200",
                  lightTheme
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setIsCaseStudiesOpen(!isCaseStudiesOpen)}
                onMouseEnter={() => setIsCaseStudiesOpen(true)}
              >
                Case Studies
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  isCaseStudiesOpen && "rotate-180"
                )} />
              </button>
              
              {isCaseStudiesOpen && (
                <div className={cn(
                  "absolute top-full left-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden",
                  "z-[9999] border-2",
                  lightTheme
                    ? "bg-white border-gray-200"
                    : "bg-background/95 backdrop-blur-md border-border"
                )}>
                  {caseStudies.map((study) => (
                    <Link
                      key={study.name}
                      href={study.href}
                      className={cn(
                        "block px-4 py-3 transition-colors duration-200 cursor-pointer relative z-[10000]",
                        lightTheme
                          ? "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                      onClick={() => setIsCaseStudiesOpen(false)}
                    >
                      {study.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Talk to Sales */}
            {!isCaseStudiesPage && (
              <Button 
                size="sm" 
                asChild
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-black hover:from-blue-600 hover:to-blue-700"
              >
                <Link href="#contact" className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Talk to Sales</span>
                </Link>
              </Button>
            )}

            {/* Book Demo */}
            <Button 
              size="sm" 
              onClick={() => setIsDemoModalOpen(true)} 
              className="flex items-center space-x-2 bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Demo</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 ml-auto",
              lightTheme ? "text-gray-900" : "text-foreground"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={cn(
            "md:hidden border-t",
            lightTheme
              ? "bg-white/95 backdrop-blur-md border-gray-200"
              : "bg-background/95 backdrop-blur-md border-border"
          )}>
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block transition-colors duration-200",
                    lightTheme
                      ? "text-gray-600 hover:text-gray-900"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Case Studies */}
              <div className="space-y-2">
                <div className={cn(
                  "font-medium text-sm",
                  lightTheme ? "text-gray-600" : "text-muted-foreground"
                )}>
                  Case Studies
                </div>
                {caseStudies.map((study) => (
                  <Link
                    key={study.name}
                    href={study.href}
                    className={cn(
                      "block pl-4 transition-colors duration-200",
                      lightTheme
                        ? "text-gray-600 hover:text-gray-900"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {study.name}
                  </Link>
                ))}
              </div>
              
              <div className="pt-4 space-y-3">
                {!isCaseStudiesPage && (
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-black hover:from-blue-600 hover:to-blue-700" 
                    asChild
                  >
                    <Link href="#contact" className="flex items-center justify-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Talk to Sales</span>
                    </Link>
                  </Button>
                )}
                <Button 
                  size="sm" 
                  className="w-full bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700" 
                  onClick={() => setIsDemoModalOpen(true)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Book Demo</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Demo Booking Modal */}
      <DemoBookingModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </nav>
  )
}

