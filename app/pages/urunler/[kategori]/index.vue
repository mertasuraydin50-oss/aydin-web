<script setup lang="ts">
import { categoryHero, productHero } from '~/constants/images'
import { findCategory } from '~/content/load'
import { brand } from '~/constants/site'
import { categorySlugs, localizeSlug } from '~/constants/slugs'

const route = useRoute()
const { t } = useI18n()
const { localePath, localizedCategories, getLocalizedCategory } = useLocalizedContent()

const kategoriParam = route.params.kategori as string
const found = findCategory(kategoriParam)

if (!found) {
  throw createError({ statusCode: 404, statusMessage: t('common.notFound') })
}

const categoryId = found.id

await useSyncedI18nParams({
  tr: { kategori: localizeSlug(categorySlugs, categoryId, 'tr') },
  en: { kategori: localizeSlug(categorySlugs, categoryId, 'en') }
})

const category = computed(() => getLocalizedCategory(kategoriParam)!)

useSeoMeta({
  title: () => `${category.value.label} | ${brand.shortName}`,
  description: () => category.value.description
})
</script>

<template>
  <div class="font-montserrat text-gray-900 bg-white">
    <PageHero
      :badge="t('products.badge')"
      :title="category.label"
      :description="category.description"
      :image="categoryHero(categoryId)"
      :image-alt="category.label"
    >
      <nav class="mt-6 text-sm text-gray-500 flex flex-wrap gap-2">
        <NuxtLink
          :to="localePath('/urunler')"
          class="hover:text-blue-800"
        >
          {{ t('products.breadcrumb') }}
        </NuxtLink>
        <span>/</span>
        <span class="text-gray-900 font-medium">{{ category.label }}</span>
      </nav>
    </PageHero>

    <section class="py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="product in category.products"
            :key="product.slug"
            :to="localePath({ name: 'urunler-kategori-slug', params: { kategori: categoryId, slug: product.slug } })"
            class="group rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-md transition-all overflow-hidden"
          >
            <div
              v-if="productHero(product.slug)"
              class="h-36 overflow-hidden"
            >
              <AppImg
                :src="productHero(product.slug)!"
                :alt="product.label"
                aspect="auto"
              />
            </div>
            <div class="p-6">
            <h2 class="text-lg font-bold group-hover:text-blue-800 transition-colors">
              {{ product.label }}
            </h2>
            <p class="text-sm text-gray-500 mt-2">
              {{ product.description }}
            </p>
            <span class="inline-flex items-center gap-1 mt-4 text-xs font-bold uppercase tracking-wide text-blue-800">
              {{ t('common.detail') }}
              <Icon
                name="lucide:arrow-right"
                class="w-3 h-3 group-hover:translate-x-1 transition-transform"
              />
            </span>
            </div>
          </NuxtLink>
        </div>

        <div class="mt-12 pt-8 border-t border-gray-100">
          <div class="flex flex-wrap gap-3">
            <NuxtLink
              v-for="cat in localizedCategories.filter(c => c.slug !== categoryId)"
              :key="cat.slug"
              :to="localePath({ name: 'urunler-kategori', params: { kategori: cat.slug } })"
              class="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium hover:border-blue-800 hover:text-blue-800 transition-colors"
            >
              {{ cat.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <PageCta />
  </div>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
</style>
