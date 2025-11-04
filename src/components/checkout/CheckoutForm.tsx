import { useState } from 'react'
import type { CheckoutFormData } from '@/pages/CheckoutPage'
import { Button } from '@/components/ui/button'
import BillingInfo from './BillingInfo'
import ShippingInfo from './ShippingInfo'
import PaymentMethod from './PaymentMethod'

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => Promise<void>
  isSubmitting: boolean
}

export default function CheckoutForm({
  onSubmit,
  isSubmitting
}: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    paymentMethod: 'emoney',
    eMoneyNumber: '',
    eMoneyPin: '',
    cardholderName: '',
    cardNumber: '',
    expDate: '',
    cvc: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Billing Info validation
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format'
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.country.trim()) newErrors.country = 'Country is required'

    // Payment Method validation
    if (formData.paymentMethod === 'emoney') {
      if (!formData.eMoneyNumber?.trim()) {
        newErrors.eMoneyNumber = 'e-Money number is required'
      } else if (!/^\d{9}$/.test(formData.eMoneyNumber)) {
        newErrors.eMoneyNumber = 'Must be 9 digits'
      }
      if (!formData.eMoneyPin?.trim()) {
        newErrors.eMoneyPin = 'e-Money PIN is required'
      } else if (!/^\d{4}$/.test(formData.eMoneyPin)) {
        newErrors.eMoneyPin = 'Must be 4 digits'
      }
    } else if (formData.paymentMethod === 'card') {
      if (!formData.cardholderName?.trim()) {
        newErrors.cardholderName = 'Cardholder name is required'
      }
      if (!formData.cardNumber?.trim()) {
        newErrors.cardNumber = 'Card number is required'
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Must be 16 digits'
      }
      if (!formData.expDate?.trim()) {
        newErrors.expDate = 'Expiry date is required'
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expDate)) {
        newErrors.expDate = 'Format: MM/YY'
      }
      if (!formData.cvc?.trim()) {
        newErrors.cvc = 'CVC is required'
      } else if (!/^\d{3,4}$/.test(formData.cvc)) {
        newErrors.cvc = 'Must be 3-4 digits'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handlePaymentMethodChange = (method: 'emoney' | 'card' | 'cod') => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent duplicate submissions
    if (isSubmitting || hasSubmitted) {
      return
    }
    
    if (validateForm()) {
      setHasSubmitted(true)
      try {
        await onSubmit(formData)
      } catch (error) {
        // Reset on error to allow retry
        setHasSubmitted(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Billing Info */}
      <BillingInfo
        formData={formData}
        errors={errors}
        onChange={handleChange}
      />

      {/* Shipping Info */}
      <ShippingInfo
        formData={formData}
        errors={errors}
        onChange={handleChange}
      />

      {/* Payment Method */}
      <PaymentMethod
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onPaymentMethodChange={handlePaymentMethodChange}
      />

      {/* Submit Button */}
      <div className="flex justify-end pt-8">
        <Button
          type="submit"
          disabled={isSubmitting || hasSubmitted}
          className="px-16 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-3">
              <svg 
                className="animate-spin h-5 w-5" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Continue & Pay'
          )}
        </Button>
      </div>
    </form>
  )
}
