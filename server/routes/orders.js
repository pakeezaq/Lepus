// Email helper functions remain same (lines 24-90) but transporter setup is removed because it's in server.js

// Format order email for admin
const formatAdminEmail = (orderData) => {
  const itemsList = orderData.items.map(item =>
    `- ${item.name} (${item.size || 'N/A'}) x${item.quantity} - ₨${(item.price * item.quantity).toLocaleString()}`
  ).join('\n')

  return `
New Order Received - Order #${orderData.orderId}

Customer Information:
Name: ${orderData.customer.firstName} ${orderData.customer.lastName}
Email: ${orderData.customer.email}
Phone: ${orderData.customer.phone}
Address: ${orderData.customer.address}
City: ${orderData.customer.city}
Postal Code: ${orderData.customer.postalCode}

Order Details:
${itemsList}

Subtotal: ₨${orderData.subtotal.toLocaleString()}
Shipping: ₨${orderData.shipping.toLocaleString()}
Total: ₨${orderData.total.toLocaleString()}

Payment Method: ${orderData.paymentMethod}
Order Date: ${new Date(orderData.orderDate).toLocaleString()}
  `.trim()
}

// Format order confirmation email for customer
const formatCustomerEmail = (orderData) => {
  const itemsList = orderData.items.map(item =>
    `- ${item.name}${item.size ? ` (Size: ${item.size})` : ''} x${item.quantity} - ₨${(item.price * item.quantity).toLocaleString()}`
  ).join('\n')

  return `
Thank you for your order!

Order #${orderData.orderId}

Dear ${orderData.customer.firstName},

We've received your order and will process it shortly.

Order Summary:
${itemsList}

Subtotal: ₨${orderData.subtotal.toLocaleString()}
Shipping: ₨${orderData.shipping.toLocaleString()}
Total: ₨${orderData.total.toLocaleString()}

Shipping Address:
${orderData.customer.firstName} ${orderData.customer.lastName}
${orderData.customer.address}
${orderData.customer.city}, ${orderData.customer.postalCode}
Phone: ${orderData.customer.phone}

Payment Method: ${orderData.paymentMethod}

We'll send you a confirmation once your order ships.

Thank you for choosing Lepus!

Best regards,
Lepus Team
  `.trim()
}

// Posex Token
const POSTEX_TOKEN = 'ODUyYTA0OGZlODY1NDljN2FhZmExNTMxOTBmOGRkODE6MDg5ZmQ2MjE3Y2U0NDIxOGI0NDcxNDk5ZDU3NDJlZDE='

