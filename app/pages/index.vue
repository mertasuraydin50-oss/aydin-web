<script setup lang="ts">
import { blogCover, categoryHero, homeImages } from '~/constants/images'
import { brand } from '~/constants/site'

const { t } = useI18n()
const {
  localizedCategories,
  localizedServices,
  localizedPosts,
  localizedWhyUs,
  localizedSectors,
  localizedReferences,
  localizedStats,
  localePath
} = useLocalizedContent()

const latestPosts = computed(() => localizedPosts.value.slice(0, 3))

const serviceIcons: Record<string, string> = {
  'proje-tasarim-muhendislik': 'mdi:pencil-ruler',
  'uretim-imalat': 'mdi:factory',
  'montaj-tesis-kurulumu': 'mdi:hard-hat',
  'bakim-servis': 'mdi:wrench',
  'otomasyon-proses-entegrasyonu': 'mdi:chip'
}

useSeoMeta({
  title: () => `${brand.shortName} | ${t('brand.tagline')}`,
  description: () => t('brand.description'),
  ogTitle: () => `${brand.shortName} | ${t('brand.tagline')}`,
  ogDescription: () => t('brand.description')
})
</script>

<template>
  <div class="font-montserrat text-gray-900 bg-white selection:bg-blue-800 selection:text-white">
    <section class="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div
        v-if="homeImages.hero"
        class="absolute inset-0 bg-cover bg-center opacity-30"
        :style="{ backgroundImage: `url(${homeImages.hero})` }"
      />
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-20 right-20 w-72 h-72 rounded-full bg-green-500 blur-3xl" />
        <div class="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-600 blur-3xl" />
      </div>

      <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 pb-12">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest uppercase mb-6 border border-white/20">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {{ t('brand.shortName') }}
          </div>

          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
            {{ t('home.heroTitle') }} <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-300">
              {{ t('brand.tagline') }}
            </span>
          </h1>

          
          <p class="text-base md:text-lg text-gray-300 mb-10 leading-relaxed font-medium border-l-4 border-green-500 pl-6">
            {{ t('brand.description') }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink
              :to="localePath('/iletisim')"
              class="px-8 py-4 bg-green-600 text-white font-bold text-sm uppercase tracking-wider rounded shadow-xl shadow-green-600/20 hover:bg-green-700 transition-all transform hover:-translate-y-1 text-center"
            >
              {{ t('home.heroCtaContact') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/urunler')"
              class="px-8 py-4 bg-white/10 text-white border border-white/30 font-bold text-sm uppercase tracking-wider rounded hover:bg-white/20 transition-all text-center"
            >
              {{ t('home.heroCtaProducts') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <div class="bg-gray-50 border-y border-gray-100 py-12">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="item in localizedWhyUs"
          :key="item.title"
          class="flex flex-col items-center text-center group"
        >
          <Icon
            :name="item.icon.replace('i-lucide-', 'lucide:')"
            class="w-10 h-10 text-gray-300 group-hover:text-blue-800 transition-colors mb-3"
          />
          <h4 class="font-bold text-gray-900 text-sm">
            {{ item.title }}
          </h4>
          <p class="text-xs text-gray-500 mt-1">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>

    <section class="py-20 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
          <div class="max-w-2xl">
            <span class="text-blue-800 font-bold tracking-widest uppercase text-sm mb-2 block">{{ t('home.productsBadge') }}</span>
            <h2 class="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              {{ t('home.productsTitle') }}
            </h2>
          </div>
          <NuxtLink
            :to="localePath('/urunler')"
            class="hidden md:flex items-center gap-2 font-bold text-gray-900 border-b-2 border-blue-800 pb-1 hover:text-blue-800 transition"
          >
            {{ t('home.productsAll') }}
            <Icon
              name="lucide:arrow-right"
              class="w-4 h-4"
            />
          </NuxtLink>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="category in localizedCategories"
            :key="category.slug"
            class="group bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 rounded-xl overflow-hidden"
          >
            <div class="h-44 overflow-hidden relative">
              <AppImg
                v-if="categoryHero(category.slug)"
                :src="categoryHero(category.slug)!"
                :alt="category.label"
                aspect="auto"
              />
              <ImagePlaceholder
                v-else
                :label="category.label"
                aspect="video"
              />
            </div>
            <div class="p-6">
              <h3 class="text-lg font-bold mb-2 group-hover:text-blue-800 transition-colors">
                {{ category.label }}
              </h3>
              <p class="text-gray-500 mb-4 leading-relaxed text-sm">
                {{ category.description }}
              </p>
              <ul class="space-y-1.5 mb-6">
                <li
                  v-for="product in category.products.slice(0, 2)"
                  :key="product.slug"
                  class="flex items-center text-sm text-gray-700"
                >
                  <Icon
                    name="lucide:check"
                    class="w-4 h-4 text-green-600 mr-2 shrink-0"
                  />
                  {{ product.label }}
                </li>
              </ul>
              <NuxtLink
                :to="localePath({ name: 'urunler-kategori', params: { kategori: category.slug } })"
                class="inline-block px-6 py-3 border border-gray-200 text-gray-900 font-bold text-xs uppercase tracking-wider rounded hover:bg-blue-900 hover:text-white transition-colors"
              >
                {{ t('common.readMore') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="bg-gray-50 border-y border-gray-100 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
          {{ t('home.referencesTitle') }}
        </p>
        <div class="grid sm:grid-cols-3 gap-6">
          <div
            v-for="(ref, refIndex) in localizedReferences"
            :key="ref.label"
            class="group relative rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-shadow"
          >
            <div class="h-40 overflow-hidden">
              <AppImg
                v-if="homeImages.references[refIndex]"
                :src="homeImages.references[refIndex]"
                :alt="ref.label"
                aspect="auto"
              />
              <ImagePlaceholder
                v-else
                :label="ref.label"
                aspect="video"
              />
            </div>
            <div class="p-4">
              <h4 class="font-bold text-gray-900 text-sm">
                {{ ref.label }}
              </h4>
              <p class="text-xs text-gray-500 mt-1">
                {{ ref.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <HomeGalleryPreview />

    <section class="py-20 bg-gray-900 text-white overflow-hidden relative">
      <div class="absolute top-0 right-0 w-1/3 h-full bg-green-600/10 transform skew-x-12 pointer-events-none" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div class="w-full md:w-1/2 relative">
          <div class="relative z-10 rounded-lg overflow-hidden border-4 border-gray-800 shadow-2xl h-72 md:h-96">
            <AppImg
              v-if="homeImages.corporate"
              :src="homeImages.corporate"
              :alt="t('brand.shortName')"
              aspect="auto"
            />
            <ImagePlaceholder
              v-else
              :label="t('brand.shortName')"
              aspect="hero"
            />
          </div>
        </div>

        <div class="w-full md:w-1/2 relative z-20">
          <span class="text-green-500 font-bold tracking-widest uppercase text-sm mb-3 block">{{ t('home.corporateBadge') }}</span>
          <h2 class="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {{ t('home.corporateTitle') }} <span class="text-green-500">{{ t('home.corporateTitleHighlight') }}</span> {{ t('home.corporateTitleEnd') }}
          </h2>
          <p class="text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
            {{ t('home.corporateBody') }}
          </p>

          <div class="grid grid-cols-2 gap-8">
            <div
              v-for="stat in localizedStats.slice(0, 2)"
              :key="stat.label"
            >
              <div class="text-3xl font-bold text-white mb-1">
                {{ stat.value }}
              </div>
              <p class="text-xs text-gray-500 uppercase tracking-widest">
                {{ stat.label }}
              </p>
            </div>
          </div>

          <NuxtLink
            :to="localePath({ name: 'kurumsal-slug', params: { slug: 'hakkimizda' } })"
            class="inline-flex items-center gap-2 mt-8 text-sm font-bold uppercase tracking-wide text-white hover:text-green-500 transition-colors"
          >
            {{ t('home.corporateLink') }}
            <Icon
              name="lucide:arrow-right"
              class="w-4 h-4"
            />
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50 border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-4 mb-12">
          <div class="h-1 w-10 bg-blue-800" />
          <div>
            <span class="text-blue-800 font-bold tracking-widest uppercase text-sm block">{{ t('home.servicesBadge') }}</span>
            <h2 class="text-3xl font-bold text-gray-900">
              {{ t('home.servicesTitle') }}
            </h2>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="service in localizedServices"
            :key="service.slug"
            class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-800 mb-4">
              <Icon
                :name="serviceIcons[service.slug] ?? 'mdi:cog'"
                class="w-6 h-6"
              />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">
              {{ service.label }}
            </h4>
            <p class="text-sm text-gray-500">
              {{ service.description }}
            </p>
            <NuxtLink
              :to="localePath({ name: 'hizmetler-slug', params: { slug: service.slug } })"
              class="inline-flex items-center gap-1 mt-4 text-xs font-bold uppercase tracking-wide text-blue-800 hover:text-blue-900"
            >
              {{ t('common.detail') }}
              <Icon
                name="lucide:arrow-right"
                class="w-3 h-3"
              />
            </NuxtLink>
          </div>

          <NuxtLink
            :to="localePath('/iletisim')"
            class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-gray-50"
          >
            <div class="bg-green-600 text-white rounded-full p-4 mb-4 group-hover:scale-110 transition-transform">
              <Icon
                name="lucide:phone-call"
                class="w-6 h-6"
              />
            </div>
            <h4 class="text-xl font-bold text-gray-900">
              {{ t('home.servicesCtaTitle') }}
            </h4>
            <p class="text-sm text-gray-500 mt-2">
              {{ t('home.servicesCtaBody') }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-blue-800 font-bold tracking-widest uppercase text-sm mb-2 block">{{ t('home.sectorsBadge') }}</span>
        <h2 class="text-3xl font-bold text-gray-900 mb-8">
          {{ t('home.sectorsTitle') }}
        </h2>
        <div class="flex flex-wrap justify-center gap-3">
          <span
            v-for="sector in localizedSectors"
            :key="sector.label"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-sm font-bold text-gray-700 hover:border-green-600 hover:text-green-700 transition-colors"
          >
            <Icon
              :name="sector.icon.replace('i-lucide-', 'lucide:')"
              class="w-4 h-4"
            />
            {{ sector.label }}
          </span>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-50 border-y border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <span class="text-blue-800 font-bold tracking-widest uppercase text-sm mb-2 block">{{ t('home.statsBadge') }}</span>
          <h2 class="text-3xl font-bold text-gray-900">
            {{ t('home.statsTitle') }}
          </h2>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div
            v-for="stat in localizedStats"
            :key="stat.label"
            class="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm"
          >
            <p class="text-3xl md:text-4xl font-black text-blue-800 mb-1">
              {{ stat.value }}
            </p>
            <p class="text-xs md:text-sm text-gray-500 font-medium">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span class="text-blue-800 font-bold tracking-widest uppercase text-sm mb-2 block">{{ t('home.blogBadge') }}</span>
            <h2 class="text-3xl font-bold text-gray-900">
              {{ t('home.blogTitle') }}
            </h2>
          </div>
          <NuxtLink
            :to="localePath('/blog')"
            class="hidden md:flex items-center gap-2 font-bold text-gray-900 border-b-2 border-blue-800 pb-1 hover:text-blue-800 transition"
          >
            {{ t('home.blogAll') }}
            <Icon
              name="lucide:arrow-right"
              class="w-4 h-4"
            />
          </NuxtLink>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <article
            v-for="post in latestPosts"
            :key="post.slug"
            class="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="h-44 overflow-hidden">
              <AppImg
                v-if="blogCover(post.slug)"
                :src="blogCover(post.slug)!"
                :alt="post.title"
                aspect="auto"
              />
              <ImagePlaceholder
                v-else
                :label="post.category"
              />
            </div>
            <div class="p-6">
              <span class="text-xs font-bold text-blue-800 uppercase tracking-widest">{{ post.category }}</span>
              <h3 class="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-800 transition-colors line-clamp-2">
                {{ post.title }}
              </h3>
              <p class="mt-2 text-sm text-gray-500 line-clamp-2">
                {{ post.excerpt }}
              </p>
              <NuxtLink
                :to="localePath({ name: 'blog-slug', params: { slug: post.slug } })"
                class="inline-flex items-center gap-1 mt-4 text-xs font-bold uppercase tracking-wide text-blue-800"
              >
                {{ t('common.read') }}
                <Icon
                  name="lucide:arrow-right"
                  class="w-3 h-3"
                />
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="py-20 md:py-24 bg-white text-center border-t border-gray-100">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {{ t('home.ctaTitle') }}
        </h2>
        <p class="text-gray-600 mb-10 text-base md:text-lg">
          {{ t('home.ctaBody') }}
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink
            :to="localePath('/iletisim')"
            class="px-10 py-4 bg-blue-900 text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-green-600 transition-colors shadow-xl"
          >
            {{ t('nav.quote') }}
          </NuxtLink>
          <a
            :href="`tel:${brand.phone.replace(/\s/g, '')}`"
            class="px-10 py-4 bg-white text-gray-900 border border-gray-200 font-bold text-sm uppercase tracking-widest rounded hover:border-blue-800 hover:text-blue-800 transition-colors flex items-center justify-center gap-2"
          >
            <Icon
              name="mdi:phone"
              class="w-5 h-5"
            />
            {{ t('common.callUs') }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
