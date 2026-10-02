<script setup lang="ts">
import { brand } from '~/constants/site'

const { t } = useI18n()
const {
  localizedCategories,
  localizedServices,
  localizedCorporateLinks,
  localePath
} = useLocalizedContent()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-black text-gray-400 font-montserrat border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div class="space-y-6">
          <NuxtLink
            :to="localePath('/')"
            class="flex items-center"
          >
            <img
              src="/logo.jpeg"
              alt="Aydınox Proses Makine"
              class="w-auto h-10 brightness-0 invert"
            >
          </NuxtLink>

          <p class="text-sm leading-relaxed text-gray-500">
            {{ t('brand.description') }}
          </p>
        </div>

        <div>
          <h3 class="text-white font-bold text-lg mb-6 tracking-wide">
            {{ t('footer.products') }}
          </h3>
          <ul class="space-y-3">
            <li
              v-for="category in localizedCategories"
              :key="category.slug"
            >
              <NuxtLink
                :to="localePath({ name: 'urunler-kategori', params: { kategori: category.slug } })"
                class="text-sm hover:text-blue-800 hover:pl-2 transition-all duration-300 flex items-center gap-2"
              >
                <Icon
                  name="mdi:chevron-right"
                  class="w-3 h-3 text-blue-800"
                />
                {{ category.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-white font-bold text-lg mb-6 tracking-wide">
            {{ t('footer.services') }}
          </h3>
          <ul class="space-y-3">
            <li
              v-for="service in localizedServices"
              :key="service.slug"
            >
              <NuxtLink
                :to="localePath({ name: 'hizmetler-slug', params: { slug: service.slug } })"
                class="text-sm hover:text-blue-800 hover:pl-2 transition-all duration-300 flex items-center gap-2"
              >
                <Icon
                  name="mdi:chevron-right"
                  class="w-3 h-3 text-blue-800"
                />
                {{ service.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-white font-bold text-lg mb-6 tracking-wide">
            {{ t('footer.contactUs') }}
          </h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <Icon
                name="mdi:map-marker"
                class="w-5 h-5 text-blue-800 mt-0.5 shrink-0"
              />
              <span class="text-sm leading-relaxed">{{ brand.address }}</span>
            </li>
            <li class="flex items-center gap-3">
              <Icon
                name="mdi:phone"
                class="w-5 h-5 text-blue-800 shrink-0"
              />
              <a
                :href="`tel:${brand.phone.replace(/\s/g, '')}`"
                class="text-sm hover:text-white transition-colors font-bold tracking-wide"
              >
                {{ brand.phone }}
              </a>
            </li>
            <li class="flex items-center gap-3">
              <Icon
                name="mdi:email"
                class="w-5 h-5 text-blue-800 shrink-0"
              />
              <a
                :href="`mailto:${brand.email}`"
                class="text-sm hover:text-white transition-colors"
              >
                {{ brand.email }}
              </a>
            </li>
          </ul>

          <div class="mt-6 pt-6 border-t border-gray-800">
            <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              {{ t('footer.corporate') }}
            </p>
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  :to="localePath('/galeri')"
                  class="text-sm hover:text-white transition-colors"
                >
                  {{ t('nav.gallery') }}
                </NuxtLink>
              </li>
              <li
                v-for="link in localizedCorporateLinks"
                :key="link.to"
              >
                <NuxtLink
                  :to="link.to"
                  class="text-sm hover:text-white transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-gray-600 text-center md:text-left">
          © {{ currentYear }} {{ t('brand.name') }}. {{ t('footer.rights') }}
        </p>

        <div class="flex items-center gap-4">
          <a
            href="#"
            class="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-800 hover:text-white transition-all duration-300 group"
          >
            <Icon
              name="mdi:instagram"
              class="w-5 h-5 group-hover:scale-110 transition-transform"
            />
          </a>
          <a
            href="#"
            class="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group"
          >
            <Icon
              name="mdi:facebook"
              class="w-5 h-5 group-hover:scale-110 transition-transform"
            />
          </a>
          <a
            href="#"
            class="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-900 hover:text-white transition-all duration-300 group"
          >
            <Icon
              name="mdi:youtube"
              class="w-5 h-5 group-hover:scale-110 transition-transform"
            />
          </a>
          <a
            href="#"
            class="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 group border border-gray-800 hover:border-white"
          >
            <Icon
              name="mdi:linkedin"
              class="w-5 h-5 group-hover:scale-110 transition-transform"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
