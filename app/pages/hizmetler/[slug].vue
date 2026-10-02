<script setup lang="ts">
import { findService } from '~/content/load'
import { hasServiceLanding, localizeServiceLanding } from '~/content/landings'
import { servicePath } from '~/constants/services'
import { brand, siteUrl } from '~/constants/site'
import { localizeSlug, serviceSlugs } from '~/constants/slugs'
import ServiceLandingPage from '~/components/service/ServiceLandingPage.vue'

const route = useRoute()
const { t, locale } = useI18n()
const { localizedServices, getLocalizedService, localePath } = useLocalizedContent()

const slugParam = route.params.slug as string
const found = findService(slugParam)

if (!found || !hasServiceLanding(found.id)) {
  throw createError({ statusCode: 404, statusMessage: t('common.serviceNotFound') })
}

const serviceId = found.id

await useSyncedI18nParams({
  tr: { slug: localizeSlug(serviceSlugs, serviceId, 'tr') },
  en: { slug: localizeSlug(serviceSlugs, serviceId, 'en') }
})

const service = computed(() => getLocalizedService(slugParam)!)
const page = computed(() => localizeServiceLanding(serviceId, locale.value)!)
const others = computed(() => localizedServices.value.filter(s => s.slug !== serviceId))

const pageUrl = computed(() => `${siteUrl}${localePath(servicePath(serviceId))}`)

useSeoMeta({
  title: () => page.value.seoTitle,
  description: () => page.value.seoDescription,
  ogTitle: () => page.value.h1,
  ogDescription: () => page.value.seoDescription,
  ogType: 'website',
  ogUrl: pageUrl,
  twitterCard: 'summary_large_image',
  twitterTitle: () => page.value.h1,
  twitterDescription: () => page.value.seoDescription
})

useHead({
  meta: [{ name: 'keywords', content: () => page.value.keywords.join(', ') }],
  link: [{ rel: 'canonical', href: () => pageUrl.value }],
  script: [{
    type: 'application/ld+json',
    innerHTML: () => JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: page.value.h1,
          description: page.value.seoDescription,
          url: pageUrl.value,
          serviceType: page.value.h1,
          provider: {
            '@type': 'Organization',
            name: brand.name,
            url: siteUrl,
            telephone: brand.phone
          },
          areaServed: [
            { '@type': 'City', name: 'Gebze' },
            { '@type': 'City', name: 'Kocaeli' },
            { '@type': 'Country', name: 'Turkey' }
          ]
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('nav.services'), item: `${siteUrl}${localePath('/hizmetler')}` },
            { '@type': 'ListItem', position: 2, name: page.value.h1, item: pageUrl.value }
          ]
        },
        {
          '@type': 'FAQPage',
          mainEntity: page.value.faq.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a }
          }))
        }
      ]
    })
  }]
})
</script>

<template>
  <ServiceLandingPage
    :service="service"
    :page="page"
    :others="others"
  />
</template>
