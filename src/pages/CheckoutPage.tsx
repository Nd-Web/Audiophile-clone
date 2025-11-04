import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { db } from '@/services/database'
import { createConvexOrder, isConvexConfigured } from '@/services/convex'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import OrderSummary from '@/components/checkout/OrderSummary'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderConfirmation from '@/components/checkout/OrderConfirmation'

export type CheckoutFormData = {
  // Billing Info
  name: string
  email: string
  phone: string
  address: string
  zipCode: string
  city: string
  country: string

  // Shipping Info
  eMoneyNumber?: string
  eMoneyPin?: string
  cardholderName?: string
  cardNumber?: string
  expDate?: string
  cvc?: string

  // Payment method
  paymentMethod: 'emoney' | 'card' | 'cod'
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, cartTotal, shippingCost, vat } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null)

  if (cartItems.length === 0 && !orderConfirmed) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-text-secondary mb-8">
              Add some products to proceed with checkout
            </p>
            <Button
              onClick={() => navigate('/headphones')}
              className="px-8"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (orderConfirmed && confirmedOrder) {
    return (
      <OrderConfirmation
        order={confirmedOrder}
        onBackToHome={() => {
          setOrderConfirmed(false)
          navigate('/')
        }}
      />
    )
  }

  const handleSubmit = async (formData: CheckoutFormData) => {
    try {
      setIsSubmitting(true)

      // Prepare order data for Convex
      const convexOrderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        items: cartItems.map((item) => ({
          id: item.id,
          productSlug: item.productSlug,
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
        subtotal: cartTotal,
        shippingCost,
        vat,
        total: cartTotal + shippingCost + vat,
        status: 'pending'
      }

      // Prepare order data for localStorage (different type)
      const localOrderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        items: cartItems,
        subtotal: cartTotal,
        shippingCost,
        vat,
        total: cartTotal + shippingCost + vat,
        status: 'pending' as const
      }

      let orderId: string

      // Try to save to Convex if configured, otherwise fallback to localStorage
      if (isConvexConfigured()) {
        try {
          const convexOrderId = await createConvexOrder(convexOrderData)
          orderId = convexOrderId.toString()
          toast.success('Order saved to Convex backend!')
        } catch (convexError) {
          console.warn('Convex save failed, falling back to localStorage:', convexError)
          const localOrder = db.createOrder(localOrderData)
          orderId = localOrder.id
          toast.success('Order saved locally (Convex unavailable)')
        }
      } else {
        // Convex not configured, use localStorage
        const localOrder = db.createOrder(localOrderData)
        orderId = localOrder.id
        toast.success('Order placed successfully!')
      }

      // Clear cart
      db.clearCart()

      // Show confirmation
      const confirmedOrderData = {
        id: orderId,
        ...convexOrderData,
        createdAt: new Date().toISOString()
      }
      setConfirmedOrder(confirmedOrderData)
      setOrderConfirmed(true)

    } catch (error) {
      console.error('Failed to place order:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/cart')}
          className="text-text-secondary hover:text-accent mb-8 transition-all duration-200 font-medium flex items-center gap-2 group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>Back to Cart</span>
        </button>

        <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={cartItems}
              subtotal={cartTotal}
              shippingCost={shippingCost}
              vat={vat}
              total={cartTotal + shippingCost + vat}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
