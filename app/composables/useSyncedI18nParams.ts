export function useSyncedI18nParams(paramsByLocale: Record<string, Record<string, string>>) {
  const route = useRoute()
  const { locale } = useI18n()
  const localePath = useI18nPath()
  const setI18nParams = useSetI18nParams()

  setI18nParams(paramsByLocale)

  const expected = paramsByLocale[String(locale.value)]
  if (!expected) return

  const mismatch = Object.entries(expected).some(([key, value]) => String(route.params[key] ?? '') !== value)
  if (!mismatch) return

  const name = String(route.name ?? '').replace(/___[a-z0-9-]+$/i, '')
  return navigateTo(localePath({ name, params: expected }), {
    redirectCode: 301,
    replace: true
  })
}
