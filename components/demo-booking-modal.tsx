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
    phoneNumber: initialPhoneNumber
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
      setFormData(prev => ({ ...prev, phoneNumber: initialPhoneNumber }))
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

    const phone = normalizePhone(formData.phoneNumber)
    // very loose check:
    if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
      setErrors(prev => ({ ...prev, phoneNumber: "Enter a valid phone (E.164) like +919876543210" }))
      return
    }

    try {
      setLoading(true)
      // Trigger the call immediately (ignoring the scheduled date/time here).
      const res = await fetch("/api/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name: formData.name.trim() || "Guest" })
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || "Failed to trigger the call")
      }

      // success UI
      setOkMsg("Call is being placed. You’ll receive it shortly.")
      // Reset & close after a moment
      setFormData({ name: "", phoneNumber: "" })
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
                    Get an immediate personalized demonstration of ECHO AI&apos;s capabilities.
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
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`bg-white text-black placeholder:text-gray-600 ${errors.name ? "border-red-500" : ""}`}
                    required
                  />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Phone Number *
                    <span className="text-xs text-gray-300 font-normal ml-2">
                      (Add country code before your number)
                    </span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={`bg-white text-black placeholder:text-gray-600 ${errors.phoneNumber ? "border-red-500" : ""}`}
                    required
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                  )}
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
