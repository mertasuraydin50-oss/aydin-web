<script setup lang="ts">
const props = withDefaults(defineProps<{
  images: string[]
  alt: string
  fit?: 'cover' | 'contain' | 'auto'
}>(), {
  fit: 'auto'
})

function objectFitFor(src: string) {
  if (props.fit === 'cover' || props.fit === 'contain') return props.fit
  return /\.png(\?|$)/i.test(src) ? 'contain' : 'cover'
}

const selected = ref(0)
const broken = ref<Set<string>>(new Set())

const visibleImages = computed(() =>
  props.images.filter(img => !broken.value.has(img))
)

watch(visibleImages, (images) => {
  if (selected.value >= images.length) {
    selected.value = 0
  }
})

function markBroken(src: string) {
  broken.value = new Set([...broken.value, src])
}
</script>

<template>
  <div class="space-y-3">
    <div class="aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
      <img
        v-if="visibleImages.length"
        :src="visibleImages[selected]"
        :alt="alt"
        class="w-full h-full object-center"
        :class="objectFitFor(visibleImages[selected]!) === 'contain' ? 'object-contain p-2' : 'object-cover'"
        @error="markBroken(visibleImages[selected]!)"
      >
      <ImagePlaceholder
        v-else
        :label="alt"
      />
    </div>
    <div
      v-if="visibleImages.length > 1"
      class="grid grid-cols-4 sm:grid-cols-6 gap-2"
    >
      <button
        v-for="(img, i) in visibleImages"
        :key="img"
        type="button"
        class="aspect-square rounded-lg overflow-hidden border-2 transition"
        :class="selected === i ? 'border-blue-800' : 'border-transparent opacity-70 hover:opacity-100'"
        @click="selected = i"
      >
        <img
          :src="img"
          :alt="`${alt} ${i + 1}`"
          class="w-full h-full object-center"
          :class="objectFitFor(img) === 'contain' ? 'object-contain p-0.5' : 'object-cover'"
          @error="markBroken(img)"
        >
      </button>
    </div>
  </div>
</template>
