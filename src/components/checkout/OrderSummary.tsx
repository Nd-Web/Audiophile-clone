import type { CartItem } from '@/types/database'
import { motion } from 'framer-motion'
import React from 'react'

interface OrderSummaryProps {
  items: Array<CartItem & { product: any }>
  subtotal: number
  shippingCost: number
  vat: number
  total: number
}

export default function OrderSummary({ items, subtotal, shippingCost, vat, total }: OrderSummaryProps) {
  return (
    <motion.div 
      className="bg-white dark:bg-secondary rounded-lg p-8 h-fit sticky top-24 shadow-lg"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold mb-8 tracking-wide uppercase">Summary</h2>

      {/* Items */}
      <div className="space-y-4 mb-8 max-h-64 overflow-y-auto custom-scrollbar">
        {items.map((item, index) => (
          <motion.div 
            key={item.id} 
            className="flex justify-between items-center pb-4 border-b border-border last:border-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product?.categoryImage?.mobile || item.product?.mainImage?.mobile}
                alt={item.product?.name}
                className="w-16 h-16 object-cover rounded-lg shadow-sm"
              />
              <div>
                <p className="font-bold text-sm">{item.product?.name}</p>
                <p className="text-text-secondary text-xs font-medium">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-bold text-sm">${(item.product?.price * item.quantity).toLocaleString()}</p>
          </motion.div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-4 mb-8 pb-8 border-b border-border">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-sm uppercase font-medium">Subtotal</span>
          <span className="font-bold text-lg">${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-sm uppercase font-medium">Shipping</span>
          <span className="font-bold text-lg">${shippingCost.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-sm uppercase font-medium">VAT (20%)</span>
          <span className="font-bold text-lg">${vat.toLocaleString()}</span>
        </div>
      </div>

      {/* Total */}
      <motion.div 
        className="flex justify-between items-center"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <span className="text-text-secondary text-sm uppercase font-bold">Grand Total</span>
        <span className="text-2xl font-bold text-accent">${total.toLocaleString()}</span>
      </motion.div>
    </motion.div>
  )
}
