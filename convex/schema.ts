import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    // Customer details
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    
    // Shipping address
    shippingAddress: v.object({
      street: v.string(),
      city: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    
    // Payment details
    paymentMethod: v.union(
      v.literal("emoney"),
      v.literal("card"),
      v.literal("cod")
    ),
    
    // Order items
    items: v.array(
      v.object({
        id: v.string(),
        productSlug: v.string(),
        productName: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    
    // Totals
    subtotal: v.number(),
    shippingCost: v.number(),
    vat: v.number(),
    total: v.number(),
    
    // Order status
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    
    // Timestamp
    createdAt: v.string(),
  })
    .index("by_email", ["customerEmail"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),
});
