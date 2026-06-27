import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems, openCart } = useCart()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [location.pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'New Drops', to: '/shop?filter=new' },
    { label: 'About', to: '/about' },
    { label: 'Location', to: '/location' },
    { label: 'Contact', to: '/contact' },
  ]

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to.split('?')[0])
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-[#2a2a2a]'
            : 'bg-gradient-to-b from-black/70 to-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">

            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 group min-w-0"
              aria-label="BLACK BEAR Home"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[#e8e6e0] group-hover:bg-[#c9b99a] transition-colors duration-300 flex-shrink-0">
                <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" className="w-6 sm:w-8 h-auto">
                  <text
                    x="0" y="34"
                    fontFamily="Georgia, 'Times New Roman', serif"
                    fontSize="38"
                    fontWeight="700"
                    fill="#0a0a0a"
                    letterSpacing="-1"
                  >BBR</text>
                </svg>
              </div>
              <div className="flex flex-col leading-none min-w-0">
                <span className="font-display text-[13px] sm:text-[15px] tracking-[0.18em] text-[#e8e6e0] group-hover:text-[#c9b99a] transition-colors truncate">
                  BLACK BEAR
                </span>
                <span className="tag text-[7px] sm:text-[8px] text-[#3a3a3a] tracking-[0.2em] mt-0.5 hidden xs:block">
                  CASA · MOROCCO
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <ul className="hidden md:flex items-center gap-6 lg:gap-8" role="navigation">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`tag text-[10px] lg:text-xs transition-colors duration-200 pb-0.5 border-b ${
                      isActive(link.to)
                        ? 'text-[#c9b99a] border-[#c9b99a]'
                        : 'text-[#888888] border-transparent hover:text-[#e8e6e0] hover:border-[#e8e6e0]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ── Actions ── */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={openCart}
                className="relative p-2.5 text-[#888888] hover:text-[#e8e6e0] transition-colors"
                aria-label={`Open cart, ${totalItems} items`}
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-[16px] rounded-full bg-[#c9b99a] text-[#0a0a0a] text-[9px] font-bold flex items-center justify-center px-1 animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2.5 text-[#888888] hover:text-[#e8e6e0] transition-colors"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0a0a0a]/97 backdrop-blur-md flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Close button top-right */}
          <div className="flex justify-end px-4 pt-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2.5 text-[#888888] hover:text-[#e8e6e0] transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col justify-center px-8 pb-8">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <li
                  key={link.to}
                  className="animate-fade-in-up opacity-0 border-b border-[#141414]"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between py-4 font-display text-4xl sm:text-5xl tracking-widest transition-colors group ${
                      isActive(link.to) ? 'text-[#c9b99a]' : 'text-[#e8e6e0] hover:text-[#c9b99a]'
                    }`}
                  >
                    {link.label}
                    <span className="text-[#2a2a2a] group-hover:text-[#c9b99a] text-2xl transition-colors">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-8 pb-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-[#e8e6e0] flex-shrink-0">
                <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" className="w-6 h-auto">
                  <text x="0" y="34" fontFamily="Georgia, 'Times New Roman', serif" fontSize="38" fontWeight="700" fill="#0a0a0a" letterSpacing="-1">BBR</text>
                </svg>
              </div>
              <p className="text-[#3a3a3a] tag text-[10px]">blackbear.ma — Casa, Morocco</p>
            </div>
            <a
              href="https://www.instagram.com/blackbear.ma/"
              target="_blank"
              rel="noopener noreferrer"
              className="tag text-[#3a3a3a] text-[10px] hover:text-[#c9b99a] transition-colors"
            >
              @blackbear.ma
            </a>
          </div>
        </div>
      )}
    </>
  )
}
