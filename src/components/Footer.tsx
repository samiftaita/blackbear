import { Link } from 'react-router-dom'
import { MapPin, Mail } from 'lucide-react'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="3"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1e1e1e]">
      {/* Top stripe */}
      <div className="border-b border-[#1e1e1e] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="tag text-[#888888] tracking-widest">
            Premium Streetwear from the shadows of Casa
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/blackbear.ma/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] hover:text-[#c9b99a] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://maps.app.goo.gl/BBm6ZqbKpvEcn2ug7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] hover:text-[#c9b99a] transition-colors"
              aria-label="Location"
            >
              <MapPin size={18} />
            </a>
            <a
              href="mailto:contact@blackbear.ma"
              className="text-[#888888] hover:text-[#c9b99a] transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
            <div className="w-10 h-10 flex items-center justify-center bg-[#e8e6e0] group-hover:bg-[#c9b99a] transition-colors duration-300 flex-shrink-0">
              <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" className="w-8 h-auto">
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
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl tracking-[0.2em] text-[#e8e6e0] group-hover:text-[#c9b99a] transition-colors">
                BLACK BEAR
              </span>
              <span className="tag text-[8px] text-[#3a3a3a] tracking-[0.25em] mt-0.5">
                CASA · MOROCCO
              </span>
            </div>
          </Link>
          <p className="text-[#888888] text-sm leading-relaxed max-w-xs">
            Premium streetwear from the shadows of Casa. Made for the culture. Born in Casablanca, felt everywhere.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9b99a]" />
            <span className="tag text-[#3a3a3a]">Casablanca, Morocco</span>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="tag text-[#c9b99a] mb-6">Shop</h3>
          <ul className="space-y-3">
            {['Hoodies', 'T-Shirts', 'Pants', 'Accessories', 'New Drops'].map((cat) => (
              <li key={cat}>
                <Link
                  to={cat === 'New Drops' ? '/shop?filter=new' : `/shop?category=${cat}`}
                  className="text-[#888888] text-sm hover:text-[#e8e6e0] transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="tag text-[#c9b99a] mb-6">Info</h3>
          <ul className="space-y-3">
            {[
              { label: 'About', to: '/about' },
              { label: 'Contact', to: '/contact' },
              { label: 'Location', to: '/location' },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-[#888888] text-sm hover:text-[#e8e6e0] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <h3 className="tag text-[#c9b99a] mb-3">Orders via WhatsApp</h3>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] text-sm hover:text-[#e8e6e0] transition-colors"
            >
              +212 600-000-000
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1e1e1e] px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[#3a3a3a] text-xs">
          <span>© 2024 BLACK BEAR. All rights reserved.</span>
          <span className="tag tracking-widest">blackbear.ma</span>
        </div>
      </div>
    </footer>
  )
}
