<script setup lang="ts">
import type { ProductItem } from '~/constants/products'
import type { ProductLandingContent } from '~/content/landings'
import { productGallery, productHero } from '~/constants/images'

const props = defineProps<{
  product: ProductItem
  categoryId: string
  categoryLabel: string
  page: ProductLandingContent
  related: ProductItem[]
}>()

const { t } = useI18n()
const { localePath } = useLocalizedContent()

const hero = computed(() => productHero(props.product.slug))
const gallery = computed(() => productGallery(props.product.slug, 8))
</script>

<template>
  <div class="font-montserrat text-gray-900 bg-white">
    <PageHero
      :badge="t('products.detailBadge')"
      :title="product.label"
      :description="page.heroDescription"
      :image="hero"
      :image-alt="product.label"
    >
      <nav class="mt-6 text-sm flex flex-wrap gap-2" :class="hero ? 'text-white/70' : 'text-gray-500'">
        <NuxtLink
          :to="localePath('/urunler')"
          :class="hero ? 'hover:text-white' : 'hover:text-blue-800'"
        >
          {{ t('products.breadcrumb') }}
        </NuxtLink>
        <span>/</span>
        <NuxtLink
          :to="localePath({ name: 'urunler-kategori', params: { kategori: categoryId } })"
          :class="hero ? 'hover:text-white' : 'hover:text-blue-800'"
        >
          {{ categoryLabel }}
        </NuxtLink>
        <span>/</span>
        <span :class="hero ? 'text-white font-medium' : 'text-gray-900 font-medium'">{{ product.label }}</span>
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
    </PageHero>

    <section class="py-14 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
        <div class="lg:col-span-7">
          <PageImageGallery
            v-if="gallery.length"
            :images="gallery"
            :alt="product.label"
            class="mb-8"
          />
          <div
            v-else
            class="aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 mb-8"
          >
            <ImagePlaceholder
              :label="product.label"
              aspect="video"
            />
          </div>
          <div class="space-y-4">
            <p
              v-for="(para, i) in page.intro"
              :key="i"
              class="text-gray-600 leading-relaxed"
            >
              {{ para }}
            </p>
          </div>
        </div>

        <aside class="lg:col-span-5">
          <div class="lg:sticky lg:top-28 space-y-6">
            <ul class="space-y-3">
              <li
                v-for="item in page.highlights"
                :key="item.title"
                class="flex gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
              >
                <Icon
                  :name="item.icon.replace('lucide:', 'lucide:')"
                  class="w-5 h-5 text-blue-800 shrink-0 mt-0.5"
                />
                <div>
                  <p class="font-bold text-sm text-gray-900">
                    {{ item.title }}
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ item.text }}
                  </p>
                </div>
              </li>
            </ul>
            <NuxtLink
              :to="localePath('/iletisim')"
              class="block w-full text-center px-8 py-3 bg-blue-800 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-blue-900 transition-colors"
            >
              {{ t('nav.quote') }}
            </NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <section class="py-14 bg-gray-50 border-y border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold mb-2">
          {{ page.specsTitle }}
        </h2>
        <p class="text-gray-500 mb-8">
          {{ page.specsLead }}
        </p>
        <div class="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table class="w-full text-sm">
            <tbody>
              <tr
                v-for="(row, i) in page.specs"
                :key="i"
                class="border-b border-gray-100 last:border-0"
              >
                <td class="px-5 py-3 font-bold text-gray-900 w-1/3">
                  {{ row[0] }}
                </td>
                <td class="px-5 py-3 text-gray-600">
                  {{ row[1] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="py-14 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold mb-2">
          {{ page.usesTitle }}
        </h2>
        <p class="text-gray-500 mb-8">
          {{ page.usesLead }}
        </p>
        <div class="grid sm:grid-cols-3 gap-6">
          <div
            v-for="use in page.uses"
            :key="use.title"
            class="p-6 rounded-xl border border-gray-100 bg-white hover:border-blue-200 transition-colors"
          >
            <h3 class="font-bold text-gray-900 mb-2">
              {{ use.title }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ use.text }}
            </p>
          </div>
        </div>
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
      v-if="related.length"
      class="py-12 border-t border-gray-100"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-lg font-bold mb-6">
          {{ t('products.related') }}
        </h3>
        <div class="grid sm:grid-cols-3 gap-4">
          <NuxtLink
            v-for="item in related"
            :key="item.slug"
            :to="localePath({ name: 'urunler-kategori-slug', params: { kategori: categoryId, slug: item.slug } })"
            class="p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 transition-colors"
          >
            <p class="font-bold text-sm">
              {{ item.label }}
            </p>
            <p class="text-xs text-gray-500 mt-1">
              {{ item.description }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <PageCta :title="t('products.quoteFor', { name: product.label })" />
  </div>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
summary::-webkit-details-marker { display: none; }
</style>
