/**
 * Database Service
 * Centralized data access layer for Audiophile e-commerce
 * Uses JSON-based storage with localStorage for cart/wishlist persistence
 */

import type { Product, CartItem, Order, Category } from '@/types/database'

class DatabaseService {
  private products: Product[] = []
  private categories: Category[] = [
    { id: 'headphones', name: 'Headphones', slug: 'headphones' },
    { id: 'speakers', name: 'Speakers', slug: 'speakers' },
    { id: 'earphones', name: 'Earphones', slug: 'earphones' }
  ]

  private loadProductsPromise: Promise<void> | null = null

  constructor() {
    // Initialize product loading (async, but don't block constructor)
    this.loadProducts()
  }

  /**
   * Load products from db.json
   */
  private async loadProducts(): Promise<void> {
    // Prevent multiple concurrent loads
    if (this.loadProductsPromise) {
      return this.loadProductsPromise
    }

    this.loadProductsPromise = (async () => {
      try {
        const response = await fetch('/db.json')
        const data = await response.json()
        this.products = this.transformProducts(data.data)
      } catch (error) {
        console.error('Failed to load products:', error)
        this.products = []
      }
    })()

    return this.loadProductsPromise
  }

  /**
   * Transform db.json format to internal Product format
   */
  private transformProducts(rawProducts: any[]): Product[] {
    return rawProducts.map((item) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      category: item.category,
      categorySlug: item.category,
      new: item.new,
      price: item.price,
      description: item.description,
      features: item.features,
      includes: item.includes,
      mainImage: {
        mobile: item.image.mobile,
        tablet: item.image.tablet,
        desktop: item.image.desktop
      },
      categoryImage: {
        mobile: item.categoryImage.mobile,
        tablet: item.categoryImage.tablet,
        desktop: item.categoryImage.desktop
      },
      gallery: {
        first: {
          mobile: item.gallery.first.mobile,
          tablet: item.gallery.first.tablet,
          desktop: item.gallery.first.desktop
        },
        second: {
          mobile: item.gallery.second.mobile,
          tablet: item.gallery.second.tablet,
          desktop: item.gallery.second.desktop
        },
        third: {
          mobile: item.gallery.third.mobile,
          tablet: item.gallery.third.tablet,
          desktop: item.gallery.third.desktop
        }
      },
      relatedProducts: item.others.map((other: any) => ({
        slug: other.slug,
        name: other.name,
        image: {
          mobile: other.image.mobile,
          tablet: other.image.tablet,
          desktop: other.image.desktop
        }
      }))
    }))
  }

  /**
   * Get all products
   */
  async getProducts(): Promise<Product[]> {
    // Always ensure products are loaded by waiting for the load promise
    if (this.loadProductsPromise) {
      await this.loadProductsPromise
    } else if (this.products.length === 0) {
      await this.loadProducts()
    }
    return this.products
  }

  /**
   * Get product by slug
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    const products = await this.getProducts()
    return products.find((p) => p.slug === slug) || null
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    const products = await this.getProducts()
    return products.filter((p) => p.categorySlug === categorySlug)
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    return this.categories
  }

  /**
   * Search products by name or description
   */
  async searchProducts(query: string): Promise<Product[]> {
    const products = await this.getProducts()
    const lowerQuery = query.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * Get new products
   */
  async getNewProducts(): Promise<Product[]> {
    const products = await this.getProducts()
    return products.filter((p) => p.new)
  }

  /**
   * Cart Management (localStorage-based)
   */

  getCart(): CartItem[] {
    const cart = localStorage.getItem('audiophile_cart')
    return cart ? JSON.parse(cart) : []
  }

  addToCart(productSlug: string, quantity: number = 1): void {
    const cart = this.getCart()
    const existingItem = cart.find((item) => item.productSlug === productSlug)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        id: crypto.randomUUID(),
        productSlug,
        quantity,
        addedAt: new Date().toISOString()
      })
    }

    localStorage.setItem('audiophile_cart', JSON.stringify(cart))
    this.notifyCartUpdate()
  }

  updateCartItemQuantity(cartItemId: string, quantity: number): void {
    const cart = this.getCart()
    const item = cart.find((item) => item.id === cartItemId)

    if (item) {
      item.quantity = quantity
      localStorage.setItem('audiophile_cart', JSON.stringify(cart))
      this.notifyCartUpdate()
    }
  }

  removeFromCart(cartItemId: string): void {
    let cart = this.getCart()
    cart = cart.filter((item) => item.id !== cartItemId)
    localStorage.setItem('audiophile_cart', JSON.stringify(cart))
    this.notifyCartUpdate()
  }

  clearCart(): void {
    localStorage.setItem('audiophile_cart', JSON.stringify([]))
    this.notifyCartUpdate()
  }

  getCartCount(): number {
    const cart = this.getCart()
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  async getCartWithProducts(): Promise<Array<CartItem & { product: Product }>> {
    const cart = this.getCart()
    const products = await this.getProducts()

    return cart
      .map((cartItem) => {
        const product = products.find((p) => p.slug === cartItem.productSlug)
        if (!product) return null
        return { ...cartItem, product }
      })
      .filter((item): item is CartItem & { product: Product } => item !== null)
  }

  /**
   * Wishlist Management (localStorage-based)
   */

  getWishlist(): string[] {
    const wishlist = localStorage.getItem('audiophile_wishlist')
    return wishlist ? JSON.parse(wishlist) : []
  }

  addToWishlist(productSlug: string): void {
    const wishlist = this.getWishlist()
    if (!wishlist.includes(productSlug)) {
      wishlist.push(productSlug)
      localStorage.setItem('audiophile_wishlist', JSON.stringify(wishlist))
      this.notifyWishlistUpdate()
    }
  }

  removeFromWishlist(productSlug: string): void {
    let wishlist = this.getWishlist()
    wishlist = wishlist.filter((slug) => slug !== productSlug)
    localStorage.setItem('audiophile_wishlist', JSON.stringify(wishlist))
    this.notifyWishlistUpdate()
  }

  isInWishlist(productSlug: string): boolean {
    const wishlist = this.getWishlist()
    return wishlist.includes(productSlug)
  }

  async getWishlistProducts(): Promise<Product[]> {
    const wishlist = this.getWishlist()
    const products = await this.getProducts()
    return products.filter((p) => wishlist.includes(p.slug))
  }

  /**
   * Order Management (localStorage-based for demo)
   * In production, this would be server-side with database
   */

  getOrders(): Order[] {
    const orders = localStorage.getItem('audiophile_orders')
    return orders ? JSON.parse(orders) : []
  }

  createOrder(order: Omit<Order, 'id' | 'createdAt'>): Order {
    const orders = this.getOrders()
    const newOrder: Order = {
      ...order,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }
    orders.unshift(newOrder)
    localStorage.setItem('audiophile_orders', JSON.stringify(orders))
    return newOrder
  }

  getOrderById(orderId: string): Order | null {
    const orders = this.getOrders()
    return orders.find((order) => order.id === orderId) || null
  }

  /**
   * Event notifications for UI updates
   */

  private cartUpdateListeners: Set<() => void> = new Set()
  private wishlistUpdateListeners: Set<() => void> = new Set()

  onCartUpdate(callback: () => void): () => void {
    this.cartUpdateListeners.add(callback)
    return () => this.cartUpdateListeners.delete(callback)
  }

  onWishlistUpdate(callback: () => void): () => void {
    this.wishlistUpdateListeners.add(callback)
    return () => this.wishlistUpdateListeners.delete(callback)
  }

  private notifyCartUpdate(): void {
    this.cartUpdateListeners.forEach((callback) => callback())
  }

  private notifyWishlistUpdate(): void {
    this.wishlistUpdateListeners.forEach((callback) => callback())
  }
}

// Singleton instance
export const db = new DatabaseService()
