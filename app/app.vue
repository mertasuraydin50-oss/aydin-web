<script setup lang="ts">
import * as uiLocales from '@nuxt/ui/locale'
import { brand, seoKeywords, seoKeywordsMeta, siteUrl } from '~/constants/site'

const { locale, t } = useI18n()
const uiLocale = computed(() => uiLocales[locale.value as keyof typeof uiLocales] ?? uiLocales.tr)

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'keywords', content: seoKeywordsMeta }
  ],
  link: [
    { rel: 'icon', href: '/logo.jpeg' }
  ],
  htmlAttrs: {
    lang: locale
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
