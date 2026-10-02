import catalogJson from './catalog.json'
import servicesJson from './services.json'
import corporateJson from './corporate.json'
import faqJson from './faq.json'
import paslanmazTank from './blog/paslanmaz-celik-tank-secimi.json'
import hijyenikProses from './blog/hijyenik-proses-hatlari.json'
import reaktorGuvenlik from './blog/reaktor-sistemlerinde-guvenlik.json'
import tseStandartlari from './blog/tse-standartlari-paslanmaz-celik.json'
import tesisKurulumu from './blog/tesis-kurulumu-proje-yonetimi.json'
import kimyaOtomasyon from './blog/kimya-sektorunde-proses-otomasyonu.json'
import type { BlogPost } from '~/constants/blogTypes'
import { parseBlogBody } from '~/constants/blogTypes'
import type { AppLocale, ContentRecord, LocaleSlugs } from '~/content/types'
import { findBySlug } from '~/content/types'

export type CatalogCopy = {
  label: string
  description: string
  body?: string
  features?: string[]
}

export type ProductRecord = ContentRecord<{
  categoryId: string
}, CatalogCopy>

export type CategoryRecord = ContentRecord<{
  icon: string
}, Pick<CatalogCopy, 'label' | 'description'>> & {
  products: ProductRecord[]
}

export type ServiceRecord = ContentRecord<{
  icon: string
}, Required<CatalogCopy>>

export type CorporateRecord = ContentRecord<{
  layout?: 'about' | 'mission' | 'quality' | 'documents' | 'careers' | 'legal'
}, {
  title: string
  badge: string
  description: string
  sections: { heading: string, body: string }[]
}>

export type FaqRecord = {
  id: string
  translations: Record<AppLocale, {
    title: string
    description: string
    items: { q: string, a: string }[]
  }>
}

export type BlogCopy = {
  title: string
  seoTitle?: string
  excerpt: string
  category: string
  keywords?: string[]
  tags?: string[]
  faq?: { q: string, a: string }[]
  relatedLinks?: { label: string, to: string }[]
  galleryTitles?: string[]
  body: string | string[]
}

export type BlogRecord = ContentRecord<{
  date: string
  cover?: string
  gallery?: string[]
}, BlogCopy>

const BLOG_ORDER = [
  'paslanmaz-celik-tank-secimi',
  'hijyenik-proses-hatlari',
  'reaktor-sistemlerinde-guvenlik',
  'tse-standartlari-paslanmaz-celik',
  'tesis-kurulumu-proje-yonetimi',
  'kimya-sektorunde-proses-otomasyonu'
] as const

function asLocale(locale: string): AppLocale {
  return locale === 'en' ? 'en' : 'tr'
}

function pickCopy<T extends object>(translations: Record<AppLocale, T>, locale: string): T {
  return asLocale(locale) === 'en' ? translations.en : translations.tr
}

const blogById: Record<string, BlogRecord> = {
  [paslanmazTank.id]: paslanmazTank as BlogRecord,
  [hijyenikProses.id]: hijyenikProses as BlogRecord,
  [reaktorGuvenlik.id]: reaktorGuvenlik as BlogRecord,
  [tseStandartlari.id]: tseStandartlari as BlogRecord,
  [tesisKurulumu.id]: tesisKurulumu as BlogRecord,
  [kimyaOtomasyon.id]: kimyaOtomasyon as BlogRecord
}

export const catalogRecords = catalogJson as CategoryRecord[]
export const serviceRecords = servicesJson as ServiceRecord[]
export const corporateRecords = corporateJson as CorporateRecord[]
export const faqRecords = faqJson as FaqRecord[]

export const blogRecords: BlogRecord[] = BLOG_ORDER.map((id) => {
  const record = blogById[id]
  if (!record) {
    throw new Error(`Missing blog record: ${id}`)
  }
  return record
})

export const productRecords: ProductRecord[] = catalogRecords.flatMap(category => category.products)

function mapFrom(records: { id: string, slugs: LocaleSlugs }[]) {
  return Object.fromEntries(records.map(record => [record.id, record.slugs]))
}

export const categorySlugMap = mapFrom(catalogRecords)
export const productSlugMap = mapFrom(productRecords)
export const serviceSlugMap = mapFrom(serviceRecords)
export const corporateSlugMap = mapFrom(corporateRecords)
export const blogSlugMap = mapFrom(blogRecords)

export function findCategory(slug: string) {
  return findBySlug(catalogRecords, slug)
}

export function findProduct(categorySlug: string, productSlug: string) {
  const category = findCategory(categorySlug)
  if (!category) return null
  const product = findBySlug(category.products, productSlug)
  if (!product) return null
  return { category, product }
}

export function findService(slug: string) {
  return findBySlug(serviceRecords, slug)
}

export function findCorporate(slug: string) {
  return findBySlug(corporateRecords, slug)
}

export function findBlog(slug: string) {
  return findBySlug(blogRecords, slug)
}

export function toProductView(record: ProductRecord, locale: string) {
  const copy = pickCopy(record.translations, locale)
  return {
    slug: record.id,
    label: copy.label,
    description: copy.description,
    body: copy.body,
    features: copy.features
  }
}

export function toCategoryView(record: CategoryRecord, locale: string) {
  const copy = pickCopy(record.translations, locale)
  return {
    slug: record.id,
    label: copy.label,
    description: copy.description,
    icon: record.shared.icon,
    products: record.products.map(product => toProductView(product, locale))
  }
}

export function toServiceView(record: ServiceRecord, locale: string) {
  const copy = pickCopy(record.translations, locale)
  return {
    slug: record.id,
    label: copy.label,
    description: copy.description,
    body: copy.body,
    features: copy.features,
    icon: record.shared.icon
  }
}

export function toCorporateView(record: CorporateRecord, locale: string) {
  const copy = pickCopy(record.translations, locale)
  return {
    slug: record.id,
    title: copy.title,
    badge: copy.badge,
    description: copy.description,
    sections: copy.sections,
    layout: record.shared.layout
  }
}

export function toFaqView(record: FaqRecord, locale: string) {
  const copy = pickCopy(record.translations, locale)
  return {
    id: record.id,
    title: copy.title,
    description: copy.description,
    items: copy.items
  }
}

export function toBlogView(record: BlogRecord, locale: string): BlogPost {
  const copy = pickCopy(record.translations, locale)
  const gallery = (record.shared.gallery ?? []).map((src, index) => ({
    src,
    title: copy.galleryTitles?.[index] ?? copy.title
  }))
  const body = typeof copy.body === 'string'
    ? parseBlogBody(copy.body)
    : (copy.body as string[]).map(text => ({ type: 'p' as const, text }))

  return {
    slug: record.id,
    title: copy.title,
    seoTitle: copy.seoTitle,
    excerpt: copy.excerpt,
    date: record.shared.date,
    category: copy.category,
    cover: record.shared.cover,
    gallery,
    keywords: copy.keywords,
    tags: copy.tags,
    relatedLinks: copy.relatedLinks,
    faq: copy.faq,
    body
  }
}

export function localizeCategory(slug: string, locale: string) {
  const record = findCategory(slug)
  return record ? toCategoryView(record, locale) : null
}

export function localizeService(slug: string, locale: string) {
  const record = findService(slug)
  return record ? toServiceView(record, locale) : null
}

export function localizeCorporate(slug: string, locale: string) {
  const record = findCorporate(slug)
  return record ? toCorporateView(record, locale) : null
}

export function localizeBlog(slug: string, locale: string) {
  const record = findBlog(slug)
  return record ? toBlogView(record, locale) : null
}
