import { useEffect } from 'react'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer — full width on mobile, max-md on larger screens */}
      <aside
        className="fixed right-0 top-0 bottom-0 z-50 w-full sm:max-w-md bg-[#141414] border-l border-[#2a2a2a] animate-slide-in-right flex flex-col"
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-[#c9b99a]" />
            <h2 className="font-display text-xl sm:text-2xl tracking-widest text-[#e8e6e0]">Your Cart</h2>
            {totalItems > 0 && (
              <span className="bg-[#c9b99a] text-[#0a0a0a] text-[10px] font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2.5 -mr-1 text-[#888888] hover:text-[#e8e6e0] transition-colors touch-manipulation"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 p-8 text-center">
              <ShoppingBag size={44} className="text-[#2a2a2a]" strokeWidth={1} />
              <div>
                <p className="text-[#888888] text-sm mb-1">Your cart is empty.</p>
                <p className="text-[#3a3a3a] text-xs">Add something from the shop.</p>
              </div>
              <button
                onClick={closeCart}
                className="btn-primary px-6 py-3 text-xs"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[#1e1e1e]">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="p-4 sm:p-5 flex gap-3 sm:gap-4 hover:bg-[#1a1a1a] transition-colors"
                >
                  {/* Image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1e1e1e] overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-[#e8e6e0] text-sm font-medium leading-tight truncate">
                          {item.product.name}
                        </h3>
                        <p className="tag text-[#888888] mt-1 text-[10px]">
                          {item.color} · {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                        className="p-1 text-[#3a3a3a] hover:text-[#8b1a1a] transition-colors flex-shrink-0 touch-manipulation"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty controls — bigger touch targets */}
                      <div className="flex items-center border border-[#2a2a2a]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-9 h-9 flex items-center justify-center text-[#888888] hover:text-[#e8e6e0] disabled:opacity-30 transition-colors touch-manipulation"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-[#e8e6e0] text-sm font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-[#888888] hover:text-[#e8e6e0] transition-colors touch-manipulation"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-[#e8e6e0] font-semibold text-sm tabular-nums">
                        {(item.product.price * item.quantity).toLocaleString()} MAD
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#2a2a2a] px-4 sm:px-6 py-4 sm:py-5 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#888888]">Subtotal</span>
              <span className="text-[#e8e6e0] font-semibold text-base tabular-nums">
                {totalPrice.toLocaleString()} MAD
              </span>
            </div>
            <p className="text-[#3a3a3a] text-xs">
              Free delivery within Casablanca.
            </p>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="btn-primary flex items-center justify-center gap-2 px-6 py-4 w-full text-sm touch-manipulation"
            >
              Checkout — {totalPrice.toLocaleString()} MAD
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-center text-[#888888] text-xs hover:text-[#e8e6e0] transition-colors tag py-1 touch-manipulation"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
