<script setup lang="ts">
import { brand } from '~/constants/site'
import { categoryHero, pageHero } from '~/constants/images'

const { t } = useI18n()
const { localizedCategories, localePath } = useLocalizedContent()

useSeoMeta({
  title: () => `${t('products.title')} | ${brand.shortName}`,
  description: () => t('products.description')
})
</script>

<template>
  <div class="font-montserrat text-gray-900 bg-white">
    <PageHero
      :badge="t('products.badge')"
      :title="t('products.title')"
      :description="t('products.description')"
      :image="pageHero.products"
      :image-alt="t('products.title')"
    />

    <section class="py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <NuxtLink
          v-for="category in localizedCategories"
          :key="category.slug"
          :to="localePath({ name: 'urunler-kategori', params: { kategori: category.slug } })"
          class="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
        >
          <div class="h-52 overflow-hidden">
            <AppImg
              v-if="categoryHero(category.slug)"
              :src="categoryHero(category.slug)!"
              :alt="category.label"
              aspect="auto"
            />
            <ImagePlaceholder
              v-else
              :label="category.label"
              aspect="video"
            />
          </div>
          <div class="p-6">
            <h2 class="text-xl font-bold group-hover:text-blue-800 transition-colors">
              {{ category.label }}
            </h2>
            <p class="text-sm text-gray-500 mt-2">
              {{ category.description }}
            </p>
            <p class="text-xs text-blue-800 font-bold uppercase tracking-wide mt-4 flex items-center gap-1">
              {{ category.products.length }} {{ t('common.detail').toLowerCase() }}
              <Icon
                name="lucide:arrow-right"
                class="w-3 h-3"
              />
            </p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <PageCta />
  </div>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
</style>
