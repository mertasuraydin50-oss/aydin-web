import { pickLocalizedCopy, pickLocalizedSlug, type AppLocale } from '~/utils/appLocale'

export type { AppLocale }

export interface LocaleSlugs {
  tr: string
  en: string
  ar?: string
}

export interface ContentRecord<TShared extends object, TCopy extends object> {
  id: string
  slugs: LocaleSlugs
  shared: TShared
  translations: { tr: TCopy, en: TCopy, ar?: TCopy }
}

export function pickLocale<T>(translations: { tr: T, en: T, ar?: T }, locale: string): T {
  return pickLocalizedCopy(translations, locale)
}

export function matchSlug(slugs: LocaleSlugs, value: string) {
  return slugs.tr === value || slugs.en === value
}

export function slugFor(slugs: LocaleSlugs, locale: string) {
  return pickLocalizedSlug(slugs, locale)
}

export function findBySlug<T extends { slugs: LocaleSlugs }>(records: T[], slug: string) {
  return records.find(record => matchSlug(record.slugs, slug)) ?? null
}
