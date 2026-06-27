export type Category = 'Hoodies' | 'T-Shirts' | 'Pants' | 'Accessories'
export type Size = 'S' | 'M' | 'L' | 'XL' | 'One Size'

export interface Product {
  id: string
  name: string
  price: number
  category: Category
  colors: string[]
  sizes: Size[]
  description: string
  badge?: string
  isNew?: boolean
  isBestSeller?: boolean
  // placeholder image via picsum or unsplash-style
  image: string
  images: string[]
}

export const products: Product[] = [
  {
    id: 'shadow-hoodie',
    name: 'Shadow Hoodie',
    price: 399,
    category: 'Hoodies',
    colors: ['Black', 'Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Heavyweight 380gsm fleece. Oversized silhouette with dropped shoulders and embroidered bear logo on the chest. Built for the streets of Casa — thick enough for the Atlantic nights.',
    badge: 'NEW DROP',
    isNew: true,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80&fit=crop',
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&q=80&fit=crop',
    ],
  },
  {
    id: 'casa-oversized-tee',
    name: 'Casa Oversized Tee',
    price: 249,
    category: 'T-Shirts',
    colors: ['Black', 'White'],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      '240gsm premium cotton. Boxy oversized cut with BLACK BEAR wordmark screen-printed on the back. The essential layer for the Casa streets.',
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80&fit=crop',
    ],
  },
  {
    id: 'bear-logo-cap',
    name: 'Bear Logo Cap',
    price: 149,
    category: 'Accessories',
    colors: ['Black'],
    sizes: ['One Size'],
    description:
      '6-panel structured cap with adjustable snapback. Embroidered bear paw logo on front panel. Low-profile brim. A statement piece without saying too much.',
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&q=80&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&q=80&fit=crop',
      'https://images.unsplash.com/photo-1556306535-38febf6782e7?w=600&q=80&fit=crop',
    ],
  },
  {
    id: 'underground-cargo',
    name: 'Underground Cargo Pants',
    price: 449,
    category: 'Pants',
    colors: ['Black', 'Khaki'],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Relaxed-fit cargo cut from heavy-duty ripstop fabric. Six utility pockets. Tapered ankle. Zipper closures. The kind of pants that make a move before you do.',
    badge: 'LIMITED',
    isNew: true,
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&q=80&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&q=80&fit=crop',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80&fit=crop',
    ],
  },
  {
    id: 'culture-sweatshirt',
    name: 'Culture Sweatshirt',
    price: 349,
    category: 'Hoodies',
    colors: ['Black', 'Beige'],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      '320gsm cotton-blend crewneck. Tonal bear graphic on back. Ribbed cuffs and hem. Midweight — perfect for layering. Wears like a second skin after one wash.',
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80&fit=crop',
    ],
  },
  {
    id: 'blackbear-tote',
    name: 'Black Bear Tote Bag',
    price: 129,
    category: 'Accessories',
    colors: ['Black'],
    sizes: ['One Size'],
    description:
      'Heavy canvas tote. BLACK BEAR logo heat-pressed on front. Double stitched handles. 15L capacity. Carry your culture wherever you go.',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&q=80&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&q=80&fit=crop',
    ],
  },
]

export const WHATSAPP_NUMBER = '+212600000000'

export const categories: Category[] = ['Hoodies', 'T-Shirts', 'Pants', 'Accessories']
export const sizes: Size[] = ['S', 'M', 'L', 'XL', 'One Size']
