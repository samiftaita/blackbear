import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, Plus, Minus, Heart, Share2 } from 'lucide-react'
import { products } from '../data/products'
import type { Size } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const product = products.find((p) => p.id === id)

  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] ?? '')
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="font-display text-6xl text-[#1e1e1e] tracking-wider mb-4">404</p>
          <p className="text-[#888888] mb-6">Product not found.</p>
          <Link to="/shop" className="btn-primary px-6 py-3 rounded text-sm inline-block">
            Back to Shop
          </Link>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    if (product.sizes[0] !== 'One Size' && !selectedSize) {
      setSizeError(true)
      return
    }
    const size = product.sizes[0] === 'One Size' ? 'One Size' : selectedSize!
    addItem(product, size, selectedColor, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)

  const colorMap: Record<string, string> = {
    Black: '#0a0a0a',
    White: '#f0ede6',
    Grey: '#555555',
    Khaki: '#8b7d5a',
    Beige: '#c9b99a',
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-14 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#888888] hover:text-[#e8e6e0] transition-colors text-sm flex-shrink-0"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <span className="text-[#2a2a2a] flex-shrink-0">/</span>
          <Link to="/shop" className="text-[#888888] hover:text-[#e8e6e0] text-sm transition-colors flex-shrink-0">
            Shop
          </Link>
          <span className="text-[#2a2a2a] flex-shrink-0">/</span>
          <span className="text-[#888888] text-sm truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-20">

          {/* ── Images ── */}
          <div className="space-y-3">
            {/* Main image — shorter ratio on mobile */}
            <div className="bg-[#141414] overflow-hidden relative" style={{ aspectRatio: window.innerWidth < 640 ? '1/1' : '4/5' }}>
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#c9b99a] text-[#0a0a0a] tag px-2.5 py-1 text-[10px]">
                  {product.badge}
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 sm:gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-20 sm:w-20 sm:h-24 bg-[#141414] overflow-hidden border-2 transition-all touch-manipulation ${
                      activeImage === i ? 'border-[#c9b99a]' : 'border-transparent hover:border-[#2a2a2a]'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details ── */}
          <div className="lg:pt-4">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <span className="tag text-[#888888] text-[10px] mb-2 block">{product.category}</span>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#e8e6e0] tracking-wider leading-none">
                  {product.name}
                </h1>
              </div>
              <button className="p-2 text-[#3a3a3a] hover:text-[#c9b99a] transition-colors mt-1 touch-manipulation" aria-label="Save to wishlist">
                <Heart size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-5 mt-3">
              <span className="text-[#c9b99a] font-semibold text-xl sm:text-2xl tabular-nums">
                {product.price.toLocaleString()} MAD
              </span>
              {product.isNew && (
                <span className="bg-[#c9b99a]/10 border border-[#c9b99a] text-[#c9b99a] tag px-2.5 py-1 text-[10px]">
                  New Drop
                </span>
              )}
            </div>

            <div className="divider mb-5" />

            {/* Description */}
            <p className="text-[#888888] text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Color selector */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="tag text-[#888888] text-xs">Color</span>
                <span className="text-[#e8e6e0] text-sm">{selectedColor}</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    className={`w-9 h-9 rounded-full border-2 transition-all touch-manipulation ${
                      selectedColor === color
                        ? 'border-[#c9b99a] scale-110'
                        : 'border-[#2a2a2a] hover:border-[#3a3a3a]'
                    }`}
                    style={{ backgroundColor: colorMap[color] ?? '#888888' }}
                    aria-label={`Color: ${color}`}
                    aria-pressed={selectedColor === color}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            {product.sizes[0] !== 'One Size' ? (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="tag text-[#888888] text-xs">Size</span>
                  {sizeError && (
                    <span className="text-[#8b1a1a] text-xs tag">Please select a size</span>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false) }}
                      className={`min-w-[52px] py-3 px-3 border text-sm font-medium transition-all touch-manipulation ${
                        selectedSize === size
                          ? 'border-[#e8e6e0] text-[#0a0a0a] bg-[#e8e6e0]'
                          : sizeError
                          ? 'border-[#8b1a1a]/50 text-[#888888]'
                          : 'border-[#2a2a2a] text-[#888888] hover:border-[#e8e6e0] hover:text-[#e8e6e0]'
                      }`}
                      aria-label={`Size ${size}`}
                      aria-pressed={selectedSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-5">
                <span className="tag text-[#888888] text-xs">Size</span>
                <p className="text-[#e8e6e0] text-sm mt-2">One Size Fits All</p>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <span className="tag text-[#888888] text-xs block mb-3">Quantity</span>
              <div className="flex items-center border border-[#2a2a2a] w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-[#888888] hover:text-[#e8e6e0] transition-colors touch-manipulation"
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-[#e8e6e0] font-medium tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-[#888888] hover:text-[#e8e6e0] transition-colors touch-manipulation"
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-3 py-4 transition-all duration-300 font-semibold text-sm touch-manipulation ${
                  added
                    ? 'bg-[#1a3a1a] border border-green-700 text-green-400'
                    : 'btn-primary'
                }`}
              >
                <ShoppingBag size={17} />
                {added ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
              <button
                className="w-12 sm:w-14 flex items-center justify-center border border-[#2a2a2a] text-[#888888] hover:text-[#e8e6e0] hover:border-[#3a3a3a] transition-colors touch-manipulation"
                aria-label="Share product"
              >
                <Share2 size={15} />
              </button>
            </div>

            <div className="divider mt-6 mb-5" />

            {/* Meta info */}
            <div className="space-y-3">
              {[
                { label: 'Free Delivery', value: 'Within Casablanca' },
                { label: 'Order via', value: 'WhatsApp checkout' },
                { label: 'Returns', value: '7 days for unused items' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="tag text-[#3a3a3a]">{item.label}</span>
                  <span className="text-[#888888]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-16 sm:mt-24">
            <div className="divider mb-8 sm:mb-12" />
            <h2 className="font-display text-3xl sm:text-4xl text-[#e8e6e0] tracking-wider mb-6 sm:mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
