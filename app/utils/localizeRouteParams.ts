import type { RouteLocationRaw, RouteParamsRaw } from 'vue-router'
import {
  blogSlugs,
  canonicalSlug,
  categorySlugs,
  corporateSlugs,
  localizeSlug,
  productSlugs,
  serviceSlugs
} from '~/constants/slugs'

function baseRouteName(name: unknown) {
  return String(name ?? '').replace(/___[a-z0-9-]+$/i, '')
}

function paramValue(value: unknown) {
  if (Array.isArray(value)) return value[0]
  return typeof value === 'string' ? value : null
}

function localizeParam(map: Parameters<typeof localizeSlug>[0], value: unknown, locale: string) {
  const raw = paramValue(value)
  if (!raw) return value
  const canonical = canonicalSlug(map, raw)
  return canonical ? localizeSlug(map, canonical, locale) : raw
}

export function localizeRouteParams(to: RouteLocationRaw, locale: string): RouteLocationRaw {
  if (typeof to === 'string' || !('name' in to) || !to.name) return to

  const name = baseRouteName(to.name)
  const params = { ...(to.params as RouteParamsRaw | undefined) }
  if (!params || Object.keys(params).length === 0) return to

  if (name.startsWith('urunler-kategori')) {
    if (params.kategori) params.kategori = localizeParam(categorySlugs, params.kategori, locale)
    if (params.slug) params.slug = localizeParam(productSlugs, params.slug, locale)
  } else if (name === 'hizmetler-slug' && params.slug) {
    params.slug = localizeParam(serviceSlugs, params.slug, locale)
  } else if (name === 'kurumsal-slug' && params.slug) {
    params.slug = localizeParam(corporateSlugs, params.slug, locale)
  } else if (name === 'blog-slug' && params.slug) {
    params.slug = localizeParam(blogSlugs, params.slug, locale)
  }

  return { ...to, params }
}
