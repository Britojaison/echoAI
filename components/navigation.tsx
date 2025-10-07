"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Calendar, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  lightTheme?: boolean
}

export function Navigation({ lightTheme = false }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Benefits", href: "#benefits" },
    { name: "Customization", href: "#customization" },
    { name: "How It Works", href: "#how-it-works" },
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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/echo-logo.png"
              alt="ECHO AI Logo"
              width={100}
              height={100}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
              className="relative"
              onMouseEnter={() => setIsCaseStudiesOpen(true)}
              onMouseLeave={() => setIsCaseStudiesOpen(false)}
            >
              <button className={cn(
                "flex items-center gap-1 transition-colors duration-200",
                lightTheme
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-muted-foreground hover:text-foreground"
              )}>
                Case Studies
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  isCaseStudiesOpen && "rotate-180"
                )} />
              </button>
              
              {isCaseStudiesOpen && (
                <div className={cn(
                  "absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden",
                  lightTheme
                    ? "bg-white border border-gray-200"
                    : "bg-background/95 backdrop-blur-md border border-border"
                )}>
                  {caseStudies.map((study) => (
                    <Link
                      key={study.name}
                      href={study.href}
                      className={cn(
                        "block px-4 py-3 transition-colors duration-200",
                        lightTheme
                          ? "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                    >
                      {study.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="#contact" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Talk to Sales</span>
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="#contact" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Book Demo</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2",
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
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link href="#contact" className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Talk to Sales</span>
                  </Link>
                </Button>
                <Button size="sm" className="w-full" asChild>
                  <Link href="#contact" className="flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Book Demo</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

