import catalog from '~/content/imageCatalog.json'

export const PRESENTATION_BASE = '/images/presentation/curated'

type Catalog = typeof catalog

export function cleanSlideTitle(title: string) {
  return title
    .replace(/AYDI\s*NOX|AYDIN\s*OX/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80)
}

function pickImages(map: Record<string, string[]>, id: string) {
  return map[id] ?? []
}

export function categoryHero(categoryId: string): string | undefined {
  return catalog.categoryHero[categoryId as keyof Catalog['categoryHero']]
}

export function productHero(productId: string): string | undefined {
  return catalog.productHero[productId as keyof Catalog['productHero']]
    ?? pickImages(catalog.productImages, productId)[0]
}

export function productGallery(productId: string, count = 8): string[] {
  const hero = productHero(productId)
  const images = pickImages(catalog.productImages, productId)
  const ordered = hero ? [hero, ...images.filter(s => s !== hero)] : images
  return ordered.slice(0, count)
}

export function serviceHero(serviceId: string): string | undefined {
  return catalog.serviceHero[serviceId as keyof Catalog['serviceHero']]
    ?? pickImages(catalog.serviceImages, serviceId)[0]
}

export function serviceGallery(serviceId: string, count = 6): string[] {
  const hero = serviceHero(serviceId)
  const images = pickImages(catalog.serviceImages, serviceId)
  const ordered = hero ? [hero, ...images.filter(s => s !== hero)] : images
  return ordered.slice(0, count)
}

export function corporateImage(pageId: string): string | undefined {
  return catalog.corporateImages[pageId as keyof Catalog['corporateImages']]
}

export function documentImages(): string[] {
  return catalog.documentImages ?? []
}

export function productionGallery(limit = 6) {
  return galleryCategoryItems('uretim').slice(0, limit)
}

export function galleryCategoryItems(categoryId: string) {
  const items = catalog.galleryImages[categoryId as keyof Catalog['galleryImages']] ?? []
  return items.map((item, index) => ({
    id: `${categoryId}-${index + 1}`,
    category: categoryId,
    title: cleanSlideTitle(item.title) || `Görsel ${index + 1}`,
    src: item.src,
    slide: item.slide
  }))
}

export function blogCover(postId: string): string | undefined {
  return catalog.blogCovers[postId as keyof Catalog['blogCovers']]
}

export const pageHero = catalog.pageHero
export const homeImages = catalog.home

export function allGalleryItems() {
  const labelMap: Record<string, string> = {
    tank: 'Tank Üretimi',
    reaktor: 'Reaktör & Karıştırıcı',
    montaj: 'Montaj & Tesis',
    uretim: 'Üretim'
  }
  return (['tank', 'reaktor', 'montaj', 'uretim'] as const).flatMap(id =>
    galleryCategoryItems(id).map(item => ({
      ...item,
      categoryLabel: labelMap[id] ?? id
    }))
  )
}

export function featuredGalleryItems(limit = 8) {
  const picks = [
    productHero('reaktorler'),
    productHero('depolama-tanklari'),
    serviceHero('montaj-tesis-kurulumu'),
    productHero('endustriyel-filtreler'),
    productHero('homojenizatorler'),
    productHero('dolum-hatlari'),
    serviceHero('uretim-imalat'),
    pageHero.gallery
  ].filter((src): src is string => Boolean(src))

  return picks.slice(0, limit).map((src, index) => {
    const entry = catalog.entries.find(e => e.src === src)
    return {
      id: `featured-${index + 1}`,
      category: entry?.gallery[0] ?? 'montaj',
      categoryLabel: 'Öne Çıkan',
      title: entry?.title ? cleanSlideTitle(entry.title) : `Proje ${index + 1}`,
      src
    }
  })
}
