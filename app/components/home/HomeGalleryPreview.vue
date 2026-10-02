<script setup lang="ts">
import { featuredGalleryItems } from '~/constants/gallery'

const { t } = useI18n()
const localePath = useI18nPath()
</script>

<template>
  <section class="py-16 md:py-20 bg-white border-t border-gray-100 font-montserrat">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span class="text-blue-800 font-bold tracking-widest uppercase text-sm mb-2 block">{{ t('nav.gallery') }}</span>
          <h2 class="text-3xl font-bold text-gray-900">
            {{ t('gallery.title') }}
          </h2>
          <p class="mt-2 text-sm text-gray-500 max-w-xl">
            {{ t('gallery.description') }}
          </p>
        </div>
        <NuxtLink
          :to="localePath('/galeri')"
          class="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wide text-gray-900 border-b-2 border-blue-800 pb-1 hover:text-blue-800 transition shrink-0"
        >
          {{ t('nav.gallery') }}
          <Icon
            name="lucide:arrow-right"
            class="w-4 h-4"
          />
        </NuxtLink>
      </div>

      <PageGalleryGrid
        :items="featuredGalleryItems"
        :columns="4"
      />
    </div>
  </section>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
</style>
