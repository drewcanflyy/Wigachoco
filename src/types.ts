export interface OfficialProduct {
  name: string
  price: number
  slug: string
  image: string
}

export type ProductCategory =
  | 'all'
  | 'eclats'
  | 'truffes'
  | 'coffrets'
  | 'presentoirs'
  | 'sans-sucre'

