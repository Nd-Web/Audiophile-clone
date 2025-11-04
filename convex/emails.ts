import { v } from "convex/values";
import { action } from "./_generated/server";

// Send order confirmation email
export const sendOrderConfirmation = action({
  args: {
    orderId: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    items: v.array(
      v.object({
        productName: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    shippingAddress: v.object({
      street: v.string(),
      city: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    subtotal: v.number(),
    shippingCost: v.number(),
    vat: v.number(),
    total: v.number(),
  },
  handler: async (ctx, args) => {
    console.log("📧 Starting email send process for order:", args.orderId);
    console.log("📧 Customer Email:", args.customerEmail);
    console.log("📧 Admin Recipient Email: ndubuisiekeh169@gmail.com");
    console.log("📧 Items count:", args.items.length);
    console.log("📧 Total amount:", args.total);
    
    // Generate email HTML
    const emailHtml = generateOrderConfirmationEmail(args);
    console.log("✅ Email HTML generated successfully");
    
    try {
      // Check if RESEND_API_KEY is configured
      if (!process.env.RESEND_API_KEY) {
        console.error("❌ RESEND_API_KEY not configured in environment");
        throw new Error("RESEND_API_KEY is not configured");
      }
      
      console.log("📧 Sending email via Resend API...");
      
      // Define recipient email (admin/primary recipient)
      const adminEmail = "ndubuisiekeh169@gmail.com";
      
      // Send email to admin recipient (primary)
      console.log("📧 Sending confirmation to admin:", adminEmail);
      const adminResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Audiophile <orders@audiophile.com>",
          to: adminEmail,
          cc: args.customerEmail,
          subject: `Order Confirmation - #${args.orderId.substring(0, 8).toUpperCase()}`,
          html: emailHtml,
        }),
      });

      console.log("📧 Admin email response status:", adminResponse.status);

      if (!adminResponse.ok) {
        const errorData = await adminResponse.json();
        console.error("❌ Resend API error (admin email):", JSON.stringify(errorData, null, 2));
        throw new Error(`Failed to send email: ${adminResponse.statusText}`);
      }

      const adminResult = await adminResponse.json();
      console.log("✅ Email sent successfully to admin via Resend!");
      console.log("📧 Admin Email ID:", adminResult.id);
      console.log("📧 CC'd to customer:", args.customerEmail);
      console.log("📧 Full response:", JSON.stringify(adminResult, null, 2));
      
      return { 
        success: true, 
        message: "Order confirmation email sent to admin with customer CC'd",
        emailId: adminResult.id,
        recipient: adminEmail,
        ccRecipient: args.customerEmail,
        orderId: args.orderId
      };
    } catch (error) {
      console.error("❌ Error sending order confirmation email:", error);
      console.error("❌ Error details:", error instanceof Error ? error.message : "Unknown error");
      throw new Error(`Failed to send order confirmation email: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  },
});

// Generate order confirmation email HTML
function generateOrderConfirmationEmail(args: {
  orderId: string;
  customerName: string;
  items: Array<{ productName: string; price: number; quantity: number }>;
  shippingAddress: { street: string; city: string; zipCode: string; country: string };
  subtotal: number;
  shippingCost: number;
  vat: number;
  total: number;
}): string {
  const itemsHtml = args.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
            <strong>${item.productName}</strong><br/>
            <span style="color: #6b7280; font-size: 14px;">Qty: ${item.quantity}</span>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
            <strong>$${(item.price * item.quantity).toLocaleString()}</strong>
          </td>
        </tr>
      `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #d87d4a 0%, #c96a3a 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; letter-spacing: -0.5px;">
                    AUDIOPHILE
                  </h1>
                </td>
              </tr>
              
              <!-- Success Icon -->
              <tr>
                <td style="padding: 40px 30px 20px; text-align: center;">
                  <div style="width: 80px; height: 80px; background-color: #d87d4a; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                    <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill="white"/>
                    </svg>
                  </div>
                </td>
              </tr>
              
              <!-- Greeting -->
              <tr>
                <td style="padding: 0 30px 30px; text-align: center;">
                  <h2 style="margin: 0 0 10px; color: #111827; font-size: 28px; font-weight: bold;">
                    Thank You, ${args.customerName}!
                  </h2>
                  <p style="margin: 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
                    Your order has been confirmed and will be processed soon.
                  </p>
                </td>
              </tr>
              
              <!-- Order ID -->
              <tr>
                <td style="padding: 0 30px 30px;">
                  <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; text-align: center;">
                    <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">
                      Order ID
                    </p>
                    <p style="margin: 0; color: #d87d4a; font-size: 20px; font-weight: bold; font-family: monospace;">
                      #${args.orderId.substring(0, 8).toUpperCase()}
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- Order Items -->
              <tr>
                <td style="padding: 0 30px 20px;">
                  <h3 style="margin: 0 0 20px; color: #111827; font-size: 18px; font-weight: bold;">
                    Order Summary
                  </h3>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${itemsHtml}
                    
                    <tr>
                      <td style="padding: 16px 0 8px;">
                        <span style="color: #6b7280;">Subtotal</span>
                      </td>
                      <td style="padding: 16px 0 8px; text-align: right;">
                        $${args.subtotal.toLocaleString()}
                      </td>
                    </tr>
                    
                    <tr>
                      <td style="padding: 8px 0;">
                        <span style="color: #6b7280;">Shipping</span>
                      </td>
                      <td style="padding: 8px 0; text-align: right;">
                        $${args.shippingCost.toLocaleString()}
                      </td>
                    </tr>
                    
                    <tr>
                      <td style="padding: 8px 0 16px;">
                        <span style="color: #6b7280;">VAT (20%)</span>
                      </td>
                      <td style="padding: 8px 0 16px; text-align: right;">
                        $${args.vat.toLocaleString()}
                      </td>
                    </tr>
                    
                    <tr>
                      <td style="padding: 16px 0 0; border-top: 2px solid #e5e7eb;">
                        <strong style="color: #111827; font-size: 18px;">Grand Total</strong>
                      </td>
                      <td style="padding: 16px 0 0; border-top: 2px solid #e5e7eb; text-align: right;">
                        <strong style="color: #d87d4a; font-size: 22px;">$${args.total.toLocaleString()}</strong>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Shipping Address -->
              <tr>
                <td style="padding: 20px 30px;">
                  <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px;">
                    <h3 style="margin: 0 0 12px; color: #111827; font-size: 16px; font-weight: bold;">
                      Shipping Address
                    </h3>
                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      ${args.shippingAddress.street}<br/>
                      ${args.shippingAddress.city}, ${args.shippingAddress.zipCode}<br/>
                      ${args.shippingAddress.country}
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- CTA Button -->
              <tr>
                <td style="padding: 20px 30px 40px; text-align: center;">
                  <a href="https://audiophile.com/orders/${args.orderId}" 
                     style="display: inline-block; background-color: #d87d4a; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: bold; font-size: 16px; letter-spacing: 0.5px;">
                    VIEW YOUR ORDER
                  </a>
                </td>
              </tr>
              
              <!-- Support Info -->
              <tr>
                <td style="padding: 30px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                    Questions? Contact us at 
                    <a href="mailto:support@audiophile.com" style="color: #d87d4a; text-decoration: none;">
                      support@audiophile.com
                    </a>
                  </p>
                  <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                    © ${new Date().getFullYear()} Audiophile. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
