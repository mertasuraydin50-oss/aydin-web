<script setup lang="ts">
import { ctaNavigation } from '~/constants/navigation'

const { t } = useI18n()
const {
  localizedCategories,
  localizedServices,
  localizedCorporateLinks,
  localePath
} = useLocalizedContent()

const mobileMenuOpen = ref(false)
const mobileSection = ref<'products' | 'services' | 'corporate' | null>(null)

const productIcons: Record<string, string> = {
  'paslanmaz-celik-tanklar': 'mdi:cylinder',
  'reaktorler-karistiricilar': 'mdi:flask',
  'filtreler-etuv-sistemleri': 'mdi:filter',
  'ozel-tasarim-makineler': 'mdi:cog'
}

const serviceIcons: Record<string, string> = {
  'proje-tasarim-muhendislik': 'mdi:pencil-ruler',
  'uretim-imalat': 'mdi:factory',
  'montaj-tesis-kurulumu': 'mdi:hard-hat',
  'bakim-servis': 'mdi:wrench',
  'otomasyon-proses-entegrasyonu': 'mdi:chip'
}

watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
  mobileSection.value = null
})
</script>

<template>
  <header class="bg-white border-b border-gray-100 sticky top-0 z-50 font-montserrat">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-24">
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink
            :to="localePath('/')"
            class="group flex items-center"
          >
            <img
              src="/logo.jpeg"
              alt="Aydınox Proses Makine"
              class="w-auto h-16 md:h-20"
            >
          </NuxtLink>
        </div>

        <div class="hidden lg:flex items-center space-x-6">
          <div class="relative group h-24 flex items-center">
            <button class="flex items-center gap-1 text-sm font-bold text-gray-700 uppercase tracking-wide group-hover:text-blue-800 transition-colors py-8 outline-none">
              {{ t('nav.products') }}
              <Icon
                name="lucide:chevron-down"
                class="w-4 h-4 transition-transform group-hover:rotate-180"
              />
            </button>

            <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-[520px] bg-white shadow-2xl border-t-4 border-blue-800 rounded-b-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-50 overflow-hidden">
              <div class="grid grid-cols-1 gap-1 p-3">
                <NuxtLink
                  v-for="category in localizedCategories"
                  :key="category.slug"
                  :to="localePath({ name: 'urunler-kategori', params: { kategori: category.slug } })"
                  class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition group/item"
                >
                  <div class="p-2 bg-blue-50 text-blue-800 rounded group-hover/item:bg-blue-800 group-hover/item:text-white transition">
                    <Icon
                      :name="productIcons[category.slug] ?? 'mdi:package-variant'"
                      class="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 group-hover/item:text-blue-800">
                      {{ category.label }}
                    </h4>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ category.description }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
              <div class="bg-gray-50 p-3 text-center border-t border-gray-100">
                <NuxtLink
                  :to="localePath('/urunler')"
                  class="text-xs font-bold text-blue-800 hover:text-blue-900 uppercase tracking-wide flex items-center justify-center gap-1"
                >
                  {{ t('nav.allProducts') }}
                  <Icon
                    name="lucide:arrow-right"
                    class="w-3 h-3"
                  />
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="relative group h-24 flex items-center">
            <button class="flex items-center gap-1 text-sm font-bold text-gray-700 uppercase tracking-wide group-hover:text-blue-800 transition-colors py-8 outline-none">
              {{ t('nav.services') }}
              <Icon
                name="lucide:chevron-down"
                class="w-4 h-4 transition-transform group-hover:rotate-180"
              />
            </button>

            <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-[560px] bg-white shadow-2xl border-t-4 border-blue-800 rounded-b-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-50 overflow-hidden">
              <div class="grid grid-cols-2 gap-1 p-3">
                <NuxtLink
                  v-for="service in localizedServices"
                  :key="service.slug"
                  :to="localePath({ name: 'hizmetler-slug', params: { slug: service.slug } })"
                  class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition group/item"
                >
                  <div class="p-2 bg-blue-50 text-blue-800 rounded group-hover/item:bg-blue-800 group-hover/item:text-white transition">
                    <Icon
                      :name="serviceIcons[service.slug] ?? 'mdi:cog'"
                      class="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 group-hover/item:text-blue-800">
                      {{ service.label }}
                    </h4>
                    <p class="text-xs text-gray-500 mt-1 line-clamp-2">
                      {{ service.description }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
              <div class="bg-gray-50 p-3 text-center border-t border-gray-100">
                <NuxtLink
                  :to="localePath('/hizmetler')"
                  class="text-xs font-bold text-blue-800 hover:text-blue-900 uppercase tracking-wide flex items-center justify-center gap-1"
                >
                  {{ t('nav.allServices') }}
                  <Icon
                    name="lucide:arrow-right"
                    class="w-3 h-3"
                  />
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="relative group h-24 flex items-center">
            <button class="flex items-center gap-1 text-sm font-bold text-gray-700 uppercase tracking-wide group-hover:text-blue-800 transition-colors py-8 outline-none">
              {{ t('nav.corporate') }}
              <Icon
                name="lucide:chevron-down"
                class="w-4 h-4 transition-transform group-hover:rotate-180"
              />
            </button>

            <div class="absolute top-full left-0 w-56 bg-white shadow-2xl border-t-4 border-blue-800 rounded-b-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-50 overflow-hidden py-2">
              <NuxtLink
                v-for="link in localizedCorporateLinks"
                :key="link.to"
                :to="link.to"
                class="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-50 transition"
              >
                {{ link.label }}
              </NuxtLink>
            </div>
          </div>

          <NuxtLink
            :to="localePath('/galeri')"
            class="text-sm font-bold text-gray-700 uppercase tracking-wide hover:text-blue-800 transition-colors"
          >
            {{ t('nav.gallery') }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/blog')"
            class="text-sm font-bold text-gray-700 uppercase tracking-wide hover:text-blue-800 transition-colors"
          >
            {{ t('nav.blog') }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/iletisim')"
            class="text-sm font-bold text-gray-700 uppercase tracking-wide hover:text-blue-800 transition-colors"
          >
            {{ t('nav.contact') }}
          </NuxtLink>

          <LanguageSwitcher />

          <SiteSearch variant="icon" />

          <NuxtLink
            :to="localePath(ctaNavigation.to)"
            class="ml-2 px-6 py-3 bg-gray-900 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-800/30 transform hover:-translate-y-0.5"
          >
            {{ t('nav.quote') }}
          </NuxtLink>
        </div>

        <div class="lg:hidden flex items-center gap-3">
          <SiteSearch variant="icon" />
          <LanguageSwitcher />
          <button
            class="text-gray-900 hover:text-blue-800 transition p-2"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <Icon
              :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'"
              class="w-8 h-8"
            />
          </button>
        </div>
      </div>
    </nav>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[calc(100vh-6rem)] overflow-y-auto"
      >
        <div class="px-4 py-6 space-y-1">
          <div class="pb-2 mb-2 border-b border-gray-100">
            <button
              class="w-full flex items-center justify-between text-xs font-bold text-blue-800 uppercase tracking-widest pl-3 py-2"
              @click="mobileSection = mobileSection === 'products' ? null : 'products'"
            >
              {{ t('nav.products') }}
              <Icon
                name="lucide:chevron-down"
                class="w-4 h-4 transition-transform"
                :class="mobileSection === 'products' ? 'rotate-180' : ''"
              />
            </button>
            <div
              v-if="mobileSection === 'products'"
              class="mt-2 space-y-1"
            >
              <NuxtLink
                v-for="category in localizedCategories"
                :key="category.slug"
                :to="localePath({ name: 'urunler-kategori', params: { kategori: category.slug } })"
                class="block pl-3 py-2 text-base font-medium text-gray-600 hover:text-blue-800 hover:bg-gray-50 rounded"
                @click="mobileMenuOpen = false"
              >
                {{ category.label }}
              </NuxtLink>
            </div>
          </div>

          <div class="pb-2 mb-2 border-b border-gray-100">
            <button
              class="w-full flex items-center justify-between text-xs font-bold text-blue-800 uppercase tracking-widest pl-3 py-2"
              @click="mobileSection = mobileSection === 'services' ? null : 'services'"
            >
              {{ t('nav.services') }}
              <Icon
                name="lucide:chevron-down"
                class="w-4 h-4 transition-transform"
                :class="mobileSection === 'services' ? 'rotate-180' : ''"
              />
            </button>
            <div
              v-if="mobileSection === 'services'"
              class="mt-2 space-y-1"
            >
              <NuxtLink
                v-for="service in localizedServices"
                :key="service.slug"
                :to="localePath({ name: 'hizmetler-slug', params: { slug: service.slug } })"
                class="block pl-3 py-2 text-base font-medium text-gray-600 hover:text-blue-800 hover:bg-gray-50 rounded"
                @click="mobileMenuOpen = false"
              >
                {{ service.label }}
              </NuxtLink>
            </div>
          </div>

          <div class="pb-2 mb-2 border-b border-gray-100">
            <button
              class="w-full flex items-center justify-between text-xs font-bold text-blue-800 uppercase tracking-widest pl-3 py-2"
              @click="mobileSection = mobileSection === 'corporate' ? null : 'corporate'"
            >
              {{ t('nav.corporate') }}
              <Icon
                name="lucide:chevron-down"
                class="w-4 h-4 transition-transform"
                :class="mobileSection === 'corporate' ? 'rotate-180' : ''"
              />
            </button>
            <div
              v-if="mobileSection === 'corporate'"
              class="mt-2 space-y-1"
            >
              <NuxtLink
                v-for="link in localizedCorporateLinks"
                :key="link.to"
                :to="link.to"
                class="block pl-3 py-2 text-base font-medium text-gray-600 hover:text-blue-800 hover:bg-gray-50 rounded"
                @click="mobileMenuOpen = false"
              >
                {{ link.label }}
              </NuxtLink>
            </div>
          </div>

          <NuxtLink
            :to="localePath('/galeri')"
            class="block px-3 py-3 text-lg font-bold text-gray-900 hover:text-blue-800"
            @click="mobileMenuOpen = false"
          >
            {{ t('nav.gallery') }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/blog')"
            class="block px-3 py-3 text-lg font-bold text-gray-900 hover:text-blue-800"
            @click="mobileMenuOpen = false"
          >
            {{ t('nav.blog') }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/iletisim')"
            class="block px-3 py-3 text-lg font-bold text-gray-900 hover:text-blue-800"
            @click="mobileMenuOpen = false"
          >
            {{ t('nav.contact') }}
          </NuxtLink>

          <div class="pt-4 mt-4 border-t border-gray-100">
            <NuxtLink
              :to="localePath(ctaNavigation.to)"
              class="block w-full text-center px-6 py-4 bg-blue-800 text-white font-bold uppercase rounded shadow-lg"
              @click="mobileMenuOpen = false"
            >
              {{ t('nav.quoteNow') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
