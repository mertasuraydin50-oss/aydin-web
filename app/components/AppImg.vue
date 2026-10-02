<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  alt: string
  aspect?: 'video' | 'square' | 'hero' | 'banner' | 'auto'
  loading?: 'lazy' | 'eager'
  fit?: 'cover' | 'contain' | 'auto'
}>(), {
  aspect: 'video',
  loading: 'lazy',
  fit: 'auto'
})

const objectFit = computed(() => {
  if (props.fit === 'cover' || props.fit === 'contain') return props.fit
  return /\.png(\?|$)/i.test(props.src) ? 'contain' : 'cover'
})

const aspectClass = computed(() => ({
  video: 'aspect-[4/3]',
  square: 'aspect-square',
  hero: 'aspect-[16/10]',
  banner: 'aspect-[21/9]',
  auto: 'h-full min-h-[inherit]'
}))
</script>

<template>
  <div
    class="w-full overflow-hidden bg-gray-100"
    :class="aspectClass[aspect]"
  >
    <img
      :src="src"
      :alt="alt"
      :loading="loading"
      class="w-full h-full object-center"
      :class="objectFit === 'contain' ? 'object-contain p-1' : 'object-cover'"
    >
  </div>
</template>
