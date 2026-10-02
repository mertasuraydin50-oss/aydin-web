<script setup lang="ts">
import { brand } from '~/constants/site'
import { pageHero } from '~/constants/images'
import { useSiteSearchIndex } from '~/composables/useSiteSearchIndex'
import type { SearchKind } from '~/utils/siteSearch'

const { t } = useI18n()
const route = useRoute()
const localePath = useI18nPath()
const { query } = useSiteSearchIndex()

const term = computed(() => String(route.query.q ?? '').trim())
const results = computed(() => query(term.value, 40))

function kindLabel(kind: SearchKind) {
  return t(`search.kinds.${kind}`)
}

useSeoMeta({
  title: () => `${t('search.pageTitle')} | ${brand.shortName}`,
  description: () => t('search.pageDescription'),
  robots: 'noindex, follow'
})
</script>

<template>
  <div class="font-montserrat text-gray-900 bg-white">
    <PageHero
      :badge="$t('search.label')"
      :title="$t('search.pageTitle')"
      :description="term
        ? $t('search.pageLead', { q: term, n: results.length })
        : $t('search.pageDescription')"
      :image="pageHero.search"
      :image-alt="$t('search.pageTitle')"
    />

    <section class="py-12 md:py-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SiteSearch
          variant="hero"
          input-id="site-search-page"
        />

        <ul
          v-if="term && results.length"
          class="mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white overflow-hidden"
        >
          <li
            v-for="hit in results"
            :key="hit.id"
          >
            <NuxtLink
              :to="localePath(hit.to)"
              class="block px-5 py-4 hover:bg-gray-50 transition-colors"
            >
              <p class="text-[10px] font-bold uppercase tracking-widest text-blue-800 mb-1">
                {{ kindLabel(hit.kind) }}
              </p>
              <h2 class="text-base font-bold text-gray-900">
                {{ hit.title }}
              </h2>
              <p class="text-sm text-gray-500 mt-1">
                {{ hit.description }}
              </p>
            </NuxtLink>
          </li>
        </ul>

        <p
          v-else-if="term"
          class="mt-8 text-sm text-gray-500"
        >
          {{ $t('search.empty') }}
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
</style>
