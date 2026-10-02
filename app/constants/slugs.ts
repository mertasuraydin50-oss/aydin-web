import {
  blogSlugMap,
  categorySlugMap,
  corporateSlugMap,
  productSlugMap,
  serviceSlugMap
} from '~/content/load'

export type AppLocale = 'tr' | 'en'
export type SlugPair = { tr: string, en: string }
export type SlugMap = Record<string, SlugPair>

export const categorySlugs: SlugMap = categorySlugMap
export const productSlugs: SlugMap = productSlugMap
export const serviceSlugs: SlugMap = serviceSlugMap
export const corporateSlugs: SlugMap = corporateSlugMap
export const blogSlugs: SlugMap = blogSlugMap

export function localizeSlug(map: SlugMap, canonical: string, locale: string) {
  const pair = map[canonical]
  if (!pair) return canonical
  return locale === 'en' ? pair.en : pair.tr
}

export function canonicalSlug(map: SlugMap, slug: string) {
  if (slug in map) return slug
  for (const [id, pair] of Object.entries(map)) {
    if (pair.tr === slug || pair.en === slug) return id
  }
  return null
}

export function i18nSlugParams(map: SlugMap, canonical: string, key = 'slug') {
  return {
    tr: { [key]: localizeSlug(map, canonical, 'tr') },
    en: { [key]: localizeSlug(map, canonical, 'en') }
  }
}

export function productLoc(categoryId: string, productId?: string, locale: AppLocale = 'tr') {
  const category = localizeSlug(categorySlugs, categoryId, locale)
  if (!productId) {
    return locale === 'en' ? `/en/products/${category}` : `/urunler/${category}`
  }
  const product = localizeSlug(productSlugs, productId, locale)
  return locale === 'en' ? `/en/products/${category}/${product}` : `/urunler/${category}/${product}`
}

export function serviceLoc(serviceId: string, locale: AppLocale = 'tr') {
  const slug = localizeSlug(serviceSlugs, serviceId, locale)
  return locale === 'en' ? `/en/services/${slug}` : `/hizmetler/${slug}`
}

export function corporateLoc(pageId: string, locale: AppLocale = 'tr') {
  const slug = localizeSlug(corporateSlugs, pageId, locale)
  return locale === 'en' ? `/en/corporate/${slug}` : `/kurumsal/${slug}`
}

export function blogLoc(postId: string, locale: AppLocale = 'tr') {
  const slug = localizeSlug(blogSlugs, postId, locale)
  return locale === 'en' ? `/en/blog/${slug}` : `/blog/${slug}`
}
