import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart()

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-20 px-8 text-center">
        <h1 className="text-4xl font-medium mb-8">Your Cart is Empty</h1>
        <p className="text-tweed mb-12">Start shopping to add items to your cart.</p>
        <Link
          to="/shop-men"
          className="inline-block bg-navy text-ivory px-8 py-3 hover:bg-olive transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-40 pb-20 px-8 md:px-16">
      <h1 className="text-4xl font-medium mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item, index) => (
            <div
              key={`${item.id}-${item.size}-${index}`}
              className="flex flex-col md:flex-row gap-6 pb-8 border-b border-gray-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full md:w-48 h-64 md:h-48 object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-medium mb-2">{item.name}</h3>
                {item.size && item.size !== 'One Size' && (
                  <p className="text-sm text-tweed mb-2">Size: {item.size}</p>
                )}
                <p className="text-lg text-navy font-medium mb-4">
                  ₨{item.price.toLocaleString()}
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <label className="text-sm">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-sm text-tweed hover:text-navy underline"
                >
                  Remove
                </button>
              </div>
              <div className="text-right">
                <p className="text-xl font-medium">
                  ₨{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-footer p-8 sticky top-32">
            <h2 className="text-2xl font-medium mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
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
            <Link
              to="/checkout"
              className="block w-full bg-navy text-ivory text-center py-3 hover:bg-olive transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/shop-men"
              className="block w-full text-center py-3 mt-4 text-navy border border-navy hover:bg-navy hover:text-ivory transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

