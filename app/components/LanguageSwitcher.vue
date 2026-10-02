<script setup lang="ts">
const { locale, locales } = useI18n()
const route = useRoute()
const localePath = useI18nPath()

function routeName() {
  return String(route.name ?? 'index').replace(/___[a-z0-9-]+$/i, '')
}

const options = computed(() =>
  (locales.value as Array<{ code: 'tr' | 'en', name: string }>).map(item => ({
    code: item.code,
    label: item.code.toUpperCase(),
    to: localePath({
      name: routeName(),
      params: route.params,
      query: route.query
    }, item.code),
    active: locale.value === item.code
  }))
)
</script>

<template>
  <div
    class="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 p-0.5"
    :aria-label="$t('language.switchTo')"
  >
    <NuxtLink
      v-for="item in options"
      :key="item.code"
      :to="item.to"
      class="px-2.5 py-1 text-xs font-bold tracking-wide rounded transition-colors"
      :class="item.active
        ? 'bg-white text-gray-900 shadow-sm'
        : 'text-gray-500 hover:text-gray-900'"
    >
      {{ item.label }}
    </NuxtLink>
  </div>
</template>
