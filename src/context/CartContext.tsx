import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { Product, Size } from '../data/products'

export interface CartItem {
  product: Product
  size: Size
  color: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, size: Size, color: string, quantity?: number) => void
  removeItem: (productId: string, size: Size, color: string) => void
  updateQuantity: (productId: string, size: Size, color: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = useCallback(
    (product: Product, size: Size, color: string, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.product.id === product.id && i.size === size && i.color === color
        )
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id && i.size === size && i.color === color
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        }
        return [...prev, { product, size, color, quantity }]
      })
      setIsOpen(true)
    },
    []
  )

  const removeItem = useCallback((productId: string, size: Size, color: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.size === size && i.color === color)
      )
    )
  }, [])

  const updateQuantity = useCallback(
    (productId: string, size: Size, color: string, quantity: number) => {
      if (quantity < 1) return
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.size === size && i.color === color
            ? { ...i, quantity }
            : i
        )
      )
    },
    []
  )

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
