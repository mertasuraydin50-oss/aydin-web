import { allGalleryItems, featuredGalleryItems as featuredFromCatalog } from '~/constants/images'

export interface GalleryItem {
  id: string
  category: string
  categoryLabel: string
  title: string
  src: string
}

export const galleryCategories = [
  { id: 'all', label: 'Tümü' },
  { id: 'tank', label: 'Tank Üretimi' },
  { id: 'reaktor', label: 'Reaktör & Karıştırıcı' },
  { id: 'montaj', label: 'Montaj & Tesis' },
  { id: 'uretim', label: 'Üretim' }
] as const

type GalleryCategoryId = typeof galleryCategories[number]['id']

export const galleryItems: GalleryItem[] = allGalleryItems()

export const featuredGalleryItems: GalleryItem[] = featuredFromCatalog(8)

export function filterGalleryItems(category: GalleryCategoryId) {
  if (category === 'all') return galleryItems
  return galleryItems.filter(item => item.category === category)
}

export function galleryPath() {
  return '/galeri'
}
