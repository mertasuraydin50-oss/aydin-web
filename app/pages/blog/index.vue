<script setup lang="ts">
import { brand } from '~/constants/site'
import { blogCover, pageHero } from '~/constants/images'

const { t } = useI18n()
const { localizedPosts, localePath } = useLocalizedContent()

useSeoMeta({
  title: () => `${t('blog.title')} | ${brand.shortName}`,
  description: () => t('blog.description')
})
</script>

<template>
  <div class="font-montserrat text-gray-900 bg-white">
    <PageHero
      :badge="t('blog.badge')"
      :title="t('blog.title')"
      :description="t('blog.description')"
      :image="pageHero.blog"
      :image-alt="t('blog.title')"
    />

    <section class="py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="post in localizedPosts"
          :key="post.slug"
          class="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
        >
          <NuxtLink :to="localePath({ name: 'blog-slug', params: { slug: post.slug } })">
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
              <h2 class="mt-2 text-lg font-bold group-hover:text-blue-800 transition-colors line-clamp-2">
                {{ post.title }}
              </h2>
              <p class="mt-2 text-sm text-gray-500 line-clamp-2">
                {{ post.excerpt }}
              </p>
              <p class="mt-3 text-xs text-gray-400">
                {{ post.date }}
              </p>
            </div>
          </NuxtLink>
        </article>
      </div>
    </section>

    <PageCta />
  </div>
</template>

<style scoped>
.font-montserrat { font-family: 'Montserrat', sans-serif; }
</style>
