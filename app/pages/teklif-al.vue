<script setup lang="ts">
import { brand } from '~/constants/site'
import { pageHero } from '~/constants/images'

const { t } = useI18n()
const localePath = useI18nPath()

useSeoMeta({
  title: () => `${t('quotePage.title')} | ${brand.shortName}`,
  description: () => t('quotePage.description')
})
</script>

<template>
  <div class="font-montserrat text-gray-900 bg-white">
    <PageHero
      :badge="t('quotePage.badge')"
      :title="t('quotePage.title')"
      :description="t('quotePage.description')"
      :image="pageHero.teklif"
      :image-alt="t('quotePage.title')"
    />

    <section class="py-16 md:py-20">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="rounded-xl border border-gray-100 p-8 bg-white shadow-sm space-y-6">
          <p class="text-sm text-gray-500">
            {{ t('quotePage.formNote') }}
          </p>

          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">{{ t('quotePage.fields.name') }}</label>
              <input
                type="text"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm"
                disabled
              >
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">{{ t('quotePage.fields.company') }}</label>
              <input
                type="text"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm"
                disabled
              >
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">{{ t('quotePage.fields.phone') }}</label>
              <input
                type="tel"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm"
                disabled
              >
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">{{ t('quotePage.fields.email') }}</label>
              <input
                type="email"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm"
                disabled
              >
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">{{ t('quotePage.fields.message') }}</label>
            <textarea
              rows="4"
              class="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm"
              disabled
            />
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              :href="`tel:${brand.phone.replace(/\s/g, '')}`"
              class="inline-flex justify-center px-8 py-3 bg-blue-800 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-blue-900 transition-colors"
            >
              {{ t('common.callUs') }}
            </a>
            <NuxtLink
              :to="localePath('/iletisim')"
              class="inline-flex justify-center px-8 py-3 border border-gray-200 text-gray-900 font-bold text-sm uppercase tracking-wider rounded hover:border-blue-800 hover:text-blue-800 transition-colors"
            >
              {{ t('nav.contact') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
</style>
