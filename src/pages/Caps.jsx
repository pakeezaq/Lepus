import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getProductsByCategory } from '../data/products'

const Caps = () => {
  const fadeRefs = useRef([])
  const products = getProductsByCategory('caps')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    fadeRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      fadeRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <div>
      <section className="shop-hero pt-40 pb-20 text-center px-8">
        <h1 className="text-4xl md:text-5xl font-medium mb-3">
          Headwear Drop
        </h1>
        <p className="text-lg text-tweed">
          Refined silhouettes, understated identity.
        </p>
      </section>

      <section className="caps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-20 px-8 md:px-16 pb-32">
        {products.map((product, index) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            ref={(el) => (fadeRefs.current[index] = el)}
            className="fade-in text-center group relative"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[360px] object-cover mb-5 transition-transform duration-300 group-hover:scale-105"
              />
              {product.inStock === false && (
                <div className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 text-xs uppercase tracking-wide">
                  Out of Stock
                </div>
              )}
            </div>
            <h3 className="text-xl font-medium mb-1">{product.name}</h3>
            <p className="text-sm text-tweed mb-2">{product.description}</p>
            <span className="text-base text-navy">
              ₨{product.price.toLocaleString()}
            </span>
          </Link>
        ))}
      </section>
    </div>
  )
}

export default Caps

