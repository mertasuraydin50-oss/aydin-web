<script setup lang="ts">
import { brand, siteUrl } from '~/constants/site'
import { pageHero } from '~/constants/images'
import { foldSearch } from '~/utils/siteSearch'

const { t } = useI18n()
const { localePath, localizedFaq, localizedPosts } = useLocalizedContent()

const faqQuery = ref('')

const items = computed(() => localizedFaq.value.flatMap(category => category.items))
const relatedPosts = computed(() => localizedPosts.value.slice(0, 3))
const filteredCategories = computed(() => {
  const q = faqQuery.value.trim()
  if (!q) return localizedFaq.value
  const tokens = foldSearch(q).split(' ').filter(Boolean)
  return localizedFaq.value
    .map(category => ({
      ...category,
      items: category.items.filter(item =>
        tokens.every(token => foldSearch(`${item.q} ${item.a}`).includes(token))
      )
    }))
    .filter(category => category.items.length)
})
const matchCount = computed(() =>
  filteredCategories.value.reduce((sum, c) => sum + c.items.length, 0)
)

const pageUrl = computed(() => `${siteUrl}${localePath('/sss')}`)

useSeoMeta({
  title: () => `${t('faqPage.title')} | ${brand.shortName}`,
  description: () => t('faqPage.description'),
  ogTitle: () => t('faqPage.title'),
  ogDescription: () => t('faqPage.description'),
  ogType: 'website',
  ogUrl: pageUrl,
  twitterCard: 'summary_large_image'
})

useHead({
  meta: [{ name: 'keywords', content: () => t('faqPage.keywords') }],
  link: [{ rel: 'canonical', href: () => pageUrl.value }],
  script: [{
    type: 'application/ld+json',
    innerHTML: () => JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'FAQPage',
          mainEntity: items.value.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a }
          }))
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('nav.home'), item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: t('faqPage.title'), item: pageUrl.value }
          ]
        }
      ]
    })
  }]
})
</script>

<template>
  <div class="font-montserrat text-gray-900 bg-white">
    <PageHero
      :badge="t('faqPage.badge')"
      :title="t('faqPage.title')"
      :description="t('faqPage.description')"
      :image="pageHero.faq"
      :image-alt="t('faqPage.title')"
    />

    <section class="py-12 md:py-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <input
            v-model="faqQuery"
            type="search"
            :placeholder="t('faqPage.searchPlaceholder')"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-800"
          >
          <p
            v-if="faqQuery.trim()"
            class="text-xs text-gray-500 mt-2"
          >
            {{ t('faqPage.results', { n: matchCount }) }}
          </p>
        </div>

        <div
          v-for="category in filteredCategories"
          :key="category.id"
          class="mb-10"
        >
          <h2 class="text-xl font-bold mb-1">
            {{ category.title }}
          </h2>
          <p class="text-sm text-gray-500 mb-4">
            {{ category.description }}
          </p>
          <div class="space-y-3">
            <details
              v-for="item in category.items"
              :key="item.q"
              class="group rounded-xl border border-gray-200 bg-white overflow-hidden"
              :open="Boolean(faqQuery.trim())"
            >
              <summary class="px-5 py-4 cursor-pointer font-bold text-sm text-gray-900 hover:bg-gray-50 list-none flex justify-between items-center">
                {{ item.q }}
                <Icon
                  name="lucide:chevron-down"
                  class="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform"
                />
              </summary>
              <p class="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                {{ item.a }}
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="relatedPosts.length"
      class="py-12 bg-gray-50 border-t border-gray-100"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-lg font-bold mb-6">
          {{ t('blogPage.relatedArticles') }}
        </h3>
        <div class="grid sm:grid-cols-3 gap-4">
          <NuxtLink
            v-for="post in relatedPosts"
            :key="post.slug"
            :to="localePath({ name: 'blog-slug', params: { slug: post.slug } })"
            class="p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 transition-colors"
          >
            <p class="font-bold text-sm line-clamp-2">
              {{ post.title }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <PageCta />
  </div>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
summary::-webkit-details-marker { display: none; }
</style>
