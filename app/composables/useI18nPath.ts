import type { RouteLocationRaw } from 'vue-router'
import { normalizeAppLocale, type AppLocale } from '~/utils/appLocale'
import { localizeRouteParams } from '~/utils/localizeRouteParams'
import { toNamedRoute } from '~/utils/toNamedRoute'

export function useI18nPath() {
  const localePath = useLocalePath()
  const { locale } = useI18n()

  return (to: RouteLocationRaw, targetLocale?: AppLocale) => {
    const loc = targetLocale ?? normalizeAppLocale(locale.value)
    return localePath(localizeRouteParams(toNamedRoute(to), loc), loc)
  }
}
