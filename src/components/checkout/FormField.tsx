import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormFieldProps {
  label: string
  type?: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
  maxLength?: string | number
}

export default function FormField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  placeholder,
  maxLength
}: FormFieldProps) {
  const inputId = `input-${name}`
  const errorId = `error-${name}`
  
  return (
    <motion.div 
      className="flex flex-col"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label 
        htmlFor={inputId}
        className="text-sm font-bold mb-2 text-text tracking-tight"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`
          border rounded-lg px-4 py-3 
          bg-white dark:bg-secondary
          transition-all duration-200 ease-out
          outline-none
          ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
            : 'border-border hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/20'
          }
        `}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength as any}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        aria-required="true"
      />
      <AnimatePresence>
        {error && (
          <motion.span 
            id={errorId}
            role="alert"
            className="text-xs text-red-500 mt-2 font-medium"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
