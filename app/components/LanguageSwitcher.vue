<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { AppLocale } from '~/utils/appLocale'

const FLAG: Record<AppLocale, string> = {
  tr: '🇹🇷',
  en: '🇬🇧',
  ar: '🇸🇦'
}

const { t, locale, locales } = useI18n()
const route = useRoute()
const localePath = useI18nPath()

const open = ref(false)

function routeName() {
  return String(route.name ?? 'index').replace(/___[a-z0-9-]+$/i, '')
}

const currentLocale = computed(() => locale.value as AppLocale)

const menuItems = computed(() =>
  (locales.value as Array<{ code: AppLocale, name: string }>).map((item): DropdownMenuItem => ({
    label: `${FLAG[item.code]} ${t(`language.names.${item.code}`)}`,
    to: localePath({
      name: routeName(),
      params: route.params,
      query: route.query
    }, item.code),
    ...(currentLocale.value === item.code
      ? { icon: 'i-lucide-check' as const, class: 'font-bold text-gray-900' }
      : { class: 'text-gray-700' }),
    onSelect() {
      open.value = false
    }
  }))
)

const dropdownItems = computed<DropdownMenuItem[][]>(() => [menuItems.value])

watch(() => route.fullPath, () => {
  open.value = false
})
</script>

<template>
  <UDropdownMenu
    v-model:open="open"
    :items="dropdownItems"
    :modal="false"
    :content="{ align: 'end', side: 'bottom', sideOffset: 8 }"
    :ui="{
      content: 'min-w-48 p-1',
      item: 'gap-3'
    }"
  >
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-blue-200 hover:bg-gray-50"
      :aria-label="t('language.switchTo')"
      :aria-expanded="open"
      aria-haspopup="listbox"
    >
      <span
        class="text-base leading-none"
        aria-hidden="true"
      >{{ FLAG[currentLocale] }}</span>
      <span class="sr-only">{{ t(`language.names.${currentLocale}`) }}</span>
      <Icon
        name="lucide:chevron-down"
        class="w-4 h-4 text-gray-500 transition-transform duration-200"
        :class="open ? 'rotate-180' : ''"
        aria-hidden="true"
      />
    </button>
  </UDropdownMenu>
</template>

