/**
 * Convex Integration Service
 * Handles backend operations for orders and email notifications
 */

import { ConvexHttpClient } from "convex/browser";

// Type for Convex ID (generic until Convex is initialized)
type ConvexId = string;

// Initialize Convex client
// Note: Replace with your actual Convex deployment URL
const CONVEX_URL = (import.meta as any).env?.VITE_CONVEX_URL || "";

let convexClient: ConvexHttpClient | null = null;

function getConvexClient(): ConvexHttpClient {
  if (!CONVEX_URL) {
    throw new Error(
      "VITE_CONVEX_URL environment variable is not set. Please configure Convex deployment URL."
    );
  }
  
  if (!convexClient) {
    convexClient = new ConvexHttpClient(CONVEX_URL);
  }
  
  return convexClient;
}

// Order types
export interface ConvexOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: "emoney" | "card" | "cod";
  items: Array<{
    id: string;
    productSlug: string;
    productName: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  shippingCost: number;
  vat: number;
  total: number;
  status: string;
}

export interface ConvexOrder extends ConvexOrderData {
  _id: ConvexId;
  _creationTime: number;
  createdAt: string;
}

/**
 * Create a new order in Convex
 */
export async function createConvexOrder(
  orderData: ConvexOrderData
): Promise<ConvexId> {
  try {
    const client = getConvexClient();
    
    console.log("📦 Creating order in Convex...", {
      customer: orderData.customerEmail,
      items: orderData.items.length,
      total: orderData.total
    });
    
    // Create order in Convex
    const orderId = await client.mutation("orders:createOrder" as any, orderData);
    console.log("✅ Order created successfully:", orderId);
    
    // Send confirmation email to admin with customer CC'd
    console.log("📧 Sending order confirmation email to admin (ndubuisiekeh169@gmail.com)");
    console.log("📧 Customer email will be CC'd:", orderData.customerEmail);
    try {
      const emailResult = await client.action("emails:sendOrderConfirmation" as any, {
        orderId: orderId.toString(),
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        items: orderData.items.map((item) => ({
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: orderData.shippingAddress,
        subtotal: orderData.subtotal,
        shippingCost: orderData.shippingCost,
        vat: orderData.vat,
        total: orderData.total,
      });
      console.log("✅ Email sent successfully to admin:", emailResult);
      console.log("📧 Admin recipient:", emailResult.recipient);
      console.log("📧 Customer CC'd:", emailResult.ccRecipient);
    } catch (emailError) {
      console.error("⚠️ Email sending failed (order still created):", emailError);
      // Don't throw - order was created successfully, email failure is non-critical
    }
    
    return orderId;
  } catch (error) {
    console.error("❌ Failed to create Convex order:", error);
    throw new Error("Failed to create order. Please try again.");
  }
}

/**
 * Get order by ID from Convex
 */
export async function getConvexOrderById(
  orderId: ConvexId
): Promise<ConvexOrder | null> {
  try {
    const client = getConvexClient();
    return await client.query("orders:getOrderById" as any, { orderId });
  } catch (error) {
    console.error("Failed to fetch order:", error);
    return null;
  }
}

/**
 * Get orders by email from Convex
 */
export async function getConvexOrdersByEmail(
  email: string
): Promise<ConvexOrder[]> {
  try {
    const client = getConvexClient();
    return await client.query("orders:getOrdersByEmail" as any, { email });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
}

/**
 * Check if Convex is configured
 */
export function isConvexConfigured(): boolean {
  return !!CONVEX_URL && CONVEX_URL.trim() !== "";
}
