"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, X, ArrowRight } from "lucide-react"

interface DemoBookingModalProps {
  isOpen: boolean
  onClose: () => void
  initialPhoneNumber?: string
}

export function DemoBookingModal({ isOpen, onClose, initialPhoneNumber = "" }: DemoBookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phoneNumber: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [okMsg, setOkMsg] = useState<string | null>(null)

  // Handle body scroll when modal is open
  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Update phone number when initialPhoneNumber changes
  useEffect(() => {
    if (initialPhoneNumber) {
      // Try to extract country code if present
      if (initialPhoneNumber.startsWith("+")) {
        const parts = initialPhoneNumber.split(/\s+/)
        const code = parts[0] || "+91"
        const number = parts.slice(1).join("") || ""
        setFormData(prev => ({ ...prev, countryCode: code, phoneNumber: number }))
      } else {
        setFormData(prev => ({ ...prev, phoneNumber: initialPhoneNumber }))
      }
    }
  }, [initialPhoneNumber])




  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.countryCode.trim()) newErrors.countryCode = "Country code is required"
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Helper: normalize to E.164-ish (+<digits>)
  function normalizePhone(raw: string) {
    const trimmed = raw.trim()
    if (trimmed.startsWith("+")) return trimmed.replace(/\s+/g, "")
    const digits = trimmed.replace(/\D/g, "")
    return `+${digits}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)
    setOkMsg(null)

    if (!validateForm()) return

    // Combine country code and phone number
    const combinedPhone = `${formData.countryCode.replace(/\s+/g, "")}${formData.phoneNumber.replace(/\s+/g, "")}`
    const phone = normalizePhone(combinedPhone)
    // very loose check:
    if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
      setErrors(prev => ({ ...prev, phoneNumber: "Enter a valid phone number" }))
      return
    }

    try {
      setLoading(true)
      // Trigger the call immediately (ignoring the scheduled date/time here).
      const res = await fetch("/api/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          phone, 
          name: formData.name.trim() || "Guest",
          email: formData.email.trim()
        })
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || "Failed to trigger the call")
      }

      // success UI
      setOkMsg("Call is being placed. You'll receive it shortly.")
      // Reset & close after a moment
      setFormData({ name: "", email: "", countryCode: "+91", phoneNumber: "" })
      setTimeout(() => {
        setOkMsg(null)
        onClose()
      }, 1200)
    } catch (err: any) {
      setServerError(err?.message || "Something went wrong while placing the call.")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" 
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-white">Book a Demo</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <p className="text-gray-200 mb-6">
                    Get an immediate personalized demonstration of Infini8 Voice&apos;s capabilities.
                  </p>
                </div>

          {/* inline server messages */}
          {serverError && <p className="text-red-400 text-sm">{serverError}</p>}
          {okMsg && <p className="text-green-400 text-sm">{okMsg}</p>}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Name *
            </label>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`bg-white text-black placeholder:text-gray-600 ${errors.name ? "border-red-500" : ""}`}
                    required
                  />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email *
            </label>
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`bg-white text-black placeholder:text-gray-600 ${errors.email ? "border-red-500" : ""}`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 w-24">
                      <Input
                        type="tel"
                        placeholder="+91"
                        value={formData.countryCode}
                        onChange={(e) => {
                          const value = e.target.value
                          // Ensure it starts with +
                          if (value && !value.startsWith("+")) {
                            handleInputChange('countryCode', `+${value.replace(/\+/g, "")}`)
                          } else {
                            handleInputChange('countryCode', value)
                          }
                        }}
                        className={`bg-white text-black placeholder:text-gray-600 ${errors.countryCode ? "border-red-500" : ""}`}
                        required
                      />
                      {errors.countryCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.countryCode}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        type="tel"
                        placeholder="98765 43210"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        className={`bg-white text-black placeholder:text-gray-600 ${errors.phoneNumber ? "border-red-500" : ""}`}
                        required
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                </div>



          {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Calling…" : "Book Demo Now"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

          {/* Footer */}
          <p className="text-xs text-gray-300 text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </div>
    </div>
  )

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null
}
