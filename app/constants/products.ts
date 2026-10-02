import {
  catalogRecords,
  findCategory,
  findProduct,
  toCategoryView,
  toProductView
} from '~/content/load'

export interface ProductItem {
  label: string
  slug: string
  description?: string
  features?: string[]
  body?: string
}

export interface ProductCategory {
  label: string
  slug: string
  description: string
  icon: string
  products: ProductItem[]
}

export const productCategories: ProductCategory[] = catalogRecords.map(record =>
  toCategoryView(record, 'tr')
)

export function productPath(categorySlug: string, productSlug?: string) {
  if (productSlug) {
    return `/urunler/${categorySlug}/${productSlug}`
  }
  return `/urunler/${categorySlug}`
}

export function getCategoryBySlug(slug: string) {
  const record = findCategory(slug)
  return record ? toCategoryView(record, 'tr') : undefined
}

export function getProduct(categorySlug: string, productSlug: string) {
  const found = findProduct(categorySlug, productSlug)
  if (!found) return null
  return {
    category: toCategoryView(found.category, 'tr'),
    product: toProductView(found.product, 'tr')
  }
}
