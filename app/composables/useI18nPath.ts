import type { RouteLocationRaw } from 'vue-router'
import { localizeRouteParams } from '~/utils/localizeRouteParams'
import { toNamedRoute } from '~/utils/toNamedRoute'

export function useI18nPath() {
  const localePath = useLocalePath()
  const { locale } = useI18n()

  return (to: RouteLocationRaw, targetLocale?: 'tr' | 'en') => {
    const loc = targetLocale ?? (locale.value === 'en' ? 'en' : 'tr')
    return localePath(localizeRouteParams(toNamedRoute(to), loc), loc)
  }
}
