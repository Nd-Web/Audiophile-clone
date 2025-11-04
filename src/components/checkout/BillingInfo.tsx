import type { CheckoutFormData } from '@/pages/CheckoutPage'
import { motion } from 'framer-motion'
import FormField from './FormField'

interface BillingInfoProps {
  formData: CheckoutFormData
  errors: Record<string, string>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function BillingInfo({
  formData,
  errors,
  onChange
}: BillingInfoProps) {
  return (
    <motion.div 
      className="bg-white dark:bg-secondary rounded-lg p-8 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h2 className="text-xl font-bold mb-8 text-accent tracking-wide uppercase">Billing Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          error={errors.name}
          placeholder="Alexei Ward"
        />

        <FormField
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          error={errors.email}
          placeholder="alexei@mail.com"
        />

        <FormField
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          error={errors.phone}
          placeholder="+1 202-555-0136"
        />

        <div />

        <div className="md:col-span-2">
          <FormField
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            error={errors.address}
            placeholder="1137 Williams Avenue"
          />
        </div>

        <FormField
          label="ZIP Code"
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={onChange}
          error={errors.zipCode}
          placeholder="10001"
        />

        <FormField
          label="City"
          type="text"
          name="city"
          value={formData.city}
          onChange={onChange}
          error={errors.city}
          placeholder="New York"
        />

        <FormField
          label="Country"
          type="text"
          name="country"
          value={formData.country}
          onChange={onChange}
          error={errors.country}
          placeholder="United States"
        />

        <div />
      </div>
    </motion.div>
  )
}
