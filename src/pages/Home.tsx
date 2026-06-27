import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, ChevronDown } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="3"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1600&q=85&fit=crop&crop=center',
    label: 'Shadow Hoodie — 399 MAD',
    tag: 'New Drop',
    id: 'shadow-hoodie',
  },
  {
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&q=85&fit=crop&crop=top',
    label: 'Casa Oversized Tee — 249 MAD',
    tag: 'Best Seller',
    id: 'casa-oversized-tee',
  },
  {
    image: 'https://images.unsplash.com/photo-1536766820879-059fec98ec0a?w=1600&q=85&fit=crop&crop=center',
    label: 'Underground Cargo — 449 MAD',
    tag: 'Limited',
    id: 'underground-cargo',
  },
]

export default function Home() {
  const featured = products.slice(0, 4)
  const [activeSlide, setActiveSlide] = useState(0)
  const [prevSlide, setPrevSlide] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  const instagramPosts = [
    'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&q=80&fit=crop',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80&fit=crop',
    'https://images.unsplash.com/photo-1536766820879-059fec98ec0a?w=400&q=80&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80&fit=crop',
  ]

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((activeSlide + 1) % HERO_SLIDES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [activeSlide])

  function goToSlide(index: number) {
    if (transitioning || index === activeSlide) return
    setTransitioning(true)
    setPrevSlide(activeSlide)
    setActiveSlide(index)
    setTimeout(() => {
      setPrevSlide(null)
      setTransitioning(false)
    }, 700)
  }

  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-[#0a0a0a]" style={{ height: '100svh', minHeight: '580px' }}>

        {/* ── Background image layers ── */}
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: i === activeSlide ? 1 : i === prevSlide ? 0 : 0,
              zIndex: i === activeSlide ? 1 : i === prevSlide ? 2 : 0,
            }}
          >
            <img
              src={slide.image}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-top"
              style={{
                transform: i === activeSlide ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 6s ease',
              }}
            />
            {/* Darker gradient on mobile so text is always readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/65 to-[#0a0a0a]/20 sm:via-[#0a0a0a]/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-[#0a0a0a]/40" />
          </div>
        ))}

        {/* ── Noise texture overlay ── */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
          aria-hidden="true"
        />

        {/* ── Left vertical label ── */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#c9b99a]/40" />
          <span
            className="tag text-[#c9b99a]/50 text-[9px] tracking-[0.3em]"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            blackbear.ma — Casa 2024
          </span>
          <div className="w-px h-16 bg-gradient-to-t from-transparent to-[#c9b99a]/40" />
        </div>

        {/* ── Main content ── */}
        <div className="relative z-10 h-full flex flex-col pt-16 sm:pt-20 md:pt-24 px-4 sm:px-8 lg:px-16 max-w-screen-2xl mx-auto">

          {/* Top — eyebrow tag */}
          <div
            className="flex items-center gap-3 pt-2 animate-fade-in-up opacity-0"
            style={{ animationFillMode: 'forwards', animationDelay: '0.1s' }}
          >
            <div className="w-5 sm:w-6 h-px bg-[#c9b99a]" />
            <span className="tag text-[#c9b99a] text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em]">
              Casa, Morocco — Est. 2024
            </span>
          </div>

          {/* Middle — headline fills remaining space */}
          <div className="flex-1 flex items-center py-6 sm:py-8">
            <div className="w-full">
              {/* Watermark — desktop only */}
              <div
                className="absolute left-0 right-0 top-1/2 -translate-y-1/2 text-center pointer-events-none select-none z-0 hidden sm:block"
                aria-hidden="true"
              >
                <span className="font-display text-[clamp(5rem,18vw,18rem)] text-white/[0.025] leading-none tracking-widest">
                  BEAR
                </span>
              </div>

              <div className="relative z-10">
                <h1 className="font-display leading-[0.9] tracking-wide">
                  <span
                    className="block text-[clamp(2.8rem,9.5vw,7.5rem)] text-[#e8e6e0] animate-fade-in-up opacity-0"
                    style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}
                  >
                    Premium
                  </span>
                  <span
                    className="block text-[clamp(2.8rem,9.5vw,7.5rem)] text-[#e8e6e0] animate-fade-in-up opacity-0"
                    style={{ animationFillMode: 'forwards', animationDelay: '0.32s' }}
                  >
                    Streetwear
                  </span>
                  <span
                    className="block text-[clamp(2.8rem,9.5vw,7.5rem)] animate-fade-in-up opacity-0"
                    style={{
                      animationFillMode: 'forwards',
                      animationDelay: '0.44s',
                      color: 'transparent',
                      WebkitTextStroke: '1.5px #c9b99a',
                    }}
                  >
                    From The Shadows
                  </span>
                  <span
                    className="block text-[clamp(2.8rem,9.5vw,7.5rem)] text-[#c9b99a] animate-fade-in-up opacity-0"
                    style={{ animationFillMode: 'forwards', animationDelay: '0.56s' }}
                  >
                    Of Casa.
                  </span>
                </h1>

                {/* Sub + CTAs */}
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-5 sm:mt-10 animate-fade-in-up opacity-0"
                  style={{ animationFillMode: 'forwards', animationDelay: '0.68s' }}
                >
                  <p className="text-[#888888] text-xs sm:text-sm leading-relaxed border-l-2 border-[#c9b99a]/40 pl-3">
                    Made for the culture.<br className="hidden sm:block" /> Limited runs. Worn by the streets.
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                      to="/shop"
                      className="group inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-4 bg-[#e8e6e0] text-[#0a0a0a] font-semibold text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300 hover:bg-[#c9b99a] touch-manipulation"
                    >
                      Shop Now
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <a
                      href="https://maps.app.goo.gl/BBm6ZqbKpvEcn2ug7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 sm:px-7 py-3 sm:py-4 border border-[#e8e6e0]/25 text-[#888888] hover:text-[#e8e6e0] hover:border-[#e8e6e0]/50 font-semibold text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300 touch-manipulation"
                    >
                      <MapPin size={12} />
                      Casa
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom — slide controls, always pushed to bottom */}
          <div
            className="pb-6 sm:pb-10 flex items-end justify-between gap-4 animate-fade-in-up opacity-0"
            style={{ animationFillMode: 'forwards', animationDelay: '0.85s' }}
          >
            {/* Dots + counter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="relative h-0.5 transition-all duration-500 overflow-hidden touch-manipulation"
                    style={{ width: i === activeSlide ? '28px' : '14px' }}
                  >
                    <span className="absolute inset-0 bg-[#3a3a3a]" />
                    {i === activeSlide && (
                      <span
                        className="absolute inset-y-0 left-0 bg-[#c9b99a]"
                        style={{ animation: 'progressBar 5.5s linear forwards' }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <span className="tag text-[#3a3a3a] text-[9px] sm:text-[10px] tabular-nums">
                0{activeSlide + 1} / 0{HERO_SLIDES.length}
              </span>
            </div>

            {/* Product card — sm+ only */}
            <Link
              to={`/product/${HERO_SLIDES[activeSlide].id}`}
              className="hidden sm:flex items-center gap-3 glass px-3 sm:px-4 py-2.5 hover:border-[#c9b99a]/20 transition-all duration-300 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 overflow-hidden bg-[#1a1a1a] flex-shrink-0">
                <img
                  src={HERO_SLIDES[activeSlide].image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="tag text-[#c9b99a] text-[9px] block mb-0.5">{HERO_SLIDES[activeSlide].tag}</span>
                <p className="text-[#e8e6e0] text-xs font-medium">{HERO_SLIDES[activeSlide].label}</p>
              </div>
              <ArrowRight size={11} className="text-[#888888] group-hover:text-[#c9b99a] transition-colors" />
            </Link>

            {/* Scroll — lg+ */}
            <div className="hidden lg:flex flex-col items-center gap-2">
              <ChevronDown size={14} className="text-[#3a3a3a] animate-bounce" />
              <span className="tag text-[#3a3a3a] text-[9px] tracking-widest">Scroll</span>
            </div>
          </div>
        </div>

        {/* ── Right side image panel (desktop) ── */}
        <div className="absolute right-0 top-0 bottom-0 w-[38%] z-[2] hidden xl:block pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
          {HERO_SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === activeSlide ? 1 : 0 }}
            >
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-top"
                style={{ filter: 'contrast(1.05) brightness(0.8)' }}
              />
            </div>
          ))}
          {/* Vertical text on right edge */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#c9b99a]/30" />
            <span
              className="tag text-[#3a3a3a] text-[9px] tracking-[0.25em]"
              style={{ writingMode: 'vertical-rl' }}
            >
              {HERO_SLIDES[activeSlide].tag}
            </span>
            <div className="w-px h-12 bg-gradient-to-t from-transparent to-[#c9b99a]/30" />
          </div>
        </div>
      </section>

      {/* Progress bar keyframe */}
      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      {/* ─── MARQUEE ─── */}
      <div className="bg-[#0d0d0d] border-y border-[#1e1e1e] py-5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 mr-10 flex-shrink-0">
              <span className="font-display text-3xl text-[#222] tracking-widest">BLACK BEAR</span>
              <span className="w-1 h-1 rounded-full bg-[#c9b99a]/30 flex-shrink-0" />
              <span className="font-display text-3xl text-[#c9b99a]/15 tracking-widest">CASA 2024</span>
              <span className="w-1 h-1 rounded-full bg-[#c9b99a]/30 flex-shrink-0" />
              <span className="font-display text-3xl text-[#222] tracking-widest">PREMIUM STREETWEAR</span>
              <span className="w-1 h-1 rounded-full bg-[#c9b99a]/30 flex-shrink-0" />
              <span className="font-display text-3xl text-[#c9b99a]/15 tracking-widest">MADE FOR THE CULTURE</span>
              <span className="w-1 h-1 rounded-full bg-[#c9b99a]/30 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-20 md:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="tag text-[#c9b99a] text-xs mb-3 block">— Featured</span>
              <h2 className="font-display text-5xl md:text-7xl text-[#e8e6e0] tracking-wider">
                New Drops
              </h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-[#888888] hover:text-[#e8e6e0] transition-colors tag text-xs self-start sm:self-end"
            >
              View All
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY ─── */}
      <section className="py-20 md:py-32 bg-[#0d0d0d] border-y border-[#1e1e1e] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image stack */}
            <div className="relative h-80 md:h-[500px]">
              <div className="absolute inset-0 bg-[#141414] rounded" />
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80&fit=crop"
                alt="Brand story"
                className="absolute inset-0 w-full h-full object-cover rounded opacity-80"
                loading="lazy"
              />
              {/* Overlay frame */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-[#c9b99a]/30 rounded" aria-hidden="true" />
              <div className="absolute -top-4 -left-4 w-20 h-20 border border-[#2a2a2a] rounded" aria-hidden="true" />
              {/* Tag */}
              <div className="absolute bottom-6 left-6 glass px-4 py-3 rounded">
                <p className="font-display text-2xl text-[#c9b99a] tracking-wider">Casa</p>
                <p className="tag text-[#888888] text-[10px] mt-0.5">Casablanca, Morocco</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="tag text-[#c9b99a] text-xs mb-4 block">— Our Story</span>
              <h2 className="font-display text-4xl md:text-6xl text-[#e8e6e0] tracking-wider mb-8 leading-tight">
                Born in the
                <br />
                <span className="text-[#c9b99a]">Shadows</span>
                <br />
                of Casa
              </h2>
              <div className="space-y-5 text-[#888888] text-sm md:text-base leading-relaxed">
                <p>
                  BLACK BEAR was born from the streets of Casablanca — a city that moves fast, dresses sharp, and never follows. We're not here to chase trends. We set them.
                </p>
                <p>
                  Every piece is designed with intention: premium materials, urban silhouettes, and that signature dark energy that Casa carries in its bones. Limited runs. No restocks. You either move when it drops, or you wait.
                </p>
                <p>
                  This is more than clothing. It's a statement. <span className="text-[#e8e6e0]">Join the movement.</span>
                </p>
              </div>

              <div className="divider my-8" />

              <div className="grid grid-cols-3 gap-4">
                {[
                  { number: '100+', label: 'Pieces Sold' },
                  { number: '6', label: 'Collections' },
                  { number: 'Casa', label: 'Based' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-3xl text-[#c9b99a] tracking-wider">{stat.number}</p>
                    <p className="tag text-[#3a3a3a] text-[10px] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded mt-8 text-sm"
              >
                About Us
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── JOIN THE MOVEMENT BANNER ─── */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-[#0a0a0a]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80&fit=crop"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 48px, #c9b99a 48px, #c9b99a 49px), repeating-linear-gradient(90deg, transparent, transparent 48px, #c9b99a 48px, #c9b99a 49px)',
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="tag text-[#c9b99a] text-xs mb-4 sm:mb-6 block">— Available Now</span>
          <h2 className="font-display text-[clamp(2.8rem,8vw,7rem)] text-[#e8e6e0] tracking-wider mb-4 sm:mb-6 leading-none">
            Join The<br />Movement
          </h2>
          <p className="text-[#888888] text-sm max-w-sm mx-auto mb-8 sm:mb-10 leading-relaxed">
            Premium streetwear drops without warning. Follow the brand and be ready when Casa speaks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to="/shop" className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm touch-manipulation">
              Shop Collection
              <ArrowRight size={15} />
            </Link>
            <a
              href="https://www.instagram.com/blackbear.ma/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm touch-manipulation"
            >
              <InstagramIcon size={15} />
              @blackbear.ma
            </a>
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM GRID ─── */}
      <section className="py-16 bg-[#0d0d0d] border-t border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-4xl text-[#e8e6e0] tracking-wider">
              @blackbear.ma
            </h2>
            <a
              href="https://www.instagram.com/blackbear.ma/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#888888] hover:text-[#c9b99a] transition-colors tag text-xs"
            >
              <InstagramIcon size={14} />
              Follow Us
            </a>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {instagramPosts.map((src, i) => (
              <a
                key={i}
                href="https://www.instagram.com/blackbear.ma/"
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-square overflow-hidden group relative"
                aria-label={`Instagram post ${i + 1}`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <InstagramIcon size={20} />
                </div>
              </a>
            ))}
          </div>
          <p className="text-center tag text-[#3a3a3a] text-[10px] mt-6">
            Premium Streetwear from the shadows of Casa. Made for the culture.
          </p>
        </div>
      </section>
    </main>
  )
}
