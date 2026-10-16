<script setup lang="ts">
import { findCorporate } from '~/content/load'
import { brand } from '~/constants/site'
import { corporateImage, productionGallery } from '~/constants/images'
import { corporateSlugs, i18nSlugParams } from '~/constants/slugs'

const route = useRoute()
const { t, locale } = useI18n()
const { localePath, localizedCorporatePages, getLocalizedCorporate } = useLocalizedContent()

const slugParam = route.params.slug as string
const found = findCorporate(slugParam)

if (!found) {
  throw createError({ statusCode: 404, statusMessage: t('common.notFound') })
}

const pageId = found.id
const layout = found.shared.layout ?? 'about'

await useSyncedI18nParams(i18nSlugParams(corporateSlugs, pageId))

const page = computed(() => getLocalizedCorporate(slugParam)!)
const cover = computed(() => corporateImage(pageId))
const productionPhotos = computed(() => productionGallery(6))
const dateLocale = computed(() => {
  if (locale.value === 'ar') return 'ar-SA'
  if (locale.value === 'en') return 'en-GB'
  return 'tr-TR'
})

function formatCertDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString(dateLocale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

useSeoMeta({
  title: () => `${page.value.title} | ${brand.shortName}`,
  description: () => page.value.description
})
</script>

<template>
  <div class="font-montserrat text-gray-900 bg-white">
    <PageHero
      :badge="page.badge"
      :title="page.title"
      :description="page.description"
      :image="layout !== 'legal' ? cover : undefined"
      :image-alt="page.title"
    />

    <!-- About layout -->
    <template v-if="layout === 'about'">
      <section class="py-16 md:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div class="rounded-xl overflow-hidden border border-gray-100 h-72 lg:h-[28rem] shadow-lg">
            <AppImg
              v-if="cover"
              :src="cover"
              :alt="page.title"
              aspect="auto"
            />
            <ImagePlaceholder
              v-else
              :label="page.title"
              aspect="hero"
            />
          </div>
          <div class="space-y-8">
            <div
              v-for="section in page.sections"
              :key="section.heading"
            >
              <h2 class="text-xl font-bold mb-3">
                {{ section.heading }}
              </h2>
              <p class="text-gray-600 leading-relaxed">
                {{ section.body }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="py-16 bg-gray-50 border-t border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-bold mb-8 text-center">
            {{ t('corporate.productionTitle') }}
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div
              v-for="(photo, i) in productionPhotos"
              :key="photo.src"
              class="aspect-square rounded-lg overflow-hidden border border-gray-100 bg-gray-50"
            >
              <AppImg
                :src="photo.src"
                :alt="photo.title || t('corporate.productionLabel', { n: i + 1 })"
                aspect="auto"
              />
            </div>
            <div
              v-for="i in Math.max(0, 6 - productionPhotos.length)"
              :key="`placeholder-${i}`"
              class="aspect-square rounded-lg overflow-hidden border border-gray-100"
            >
              <ImagePlaceholder
                :label="t('corporate.productionLabel', { n: productionPhotos.length + i })"
                aspect="square"
              />
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- Mission layout -->
    <template v-else-if="layout === 'mission'">
      <section class="py-16 md:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <div
            v-for="section in page.sections"
            :key="section.heading"
            class="p-8 rounded-xl bg-gray-50 border border-gray-100"
          >
            <h2 class="text-2xl font-bold mb-4 text-blue-800">
              {{ section.heading }}
            </h2>
            <p class="text-gray-600 leading-relaxed">
              {{ section.body }}
            </p>
          </div>
        </div>
      </section>
    </template>

    <!-- Quality layout -->
    <template v-else-if="layout === 'quality'">
      <section class="py-16 md:py-20">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div
            v-for="section in page.sections"
            :key="section.heading"
            class="p-6 rounded-xl border border-gray-100 bg-white shadow-sm"
          >
            <h2 class="text-xl font-bold mb-3 flex items-center gap-2">
              <Icon
                name="lucide:badge-check"
                class="w-5 h-5 text-green-600"
              />
              {{ section.heading }}
            </h2>
            <p class="text-gray-600 leading-relaxed">
              {{ section.body }}
            </p>
          </div>
        </div>
      </section>
    </template>

    <!-- Documents layout -->
    <template v-else-if="layout === 'documents'">
      <section class="py-16 md:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-bold mb-8 text-center">
            {{ t('corporatePage.certificatesTitle') }}
          </h2>
          <div class="grid sm:grid-cols-2 gap-6 mb-10">
            <article
              v-for="certificate in page.certificates"
              :key="certificate.id"
              class="rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm flex flex-col"
            >
              <a
                :href="page.certificatePdf"
                target="_blank"
                rel="noopener noreferrer"
                class="block group"
              >
                <AppImg
                  :src="certificate.image"
                  :alt="`${certificate.standard} — ${certificate.subtitle}`"
                  aspect="video"
                />
              </a>
              <div class="p-5 flex-1 flex flex-col gap-2">
                <p class="text-lg font-bold text-blue-800">
                  {{ certificate.standard }}
                </p>
                <p class="text-sm text-gray-700 font-medium">
                  {{ certificate.subtitle }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ t('corporatePage.certificateNo') }}: {{ certificate.certificateNo }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ t('corporatePage.validUntil') }}: {{ formatCertDate(certificate.expires) }}
                </p>
                <a
                  v-if="page.certificatePdf"
                  :href="page.certificatePdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-blue-800 hover:text-blue-900"
                >
                  {{ t('corporatePage.viewPdf') }}
                  <Icon
                    name="lucide:external-link"
                    class="w-3 h-3"
                  />
                </a>
              </div>
            </article>
          </div>
          <div
            v-if="page.certificatePdf"
            class="mb-12 text-center"
          >
            <a
              :href="page.certificatePdf"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 bg-blue-800 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-blue-900 transition-colors"
            >
              <Icon
                name="lucide:download"
                class="w-4 h-4"
              />
              {{ t('corporatePage.downloadAllCertificates') }}
            </a>
          </div>
          <div
            v-for="section in page.sections"
            :key="section.heading"
            class="max-w-3xl mx-auto mb-6"
          >
            <h3 class="text-lg font-bold mb-2">
              {{ section.heading }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ section.body }}
            </p>
          </div>
        </div>
      </section>
    </template>

    <!-- Careers layout -->
    <template v-else-if="layout === 'careers'">
      <section class="py-16 md:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            v-for="section in page.sections"
            :key="section.heading"
            class="mb-10"
          >
            <h2 class="text-2xl font-bold mb-4">
              {{ section.heading }}
            </h2>
            <p class="text-gray-600 leading-relaxed max-w-3xl">
              {{ section.body }}
            </p>
          </div>
          <div class="mt-8 p-8 rounded-xl bg-blue-50 border border-blue-100 text-center">
            <h3 class="text-xl font-bold mb-2">
              {{ t('corporatePage.applyTitle') }}
            </h3>
            <p class="text-gray-600 mb-4">
              {{ t('corporatePage.applyBody') }}
            </p>
            <a
              :href="`mailto:${brand.email}`"
              class="inline-block px-8 py-3 bg-blue-800 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-blue-900 transition-colors"
            >
              {{ brand.email }}
            </a>
          </div>
        </div>
      </section>
    </template>

    <!-- Legal layout (KVKK) -->
    <template v-else-if="layout === 'legal'">
      <section class="py-16 md:py-20">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div
            v-for="section in page.sections"
            :key="section.heading"
          >
            <h2 class="text-xl font-bold mb-3">
              {{ section.heading }}
            </h2>
            <p class="text-gray-600 leading-relaxed whitespace-pre-line">
              {{ section.body }}
            </p>
          </div>
        </div>
      </section>
    </template>

    <!-- Default fallback -->
    <template v-else>
      <section class="py-16 md:py-20">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div
            v-for="section in page.sections"
            :key="section.heading"
          >
            <h2 class="text-xl font-bold mb-3">
              {{ section.heading }}
            </h2>
            <p class="text-gray-600 leading-relaxed">
              {{ section.body }}
            </p>
          </div>
        </div>
      </section>
    </template>

    <section class="py-12 border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          {{ t('corporate.sectionTitle') }}
        </p>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="link in localizedCorporatePages.filter(p => p.slug !== pageId)"
            :key="link.slug"
            :to="localePath({ name: 'kurumsal-slug', params: { slug: link.slug } })"
            class="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium hover:border-blue-800 hover:text-blue-800 transition-colors"
          >
            {{ link.title }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <PageCta />
  </div>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
</style>
