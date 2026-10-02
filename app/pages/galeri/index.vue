<script setup lang="ts">
import { brand } from '~/constants/site'
import { pageHero } from '~/constants/images'
import { filterGalleryItems } from '~/constants/gallery'

const { t } = useI18n()
const { localizedGalleryCategories } = useLocalizedContent()

type CategoryId = 'all' | 'tank' | 'reaktor' | 'montaj' | 'uretim'

const activeCategory = ref<CategoryId>('all')

const filteredItems = computed(() => filterGalleryItems(activeCategory.value))

useSeoMeta({
  title: () => `${t('gallery.title')} | ${brand.shortName}`,
  description: () => t('gallery.description')
})
</script>

<template>
  <div class="font-montserrat text-gray-900 bg-white">
    <PageHero
      :badge="t('gallery.badge')"
      :title="t('gallery.title')"
      :description="t('gallery.description')"
      :image="pageHero.gallery"
      :image-alt="t('gallery.title')"
    />

    <section class="py-12 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap gap-2 mb-8">
          <button
            v-for="cat in localizedGalleryCategories"
            :key="cat.id"
            type="button"
            class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border transition-colors"
            :class="activeCategory === cat.id
              ? 'bg-blue-800 text-white border-blue-800'
              : 'bg-white text-gray-600 border-gray-200 hover:border-blue-800 hover:text-blue-800'"
            @click="activeCategory = cat.id as CategoryId"
          >
            {{ cat.label }}
          </button>
        </div>

        <PageGalleryGrid
          :items="filteredItems"
          :columns="3"
        />
      </div>
    </section>

    <PageCta />
  </div>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
</style>
