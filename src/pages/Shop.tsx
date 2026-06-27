import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { products, categories, sizes } from '../data/products'
import type { Category, Size } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([])
  const [showNew, setShowNew] = useState(false)
  const [mobileFilters, setMobileFilters] = useState(false)

  // Read URL params on mount
  useEffect(() => {
    const cat = searchParams.get('category') as Category | null
    const filterNew = searchParams.get('filter') === 'new'
    if (cat && categories.includes(cat)) {
      setSelectedCategories([cat])
    }
    if (filterNew) setShowNew(true)
  }, [])

  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const toggleSize = (size: Size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSizes([])
    setShowNew(false)
    setSearchParams({})
  }

  const filtered = products.filter((p) => {
    const catMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category)
    const sizeMatch =
      selectedSizes.length === 0 ||
      selectedSizes.some((s) => p.sizes.includes(s))
    const newMatch = !showNew || p.isNew
    return catMatch && sizeMatch && newMatch
  })

  const hasFilters = selectedCategories.length > 0 || selectedSizes.length > 0 || showNew

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* New Drops toggle */}
      <div>
        <h3 className="tag text-[#c9b99a] text-xs mb-4">Filter</h3>
        <button
          onClick={() => setShowNew(!showNew)}
          className={`w-full text-left px-4 py-2.5 rounded border text-sm transition-all ${
            showNew
              ? 'border-[#c9b99a] text-[#c9b99a] bg-[#c9b99a]/10'
              : 'border-[#2a2a2a] text-[#888888] hover:border-[#3a3a3a]'
          }`}
        >
          New Drops Only
        </button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="tag text-[#c9b99a] text-xs mb-4">Category</h3>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`w-full text-left px-4 py-2.5 rounded text-sm transition-all ${
                selectedCategories.includes(cat)
                  ? 'bg-[#e8e6e0] text-[#0a0a0a] font-medium'
                  : 'text-[#888888] hover:text-[#e8e6e0] hover:bg-[#1a1a1a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="tag text-[#c9b99a] text-xs mb-4">Size</h3>
        <div className="grid grid-cols-3 gap-1.5">
          {sizes.filter((s) => s !== 'One Size').map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`py-2 rounded border text-xs font-medium transition-all ${
                selectedSizes.includes(size)
                  ? 'border-[#c9b99a] text-[#c9b99a] bg-[#c9b99a]/10'
                  : 'border-[#2a2a2a] text-[#888888] hover:border-[#3a3a3a]'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-[#8b1a1a] text-xs tag hover:text-red-400 transition-colors"
        >
          <X size={12} />
          Clear Filters
        </button>
      )}
    </div>
  )

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-14 sm:pt-20">
      {/* Page Header */}
      <div className="border-b border-[#1e1e1e] py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="tag text-[#c9b99a] text-xs mb-2 sm:mb-3 block">— Collection</span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-[#e8e6e0] tracking-wider">Shop</h1>
          <p className="text-[#888888] mt-2 sm:mt-3 text-sm">
            {filtered.length} piece{filtered.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-24 self-start">
            <FilterPanel />
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter toggle */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <p className="text-[#888888] text-sm">{filtered.length} items</p>
              <button
                onClick={() => setMobileFilters(true)}
                className="flex items-center gap-2 btn-outline px-4 py-2 rounded text-xs"
              >
                <SlidersHorizontal size={14} />
                Filters {hasFilters && `(${selectedCategories.length + selectedSizes.length + (showNew ? 1 : 0)})`}
              </button>
            </div>

            {/* Active filters */}
            {hasFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {selectedCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className="flex items-center gap-1.5 bg-[#1e1e1e] border border-[#2a2a2a] text-[#e8e6e0] text-xs px-3 py-1.5 rounded-full tag hover:border-[#8b1a1a] transition-colors"
                  >
                    {cat} <X size={10} />
                  </button>
                ))}
                {selectedSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    className="flex items-center gap-1.5 bg-[#1e1e1e] border border-[#2a2a2a] text-[#e8e6e0] text-xs px-3 py-1.5 rounded-full tag hover:border-[#8b1a1a] transition-colors"
                  >
                    Size {s} <X size={10} />
                  </button>
                ))}
                {showNew && (
                  <button
                    onClick={() => setShowNew(false)}
                    className="flex items-center gap-1.5 bg-[#c9b99a]/10 border border-[#c9b99a] text-[#c9b99a] text-xs px-3 py-1.5 rounded-full tag"
                  >
                    New Drops <X size={10} />
                  </button>
                )}
              </div>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-[#3a3a3a] font-display text-4xl tracking-wider mb-3">No Pieces Found</p>
                <p className="text-[#888888] text-sm mb-6">Try adjusting your filters.</p>
                <button onClick={clearFilters} className="btn-outline px-6 py-3 rounded text-sm">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Sheet */}
      {mobileFilters && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileFilters(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#141414] border-t border-[#2a2a2a] rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl tracking-widest text-[#e8e6e0]">Filters</h2>
              <button onClick={() => setMobileFilters(false)} className="text-[#888888] hover:text-[#e8e6e0]">
                <X size={22} />
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setMobileFilters(false)}
              className="btn-primary w-full py-4 rounded mt-6 text-sm"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </>
      )}
    </main>
  )
}
