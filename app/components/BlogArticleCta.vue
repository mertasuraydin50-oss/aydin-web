<script setup lang="ts">
import { brand } from '~/constants/site'

const { t } = useI18n()
const localePath = useI18nPath()
</script>

<template>
  <section class="mt-12 pt-8 border-t border-gray-100 font-montserrat">
    <h2 class="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
      {{ t('articleCta.title') }}
    </h2>
    <p class="text-gray-600 leading-relaxed mb-6">
      {{ t('articleCta.body') }}
    </p>
    <ul class="space-y-4 text-sm text-gray-700 mb-8">
      <li class="flex items-start gap-3">
        <Icon
          name="mdi:map-marker"
          class="w-5 h-5 text-blue-800 shrink-0 mt-0.5"
        />
        <span>{{ brand.address }}</span>
      </li>
      <li class="flex items-center gap-3">
        <Icon
          name="mdi:phone"
          class="w-5 h-5 text-blue-800 shrink-0"
        />
        <a
          :href="`tel:${brand.phone.replace(/\s/g, '')}`"
          class="font-semibold text-blue-800 hover:text-blue-900"
        >
          {{ brand.phone }}
        </a>
      </li>
      <li class="flex items-center gap-3">
        <Icon
          name="mdi:email"
          class="w-5 h-5 text-blue-800 shrink-0"
        />
        <a
          :href="`mailto:${brand.email}`"
          class="font-semibold text-blue-800 hover:text-blue-900"
        >
          {{ brand.email }}
        </a>
      </li>
    </ul>
    <div class="flex flex-col sm:flex-row gap-3">
      <NuxtLink
        :to="localePath('/iletisim')"
        class="inline-flex justify-center px-8 py-3 bg-blue-800 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-blue-900 transition-colors"
      >
        {{ t('nav.quote') }}
      </NuxtLink>
      <NuxtLink
        :to="localePath('/iletisim')"
        class="inline-flex justify-center px-8 py-3 bg-white text-gray-900 border border-gray-200 font-bold text-sm uppercase tracking-wider rounded hover:border-blue-800 hover:text-blue-800 transition-colors"
      >
        {{ t('nav.contact') }}
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
</style>
