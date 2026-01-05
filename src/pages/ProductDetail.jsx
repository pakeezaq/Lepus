import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductById, products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useRecentlyViewed } from '../context/RecentlyViewedContext'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { addToRecentlyViewed, recentlyViewed } = useRecentlyViewed()
  const product = getProductById(id)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [expandedSection, setExpandedSection] = useState(null)
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false)

  // Logic to determine which size chart to show
  const getSizeChartImage = (p) => {
    if (!p) return ''
    const id = p.id.toLowerCase()

    // Sandmond, Ashford -> Quarterzip
    if (id.includes('sandmond') || id.includes('ashford')) {
      return '/assets/size-charts/quarter-zip.jpeg'
    }
    // Drift, Core -> Hoodie
    if (id.includes('drift') || id.includes('core')) {
      return '/assets/size-charts/hoodie.jpeg'
    }
    // Harrington, Axis -> Oversized Hoodie
    if (id.includes('harrington') || id.includes('axis')) {
      return '/assets/size-charts/oversized-hoodie.jpeg'
      // Default fallback
    } else {
      return '/assets/size-charts/hoodie.jpeg'
    }
  }

  // Separate effect for tracking view
  useEffect(() => {
    if (!product) {
      navigate('/')
      return
    }
    // Only add to recently viewed if it's not already the first item (prevent infinite loops if context updates)
    addToRecentlyViewed(product)
  }, [id, navigate, addToRecentlyViewed]) // Keep this dependency to ensure it runs correctly

  // Separate effect for initializing size - ONLY runs when ID changes
  useEffect(() => {
    if (product && product.sizes && product.sizes[0] && product.sizes[0] !== 'One Size') {
      setSelectedSize(product.sizes[0])
    } else {
      setSelectedSize('')
    }
  }, [id]) // Critical fix: Only depend on ID, not context functions

  if (!product) return null

  const images = product.images || [product.image]
  const relatedProducts = products
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id &&
        (!product.gender || p.gender === product.gender)
    )
    .slice(0, 4)

  // Filter out current product from recently viewed
  const displayRecentlyViewed = recentlyViewed
    .filter(p => p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity)
    navigate('/cart')
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const changeQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta))
  }

  // Breadcrumbs
  const breadcrumbs = [
    product.gender ? product.gender.charAt(0).toUpperCase() + product.gender.slice(1) : '',
    product.category.charAt(0).toUpperCase() + product.category.slice(1),
  ].filter(Boolean)

  return (
    <div className="pt-24 md:pt-32 pb-20">

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 px-8 md:px-16 max-w-7xl mx-auto">
        {/* Image Gallery - Left Side (60%) */}
        <div className="flex-1 lg:flex-[0.6] relative">
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition-colors hidden md:block"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition-colors hidden md:block"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}

          {/* Main Image */}
          <div className="relative w-full max-w-md mx-auto bg-ivory">
            <img
              src={images[currentImageIndex]}
              alt={`${product.name} ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[500px] object-contain object-center"
            />
          </div>

          {/* Thumbnail Navigation */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 border-2 transition-colors ${idx === currentImageIndex
                    ? 'border-navy'
                    : 'border-transparent hover:border-gray-300'
                    }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info - Right Side (40%) */}
        <div className="flex-1 lg:flex-[0.4] flex flex-col gap-6">
          {/* Product Name & Brand */}
          <div>
            <h1 className="text-3xl md:text-4xl font-medium mb-2">{product.name}</h1>
            <p className="text-sm text-tweed">Lepus</p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            {product.originalPrice && (
              <p className="text-xl text-gray-400 line-through">
                ₨{product.originalPrice.toLocaleString()}
              </p>
            )}
            <p className="text-2xl font-medium text-navy">
              ₨{product.price.toLocaleString()}
            </p>
          </div>

          {/* Size Selector - Ralph Lauren Style */}
          {product.sizes && product.sizes[0] !== 'One Size' && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-3">
                <label className="text-sm font-medium uppercase tracking-wide">Size:</label>
                <button
                  type="button"
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-xs text-tweed underline hover:text-navy cursor-pointer"
                >
                  Size Chart
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setSelectedSize(size)
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                      className={`px-6 py-2.5 border-2 transition-all cursor-pointer font-medium text-sm min-w-[60px] ${isSelected
                        ? 'border-navy bg-navy text-ivory'
                        : 'border-gray-300 hover:border-navy bg-white text-navy'
                        }`}
                      aria-pressed={isSelected}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
              {selectedSize && (
                <p className="text-xs text-tweed mt-2">Selected: {selectedSize}</p>
              )}

            </div>
          )}

          {/* Out of Stock / Add to Cart Button */}
          {product.inStock === false ? (
            <button
              disabled
              className="mt-6 bg-gray-400 text-white uppercase tracking-wide py-4 px-8 cursor-not-allowed w-full"
            >
              Out of Stock
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-navy text-ivory uppercase tracking-wide py-4 px-8 hover:bg-olive transition-colors w-full"
            >
              Add to Cart
            </button>
          )}

          {/* Delivery Info */}
          <div className="flex items-center gap-2 text-sm text-tweed">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>STANDARD DELIVERY: ₨150</span>
          </div>

          {/* Care Instructions */}
          <div className="flex flex-col items-center gap-2 py-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-xs uppercase tracking-wide">Washable</span>
          </div>

          {/* Product Description */}
          <div className="mt-4">
            <p className="text-sm text-tweed leading-relaxed">{product.description}</p>
          </div>

          {/* Expandable Sections */}
          <div className="mt-6 space-y-2 border-t border-gray-200 pt-6">
            {[
              { id: 'details', title: 'PRODUCT DETAILS', icon: '🏷️' },
              { id: 'delivery', title: 'DELIVERY & RETURNS', icon: '🚚' },
              { id: 'payment', title: 'PAYMENT OPTIONS', icon: '💳' },
            ].map((section) => (
              <div key={section.id} className="border-b border-gray-200">
                <button
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className="w-full flex items-center justify-between py-4 text-sm uppercase tracking-wide hover:text-navy transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>{section.icon}</span>
                    <span>{section.title}</span>
                  </div>
                  <span>{expandedSection === section.id ? '−' : '+'}</span>
                </button>
                {expandedSection === section.id && (
                  <div className="pb-4 text-sm text-tweed">
                    {section.id === 'details' && (
                      <p>Premium quality materials. Care instructions included with product.</p>
                    )}
                    {section.id === 'delivery' && (
                      <p>Standard delivery: ₨150. Returns accepted within 7 days of delivery.</p>
                    )}
                    {section.id === 'payment' && (
                      <p>We accept cash on delivery, bank transfers, and major credit/debit cards.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recently Viewed Products */}
      {displayRecentlyViewed.length > 0 && (
        <section className="mt-32 px-8 md:px-16">
          <h2 className="text-3xl font-medium text-center mb-12">
            Recently Viewed
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {displayRecentlyViewed.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group cursor-pointer"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full aspect-[3/4] object-cover mb-3 transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="text-sm font-medium mb-1">{p.name}</h3>
                <p className="text-xs text-tweed">₨{p.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 px-8 md:px-16">
          <h2 className="text-3xl font-medium text-center mb-12">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group cursor-pointer"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full aspect-[3/4] object-cover mb-3 transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="text-sm font-medium mb-1">{p.name}</h3>
                <p className="text-xs text-tweed">₨{p.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      {/* Size Chart Modal */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsSizeChartOpen(false)}>
          <div className="relative bg-[#f6f3ee] max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setIsSizeChartOpen(false)}
              className="absolute top-4 right-4 text-2xl text-navy hover:text-olive font-bold z-10"
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-2xl font-medium mb-6 text-center">Size Guide</h3>
            <div className="flex justify-center">
              <img
                src={getSizeChartImage(product)}
                alt={`${product.name} Size Chart`}
                className="w-full h-auto object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x400?text=Size+Chart+Not+Found';
                }}
              />
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSizeChartOpen(false)}
                className="bg-navy text-ivory px-8 py-2 uppercase text-sm tracking-wide hover:bg-olive transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
