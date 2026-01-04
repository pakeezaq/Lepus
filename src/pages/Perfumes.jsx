import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getProductsByCategory } from '../data/products'

const Perfumes = () => {
  const fadeRefs = useRef([])
  const products = getProductsByCategory('perfumes')

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
          Lepus Perfumes
        </h1>
        <p className="text-lg text-tweed">
          Refined scents, modern elegance.
        </p>
      </section>

      <section className="products-grid flex flex-col gap-20 px-8 md:px-16 pb-32">
        {products.map((product, index) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            ref={(el) => (fadeRefs.current[index] = el)}
            className="fade-in text-center group"
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="w-full max-h-[500px] object-contain mb-3 transition-transform duration-300 group-hover:scale-105"
            />
            <h3 className="text-xl mb-1 font-medium">{product.name}</h3>
            <p className="text-tweed">₨{product.price.toLocaleString()}</p>
          </Link>
        ))}
      </section>
    </div>
  )
}

export default Perfumes

