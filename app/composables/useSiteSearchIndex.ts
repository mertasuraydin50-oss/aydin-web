import { blogPath } from '~/constants/blog'
import { corporateLinks } from '~/constants/navigation'
import { productPath } from '~/constants/products'
import { servicePath } from '~/constants/services'
import { searchSite, type SiteSearchItem } from '~/utils/siteSearch'

export function useSiteSearchIndex() {
  const { t } = useI18n()
  const {
    localizedCategories,
    localizedServices,
    localizedPosts,
    localizedFaq
  } = useLocalizedContent()

  const corporateNavKeys: Record<string, string> = {
    '/kurumsal/hakkimizda': 'about',
    '/kurumsal/misyon-vizyon': 'mission',
    '/kurumsal/kalite-politikasi': 'quality',
    '/kurumsal/belgeler': 'documents',
    '/kurumsal/insan-kaynaklari': 'careers',
    '/kurumsal/kvkk': 'kvkk',
    '/sss': 'faq'
  }

  const index = computed<SiteSearchItem[]>(() => {
    const items: SiteSearchItem[] = []

    items.push(
      {
        id: 'page-home',
        kind: 'page',
        title: t('nav.home'),
        description: t('brand.tagline'),
        to: '/',
        haystack: `${t('nav.home')} ${t('brand.name')} ${t('brand.tagline')}`
      },
      {
        id: 'page-products',
        kind: 'page',
        title: t('nav.products'),
        description: t('nav.allProducts'),
        to: '/urunler',
        haystack: `${t('nav.products')} ${t('nav.allProducts')} urun tank reaktor`
      },
      {
        id: 'page-services',
        kind: 'page',
        title: t('nav.services'),
        description: t('nav.allServices'),
        to: '/hizmetler',
        haystack: `${t('nav.services')} ${t('nav.allServices')} hizmet muhendislik montaj`
      },
      {
        id: 'page-gallery',
        kind: 'page',
        title: t('nav.gallery'),
        description: t('nav.gallery'),
        to: '/galeri',
        haystack: `${t('nav.gallery')} galeri foto`
      },
      {
        id: 'page-blog',
        kind: 'page',
        title: t('nav.blog'),
        description: t('nav.blog'),
        to: '/blog',
        haystack: `${t('nav.blog')} yazı makale`
      },
      {
        id: 'page-faq',
        kind: 'page',
        title: t('nav.faq'),
        description: t('faqPage.description'),
        to: '/sss',
        haystack: `${t('nav.faq')} ${t('faqPage.description')} sss soru`
      },
      {
        id: 'page-contact',
        kind: 'page',
        title: t('nav.contact'),
        description: t('nav.contact'),
        to: '/iletisim',
        haystack: `${t('nav.contact')} telefon eposta adres`
      },
      {
        id: 'page-quote',
        kind: 'page',
        title: t('nav.quote'),
        description: t('nav.quoteNow'),
        to: '/teklif-al',
        haystack: `${t('nav.quote')} teklif proje`
      }
    )

    for (const category of localizedCategories.value) {
      items.push({
        id: `category-${category.slug}`,
        kind: 'category',
        title: category.label,
        description: category.description,
        to: productPath(category.slug),
        haystack: `${category.label} ${category.description}`
      })

      for (const product of category.products) {
        items.push({
          id: `product-${product.slug}`,
          kind: 'product',
          title: product.label,
          description: product.description ?? category.label,
          to: productPath(category.slug, product.slug),
          haystack: `${product.label} ${product.description ?? ''} ${product.body ?? ''} ${(product.features ?? []).join(' ')} ${category.label}`
        })
      }
    }

    for (const service of localizedServices.value) {
      items.push({
        id: `service-${service.slug}`,
        kind: 'service',
        title: service.label,
        description: service.description,
        to: servicePath(service.slug),
        haystack: `${service.label} ${service.description} ${service.body} ${service.features.join(' ')}`
      })
    }

    for (const link of corporateLinks) {
      items.push({
        id: `corp-${link.to}`,
        kind: 'page',
        title: t(`nav.${corporateNavKeys[link.to] ?? 'about'}`),
        description: t('nav.corporate'),
        to: link.to,
        haystack: `${t(`nav.${corporateNavKeys[link.to] ?? 'about'}`)} ${t('nav.corporate')}`
      })
    }

    for (const post of localizedPosts.value) {
      items.push({
        id: `blog-${post.slug}`,
        kind: 'blog',
        title: post.title,
        description: post.excerpt,
        to: blogPath(post.slug),
        haystack: `${post.title} ${post.excerpt} ${post.category} ${(post.keywords ?? []).join(' ')} ${(post.tags ?? []).join(' ')}`
      })
    }

    for (const category of localizedFaq.value) {
      for (const item of category.items) {
        items.push({
          id: `faq-${category.id}-${item.q.slice(0, 24)}`,
          kind: 'page',
          title: item.q,
          description: item.a,
          to: '/sss',
          haystack: `${item.q} ${item.a} ${category.title} sss`
        })
      }
    }

    return items
  })

  function query(term: string, limit = 8) {
    return searchSite(index.value, term, limit)
  }

  return { index, query }
}
