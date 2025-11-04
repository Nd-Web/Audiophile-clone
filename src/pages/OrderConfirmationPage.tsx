import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function OrderConfirmationPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [orderData, setOrderData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get order data from session storage or URL params
    const storedOrder = sessionStorage.getItem('lastOrder')
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder))
      sessionStorage.removeItem('lastOrder')
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">No Order Found</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90"
        >
          Return to Home
        </button>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Confirmation Message */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Thank You for Your Order</h1>
          <p className="text-text-secondary text-lg mb-4">
            Your order has been confirmed and will be processed soon.
          </p>
          <p className="text-text-secondary">
            Order #: <span className="font-semibold text-text">{orderData.orderId}</span>
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white dark:bg-secondary rounded-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">Order Details</h2>

          {/* Items */}
          <div className="space-y-4 mb-8 pb-8 border-b border-secondary">
            {orderData.items.map((item: any) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-text-secondary text-sm">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-3 mb-8 pb-8 border-b border-secondary">
            <div className="flex justify-between">
              <span className="text-text-secondary">Subtotal</span>
              <span>${orderData.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Shipping</span>
              <span>${orderData.shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">VAT (20%)</span>
              <span>${orderData.vat.toLocaleString()}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Grand Total</span>
            <span className="text-3xl font-bold text-accent">${orderData.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white dark:bg-secondary rounded-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
          <p className="text-text-secondary mb-2">{orderData.address.firstName} {orderData.address.lastName}</p>
          <p className="text-text-secondary mb-2">{orderData.address.street}</p>
          <p className="text-text-secondary mb-2">
            {orderData.address.city}, {orderData.address.state} {orderData.address.zip}
          </p>
          <p className="text-text-secondary">{orderData.address.country}</p>
        </div>

        {/* Continue Shopping Button */}
        <button
          onClick={() => navigate('/products')}
          className="w-full bg-accent text-white py-4 rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
        >
          Continue Shopping
          <ChevronRight size={20} />
        </button>
      </div>
    </main>
  )
}
