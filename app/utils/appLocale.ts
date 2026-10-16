export type AppLocale = 'tr' | 'en' | 'ar'

export function normalizeAppLocale(locale: string): AppLocale {
  if (locale === 'en' || locale === 'ar') return locale
  return 'tr'
}

export function usesEnglishRoutes(locale: string) {
  return normalizeAppLocale(locale) !== 'tr'
}

export function localePathPrefix(locale: AppLocale) {
  return locale === 'tr' ? '' : `/${locale}`
}

export function pickLocalizedCopy<T>(
  translations: { tr: T, en: T, ar?: T },
  locale: string
): T {
  const loc = normalizeAppLocale(locale)
  if (loc === 'ar') return translations.ar ?? translations.en
  if (loc === 'en') return translations.en
  return translations.tr
}

export function pickLocalizedSlug(
  slugs: { tr: string, en: string, ar?: string },
  locale: string
) {
  const loc = normalizeAppLocale(locale)
  if (loc === 'ar') return slugs.ar ?? slugs.en
  if (loc === 'en') return slugs.en
  return slugs.tr
}
