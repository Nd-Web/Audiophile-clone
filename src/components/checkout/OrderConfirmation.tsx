import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface Props {
  order: any
  onBackToHome: () => void
}

export default function OrderConfirmation({ order, onBackToHome }: Props) {
  const [showAllItems, setShowAllItems] = useState(false)
  
  // Get the first item and count of remaining items
  const firstItem = order.items?.[0]
  const remainingItemsCount = order.items?.length - 1 || 0
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div 
        className="absolute inset-0 bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={onBackToHome}
      />

      {/* Modal */}
      <motion.div 
        className="relative w-full max-w-[540px] bg-white rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="p-8 sm:p-12">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-[hsl(22,65%,57%)] rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Title and Description */}
          <h1 className="text-2xl sm:text-[32px] font-bold leading-[36px] tracking-[0.91px] uppercase mb-4">
            Thank you
            <br />
            for your order
          </h1>
          <p className="text-[15px] leading-[25px] text-black/50 mb-6">
            You will receive an email confirmation shortly.
          </p>

          {/* Order Summary */}
          <div className="rounded-lg overflow-hidden mb-8">
            {/* Items Section */}
            <div className="bg-[#F1F1F1] p-6">
              {/* First Item */}
              {firstItem && (
                <div className="flex items-center gap-4">
                  <div className="w-[50px] h-[50px] bg-[#F1F1F1] rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img 
                      src={firstItem.product?.mainImage?.desktop || firstItem.product?.categoryImage?.desktop || '/placeholder.png'}
                      alt={firstItem.productName || firstItem.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold leading-[25px] truncate">
                      {firstItem.productName || firstItem.product?.name}
                    </h3>
                    <p className="text-[14px] leading-[25px] text-black/50 font-bold">
                      $ {firstItem.price?.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-[15px] leading-[25px] text-black/50 font-bold">
                    x{firstItem.quantity}
                  </div>
                </div>
              )}

              {/* Remaining Items Toggle */}
              {remainingItemsCount > 0 && (
                <>
                  <div className="border-t border-black/10 my-3" />
                  
                  <AnimatePresence>
                    {!showAllItems ? (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowAllItems(true)}
                        className="w-full text-[12px] leading-[16px] tracking-[-0.21px] text-black/50 font-bold text-center py-2 hover:text-black/70 transition-colors"
                      >
                        and {remainingItemsCount} other item(s)
                      </motion.button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        {order.items.slice(1).map((item: any, index: number) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="w-[50px] h-[50px] bg-[#F1F1F1] rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                              <img 
                                src={item.product?.mainImage?.desktop || item.product?.categoryImage?.desktop || '/placeholder.png'}
                                alt={item.productName || item.product?.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-[15px] font-bold leading-[25px] truncate">
                                {item.productName || item.product?.name}
                              </h3>
                              <p className="text-[14px] leading-[25px] text-black/50 font-bold">
                                $ {item.price?.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-[15px] leading-[25px] text-black/50 font-bold">
                              x{item.quantity}
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => setShowAllItems(false)}
                          className="w-full text-[12px] leading-[16px] tracking-[-0.21px] text-black/50 font-bold text-center py-2 hover:text-black/70 transition-colors"
                        >
                          View less
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            {/* Grand Total Section */}
            <div className="bg-black p-6">
              <p className="text-[15px] leading-[25px] text-white/50 font-medium uppercase mb-2">
                Grand Total
              </p>
              <p className="text-[18px] font-bold leading-[25px] text-white">
                $ {order.total?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            onClick={onBackToHome}
            className="w-full bg-[hsl(22,65%,57%)] hover:bg-[hsl(22,65%,67%)] text-white text-[13px] font-bold tracking-[1px] uppercase py-6 h-auto"
          >
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
