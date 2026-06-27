import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, ShoppingBag, ArrowLeft, CheckCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { WHATSAPP_NUMBER } from '../data/products'

interface FormData {
  fullName: string
  phone: string
  city: string
  address: string
  notes: string
}

const MOROCCAN_CITIES = [
  'Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier',
  'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan', 'Other',
]

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const [form, setForm] = useState<FormData>({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^(\+212|0)[0-9]{9}$/.test(form.phone.replace(/\s/g, '')))
      newErrors.phone = 'Enter a valid Moroccan phone number'
    if (!form.city) newErrors.city = 'City is required'
    if (!form.address.trim()) newErrors.address = 'Address is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const buildWhatsAppMessage = (): string => {
    const lines: string[] = []
    lines.push('🐻 *BLACK BEAR — New Order*')
    lines.push('━━━━━━━━━━━━━━━━━━')
    lines.push('')
    lines.push('👤 *Customer Details*')
    lines.push(`Name: ${form.fullName}`)
    lines.push(`Phone: ${form.phone}`)
    lines.push(`City: ${form.city}`)
    lines.push(`Address: ${form.address}`)
    if (form.notes.trim()) lines.push(`Notes: ${form.notes}`)
    lines.push('')
    lines.push('🛍️ *Order Items*')
    lines.push('━━━━━━━━━━━━━━━━━━')
    items.forEach((item) => {
      lines.push(
        `• ${item.product.name} × ${item.quantity}`
      )
      lines.push(`  Color: ${item.color} | Size: ${item.size}`)
      lines.push(`  Price: ${(item.product.price * item.quantity).toLocaleString()} MAD`)
    })
    lines.push('')
    lines.push('━━━━━━━━━━━━━━━━━━')
    lines.push(`💰 *Total: ${totalPrice.toLocaleString()} MAD*`)
    lines.push('')
    lines.push('_Sent via blackbear.ma_')
    return encodeURIComponent(lines.join('\n'))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    if (items.length === 0) return

    const message = buildWhatsAppMessage()
    const number = WHATSAPP_NUMBER.replace(/\D/g, '')
    const url = `https://wa.me/${number}?text=${message}`

    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
    clearCart()
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  if (items.length === 0 && !submitted) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-20">
        <div className="text-center p-8">
          <ShoppingBag size={48} className="text-[#2a2a2a] mx-auto mb-6" strokeWidth={1} />
          <h1 className="font-display text-4xl text-[#e8e6e0] tracking-wider mb-3">Cart is Empty</h1>
          <p className="text-[#888888] text-sm mb-8">Add some pieces before checking out.</p>
          <Link to="/shop" className="btn-primary px-8 py-4 rounded text-sm inline-block">
            Browse Collection
          </Link>
        </div>
      </main>
    )
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-20">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-900/30 border border-green-700 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h1 className="font-display text-5xl text-[#e8e6e0] tracking-wider mb-3">Order Sent!</h1>
          <p className="text-[#888888] mb-2 leading-relaxed">
            Your order was sent via WhatsApp. We'll confirm your order shortly.
          </p>
          <p className="text-[#3a3a3a] text-xs tag mb-8">
            If WhatsApp didn't open, contact us at {WHATSAPP_NUMBER}
          </p>
          <Link to="/shop" className="btn-primary px-8 py-4 rounded text-sm inline-flex items-center gap-2">
            <ShoppingBag size={16} />
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link to="/shop" className="text-[#888888] hover:text-[#e8e6e0] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <span className="tag text-[#c9b99a] text-xs mb-1 block">— Final Step</span>
            <h1 className="font-display text-5xl text-[#e8e6e0] tracking-wider">Checkout</h1>
          </div>
        </div>

        {/* Form first on mobile, summary second — reversed on desktop with order classes */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Order Summary — shows below form on mobile, right column on desktop */}
          <div className="lg:col-span-2 order-2 lg:order-2">
            <div className="bg-[#141414] border border-[#1e1e1e] p-5 sm:p-6 lg:sticky lg:top-24">
              <h2 className="tag text-[#c9b99a] text-xs mb-5">Order Summary</h2>

              <ul className="space-y-4 mb-5">
                {items.map((item) => (
                  <li key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1e1e1e] overflow-hidden flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#e8e6e0] text-sm font-medium leading-tight truncate">{item.product.name}</p>
                      <p className="tag text-[#888888] text-[10px] mt-0.5">{item.color} · {item.size} · ×{item.quantity}</p>
                      <p className="text-[#c9b99a] text-sm font-semibold mt-1 tabular-nums">
                        {(item.product.price * item.quantity).toLocaleString()} MAD
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="divider mb-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#888888]">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{totalPrice.toLocaleString()} MAD</span>
                </div>
                <div className="flex justify-between text-[#888888]">
                  <span>Shipping</span>
                  <span className="text-green-500">Free (Casa)</span>
                </div>
                <div className="divider my-3" />
                <div className="flex justify-between text-[#e8e6e0] font-semibold text-base">
                  <span>Total</span>
                  <span className="text-[#c9b99a] tabular-nums">{totalPrice.toLocaleString()} MAD</span>
                </div>
              </div>

              <div className="mt-5 p-3 sm:p-4 bg-[#1a1a1a] border border-[#2a2a2a]">
                <p className="tag text-[#888888] text-[10px] text-center leading-relaxed">
                  Payment on delivery · Cash or mobile transfer
                </p>
              </div>
            </div>
          </div>

          {/* Form — first on mobile */}
          <div className="lg:col-span-3 order-1 lg:order-1">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="bg-[#141414] border border-[#1e1e1e] rounded p-6 space-y-5">
                <h2 className="tag text-[#c9b99a] text-xs">Your Details</h2>

                {/* Full name */}
                <div>
                  <label htmlFor="fullName" className="tag text-[#888888] text-[11px] block mb-2">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Ahmed Benali"
                    className={`w-full bg-[#1a1a1a] border rounded px-4 py-3 text-[#e8e6e0] text-sm placeholder-[#3a3a3a] outline-none focus:border-[#c9b99a] transition-colors ${
                      errors.fullName ? 'border-[#8b1a1a]' : 'border-[#2a2a2a]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[#8b1a1a] text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="tag text-[#888888] text-[11px] block mb-2">
                    Phone Number * (WhatsApp)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+212 6XX-XXXXXX"
                    className={`w-full bg-[#1a1a1a] border rounded px-4 py-3 text-[#e8e6e0] text-sm placeholder-[#3a3a3a] outline-none focus:border-[#c9b99a] transition-colors ${
                      errors.phone ? 'border-[#8b1a1a]' : 'border-[#2a2a2a]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[#8b1a1a] text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="tag text-[#888888] text-[11px] block mb-2">
                    City *
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className={`w-full bg-[#1a1a1a] border rounded px-4 py-3 text-sm outline-none focus:border-[#c9b99a] transition-colors appearance-none cursor-pointer ${
                      errors.city ? 'border-[#8b1a1a]' : 'border-[#2a2a2a]'
                    } ${form.city ? 'text-[#e8e6e0]' : 'text-[#3a3a3a]'}`}
                  >
                    <option value="" disabled>Select your city</option>
                    {MOROCCAN_CITIES.map((city) => (
                      <option key={city} value={city} className="bg-[#1a1a1a]">
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-[#8b1a1a] text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="tag text-[#888888] text-[11px] block mb-2">
                    Delivery Address *
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Street name, apartment, landmark..."
                    className={`w-full bg-[#1a1a1a] border rounded px-4 py-3 text-[#e8e6e0] text-sm placeholder-[#3a3a3a] outline-none focus:border-[#c9b99a] transition-colors ${
                      errors.address ? 'border-[#8b1a1a]' : 'border-[#2a2a2a]'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-[#8b1a1a] text-xs mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="tag text-[#888888] text-[11px] block mb-2">
                    Order Notes <span className="text-[#3a3a3a]">(Optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Special instructions, preferred delivery time..."
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-4 py-3 text-[#e8e6e0] text-sm placeholder-[#3a3a3a] outline-none focus:border-[#c9b99a] transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-5 rounded bg-[#25D366] hover:bg-[#1da851] text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/20"
              >
                <MessageCircle size={20} />
                Order via WhatsApp
              </button>
              <p className="text-center text-[#3a3a3a] text-xs tag">
                Clicking will open WhatsApp with your order details pre-filled
              </p>
            </form>
          </div>

        </div>
      </div>
    </main>
  )
}
