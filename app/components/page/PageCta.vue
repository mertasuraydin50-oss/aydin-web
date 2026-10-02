<script setup lang="ts">
import { brand } from '~/constants/site'

const { t } = useI18n()
const localePath = useI18nPath()

withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: undefined,
  description: undefined
})
</script>

<template>
  <section class="py-16 md:py-20 bg-white text-center border-t border-gray-100 font-montserrat">
    <div class="max-w-3xl mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        {{ title ?? t('cta.title') }}
      </h2>
      <p class="text-gray-600 mb-8">
        {{ description ?? t('cta.description') }}
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <NuxtLink
          :to="localePath('/iletisim')"
          class="px-8 py-3 bg-blue-800 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-blue-900 transition-colors shadow-lg"
        >
          {{ t('cta.quote') }}
        </NuxtLink>
        <a
          :href="`tel:${brand.phone.replace(/\s/g, '')}`"
          class="px-8 py-3 bg-white text-gray-900 border border-gray-200 font-bold text-sm uppercase tracking-wider rounded hover:border-blue-800 hover:text-blue-800 transition-colors inline-flex items-center justify-center gap-2"
        >
          <Icon
            name="mdi:phone"
            class="w-5 h-5"
          />
          {{ t('cta.call') }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
</style>
