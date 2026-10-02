export type AppLocale = 'tr' | 'en'

export interface LocaleSlugs {
  tr: string
  en: string
}

export interface ContentRecord<TShared extends object, TCopy extends object> {
  id: string
  slugs: LocaleSlugs
  shared: TShared
  translations: Record<AppLocale, TCopy>
}

export function pickLocale<T>(translations: Record<AppLocale, T>, locale: string): T {
  return locale === 'en' ? translations.en : translations.tr
}

export function matchSlug(slugs: LocaleSlugs, value: string) {
  return slugs.tr === value || slugs.en === value
}

export function slugFor(slugs: LocaleSlugs, locale: string) {
  return locale === 'en' ? slugs.en : slugs.tr
}

export function findBySlug<T extends { slugs: LocaleSlugs }>(records: T[], slug: string) {
  return records.find(record => matchSlug(record.slugs, slug)) ?? null
}
