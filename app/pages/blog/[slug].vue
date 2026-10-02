<script setup lang="ts">
import { blogCover } from '~/constants/images'
import { readingMinutes } from '~/constants/blogTypes'
import { brand, siteUrl } from '~/constants/site'
import { findBlog, toBlogView } from '~/content/load'

const route = useRoute()
const slugParam = route.params.slug as string
const record = findBlog(slugParam)

if (!record) {
  throw createError({ statusCode: 404, statusMessage: 'Yazı bulunamadı' })
}

await useSyncedI18nParams({
  tr: { slug: record.slugs.tr },
  en: { slug: record.slugs.en }
})

const { t, locale } = useI18n()
const { localePath, localizedPosts } = useLocalizedContent()
const localized = computed(() => toBlogView(record, locale.value))
const blocks = computed(() => localized.value.body)
const others = computed(() => localizedPosts.value.filter(p => p.slug !== record.id).slice(0, 3))
const minutes = computed(() => readingMinutes(localized.value))
const formattedDate = computed(() =>
  new Date(`${record.shared.date}T00:00:00`).toLocaleDateString(locale.value === 'en' ? 'en-GB' : 'tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
)

const pageUrl = computed(() => `${siteUrl}${localePath({ name: 'blog-slug', params: { slug: record.id } })}`)
const cover = computed(() => blogCover(record.id) ?? localized.value.cover)

useSeoMeta({
  title: () => localized.value.seoTitle ?? `${localized.value.title} | ${brand.shortName}`,
  description: () => localized.value.excerpt,
  ogTitle: () => localized.value.title,
  ogDescription: () => localized.value.excerpt,
  ogType: 'article',
  ogUrl: pageUrl,
  twitterCard: 'summary_large_image',
  twitterTitle: () => localized.value.title,
  twitterDescription: () => localized.value.excerpt,
  articlePublishedTime: record.shared.date
})

useHead({
  meta: [{ name: 'keywords', content: () => localized.value.keywords?.join(', ') ?? '' }],
  link: [{ rel: 'canonical', href: () => pageUrl.value }],
  script: [{
    type: 'application/ld+json',
    innerHTML: () => JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: localized.value.title,
          description: localized.value.excerpt,
          datePublished: record.shared.date,
          author: { '@type': 'Organization', name: brand.name },
          publisher: {
            '@type': 'Organization',
            name: brand.name,
            logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.jpeg` }
          },
          mainEntityOfPage: pageUrl.value,
          keywords: localized.value.keywords?.join(', ')
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('nav.blog'), item: `${siteUrl}${localePath('/blog')}` },
            { '@type': 'ListItem', position: 2, name: localized.value.title, item: pageUrl.value }
          ]
        },
        ...(localized.value.faq?.length
          ? [{
              '@type': 'FAQPage',
              mainEntity: localized.value.faq.map(item => ({
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
  <div class="font-montserrat text-gray-900 bg-white">
    <PageHero
      :badge="localized.category"
      :title="localized.title"
      :description="localized.excerpt"
      :image="cover"
      :image-alt="localized.title"
    >
      <nav class="mt-6 text-sm flex flex-wrap gap-2" :class="cover ? 'text-white/70' : 'text-gray-500'">
        <NuxtLink
          :to="localePath('/blog')"
          :class="cover ? 'hover:text-white' : 'hover:text-blue-800'"
        >
          {{ t('nav.blog') }}
        </NuxtLink>
        <span>/</span>
        <span :class="cover ? 'text-white font-medium' : 'text-gray-900 font-medium'">{{ localized.category }}</span>
      </nav>
    </PageHero>

    <article class="py-12 md:py-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
          {{ formattedDate }} · {{ t('blogPage.readTime', { n: minutes }) }}
        </p>

        <div class="rounded-xl overflow-hidden mb-10 border border-gray-100 h-56">
          <AppImg
            v-if="cover"
            :src="cover"
            :alt="localized.title"
            aspect="auto"
          />
          <ImagePlaceholder
            v-else
            :label="localized.category"
            aspect="banner"
          />
        </div>

        <div class="prose prose-gray max-w-none space-y-4">
          <template
            v-for="(block, i) in blocks"
            :key="i"
          >
            <h2
              v-if="block.type === 'h2'"
              class="text-2xl font-bold text-gray-900 mt-8 mb-3"
            >
              {{ block.text }}
            </h2>
            <h3
              v-else-if="block.type === 'h3'"
              class="text-xl font-bold text-gray-900 mt-6 mb-2"
            >
              {{ block.text }}
            </h3>
            <p
              v-else-if="block.type === 'p'"
              class="text-gray-600 leading-relaxed"
            >
              {{ block.text }}
            </p>
            <ul
              v-else-if="block.type === 'ul'"
              class="list-disc pl-5 space-y-1 text-gray-600"
            >
              <li
                v-for="item in block.items"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
            <div
              v-else-if="block.type === 'table'"
              class="overflow-x-auto rounded-xl border border-gray-200 my-6"
            >
              <table class="w-full text-sm">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      v-for="header in block.headers"
                      :key="header"
                      class="px-4 py-2 text-left font-bold text-gray-900"
                    >
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, ri) in block.rows"
                    :key="ri"
                    class="border-t border-gray-100"
                  >
                    <td
                      v-for="(cell, ci) in row"
                      :key="ci"
                      class="px-4 py-2 text-gray-600"
                    >
                      {{ cell }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </div>

        <div
          v-if="localized.tags?.length"
          class="flex flex-wrap gap-2 mt-8"
        >
          <span
            v-for="tag in localized.tags"
            :key="tag"
            class="px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-600"
          >
            #{{ tag }}
          </span>
        </div>

        <section
          v-if="localized.faq?.length"
          class="mt-10 pt-8 border-t border-gray-100"
        >
          <h2 class="text-xl font-bold mb-4">
            {{ t('blogPage.faqTitle') }}
          </h2>
          <div class="space-y-3">
            <details
              v-for="item in localized.faq"
              :key="item.q"
              class="group rounded-xl border border-gray-200 bg-white overflow-hidden"
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
        </section>

        <BlogArticleCta />
      </div>
    </article>

    <section
      v-if="others.length"
      class="py-12 bg-gray-50 border-t border-gray-100"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-lg font-bold mb-6">
          {{ t('blog.otherPosts') }}
        </h3>
        <div class="grid sm:grid-cols-3 gap-4">
          <NuxtLink
            v-for="item in others"
            :key="item.slug"
            :to="localePath({ name: 'blog-slug', params: { slug: item.slug } })"
            class="p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 transition-colors"
          >
            <p class="text-xs text-blue-800 font-bold uppercase">
              {{ item.category }}
            </p>
            <p class="font-bold text-sm mt-1 line-clamp-2">
              {{ item.title }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
summary::-webkit-details-marker { display: none; }
</style>
