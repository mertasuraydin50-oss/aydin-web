import {
  blogSlugMap,
  categorySlugMap,
  corporateSlugMap,
  productSlugMap,
  serviceSlugMap
} from '~/content/load'
import { localePathPrefix, normalizeAppLocale, pickLocalizedSlug, type AppLocale } from '~/utils/appLocale'

export type { AppLocale }
export type SlugPair = { tr: string, en: string, ar?: string }
export type SlugMap = Record<string, SlugPair>

export const categorySlugs: SlugMap = categorySlugMap
export const productSlugs: SlugMap = productSlugMap
export const serviceSlugs: SlugMap = serviceSlugMap
export const corporateSlugs: SlugMap = corporateSlugMap
export const blogSlugs: SlugMap = blogSlugMap

export function localizeSlug(map: SlugMap, canonical: string, locale: string) {
  const pair = map[canonical]
  if (!pair) return canonical
  return pickLocalizedSlug(pair, locale)
}

export function canonicalSlug(map: SlugMap, slug: string) {
  if (slug in map) return slug
  for (const [id, pair] of Object.entries(map)) {
    if (pair.tr === slug || pair.en === slug || pair.ar === slug) return id
  }
  return null
}

export function i18nSlugParams(map: SlugMap, canonical: string, key = 'slug') {
  return {
    tr: { [key]: localizeSlug(map, canonical, 'tr') },
    en: { [key]: localizeSlug(map, canonical, 'en') },
    ar: { [key]: localizeSlug(map, canonical, 'ar') }
  }
}

export function syncedCategoryParams(categoryId: string) {
  return i18nSlugParams(categorySlugs, categoryId, 'kategori')
}

export function syncedProductParams(categoryId: string, productId: string) {
  return {
    tr: {
      kategori: localizeSlug(categorySlugs, categoryId, 'tr'),
      slug: localizeSlug(productSlugs, productId, 'tr')
    },
    en: {
      kategori: localizeSlug(categorySlugs, categoryId, 'en'),
      slug: localizeSlug(productSlugs, productId, 'en')
    },
    ar: {
      kategori: localizeSlug(categorySlugs, categoryId, 'ar'),
      slug: localizeSlug(productSlugs, productId, 'ar')
    }
  }
}

export function productLoc(categoryId: string, productId?: string, locale: AppLocale = 'tr') {
  const loc = normalizeAppLocale(locale)
  const category = localizeSlug(categorySlugs, categoryId, loc)
  if (loc === 'tr') {
    if (!productId) return `/urunler/${category}`
    const product = localizeSlug(productSlugs, productId, loc)
    return `/urunler/${category}/${product}`
  }
  const prefix = localePathPrefix(loc)
  if (!productId) return `${prefix}/products/${category}`
  const product = localizeSlug(productSlugs, productId, loc)
  return `${prefix}/products/${category}/${product}`
}

export function serviceLoc(serviceId: string, locale: AppLocale = 'tr') {
  const loc = normalizeAppLocale(locale)
  const slug = localizeSlug(serviceSlugs, serviceId, loc)
  if (loc === 'tr') return `/hizmetler/${slug}`
  return `${localePathPrefix(loc)}/services/${slug}`
}

export function corporateLoc(pageId: string, locale: AppLocale = 'tr') {
  const loc = normalizeAppLocale(locale)
  const slug = localizeSlug(corporateSlugs, pageId, loc)
  if (loc === 'tr') return `/kurumsal/${slug}`
  return `${localePathPrefix(loc)}/corporate/${slug}`
}

export function blogLoc(postId: string, locale: AppLocale = 'tr') {
  const loc = normalizeAppLocale(locale)
  const slug = localizeSlug(blogSlugs, postId, loc)
  if (loc === 'tr') return `/blog/${slug}`
  return `${localePathPrefix(loc)}/blog/${slug}`
}
