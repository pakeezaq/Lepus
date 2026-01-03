import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { RecentlyViewedProvider } from './context/RecentlyViewedContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import ShopMen from './pages/ShopMen'
import ShopWomen from './pages/ShopWomen'
import Caps from './pages/Caps'
import Perfumes from './pages/Perfumes'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import FAQs from './pages/FAQs'
import ReturnPolicy from './pages/ReturnPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import About from './pages/About'
import WinterMen from './pages/collections/WinterMen'
import WinterWomen from './pages/collections/WinterWomen'
import SummerMen from './pages/collections/SummerMen'
import SummerWomen from './pages/collections/SummerWomen'

function App() {
  return (
    <CartProvider>
      <RecentlyViewedProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop-men" element={<ShopMen />} />
                <Route path="/shop-women" element={<ShopWomen />} />
                <Route path="/caps" element={<Caps />} />
                <Route path="/perfumes" element={<Perfumes />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/about" element={<About />} />
                <Route path="/collections/winter-men" element={<WinterMen />} />
                <Route path="/collections/winter-women" element={<WinterWomen />} />
                <Route path="/collections/summer-men" element={<SummerMen />} />
                <Route path="/collections/summer-women" element={<SummerWomen />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </RecentlyViewedProvider>
    </CartProvider>
  )
}

export default App

