import { useEffect, useState } from 'react'
import { db } from '@/services/database'
import type { Product, CartItem } from '@/types/database'

type CartItemWithProduct = CartItem & { product: Product }

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setLoading(true)
      const items = await db.getCartWithProducts()
      setCartItems(items)
    } catch (error) {
      console.error('Failed to load cart in hook:', error)
      setCartItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const unsubscribe = db.onCartUpdate(() => load())
    return unsubscribe
  }, [])

  const cartTotal = cartItems.reduce((sum, it) => sum + it.product.price * it.quantity, 0)
  const shippingCost = cartItems.length > 0 ? 50 : 0
  const vat = Math.round(cartTotal * 0.2 * 100) / 100

  return {
    cartItems,
    cartTotal,
    shippingCost,
    vat,
    loading,
    reload: load
  }
}
