/**
 * Database Types
 * Type definitions for Audiophile e-commerce data models
 */

export interface Product {
  id: number
  slug: string
  name: string
  category: string
  categorySlug: string
  new: boolean
  price: number
  description: string
  features: string
  includes: Array<{
    quantity: number
    item: string
  }>
  mainImage: ResponsiveImage
  categoryImage: ResponsiveImage
  gallery: {
    first: ResponsiveImage
    second: ResponsiveImage
    third: ResponsiveImage
  }
  relatedProducts: Array<{
    slug: string
    name: string
    image: ResponsiveImage
  }>
}

export interface ResponsiveImage {
  mobile: string
  tablet: string
  desktop: string
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface CartItem {
  id: string
  productSlug: string
  quantity: number
  addedAt: string
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: {
    street: string
    city: string
    zipCode: string
    country: string
  }
  paymentMethod: 'emoney' | 'card' | 'cod'
  items: Array<CartItem>
  subtotal: number
  shippingCost: number
  vat: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}
