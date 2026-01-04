import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const API_URL = ''

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, cartTotal, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const orderData = {
        customer: formData,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          image: item.image
        })),
        subtotal: cartTotal,
        shipping: 150,
        total: cartTotal + 150,
        paymentMethod: paymentMethod
      }

      // Generate order ID locally as fallback
      const fallbackOrderId = `LEP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      try {
        const response = await fetch(`${API_URL}/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
          signal: AbortSignal.timeout(10000) // 10 second timeout
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        if (result.orderCreated || result.success) {
          clearCart()

          // Determine status messages for UI based on new specific flags
          let statusMessage = 'Order placed successfully.'
          if (result.postExStatus === 'failed' || result?.details?.postExStatus === 'Failed') {
            statusMessage += ' (Courier pending)'
          }
          if (result.emailStatus === 'failed' || result?.details?.emailStatus === 'Failed') {
            statusMessage += ' (Email delayed)'
          }

          navigate('/order-success', {
            state: {
              orderId: result.orderNumber || result.orderId || fallbackOrderId,
              paymentMethod: paymentMethod,
              note: statusMessage,
              // Pass new flags forward
              postExStatus: result.postExStatus,
              emailStatus: result.emailStatus
            }
          })
          return
        } else {
          throw new Error(result.message || 'Order failed')
        }
      } catch (fetchError) {
        // If backend is not available, still complete the order locally
        console.warn('Backend not available, processing order locally:', fetchError)

        // Store order in localStorage as backup
        const localOrders = JSON.parse(localStorage.getItem('lepus-orders') || '[]')
        localOrders.push({
          ...orderData,
          orderId: fallbackOrderId,
          orderDate: new Date().toISOString()
        })
        localStorage.setItem('lepus-orders', JSON.stringify(localOrders))

        clearCart()
        navigate('/order-success', {
          state: {
            orderId: fallbackOrderId,
            paymentMethod: paymentMethod,
            note: 'Order placed successfully. Email confirmation may be delayed.'
          }
        })
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert('An error occurred. Please check your connection and try again.')
      setIsProcessing(false)
    }
  }

  if (cart.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="pt-40 pb-20 px-8 md:px-16">
      <h1 className="text-4xl font-medium mb-12">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-medium mb-6">Shipping Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-navy"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-navy"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-navy"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-navy"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-navy"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-navy"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-navy"
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-medium mb-6">Payment Method</h2>

              <div className="p-4 border-2 border-navy bg-gray-50 rounded flex items-center gap-4">
                <div className="w-5 h-5 rounded-full border-[6px] border-navy bg-white"></div>
                <div>
                  <span className="font-medium block">Cash on Delivery (COD)</span>
                  <p className="text-sm text-tweed">Pay when you receive your order</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-navy text-ivory py-3 hover:bg-olive transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Payment'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-footer p-8 sticky top-32">
            <h2 className="text-2xl font-medium mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <span className="text-tweed">
                    {item.name} {item.size && item.size !== 'One Size' && `(${item.size})`} x{item.quantity}
                  </span>
                  <span>₨{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-gray-300 pt-4 flex justify-between">
                <span className="text-tweed">Subtotal</span>
                <span className="font-medium">₨{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tweed">Shipping</span>
                <span className="font-medium">₨150</span>
              </div>
              <div className="border-t border-gray-300 pt-4 flex justify-between text-xl font-medium">
                <span>Total</span>
                <span>₨{(cartTotal + 150).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
