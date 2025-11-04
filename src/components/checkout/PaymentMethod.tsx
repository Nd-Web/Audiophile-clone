import type { CheckoutFormData } from '@/pages/CheckoutPage'
import { motion, AnimatePresence } from 'framer-motion'
import FormField from './FormField'

interface PaymentMethodProps {
  formData: CheckoutFormData
  errors: Record<string, string>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPaymentMethodChange: (method: 'emoney' | 'card' | 'cod') => void
}

export default function PaymentMethod({
  formData,
  errors,
  onChange,
  onPaymentMethodChange
}: PaymentMethodProps) {
  const paymentOptions = [
    { id: 'emoney', label: 'e-Money', value: 'emoney' as const },
    { id: 'card', label: 'Credit Card', value: 'card' as const },
    { id: 'cod', label: 'Cash on Delivery', value: 'cod' as const }
  ]

  return (
    <motion.div 
      className="bg-white dark:bg-secondary rounded-lg p-8 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-8 text-accent tracking-wide uppercase">Payment Details</h2>

      {/* Payment Method Options */}
      <div className="space-y-4 mb-8">
        {paymentOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className={`
              flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer
              transition-all duration-200
              ${formData.paymentMethod === option.value
                ? 'border-accent bg-accent/5 shadow-md'
                : 'border-border hover:border-accent/40 hover:bg-accent/5'
              }
            `}
            onClick={() => onPaymentMethodChange(option.value)}
          >
            <input
              type="radio"
              id={option.id}
              name="paymentMethod"
              value={option.value}
              checked={formData.paymentMethod === option.value}
              onChange={() => onPaymentMethodChange(option.value)}
              className="w-5 h-5 accent-accent cursor-pointer"
            />
            <label htmlFor={option.id} className="flex-1 font-bold cursor-pointer">
              {option.label}
            </label>
          </motion.div>
        ))}
      </div>

      {/* e-Money Fields */}
      <AnimatePresence mode="wait">
        {formData.paymentMethod === 'emoney' && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FormField
              label="e-Money Number"
              type="text"
              name="eMoneyNumber"
              value={formData.eMoneyNumber || ''}
              onChange={onChange}
              error={errors.eMoneyNumber}
              placeholder="123456789"
              maxLength="9"
            />
            <FormField
              label="e-Money PIN"
              type="text"
              name="eMoneyPin"
              value={formData.eMoneyPin || ''}
              onChange={onChange}
              error={errors.eMoneyPin}
              placeholder="0000"
              maxLength="4"
            />
          </motion.div>
        )}

        {/* Credit Card Fields */}
        {formData.paymentMethod === 'card' && (
          <motion.div 
            className="space-y-6 pb-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FormField
              label="Cardholder Name"
              type="text"
              name="cardholderName"
              value={formData.cardholderName || ''}
              onChange={onChange}
              error={errors.cardholderName}
              placeholder="Alex Ward"
            />
            <FormField
              label="Card Number"
              type="text"
              name="cardNumber"
              value={formData.cardNumber || ''}
              onChange={onChange}
              error={errors.cardNumber}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
            />
            <div className="grid grid-cols-2 gap-6">
              <FormField
                label="Expiry Date"
                type="text"
                name="expDate"
                value={formData.expDate || ''}
                onChange={onChange}
                error={errors.expDate}
                placeholder="MM/YY"
                maxLength="5"
              />
              <FormField
                label="CVC"
                type="text"
                name="cvc"
                value={formData.cvc || ''}
                onChange={onChange}
                error={errors.cvc}
                placeholder="000"
                maxLength="4"
              />
            </div>
          </motion.div>
        )}

        {/* Cash on Delivery Info */}
        {formData.paymentMethod === 'cod' && (
          <motion.div 
            className="bg-accent/10 border-2 border-accent rounded-lg p-6 flex items-start gap-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-12 h-12 text-accent flex-shrink-0" fill="none" viewBox="0 0 48 48">
              <path fill="currentColor" fillRule="evenodd" d="M42 24c0-9.941-8.059-18-18-18S6 14.059 6 24s8.059 18 18 18 18-8.059 18-18ZM4 24C4 12.954 12.954 4 24 4s20 8.954 20 20-8.954 20-20 20S4 35.046 4 24Z" clipRule="evenodd"/>
              <path fill="currentColor" d="M25 15a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v6h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2v-6h2a1 1 0 1 0 0-2h-2v-2Z"/>
            </svg>
            <div>
              <h3 className="font-bold text-accent mb-2">Cash on Delivery</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Please have the exact amount ready when the driver arrives. We accept cash payments only for this method.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
