<script setup lang="ts">
import { brand } from '~/constants/site'
import { pageHero } from '~/constants/images'

const { t } = useI18n()

useSeoMeta({
  title: () => `${t('contact.title')} | ${brand.shortName}`,
  description: () => t('contact.description')
})
</script>

<template>
  <div class="font-montserrat text-gray-900 bg-white">
    <section class="relative py-16 md:py-20 bg-gray-50 border-b border-gray-100 overflow-hidden">
      <div
        v-if="pageHero.contact"
        class="absolute inset-0 bg-cover bg-center opacity-20"
        :style="{ backgroundImage: `url(${pageHero.contact})` }"
      />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-blue-800 font-bold tracking-widest uppercase text-sm mb-3 block">{{ t('contact.badge') }}</span>
        <h1 class="text-4xl md:text-5xl font-black text-gray-900">
          {{ t('contact.title') }}
        </h1>
        <p class="mt-4 text-gray-600 max-w-2xl leading-relaxed">
          {{ t('contact.description') }}
        </p>
      </div>
    </section>

    <section class="py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        <div class="space-y-6">
          <div class="flex items-start gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50">
            <Icon
              name="mdi:map-marker"
              class="w-6 h-6 text-blue-800 shrink-0 mt-0.5"
            />
            <div>
              <h3 class="font-bold text-gray-900 mb-1">
                {{ t('common.address') }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ brand.address }}
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50">
            <Icon
              name="mdi:phone"
              class="w-6 h-6 text-blue-800 shrink-0 mt-0.5"
            />
            <div>
              <h3 class="font-bold text-gray-900 mb-1">
                {{ t('common.phone') }}
              </h3>
              <a
                :href="`tel:${brand.phone.replace(/\s/g, '')}`"
                class="text-sm text-gray-600 hover:text-blue-800 transition-colors"
              >
                {{ brand.phone }}
              </a>
            </div>
          </div>

          <div class="flex items-start gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50">
            <Icon
              name="mdi:email"
              class="w-6 h-6 text-blue-800 shrink-0 mt-0.5"
            />
            <div>
              <h3 class="font-bold text-gray-900 mb-1">
                {{ t('common.email') }}
              </h3>
              <a
                :href="`mailto:${brand.email}`"
                class="text-sm text-gray-600 hover:text-blue-800 transition-colors"
              >
                {{ brand.email }}
              </a>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-gray-100 p-8 bg-white shadow-sm">
          <h2 class="text-xl font-bold mb-6">
            {{ t('contact.formTitle') }}
          </h2>
          <p class="text-sm text-gray-500 mb-6">
            {{ t('contact.formPlaceholder') }}
          </p>
          <div class="h-48 rounded-lg overflow-hidden border border-gray-100">
            <AppImg
              v-if="pageHero.contact"
              :src="pageHero.contact"
              :alt="t('contact.title')"
              aspect="auto"
            />
            <ImagePlaceholder
              v-else
              :label="t('contact.mapPlaceholder')"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
