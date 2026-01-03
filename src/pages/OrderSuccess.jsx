import { useLocation, Link } from 'react-router-dom'

const OrderSuccess = () => {
  const location = useLocation()
  const { orderId, paymentMethod } = location.state || {}

  return (
    <div className="pt-40 pb-20 px-8 md:px-16 text-center max-w-2xl mx-auto">
      <div className="mb-8">
        <svg
          className="w-20 h-20 mx-auto text-green-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-4xl font-medium mb-4">Order Placed Successfully!</h1>
        {orderId && (
          <p className="text-lg text-tweed mb-2">Order #: {orderId}</p>
        )}
        <p className="text-tweed">
          {location.state?.note || (
            paymentMethod === 'cod'
              ? 'You will receive a confirmation email shortly. Please have cash ready for delivery.'
              : 'You will receive a confirmation email shortly with your order details.'
          )}
        </p>
        {location.state?.note && (
          <p className="text-sm text-tweed mt-2">{location.state.note}</p>
        )}
      </div>

      <div className="bg-footer p-8 rounded mb-8 text-left">
        <h2 className="text-xl font-medium mb-4">What's Next?</h2>
        <ul className="space-y-2 text-tweed">
          <li>• Check your email for order confirmation</li>
          <li>• We'll process your order and send you shipping updates</li>
          <li>• Expected delivery: 5-7 business days</li>
        </ul>
      </div>

      <div className="flex gap-4 justify-center">
        <Link
          to="/"
          className="bg-navy text-ivory px-8 py-3 hover:bg-olive transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          to="/shop-men"
          className="border-2 border-navy text-navy px-8 py-3 hover:bg-navy hover:text-ivory transition-colors"
        >
          View Products
        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess

