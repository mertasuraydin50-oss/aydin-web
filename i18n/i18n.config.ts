export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'tr',
  fallbackLocale: {
    ar: ['en', 'tr'],
    en: ['tr'],
    tr: ['tr']
  },
  missingWarn: false,
  fallbackWarn: false
}))
