"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, X, ArrowRight, ChevronDown } from "lucide-react"

interface DemoBookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoBookingModal({ isOpen, onClose }: DemoBookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    date: "",
    time: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const datePickerRef = useRef<HTMLDivElement>(null)
  const timePickerRef = useRef<HTMLDivElement>(null)

  // Close pickers when clicking outside and handle body scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false)
      }
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
        setShowTimePicker(false)
      }
    }

    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Get current date and time for validation
  const now = new Date()
  const currentDate = now.toISOString().split('T')[0]
  const currentTime = now.toTimeString().slice(0, 5)

  // Generate available dates (next 4 days)
  const generateAvailableDates = () => {
    const dates = []
    for (let i = 1; i <= 4; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  // Generate hour positions for clock (12-hour format)
  const generateHourPositions = () => {
    const hours = []
    for (let hour = 1; hour <= 12; hour++) {
      const angle = (hour * 30) - 90 // 30 degrees per hour, offset by 90 degrees to start at top
      const x = 50 + 35 * Math.cos((angle * Math.PI) / 180)
      const y = 50 + 35 * Math.sin((angle * Math.PI) / 180)
      hours.push({ hour, x, y, angle })
    }
    return hours
  }

  // Generate minute positions for clock
  const generateMinutePositions = () => {
    const minutes = []
    for (let minute = 0; minute < 60; minute += 5) {
      const angle = (minute * 6) - 90 // 6 degrees per minute, offset by 90 degrees
      const x = 50 + 40 * Math.cos((angle * Math.PI) / 180)
      const y = 50 + 40 * Math.sin((angle * Math.PI) / 180)
      minutes.push({ minute, x, y, angle })
    }
    return minutes
  }

  const availableDates = generateAvailableDates()
  const hourPositions = generateHourPositions()
  const minutePositions = generateMinutePositions()
  
  // Clock picker state
  const [selectedHour, setSelectedHour] = useState<number | null>(null)
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null)
  const [isAM, setIsAM] = useState(true)

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "Select Date"
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Format time for display
  const formatTime = (timeString: string) => {
    if (!timeString) return "Select Time"
    const [hour, minute] = timeString.split(':')
    const hourNum = parseInt(hour)
    const period = hourNum >= 12 ? 'PM' : 'AM'
    const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum
    return `${displayHour}:${minute} ${period}`
  }

  // Convert 12-hour format to 24-hour format
  const convertTo24Hour = (hour: number, minute: number, isAM: boolean) => {
    let hour24 = hour
    if (hour === 12) {
      hour24 = isAM ? 0 : 12
    } else if (!isAM) {
      hour24 = hour + 12
    }
    return `${hour24.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  }

  // Handle hour selection
  const handleHourSelect = (hour: number) => {
    setSelectedHour(hour)
  }

  // Handle minute selection
  const handleMinuteSelect = (minute: number) => {
    setSelectedMinute(minute)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    }

    if (!formData.date) {
      newErrors.date = "Please select a date"
    } else if (formData.date < currentDate) {
      newErrors.date = "Cannot select a past date"
    }

    if (!formData.time) {
      newErrors.time = "Please select a time"
    } else if (formData.date === currentDate && formData.time <= currentTime) {
      newErrors.time = "Cannot select a past time for today"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log("Demo booking submitted:", formData)
      
      // Reset form
      setFormData({
        name: "",
        phoneNumber: "",
        date: "",
        time: ""
      })
      
      // Close modal
      onClose()
      
      // You might want to show a success message here
      alert("Demo booking request submitted successfully!")
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh'
      }}
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
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <p className="text-gray-200 mb-6">
              Schedule a personalized demonstration of ECHO AI's capabilities.
            </p>
          </div>

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
              className={errors.name ? "border-red-500" : ""}
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
            </label>
            <Input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className={errors.phoneNumber ? "border-red-500" : ""}
              required
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Date Selection */}
          <div className="relative" ref={datePickerRef}>
            <label className="block text-sm font-medium text-white mb-2">
              Preferred Date *
            </label>
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className={`w-full px-3 py-2 text-left border rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={formData.date ? "text-black font-bold" : "text-gray-600"}>
                  {formatDate(formData.date)}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-700 transition-transform ${showDatePicker ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            {showDatePicker && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-[10000] p-4">
                <div className="text-center mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Select Date</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {availableDates.map((date, index) => {
                    const dateString = date.toISOString().split('T')[0]
                    const isSelected = formData.date === dateString
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
                    const dayNumber = date.getDate()
                    const monthName = date.toLocaleDateString('en-US', { month: 'short' })
                    
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          handleInputChange('date', dateString)
                          setShowDatePicker(false)
                        }}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          isSelected 
                            ? 'bg-primary text-white border-primary shadow-md' 
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-xs font-medium opacity-75 mb-1">{dayName}</div>
                        <div className="text-lg font-bold">{dayNumber}</div>
                        <div className="text-xs opacity-75">{monthName}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
            
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          {/* Time Selection */}
          <div className="relative" ref={timePickerRef}>
            <label className="block text-sm font-medium text-white mb-2">
              Preferred Time *
            </label>
            <button
              type="button"
              onClick={() => setShowTimePicker(!showTimePicker)}
              className={`w-full px-3 py-2 text-left border rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.time ? "border-red-500" : "border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={formData.time ? "text-black font-bold" : "text-gray-600"}>
                  {formatTime(formData.time)}
                </span>
                <Clock className="w-4 h-4 text-gray-700" />
              </div>
            </button>
            
            {showTimePicker && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-[10000] p-6">
                <div className="text-center mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Select Time</h3>
                </div>
                
                {/* Simple Time Input Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Hour Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hour</label>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                        <button
                          key={hour}
                          type="button"
                          onClick={() => handleHourSelect(hour)}
                          className={`p-2 rounded-md text-sm font-medium transition-colors ${
                            selectedHour === hour
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {hour}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Minute Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minute</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[0, 15, 30, 45].map((minute) => (
                        <button
                          key={minute}
                          type="button"
                          onClick={() => handleMinuteSelect(minute)}
                          className={`p-2 rounded-md text-sm font-medium transition-colors ${
                            selectedMinute === minute
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {minute.toString().padStart(2, '0')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* AM/PM Toggle */}
                <div className="flex justify-center mb-4">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setIsAM(true)}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                        isAM 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      AM
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAM(false)}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                        !isAM 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      PM
                    </button>
                  </div>
                </div>
                
                {/* Selected Time Display */}
                {selectedHour && selectedMinute !== null && (
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedHour}:{selectedMinute.toString().padStart(2, '0')} {isAM ? 'AM' : 'PM'}
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedHour(null)
                      setSelectedMinute(null)
                      setIsAM(true)
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedHour && selectedMinute !== null) {
                        const timeString = convertTo24Hour(selectedHour, selectedMinute, isAM)
                        handleInputChange('time', timeString)
                      }
                      setShowTimePicker(false)
                    }}
                    className="px-6 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
            
            {errors.time && (
              <p className="text-red-500 text-xs mt-1">{errors.time}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full">
            Schedule Demo
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
