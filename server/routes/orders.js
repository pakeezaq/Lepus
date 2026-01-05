import { normalizeCity } from '../utils/cityNormalizer.js'
import { generateInvoicePDF } from '../utils/pdfGenerator.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// Ensure env vars are loaded for top-level constants
dotenv.config()
// Fallback: expect .env in CWD (server/) or root
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../.env') })

// --- Configuration ---
// Note: dotenv is configured in server.js
const POSTEX_TOKEN = process.env.POSTEX_TOKEN
const ADMIN_EMAIL = 'orders@lepus.com.pk'

// --- Nodemailer Setup ---
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.zoho.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
  tls: { rejectUnauthorized: false }
})

// Transporter verify removed for Render compatibility

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent
    })
    console.log('[Email] Sent:', info.messageId)
    return { success: true, id: info.messageId }
  } catch (err) {
    console.error('[Email] Failed:', err.message)
    return { success: false, error: err.message }
  }
}

// --- PostEx Helper ---
const sendToPostExWithRetry = async (payload, retries = 2) => {
  let lastError = null
  for (let i = 0; i <= retries; i++) {
    try {
      if (i > 0) console.log(`[PostEx] Retry Attempt ${i + 1}/${retries}...`)
      console.log('[PostEx Payload]', JSON.stringify(payload, null, 2))

      const response = await fetch('https://api.postex.pk/services/integration/api/order/v3/create-order', {
        method: 'POST',
        headers: {
          'token': POSTEX_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000)
      })

      const result = await response.json()

      if (
        result.statusCode === '200' ||
        result.statusCode === 200 ||
        result.status === 'success' ||
        result.message === 'Success'
      ) {
        const tracking = result.orderTrackingNumber || result.trackingNumber || result.message || 'Created'
        return { success: true, tracking }
      } else {
        throw new Error(result.message || JSON.stringify(result))
      }
    } catch (error) {
      console.warn(`[PostEx] Attempt ${i + 1} failed:`, error.message)
      lastError = error
      if (i < retries) await new Promise(res => setTimeout(res, 1000 + i * 1000))
    }
  }
  return { success: false, error: lastError }
}

