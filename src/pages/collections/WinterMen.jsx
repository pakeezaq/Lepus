import { useEffect, useRef } from 'react'
import { getProductsByCategory } from '../../data/products'
import ProductCard from '../../components/ProductCard'

const WinterMen = () => {
  const fadeRefs = useRef([])
  const products = getProductsByCategory('winter', 'men')

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
          Winter Collection — Men
        </h1>
        <p className="text-lg text-tweed">
          Seasonless essentials, crafted for endurance and style.
        </p>
      </section>

      <section className="products-grid flex flex-col gap-20 px-8 md:px-16 pb-32">
        {products.map((product, index) => {
          const isLandscape = index % 2 === 0
          return (
            <div
              key={product.id}
              ref={(el) => (fadeRefs.current[index] = el)}
              className="fade-in"
            >
              <ProductCard
                product={product}
                layout={isLandscape ? 'landscape' : 'portrait'}
              />
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default WinterMen

