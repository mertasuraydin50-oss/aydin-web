<script setup lang="ts">
import * as uiLocales from '@nuxt/ui/locale'
import { brand, seoKeywords, seoKeywordsMeta, siteUrl } from '~/constants/site'

const { locale, t } = useI18n()
const uiLocale = computed(() => {
  const key = locale.value as keyof typeof uiLocales
  return uiLocales[key] ?? (locale.value === 'ar' ? uiLocales.ar : uiLocales.tr)
})

const pageDir = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'keywords', content: seoKeywordsMeta }
  ],
  link: [
    { rel: 'icon', href: '/logo.jpeg' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap',
      key: 'cairo-font'
    }
  ],
  htmlAttrs: {
    lang: () => locale.value,
    dir: () => pageDir.value
  },
  bodyAttrs: {
    class: () => (locale.value === 'ar' ? 'locale-ar' : '')
  },
  script: [
    {
      type: 'application/ld+json',
      key: 'org-schema',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: brand.name,
        alternateName: brand.shortName,
        url: siteUrl,
        telephone: brand.phone,
        email: brand.email,
        address: brand.address,
        description: t('brand.description'),
        keywords: seoKeywords
      })
    }
  ]
})

useSeoMeta({
  title: brand.shortName,
  description: () => t('brand.description'),
  ogTitle: brand.shortName,
  ogDescription: () => t('brand.description'),
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp :locale="uiLocale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
