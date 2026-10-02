import {
  blogRecords,
  catalogRecords,
  corporateRecords,
  serviceRecords
} from '~/content/load'
import {
  blogLoc,
  corporateLoc,
  productLoc,
  serviceLoc,
  type AppLocale
} from '~/constants/slugs'

const LOCALES: AppLocale[] = ['tr', 'en']

export default defineSitemapEventHandler(() => {
  const urls: {
    loc: string
    lastmod?: string
    changefreq?: 'weekly' | 'monthly'
    priority?: 0.6 | 0.7 | 0.8
  }[] = []

  function push(
    loc: string,
    extra: { lastmod?: string, changefreq?: 'weekly' | 'monthly', priority?: 0.6 | 0.7 | 0.8 }
  ) {
    urls.push({ loc, ...extra })
  }

  for (const locale of LOCALES) {
    for (const post of blogRecords) {
      push(blogLoc(post.id, locale), {
        lastmod: post.shared.date,
        changefreq: 'weekly',
        priority: 0.8
      })
    }

    for (const category of catalogRecords) {
      push(productLoc(category.id, undefined, locale), {
        changefreq: 'weekly',
        priority: 0.8
      })

      for (const product of category.products) {
        push(productLoc(category.id, product.id, locale), {
          changefreq: 'weekly',
          priority: 0.8
        })
      }
    }

    for (const service of serviceRecords) {
      push(serviceLoc(service.id, locale), {
        changefreq: 'monthly',
        priority: 0.7
      })
    }

    for (const page of corporateRecords) {
      push(corporateLoc(page.id, locale), {
        changefreq: 'monthly',
        priority: 0.6
      })
    }
  }

  return urls
})