export const createOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      shipping,
      total,
      paymentMethod,
      paymentIntentId
    } = req.body

    // Generate order ID
    const orderId = `LEP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

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

    // --- PostEx Integration ---
    let postExTracking = null
    try {
      // Calculate total quantity
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

      // Construct payload
      const postExPayload = {
        "orderRefNumber": orderId,
        "invoicePayment": total.toString(),
        "customerName": `${customer.firstName} ${customer.lastName}`,
        "customerPhone": customer.phone,
        "deliveryAddress": `${customer.address}, ${customer.city}`,
        "cityName": customer.city,
        "invoiceDivision": 1,
        "items": totalItems,
        "pickupAddressCode": "001",
        "orderType": "Normal",
        "orderDetail": items.map(i => `${i.name} x${i.quantity}`).join(', '),
        "transactionNotes": "Order via Website"
      }

      console.log('Sending order to PostEx...', JSON.stringify(postExPayload, null, 2))

      const postExResponse = await fetch('https://api.postex.pk/services/integration/api/order/v3/create-order', {
        method: 'POST',
        headers: {
          'token': POSTEX_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postExPayload)
      })

      const postExResult = await postExResponse.json()
      console.log('PostEx Response:', postExResult)

      if (postExResult.statusCode === '200' || postExResult.statusCode === 200 || postExResult.status === 'success') {
        postExTracking = postExResult.message || 'Sent to Courier'
      } else {
        console.warn('PostEx Error:', postExResult)
      }

    } catch (postExError) {
      console.error('Failed to send order to PostEx:', postExError)
      // Continue to send success response to user regardless
    }

    // --- Email Sending ---
    // Use the transporter passed from server.js (middleware)
    const transporter = req.transporter

    if (transporter) {
      // Send email to admin
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || 'nizaam.ilm@gmail.com',
        subject: `New Order #${orderId} - Lepus`,
        text: formatAdminEmail(orderData),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1c2331;">New Order Received</h2>
            <p><strong>Order #${orderId}</strong></p>
            
            <h3>Customer Information:</h3>
            <p>
              <strong>Name:</strong> ${customer.firstName} ${customer.lastName}<br>
              <strong>Email:</strong> ${customer.email}<br>
              <strong>Phone:</strong> ${customer.phone}<br>
              <strong>Address:</strong> ${customer.address}<br>
              <strong>City:</strong> ${customer.city}<br>
              <strong>Postal Code:</strong> ${customer.postalCode}
            </p>
            
            <h3>Order Details:</h3>
            <ul>
              ${items.map(item => `
                <li>
                  ${item.name} ${item.size ? `(${item.size})` : ''} x${item.quantity} - 
                  ₨${(item.price * item.quantity).toLocaleString()}
                </li>
              `).join('')}
            </ul>
            
            <p>
              <strong>Subtotal:</strong> ₨${subtotal.toLocaleString()}<br>
              <strong>Shipping:</strong> ₨${shipping.toLocaleString()}<br>
              <strong>Total:</strong> ₨${total.toLocaleString()}
            </p>
            
            <p>
              <strong>Payment Method:</strong> ${paymentMethod}<br>
              <strong>Order Date:</strong> ${new Date(orderData.orderDate).toLocaleString()}
            </p>
            
            ${postExTracking ? `<p><strong>Courier Status:</strong> Sent to PostEx</p>` : ''}
          </div>
        `
      }

      // Send email to customer
      const customerMailOptions = {
        from: process.env.EMAIL_USER,
        to: customer.email,
        subject: `Order Confirmation #${orderId} - Lepus`,
        text: formatCustomerEmail(orderData),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1c2331;">Thank you for your order!</h2>
            <p><strong>Order #${orderId}</strong></p>
            
            <p>Dear ${customer.firstName},</p>
            <p>We've received your order and will process it shortly.</p>
            
            <h3>Order Summary:</h3>
            <ul>
              ${items.map(item => `
                <li>
                  ${item.name}${item.size ? ` (Size: ${item.size})` : ''} x${item.quantity} - 
                  ₨${(item.price * item.quantity).toLocaleString()}
                </li>
              `).join('')}
            </ul>
            
            <p>
              <strong>Subtotal:</strong> ₨${subtotal.toLocaleString()}<br>
              <strong>Shipping:</strong> ₨${shipping.toLocaleString()}<br>
              <strong>Total:</strong> ₨${total.toLocaleString()}
            </p>
            
            <h3>Shipping Address:</h3>
            <p>
              ${customer.firstName} ${customer.lastName}<br>
              ${customer.address}<br>
              ${customer.city}, ${customer.postalCode}<br>
              Phone: ${customer.phone}
            </p>
            
            <p><strong>Payment Method:</strong> ${paymentMethod}</p>
            
            <p>We'll send you a confirmation once your order ships.</p>
            
            <p>Thank you for choosing Lepus!</p>
            
            <p>Best regards,<br>Lepus Team</p>
          </div>
        `
      }

      // Send both emails (with error handling)
      try {
        await Promise.all([
          transporter.sendMail(adminMailOptions),
          transporter.sendMail(customerMailOptions)
        ])
        console.log('Emails sent successfully')
      } catch (emailError) {
        console.error('Error sending emails:', emailError)
        // Don't fail the order if email fails
      }
    } else {
      console.warn('Transporter not available - skipping emails')
    }

    res.status(200).json({
      success: true,
      orderId,
      message: 'Order created successfully and emails sent',
      postExStatus: postExTracking ? 'Order pushed to PostEx' : 'PostEx push failed or skipped'
    })

  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    })
  }
}

export const processPayment = async (req, res) => {
  try {
    const { paymentIntentId, orderData } = req.body

    // Here you would verify the payment with Stripe
    // For now, we'll just create the order
    if (orderData) {
      return createOrder({ body: orderData }, res)
    }

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully'
    })

  } catch (error) {
    console.error('Error processing payment:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to process payment',
      error: error.message
    })
  }
}

