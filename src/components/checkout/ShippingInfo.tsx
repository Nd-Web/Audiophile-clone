import type { CheckoutFormData } from '@/pages/CheckoutPage'
import { motion } from 'framer-motion'
import { useState } from 'react'
import FormField from './FormField'

interface ShippingInfoProps {
  formData: CheckoutFormData
  errors: Record<string, string>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ShippingInfo({
  formData,
  errors,
  onChange
}: ShippingInfoProps) {
  const [selectedShipping, setSelectedShipping] = useState('standard')

  const shippingOptions = [
    { id: 'standard', label: 'Standard Shipping', time: '5-7 business days', price: 50 },
    { id: 'express', label: 'Express Shipping', time: '2-3 business days', price: 100 }
  ]

  return (
    <motion.div 
      className="bg-white dark:bg-secondary rounded-lg p-8 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold mb-8 text-accent tracking-wide uppercase">Shipping Info</h2>

      <div className="space-y-4">
        {shippingOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className={`
              flex items-center gap-4 p-5 border-2 rounded-lg cursor-pointer
              transition-all duration-200
              ${selectedShipping === option.id
                ? 'border-accent bg-accent/5 shadow-md'
                : 'border-border hover:border-accent/40 hover:bg-accent/5'
              }
            `}
            onClick={() => setSelectedShipping(option.id)}
          >
            <input
              type="radio"
              id={option.id}
              name="shippingMethod"
              value={option.id}
              checked={selectedShipping === option.id}
              onChange={() => setSelectedShipping(option.id)}
              className="w-5 h-5 accent-accent cursor-pointer"
            />
            <label htmlFor={option.id} className="flex-1 cursor-pointer">
              <p className="font-bold text-base">{option.label}</p>
              <p className="text-sm text-text-secondary font-medium">{option.time}</p>
            </label>
            <span className="text-xl font-bold text-accent">${option.price}</span>
          </motion.div>
        ))}
      </div>

      <motion.p 
        className="text-sm text-text-secondary mt-6 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Shipping details will be confirmed with you before dispatch.
      </motion.p>
    </motion.div>
  )
}
