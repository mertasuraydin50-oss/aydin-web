<script setup lang="ts">
import { brand } from '~/constants/site'
import { pageHero, serviceHero } from '~/constants/images'

const { t } = useI18n()
const { localizedServices, localePath } = useLocalizedContent()

const serviceIcons: Record<string, string> = {
  'proje-tasarim-muhendislik': 'mdi:pencil-ruler',
  'uretim-imalat': 'mdi:factory',
  'montaj-tesis-kurulumu': 'mdi:hard-hat',
  'bakim-servis': 'mdi:wrench',
  'otomasyon-proses-entegrasyonu': 'mdi:chip'
}

useSeoMeta({
  title: () => `${t('services.title')} | ${brand.shortName}`,
  description: () => t('services.description')
})
</script>

<template>
  <div class="font-montserrat text-gray-900 bg-white">
    <PageHero
      :badge="t('services.badge')"
      :title="t('services.title')"
      :description="t('services.description')"
      :image="pageHero.services"
      :image-alt="t('services.title')"
    />

    <section class="py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="service in localizedServices"
          :key="service.slug"
          :to="localePath({ name: 'hizmetler-slug', params: { slug: service.slug } })"
          class="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all"
        >
          <div class="h-40 overflow-hidden">
            <AppImg
              v-if="serviceHero(service.slug)"
              :src="serviceHero(service.slug)!"
              :alt="service.label"
              aspect="auto"
            />
            <ImagePlaceholder
              v-else
              :label="service.label"
              aspect="video"
            />
          </div>
          <div class="p-6">
            <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-800 mb-3">
              <Icon
                :name="serviceIcons[service.slug] ?? 'mdi:cog'"
                class="w-5 h-5"
              />
            </div>
            <h2 class="text-lg font-bold group-hover:text-blue-800 transition-colors">
              {{ service.label }}
            </h2>
            <p class="text-sm text-gray-500 mt-2">
              {{ service.description }}
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
