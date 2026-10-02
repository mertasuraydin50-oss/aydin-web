<script setup lang="ts">
import type { ServiceItem } from '~/constants/services'
import type { ServiceLandingContent } from '~/content/landings'
import { serviceGallery, serviceHero } from '~/constants/images'

const props = defineProps<{
  service: ServiceItem
  page: ServiceLandingContent
  others: ServiceItem[]
}>()

const { t } = useI18n()
const { localePath, localizedStats: stats } = useLocalizedContent()

const hero = computed(() => serviceHero(props.service.slug))
const gallery = computed(() => serviceGallery(props.service.slug, 8))
</script>

<template>
  <div class="font-montserrat text-gray-900 bg-white">
    <PageHero
      :badge="t('services.detailBadge')"
      :title="page.h1"
      :description="page.heroDescription"
      :image="hero"
      :image-alt="page.h1"
    >
      <nav class="mt-6 text-sm flex flex-wrap gap-2" :class="hero ? 'text-white/70' : 'text-gray-500'">
        <NuxtLink
          :to="localePath('/hizmetler')"
          :class="hero ? 'hover:text-white' : 'hover:text-blue-800'"
        >
          {{ t('nav.services') }}
        </NuxtLink>
        <span>/</span>
        <span class="text-gray-900 font-medium">{{ page.h1 }}</span>
      </nav>
      <div class="flex flex-wrap gap-2 mt-4">
        <span
          v-for="chip in page.chips"
          :key="chip"
          class="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-100"
        >
          {{ chip }}
        </span>
      </div>
      <div class="flex flex-wrap gap-3 mt-5">
        <NuxtLink
          :to="localePath('/iletisim')"
          class="inline-flex items-center px-6 py-3 bg-blue-800 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-blue-900 transition-colors"
        >
          {{ t('nav.quote') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/iletisim')"
          class="inline-flex items-center px-6 py-3 border border-gray-200 text-gray-900 font-bold text-sm uppercase tracking-wider rounded hover:border-blue-800 hover:text-blue-800 transition-colors"
        >
          {{ t('nav.contact') }}
        </NuxtLink>
      </div>
    </PageHero>

    <section class="border-b border-gray-100 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="item in stats"
          :key="item.label"
        >
          <p class="text-2xl md:text-3xl font-black text-gray-900">
            {{ item.value }}
          </p>
          <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-1">
            {{ item.label }}
          </p>
        </div>
      </div>
    </section>

    <section class="py-14 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
        <div class="lg:col-span-7">
          <PageImageGallery
            v-if="gallery.length"
            :images="gallery"
            :alt="service.label"
            class="mb-8"
          />
          <div
            v-else
            class="aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 mb-8"
          >
            <ImagePlaceholder
              :label="service.label"
              aspect="video"
            />
          </div>
        </div>
        <aside class="lg:col-span-5">
          <p class="text-xs font-bold uppercase tracking-widest text-blue-800 mb-4">
            {{ page.asideLabel }}
          </p>
          <div class="space-y-4 mb-8">
            <p
              v-for="(para, i) in page.intro"
              :key="i"
              class="text-gray-600 leading-relaxed"
            >
              {{ para }}
            </p>
          </div>
          <ul class="space-y-3">
            <li
              v-for="item in page.highlights"
              :key="item.title"
              class="flex gap-3"
            >
              <Icon
                :name="item.icon.replace('lucide:', 'lucide:')"
                class="w-5 h-5 text-blue-800 shrink-0 mt-0.5"
              />
              <div>
                <p class="font-bold text-sm">
                  {{ item.title }}
                </p>
                <p class="text-xs text-gray-500 mt-0.5">
                  {{ item.text }}
                </p>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="py-14 bg-gray-50 border-y border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold mb-2">
          {{ page.processTitle }}
        </h2>
        <p class="text-gray-500 mb-8">
          {{ page.processLead }}
        </p>
        <div class="grid sm:grid-cols-2 gap-6">
          <div
            v-for="(step, i) in page.process"
            :key="step.title"
            class="flex gap-4 p-6 rounded-xl bg-white border border-gray-100"
          >
            <span class="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center text-sm font-bold shrink-0">
              {{ i + 1 }}
            </span>
            <div>
              <h3 class="font-bold text-gray-900 mb-1">
                {{ step.title }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ step.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-14 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold mb-6">
          {{ page.includedTitle }}
        </h2>
        <ul class="grid sm:grid-cols-2 gap-3">
          <li
            v-for="item in page.included"
            :key="item"
            class="flex items-center gap-2 text-sm text-gray-700"
          >
            <Icon
              name="lucide:check"
              class="w-4 h-4 text-green-600 shrink-0"
            />
            {{ item }}
          </li>
        </ul>
      </div>
    </section>

    <section class="py-14 bg-gray-50 border-t border-gray-100">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold mb-2">
          {{ page.faqTitle }}
        </h2>
        <p class="text-gray-500 mb-8">
          {{ page.faqLead }}
        </p>
        <div class="space-y-3">
          <details
            v-for="item in page.faq"
            :key="item.q"
            class="group rounded-xl border border-gray-200 bg-white overflow-hidden"
          >
            <summary class="px-5 py-4 cursor-pointer font-bold text-sm text-gray-900 hover:bg-gray-50 list-none flex justify-between items-center">
              {{ item.q }}
              <Icon
                name="lucide:chevron-down"
                class="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform"
              />
            </summary>
            <p class="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
              {{ item.a }}
            </p>
          </details>
        </div>
      </div>
    </section>

    <section
      v-if="others.length"
      class="py-12 border-t border-gray-100"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-lg font-bold mb-6">
          {{ t('services.otherServices') }}
        </h3>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <NuxtLink
            v-for="item in others"
            :key="item.slug"
            :to="localePath({ name: 'hizmetler-slug', params: { slug: item.slug } })"
            class="p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 transition-colors text-sm font-bold"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <PageCta :title="t('services.quoteFor', { name: service.label })" />
  </div>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
summary::-webkit-details-marker { display: none; }
</style>
