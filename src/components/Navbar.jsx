import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const { cartCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 100)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [window.location.pathname]) // simplified dependency

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || menuOpen
          ? 'bg-footer py-3 px-6 md:px-12 shadow-sm'
          : 'bg-transparent py-4 md:py-6 px-6 md:px-16'
          }`}
      >
        <nav className="flex justify-between items-center relative z-50">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-navy focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <Link
            to="/"
            className={`font-valetia transition-all duration-300 ${scrolled || menuOpen
              ? 'text-3xl md:text-5xl'
              : 'text-4xl md:text-7xl lg:text-8xl'
              }`}
          >
            Lepus
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/shop-women" className="text-sm text-navy hover:opacity-70 transition-opacity">
              Shop Women
            </Link>
            <Link to="/shop-men" className="text-sm text-navy hover:opacity-70 transition-opacity">
              Shop Men
            </Link>
            <Link to="/caps" className="text-sm text-navy hover:opacity-70 transition-opacity">
              Caps
            </Link>
            <Link to="/perfumes" className="text-sm text-navy hover:opacity-70 transition-opacity">
              Perfumes
            </Link>
            <Link to="/cart" className="relative text-navy hover:opacity-70 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-navy text-ivory text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Cart Icon (Always Visible) */}
          <div className="md:hidden">
            <Link to="/cart" className="relative text-navy">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-navy text-ivory text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#f6f3ee] z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${menuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <Link to="/shop-women" className="text-2xl text-navy font-medium" onClick={() => setMenuOpen(false)}>
          Shop Women
        </Link>
        <Link to="/shop-men" className="text-2xl text-navy font-medium" onClick={() => setMenuOpen(false)}>
          Shop Men
        </Link>
        <Link to="/caps" className="text-2xl text-navy font-medium" onClick={() => setMenuOpen(false)}>
          Caps
        </Link>
        <Link to="/perfumes" className="text-2xl text-navy font-medium" onClick={() => setMenuOpen(false)}>
          Perfumes
        </Link>
      </div>
    </>
  )
}


export default Navbar
