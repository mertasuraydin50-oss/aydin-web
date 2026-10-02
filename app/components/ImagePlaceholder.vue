<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  aspect?: 'video' | 'square' | 'hero' | 'banner'
}>(), {
  label: 'Görsel Eklenecek',
  aspect: 'video'
})

const aspectClass: Record<string, string> = {
  video: 'aspect-video',
  square: 'aspect-square',
  hero: 'min-h-full',
  banner: 'min-h-[300px]'
}
</script>

<template>
  <div
    class="w-full bg-gray-100 flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-200"
    :class="aspectClass[aspect]"
  >
    <Icon
      name="lucide:image"
      class="w-8 h-8 mb-2 opacity-60"
    />
    <span class="text-xs font-bold uppercase tracking-wider opacity-70">{{ label }}</span>
  </div>
</template>
