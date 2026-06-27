import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import type { Product, Size } from '../data/products'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
  product: Product
}

const COLOR_MAP: Record<string, string> = {
  Black: '#0a0a0a',
  White: '#f0ede6',
  Grey: '#555555',
  Khaki: '#8b7d5a',
  Beige: '#c9b99a',
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0])
  const [selectedColor] = useState(product.colors[0])
  const [imgLoaded, setImgLoaded] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, selectedSize, selectedColor)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  return (
    <article className="group card-hover bg-[#141414] overflow-hidden border border-[#1e1e1e] hover:border-[#2a2a2a] flex flex-col">

      {/* ── Image ── */}
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden"
        style={{ aspectRatio: '3/4' }}
        aria-label={`View ${product.name}`}
      >
        {/* Skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 shimmer bg-[#1a1a1a]" />
        )}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 image-overlay opacity-30 group-hover:opacity-50 transition-opacity duration-300" />

        {/* Badge */}
        {product.badge ? (
          <div className="absolute top-2.5 left-2.5 bg-[#c9b99a] text-[#0a0a0a] tag px-2 py-0.5 text-[9px] sm:text-[10px]">
            {product.badge}
          </div>
        ) : product.isBestSeller ? (
          <div className="absolute top-2.5 left-2.5 bg-[#0a0a0a]/80 border border-[#2a2a2a] text-[#888888] tag px-2 py-0.5 text-[9px] sm:text-[10px]">
            Best Seller
          </div>
        ) : null}
      </Link>

      {/* ── Info ── */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">

        {/* Name + Price */}
        <div className="flex items-start justify-between gap-1.5 mb-2">
          <div className="min-w-0">
            <Link
              to={`/product/${product.id}`}
              className="text-[#e8e6e0] font-medium text-xs sm:text-sm hover:text-[#c9b99a] transition-colors leading-tight block truncate"
            >
              {product.name}
            </Link>
            <p className="tag text-[#3a3a3a] text-[9px] mt-0.5">{product.category}</p>
          </div>
          <span className="text-[#c9b99a] font-semibold text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
            {product.price.toLocaleString()} MAD
          </span>
        </div>

        {/* Color dots */}
        <div className="flex items-center gap-1.5 mb-2.5">
          {product.colors.map((color) => (
            <div
              key={color}
              title={color}
              className="w-3 h-3 rounded-full border border-[#2a2a2a] flex-shrink-0"
              style={{ backgroundColor: COLOR_MAP[color] ?? '#888888' }}
            />
          ))}
          {product.colors.length > 1 && (
            <span className="text-[#3a3a3a] text-[9px] ml-0.5 tag">{product.colors.length} colors</span>
          )}
        </div>

        {/* Sizes — larger touch targets on mobile */}
        {product.sizes[0] !== 'One Size' ? (
          <div className="flex items-center gap-1 sm:gap-1.5 mb-3 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[32px] sm:min-w-[34px] h-8 sm:h-8 px-1 text-[10px] sm:text-[11px] border font-medium transition-all duration-150 touch-manipulation ${
                  selectedSize === size
                    ? 'border-[#c9b99a] text-[#c9b99a] bg-[#c9b99a]/10'
                    : 'border-[#2a2a2a] text-[#888888] hover:border-[#3a3a3a] hover:text-[#e8e6e0]'
                }`}
                aria-label={`Size ${size}`}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        ) : (
          <p className="tag text-[#3a3a3a] text-[9px] mb-3">One Size</p>
        )}

        {/* Add to cart — full width, good touch target */}
        <button
          onClick={handleQuickAdd}
          className={`mt-auto w-full flex items-center justify-center gap-2 py-3 sm:py-3 border transition-all duration-250 tag text-[10px] sm:text-[11px] touch-manipulation ${
            justAdded
              ? 'bg-[#1a3a1a] border-green-800 text-green-400'
              : 'bg-[#1e1e1e] hover:bg-[#e8e6e0] hover:text-[#0a0a0a] text-[#e8e6e0] border-[#2a2a2a] hover:border-[#e8e6e0]'
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag size={12} />
          {justAdded ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}
