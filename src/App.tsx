import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Location from './pages/Location'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-20">
      <div className="text-center">
        <p className="font-display text-[8rem] leading-none text-[#1e1e1e] tracking-wider">404</p>
        <p className="font-display text-4xl text-[#e8e6e0] tracking-wider mb-3">Page Not Found</p>
        <p className="text-[#888888] text-sm mb-8">You wandered into the shadows.</p>
        <a href="/" className="btn-primary px-8 py-4 rounded text-sm inline-block">
          Go Home
        </a>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </BrowserRouter>
  )
}
