import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const fadeRefs = useRef([])

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
      {/* Hero Section */}
      <section className="relative h-screen">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center top' }}
        >
          <source src="/assets/video/hero-animation.mp4" type="video/mp4" />
        </video>
        <div className="absolute bottom-[15%] left-[8%] max-w-[420px]">
          <h1 className="text-4xl md:text-5xl mb-3 font-medium text-black">
            Seasonless by Design
          </h1>
          <p className="text-base text-black">
            Garments shaped by restraint, built to endure beyond time.
          </p>
        </div>
      </section>

      {/* Winter Collection Glimpse */}
      <section
        ref={(el) => (fadeRefs.current[0] = el)}
        className="fade-in py-32"
      >
        <h2 className="text-3xl md:text-4xl font-medium text-center mb-16">
          The Belmont Winter Collection
        </h2>
        <div className="flex flex-col md:flex-row">
          <Link to="/shop-men" className="flex-1 h-[500px] md:h-[700px] cursor-pointer group">
            <img
              src="/assets/images/hero/wardrobe-1.jpeg"
              alt="Sandstone Half-Zip Knit"
              className="w-full h-full object-cover object-center transition-opacity group-hover:opacity-90"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <Link to="/shop-women" className="flex-1 h-[500px] md:h-[700px] cursor-pointer group">
            <img
              src="/assets/images/hero/wardrobe-2.png"
              alt="Harrington Oversized Pullover — Smoked Charcoal"
              className="w-full h-full object-cover object-center transition-opacity group-hover:opacity-90"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <Link to="/shop-women" className="flex-1 h-[500px] md:h-[700px] cursor-pointer group">
            <img
              src="/assets/images/hero/wardrobe-3.jpeg"
              alt="Core Pullover — Forest Green"
              className="w-full h-full object-cover object-center transition-opacity group-hover:opacity-90"
              loading="lazy"
              decoding="async"
            />
          </Link>
        </div>
      </section>

      {/* Caps Section */}
      <section
        ref={(el) => (fadeRefs.current[1] = el)}
        className="fade-in grid grid-cols-1 md:grid-cols-2 gap-20 py-32 px-8 md:px-16 items-center"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Headwear Drop
          </h2>
          <p className="text-tweed">Quiet statements for everyday wear.</p>
          <Link
            to="/caps"
            className="inline-block mt-8 text-navy border-b border-navy hover:opacity-70 transition-opacity"
          >
            Shop Caps
          </Link>
        </div>
        <div className="h-[400px] md:h-[700px]">
          <img
            src="/assets/images/hero/caps.jpeg"
            alt="Lepus caps collection"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* Summer Collection Preview */}
      <section
        ref={(el) => (fadeRefs.current[2] = el)}
        className="fade-in py-32 px-8 md:px-16 bg-footer"
      >
        <h2 className="text-3xl md:text-4xl font-medium text-center mb-8">
          Summer Collection
        </h2>
        <p className="text-center text-tweed mb-12 max-w-2xl mx-auto">
          Our summer collection is coming soon. Stay tuned for new arrivals.
        </p>
        <div className="text-center">
          <div className="inline-block px-8 py-3 bg-gray-300 text-gray-600 cursor-not-allowed">
            To Be Released Soon
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

