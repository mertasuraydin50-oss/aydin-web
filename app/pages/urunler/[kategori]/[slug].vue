<script setup lang="ts">
import { findProduct } from '~/content/load'
import { localizeProductLanding } from '~/content/landings'
import { productPath } from '~/constants/products'
import { brand, siteUrl } from '~/constants/site'
import { categorySlugs, localizeSlug, productSlugs } from '~/constants/slugs'
import ProductLandingPage from '~/components/product/ProductLandingPage.vue'

const route = useRoute()
const { t, locale } = useI18n()
const { getLocalizedCategory, localePath } = useLocalizedContent()

const kategoriParam = route.params.kategori as string
const slugParam = route.params.slug as string

const found = findProduct(kategoriParam, slugParam)
if (!found) {
  throw createError({ statusCode: 404, statusMessage: t('common.productNotFound') })
}

const categoryId = found.category.id
const productId = found.product.id

await useSyncedI18nParams({
  tr: {
    kategori: localizeSlug(categorySlugs, categoryId, 'tr'),
    slug: localizeSlug(productSlugs, productId, 'tr')
  },
  en: {
    kategori: localizeSlug(categorySlugs, categoryId, 'en'),
    slug: localizeSlug(productSlugs, productId, 'en')
  }
})

const category = computed(() => getLocalizedCategory(kategoriParam))
const product = computed(() => {
  const cat = getLocalizedCategory(kategoriParam)
  if (!cat) return null
  return cat.products.find(p => p.slug === productId) ?? null
})
const page = computed(() => localizeProductLanding(productId, locale.value))
const related = computed(() => {
  if (!category.value || !product.value) return []
  return category.value.products.filter(p => p.slug !== productId).slice(0, 3)
})

if (!page.value || !product.value || !category.value) {
  throw createError({ statusCode: 404, statusMessage: t('common.productNotFound') })
}

const pageUrl = computed(() => `${siteUrl}${localePath(productPath(categoryId, productId))}`)

useSeoMeta({
  title: () => page.value!.seoTitle,
  description: () => page.value!.seoDescription,
  ogTitle: () => product.value!.label,
  ogDescription: () => page.value!.seoDescription,
  ogType: 'website',
  ogUrl: pageUrl,
  twitterCard: 'summary_large_image',
  twitterTitle: () => product.value!.label,
  twitterDescription: () => page.value!.seoDescription
})

useHead({
  meta: [{ name: 'keywords', content: () => page.value!.keywords.join(', ') }],
  link: [{ rel: 'canonical', href: () => pageUrl.value }],
  script: [{
    type: 'application/ld+json',
    innerHTML: () => JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Product',
          name: product.value!.label,
          description: page.value!.seoDescription,
          brand: { '@type': 'Brand', name: brand.shortName },
          sku: `AYD-${productId}`,
          category: category.value!.label,
          url: pageUrl.value
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('nav.products'), item: `${siteUrl}${localePath('/urunler')}` },
            { '@type': 'ListItem', position: 2, name: category.value!.label, item: `${siteUrl}${localePath(productPath(categoryId))}` },
            { '@type': 'ListItem', position: 3, name: product.value!.label, item: pageUrl.value }
          ]
        },
        ...(page.value!.faq.length
          ? [{
              '@type': 'FAQPage',
              mainEntity: page.value!.faq.map(item => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a }
              }))
            }]
          : [])
      ]
    })
  }]
})
</script>

<template>
  <ProductLandingPage
    :product="product!"
    :category-id="categoryId"
    :category-label="category!.label"
    :page="page!"
    :related="related"
  />
</template>
