<script setup lang="ts">
import type { GalleryItem } from '~/constants/gallery'

const props = withDefaults(defineProps<{
  items: GalleryItem[]
  columns?: 2 | 3 | 4
}>(), {
  columns: 3
})

const columnClass = computed(() => ({
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
}[props.columns]))
</script>

<template>
  <div
    v-if="items.length"
    class="grid gap-3 md:gap-4"
    :class="columnClass"
  >
    <div
      v-for="item in items"
      :key="item.id"
      class="group relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 bg-gray-50"
    >
      <AppImg
        v-if="item.src"
        :src="item.src"
        :alt="item.title"
        aspect="auto"
      />
      <ImagePlaceholder
        v-else
        :label="item.title"
        aspect="video"
      />
      <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
        <p class="text-xs font-bold text-green-400 uppercase tracking-wider">
          {{ item.categoryLabel }}
        </p>
        <p class="text-sm font-bold text-white line-clamp-1">
          {{ item.title }}
        </p>
      </div>
    </div>
  </div>
  <p
    v-else
    class="text-sm text-gray-500 text-center py-12"
  >
    Bu kategoride görüntülenecek fotoğraf bulunamadı.
  </p>
</template>
