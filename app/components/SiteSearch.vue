<script setup lang="ts">
import { useSiteSearchIndex } from '~/composables/useSiteSearchIndex'
import type { SearchKind } from '~/utils/siteSearch'

const props = withDefaults(defineProps<{
  variant?: 'icon' | 'hero' | 'field'
  inputId?: string
}>(), {
  variant: 'field',
  inputId: 'site-search'
})

const emit = defineEmits<{
  navigate: []
}>()

const { t } = useI18n()
const localePath = useI18nPath()
const { query } = useSiteSearchIndex()

const term = ref('')
const open = ref(false)
const iconOpen = ref(false)
const activeIndex = ref(0)
const root = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)

const isHero = computed(() => props.variant === 'hero')
const isIcon = computed(() => props.variant === 'icon')
const results = computed(() => query(term.value, 8))
const showPanel = computed(() => {
  if (term.value.trim().length < 2) return false
  if (isIcon.value) return iconOpen.value
  return open.value
})

watch(results, () => {
  activeIndex.value = 0
})

watch(iconOpen, async (value) => {
  if (value) {
    await nextTick()
    inputEl.value?.focus()
  }
})

function kindLabel(kind: SearchKind) {
  return t(`search.kinds.${kind}`)
}

function close() {
  open.value = false
  iconOpen.value = false
}

function go(to: string) {
  close()
  emit('navigate')
  return navigateTo(localePath(to))
}

function submit() {
  const hit = results.value[activeIndex.value]
  if (hit) {
    void go(hit.to)
    return
  }

  const q = term.value.trim()
  if (!q) return
  close()
  emit('navigate')
  void navigateTo({
    path: localePath('/ara'),
    query: { q }
  })
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close()
    return
  }
  if (!showPanel.value && event.key !== 'Enter') return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, Math.max(results.value.length - 1, 0))
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  }
}

function onDocumentClick(event: MouseEvent) {
  if (!root.value?.contains(event.target as Node)) close()
}

onMounted(() => document.addEventListener('mousedown', onDocumentClick))
onUnmounted(() => document.removeEventListener('mousedown', onDocumentClick))
</script>

<template>
  <div
    ref="root"
    class="relative"
    :class="isIcon ? 'shrink-0' : 'w-full'"
  >
    <button
      v-if="isIcon"
      type="button"
      class="w-10 h-10 rounded-full border border-gray-900 text-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors"
      :aria-expanded="iconOpen"
      :aria-label="$t('search.label')"
      @click="iconOpen = !iconOpen"
    >
      <Icon
        name="lucide:search"
        class="w-4 h-4"
      />
    </button>

    <button
      v-if="isIcon && iconOpen"
      type="button"
      class="fixed inset-0 z-[55] bg-black/40 lg:hidden"
      :aria-label="$t('search.label')"
      @click="close"
    />

    <div
      v-show="!isIcon || iconOpen"
      :class="isIcon
        ? 'fixed z-[60] left-3 right-3 top-[6.25rem] lg:absolute lg:left-auto lg:right-0 lg:top-full lg:mt-3 lg:w-[22rem] lg:max-w-[calc(100vw-2rem)]'
        : 'w-full'"
    >
      <form
        role="search"
        @submit.prevent="submit"
      >
        <label
          class="sr-only"
          :for="inputId"
        >
          {{ $t('search.label') }}
        </label>
        <div
          class="flex items-center bg-white"
          :class="isHero
            ? 'rounded-full shadow-[0_8px_40px_rgba(0,0,0,0.18)] pl-5 pr-1.5 py-1.5'
            : 'rounded-full border border-gray-200 shadow-sm pl-3 sm:pl-4 pr-1 py-1'"
        >
          <Icon
            name="lucide:search"
            class="w-5 h-5 text-gray-800 shrink-0"
          />
          <input
            :id="inputId"
            ref="inputEl"
            v-model="term"
            type="search"
            autocomplete="off"
            enterkeyhint="search"
            :placeholder="isHero ? $t('search.placeholderHero') : $t('search.placeholder')"
            class="flex-1 min-w-0 bg-transparent border-0 text-base text-gray-800 placeholder:text-gray-400 px-2 sm:px-3 py-2 focus:outline-none focus:ring-0 [&::-webkit-search-cancel-button]:hidden"
            :aria-expanded="showPanel"
            :aria-controls="`${inputId}-results`"
            @focus="open = true"
            @keydown="onKey"
          >
          <button
            type="submit"
            class="shrink-0 px-4 sm:px-5 md:px-6 py-2 md:py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors"
          >
            {{ $t('search.button') }}
          </button>
        </div>
      </form>

      <div
        v-if="showPanel"
        :id="`${inputId}-results`"
        class="mt-2 rounded-xl border border-gray-100 bg-white shadow-2xl overflow-hidden"
      >
        <ul
          v-if="results.length"
          class="max-h-80 overflow-y-auto py-1"
        >
          <li
            v-for="(hit, index) in results"
            :key="hit.id"
          >
            <NuxtLink
              :to="localePath(hit.to)"
              class="flex items-start gap-3 px-3 py-2.5 text-left transition-colors"
              :class="index === activeIndex ? 'bg-blue-50' : 'hover:bg-gray-50'"
              @mouseenter="activeIndex = index"
              @click="close(); emit('navigate')"
            >
              <span class="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-800 shrink-0 w-16">
                {{ kindLabel(hit.kind) }}
              </span>
              <span class="min-w-0">
                <span class="block text-sm font-semibold text-gray-900 leading-snug">
                  {{ hit.title }}
                </span>
                <span class="block text-xs text-gray-500 mt-0.5 line-clamp-2">
                  {{ hit.description }}
                </span>
              </span>
            </NuxtLink>
          </li>
        </ul>
        <p
          v-else
          class="px-4 py-3 text-sm text-gray-500"
        >
          {{ $t('search.empty') }}
        </p>
        <NuxtLink
          :to="{ path: localePath('/ara'), query: { q: term.trim() } }"
          class="block border-t border-gray-100 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-blue-800 hover:bg-gray-50"
          @click="close(); emit('navigate')"
        >
          {{ $t('search.seeAll') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
