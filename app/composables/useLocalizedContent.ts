import { corporateLinks as corporateLinkDefs } from '~/constants/navigation'
import { references, sectors, stats, whyUs } from '~/constants/site'
import { galleryCategories } from '~/constants/gallery'
import {
  blogRecords,
  catalogRecords,
  corporateRecords,
  faqRecords,
  localizeBlog,
  localizeCategory,
  localizeCorporate,
  localizeService,
  serviceRecords,
  toBlogView,
  toCategoryView,
  toCorporateView,
  toFaqView,
  toServiceView
} from '~/content/load'

const STAT_KEYS = ['projects', 'years', 'standards', 'sectors'] as const
const WHY_KEYS = ['hygiene', 'engineering', 'production', 'quality'] as const
const SECTOR_KEYS = ['food', 'pharma', 'chemical', 'cosmetic'] as const
const REF_KEYS = ['tank', 'reactor', 'food'] as const

const corporateNavKeys: Record<string, string> = {
  '/kurumsal/hakkimizda': 'about',
  '/kurumsal/misyon-vizyon': 'mission',
  '/kurumsal/kalite-politikasi': 'quality',
  '/kurumsal/belgeler': 'documents',
  '/kurumsal/insan-kaynaklari': 'careers',
  '/kurumsal/kvkk': 'kvkk',
  '/sss': 'faq'
}

export function useLocalizedContent() {
  const { t, locale } = useI18n()
  const localePath = useI18nPath()

  const localizedCategories = computed(() =>
    catalogRecords.map(record => toCategoryView(record, locale.value))
  )

  const localizedServices = computed(() =>
    serviceRecords.map(record => toServiceView(record, locale.value))
  )

  const localizedCorporateLinks = computed(() =>
    corporateLinkDefs.map(link => ({
      ...link,
      label: t(`nav.${corporateNavKeys[link.to] ?? 'about'}`),
      to: localePath(link.to)
    }))
  )

  const localizedCorporatePages = computed(() =>
    corporateRecords.map(record => toCorporateView(record, locale.value))
  )

  const localizedPosts = computed(() =>
    blogRecords.map(record => toBlogView(record, locale.value))
  )

  const localizedFaq = computed(() =>
    faqRecords.map(record => toFaqView(record, locale.value))
  )

  const localizedStats = computed(() =>
    stats.map((item, index) => ({
      ...item,
      label: t(`site.stats.${STAT_KEYS[index]}`)
    }))
  )

  const localizedWhyUs = computed(() =>
    whyUs.map((item, index) => ({
      ...item,
      title: t(`site.whyUs.${WHY_KEYS[index]}.title`),
      description: t(`site.whyUs.${WHY_KEYS[index]}.description`)
    }))
  )

  const localizedSectors = computed(() =>
    sectors.map((item, index) => ({
      ...item,
      label: t(`site.sectors.${SECTOR_KEYS[index]}`)
    }))
  )

  const localizedReferences = computed(() =>
    references.map((item, index) => ({
      ...item,
      label: t(`references.items.${REF_KEYS[index]}.label`),
      description: t(`references.items.${REF_KEYS[index]}.description`)
    }))
  )

  const localizedGalleryCategories = computed(() =>
    galleryCategories.map(category => ({
      ...category,
      label: t(`gallery.categories.${category.id}`)
    }))
  )

  function getLocalizedCategory(slug: string) {
    return localizeCategory(slug, locale.value)
  }

  function getLocalizedService(slug: string) {
    return localizeService(slug, locale.value)
  }

  function getLocalizedCorporate(slug: string) {
    return localizeCorporate(slug, locale.value)
  }

  function getLocalizedPost(slug: string) {
    return localizeBlog(slug, locale.value)
  }

  return {
    localePath,
    localizedCategories,
    localizedServices,
    localizedCorporateLinks,
    localizedCorporatePages,
    localizedPosts,
    localizedFaq,
    localizedStats,
    localizedWhyUs,
    localizedSectors,
    localizedReferences,
    localizedGalleryCategories,
    getLocalizedCategory,
    getLocalizedService,
    getLocalizedCorporate,
    getLocalizedPost
  }
}
