import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { db } from '@/services/database'
import type { CartItem, Product } from '@/types/database'
import toast from 'react-hot-toast'

interface CartItemWithProduct extends CartItem {
  product: Product
}

export default function CartPage() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([])
  const [loading, setLoading] = useState(true)

  // Load cart items
  useEffect(() => {
    loadCart()
  }, [])

  // Subscribe to cart updates
  useEffect(() => {
    const unsubscribe = db.onCartUpdate(() => {
      loadCart()
    })
    return unsubscribe
  }, [])

  const loadCart = async () => {
    try {
      const items = await db.getCartWithProducts()
      setCartItems(items)
    } catch (error) {
      console.error('Failed to load cart:', error)
      toast.error('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    db.updateCartItemQuantity(itemId, newQuantity)
  }

  const removeItem = (itemId: string) => {
    db.removeFromCart(itemId)
    toast.success('Item removed from cart')
  }

  const clearAllItems = () => {
    db.clearCart()
    toast.success('Cart cleared')
  }

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }

  const calculateVAT = () => {
    return calculateTotal() * 0.2 // 20% VAT
  }

  const calculateShipping = () => {
    return cartItems.length > 0 ? 50 : 0
  }

  const calculateGrandTotal = () => {
    return calculateTotal() + calculateShipping()
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    navigate('/checkout')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading cart...</p>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <div className="w-full max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 py-16">
          <div className="bg-white rounded-lg p-12 text-center">
            <h1 className="text-[32px] font-bold uppercase tracking-[1.15px] mb-6">Your Cart</h1>
            <p className="text-black/50 text-[15px] mb-8">Your cart is currently empty.</p>
            <Link to="/">
              <Button className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] px-8 py-4">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Back Button */}
      <div className="w-full max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 pt-20 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-black/50 text-[15px] leading-[25px] hover:text-[#D87D4A] transition-colors"
        >
          Go Back
        </button>
      </div>

      {/* Cart Content */}
      <div className="w-full max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Cart Items */}
          <div className="bg-white rounded-lg p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-[32px] font-bold uppercase tracking-[1.15px]">
                Cart ({cartItems.length})
              </h1>
              <button
                onClick={clearAllItems}
                className="text-black/50 text-[15px] underline hover:text-[#D87D4A] transition-colors"
              >
                Remove all
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  {/* Product Image */}
                  <div className="w-[64px] h-[64px] bg-[#F1F1F1] rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.categoryImage.mobile}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold uppercase truncate">
                      {item.product.name.replace('Headphones', '').replace('Earphones', '').replace('Speaker', '').trim()}
                    </h3>
                    <p className="text-[14px] font-bold text-black/50">
                      $ {item.product.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center bg-[#F1F1F1] h-[48px]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-[48px] h-full flex items-center justify-center text-black/25 hover:text-[#D87D4A] transition-colors text-[13px] font-bold"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-[48px] text-center text-[13px] font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-[48px] h-full flex items-center justify-center text-black/25 hover:text-[#D87D4A] transition-colors text-[13px] font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-black/50 hover:text-red-500 transition-colors"
                    title="Remove item"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M14 3.99L12.59 2.58L8 7.17L3.41 2.58L2 3.99L6.59 8.58L2 13.17L3.41 14.58L8 10L12.59 14.58L14 13.17L9.41 8.58L14 3.99Z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg p-8 h-fit sticky top-8">
            <h2 className="text-[18px] font-bold uppercase tracking-[1.3px] mb-8">Summary</h2>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-[15px] text-black/50 uppercase">Total</span>
                <span className="text-[18px] font-bold">$ {calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[15px] text-black/50 uppercase">Shipping</span>
                <span className="text-[18px] font-bold">$ {calculateShipping()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[15px] text-black/50 uppercase">VAT (included)</span>
                <span className="text-[18px] font-bold">$ {Math.round(calculateVAT()).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8 pt-6 border-t border-black/10">
              <span className="text-[15px] text-black/50 uppercase">Grand Total</span>
              <span className="text-[18px] font-bold text-[#D87D4A]">
                $ {calculateGrandTotal().toLocaleString()}
              </span>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] h-[48px]"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
