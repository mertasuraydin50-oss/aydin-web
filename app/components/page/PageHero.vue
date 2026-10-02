<script setup lang="ts">
defineProps<{
  badge: string
  title: string
  description?: string
  image?: string
  imageAlt?: string
}>()
</script>

<template>
  <section
    class="py-14 md:py-16 border-b border-gray-100 font-montserrat relative overflow-hidden"
    :class="image ? 'bg-gray-900 text-white' : 'bg-gray-50'"
  >
    <div
      v-if="image"
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${image})` }"
    />
    <div
      v-if="image"
      class="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60"
    />
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <span
        class="font-bold tracking-widest uppercase text-sm mb-3 block"
        :class="image ? 'text-green-400' : 'text-blue-800'"
      >
        {{ badge }}
      </span>
      <h1
        class="text-3xl md:text-5xl font-black leading-tight"
        :class="image ? 'text-white' : 'text-gray-900'"
      >
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="mt-4 max-w-3xl leading-relaxed"
        :class="image ? 'text-white/80' : 'text-gray-600'"
      >
        {{ description }}
      </p>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
</style>