// --- Main Order Handler ---
export const createOrder = async (req, res) => {
  const orderId = `LEP-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`

  try {
    const { customer, items, subtotal, shipping, total, paymentMethod, paymentIntentId } = req.body

    const orderData = {
      orderId,
      customer,
      items,
      subtotal,
      shipping,
      total,
      paymentMethod,
      paymentIntentId,
      orderDate: new Date().toISOString(),
      status: paymentMethod === 'cod' ? 'pending' : 'paid'
    }

    console.log(`[Order] Processing ${orderId} for ${customer.firstName}...`)

    // --- 1. Generate PDF Invoice for PostEx only ---
    try {
      await generateInvoicePDF(orderData)
    } catch (pdfErr) {
      console.error('[Invoice] Generation failed, proceeding...', pdfErr.message)
    }

    // --- 2. Prepare PostEx Payload ---
    const normalizedCity = normalizeCity(customer.city)
    const totalQty = items.reduce((acc, item) => acc + item.quantity, 0)

    const postExPayload = {
      orderRefNumber: orderId,
      invoicePayment: total.toString(),
      customerName: `${customer.firstName} ${customer.lastName}`,
      customerPhone: customer.phone,
      deliveryAddress: `${customer.address}, ${customer.city}`,
      cityName: normalizedCity,
      invoiceDivision: 1,
      items: totalQty,
      pickupAddressCode: "001", // validate with PostEx
      orderType: "Normal",
      orderDetail: items.map(i => `${i.name} (${i.size})`).join(', '),
      transactionNotes: "Lepus Website Order"
      // Optionally add: pdfUrl if PostEx requires
    }

    const postExResult = await sendToPostExWithRetry(postExPayload)
    const postExStatus = postExResult.success ? 'success' : 'failed'
    if (!postExResult.success) console.warn('[PostEx] Failed:', postExResult.error?.message)
    if (postExStatus === 'success') console.log('[PostEx] Success:', postExResult.tracking)

    // --- 3. Prepare Email Content ---
    const websiteUrl = 'https://lepus.com.pk' // Or your Render URL if different for now

    // Construct nicer item list with images
    const itemsHtml = items.map(i => {
      // Correctly handle relative image paths to be absolute URLs
      const imageUrl = i.image.startsWith('http') ? i.image : `${websiteUrl}${i.image}`

      return `
        <div style="display: flex; gap: 16px; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 12px;">
           <img src="${imageUrl}" alt="${i.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;" />
           <div>
              <p style="margin: 0; font-weight: bold; color: #333;">${i.name}</p>
              <p style="margin: 4px 0 0; color: #666; font-size: 14px;">Size: ${i.size || 'N/A'} | Qty: ${i.quantity}</p>
              <p style="margin: 4px 0 0; color: #1c2331; font-weight: 500;">Rs ${i.price.toLocaleString()}</p>
           </div>
        </div>
       `
    }).join('')

    const commonHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 24px;">
           <h2 style="color: #1c2331; letter-spacing: 1px; margin-bottom: 8px;">LEPUS.</h2>
           <p style="color: #666; font-size: 14px; margin: 0;">Order #${orderId}</p>
        </div>

        <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
           <h3 style="margin-top: 0; font-size: 16px; color: #1c2331;">Order Summary</h3>
           ${itemsHtml}
           <div style="display: flex; justify-content: space-between; margin-top: 16px; font-weight: bold; border-top: 2px solid #ddd; padding-top: 12px;">
              <span>Total</span>
              <span>Rs ${total.toLocaleString()}</span>
           </div>
        </div>

        <div style="margin-bottom: 24px;">
           <h3 style="font-size: 16px; color: #1c2331; border-bottom: 1px solid #eee; padding-bottom: 8px;">Shipping Details</h3>
           <p style="margin: 8px 0; line-height: 1.5;">
             ${customer.firstName} ${customer.lastName}<br>
             ${customer.address}<br>
             ${customer.city}, ${customer.postalCode}<br>
             ${customer.phone}
           </p>
           <p style="margin-top: 12px;"><strong>Payment Method:</strong> ${paymentMethod.toUpperCase()}</p>
        </div>

        <div style="text-align: center; margin-top: 40px; font-size: 12px; color: #999;">
           <p>Thank you for choosing Lepus.</p>
           <p>&copy; ${new Date().getFullYear()} Lepus. All rights reserved.</p>
        </div>
      </div>
    `

    // --- 4. Send Emails (Non-blocking) ---
    // We trigger this but don't await it to ensure fast response and no blocking
    const sendOrderEmails = async () => {
      try {
        const [adminRes, customerRes] = await Promise.all([
          sendEmail(ADMIN_EMAIL, `New Order ${orderId}`, `<h2>New Order Received</h2>${commonHtml}<p><strong>PostEx Status:</strong> ${postExStatus} ${!postExResult.success ? `(${postExResult.error?.message})` : ''}</p>`),
          sendEmail(customer.email, `Order Confirmation ${orderId}`, commonHtml)
        ])
        console.log(`[Email] Status for ${orderId}: Admin=${adminRes.success}, Customer=${customerRes.success}`)
      } catch (err) {
        console.error(`[Email] Critical async error for ${orderId}:`, err.message)
      }
    }

    // Fire and forget (errors are caught inside sendOrderEmails and sendEmail)
    sendOrderEmails()

    // --- 5. Return Structured Response ---
    res.status(200).json({
      orderCreated: true,
      success: true,
      orderNumber: orderId,
      postExStatus,
      emailStatus: 'pending' // Status is now delegated to async task
    })

  } catch (err) {
    console.error('[Order] CRITICAL FAILURE:', err)
    res.status(500).json({
      orderCreated: false,
      success: false,
      orderNumber: orderId || null,
      postExStatus: 'failed',
      emailStatus: 'failed',
      error: err.message
    })
  }
}

export const processPayment = async (req, res) => {
  if (req.body.orderData) {
    return createOrder({ body: req.body.orderData }, res)
  }
  res.json({ success: true })
}
